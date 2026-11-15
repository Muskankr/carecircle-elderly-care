'use client';

import React, { useState } from 'react';
import { NotificationItem, DemoUser } from '@/lib/types';
import { getRelativeTimeString } from '@/lib/utils';

interface NotificationsModalProps {
  notifications: NotificationItem[];
  currentUser: DemoUser;
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
}

export function NotificationsModal({
  notifications,
  currentUser,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
}: NotificationsModalProps) {
  const [testEmailSending, setTestEmailSending] = useState(false);
  const [testResult, setTestResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSendTestReminder = async () => {
    setTestEmailSending(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail: currentUser.email,
          recipientName: currentUser.name,
          reminderType: 'dose',
          subject: 'Upcoming Dose Alert: Vitamin D3 (1000 IU)',
          message:
            'This is a proactive automated reminder from CareCircle. Meera Sharma has Vitamin D3 scheduled today at 9:00 AM.',
          medicationDetails: {
            name: 'Vitamin D3 (Cholecalciferol)',
            dosage: '1000 IU softgel',
            time: '09:00 AM',
          },
        }),
      });

      const data = await res.json();
      setTestResult(data);
    } catch (err) {
      setTestResult({
        success: false,
        message: 'Could not connect to reminder endpoint.',
      });
    } finally {
      setTestEmailSending(false);
    }
  };

  const activeNotifs = notifications.filter((n) => !n.dismissed);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="card-header" style={{ marginBottom: '1rem' }}>
          <div>
            <h2 className="card-title">Notification Centre</h2>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              Proactive alerts for doses, appointments, and care milestones
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ fontSize: '1.25rem', color: 'var(--text-light)', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Top Actions: Mark All Read & Send Test Reminder */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="btn btn-outline btn-sm"
            style={{ fontSize: 'var(--text-xs)' }}
          >
            Mark All as Read
          </button>

          <button
            type="button"
            onClick={handleSendTestReminder}
            disabled={testEmailSending}
            className="btn btn-primary btn-sm"
            style={{ fontSize: 'var(--text-xs)' }}
          >
            {testEmailSending ? 'Sending Test...' : '✉️ Send Test Reminder'}
          </button>
        </div>

        {/* Test Result Box if triggered */}
        {testResult && (
          <div
            style={{
              padding: '0.85rem',
              backgroundColor: testResult.mode === 'live_email_sent' ? 'var(--status-success-bg)' : 'var(--bg-subtle)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1rem',
              fontSize: 'var(--text-xs)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <strong style={{ color: 'var(--color-navy)' }}>
                {testResult.mode === 'live_email_sent' ? '✓ Live Email Dispatched' : 'ℹ️ Interactive Email Preview'}
              </strong>
              <button
                type="button"
                onClick={() => setTestResult(null)}
                style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}
              >
                Dismiss
              </button>
            </div>
            <p style={{ color: 'var(--text-main)', marginBottom: '0.35rem' }}>{testResult.message}</p>
            {testResult.preview && (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border-light)',
                  marginTop: '0.5rem',
                }}
              >
                <div><strong>Subject:</strong> {testResult.preview.subject}</div>
                <div><strong>To:</strong> {testResult.preview.recipient}</div>
              </div>
            )}
          </div>
        )}

        {/* Notifications List */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            overflowY: 'auto',
            flex: 1,
            paddingRight: '0.25rem',
          }}
        >
          {activeNotifs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              No notifications at this time.
            </div>
          ) : (
            activeNotifs.map((notif) => (
              <div
                key={notif.id}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  backgroundColor: notif.isRead ? '#ffffff' : 'var(--status-info-bg)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: notif.isRead ? 'transparent' : 'var(--color-teal)',
                      }}
                    />
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-navy)' }}>
                      {notif.title}
                    </strong>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {notif.message}
                  </p>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', display: 'block', marginTop: '0.25rem' }}>
                    {getRelativeTimeString(notif.timestamp)}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-end' }}>
                  {!notif.isRead && (
                    <button
                      type="button"
                      onClick={() => onMarkAsRead(notif.id)}
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--color-teal)',
                        fontWeight: 600,
                        textDecoration: 'underline',
                      }}
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onDismiss(notif.id)}
                    style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}
                    title="Dismiss"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
