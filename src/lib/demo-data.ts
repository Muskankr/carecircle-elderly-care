import {
  Medication,
  DoseRecord,
  Appointment,
  CareCircleMember,
  CareNote,
  CareActivity,
  NotificationItem,
  UserSettings,
  AppState,
} from './types';
import { getTodayDateString } from './utils';

const today = getTodayDateString();

// 3 days ago & 1 day ago helpers for realistic history
function getPastDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const yesterday = getPastDate(1);
const twoDaysAgo = getPastDate(2);
const threeDaysAgo = getPastDate(3);

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-1',
    name: 'Amlodipine',
    dosage: '5 mg tablet',
    frequency: 'Once Daily',
    schedule: ['08:00'],
    startDate: '2026-01-10',
    instructions: 'Take 1 tablet every morning with a glass of water after breakfast. Monitor BP weekly.',
    active: true,
    purpose: 'Blood Pressure & Heart Health',
    colorCode: '#0d6e71', // Teal
  },
  {
    id: 'med-2',
    name: 'Metformin Hydrochloride',
    dosage: '500 mg tablet',
    frequency: 'Twice Daily',
    schedule: ['08:30', '20:30'],
    startDate: '2026-02-15',
    instructions: 'Take 1 tablet with morning and evening meals to minimize digestive discomfort.',
    active: true,
    purpose: 'Blood Glucose Management',
    colorCode: '#0284c7', // Sky Blue
  },
  {
    id: 'med-3',
    name: 'Vitamin D3 (Cholecalciferol)',
    dosage: '1000 IU softgel',
    frequency: 'Once Daily',
    schedule: ['09:00'],
    startDate: '2026-03-01',
    instructions: 'Take after breakfast. Helps maintain calcium balance and bone density.',
    active: true,
    purpose: 'Bone Density & Immunity',
    colorCode: '#d97706', // Amber
  },
  {
    id: 'med-4',
    name: 'Atorvastatin',
    dosage: '10 mg tablet',
    frequency: 'Once Daily (Bedtime)',
    schedule: ['21:00'],
    startDate: '2026-01-20',
    instructions: 'Take 1 tablet at night before sleep. Do not skip evening dose.',
    active: true,
    purpose: 'Cholesterol Regulation',
    colorCode: '#7c3aed', // Purple
  },
];

export const INITIAL_DOSES: DoseRecord[] = [
  // Today's Doses
  {
    id: 'dose-today-1',
    medicationId: 'med-1',
    medicationName: 'Amlodipine',
    dosage: '5 mg',
    scheduledDate: today,
    scheduledTime: '08:00',
    status: 'taken',
    takenAt: `${today}T08:08:00Z`,
    recordedBy: 'Meera Sharma',
    notes: 'Taken with warm water after toast.',
  },
  {
    id: 'dose-today-2',
    medicationId: 'med-2',
    medicationName: 'Metformin Hydrochloride',
    dosage: '500 mg',
    scheduledDate: today,
    scheduledTime: '08:30',
    status: 'taken',
    takenAt: `${today}T08:35:00Z`,
    recordedBy: 'Ramesh Kumar',
    notes: 'Administered with breakfast.',
  },
  {
    id: 'dose-today-3',
    medicationId: 'med-3',
    medicationName: 'Vitamin D3',
    dosage: '1000 IU',
    scheduledDate: today,
    scheduledTime: '09:00',
    status: 'upcoming',
  },
  {
    id: 'dose-today-4',
    medicationId: 'med-2',
    medicationName: 'Metformin Hydrochloride',
    dosage: '500 mg',
    scheduledDate: today,
    scheduledTime: '20:30',
    status: 'upcoming',
  },
  {
    id: 'dose-today-5',
    medicationId: 'med-4',
    medicationName: 'Atorvastatin',
    dosage: '10 mg',
    scheduledDate: today,
    scheduledTime: '21:00',
    status: 'upcoming',
  },
  // Yesterday's Doses
  {
    id: 'dose-yest-1',
    medicationId: 'med-1',
    medicationName: 'Amlodipine',
    dosage: '5 mg',
    scheduledDate: yesterday,
    scheduledTime: '08:00',
    status: 'taken',
    takenAt: `${yesterday}T08:05:00Z`,
    recordedBy: 'Meera Sharma',
  },
  {
    id: 'dose-yest-2',
    medicationId: 'med-2',
    medicationName: 'Metformin Hydrochloride',
    dosage: '500 mg',
    scheduledDate: yesterday,
    scheduledTime: '08:30',
    status: 'taken',
    takenAt: `${yesterday}T08:40:00Z`,
    recordedBy: 'Meera Sharma',
  },
  {
    id: 'dose-yest-3',
    medicationId: 'med-3',
    medicationName: 'Vitamin D3',
    dosage: '1000 IU',
    scheduledDate: yesterday,
    scheduledTime: '09:00',
    status: 'taken',
    takenAt: `${yesterday}T09:10:00Z`,
    recordedBy: 'Meera Sharma',
  },
  {
    id: 'dose-yest-4',
    medicationId: 'med-2',
    medicationName: 'Metformin Hydrochloride',
    dosage: '500 mg',
    scheduledDate: yesterday,
    scheduledTime: '20:30',
    status: 'taken',
    takenAt: `${yesterday}T20:32:00Z`,
    recordedBy: 'Ramesh Kumar',
  },
  {
    id: 'dose-yest-5',
    medicationId: 'med-4',
    medicationName: 'Atorvastatin',
    dosage: '10 mg',
    scheduledDate: yesterday,
    scheduledTime: '21:00',
    status: 'taken',
    takenAt: `${yesterday}T21:02:00Z`,
    recordedBy: 'Meera Sharma',
  },
  // Two Days Ago Doses (with 1 missed dose to show adherence calculation)
  {
    id: 'dose-2d-1',
    medicationId: 'med-1',
    medicationName: 'Amlodipine',
    dosage: '5 mg',
    scheduledDate: twoDaysAgo,
    scheduledTime: '08:00',
    status: 'taken',
    takenAt: `${twoDaysAgo}T08:15:00Z`,
    recordedBy: 'Meera Sharma',
  },
  {
    id: 'dose-2d-2',
    medicationId: 'med-2',
    medicationName: 'Metformin Hydrochloride',
    dosage: '500 mg',
    scheduledDate: twoDaysAgo,
    scheduledTime: '08:30',
    status: 'taken',
    takenAt: `${twoDaysAgo}T08:45:00Z`,
    recordedBy: 'Meera Sharma',
  },
  {
    id: 'dose-2d-3',
    medicationId: 'med-3',
    medicationName: 'Vitamin D3',
    dosage: '1000 IU',
    scheduledDate: twoDaysAgo,
    scheduledTime: '09:00',
    status: 'missed',
    notes: 'Out for morning temple walk, dose was missed.',
  },
  {
    id: 'dose-2d-4',
    medicationId: 'med-2',
    medicationName: 'Metformin Hydrochloride',
    dosage: '500 mg',
    scheduledDate: twoDaysAgo,
    scheduledTime: '20:30',
    status: 'taken',
    takenAt: `${twoDaysAgo}T20:40:00Z`,
    recordedBy: 'Ramesh Kumar',
  },
  {
    id: 'dose-2d-5',
    medicationId: 'med-4',
    medicationName: 'Atorvastatin',
    dosage: '10 mg',
    scheduledDate: twoDaysAgo,
    scheduledTime: '21:00',
    status: 'taken',
    takenAt: `${twoDaysAgo}T21:10:00Z`,
    recordedBy: 'Meera Sharma',
  },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    doctorName: 'Dr. Arvind Patel',
    specialty: 'Cardiology Specialist',
    date: '2026-11-28',
    time: '10:30',
    hospital: 'Apex Heart & Vascular Care Institute, Suite 402',
    notes: 'Quarterly blood pressure review. Bring current BP readings log from past 2 weeks.',
    status: 'upcoming',
    locationType: 'in-person',
  },
  {
    id: 'apt-2',
    doctorName: 'Dr. Sunita Rao',
    specialty: 'Endocrinology & Diabetology',
    date: '2026-12-08',
    time: '14:00',
    hospital: 'Fortis Memorial Healthcare Clinic, OPD 2',
    notes: 'Routine HbA1c evaluation and Metformin dosage checkup. Fasting blood sample required.',
    status: 'upcoming',
    locationType: 'in-person',
  },
  {
    id: 'apt-3',
    doctorName: 'Dr. Rajesh Verma',
    specialty: 'Ophthalmology & Retinal Care',
    date: '2026-11-04',
    time: '11:00',
    hospital: 'Vision Eye Hospital, Room 108',
    notes: 'Diabetic retinopathy screening completed. Normal intraocular pressure.',
    status: 'completed',
    locationType: 'in-person',
  },
];

export const INITIAL_CARE_MEMBERS: CareCircleMember[] = [
  {
    id: 'member-1',
    name: 'Meera Sharma',
    role: 'Senior',
    relationship: 'Self (Care Recipient, Age 68)',
    phone: '+91 98765 43210',
    email: 'meera.sharma@example.com',
    isEmergencyContact: false,
    canManageMedications: true,
    canManageAppointments: true,
    canLogDoses: true,
  },
  {
    id: 'member-2',
    name: 'Ananya Sharma',
    role: 'Family Member',
    relationship: 'Daughter & Primary Care Coordinator',
    phone: '+91 98765 12345',
    email: 'ananya.sharma@example.com',
    isEmergencyContact: true,
    canManageMedications: true,
    canManageAppointments: true,
    canLogDoses: true,
  },
  {
    id: 'member-3',
    name: 'Ramesh Kumar',
    role: 'Caregiver',
    relationship: 'Certified In-Home Health Assistant',
    phone: '+91 98111 22334',
    email: 'ramesh.caregiver@example.com',
    isEmergencyContact: false,
    canManageMedications: false,
    canManageAppointments: false,
    canLogDoses: true,
  },
  {
    id: 'member-4',
    name: 'Dr. Arvind Patel',
    role: 'Caregiver',
    relationship: 'Attending Cardiologist',
    phone: '+91 99222 33445',
    email: 'dr.patel@apexheart.org',
    isEmergencyContact: false,
    canManageMedications: true,
    canManageAppointments: true,
    canLogDoses: false,
  },
];

export const INITIAL_CARE_NOTES: CareNote[] = [
  {
    id: 'note-1',
    authorName: 'Ananya Sharma',
    authorRole: 'Family Member',
    createdAt: `${yesterday}T18:30:00Z`,
    content: 'Mom felt energetic during the evening balcony walk. Morning blood pressure was normal at 122/80 mmHg.',
    category: 'wellness',
  },
  {
    id: 'note-2',
    authorName: 'Ramesh Kumar',
    authorRole: 'Caregiver',
    createdAt: `${twoDaysAgo}T09:30:00Z`,
    content: 'Completed gentle knee extension exercises. Meera Ji reported mild stiffness in the left ankle.',
    category: 'general',
  },
  {
    id: 'note-3',
    authorName: 'Meera Sharma',
    authorRole: 'Senior',
    createdAt: `${threeDaysAgo}T14:15:00Z`,
    content: 'Finished reading chapter 3 of gardening book. Took lemon tea in afternoon.',
    category: 'wellness',
  },
];

export const INITIAL_ACTIVITIES: CareActivity[] = [
  {
    id: 'act-1',
    timestamp: `${today}T08:35:00Z`,
    actorName: 'Ramesh Kumar',
    actorRole: 'Caregiver',
    action: 'Dose Administered',
    details: 'Logged Metformin 500 mg dose taken after breakfast.',
    type: 'medication',
  },
  {
    id: 'act-2',
    timestamp: `${today}T08:08:00Z`,
    actorName: 'Meera Sharma',
    actorRole: 'Senior',
    action: 'Dose Recorded',
    details: 'Logged Amlodipine 5 mg taken on schedule.',
    type: 'medication',
  },
  {
    id: 'act-3',
    timestamp: `${yesterday}T18:30:00Z`,
    actorName: 'Ananya Sharma',
    actorRole: 'Family Member',
    action: 'Care Note Added',
    details: 'Added a note regarding normal blood pressure reading (122/80 mmHg).',
    type: 'note',
  },
  {
    id: 'act-4',
    timestamp: `${twoDaysAgo}T11:00:00Z`,
    actorName: 'Ananya Sharma',
    actorRole: 'Family Member',
    action: 'Appointment Confirmed',
    details: 'Scheduled upcoming Cardiology review with Dr. Arvind Patel for Nov 28.',
    type: 'appointment',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Upcoming Dose Reminder',
    message: 'Vitamin D3 (1000 IU) scheduled at 9:00 AM.',
    type: 'dose_reminder',
    timestamp: `${today}T08:45:00Z`,
    isRead: false,
    dismissed: false,
  },
  {
    id: 'notif-2',
    title: 'Upcoming Doctor Appointment',
    message: 'Appointment with Dr. Arvind Patel (Cardiology) on Nov 28 at 10:30 AM.',
    type: 'appointment_reminder',
    timestamp: `${yesterday}T10:00:00Z`,
    isRead: false,
    dismissed: false,
  },
  {
    id: 'notif-3',
    title: 'Adherence Milestone Reached',
    message: '90%+ medication adherence sustained over the past 7 days. Great progress!',
    type: 'system',
    timestamp: `${twoDaysAgo}T20:00:00Z`,
    isRead: true,
    dismissed: false,
  },
];

export const INITIAL_SETTINGS: UserSettings = {
  textSize: 'normal',
  highContrast: false,
  enableEmailReminders: true,
  reminderLeadMinutes: 15,
  emailRecipient: 'ananya.sharma@example.com',
};

export function getDefaultAppState(): AppState {
  return {
    medications: INITIAL_MEDICATIONS,
    doses: INITIAL_DOSES,
    appointments: INITIAL_APPOINTMENTS,
    careMembers: INITIAL_CARE_MEMBERS,
    careNotes: INITIAL_CARE_NOTES,
    activities: INITIAL_ACTIVITIES,
    notifications: INITIAL_NOTIFICATIONS,
    settings: INITIAL_SETTINGS,
  };
}
