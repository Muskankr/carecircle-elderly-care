'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppState, DemoUser, Medication, Appointment, DoseRecord, CareNote, UserSettings, DoseStatus } from '@/lib/types';
import {
  loadAppState,
  saveAppState,
  resetAppState,
  loadUserSession,
  clearUserSession,
} from '@/lib/storage';
import { calculateAdherenceStats, generateId, getTodayDateString } from '@/lib/utils';
import { DEMO_USERS } from '@/lib/constants';

// Child components
import { Sidebar, DashboardTab } from '@/components/dashboard/Sidebar';
import { OverviewTab } from '@/components/dashboard/OverviewTab';
import { MedicationTab } from '@/components/medication/MedicationTab';
import { AppointmentsTab } from '@/components/appointments/AppointmentsTab';
import { CareCircleTab } from '@/components/care-circle/CareCircleTab';
import { AiAssistantTab } from '@/components/insights/AiAssistantTab';
import { AnalyticsTab } from '@/components/insights/AnalyticsTab';
import { SettingsTab } from '@/components/dashboard/SettingsTab';
import { NotificationsModal } from '@/components/dashboard/NotificationsModal';

export default function DashboardPage() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [appState, setAppState] = useState<AppState | null>(null);
  const [currentTab, setCurrentTab] = useState<DashboardTab>('overview');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [openAddMedModal, setOpenAddMedModal] = useState(false);
  const [openAddAptModal, setOpenAddAptModal] = useState(false);

  // Load session & persisted state on mount
  useEffect(() => {
    const session = loadUserSession();
    if (!session) {
      router.push('/login');
      return;
    }
    setCurrentUser(session);

    const state = loadAppState();
    setAppState(state);

    // Apply saved accessibility preferences
    if (state.settings) {
      if (state.settings.textSize === 'large') document.body.classList.add('font-large');
      if (state.settings.textSize === 'extra-large') document.body.classList.add('font-extra-large');
      if (state.settings.highContrast) document.body.classList.add('high-contrast');
    }
  }, [router]);

  // If still hydrating or unauthenticated, show clean calm loading screen
  if (!currentUser || !appState) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-page)',
          color: 'var(--color-navy)',
          fontWeight: 600,
          fontSize: '1.1rem',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-teal)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.25rem',
              marginBottom: '1rem',
            }}
          >
            C
          </div>
          <div>Loading CareCircle Platform...</div>
        </div>
      </div>
    );
  }

  // Calculate dynamic adherence statistics
  const stats = calculateAdherenceStats(appState.doses);

  // Unread notifications count
  const unreadCount = appState.notifications.filter((n) => !n.isRead && !n.dismissed).length;

  // Logout Handler
  const handleLogout = () => {
    clearUserSession();
    router.push('/login');
  };

  // Helper to update & persist AppState
  const updateAndSaveState = (updater: (prev: AppState) => AppState) => {
    setAppState((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      saveAppState(next);
      return next;
    });
  };

  // ----------------------------------------------------
  // Medication Handlers
  // ----------------------------------------------------
  const handleAddMedication = (med: Medication) => {
    updateAndSaveState((prev) => {
      // Also generate today's doses for this new medication
      const todayStr = getTodayDateString();
      const newDoses: DoseRecord[] = med.schedule.map((time) => ({
        id: generateId('dose'),
        medicationId: med.id,
        medicationName: med.name,
        dosage: med.dosage,
        scheduledDate: todayStr,
        scheduledTime: time,
        status: 'upcoming',
      }));

      const newActivity = {
        id: generateId('act'),
        timestamp: new Date().toISOString(),
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: 'Prescription Added',
        details: `Added new prescription for ${med.name} (${med.dosage}).`,
        type: 'medication' as const,
      };

      return {
        ...prev,
        medications: [...prev.medications, med],
        doses: [...newDoses, ...prev.doses],
        activities: [newActivity, ...prev.activities],
      };
    });
  };

  const handleUpdateMedication = (med: Medication) => {
    updateAndSaveState((prev) => ({
      ...prev,
      medications: prev.medications.map((m) => (m.id === med.id ? med : m)),
      activities: [
        {
          id: generateId('act'),
          timestamp: new Date().toISOString(),
          actorName: currentUser.name,
          actorRole: currentUser.role,
          action: 'Prescription Updated',
          details: `Updated schedule details for ${med.name}.`,
          type: 'medication',
        },
        ...prev.activities,
      ],
    }));
  };

  const handleDeleteMedication = (medId: string) => {
    updateAndSaveState((prev) => {
      const targetMed = prev.medications.find((m) => m.id === medId);
      return {
        ...prev,
        medications: prev.medications.filter((m) => m.id !== medId),
        activities: [
          {
            id: generateId('act'),
            timestamp: new Date().toISOString(),
            actorName: currentUser.name,
            actorRole: currentUser.role,
            action: 'Prescription Removed',
            details: `Removed prescription ${targetMed ? targetMed.name : ''}.`,
            type: 'medication',
          },
          ...prev.activities,
        ],
      };
    });
  };

  const handleMarkDose = (doseId: string, status: DoseStatus) => {
    updateAndSaveState((prev) => {
      const target = prev.doses.find((d) => d.id === doseId);
      const updatedDoses = prev.doses.map((d) =>
        d.id === doseId
          ? {
              ...d,
              status,
              takenAt: status === 'taken' ? new Date().toISOString() : undefined,
              recordedBy: currentUser.name,
            }
          : d
      );

      const newActivity = {
        id: generateId('act'),
        timestamp: new Date().toISOString(),
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: status === 'taken' ? 'Dose Taken' : status === 'skipped' ? 'Dose Skipped' : 'Dose Marked Missed',
        details: `${target?.medicationName} (${target?.dosage}) was marked as ${status}.`,
        type: 'medication' as const,
      };

      return {
        ...prev,
        doses: updatedDoses,
        activities: [newActivity, ...prev.activities],
      };
    });
  };

  // ----------------------------------------------------
  // Appointment Handlers
  // ----------------------------------------------------
  const handleAddAppointment = (apt: Appointment) => {
    updateAndSaveState((prev) => ({
      ...prev,
      appointments: [...prev.appointments, apt],
      activities: [
        {
          id: generateId('act'),
          timestamp: new Date().toISOString(),
          actorName: currentUser.name,
          actorRole: currentUser.role,
          action: 'Appointment Scheduled',
          details: `Consultation booked with ${apt.doctorName} (${apt.specialty}) for ${apt.date}.`,
          type: 'appointment',
        },
        ...prev.activities,
      ],
    }));
  };

  const handleUpdateAppointment = (apt: Appointment) => {
    updateAndSaveState((prev) => ({
      ...prev,
      appointments: prev.appointments.map((a) => (a.id === apt.id ? apt : a)),
      activities: [
        {
          id: generateId('act'),
          timestamp: new Date().toISOString(),
          actorName: currentUser.name,
          actorRole: currentUser.role,
          action: 'Appointment Updated',
          details: `Updated visit details with ${apt.doctorName}.`,
          type: 'appointment',
        },
        ...prev.activities,
      ],
    }));
  };

  const handleDeleteAppointment = (aptId: string) => {
    updateAndSaveState((prev) => {
      const target = prev.appointments.find((a) => a.id === aptId);
      return {
        ...prev,
        appointments: prev.appointments.filter((a) => a.id !== aptId),
        activities: [
          {
            id: generateId('act'),
            timestamp: new Date().toISOString(),
            actorName: currentUser.name,
            actorRole: currentUser.role,
            action: 'Appointment Cancelled',
            details: `Removed appointment with ${target ? target.doctorName : ''}.`,
            type: 'appointment',
          },
          ...prev.activities,
        ],
      };
    });
  };

  // ----------------------------------------------------
  // Care Notes Handler
  // ----------------------------------------------------
  const handleAddCareNote = (note: CareNote) => {
    updateAndSaveState((prev) => ({
      ...prev,
      careNotes: [note, ...prev.careNotes],
      activities: [
        {
          id: generateId('act'),
          timestamp: new Date().toISOString(),
          actorName: currentUser.name,
          actorRole: currentUser.role,
          action: 'Care Note Posted',
          details: `Added note: "${note.content.substring(0, 45)}..."`,
          type: 'note',
        },
        ...prev.activities,
      ],
    }));
  };

  // ----------------------------------------------------
  // Settings & Demo Reset Handlers
  // ----------------------------------------------------
  const handleUpdateSettings = (newSettings: UserSettings) => {
    updateAndSaveState((prev) => ({
      ...prev,
      settings: newSettings,
    }));
  };

  const handleResetDemoData = () => {
    const fresh = resetAppState();
    setAppState(fresh);
  };

  // ----------------------------------------------------
  // Notifications Handlers
  // ----------------------------------------------------
  const handleMarkNotifAsRead = (id: string) => {
    updateAndSaveState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    }));
  };

  const handleMarkAllNotifsAsRead = () => {
    updateAndSaveState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, isRead: true })),
    }));
  };

  const handleDismissNotif = (id: string) => {
    updateAndSaveState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, dismissed: true } : n)),
    }));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setOpenAddMedModal(false);
          setOpenAddAptModal(false);
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        unreadNotificationCount={unreadCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          padding: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {currentTab === 'overview' && (
          <OverviewTab
            state={appState}
            currentUser={currentUser}
            stats={stats}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onMarkDose={(id, status) => handleMarkDose(id, status)}
            onOpenAddMedication={() => {
              setCurrentTab('medications');
              setOpenAddMedModal(true);
            }}
            onOpenAddAppointment={() => {
              setCurrentTab('appointments');
              setOpenAddAptModal(true);
            }}
          />
        )}

        {currentTab === 'medications' && (
          <MedicationTab
            medications={appState.medications}
            doses={appState.doses}
            currentUser={currentUser}
            stats={stats}
            onAddMedication={handleAddMedication}
            onUpdateMedication={handleUpdateMedication}
            onDeleteMedication={handleDeleteMedication}
            onMarkDose={handleMarkDose}
            isAddModalOpenInitially={openAddMedModal}
          />
        )}

        {currentTab === 'appointments' && (
          <AppointmentsTab
            appointments={appState.appointments}
            currentUser={currentUser}
            onAddAppointment={handleAddAppointment}
            onUpdateAppointment={handleUpdateAppointment}
            onDeleteAppointment={handleDeleteAppointment}
            isAddModalOpenInitially={openAddAptModal}
          />
        )}

        {currentTab === 'care-circle' && (
          <CareCircleTab
            members={appState.careMembers}
            careNotes={appState.careNotes}
            activities={appState.activities}
            currentUser={currentUser}
            onAddCareNote={handleAddCareNote}
          />
        )}

        {currentTab === 'ai-assistant' && (
          <AiAssistantTab state={appState} currentUser={currentUser} />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsTab state={appState} stats={stats} />
        )}

        {currentTab === 'settings' && (
          <SettingsTab
            settings={appState.settings}
            currentUser={currentUser}
            onUpdateSettings={handleUpdateSettings}
            onResetDemoData={handleResetDemoData}
          />
        )}
      </main>

      {/* Notifications Modal */}
      <NotificationsModal
        notifications={appState.notifications}
        currentUser={currentUser}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAsRead={handleMarkNotifAsRead}
        onMarkAllAsRead={handleMarkAllNotifsAsRead}
        onDismiss={handleDismissNotif}
      />
    </div>
  );
}
