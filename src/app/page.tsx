'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <header
        style={{
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: '#ffffff',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: 800,
              fontSize: '1.35rem',
              color: 'var(--color-navy)',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.2rem',
                boxShadow: '0 2px 4px rgba(13, 148, 136, 0.25)',
              }}
            >
              C
            </div>
            <span>
              Care<span style={{ color: 'var(--color-teal)' }}>Circle</span>
            </span>
          </Link>

          {/* Nav Links & Demo CTAs */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a
              href="#features"
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--text-muted)',
              }}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--text-muted)',
              }}
            >
              How It Works
            </a>
            <a
              href="#accessibility"
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--text-muted)',
              }}
            >
              Accessibility
            </a>
            <Link href="/login" className="btn btn-outline btn-sm">
              Sign In
            </Link>
            <Link href="/login" className="btn btn-primary btn-sm">
              Explore Demo
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          backgroundColor: '#ffffff',
          paddingTop: '4.5rem',
          paddingBottom: '4.5rem',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '850px' }}>
          <div
            className="badge badge-info"
            style={{
              marginBottom: '1.25rem',
              padding: '0.4rem 0.9rem',
              fontSize: '0.85rem',
            }}
          >
            Intelligent Elderly Care & Medication Management Platform
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.1rem, 4vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.18,
              color: 'var(--color-navy)',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Better care, connected families,{' '}
            <span style={{ color: 'var(--color-teal)' }}>healthier everyday living.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              marginBottom: '2.5rem',
            }}
          >
            One connected space for daily medication management, doctor appointments,
            and family-supported elderly care. Designed for seniors to stay autonomous
            while keeping family and caregivers seamlessly aligned.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/login"
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
            >
              Explore Live Demo &rarr;
            </Link>
            <a
              href="#features"
              className="btn btn-outline"
              style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
            >
              Discover Key Features
            </a>
          </div>

          {/* Quick Demo Accounts Banner */}
          <div
            style={{
              marginTop: '3rem',
              padding: '1.25rem',
              backgroundColor: 'var(--color-mint)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-mint-border)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              textAlign: 'left',
            }}
          >
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--color-mint-text)',
                  letterSpacing: '0.05em',
                }}
              >
                Instant PIN Access
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--color-navy)', fontWeight: 600 }}>
                Try 3 Demo Profiles
              </span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  backgroundColor: '#ffffff',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                }}
              >
                👴 <strong>Senior</strong> (Meera): PIN <code>1234</code>
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
                  backgroundColor: '#ffffff',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                }}
              >
                👩 <strong>Family</strong> (Ananya): PIN <code>2345</code>
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
                  backgroundColor: '#ffffff',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                }}
              >
                👨‍⚕️ <strong>Caregiver</strong> (Ramesh): PIN <code>3456</code>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Statement */}
      <section
        style={{
          paddingTop: '4rem',
          paddingBottom: '4rem',
          backgroundColor: 'var(--bg-page)',
        }}
      >
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 800,
                color: 'var(--color-navy)',
                marginBottom: '0.75rem',
              }}
            >
              Why Elderly Healthcare Needs a Connected Circle
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
              Managing chronic medications and healthcare routines shouldn’t rely on scattered
              paper notes, forgotten phone calls, or fragmented communication.
            </p>
          </div>

          <div className="grid-3">
            <div className="card" style={{ borderTop: '4px solid #ef4444' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Missed & Doubled Doses
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Over 50% of seniors struggle with multi-drug schedules. Complex instructions lead
                to unintentional omissions, missed refills, and preventable health emergencies.
              </p>
            </div>

            <div className="card" style={{ borderTop: '4px solid #f59e0b' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Caregiver Anxiety
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Adult children and family coordinators constantly worry whether daily pills were
                taken on time, leading to repetitive checking that strains family dynamics.
              </p>
            </div>

            <div className="card" style={{ borderTop: '4px solid var(--color-teal)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Siloed Medical Visits
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Doctor appointments, specialty checkups, and clinician notes are rarely synced
                between visiting caregivers and family members who organize transportation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section
        id="features"
        style={{
          paddingTop: '4.5rem',
          paddingBottom: '4.5rem',
          backgroundColor: '#ffffff',
          borderTop: '1px solid var(--border-light)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="badge badge-success" style={{ marginBottom: '0.75rem' }}>
              Core Capabilities
            </div>
            <h2
              style={{
                fontSize: 'var(--text-3xl)',
                fontWeight: 800,
                color: 'var(--color-navy)',
              }}
            >
              Engineered for Simplicity, Safety, and Trust
            </h2>
          </div>

          <div className="grid-3">
            <div className="card">
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--status-info-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: '1rem',
                }}
              >
                💊
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Medication Adherence Engine
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Real-time tracking of scheduled, taken, skipped, and missed doses. Real adherence
                calculations update instantly without fake hardcoded stats.
              </p>
            </div>

            <div className="card">
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-mint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: '1rem',
                }}
              >
                👨‍👩‍👧
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Family Care Circle
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Shared visibility between seniors, adult children, and visiting nurses. Role-based
                permissions keep everyone informed while respecting senior autonomy.
              </p>
            </div>

            <div className="card">
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--status-warning-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: '1rem',
                }}
              >
                🗓️
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Doctor & Clinic Visits
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Keep track of upcoming consultations, doctor specialties, hospital locations,
                and required preparation notes with calendar reminders.
              </p>
            </div>

            <div className="card">
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-mint)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: '1rem',
                }}
              >
                🤖
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.5rem' }}>
                AI Care Assistant
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Powered by Gemini with smart deterministic fallbacks. Ask about upcoming doses,
                weekly trends, missed medications, and coordinated care notes.
              </p>
            </div>

            <div className="card">
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--status-info-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: '1rem',
                }}
              >
                🔔
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Smart Alerts & Email Preview
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                In-app notification centre plus optional Resend email dispatch with live interactive
                preview for test alerts and dose reminders.
              </p>
            </div>

            <div className="card">
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--status-warning-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: '1rem',
                }}
              >
                ♿
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Senior-Centric Accessibility
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Large touch targets (44px+), adjustable font sizes, high-contrast toggle,
                and high-legibility typography designed specifically for older eyes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        style={{
          paddingTop: '4.5rem',
          paddingBottom: '4.5rem',
          backgroundColor: 'var(--bg-page)',
        }}
      >
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 800,
                color: 'var(--color-navy)',
                marginBottom: '0.5rem',
              }}
            >
              How CareCircle Coordinates Daily Living
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              A frictionless workflow in three interconnected steps
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div
              className="card"
              style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-navy)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <div>
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-navy)' }}>
                  Personalize the Care & Medication Plan
                </h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Input daily prescriptions, frequency, specific times, instructions, and doctor appointments.
                </p>
              </div>
            </div>

            <div
              className="card"
              style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-teal)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}
              >
                2
              </div>
              <div>
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-navy)' }}>
                  Record Doses & Keep the Circle Updated
                </h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Mark medication as taken with one tap. Family members and assigned caregivers instantly
                  see adherence confirmation in the shared activity stream.
                </p>
              </div>
            </div>

            <div
              className="card"
              style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}
              >
                3
              </div>
              <div>
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--color-navy)' }}>
                  Proactive Reminders & AI Care Assistance
                </h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Get automated notifications before doses and appointments. Ask the AI assistant questions
                  about health routines, adherence trends, and past notes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Section */}
      <section
        id="accessibility"
        style={{
          paddingTop: '4rem',
          paddingBottom: '4rem',
          backgroundColor: '#ffffff',
          borderTop: '1px solid var(--border-light)',
        }}
      >
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <div className="badge badge-info" style={{ marginBottom: '1rem' }}>
            Built For Human Dignity
          </div>
          <h2
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 800,
              color: 'var(--color-navy)',
              marginBottom: '1rem',
            }}
          >
            Accessibility as a First-Class Feature
          </h2>
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: 'var(--text-base)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            CareCircle is engineered specifically for older adults and individuals with mild visual or
            motor impairments. Featuring high-contrast mode, adjustable typography scales,
            large accessible touch targets, and redundant color-independent status labels.
          </p>

          <div className="grid-3" style={{ textAlign: 'left' }}>
            <div
              style={{
                padding: '1.25rem',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <h4 style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
                44px+ Touch Targets
              </h4>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                All action buttons and form elements meet WCAG AAA target sizing standards for ease of tapping.
              </p>
            </div>
            <div
              style={{
                padding: '1.25rem',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <h4 style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
                Dynamic Text Sizing
              </h4>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                Scale from standard to large or extra-large text with a single click in Settings.
              </p>
            </div>
            <div
              style={{
                padding: '1.25rem',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <h4 style={{ fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.25rem' }}>
                High-Contrast Mode
              </h4>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                Deepened blacks and solid borders eliminate visual ambiguity in bright or dim lighting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        style={{
          paddingTop: '5rem',
          paddingBottom: '5rem',
          backgroundColor: 'var(--color-navy)',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '700px' }}>
          <h2
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 800,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Experience CareCircle Today
          </h2>
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            Launch the interactive demo now. Test the Senior, Family Coordinator, and Caregiver
            dashboards with instant PIN authentication and full offline persistence.
          </p>
          <Link
            href="/login"
            className="btn btn-primary"
            style={{
              padding: '0.85rem 2.25rem',
              fontSize: '1.05rem',
              backgroundColor: 'var(--color-teal)',
            }}
          >
            Launch Demo Application &rarr;
          </Link>
        </div>
      </section>

      {/* Professional Footer */}
      <footer
        style={{
          backgroundColor: '#0a0f1d',
          color: '#64748b',
          paddingTop: '3rem',
          paddingBottom: '2.5rem',
          borderTop: '1px solid #1e293b',
          fontSize: 'var(--text-sm)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.1rem' }}>
              Care<span style={{ color: 'var(--color-teal)' }}>Circle</span>
            </span>
            <p style={{ marginTop: '0.35rem', fontSize: 'var(--text-xs)' }}>
              Intelligent Elderly Care & Medication Management Platform. Built for individual hackathon demonstration.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: 'var(--text-xs)' }}>
            <Link href="/login" style={{ color: '#94a3b8' }}>
              Demo Login
            </Link>
            <a href="#features" style={{ color: '#94a3b8' }}>
              Architecture
            </a>
            <span style={{ color: '#475569' }}>
              Fictional Demonstration Data Only
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
