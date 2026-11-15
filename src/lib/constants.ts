import { DemoUser, Role } from './types';

export const APP_NAME = 'CareCircle';
export const APP_TAGLINE = 'Intelligent Elderly Care & Medication Management';

export const DEMO_USERS: DemoUser[] = [
  {
    id: 'user-senior',
    name: 'Meera Sharma',
    role: 'Senior',
    pin: '1234',
    email: 'meera.sharma@example.com',
    phone: '+91 98765 43210',
    relationship: 'Self (Care Recipient)',
    description: 'Senior managing hypertension and diabetes routine with family support.',
  },
  {
    id: 'user-family',
    name: 'Ananya Sharma',
    role: 'Family Member',
    pin: '2345',
    email: 'ananya.sharma@example.com',
    phone: '+91 98765 12345',
    relationship: 'Daughter (Primary Care Coordinator)',
    description: 'Daughter monitoring health adherence, scheduling doctor visits and tracking care.',
  },
  {
    id: 'user-caregiver',
    name: 'Ramesh Kumar',
    role: 'Caregiver',
    pin: '3456',
    email: 'ramesh.caregiver@example.com',
    phone: '+91 98111 22334',
    relationship: 'Visiting Certified Healthcare Assistant',
    description: 'Professional assistant assisting with morning vitals, doses and physical therapy routines.',
  },
];

export interface RolePermissions {
  canAddMedication: boolean;
  canEditMedication: boolean;
  canDeleteMedication: boolean;
  canLogDose: boolean;
  canAddAppointment: boolean;
  canEditAppointment: boolean;
  canDeleteAppointment: boolean;
  canAddCareNote: boolean;
  canSendReminders: boolean;
  canResetData: boolean;
  roleBadgeColor: string;
}

export const ROLE_PERMISSIONS: Record<Role, RolePermissions> = {
  Senior: {
    canAddMedication: true,
    canEditMedication: true,
    canDeleteMedication: true,
    canLogDose: true,
    canAddAppointment: true,
    canEditAppointment: true,
    canDeleteAppointment: true,
    canAddCareNote: true,
    canSendReminders: true,
    canResetData: true,
    roleBadgeColor: '#0d6e71', // Teal
  },
  'Family Member': {
    canAddMedication: true,
    canEditMedication: true,
    canDeleteMedication: false, // Protected action for family
    canLogDose: true,
    canAddAppointment: true,
    canEditAppointment: true,
    canDeleteAppointment: true,
    canAddCareNote: true,
    canSendReminders: true,
    canResetData: false,
    roleBadgeColor: '#1d4ed8', // Royal Blue
  },
  Caregiver: {
    canAddMedication: false, // Caregivers can only log administered doses & notes
    canEditMedication: false,
    canDeleteMedication: false,
    canLogDose: true,
    canAddAppointment: false,
    canEditAppointment: false,
    canDeleteAppointment: false,
    canAddCareNote: true,
    canSendReminders: true,
    canResetData: false,
    roleBadgeColor: '#7c3aed', // Purple
  },
};
