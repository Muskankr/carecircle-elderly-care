'use client';

import React, { useState } from 'react';
import { Appointment, DemoUser } from '@/lib/types';
import { formatDisplayDate, formatDisplayTime, getTodayDateString, generateId } from '@/lib/utils';
import { ROLE_PERMISSIONS } from '@/lib/constants';

interface AppointmentsTabProps {
  appointments: Appointment[];
  currentUser: DemoUser;
  onAddAppointment: (apt: Appointment) => void;
  onUpdateAppointment: (apt: Appointment) => void;
  onDeleteAppointment: (aptId: string) => void;
  isAddModalOpenInitially?: boolean;
}

export function AppointmentsTab({
  appointments,
  currentUser,
  onAddAppointment,
  onUpdateAppointment,
  onDeleteAppointment,
  isAddModalOpenInitially = false,
}: AppointmentsTabProps) {
  const permissions = ROLE_PERMISSIONS[currentUser.role];
  const todayStr = getTodayDateString();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(isAddModalOpenInitially);
  const [editingApt, setEditingApt] = useState<Appointment | null>(null);

  // Form states
  const [formDoctor, setFormDoctor] = useState('');
  const [formSpecialty, setFormSpecialty] = useState('');
  const [formDate, setFormDate] = useState(todayStr);
  const [formTime, setFormTime] = useState('10:00');
  const [formHospital, setFormHospital] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formStatus, setFormStatus] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [formLocationType, setFormLocationType] = useState<'in-person' | 'telehealth'>('in-person');
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingApt(null);
    setFormDoctor('');
    setFormSpecialty('');
    setFormDate(todayStr);
    setFormTime('10:00');
    setFormHospital('');
    setFormNotes('');
    setFormStatus('upcoming');
    setFormLocationType('in-person');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (apt: Appointment) => {
    setEditingApt(apt);
    setFormDoctor(apt.doctorName);
    setFormSpecialty(apt.specialty);
    setFormDate(apt.date);
    setFormTime(apt.time);
    setFormHospital(apt.hospital);
    setFormNotes(apt.notes);
    setFormStatus(apt.status);
    setFormLocationType(apt.locationType || 'in-person');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formDoctor.trim()) {
      setFormError('Doctor or Specialist name is required.');
      return;
    }
    if (!formDate) {
      setFormError('Date is required.');
      return;
    }
    if (!formHospital.trim()) {
      setFormError('Clinic or Hospital location is required.');
      return;
    }

    if (editingApt) {
      const updated: Appointment = {
        ...editingApt,
        doctorName: formDoctor.trim(),
        specialty: formSpecialty.trim() || 'General Medicine',
        date: formDate,
        time: formTime,
        hospital: formHospital.trim(),
        notes: formNotes.trim(),
        status: formStatus,
        locationType: formLocationType,
      };
      onUpdateAppointment(updated);
    } else {
      const newApt: Appointment = {
        id: generateId('apt'),
        doctorName: formDoctor.trim(),
        specialty: formSpecialty.trim() || 'General Medicine',
        date: formDate,
        time: formTime,
        hospital: formHospital.trim(),
        notes: formNotes.trim(),
        status: formStatus,
        locationType: formLocationType,
      };
      onAddAppointment(newApt);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, doc: string) => {
    if (confirm(`Remove appointment with ${doc}?`)) {
      onDeleteAppointment(id);
    }
  };

  // Group appointments into upcoming vs past
  const upcomingList = appointments
    .filter((a) => a.status === 'upcoming' && a.date >= todayStr)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  const pastList = appointments
    .filter((a) => a.status === 'completed' || a.date < todayStr || a.status === 'cancelled')
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
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
            Doctor & Clinical Appointments
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            Coordinate consultations, specialty reviews, and clinical preparation notes.
          </p>
        </div>

        {permissions.canAddAppointment && (
          <button type="button" onClick={openAddModal} className="btn btn-primary">
            + Schedule Appointment
          </button>
        )}
      </div>

      {/* UPCOMING APPOINTMENTS SECTION */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-navy)' }}>
            Upcoming Consultations ({upcomingList.length})
          </h2>
        </div>

        {upcomingList.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
            No upcoming appointments scheduled. Tap &quot;+ Schedule Appointment&quot; above to add one.
          </div>
        ) : (
          <div className="grid-2">
            {upcomingList.map((apt) => (
              <div
                key={apt.id}
                className="card"
                style={{
                  borderLeft: '5px solid var(--color-teal)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="badge badge-info" style={{ marginBottom: '0.35rem' }}>
                        {apt.specialty}
                      </span>
                      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-navy)' }}>
                        {apt.doctorName}
                      </h3>
                    </div>
                    <span className="badge badge-success">
                      {apt.locationType === 'telehealth' ? '📹 Telehealth' : '🏥 In-Person'}
                    </span>
                  </div>

                  {/* Date & Time Highlight */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-md)',
                      margin: '1rem 0',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-light)', display: 'block' }}>
                        Scheduled Date
                      </span>
                      <span style={{ fontWeight: 800, color: 'var(--color-navy)', fontSize: 'var(--text-sm)' }}>
                        {formatDisplayDate(apt.date)}
                      </span>
                    </div>
                    <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-medium)' }} />
                    <div>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-light)', display: 'block' }}>
                        Time
                      </span>
                      <span style={{ fontWeight: 800, color: 'var(--color-teal-dark)', fontSize: 'var(--text-sm)' }}>
                        {formatDisplayTime(apt.time)}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    📍 <strong>Location:</strong> {apt.hospital}
                  </div>

                  {apt.notes && (
                    <div
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-muted)',
                        backgroundColor: 'var(--color-mint)',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        marginTop: '0.5rem',
                      }}
                    >
                      <strong>Pre-Visit Notes:</strong> {apt.notes}
                    </div>
                  )}
                </div>

                {/* Actions */}
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
                  {permissions.canEditAppointment && (
                    <button
                      type="button"
                      onClick={() => openEditModal(apt)}
                      className="btn btn-outline btn-sm"
                    >
                      Edit
                    </button>
                  )}
                  {permissions.canDeleteAppointment && (
                    <button
                      type="button"
                      onClick={() => handleDelete(apt.id, apt.doctorName)}
                      className="btn btn-outline btn-sm"
                      style={{ color: '#dc2626', borderColor: '#fecaca' }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PAST / COMPLETED APPOINTMENTS */}
      <div style={{ marginTop: '1rem' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1rem' }}>
          Past & Completed Consultations ({pastList.length})
        </h2>

        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-light)' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Date & Time</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Doctor</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Specialty</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Location</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Outcome / Notes</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {pastList.map((apt) => (
                  <tr key={apt.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>
                      {formatDisplayDate(apt.date)} at {formatDisplayTime(apt.time)}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                      {apt.doctorName}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>{apt.specialty}</td>
                    <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{apt.hospital}</td>
                    <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{apt.notes || '—'}</td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      <span className="badge badge-success">Completed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD / EDIT APPOINTMENT MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h2 className="card-title">
                {editingApt ? 'Edit Appointment' : 'Schedule New Appointment'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ fontSize: '1.25rem', color: 'var(--text-light)', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Doctor / Specialist Name *</label>
                <input
                  type="text"
                  value={formDoctor}
                  onChange={(e) => setFormDoctor(e.target.value)}
                  placeholder="e.g. Dr. Arvind Patel"
                  className="form-input"
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Specialty</label>
                  <input
                    type="text"
                    value={formSpecialty}
                    onChange={(e) => setFormSpecialty(e.target.value)}
                    placeholder="e.g. Cardiology, Endocrinology"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Visit Type</label>
                  <select
                    value={formLocationType}
                    onChange={(e) => setFormLocationType(e.target.value as 'in-person' | 'telehealth')}
                    className="form-select"
                  >
                    <option value="in-person">In-Person Consultation</option>
                    <option value="telehealth">Telehealth Video Call</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Time *</label>
                  <input
                    type="time"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Hospital / Clinic Address *</label>
                <input
                  type="text"
                  value={formHospital}
                  onChange={(e) => setFormHospital(e.target.value)}
                  placeholder="e.g. City Heart Institute, OPD Room 204"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preparation & Consultation Notes</label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Fasting required for blood test, bring current BP log..."
                  className="form-textarea"
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Appointment Status</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as 'upcoming' | 'completed' | 'cancelled')}
                  className="form-select"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
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
                  {editingApt ? 'Save Changes' : 'Schedule Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
