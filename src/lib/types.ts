export type Role = 'Senior' | 'Family Member' | 'Caregiver';

export interface DemoUser {
  id: string;
  name: string;
  role: Role;
  pin: string;
  email: string;
  phone: string;
  relationship: string;
  description: string;
}

export type DoseStatus = 'upcoming' | 'taken' | 'missed' | 'skipped';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  schedule: string[]; // e.g. ["08:00", "20:00"]
  startDate: string;
  endDate?: string;
  instructions: string;
  active: boolean;
  purpose: string;
  colorCode: string;
}

export interface DoseRecord {
  id: string;
  medicationId: string;
  medicationName: string;
  dosage: string;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // HH:mm
  status: DoseStatus;
  takenAt?: string; // ISO string
  recordedBy?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  hospital: string;
  notes: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  locationType: 'in-person' | 'telehealth';
}

export interface CareCircleMember {
  id: string;
  name: string;
  role: Role;
  relationship: string;
  phone: string;
  email: string;
  isEmergencyContact: boolean;
  canManageMedications: boolean;
  canManageAppointments: boolean;
  canLogDoses: boolean;
}

export interface CareNote {
  id: string;
  authorName: string;
  authorRole: Role;
  createdAt: string;
  content: string;
  category: 'general' | 'medication' | 'appointment' | 'wellness';
}

export interface CareActivity {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: Role;
  action: string;
  details: string;
  type: 'medication' | 'appointment' | 'note' | 'reminder';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'dose_reminder' | 'dose_missed' | 'appointment_reminder' | 'system';
  timestamp: string;
  isRead: boolean;
  dismissed: boolean;
}

export interface UserSettings {
  textSize: 'normal' | 'large' | 'extra-large';
  highContrast: boolean;
  enableEmailReminders: boolean;
  reminderLeadMinutes: number;
  emailRecipient: string;
}

export interface AppState {
  medications: Medication[];
  doses: DoseRecord[];
  appointments: Appointment[];
  careMembers: CareCircleMember[];
  careNotes: CareNote[];
  activities: CareActivity[];
  notifications: NotificationItem[];
  settings: UserSettings;
}

export interface AdherenceStats {
  todayAdherence: number;
  weeklyAdherence: number;
  totalScheduled: number;
  completedDoses: number;
  missedDoses: number;
  skippedDoses: number;
  upcomingToday: number;
}
