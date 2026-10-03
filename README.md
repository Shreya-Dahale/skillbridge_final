# SkilBridge — Evidence-Based Career Re-entry Platform

> **"Don't hide the career gap. Fill the evidence gap."**

SkilBridge is an evidence-based career re-entry platform that bridges the confidence and credibility gap for professionals returning to the workforce after a career break (parental leave, caregiving, health, or relocation).

Instead of relying on outdated CVs or generic cover letters, SkilBridge provides:
1. **Past Experience Mapping** & Career History
2. **Target Role Alignment**
3. **Skill Gap Analysis** (Required vs Current Capability)
4. **Interactive Practical Assessments** with auto-grading
5. **Verified Evidence Badges** (Assessments, GitHub repos, Case Studies)
6. **Shareable Evidence Profile Dossier**
7. **Employer Talent Pool Search & Dossier Review**
8. **Returnship Job Matching & Applications**

---

## ⚡ Instant Demo Credentials

Deployable as a standalone project directly on **Vercel** with full interactive functionality:

| Portal | Email | Password | Features |
| :--- | :--- | :--- | :--- |
| **Candidate** | `candidate@skilbridge.com` | `Candidate123!` | 8-Stage Pipeline, Skill Gap Analysis, Assessments, Evidence Dossier |
| **Employer** | `employer@techcorp.com` | `Employer123!` | Talent Pool, Candidate Dossier Review, Pipeline Review, Job Posting |

*Each login screen also includes a **⚡ 1-Click Instant Demo Login** button for immediate access.*

---

## 🚀 Deploy to Vercel

1. Import this repository (`skillbridge_final`) into [Vercel](https://vercel.com/new).
2. Root directory: `./`
3. Framework: `Vite`
4. Click **Deploy**!

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🛠️ Tech Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Data Layer:** Reactive in-browser state with `localStorage` persistence + support for external backend via `VITE_API_URL`
- **Routing:** React Router v6 with SPA rewrite configuration
