'use client';

import React, { useState } from 'react';
import { UserSettings, DemoUser } from '@/lib/types';
import { ROLE_PERMISSIONS } from '@/lib/constants';

interface SettingsTabProps {
  settings: UserSettings;
  currentUser: DemoUser;
  onUpdateSettings: (newSettings: UserSettings) => void;
  onResetDemoData: () => void;
}

export function SettingsTab({
  settings,
  currentUser,
  onUpdateSettings,
  onResetDemoData,
}: SettingsTabProps) {
  const permissions = ROLE_PERMISSIONS[currentUser.role];

  const [textSize, setTextSize] = useState<'normal' | 'large' | 'extra-large'>(settings.textSize);
  const [highContrast, setHighContrast] = useState<boolean>(settings.highContrast);
  const [enableEmail, setEnableEmail] = useState<boolean>(settings.enableEmailReminders);
  const [emailRecipient, setEmailRecipient] = useState<string>(settings.emailRecipient);
  const [leadMinutes, setLeadMinutes] = useState<number>(settings.reminderLeadMinutes);
  const [saveMessage, setSaveMessage] = useState<string>('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserSettings = {
      textSize,
      highContrast,
      enableEmailReminders: enableEmail,
      reminderLeadMinutes: leadMinutes,
      emailRecipient: emailRecipient.trim(),
    };

    onUpdateSettings(updated);

    // Apply accessibility classes directly to body
    if (typeof document !== 'undefined') {
      document.body.classList.remove('font-large', 'font-extra-large', 'high-contrast');
      if (textSize === 'large') document.body.classList.add('font-large');
      if (textSize === 'extra-large') document.body.classList.add('font-extra-large');
      if (highContrast) document.body.classList.add('high-contrast');
    }

    setSaveMessage('Preferences updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleReset = () => {
    if (
      confirm(
        'Reset demo data? This will restore original sample medications, appointments, and logs for Meera Sharma.'
      )
    ) {
      onResetDemoData();
      alert('Demo data has been reset to initial state.');
    }
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
            Settings & Senior Accessibility
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            Configure visual sizing, high-contrast display, reminder channels, and demo state.
          </p>
        </div>

        <span className="badge badge-info" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
          WCAG AAA Compatible
        </span>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* User Profile Card */}
        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>
            Active Profile Information
          </h2>
          <div className="grid-3">
            <div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-light)', display: 'block' }}>
                Full Name
              </span>
              <strong style={{ fontSize: 'var(--text-base)', color: 'var(--color-navy)' }}>
                {currentUser.name}
              </strong>
            </div>
            <div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-light)', display: 'block' }}>
                Circle Role
              </span>
              <span className="badge badge-success" style={{ marginTop: '0.2rem' }}>
                {currentUser.role}
              </span>
            </div>
            <div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-light)', display: 'block' }}>
                Relationship
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-main)' }}>
                {currentUser.relationship}
              </span>
            </div>
          </div>
        </div>

        {/* Accessibility & Visual Controls */}
        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>
            Vision & Accessibility Preferences
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Tailor the application to enhance readability for seniors and visually impaired users.
          </p>

          <div className="grid-2">
            {/* Text Size Selection */}
            <div className="form-group">
              <label className="form-label">Font & Touch Size</label>
              <select
                value={textSize}
                onChange={(e) => setTextSize(e.target.value as any)}
                className="form-select"
              >
                <option value="normal">Standard (Normal Default)</option>
                <option value="large">Large (Recommended for Seniors)</option>
                <option value="extra-large">Extra-Large (Maximum Legibility)</option>
              </select>
              <p className="form-helper">
                Dynamically increases typography scales and touch targets throughout the app.
              </p>
            </div>

            {/* High Contrast Mode */}
            <div className="form-group">
              <label className="form-label">Display Mode</label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  minHeight: '44px',
                }}
              >
                <input
                  type="checkbox"
                  id="high-contrast-toggle"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                />
                <label htmlFor="high-contrast-toggle" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer' }}>
                  Enable High-Contrast Mode (Deep Black & Solid Outlines)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Reminder & Notification Preferences */}
        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '0.5rem' }}>
            Notification & Email Reminders
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Configure when and where daily medication alerts and visit reminders are delivered.
          </p>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Email Notifications</label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  border: '1.5px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  minHeight: '44px',
                }}
              >
                <input
                  type="checkbox"
                  id="email-toggle"
                  checked={enableEmail}
                  onChange={(e) => setEnableEmail(e.target.checked)}
                />
                <label htmlFor="email-toggle" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer' }}>
                  Enable automated email reminders
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Recipient Notification Email</label>
              <input
                type="email"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                placeholder="name@example.com"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group" style={{ maxWidth: '300px' }}>
            <label className="form-label">Alert Lead Time (Minutes)</label>
            <select
              value={leadMinutes}
              onChange={(e) => setLeadMinutes(Number(e.target.value))}
              className="form-select"
            >
              <option value={5}>5 minutes before scheduled dose</option>
              <option value={15}>15 minutes before scheduled dose</option>
              <option value={30}>30 minutes before scheduled dose</option>
              <option value={60}>1 hour before scheduled dose</option>
            </select>
          </div>
        </div>

        {saveMessage && (
          <div
            style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--status-success-bg)',
              color: 'var(--status-success-text)',
              border: '1px solid var(--status-success-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
            }}
          >
            ✓ {saveMessage}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            Save Preferences
          </button>
        </div>
      </form>

      {/* Dangerous / Demo Reset Area */}
      <div
        className="card"
        style={{
          borderTop: '4px solid #ef4444',
          marginTop: '1rem',
        }}
      >
        <div className="card-header">
          <div>
            <h3 className="card-title" style={{ color: '#dc2626' }}>
              Demo State Management
            </h3>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              Restore original hackathon demonstration data
            </span>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          If you have added test medications, edited appointments, or modified doses and wish to return
          to the clean initial state for Meera Sharma, click the button below.
        </p>

        {permissions.canResetData ? (
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-danger"
          >
            ↺ Reset Demo Data to Default
          </button>
        ) : (
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-light)', fontStyle: 'italic' }}>
            Note: Demo data reset is restricted to Senior / Primary administrator profile.
          </div>
        )}
      </div>
    </div>
  );
}
