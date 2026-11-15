'use client';

import React from 'react';
import Link from 'next/link';
import { DemoUser, Role } from '@/lib/types';
import { ROLE_PERMISSIONS } from '@/lib/constants';

export type DashboardTab =
  | 'overview'
  | 'medications'
  | 'appointments'
  | 'care-circle'
  | 'ai-assistant'
  | 'analytics'
  | 'settings';

interface SidebarProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  currentUser: DemoUser;
  onLogout: () => void;
  unreadNotificationCount: number;
  onOpenNotifications: () => void;
}

export function Sidebar({
  currentTab,
  onSelectTab,
  currentUser,
  onLogout,
  unreadNotificationCount,
  onOpenNotifications,
}: SidebarProps) {
  const permissions = ROLE_PERMISSIONS[currentUser.role];

  const navItems: { id: DashboardTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'medications', label: 'Medications', icon: '💊' },
    { id: 'appointments', label: 'Appointments', icon: '🗓️' },
    { id: 'care-circle', label: 'Family Care Circle', icon: '👨‍👩‍👧' },
    { id: 'ai-assistant', label: 'AI Care Assistant', icon: '🤖' },
    { id: 'analytics', label: 'Analytics & Trends', icon: '📈' },
    { id: 'settings', label: 'Settings & Accessibility', icon: '⚙️' },
  ];

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        height: '100vh',
        position: 'sticky',
        top: 0,
        padding: '1.25rem 1rem',
      }}
    >
      <div>
        {/* Brand Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontWeight: 800,
              fontSize: '1.25rem',
              color: 'var(--color-navy)',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1rem',
              }}
            >
              C
            </div>
            <span>
              Care<span style={{ color: 'var(--color-teal)' }}>Circle</span>
            </span>
          </Link>

          {/* Quick Notification Bell Button */}
          <button
            type="button"
            onClick={onOpenNotifications}
            style={{
              position: 'relative',
              padding: '0.4rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-subtle)',
              fontSize: '1.1rem',
              cursor: 'pointer',
            }}
            title="Notification Center"
          >
            🔔
            {unreadNotificationCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {unreadNotificationCount}
              </span>
            )}
          </button>
        </div>

        {/* Current User Persona Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-navy)' }}>
              {currentUser.name}
            </span>
            <span
              className="badge"
              style={{
                backgroundColor: permissions.roleBadgeColor,
                color: '#ffffff',
                fontSize: '0.68rem',
              }}
            >
              {currentUser.role}
            </span>
          </div>
          <span
            style={{
              display: 'block',
              fontSize: '0.75rem',
              color: 'var(--text-light)',
              marginTop: '0.2rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {currentUser.relationship}
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.7rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? 'var(--color-mint)' : 'transparent',
                  color: isActive ? 'var(--color-teal-dark)' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--color-mint-border)' : '1px solid transparent',
                  textAlign: 'left',
                  transition: 'background-color 0.15s ease',
                  width: '100%',
                }}
              >
                <span style={{ fontSize: '1.15rem' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div
        style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-light)',
            textAlign: 'center',
            display: 'block',
          }}
        >
          View Landing Page
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="btn btn-outline btn-sm"
          style={{
            width: '100%',
            color: '#dc2626',
            borderColor: '#fecaca',
            backgroundColor: '#fef2f2',
          }}
        >
          Sign Out ({currentUser.name.split(' ')[0]})
        </button>
      </div>
    </aside>
  );
}
