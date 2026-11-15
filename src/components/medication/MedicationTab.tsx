'use client';

import React, { useState } from 'react';
import { Medication, DoseRecord, DemoUser, AdherenceStats } from '@/lib/types';
import { formatDisplayDate, formatDisplayTime, getTodayDateString, generateId } from '@/lib/utils';
import { ROLE_PERMISSIONS } from '@/lib/constants';

interface MedicationTabProps {
  medications: Medication[];
  doses: DoseRecord[];
  currentUser: DemoUser;
  stats: AdherenceStats;
  onAddMedication: (med: Medication) => void;
  onUpdateMedication: (med: Medication) => void;
  onDeleteMedication: (medId: string) => void;
  onMarkDose: (doseId: string, status: 'taken' | 'skipped' | 'missed') => void;
  isAddModalOpenInitially?: boolean;
}

export function MedicationTab({
  medications,
  doses,
  currentUser,
  stats,
  onAddMedication,
  onUpdateMedication,
  onDeleteMedication,
  onMarkDose,
  isAddModalOpenInitially = false,
}: MedicationTabProps) {
  const permissions = ROLE_PERMISSIONS[currentUser.role];
  const todayStr = getTodayDateString();

  const [activeSubTab, setActiveSubTab] = useState<'today' | 'all-meds' | 'history'>('today');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isAddModalOpenInitially);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formDosage, setFormDosage] = useState('');
  const [formFrequency, setFormFrequency] = useState('Once Daily');
  const [formSchedule, setFormSchedule] = useState('08:00');
  const [formStartDate, setFormStartDate] = useState(todayStr);
  const [formInstructions, setFormInstructions] = useState('');
  const [formPurpose, setFormPurpose] = useState('');
  const [formActive, setFormActive] = useState(true);
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingMedication(null);
    setFormName('');
    setFormDosage('');
    setFormFrequency('Once Daily');
    setFormSchedule('08:00');
    setFormStartDate(todayStr);
    setFormInstructions('');
    setFormPurpose('');
    setFormActive(true);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (med: Medication) => {
    setEditingMedication(med);
    setFormName(med.name);
    setFormDosage(med.dosage);
    setFormFrequency(med.frequency);
    setFormSchedule(med.schedule.join(', '));
    setFormStartDate(med.startDate);
    setFormInstructions(med.instructions);
    setFormPurpose(med.purpose || '');
    setFormActive(med.active);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSaveMedication = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim()) {
      setFormError('Medication name is required.');
      return;
    }
    if (!formDosage.trim()) {
      setFormError('Dosage (e.g. 5 mg) is required.');
      return;
    }

    // Split schedule times by comma or whitespace
    const scheduleArray = formSchedule
      .split(/[, ]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (scheduleArray.length === 0) {
      setFormError('Please provide at least one scheduled time (e.g. 08:00).');
      return;
    }

    if (editingMedication) {
      const updated: Medication = {
        ...editingMedication,
        name: formName.trim(),
        dosage: formDosage.trim(),
        frequency: formFrequency,
        schedule: scheduleArray,
        startDate: formStartDate,
        instructions: formInstructions.trim(),
        purpose: formPurpose.trim() || 'General Health Maintenance',
        active: formActive,
      };
      onUpdateMedication(updated);
    } else {
      const newMed: Medication = {
        id: generateId('med'),
        name: formName.trim(),
        dosage: formDosage.trim(),
        frequency: formFrequency,
        schedule: scheduleArray,
        startDate: formStartDate,
        instructions: formInstructions.trim(),
        purpose: formPurpose.trim() || 'General Health Maintenance',
        active: formActive,
        colorCode: '#0d9488',
      };
      onAddMedication(newMed);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      onDeleteMedication(id);
    }
  };

  const todayDoses = doses.filter((d) => d.scheduledDate === todayStr);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header & Sub-tabs */}
      <div
        className="card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1.25rem 1.5rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-navy)' }}>
            Medication & Daily Dose Management
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            Track prescriptions, record taken doses in real-time, and monitor daily adherence.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {permissions.canAddMedication && (
            <button type="button" onClick={openAddModal} className="btn btn-primary">
              + Add New Medication
            </button>
          )}
        </div>
      </div>

      {/* Navigation Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
        <button
          type="button"
          onClick={() => setActiveSubTab('today')}
          className={`btn btn-sm ${activeSubTab === 'today' ? 'btn-primary' : 'btn-outline'}`}
        >
          Today's Doses ({todayDoses.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('all-meds')}
          className={`btn btn-sm ${activeSubTab === 'all-meds' ? 'btn-primary' : 'btn-outline'}`}
        >
          Prescription Regimen ({medications.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('history')}
          className={`btn btn-sm ${activeSubTab === 'history' ? 'btn-primary' : 'btn-outline'}`}
        >
          Dose History Log ({doses.length})
        </button>
      </div>

      {/* SUB-TAB 1: TODAY'S DOSES */}
      {activeSubTab === 'today' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Adherence Summary Bar */}
          <div
            className="card"
            style={{
              backgroundColor: 'var(--color-mint)',
              border: '1px solid var(--color-mint-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-mint-text)' }}>
                Today's Adherence Rate
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-navy)' }}>
                {stats.todayAdherence}% Completed
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: 'var(--text-sm)' }}>
              <div>
                <strong>{stats.completedDoses}</strong> Taken
              </div>
              <div>
                <strong>{stats.upcomingToday}</strong> Upcoming
              </div>
              <div>
                <strong>{stats.missedDoses}</strong> Missed
              </div>
              <div>
                <strong>{stats.skippedDoses}</strong> Skipped
              </div>
            </div>
          </div>

          {/* Doses List */}
          <div className="card">
            <h2 className="card-title" style={{ marginBottom: '1rem' }}>
              Scheduled Doses for Today ({formatDisplayDate(todayStr)})
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {todayDoses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No doses scheduled for today. Add a medication to begin tracking!
                </div>
              ) : (
                todayDoses.map((dose) => {
                  const isTaken = dose.status === 'taken';
                  const isMissed = dose.status === 'missed';
                  const isSkipped = dose.status === 'skipped';
                  const isUpcoming = dose.status === 'upcoming';

                  return (
                    <div
                      key={dose.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.1rem 1.25rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px solid var(--border-light)',
                        backgroundColor: isTaken
                          ? 'var(--status-success-bg)'
                          : isMissed
                          ? 'var(--status-danger-bg)'
                          : isSkipped
                          ? 'var(--status-warning-bg)'
                          : '#ffffff',
                        gap: '1rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div
                          style={{
                            fontSize: '1.1rem',
                            fontWeight: 800,
                            color: 'var(--color-navy)',
                            minWidth: '85px',
                          }}
                        >
                          {formatDisplayTime(dose.scheduledTime)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 'var(--text-base)', color: 'var(--color-navy)' }}>
                            {dose.medicationName}
                          </div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                            Dosage: <strong>{dose.dosage}</strong>
                            {dose.notes && <span> • Note: {dose.notes}</span>}
                            {dose.recordedBy && <span> • Administered by: <em>{dose.recordedBy}</em></span>}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        {isTaken && (
                          <span className="badge badge-success" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                            ✓ Taken on Schedule
                          </span>
                        )}
                        {isMissed && (
                          <span className="badge badge-danger" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                            ⚠ Marked Missed
                          </span>
                        )}
                        {isSkipped && (
                          <span className="badge badge-warning" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                            ↷ Skipped
                          </span>
                        )}

                        {permissions.canLogDose && (
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {!isTaken && (
                              <button
                                type="button"
                                onClick={() => onMarkDose(dose.id, 'taken')}
                                className="btn btn-primary btn-sm"
                              >
                                ✓ Mark Taken
                              </button>
                            )}
                            {!isSkipped && (
                              <button
                                type="button"
                                onClick={() => onMarkDose(dose.id, 'skipped')}
                                className="btn btn-outline btn-sm"
                              >
                                Skip
                              </button>
                            )}
                            {!isMissed && !isTaken && (
                              <button
                                type="button"
                                onClick={() => onMarkDose(dose.id, 'missed')}
                                className="btn btn-outline btn-sm"
                                style={{ color: '#dc2626', borderColor: '#fecaca' }}
                              >
                                Missed
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ALL MEDICATIONS */}
      {activeSubTab === 'all-meds' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="grid-2">
            {medications.map((med) => (
              <div
                key={med.id}
                className="card"
                style={{
                  borderLeft: `5px solid ${med.colorCode || 'var(--color-teal)'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-navy)' }}>
                        {med.name}
                      </h3>
                      <span className="badge badge-info" style={{ marginTop: '0.35rem' }}>
                        {med.purpose}
                      </span>
                    </div>
                    <span className={`badge ${med.active ? 'badge-success' : 'badge-warning'}`}>
                      {med.active ? 'Active' : 'Paused'}
                    </span>
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: 'var(--text-sm)' }}>
                    <div>
                      <strong>Dosage:</strong> {med.dosage}
                    </div>
                    <div>
                      <strong>Frequency:</strong> {med.frequency}
                    </div>
                    <div>
                      <strong>Scheduled Times:</strong>{' '}
                      {med.schedule.map((t) => formatDisplayTime(t)).join(', ')}
                    </div>
                    <div>
                      <strong>Instructions:</strong>{' '}
                      <span style={{ color: 'var(--text-muted)' }}>{med.instructions}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '0.65rem',
                    marginTop: '1.25rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-light)',
                  }}
                >
                  {permissions.canEditMedication && (
                    <button
                      type="button"
                      onClick={() => openEditModal(med)}
                      className="btn btn-outline btn-sm"
                    >
                      Edit
                    </button>
                  )}
                  {permissions.canDeleteMedication && (
                    <button
                      type="button"
                      onClick={() => handleDelete(med.id, med.name)}
                      className="btn btn-sm btn-outline"
                      style={{ color: '#dc2626', borderColor: '#fecaca' }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: DOSE HISTORY */}
      {activeSubTab === 'history' && (
        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>
            Historical Dose Log (Past 7 Days)
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-light)' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Date</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Time</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Medication</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Dosage</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {doses.map((dose) => (
                  <tr
                    key={dose.id}
                    style={{
                      borderBottom: '1px solid var(--border-light)',
                    }}
                  >
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>
                      {formatDisplayDate(dose.scheduledDate)}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      {formatDisplayTime(dose.scheduledTime)}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                      {dose.medicationName}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{dose.dosage}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <span
                        className={`badge ${
                          dose.status === 'taken'
                            ? 'badge-success'
                            : dose.status === 'missed'
                            ? 'badge-danger'
                            : dose.status === 'skipped'
                            ? 'badge-warning'
                            : 'badge-info'
                        }`}
                      >
                        {dose.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>
                      {dose.recordedBy || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD / EDIT MEDICATION MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h2 className="card-title">
                {editingMedication ? 'Edit Medication' : 'Add New Medication'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ fontSize: '1.25rem', color: 'var(--text-light)', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMedication}>
              <div className="form-group">
                <label className="form-label">Medication Name *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Amlodipine"
                  className="form-input"
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Dosage *</label>
                  <input
                    type="text"
                    value={formDosage}
                    onChange={(e) => setFormDosage(e.target.value)}
                    placeholder="e.g. 5 mg tablet"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Frequency</label>
                  <select
                    value={formFrequency}
                    onChange={(e) => setFormFrequency(e.target.value)}
                    className="form-select"
                  >
                    <option value="Once Daily">Once Daily</option>
                    <option value="Twice Daily">Twice Daily</option>
                    <option value="Three Times Daily">Three Times Daily</option>
                    <option value="As Needed">As Needed (PRN)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Scheduled Time(s) (24-hour HH:mm) *</label>
                <input
                  type="text"
                  value={formSchedule}
                  onChange={(e) => setFormSchedule(e.target.value)}
                  placeholder="e.g. 08:00 or 08:00, 20:30"
                  className="form-input"
                  required
                />
                <p className="form-helper">Separate multiple times with comma (e.g. 08:00, 20:00)</p>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Health Purpose</label>
                  <input
                    type="text"
                    value={formPurpose}
                    onChange={(e) => setFormPurpose(e.target.value)}
                    placeholder="e.g. Blood Pressure, Diabetes"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Clinical Instructions & Notes</label>
                <textarea
                  value={formInstructions}
                  onChange={(e) => setFormInstructions(e.target.value)}
                  placeholder="e.g. Take with warm water after breakfast."
                  className="form-textarea"
                  rows={2}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <input
                  type="checkbox"
                  id="active-toggle"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                />
                <label htmlFor="active-toggle" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  Active Prescription (scheduled for daily reminders)
                </label>
              </div>

              {formError && (
                <div
                  style={{
                    padding: '0.65rem',
                    backgroundColor: 'var(--status-danger-bg)',
                    color: 'var(--status-danger-text)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)',
                    marginBottom: '1rem',
                  }}
                >
                  {formError}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingMedication ? 'Save Changes' : 'Add Medication'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
