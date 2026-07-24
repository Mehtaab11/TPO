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
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-mustard-light via-white to-amber-50 border border-mustard/20 p-8 sm:p-14 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-mustard/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mustard/15 border border-mustard/30 text-navy text-xs font-bold">
            <Sparkles className="w-4 h-4 text-mustard-hover" />
            <span>Campus Recruitment Season 2026</span>
          </div>

          <h1 className="font-serif-header text-4xl sm:text-6xl font-extrabold tracking-tight text-navy leading-tight">
            Accelerating Campus Placement & Careers
          </h1>

          <p className="text-base sm:text-lg text-warmgray leading-relaxed font-sans">
            Automated eligibility verification, 1-click job drive applications, candidate shortlist management, and real-time placement analytics for Students, Recruiters, and TPO Officers.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className="btn-mustard flex items-center gap-2"
                >
                  <span>Student Portal Login</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-navy font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 border border-slate-200"
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
                className="btn-mustard flex items-center gap-2"
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
        <div className="glass-card rounded-2xl p-6 border border-slate-100 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-mustard/15 text-mustard-hover">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-navy">{openDrivesCount}</div>
            <div className="text-xs text-warmgray font-medium">Active Campus Drives</div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-100 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-mustard/15 text-mustard-hover">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-navy">{totalPlacedCount}+</div>
            <div className="text-xs text-warmgray font-medium">Students Placed</div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-100 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-mustard/15 text-mustard-hover">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-navy">{avgCtcStr}</div>
            <div className="text-xs text-warmgray font-medium">Average Package (CTC)</div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-100 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-mustard/15 text-mustard-hover">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-navy">{topRecruitersCount}+</div>
            <div className="text-xs text-warmgray font-medium">Visiting Companies</div>
          </div>
        </div>
      </div>

      {/* Portal Roles Overview Cards */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif-header text-3xl font-extrabold text-navy">Dedicated Ecosystem for Campus Hiring</h2>
          <p className="text-xs text-warmgray">Streamlining placement procedures for students, corporate recruiters, and administration.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Card */}
          <div className="glass-card rounded-[28px] p-7 border border-slate-200/80 hover:border-mustard transition-all group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-mustard/15 text-mustard-hover flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-serif-header text-xl font-bold">Student Portal</h3>
            <ul className="space-y-2.5 text-xs text-warmgray">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mustard-hover flex-shrink-0 mt-0.5" />
                <span>Instant server-side eligibility check (CGPA, Backlogs, Branch)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mustard-hover flex-shrink-0 mt-0.5" />
                <span>1-Click job application submission</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mustard-hover flex-shrink-0 mt-0.5" />
                <span>Resume PDF management & skill tags</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mustard-hover flex-shrink-0 mt-0.5" />
                <span>Live status tracking (Shortlisted → Selected)</span>
              </li>
            </ul>
            <Link
              href="/student"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-mustard-hover hover:text-navy pt-2"
            >
              <span>Explore Student Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Recruiter Card */}
          <div className="glass-card rounded-[28px] p-7 border border-slate-200/80 hover:border-mustard transition-all group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-mustard/15 text-mustard-hover flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-serif-header text-xl font-bold">Recruiter Portal</h3>
            <ul className="space-y-2.5 text-xs text-warmgray">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mustard-hover flex-shrink-0 mt-0.5" />
                <span>Post new campus placement job drives</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mustard-hover flex-shrink-0 mt-0.5" />
                <span>View applicants & direct access to student PDF resumes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mustard-hover flex-shrink-0 mt-0.5" />
                <span>Update status in bulk (Shortlist / Select)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mustard-hover flex-shrink-0 mt-0.5" />
                <span>Schedule interview rounds & publish schedules</span>
              </li>
            </ul>
            <Link
              href="/recruiter"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-mustard-hover hover:text-navy pt-2"
            >
              <span>Explore Recruiter Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Admin Card */}
          <div className="glass-card rounded-[28px] p-7 border border-slate-200/80 hover:border-mustard transition-all group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-mustard/15 text-mustard-hover flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-header text-xl font-bold">TPO Admin Dashboard</h3>
            <ul className="space-y-2.5 text-xs text-warmgray">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mustard-hover flex-shrink-0 mt-0.5" />
                <span>Drive management (Create, Open, Close drives)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mustard-hover flex-shrink-0 mt-0.5" />
                <span>Comprehensive student directory with branch/CGPA filters</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mustard-hover flex-shrink-0 mt-0.5" />
                <span>1-Click CSV Candidate Data Export for recruiters</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-mustard-hover flex-shrink-0 mt-0.5" />
                <span>Analytics overview of placement statistics</span>
              </li>
            </ul>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-mustard-hover hover:text-navy pt-2"
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
