'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DEMO_USERS } from '@/lib/constants';
import { DemoUser } from '@/lib/types';
import { loadUserSession, saveUserSession } from '@/lib/storage';

export default function LoginPage() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<DemoUser>(DEMO_USERS[0]);
  const [pin, setPin] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const session = loadUserSession();
    if (session) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSelectUser = (user: DemoUser) => {
    setSelectedUser(user);
    setPin(user.pin); // Autofill PIN for demo convenience
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!pin.trim()) {
      setError('Please enter your 4-digit PIN.');
      return;
    }

    if (pin.trim() !== selectedUser.pin) {
      setError(`Incorrect PIN for ${selectedUser.name}. Try ${selectedUser.pin}.`);
      return;
    }

    setIsLoading(true);
    saveUserSession(selectedUser);

    setTimeout(() => {
      router.push('/dashboard');
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-page)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Bar */}
      <header
        style={{
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: '#ffffff',
          padding: '1rem 0',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <Link href="/" className="btn btn-outline btn-sm">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      {/* Login Main Container */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
        }}
      >
        <div
          className="card"
          style={{
            maxWidth: '480px',
            width: '100%',
            padding: '2.25rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <h1
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 800,
                color: 'var(--color-navy)',
                marginBottom: '0.35rem',
              }}
            >
              Role-Based Demo Access
            </h1>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
              Select a persona below to experience their customized care view.
            </p>
          </div>

          {/* Persona Selection Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase' }}>
              Choose Demo Persona
            </span>
            {DEMO_USERS.map((user) => {
              const isSelected = selectedUser.id === user.id;
              return (
                <button
                  type="button"
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--color-teal)' : '1px solid var(--border-medium)',
                    backgroundColor: isSelected ? 'var(--color-mint)' : '#ffffff',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-navy)' }}>
                        {user.name}
                      </span>
                      <span
                        className={`badge ${
                          user.role === 'Senior'
                            ? 'badge-success'
                            : user.role === 'Family Member'
                            ? 'badge-info'
                            : 'badge-warning'
                        }`}
                        style={{ fontSize: '0.7rem' }}
                      >
                        {user.role}
                      </span>
                    </div>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', display: 'block', marginTop: '0.15rem' }}>
                      {user.relationship}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <code
                      style={{
                        fontSize: 'var(--text-xs)',
                        padding: '0.2rem 0.4rem',
                        backgroundColor: '#ffffff',
                        border: '1px solid var(--border-light)',
                        borderRadius: '4px',
                        color: 'var(--color-navy)',
                      }}
                    >
                      PIN: {user.pin}
                    </code>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="pin-input" className="form-label">
                Security PIN for {selectedUser.name}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="pin-input"
                  type={showPin ? 'text' : 'password'}
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  className="form-input"
                  style={{
                    letterSpacing: showPin ? 'normal' : '0.25em',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                  }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    padding: '4px 8px',
                  }}
                >
                  {showPin ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="form-helper">
                Preset demo PIN: <strong>{selectedUser.pin}</strong>
              </p>
            </div>

            {error && (
              <div
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--status-danger-bg)',
                  border: '1px solid var(--status-danger-border)',
                  color: 'var(--status-danger-text)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  marginBottom: '1.25rem',
                }}
                role="alert"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '1rem', padding: '0.8rem' }}
            >
              {isLoading ? 'Entering Dashboard...' : `Sign In as ${selectedUser.name} (${selectedUser.role})`}
            </button>
          </form>

          {/* Disclaimer Banner */}
          <div
            style={{
              marginTop: '1.75rem',
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              color: 'var(--text-light)',
              lineHeight: 1.5,
              border: '1px solid var(--border-light)',
            }}
          >
            <strong>Prototype Security Notice:</strong> This PIN authentication flow is a
            demonstration mechanism using browser localStorage session tokens. It is designed for
            hackathon evaluations and does not replace HIPAA/GDPR production-grade healthcare security.
          </div>
        </div>
      </main>
    </div>
  );
}
