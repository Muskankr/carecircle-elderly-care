'use client';

import React from 'react';
import {
  AppState,
  DemoUser,
  DoseRecord,
  AdherenceStats,
} from '@/lib/types';
import { DashboardTab } from './Sidebar';
import { formatDisplayDate, formatDisplayTime, getTodayDateString, getRelativeTimeString } from '@/lib/utils';
import { ROLE_PERMISSIONS } from '@/lib/constants';

interface OverviewTabProps {
  state: AppState;
  currentUser: DemoUser;
  stats: AdherenceStats;
  onNavigateTab: (tab: DashboardTab) => void;
  onMarkDose: (doseId: string, status: 'taken' | 'skipped') => void;
  onOpenAddMedication: () => void;
  onOpenAddAppointment: () => void;
}

export function OverviewTab({
  state,
  currentUser,
  stats,
  onNavigateTab,
  onMarkDose,
  onOpenAddMedication,
  onOpenAddAppointment,
}: OverviewTabProps) {
  const permissions = ROLE_PERMISSIONS[currentUser.role];
  const todayStr = getTodayDateString();

  // Find next upcoming dose today
  const todayDoses = state.doses.filter((d) => d.scheduledDate === todayStr);
  const nextUpcomingDose = todayDoses.find((d) => d.status === 'upcoming');

  // Next upcoming appointment
  const upcomingAppointments = state.appointments
    .filter((a) => a.status === 'upcoming' && a.date >= todayStr)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const nextAppointment = upcomingAppointments[0];

  // Dynamic greeting based on current local hour
  const hour = new Date().getHours();
  const greetingTime = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Recent 3 activities
  const recentActivities = [...state.activities]
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Welcome Banner */}
      <div
        className="card"
        style={{
          backgroundColor: '#ffffff',
          borderLeft: '5px solid var(--color-teal)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '1.5rem 1.75rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-teal)' }}>
              {formatDisplayDate(todayStr)}
            </span>
            <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
              Logged in as {currentUser.role}
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
              fontWeight: 800,
              color: 'var(--color-navy)',
              letterSpacing: '-0.02em',
            }}
          >
            {greetingTime}, {currentUser.name}!
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {currentUser.role === 'Senior'
              ? 'Here is your daily health schedule and medication timeline for today.'
              : `Coordinating care and medication adherence for Meera Sharma.`}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {permissions.canAddMedication && (
            <button
              type="button"
              onClick={onOpenAddMedication}
              className="btn btn-outline btn-sm"
            >
              + Add Medicine
            </button>
          )}
          {permissions.canAddAppointment && (
            <button
              type="button"
              onClick={onOpenAddAppointment}
              className="btn btn-outline btn-sm"
            >
              + Schedule Visit
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigateTab('ai-assistant')}
            className="btn btn-primary btn-sm"
          >
            Ask AI Assistant 🤖
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid-4">
        {/* Today Adherence */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>
              Today Adherence
            </span>
            <span style={{ fontSize: '1.25rem' }}>🎯</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-teal-dark)' }}>
              {stats.todayAdherence}%
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              ({stats.completedDoses}/{stats.totalScheduled} doses)
            </span>
          </div>
          {/* Progress bar */}
          <div
            style={{
              width: '100%',
              height: '6px',
              backgroundColor: 'var(--border-light)',
              borderRadius: '999px',
              marginTop: '0.75rem',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${stats.todayAdherence}%`,
                height: '100%',
                backgroundColor: 'var(--color-teal)',
                borderRadius: '999px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* 7-Day Adherence */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>
              7-Day Adherence
            </span>
            <span style={{ fontSize: '1.25rem' }}>📈</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy)' }}>
              {stats.weeklyAdherence}%
            </span>
            <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
              Stable
            </span>
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '0.75rem', display: 'block' }}>
            Based on logged doses this week
          </span>
        </div>

        {/* Next Dose Pending */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>
              Next Scheduled Dose
            </span>
            <span style={{ fontSize: '1.25rem' }}>⏰</span>
          </div>
          {nextUpcomingDose ? (
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-navy)' }}>
                {formatDisplayTime(nextUpcomingDose.scheduledTime)}
              </div>
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginTop: '0.2rem',
                }}
              >
                {nextUpcomingDose.medicationName} ({nextUpcomingDose.dosage})
              </span>
            </div>
          ) : (
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--status-success-text)', fontSize: 'var(--text-sm)' }}>
                All Doses Completed!
              </span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'block' }}>
                No further doses for today.
              </span>
            </div>
          )}
        </div>

        {/* Doctor Appointment */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>
              Next Appointment
            </span>
            <span style={{ fontSize: '1.25rem' }}>🩺</span>
          </div>
          {nextAppointment ? (
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ fontWeight: 800, fontSize: 'var(--text-sm)', color: 'var(--color-navy)' }}>
                {formatDisplayDate(nextAppointment.date)}
              </div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'block', marginTop: '0.15rem' }}>
                {nextAppointment.doctorName} ({nextAppointment.specialty})
              </span>
            </div>
          ) : (
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                No visits this week
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Today's Medication Schedule + AI Insight & Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
        {/* Left Column: Today's Doses Interactive List */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Today's Medication Doses</h2>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                {todayDoses.length} total doses scheduled for {formatDisplayDate(todayStr)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('medications')}
              className="btn btn-outline btn-sm"
            >
              View Full Schedule &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {todayDoses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                No doses scheduled for today.
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
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      backgroundColor: isTaken
                        ? 'var(--status-success-bg)'
                        : isMissed
                        ? 'var(--status-danger-bg)'
                        : '#ffffff',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-navy)',
                          minWidth: '70px',
                        }}
                      >
                        {formatDisplayTime(dose.scheduledTime)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-navy)' }}>
                          {dose.medicationName}
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                          {dose.dosage}
                          {dose.recordedBy && (
                            <span style={{ marginLeft: '0.5rem', fontStyle: 'italic' }}>
                              • Recorded by {dose.recordedBy}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {isTaken && (
                        <span className="badge badge-success">✓ Taken</span>
                      )}
                      {isMissed && (
                        <span className="badge badge-danger">⚠ Missed</span>
                      )}
                      {isSkipped && (
                        <span className="badge badge-warning">Skipped</span>
                      )}
                      {isUpcoming && permissions.canLogDose && (
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            type="button"
                            onClick={() => onMarkDose(dose.id, 'taken')}
                            className="btn btn-primary btn-sm"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                          >
                            Mark Taken
                          </button>
                          <button
                            type="button"
                            onClick={() => onMarkDose(dose.id, 'skipped')}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                          >
                            Skip
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: AI Proactive Care Insight & Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* AI Care Insight Box */}
          <div
            className="card"
            style={{
              backgroundColor: 'var(--color-mint)',
              borderColor: 'var(--color-mint-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🤖</span>
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 800, color: 'var(--color-mint-text)' }}>
                CareCircle AI Insight
              </h3>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-navy)', lineHeight: 1.55 }}>
              Meera has achieved <strong>{stats.todayAdherence}% adherence</strong> today. Morning blood pressure
              medication (Amlodipine) was taken on schedule. Remember that <strong>Vitamin D3</strong> is best
              absorbed after a breakfast containing healthy fats.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => onNavigateTab('ai-assistant')}
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  color: 'var(--color-teal-dark)',
                  textDecoration: 'underline',
                }}
              >
                Chat with Assistant &rarr;
              </button>
            </div>
          </div>

          {/* Recent Family & Caregiver Activity */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Circle Activity</h3>
              <button
                type="button"
                onClick={() => onNavigateTab('care-circle')}
                style={{ fontSize: 'var(--text-xs)', color: 'var(--color-teal)', fontWeight: 600 }}
              >
                View All
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-teal)',
                      marginTop: '5px',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 700, color: 'var(--color-navy)' }}>
                        {act.actorName} ({act.actorRole})
                      </span>
                      <span style={{ color: 'var(--text-light)' }}>
                        {getRelativeTimeString(act.timestamp)}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      {act.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
