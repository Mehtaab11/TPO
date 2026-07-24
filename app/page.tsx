import Link from 'next/link';
import { getSession } from '@/lib/auth';
import {
  GraduationCap,
  Briefcase,
  Building2,
  TrendingUp,
  Award,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  FileSpreadsheet,
  Zap,
  Sparkles,
} from 'lucide-react';
import { db } from '@/lib/db';

export default async function HomePage() {
  const session = await getSession();

  let openDrivesCount = 3;
  let totalPlacedCount = 142;
  let avgCtcStr = '12.4 LPA';
  let topRecruitersCount = 45;

  try {
    const drives = await db.jobPosting.count({ where: { status: 'OPEN' } });
    if (drives > 0) openDrivesCount = drives;

    const placed = await db.application.count({ where: { status: 'SELECTED' } });
    if (placed > 0) totalPlacedCount = placed;
  } catch (e) {
    // fallback defaults
  }

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/60 via-slate-900/80 to-[#0b0f19] border border-indigo-500/20 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Campus Recruitment Season 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Accelerating Campus Placement & Careers
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed">
            Automated eligibility verification, one-click job drive applications, candidate shortlist management, and real-time placement analytics for Students, Recruiters, and TPO Officers.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2"
                >
                  <span>Student Portal Login</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2"
                >
                  <span>Recruiter Registration</span>
                </Link>
              </>
            ) : (
              <Link
                href={
                  session.role === 'ADMIN'
                    ? '/admin'
                    : session.role === 'RECRUITER'
                    ? '/recruiter'
                    : '/student'
                }
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-xl shadow-teal-600/30 transition-all flex items-center gap-2"
              >
                <span>Go to {session.role} Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{openDrivesCount}</div>
            <div className="text-xs text-slate-400 font-medium">Active Campus Drives</div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{totalPlacedCount}+</div>
            <div className="text-xs text-slate-400 font-medium">Students Placed</div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{avgCtcStr}</div>
            <div className="text-xs text-slate-400 font-medium">Average Package (CTC)</div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{topRecruitersCount}+</div>
            <div className="text-xs text-slate-400 font-medium">Visiting Companies</div>
          </div>
        </div>
      </div>

      {/* Portal Roles Overview Cards */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-white">Dedicated Ecosystem for Campus Hiring</h2>
          <p className="text-sm text-slate-400">Streamlining placement procedures for students, corporate recruiters, and administration.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-blue-500/40 transition-all group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Student Portal</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Instant server-side eligibility check (CGPA, Backlogs, Branch)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>1-Click job application submission</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Resume PDF management & skill tags</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Live status tracking (Shortlisted → Selected)</span>
              </li>
            </ul>
            <Link
              href="/student"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 pt-2"
            >
              <span>Explore Student Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Recruiter Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/40 transition-all group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Recruiter Portal</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Post new campus placement job drives</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>View applicants & direct access to student PDF resumes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Update status in bulk (Shortlist / Select)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Schedule interview rounds & publish schedules</span>
              </li>
            </ul>
            <Link
              href="/recruiter"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 pt-2"
            >
              <span>Explore Recruiter Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Admin Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-purple-500/40 transition-all group space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">TPO Admin Dashboard</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Drive management (Create, Open, Close drives)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Comprehensive student directory with branch/CGPA filters</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>1-Click CSV Candidate Data Export for recruiters</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Analytics overview of placement statistics</span>
              </li>
            </ul>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 pt-2"
            >
              <span>Explore Admin Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
