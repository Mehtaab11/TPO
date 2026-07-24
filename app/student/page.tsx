import { getSession } from '@/lib/auth';
import { getStudentDashboardData } from '@/app/actions/student';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  FileText,
  Clock,
  ChevronRight,
  Sparkles,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { PlacementCard } from '@/components/ui/PlacementCard';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default async function StudentDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== 'STUDENT') {
    redirect('/login');
  }

  const data = await getStudentDashboardData();
  const student = data?.student;
  const applications = student?.applications || [];
  const openJobs = data?.openJobs || [];
  const appliedJobIds = new Set(applications.map((a) => a.jobId));

  return (
    <div className="space-y-8">
      {/* 2026 Page Header */}
      <PageHeader
        title={`Welcome back, ${student?.fullName || session.fullName || 'Student'}!`}
        description={`Roll No: ${student?.rollNumber || 'CS2026'} • Branch: ${student?.branch || 'CSE'} • Academic CGPA: ${student?.cgpa?.toFixed(2) || '0.00'}`}
        action={
          <div className="flex items-center gap-3">
            <Link href="/student/profile" className="btn-secondary-white text-xs h-11">
              <FileText className="w-4 h-4 mr-1.5 text-[#EAB308]" />
              <span>Update Profile & Resume</span>
            </Link>
            <Link href="/student/drives" className="btn-golden text-xs h-11">
              <Briefcase className="w-4 h-4 mr-1.5" />
              <span>Browse Open Drives ({openJobs.length})</span>
            </Link>
          </div>
        }
      />

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Academic CGPA"
          value={student?.cgpa ? student.cgpa.toFixed(2) : '0.00'}
          icon={GraduationCap}
          badge="Threshold >= 7.50"
          iconColor="text-[#EAB308]"
          iconBg="bg-[#FEF9C3]"
        />

        <StatCard
          title="Active Backlogs"
          value={student?.backlogs ?? 0}
          icon={AlertCircle}
          badge={student?.backlogs === 0 ? 'Clear Record' : 'Requires Clearance'}
          iconColor={student?.backlogs === 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}
          iconBg={student?.backlogs === 0 ? 'bg-[#DCFCE7]' : 'bg-[#FEE2E2]'}
        />

        <StatCard
          title="Applications"
          value={applications.length}
          icon={Clock}
          badge="Tracked Live"
          iconColor="text-[#3B82F6]"
          iconBg="bg-[#DBEAFE]"
        />

        <StatCard
          title="Shortlisted / Selected"
          value={applications.filter((a) => a.status === 'SHORTLISTED' || a.status === 'SELECTED').length}
          icon={Award}
          badge="Active Offers"
          iconColor="text-[#22C55E]"
          iconBg="bg-[#DCFCE7]"
        />
      </div>

      {/* Grid: Recommended Drives & Application Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Open Drives List (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#EAB308]" />
              <span>Recommended Open Drives</span>
            </h2>
            <Link href="/student/drives" className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1">
              <span>View All ({openJobs.length})</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {openJobs.length === 0 ? (
            <div className="card-enterprise text-center py-12 space-y-2">
              <AlertCircle className="w-10 h-10 text-[#6B7280] mx-auto" />
              <p className="text-sm font-bold text-[#111827]">No active drives matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {openJobs.slice(0, 3).map((job) => {
                const hasApplied = appliedJobIds.has(job.id);
                const appObj = applications.find((a) => a.jobId === job.id);
                return (
                  <PlacementCard
                    key={job.id}
                    job={job}
                    student={student || null}
                    hasApplied={hasApplied}
                    appliedStatus={appObj?.status}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Application Tracker Widget (Right 1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
              <Clock className="w-6 h-6 text-[#22C55E]" />
              <span>Tracker</span>
            </h2>
            <Link href="/student/applications" className="text-xs font-bold text-[#D97706] hover:underline">
              Full Status
            </Link>
          </div>

          <div className="card-enterprise space-y-4">
            {applications.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <p className="text-xs text-[#6B7280]">You have not applied to any drives yet.</p>
                <Link href="/student/drives" className="text-xs font-bold text-[#EAB308] hover:underline">
                  Browse Drives & Apply &rarr;
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 4).map((app) => (
                  <div key={app.id} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#111827]">{app.job.company.companyName}</span>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="text-xs text-[#6B7280] font-medium truncate">{app.job.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
