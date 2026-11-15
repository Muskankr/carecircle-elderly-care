import { AppState, DemoUser } from './types';
import { getDefaultAppState } from './demo-data';

const APP_STATE_KEY = 'carecircle_app_state_v1';
const SESSION_KEY = 'carecircle_session_v1';

export function loadAppState(): AppState {
  if (typeof window === 'undefined') {
    return getDefaultAppState();
  }

  try {
    const raw = window.localStorage.getItem(APP_STATE_KEY);
    if (!raw) {
      const defaultState = getDefaultAppState();
      saveAppState(defaultState);
      return defaultState;
    }

    const parsed = JSON.parse(raw) as AppState;
    // Basic schema verification
    if (
      Array.isArray(parsed.medications) &&
      Array.isArray(parsed.doses) &&
      Array.isArray(parsed.appointments) &&
      Array.isArray(parsed.careMembers)
    ) {
      return parsed;
    }
    // If schema invalid, fallback to fresh demo state
    const defaultState = getDefaultAppState();
    saveAppState(defaultState);
    return defaultState;
  } catch (err) {
    console.error('Failed to read CareCircle state from localStorage:', err);
    return getDefaultAppState();
  }
}

export function saveAppState(state: AppState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save CareCircle state to localStorage:', err);
  }
}

export function resetAppState(): AppState {
  const fresh = getDefaultAppState();
  saveAppState(fresh);
  return fresh;
}

export function saveUserSession(user: DemoUser): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Failed to save user session:', err);
  }
}

export function loadUserSession(): DemoUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoUser;
  } catch {
    return null;
  }
}

export function clearUserSession(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch (err) {
    console.error('Failed to clear user session:', err);
  }
}
