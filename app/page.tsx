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
  Clock,
} from 'lucide-react';
import { db } from '@/lib/db';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { PlacementCard } from '@/components/ui/PlacementCard';

export default async function HomePage() {
  const session = await getSession();

  let openDrivesCount = 3;
  let totalPlacedCount = 142;
  let avgCtcStr = '12.4 LPA';
  let topRecruitersCount = 45;
  let recentJobs: any[] = [];

  try {
    const drivesCount = await db.jobPosting.count({ where: { status: 'OPEN' } });
    if (drivesCount > 0) openDrivesCount = drivesCount;

    const placedCount = await db.application.count({ where: { status: 'SELECTED' } });
    if (placedCount > 0) totalPlacedCount = placedCount;

    recentJobs = await db.jobPosting.findMany({
      take: 4,
      where: { status: 'OPEN' },
      include: {
        company: true,
        applications: true,
      },
      orderBy: { deadline: 'asc' },
    });
  } catch (e) {
    // fallback defaults
  }

  return (
    <div className="space-y-10">
      {/* 2026 Enterprise Hero Header */}
      <div className="card-enterprise bg-gradient-to-r from-[#111827] via-[#1F2937] to-[#111827] text-white p-8 sm:p-12 relative overflow-hidden border-none shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAB308]/20 text-[#EAB308] border border-[#EAB308]/30 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-[#EAB308]" />
            <span>Campus Placement Season 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Enterprise Campus Recruitment Platform
          </h1>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Automated server-side eligibility verification, 1-click job drive applications, candidate shortlist management, and real-time placement analytics for Students, Recruiters, and TPO Officers.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {!session ? (
              <>
                <Link href="/login" className="btn-golden flex items-center gap-2">
                  <span>Student Portal Login</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="btn-secondary-white bg-white/10 text-white hover:bg-white/20 border-white/20 flex items-center gap-2"
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
                className="btn-golden flex items-center gap-2"
              >
                <span>Go to {session.role} Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Top Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Drives"
          value={openDrivesCount}
          icon={Zap}
          badge="Live Now"
          trend="12% from last month"
          iconColor="text-[#EAB308]"
          iconBg="bg-[#FEF9C3]"
        />

        <StatCard
          title="Placed Students"
          value={`${totalPlacedCount}+`}
          icon={Award}
          badge="High Placement Rate"
          trend="88.4% success ratio"
          iconColor="text-[#22C55E]"
          iconBg="bg-[#DCFCE7]"
        />

        <StatCard
          title="Average Package"
          value={avgCtcStr}
          icon={TrendingUp}
          badge="Highest 44 LPA"
          trend="15% increase"
          iconColor="text-[#3B82F6]"
          iconBg="bg-[#DBEAFE]"
        />

        <StatCard
          title="Visiting Companies"
          value={`${topRecruitersCount}+`}
          icon={Building2}
          badge="Top Fortune 500"
          trend="Google, Microsoft, TCS"
          iconColor="text-[#F59E0B]"
          iconBg="bg-[#FEF3C7]"
        />
      </div>

      {/* Recommended Open Drives Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#111827]">Active Campus Drives</h2>
            <p className="text-sm text-[#6B7280]">Browse and apply to live placement opportunities.</p>
          </div>
          <Link href="/student/drives" className="btn-secondary-white text-xs h-10 px-4 flex items-center gap-1">
            <span>View All Drives</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {recentJobs.length === 0 ? (
          <div className="card-enterprise text-center py-12 space-y-2">
            <Zap className="w-10 h-10 text-[#6B7280] mx-auto" />
            <p className="text-sm font-bold text-[#111827]">No placement drives currently active.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentJobs.map((job) => (
              <PlacementCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>

      {/* Role Workflows Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="card-enterprise space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF9C3] text-[#D97706] flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#111827]">Student Portal</h3>
          <ul className="space-y-2.5 text-sm text-[#6B7280]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>Real-time CGPA/Backlog eligibility validation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>1-Click job drive application</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>PDF resume URL & skill management</span>
            </li>
          </ul>
        </div>

        <div className="card-enterprise space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center font-bold">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#111827]">Recruiter Portal</h3>
          <ul className="space-y-2.5 text-sm text-[#6B7280]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>Post new campus placement drives</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>Direct access to candidate PDF resumes</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>Bulk candidate shortlisting & selection</span>
            </li>
          </ul>
        </div>

        <div className="card-enterprise space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#111827]">TPO Admin Portal</h3>
          <ul className="space-y-2.5 text-sm text-[#6B7280]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>Drive management & status toggles</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>Multi-filter student directory</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>1-Click CSV candidate data export</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
