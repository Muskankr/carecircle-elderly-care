# CareCircle — AI-Powered Elderly Care & Medication Management

> **Better care, connected families, healthier everyday living.**

CareCircle is an AI-powered elderly care coordination platform designed to simplify medication management, improve care visibility, and connect seniors with their families and caregivers through one accessible digital experience.

Instead of relying on scattered reminders, paper prescriptions, and repetitive phone calls, CareCircle brings everyday care activities together in one place.

**One senior. One connected care circle. One smarter way to care.**

---

## 🌍 The Problem

Managing healthcare routines for elderly individuals is often fragmented, stressful, and difficult to coordinate.

- **Medication non-adherence:** Seniors managing multiple prescriptions may forget doses, confuse schedules, or accidentally miss medications.
- **Lack of care visibility:** Family members often have no reliable way to know whether medications were taken or daily care activities were completed.
- **Disconnected caregivers:** Family members and in-home caregivers struggle to maintain a shared understanding of the senior's daily health routine.
- **Fragmented medical information:** Appointment details, care observations, and medication instructions are often scattered across different platforms.

### Our Solution

CareCircle creates a centralized, role-aware care coordination experience where seniors, family coordinators, and caregivers can manage daily routines, record medication activity, coordinate appointments, and access contextual AI assistance.

---

## ✨ Key Features

### 1. Smart Medication Management
- Maintain medication profiles with dosage and scheduling information.
- Track individual doses as Upcoming, Taken, Missed, or Skipped.
- Calculate medication adherence dynamically from recorded dose activity.
- View daily medication schedules and relevant instructions.
- Maintain a chronological medication activity history.

### 2. Doctor Appointment Management
- Schedule and manage medical appointments.
- Support in-person and telehealth appointment records.
- Store consultation details, preparation notes, and clinic information.
- Separate upcoming appointments from completed visits.

### 3. Connected Family Care Circle
- Dedicated experiences for seniors, family coordinators, and caregivers.
- Role-aware access to relevant care activities.
- Shared care notes categorized by Wellness, Medication, and General observations.
- Activity timeline documenting important care events.
- Improved visibility into everyday caregiving responsibilities.

### 4. AI-Powered Care Assistant
CareCircle includes a contextual AI assistant designed to help users understand existing care records.

**Example questions:**
- Which medicines are due today?
- What doses were missed this week?
- What appointments are coming up?
- Summarize Meera's recent care activity.
- Give me a weekly medication adherence summary.

**AI architecture:**
- Google Gemini integration when `GEMINI_API_KEY` is configured.
- Deterministic rule-based fallback for supported queries when the API is unavailable.
- Contextual responses based on available application records.

The assistant is designed for care coordination, not medical diagnosis or independent treatment recommendations.

### 5. Smart Notifications & Email Reminders
- In-app notification center.
- Read/unread notification management.
- Dismissible reminders.
- Optional email delivery through Resend.
- Interactive email preview when live email credentials are unavailable.

### 6. Accessibility-First Experience
Designed to make everyday interaction easier for elderly users.

- Adjustable typography: Standard, Large, and Extra-Large.
- High-contrast display mode.
- Large, accessible interactive controls.
- Clear navigation and readable information hierarchy.
- Responsive layouts for desktop, tablet, and mobile devices.

---

## 👥 Demo Accounts

Explore CareCircle through three demonstration personas.

| Persona | Name | Role | Demo PIN |
|---|---|---|---|
| Senior | Meera Sharma | Senior | `1234` |
| Family Coordinator | Ananya Sharma | Family Member | `2345` |
| Caregiver | Ramesh Kumar | Caregiver | `3456` |

Each account demonstrates a different caregiving perspective and its corresponding application permissions.

**Note:** These are demonstration credentials for the prototype, not production authentication accounts.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 14, React 18 |
| Language | TypeScript |
| Routing | Next.js App Router |
| Styling | CSS3, Custom Design System |
| State Management | React Context API |
| Persistence | Browser localStorage |
| AI Integration | Google Gemini API |
| AI Fallback | Deterministic Rule Engine |
| Email Integration | Resend API |
| Deployment | Vercel |

---

## 🏗️ Application Architecture

```text
                    CARECIRCLE
                         |
              Next.js Application
                         |
          +--------------+--------------+
          |              |              |
       Senior          Family        Caregiver
      Interface      Coordinator     Interface
          |              |              |
          +--------------+--------------+
                         |
                 Central State Store
                  (React Context)
                         |
          +--------------+--------------+
          |              |              |
      Medication     Appointments     Care Notes
       Tracking       Management      & Activity
          |              |              |
          +--------------+--------------+
                         |
                  AI Care Assistant
                         |
             +-----------+-----------+
             |                       |
         Gemini API           Rule-Based Fallback
             |
        Contextual Insights
                         |
                Notification Layer
                         |
                 Resend Integration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later.
- npm.
- Git.

### Installation

Clone the repository:

```bash
git clone https://github.com/Muskankr/carecircle-elderly-care.git
```

Navigate into the project:

```bash
cd carecircle-elderly-care
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser:

```text
http://localhost:3000
```

### Production Build

Verify the production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## 🔐 Environment Configuration

CareCircle supports optional external integrations.

Create a `.env.local` file in the project root:

```env
# Google Gemini integration
GEMINI_API_KEY=your_gemini_api_key

# Resend email integration
RESEND_API_KEY=your_resend_api_key
REMINDER_FROM_EMAIL=onboarding@resend.dev
```

The application should retain its supported core functionality without these optional credentials through its fallback and preview modes.

**Security:** Never commit `.env.local` or expose API keys in frontend code or public repositories.

---

## 🔒 Security & Privacy

CareCircle is currently a hackathon prototype using browser-based localStorage persistence and demonstration PIN authentication.

It is not intended for storing real patient records or managing actual medical treatment.

A production implementation would require:

- Secure authentication and session management.
- Server-side authorization and role enforcement.
- Encrypted storage and secure API communication.
- Auditable access controls.
- Appropriate healthcare privacy and regulatory compliance.
- Reliable backups and data recovery.

---

## 🔮 Future Roadmap

CareCircle has the potential to evolve into a more comprehensive elderly care ecosystem.

Planned possibilities include:

- **Caregiver alerts:** Escalation workflows for missed medication events.
- **Voice-first interaction:** Easier access for seniors with limited digital literacy.
- **Family synchronization:** Secure cloud-based updates across multiple devices.
- **Prescription assistance:** Structured prescription uploads and medication information extraction.
- **Advanced analytics:** Long-term adherence trends and care activity reports.
- **Wearable integrations:** Incorporating relevant activity and wellness information.

---

## 💡 Why CareCircle?

CareCircle is built around an important idea:

**Elderly care should not depend on one person's memory or constant availability.**

By connecting medication tracking, family coordination, appointment management, and contextual AI assistance, CareCircle aims to make everyday caregiving more organized, transparent, and accessible.

Technology should not replace human care. It should make caring for people easier.

---

## 👩‍💻 Built By

**Muskan Kumari**

B.Tech Computer Science & Engineering (AI & ML)

GitHub: [@Muskankr](https://github.com/Muskankr)

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

<p align="center">
  <strong>CareCircle — Because better care begins with connection. ❤️</strong>
</p>
