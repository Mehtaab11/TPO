# 🎓 Training and Placement Office (TPO) Web Application

An enterprise-grade, production-ready **Training & Placement Office (TPO) Campus Recruitment Portal** built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, and **Neon PostgreSQL**.

---

## 🌟 Key Features & Workflows

### 🎓 Student Portal
- **Academic Profile Management**: Update CGPA, active backlogs, branch, graduation year, skill tags, and PDF resume URL.
- **Automated Eligibility Engine**: Real-time eligibility calculation (**Eligible** vs **Ineligible**) displaying precise breakdown rules (min CGPA, max backlogs, allowed branches).
- **1-Click Application Submission**: Server action with server-side validation enforcing deadline checks, backlog limits, and duplicate application prevention.
- **Application Tracker**: Real-time status pipeline updates (*APPLIED → SHORTLISTED → INTERVIEW_SCHEDULED → SELECTED / REJECTED*) and interview schedules.

### 🏢 Recruiter Portal
- **Campus Placement Drives**: Post new placement drives with custom CTC offers, eligibility criteria, allowed academic branches, and deadlines.
- **Applicant Pipeline Management**: Review candidate applications, inspect student PDF resumes directly, and update application statuses individually or in bulk.
- **Interview Scheduling**: Schedule multi-round recruitment events (Technical Coding, HR, System Design) and notify candidates.

### 🛡️ TPO Admin Command Center
- **Placement Analytics**: Real-time KPI summary cards (Total Drives, Placed Students, Average CTC, Top Recruiter) and application activity stream.
- **Drive Lifecycle Control**: Toggle drive statuses (`UPCOMING`, `OPEN`, `CLOSED`, `COMPLETED`).
- **Student Directory**: Search and filter all registered students by branch, CGPA range, backlog count, and graduation year.
- **1-Click Candidate CSV Export**: Instant one-click `.csv` file generator for visiting corporate recruiters.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14+ (App Router with Server Actions)
- **Language**: TypeScript (Strict type safety)
- **Styling**: Tailwind CSS + Glassmorphism UI Design System + Lucide React Icons
- **Database & ORM**: Neon PostgreSQL + Prisma ORM Client Singleton
- **Authentication**: JWT Cookie Sessions (`jose` + `bcryptjs`) with Next.js Middleware route protection
- **Notifications**: Sonner Toast Notifications

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.x or 20.x+
- A Neon PostgreSQL Database URL (Free tier from [neon.tech](https://console.neon.tech))

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/tpo-portal.git
cd tpo-portal

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@ep-cool-pond-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
JWT_SECRET="super-secret-tpo-jwt-token-key-2026"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup & Seeding
```bash
# Generate Prisma Client & push schema to Neon PostgreSQL
npm run db:push

# Seed initial demo data (Admin, Recruiters, Students, Drives, Applications)
npm run db:seed
```

### 5. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Credentials

| Role | Email | Password | Features to Test |
| :--- | :--- | :--- | :--- |
| **🎓 Student** | `student.alex@tpo.edu` | `password123` | CGPA: 8.85 • Branch: CSE • 0 Backlogs • 1-Click Apply |
| **🏢 Recruiter** | `recruiter.google@tpo.edu` | `password123` | Google Cloud • Manage SDE-1 Drive • Bulk Shortlist • PDF Resumes |
| **🛡️ Admin** | `admin@tpo.edu` | `password123` | Placement Analytics • Student Directory • 1-Click CSV Export |

*Note: You can also use the top **Quick Demo Bar** in development mode to switch roles instantly with one click!*

---

## 📁 Repository Structure

```
├── app/
│   ├── (auth)/             # Login & Register pages
│   ├── actions/            # Type-safe Server Actions (auth, jobs, applications, admin, etc.)
│   ├── admin/              # TPO Admin Dashboard & Student Directory
│   ├── recruiter/          # Recruiter Portal & Applicant Management
│   ├── student/            # Student Portal & Drive Discovery
│   ├── layout.tsx          # Root Layout with Navbar & Quick Demo Banner
│   └── page.tsx            # Homepage
├── components/             # Reusable UI components & eligibility badges
├── lib/
│   ├── auth.ts             # JWT auth & session helpers
│   └── db.ts               # Prisma global singleton client
├── middleware.ts           # Role-based route security middleware
├── prisma/
│   ├── schema.prisma       # Database schema (Models & Enums)
│   └── seed.ts             # Demo data seed script
└── README.md
```

---

## 📄 License
Distributed under the MIT License.
