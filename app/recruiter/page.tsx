import { getSession } from '@/lib/auth';
import { getJobPostings } from '@/app/actions/jobs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, Plus, Users, Calendar, CheckCircle2, ChevronRight, FileSpreadsheet } from 'lucide-react';
import { UpdateJobStatusButton } from '@/components/UpdateJobStatusButton';

export default async function RecruiterDashboardPage() {
  const session = await getSession();
  if (!session || (session.role !== 'RECRUITER' && session.role !== 'ADMIN')) {
    redirect('/login');
  }

  const allJobs = await getJobPostings();
  // Filter for recruiter's company or show all if admin
  const recruiterJobs = session.role === 'ADMIN'
    ? allJobs
    : allJobs.filter((j) => j.companyId === session.companyId || j.company.companyName === session.companyName);

  return (
    <div className="space-y-8">
      {/* Recruiter Header */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Corporate Recruiter Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            {session.companyName || 'Recruiter Workspace'}
          </h1>
          <p className="text-xs text-slate-400">
            Manage your campus recruitment drives, review candidate profiles, and shortlist top talent.
          </p>
        </div>

        <Link
          href="/recruiter/jobs/new"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Campus Drive</span>
        </Link>
      </div>

      {/* Recruiter Job Drives List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <span>Your Campus Placement Drives ({recruiterJobs.length})</span>
          </h2>
        </div>

        {recruiterJobs.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 border border-slate-800 text-center space-y-4">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Campus Drives Posted Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Post your first campus hiring drive to start accepting applications from eligible students.
            </p>
            <Link
              href="/recruiter/jobs/new"
              className="inline-block px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
            >
              Post Campus Placement Drive
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recruiterJobs.map((job) => (
              <div
                key={job.id}
                className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-emerald-500/30 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                        {job.company.companyName}
                      </span>
                      <h3 className="text-lg font-bold text-white">{job.title}</h3>
                    </div>
                    <UpdateJobStatusButton jobId={job.id} currentStatus={job.status} />
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">{job.description}</p>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Package (CTC)</span>
                      <span className="font-bold text-emerald-400">{job.ctc}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Min CGPA</span>
                      <span className="font-bold text-slate-200">{job.minCgpa.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Applicants</span>
                      <span className="font-bold text-blue-400">{job.applications.length}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </span>

                  <Link
                    href={`/recruiter/jobs/${job.id}/applicants`}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all"
                  >
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Manage Applicants ({job.applications.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
