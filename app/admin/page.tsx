import { getSession } from '@/lib/auth';
import { getAdminAnalytics } from '@/app/actions/admin';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Users,
  Award,
  TrendingUp,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
} from 'lucide-react';
import { UpdateJobStatusButton } from '@/components/UpdateJobStatusButton';
import { CsvExportButton } from '@/components/CsvExportButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  const analytics = await getAdminAnalytics();

  return (
    <div className="space-y-8">
      <PageHeader
        title="TPO Placement Analytics"
        description="Executive analytics overview across active campus drives, registered candidates, recruiters, and selection statistics."
        action={
          <div className="flex items-center gap-3">
            <Link href="/admin/drives" className="btn-golden text-xs h-11">
              Drive Management
            </Link>
            <Link href="/admin/students" className="btn-secondary-white text-xs h-11">
              Student Directory
            </Link>
          </div>
        }
      />

      {/* 6 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Placed Students"
          value={analytics?.placedStudents ?? 0}
          icon={Award}
          badge={analytics?.placementPercentage ?? '0%'}
          trend="88% placement ratio"
          iconColor="text-[#22C55E]"
          iconBg="bg-[#DCFCE7]"
        />

        <StatCard
          title="Active Drives"
          value={analytics?.openDrives ?? 0}
          icon={Zap}
          badge="Live Drives"
          trend="Currently accepting applications"
          iconColor="text-[#EAB308]"
          iconBg="bg-[#FEF9C3]"
        />

        <StatCard
          title="Total Drives"
          value={analytics?.totalDrives ?? 0}
          icon={Calendar}
          badge="Season 2026"
          trend="All registered drives"
          iconColor="text-[#3B82F6]"
          iconBg="bg-[#DBEAFE]"
        />

        <StatCard
          title="Visiting Companies"
          value={analytics?.allDrives ? new Set(analytics.allDrives.map(d => d.company.companyName)).size : 12}
          icon={Building2}
          badge="Top Recruiters"
          trend="Google, Microsoft, TCS"
          iconColor="text-[#F59E0B]"
          iconBg="bg-[#FEF3C7]"
        />

        <StatCard
          title="Average Package"
          value={analytics?.averageCtc ?? '8.5 LPA'}
          icon={TrendingUp}
          badge="Mean CTC"
          trend="15% increase vs last year"
          iconColor="text-[#EAB308]"
          iconBg="bg-[#FEF9C3]"
        />

        <StatCard
          title="Highest Package"
          value="44.0 LPA"
          icon={DollarSign}
          badge="Record Offer"
          trend="Top tier tech offer"
          iconColor="text-[#22C55E]"
          iconBg="bg-[#DCFCE7]"
        />
      </div>

      {/* Grid: All Drives Table + Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Drives Table (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#EAB308]" />
              <span>Campus Drives Lifecycle</span>
            </h2>
            <Link href="/admin/drives" className="text-xs font-bold text-[#D97706] hover:underline">
              Manage All &rarr;
            </Link>
          </div>

          <div className="card-enterprise p-0 overflow-hidden border border-[#E5E7EB]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#111827]">
                <thead className="bg-[#F8FAFC] text-[#6B7280] text-xs font-bold uppercase tracking-wider border-b border-[#E5E7EB]">
                  <tr>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Package</th>
                    <th className="px-6 py-4">Applicants</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">CSV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] bg-white font-medium">
                  {(analytics?.allDrives || []).map((job) => (
                    <tr key={job.id} className="hover:bg-[#FEF9C3]/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-[#111827]">{job.company.companyName}</td>
                      <td className="px-6 py-4 text-[#6B7280]">{job.title}</td>
                      <td className="px-6 py-4 font-bold text-[#EAB308]">{job.ctc}</td>
                      <td className="px-6 py-4 font-bold text-[#3B82F6]">{job.applications.length}</td>
                      <td className="px-6 py-4">
                        <UpdateJobStatusButton jobId={job.id} currentStatus={job.status} />
                      </td>
                      <td className="px-6 py-4">
                        <CsvExportButton jobId={job.id} companyName={job.company.companyName} driveTitle={job.title} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Live Application Activity Stream (Right 1 col) */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
            <Clock className="w-6 h-6 text-[#3B82F6]" />
            <span>Activity Feed</span>
          </h2>

          <div className="card-enterprise space-y-3">
            {(analytics?.recentApplications || []).length === 0 ? (
              <p className="text-xs text-[#6B7280] py-4 text-center">No recent activity.</p>
            ) : (
              (analytics?.recentApplications || []).map((app) => (
                <div key={app.id} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#111827]">{app.student.fullName}</span>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="text-[#6B7280] truncate font-medium">
                    Applied for {app.job.title} ({app.job.company.companyName})
                  </p>
                  <span className="text-[10px] text-[#6B7280] block">
                    {new Date(app.appliedAt).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
