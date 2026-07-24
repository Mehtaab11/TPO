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
  FileSpreadsheet,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { UpdateJobStatusButton } from '@/components/UpdateJobStatusButton';
import { CsvExportButton } from '@/components/CsvExportButton';

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  const analytics = await getAdminAnalytics();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TPO Admin Analytics Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Training & Placement Cell Overview
          </h1>
          <p className="text-xs text-slate-300">
            Real-time analytics across campus drives, registered candidates, recruiters, and placement statistics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/drives"
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all"
          >
            Drive Management
          </Link>
          <Link
            href="/admin/students"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            Student Directory
          </Link>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Total Drives</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{analytics?.totalDrives ?? 0}</div>
          <p className="text-[11px] text-slate-500">{analytics?.openDrives ?? 0} Currently OPEN</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Placed Candidates</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{analytics?.placedStudents ?? 0}</div>
          <p className="text-[11px] text-slate-500">{analytics?.placementPercentage ?? '0%'} Conversion Rate</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Average Package</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-indigo-400">{analytics?.averageCtc ?? '8.5 LPA'}</div>
          <p className="text-[11px] text-slate-500">Across all active offers</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Top Recruiter</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-400 truncate">{analytics?.topRecruiter ?? 'Google'}</div>
          <p className="text-[11px] text-slate-500">Highest candidate volume</p>
        </div>
      </div>

      {/* Grid: All Drives Table + Recent Applications Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Drives Table (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span>Campus Drives Management</span>
            </h2>
            <Link href="/admin/drives" className="text-xs font-semibold text-purple-400 hover:text-purple-300">
              Manage All Drives &rarr;
            </Link>
          </div>

          <div className="glass-card rounded-2xl border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Company</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Package</th>
                  <th className="p-3.5">Applicants</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Export CSV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {(analytics?.allDrives || []).map((job) => (
                  <tr key={job.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3.5 font-bold text-white">{job.company.companyName}</td>
                    <td className="p-3.5 text-slate-200">{job.title}</td>
                    <td className="p-3.5 font-semibold text-emerald-400">{job.ctc}</td>
                    <td className="p-3.5 font-bold text-blue-400">{job.applications.length}</td>
                    <td className="p-3.5">
                      <UpdateJobStatusButton jobId={job.id} currentStatus={job.status} />
                    </td>
                    <td className="p-3.5">
                      <CsvExportButton jobId={job.id} companyName={job.company.companyName} driveTitle={job.title} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Application Stream (Right 1 col) */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <span>Recent Application Stream</span>
          </h2>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            {(analytics?.recentApplications || []).length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No recent applications.</p>
            ) : (
              (analytics?.recentApplications || []).map((app) => (
                <div key={app.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{app.student.fullName}</span>
                    <span className="text-[10px] font-semibold text-indigo-400">{app.status}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    Applied for {app.job.title} ({app.job.company.companyName})
                  </p>
                  <span className="text-[10px] text-slate-500 block">
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
