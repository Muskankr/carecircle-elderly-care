'use client';

import React, { useState } from 'react';
import { CareCircleMember, CareNote, CareActivity, DemoUser } from '@/lib/types';
import { formatDisplayDate, getRelativeTimeString, generateId } from '@/lib/utils';
import { ROLE_PERMISSIONS } from '@/lib/constants';

interface CareCircleTabProps {
  members: CareCircleMember[];
  careNotes: CareNote[];
  activities: CareActivity[];
  currentUser: DemoUser;
  onAddCareNote: (note: CareNote) => void;
}

export function CareCircleTab({
  members,
  careNotes,
  activities,
  currentUser,
  onAddCareNote,
}: CareCircleTabProps) {
  const permissions = ROLE_PERMISSIONS[currentUser.role];

  // Note form states
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState<'general' | 'medication' | 'appointment' | 'wellness'>('wellness');
  const [noteSuccess, setNoteSuccess] = useState(false);

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    const newNote: CareNote = {
      id: generateId('note'),
      authorName: currentUser.name,
      authorRole: currentUser.role,
      createdAt: new Date().toISOString(),
      content: noteContent.trim(),
      category: noteCategory,
    };

    onAddCareNote(newNote);
    setNoteContent('');
    setNoteSuccess(true);
    setTimeout(() => setNoteSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
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
            Family & Caregiver Support Circle
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            Interconnected healthcare network supporting Meera Sharma. Transparent shared logs,
            role permissions, and family communication.
          </p>
        </div>

        <div className="badge badge-success" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
          ● 4 Active Circle Members
        </div>
      </div>

      {/* Circle Members Roster Cards */}
      <div>
        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1rem' }}>
          Authorized Circle Members & Roles
        </h2>

        <div className="grid-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="card"
              style={{
                borderLeft: member.role === 'Senior'
                  ? '5px solid var(--color-teal)'
                  : member.role === 'Family Member'
                  ? '5px solid #1d4ed8'
                  : '5px solid #7c3aed',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-navy)' }}>
                      {member.name}
                    </h3>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'block', marginTop: '0.15rem' }}>
                      {member.relationship}
                    </span>
                  </div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor:
                        member.role === 'Senior'
                          ? 'var(--color-mint)'
                          : member.role === 'Family Member'
                          ? 'var(--status-info-bg)'
                          : 'var(--status-warning-bg)',
                      color:
                        member.role === 'Senior'
                          ? 'var(--color-mint-text)'
                          : member.role === 'Family Member'
                          ? 'var(--status-info-text)'
                          : 'var(--status-warning-text)',
                    }}
                  >
                    {member.role}
                  </span>
                </div>

                {member.isEmergencyContact && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>
                      🚨 Primary Emergency Contact
                    </span>
                  </div>
                )}

                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: 'var(--text-sm)' }}>
                  <div>
                    📞 <strong>Phone:</strong> {member.phone}
                  </div>
                  <div>
                    ✉️ <strong>Email:</strong> {member.email}
                  </div>
                </div>

                {/* Role Capabilities Breakdown */}
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.65rem 0.85rem',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--color-navy)' }}>
                    Permissions:
                  </strong>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span>{member.canManageMedications ? '✓ Manage Meds' : '✗ Read-only Meds'}</span>
                    <span>{member.canManageAppointments ? '✓ Schedule Visits' : '✗ Read-only Visits'}</span>
                    <span>{member.canLogDoses ? '✓ Log Doses' : '✗ Cannot Log Doses'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Shared Care Notes & Real-time Activity Feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Shared Care Notes & Add Form */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Shared Care Notes</h2>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              Visible to all family & caregivers
            </span>
          </div>

          {/* Add Note Form */}
          {permissions.canAddCareNote && (
            <form onSubmit={handlePostNote} style={{ marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder={`Write an observation, vitals check, or daily note as ${currentUser.name}...`}
                  className="form-textarea"
                  rows={2}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-light)', fontWeight: 600 }}>
                    Category:
                  </span>
                  <select
                    value={noteCategory}
                    onChange={(e) => setNoteCategory(e.target.value as any)}
                    className="form-select"
                    style={{ padding: '0.3rem 0.6rem', fontSize: 'var(--text-xs)', minHeight: '32px' }}
                  >
                    <option value="wellness">Wellness & Mood</option>
                    <option value="medication">Medication & Side-Effects</option>
                    <option value="appointment">Doctor / Lab Visit</option>
                    <option value="general">General Daily Note</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary btn-sm">
                  Post Care Note
                </button>
              </div>

              {noteSuccess && (
                <div
                  style={{
                    marginTop: '0.5rem',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--status-success-text)',
                    fontWeight: 600,
                  }}
                >
                  ✓ Note posted to the shared circle!
                </div>
              )}
            </form>
          )}

          {/* Notes List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {careNotes.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                No notes posted yet.
              </div>
            ) : (
              careNotes.map((note) => (
                <div
                  key={note.id}
                  style={{
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-navy)' }}>
                        {note.authorName}
                      </span>
                      <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>
                        {note.authorRole}
                      </span>
                    </div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-light)' }}>
                      {getRelativeTimeString(note.createdAt)}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-main)', lineHeight: 1.5 }}>
                    {note.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Real-time Care Activity Stream */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Circle Activity Stream</h2>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              Audit Log
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activities.map((act) => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  fontSize: 'var(--text-xs)',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-light)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor:
                      act.type === 'medication'
                        ? 'var(--color-mint)'
                        : act.type === 'appointment'
                        ? 'var(--status-info-bg)'
                        : 'var(--status-warning-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0,
                  }}
                >
                  {act.type === 'medication'
                    ? '💊'
                    : act.type === 'appointment'
                    ? '🗓️'
                    : '📝'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>
                      {act.action}
                    </span>
                    <span style={{ color: 'var(--text-light)' }}>
                      {getRelativeTimeString(act.timestamp)}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    <strong>{act.actorName}</strong> ({act.actorRole})
                  </div>
                  <div style={{ color: 'var(--text-main)', marginTop: '0.15rem' }}>
                    {act.details}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
