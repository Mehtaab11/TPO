import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, FileText, Download, Calendar, CheckCircle2, ChevronLeft, Building2 } from 'lucide-react';
import { ApplicantStatusTable } from '@/components/ApplicantStatusTable';
import { ScheduleInterviewForm } from '@/components/ScheduleInterviewForm';
import { CsvExportButton } from '@/components/CsvExportButton';

export default async function JobApplicantsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  if (!session || (session.role !== 'RECRUITER' && session.role !== 'ADMIN')) {
    redirect('/login');
  }

  const job = await db.jobPosting.findUnique({
    where: { id: params.id },
    include: {
      company: true,
      applications: {
        include: {
          student: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { appliedAt: 'desc' },
      },
      interviews: {
        orderBy: { scheduledAt: 'asc' },
      },
    },
  });

  if (!job) {
    redirect('/recruiter');
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="space-y-4">
        <Link
          href="/recruiter"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Recruiter Dashboard</span>
        </Link>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              {job.company.companyName}
            </span>
            <h1 className="text-2xl font-bold text-white">{job.title}</h1>
            <p className="text-xs text-slate-400">
              Package: <strong className="text-emerald-400">{job.ctc}</strong> • Total Applicants:{' '}
              <strong className="text-blue-400">{job.applications.length}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <CsvExportButton jobId={job.id} companyName={job.company.companyName} driveTitle={job.title} />
          </div>
        </div>
      </div>

      {/* Grid: Applicants Table + Interview Scheduler */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applicants Table (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <span>Applicant List ({job.applications.length})</span>
          </h2>

          <ApplicantStatusTable jobId={job.id} applications={job.applications} />
        </div>

        {/* Schedule Interview Sidebar (Right 1 col) */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span>Schedule Recruitment Round</span>
            </h3>

            <ScheduleInterviewForm jobId={job.id} />
          </div>

          {/* Existing Scheduled Rounds */}
          {job.interviews.length > 0 && (
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white">Scheduled Interview Rounds</h3>
              <div className="space-y-2">
                {job.interviews.map((iv) => (
                  <div key={iv.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <p className="font-semibold text-indigo-300">{iv.title}</p>
                    <p className="text-slate-400">Date: {new Date(iv.scheduledAt).toLocaleString()}</p>
                    <p className="text-slate-400">Venue: {iv.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
