import { getSession } from '@/lib/auth';
import { getStudentDashboardData } from '@/app/actions/student';
import { redirect } from 'next/navigation';
import { Briefcase, Building2, Calendar, Clock, Award, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { EligibilityBadge } from '@/components/EligibilityBadge';
import { ApplyDriveButton } from '@/components/ApplyDriveButton';

export default async function StudentDrivesPage() {
  const session = await getSession();
  if (!session || session.role !== 'STUDENT') {
    redirect('/login');
  }

  const data = await getStudentDashboardData();
  const student = data?.student;
  const openJobs = data?.openJobs || [];
  const appliedJobIds = new Set(student?.applications.map((a) => a.jobId) || []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-400" />
            <span>Campus Placement Drives 2026</span>
          </h1>
          <p className="text-xs text-slate-400">
            View active placement drives. Eligibility badges update live based on your CGPA ({student?.cgpa.toFixed(2) || '0.00'}) and backlogs ({student?.backlogs || 0}).
          </p>
        </div>

        <div className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
          Open Drives: <strong className="text-indigo-400">{openJobs.length}</strong>
        </div>
      </div>

      {openJobs.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 border border-slate-800 text-center space-y-4">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
          <h2 className="text-lg font-bold text-white">No Active Placement Drives</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            There are currently no open campus drives matching your criteria. Check back later as recruiters publish new positions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {openJobs.map((job) => {
            const hasApplied = appliedJobIds.has(job.id);
            const appObj = student?.applications.find((a) => a.jobId === job.id);

            return (
              <div
                key={job.id}
                className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-5 hover:border-indigo-500/40 transition-all"
              >
                <div className="space-y-4">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                        {job.company.companyName}
                      </span>
                      <h2 className="text-lg font-bold text-white leading-tight">{job.title}</h2>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                        {job.ctc}
                      </span>
                      <EligibilityBadge student={student || null} job={job} />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Requirements Matrix */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Min CGPA</span>
                      <span className="font-bold text-slate-200">{job.minCgpa.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Max Backlogs</span>
                      <span className="font-bold text-slate-200">{job.maxBacklogs}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Deadline</span>
                      <span className="font-semibold text-slate-300">
                        {new Date(job.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400">
                    <span className="font-medium text-slate-300">Eligible Branches: </span>
                    {job.allowedBranches.join(', ')}
                  </div>
                </div>

                {/* Apply Action Bar */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    {job.applications.length} Applicants
                  </div>

                  {hasApplied ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Applied ({appObj?.status || 'APPLIED'})
                    </span>
                  ) : (
                    <ApplyDriveButton studentId={student?.id} jobId={job.id} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
