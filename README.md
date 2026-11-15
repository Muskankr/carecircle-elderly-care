# CareCircle — Intelligent Elderly Care & Medication Management Platform

> **"Better care, connected families, healthier everyday living."**  
> A unified, human-centred healthcare platform for seniors, family coordinators, and caregivers to manage medication adherence, doctor visits, and daily care routines.

---

## 🎯 Problem Statement
Managing chronic medications and medical appointments for elderly individuals is complex and fragmented:
- **Missed & Doubled Doses:** Over 50% of seniors with multiple prescriptions struggle with strict timing and confusing instructions.
- **Caregiver Anxiety:** Family members constantly worry whether daily pills were taken, leading to repetitive checking and stress.
- **Siloed Health Visits:** Clinical visits, specialist recommendations, and caregiver notes are scattered across paper slips and disjointed messaging apps.

CareCircle resolves this by placing the senior at the center of their health routine while providing shared, role-permissioned visibility to family members and healthcare assistants.

---

## 🚀 Key Features

1. **Daily Medication Adherence Engine**
   - Active prescriptions with dosages, multi-time schedules, and clinical instructions.
   - Real-time dose tracking: **Upcoming**, **Taken**, **Missed**, and **Skipped**.
   - Dynamic adherence rates calculated live from recorded doses (no fake hardcoded stats).

2. **Doctor & Clinical Appointments**
   - In-person and telehealth consultation scheduler.
   - Pre-visit preparation notes and clinic location details.
   - Categorized into upcoming consultations and past completed records.

3. **Family Care Circle**
   - Role-based permissions for **Senior** (Meera Sharma), **Family Coordinator** (Ananya Sharma), and **In-Home Caregiver** (Ramesh Kumar).
   - Shared Care Notes feed categorized into Wellness, Medication, and General observations.
   - Real-time audit activity feed capturing all logged doses and scheduled appointments.

4. **AI Care Assistant (Gemini + Deterministic Rule Engine)**
   - Context-aware chatbot answering schedule questions based on current patient records.
   - Pre-configured queries:
     - *"Which medicines are due today?"*
     - *"What doses were missed this week?"*
     - *"What appointments are coming up?"*
     - *"Summarize Meera's care activity."*
     - *"Give me a weekly medication adherence summary."*
   - Powered by Gemini 1.5 Flash when `GEMINI_API_KEY` is present.
   - Seamless, intelligent deterministic fallback answering with real data when no API key is supplied.

5. **Smart Reminders & Interactive Email Preview**
   - In-app notification center with read/unread status and dismiss controls.
   - Email reminder dispatch via Resend API when `RESEND_API_KEY` is configured.
   - Interactive demo preview mode rendering the full formatted HTML reminder payload when running without email credentials.

6. **Senior-Centric Accessibility**
   - WCAG AAA compliance: Touch targets exceeding 44px.
   - Dynamic typography scaling: Standard, Large, and Extra-Large font modes.
   - High-contrast display mode for clear visual boundaries in any lighting condition.

---

## 🛠️ Technology Stack
- **Framework:** Next.js 14.2.35 (App Router, Node.js runtime)
- **Library:** React 18, TypeScript 5
- **Styling:** CSS3 Custom Design System (deep navy, teal, mint, warm off-white)
- **Persistence:** Browser `localStorage` with schema validation and demo reset
- **AI Engine:** Google Gemini API (`@google/generative-ai` REST endpoint) with rule-based fallback
- **Email Delivery:** Resend REST API with interactive preview mode
- **Deployment:** Vercel ready

---

## 🔑 Demo Accounts & PINs

| Persona | Name | Role | PIN | Relationship & Access |
| :--- | :--- | :--- | :---: | :--- |
| **Senior** | Meera Sharma | Senior | `1234` | Full management of medications, doses, and visits. |
| **Family Member** | Ananya Sharma | Family Member | `2345` | Daughter & Primary Care Coordinator; can add/edit meds & visits. |
| **Caregiver** | Ramesh Kumar | Caregiver | `3456` | Certified Healthcare Assistant; can log administered doses and care notes. |

---

## 💻 Installation & Local Development

```bash
# 1. Navigate to the project directory
cd "C:\Users\MUSKAN KUMARI\OneDrive\Desktop\cat\Catalyst-CareCircle-Fresh"

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
http://localhost:3000
```

---

## ⚙️ Environment Variables (Optional)

Copy `.env.example` to `.env.local` to enable external cloud capabilities:

```dotenv
# Optional: Google Gemini API Key for generative care insights
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Resend API Key for live email notifications
RESEND_API_KEY=your_resend_api_key_here
REMINDER_FROM_EMAIL=onboarding@resend.dev
```

*Note: The application operates completely and reliably without any environment variables.*

---

## 🔒 Prototype Security Notice
This application is designed as a hackathon demonstration. PIN authentication and patient records are stored locally in the browser's `localStorage` for quick demonstration without requiring external database setups. In a production healthcare environment, this would be replaced with OAuth2/OIDC, encrypted database storage, and HIPAA/GDPR-compliant access controls.

---

## 🚢 Production Build & Deployment

### Build Command:
```bash
npm run build
```

### Deploy to Vercel:
```bash
# Using Vercel CLI
npx vercel
```
Or connect the repository on [vercel.com](https://vercel.com) and deploy directly.
