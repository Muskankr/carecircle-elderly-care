import { DoseRecord, AdherenceStats } from './types';

// Generate a unique ID safely in browser and server
export function generateId(prefix: string = 'id'): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${randomPart}`;
}

// Format ISO date (YYYY-MM-DD) to friendly display: e.g. "Sunday, Nov 15, 2026"
export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// Convert 24h "14:30" to "2:30 PM"
export function formatDisplayTime(timeStr: string): string {
  if (!timeStr) return '';
  const [hStr, mStr] = timeStr.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr || '00';
  if (isNaN(h)) return timeStr;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12;
  return `${h}:${m} ${ampm}`;
}

// Get today's local date string in YYYY-MM-DD format
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Compute dynamic adherence based on actual dose records
export function calculateAdherenceStats(
  doses: DoseRecord[],
  todayStr: string = getTodayDateString()
): AdherenceStats {
  const todayDoses = doses.filter((d) => d.scheduledDate === todayStr);
  const todayCompleted = todayDoses.filter((d) => d.status === 'taken').length;
  const todayTotal = todayDoses.length;
  const todayUpcoming = todayDoses.filter((d) => d.status === 'upcoming').length;

  // Today adherence: percentage of scheduled doses taken
  const todayAdherence =
    todayTotal === 0
      ? 100
      : Math.round((todayCompleted / todayTotal) * 100);

  // Weekly adherence calculation: last 7 days
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

  const pastWeekDoses = doses.filter(
    (d) => d.scheduledDate >= sevenDaysAgoStr && d.scheduledDate <= todayStr
  );
  const weekCompleted = pastWeekDoses.filter((d) => d.status === 'taken').length;
  const weekMissed = pastWeekDoses.filter((d) => d.status === 'missed').length;
  const weekSkipped = pastWeekDoses.filter((d) => d.status === 'skipped').length;
  const evaluatedWeekTotal = weekCompleted + weekMissed + weekSkipped;

  const weeklyAdherence =
    evaluatedWeekTotal === 0
      ? 100
      : Math.round((weekCompleted / evaluatedWeekTotal) * 100);

  return {
    todayAdherence,
    weeklyAdherence,
    totalScheduled: todayTotal,
    completedDoses: todayCompleted,
    missedDoses: todayDoses.filter((d) => d.status === 'missed').length,
    skippedDoses: todayDoses.filter((d) => d.status === 'skipped').length,
    upcomingToday: todayUpcoming,
  };
}

// Relative time string helper (e.g., "10 mins ago", "Just now")
export function getRelativeTimeString(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hr ago`;
  return `${Math.floor(diffSec / 86400)} day ago`;
}
