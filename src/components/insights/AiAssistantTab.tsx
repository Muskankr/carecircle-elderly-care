'use client';

import React, { useState } from 'react';
import { AppState, DemoUser } from '@/lib/types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: 'gemini' | 'deterministic_fallback';
  disclaimer?: string;
  timestamp: string;
}

interface AiAssistantTabProps {
  state: AppState;
  currentUser: DemoUser;
}

const SUGGESTED_PROMPTS = [
  'Which medicines are due today?',
  'What doses were missed this week?',
  'What appointments are coming up?',
  "Summarize Meera's care activity.",
  'Give me a weekly medication adherence summary.',
];

export function AiAssistantTab({ state, currentUser }: AiAssistantTabProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hello ${currentUser.name}! I am your CareCircle AI Assistant. I can help you monitor Meera Sharma's daily doses, summarize recent care notes, review adherence trends, and check upcoming doctor consultations. How can I assist you today?`,
      source: 'deterministic_fallback',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (questionText: string) => {
    if (!questionText.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: questionText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionText.trim(),
          context: {
            medications: state.medications,
            doses: state.doses,
            appointments: state.appointments,
            careNotes: state.careNotes,
            userName: currentUser.name,
            userRole: currentUser.role,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('API server returned error');
      }

      const data = await response.json();

      const assistantMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'I could not generate an answer at this moment.',
        source: data.source,
        disclaimer: data.disclaimer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Unable to reach the assistant service right now. Please try asking again in a moment.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
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
            AI Care Assistant
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            Context-aware healthcare organizer powered by Gemini with intelligent deterministic fallback.
          </p>
        </div>

        <div className="badge badge-info" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
          🤖 Context Active: {state.medications.length} Meds • {state.appointments.length} Visits
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            type="button"
            key={idx}
            onClick={() => handleAsk(prompt)}
            disabled={isLoading}
            className="btn btn-outline btn-sm"
            style={{
              backgroundColor: '#ffffff',
              fontSize: 'var(--text-xs)',
              borderRadius: 'var(--radius-full)',
              padding: '0.35rem 0.85rem',
            }}
          >
            💬 {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Box */}
      <div
        className="card"
        style={{
          flex: 1,
          minHeight: '420px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.5rem',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            overflowY: 'auto',
            maxHeight: '480px',
            paddingRight: '0.5rem',
          }}
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    backgroundColor: isUser ? 'var(--color-navy)' : 'var(--bg-subtle)',
                    color: isUser ? '#ffffff' : 'var(--text-main)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1rem 1.25rem',
                    boxShadow: 'var(--shadow-sm)',
                    border: isUser ? 'none' : '1px solid var(--border-light)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.35rem',
                      fontSize: 'var(--text-xs)',
                      gap: '1rem',
                    }}
                  >
                    <span style={{ fontWeight: 700, color: isUser ? '#93c5fd' : 'var(--color-teal)' }}>
                      {isUser ? currentUser.name : 'CareCircle AI'}
                    </span>
                    <span style={{ color: isUser ? '#94a3b8' : 'var(--text-light)' }}>
                      {msg.timestamp}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: 'var(--text-sm)',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {msg.text}
                  </div>

                  {msg.source && (
                    <div style={{ marginTop: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        className="badge"
                        style={{
                          fontSize: '0.65rem',
                          backgroundColor: msg.source === 'gemini' ? '#ecfdf5' : '#f1f5f9',
                          color: msg.source === 'gemini' ? '#065f46' : '#475569',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        {msg.source === 'gemini' ? '✨ Gemini Generative AI' : '⚙️ Deterministic Rule Engine'}
                      </span>
                    </div>
                  )}

                  {msg.disclaimer && (
                    <div
                      style={{
                        marginTop: '0.5rem',
                        fontSize: '0.68rem',
                        color: isUser ? '#cbd5e1' : 'var(--text-light)',
                        fontStyle: 'italic',
                      }}
                    >
                      {msg.disclaimer}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-muted)',
                }}
              >
                Thinking and analyzing health records... ⏳
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(inputQuestion);
          }}
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Ask anything about Meera's medications, doctor visits, or adherence..."
            className="form-input"
            style={{ flex: 1 }}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuestion.trim()}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.5rem' }}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </div>

      {/* Professional Medical Disclaimer Box */}
      <div
        style={{
          padding: '0.85rem 1.25rem',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-light)',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-light)',
          lineHeight: 1.5,
        }}
      >
        <strong>Clinical Safety Disclaimer:</strong> CareCircle AI is designed exclusively for schedule
        organization, medication adherence tracking, and family care communication. It does not diagnose medical
        conditions, prescribe drug therapies, or replace professional consultation with licensed medical doctors.
      </div>
    </div>
  );
}
