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
} from 'lucide-react';
import { EligibilityBadge } from '@/components/EligibilityBadge';

export default async function StudentDashboardPage() {
  const session = await getSession();
  if (!session || session.role !== 'STUDENT') {
    redirect('/login');
  }

  const data = await getStudentDashboardData();
  const student = data?.student;
  const applications = student?.applications || [];
  const openJobs = data?.openJobs || [];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-indigo-500/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Candidate Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome back, {student?.fullName || session.fullName || 'Student'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Roll No: <span className="font-semibold text-slate-100">{student?.rollNumber || 'Not set'}</span> • Branch: <span className="font-semibold text-slate-100">{student?.branch || 'CSE'}</span> • CGPA: <span className="font-semibold text-indigo-400">{student?.cgpa?.toFixed(2) || '0.00'}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/student/profile"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Update Profile & Resume</span>
            </Link>
            <Link
              href="/student/drives"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              <Briefcase className="w-4 h-4" />
              <span>View Open Drives ({openJobs.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Academic CGPA</span>
          <div className="text-2xl font-bold text-indigo-400">{student?.cgpa ? student.cgpa.toFixed(2) : '0.00'}</div>
          <p className="text-[11px] text-slate-500">Target CGPA threshold: &ge; 7.50</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Active Backlogs</span>
          <div className={`text-2xl font-bold ${student?.backlogs === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {student?.backlogs ?? 0}
          </div>
          <p className="text-[11px] text-slate-500">
            {student?.backlogs === 0 ? 'Clear backlog record' : 'Affects drive eligibility'}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Submitted Applications</span>
          <div className="text-2xl font-bold text-blue-400">{applications.length}</div>
          <p className="text-[11px] text-slate-500">Track application status live</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Shortlisted / Selected</span>
          <div className="text-2xl font-bold text-emerald-400">
            {applications.filter((a) => a.status === 'SHORTLISTED' || a.status === 'SELECTED').length}
          </div>
          <p className="text-[11px] text-slate-500">Active placement progress</p>
        </div>
      </div>

      {/* Main Grid: Open Drives Preview & Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Open Drives List (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              <span>Recommended Open Drives</span>
            </h2>
            <Link href="/student/drives" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {openJobs.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 border border-slate-800 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-medium text-slate-300">No active placement drives currently open.</p>
              <p className="text-xs text-slate-500">Check back soon for upcoming corporate drives.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {openJobs.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-white text-base">{job.title}</h3>
                      <p className="text-xs text-slate-400 font-medium">{job.company.companyName} • {job.ctc}</p>
                    </div>
                    <EligibilityBadge student={student || null} job={job} />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                    <span>Min CGPA: <strong className="text-slate-200">{job.minCgpa.toFixed(2)}</strong></span>
                    <span>Max Backlogs: <strong className="text-slate-200">{job.maxBacklogs}</strong></span>
                    <span>Branches: <strong className="text-slate-200">{job.allowedBranches.join(', ')}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Applications Widget (Right 1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <span>Application Tracker</span>
            </h2>
            <Link href="/student/applications" className="text-xs font-semibold text-emerald-400 hover:text-emerald-300">
              View Status
            </Link>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            {applications.length === 0 ? (
              <div className="text-center py-6 space-y-2">
                <p className="text-xs text-slate-400">You have not applied to any placement drives yet.</p>
                <Link
                  href="/student/drives"
                  className="inline-block text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Browse Drives & Apply &rarr;
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 4).map((app) => (
                  <div key={app.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{app.job.company.companyName}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          app.status === 'SELECTED'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : app.status === 'SHORTLISTED'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : app.status === 'REJECTED'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{app.job.title}</p>
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
