import { getSession } from '@/lib/auth';
import { getJobPostings } from '@/app/actions/jobs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Zap, Plus, Users, Calendar, Download, Building2 } from 'lucide-react';
import { UpdateJobStatusButton } from '@/components/UpdateJobStatusButton';
import { CsvExportButton } from '@/components/CsvExportButton';

export default async function AdminDrivesPage() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  const jobs = await getJobPostings();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Zap className="w-6 h-6 text-purple-400" />
            <span>Campus Placement Drives Management</span>
          </h1>
          <p className="text-xs text-slate-400">
            Control drive status (OPEN, UPCOMING, CLOSED, COMPLETED), review cutoff rules, and export shortlisted candidate CSVs.
          </p>
        </div>

        <Link
          href="/recruiter/jobs/new"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Campus Drive</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between hover:border-purple-500/30 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">
                    {job.company.companyName}
                  </span>
                  <h2 className="text-lg font-bold text-white">{job.title}</h2>
                </div>
                <UpdateJobStatusButton jobId={job.id} currentStatus={job.status} />
              </div>

              <p className="text-xs text-slate-300 line-clamp-2">{job.description}</p>

              {/* Eligibility Criteria Box */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Package</span>
                  <span className="font-bold text-emerald-400">{job.ctc}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Min CGPA</span>
                  <span className="font-bold text-slate-200">{job.minCgpa.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Max Backlogs</span>
                  <span className="font-bold text-slate-200">{job.maxBacklogs}</span>
                </div>
              </div>

              <div className="text-xs text-slate-400">
                <span className="font-medium text-slate-300">Allowed Branches: </span>
                {job.allowedBranches.join(', ')}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
              <Link
                href={`/recruiter/jobs/${job.id}/applicants`}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                <Users className="w-4 h-4 text-purple-400" />
                <span>View Applicants ({job.applications.length})</span>
              </Link>

              <CsvExportButton jobId={job.id} companyName={job.company.companyName} driveTitle={job.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
