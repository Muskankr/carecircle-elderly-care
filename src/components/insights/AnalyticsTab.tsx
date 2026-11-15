'use client';

import React from 'react';
import { AppState, AdherenceStats } from '@/lib/types';
import { formatDisplayDate, getTodayDateString } from '@/lib/utils';

interface AnalyticsTabProps {
  state: AppState;
  stats: AdherenceStats;
}

export function AnalyticsTab({ state, stats }: AnalyticsTabProps) {
  const todayStr = getTodayDateString();

  // Compute past 7 days adherence bars dynamically
  const past7DaysData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const dayDoses = state.doses.filter((dose) => dose.scheduledDate === dateStr);
    const dayTaken = dayDoses.filter((dose) => dose.status === 'taken').length;
    const dayTotal = dayDoses.length;
    const pct = dayTotal === 0 ? 100 : Math.round((dayTaken / dayTotal) * 100);

    return {
      dateStr,
      dayLabel: d.toLocaleDateString('en-US', { weekday: 'short' }),
      total: dayTotal,
      taken: dayTaken,
      percentage: pct,
    };
  });

  // Calculate stats by medication
  const medBreakdown = state.medications.map((med) => {
    const medDoses = state.doses.filter((d) => d.medicationId === med.id);
    const taken = medDoses.filter((d) => d.status === 'taken').length;
    const missed = medDoses.filter((d) => d.status === 'missed').length;
    const rate = medDoses.length === 0 ? 100 : Math.round((taken / medDoses.length) * 100);
    return {
      id: med.id,
      name: med.name,
      dosage: med.dosage,
      total: medDoses.length,
      taken,
      missed,
      rate,
    };
  });

  const totalUpcomingAppointments = state.appointments.filter(
    (a) => a.date >= todayStr && a.status === 'upcoming'
  ).length;

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
            Adherence Analytics & Health Trends
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            Comprehensive analytics derived directly from verified medication logs and clinical records.
          </p>
        </div>

        <div className="badge badge-success" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
          Real-time Engine Active
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid-4">
        <div className="card">
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>
            Today's Adherence
          </span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-teal-dark)', marginTop: '0.35rem' }}>
            {stats.todayAdherence}%
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            {stats.completedDoses} of {stats.totalScheduled} doses recorded
          </span>
        </div>

        <div className="card">
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>
            7-Day Evaluated Trend
          </span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy)', marginTop: '0.35rem' }}>
            {stats.weeklyAdherence}%
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            Across all scheduled medications
          </span>
        </div>

        <div className="card">
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>
            Missed Dose Count
          </span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#dc2626', marginTop: '0.35rem' }}>
            {stats.missedDoses}
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            Recorded in past 7 days
          </span>
        </div>

        <div className="card">
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>
            Upcoming Doctor Visits
          </span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0284c7', marginTop: '0.35rem' }}>
            {totalUpcomingAppointments}
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            Scheduled consultations
          </span>
        </div>
      </div>

      {/* 7-Day Trend CSS Visual Bar Chart */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">7-Day Medication Adherence Trajectory</h2>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
              Daily completion rate based on real logged doses
            </span>
          </div>
          <span className="badge badge-info">Target: 85%+</span>
        </div>

        {/* Visual Bar Columns */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            height: '220px',
            paddingTop: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid var(--border-medium)',
            gap: '1rem',
          }}
        >
          {past7DaysData.map((d, index) => {
            const isToday = d.dateStr === todayStr;
            const barHeight = Math.max(d.percentage, 10);

            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  height: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                {/* Percentage label above bar */}
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    marginBottom: '0.35rem',
                    color: isToday ? 'var(--color-teal)' : 'var(--text-muted)',
                  }}
                >
                  {d.percentage}%
                </span>

                {/* Vertical Bar */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '46px',
                    height: `${barHeight}%`,
                    backgroundColor: isToday ? 'var(--color-teal)' : '#0f172a',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.4s ease',
                  }}
                />

                {/* Day label under bar */}
                <span
                  style={{
                    marginTop: '0.65rem',
                    fontSize: 'var(--text-xs)',
                    fontWeight: isToday ? 800 : 500,
                    color: isToday ? 'var(--color-teal)' : 'var(--text-light)',
                  }}
                >
                  {d.dayLabel}
                  {isToday && ' (Today)'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Medication-Specific Adherence Breakdown Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Adherence Breakdown by Prescription</h2>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
            Individual therapy performance
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-light)' }}>
                <th style={{ padding: '0.75rem 0.5rem' }}>Prescription</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Dosage</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Total Tracked</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Taken</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Missed</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Compliance Rate</th>
              </tr>
            </thead>
            <tbody>
              {medBreakdown.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                    {item.name}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{item.dosage}</td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>{item.total}</td>
                  <td style={{ padding: '0.75rem 0.5rem', color: 'var(--status-success-text)', fontWeight: 600 }}>
                    {item.taken}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', color: item.missed > 0 ? '#dc2626' : 'var(--text-muted)' }}>
                    {item.missed}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800 }}>{item.rate}%</span>
                      <div
                        style={{
                          width: '80px',
                          height: '6px',
                          backgroundColor: 'var(--border-light)',
                          borderRadius: '999px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${item.rate}%`,
                            height: '100%',
                            backgroundColor: item.rate >= 80 ? 'var(--color-teal)' : '#f59e0b',
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
