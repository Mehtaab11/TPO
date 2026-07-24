import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, Calendar, ChevronLeft } from 'lucide-react';
import { ApplicantStatusTable } from '@/components/ApplicantStatusTable';
import { ScheduleInterviewForm } from '@/components/ScheduleInterviewForm';
import { CsvExportButton } from '@/components/CsvExportButton';
import { PageHeader } from '@/components/ui/PageHeader';

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
      <div className="space-y-2">
        <Link href="/recruiter" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7280] hover:text-[#111827]">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Recruiter Dashboard</span>
        </Link>

        <PageHeader
          title={job.title}
          description={`Company: ${job.company.companyName} • Offered CTC: ${job.ctc} • Applicants: ${job.applications.length}`}
          action={
            <CsvExportButton jobId={job.id} companyName={job.company.companyName} driveTitle={job.title} />
          }
        />
      </div>

      {/* Grid: Applicants Table + Interview Scheduler */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applicants Table (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#EAB308]" />
            <span>Applicant Candidates ({job.applications.length})</span>
          </h2>

          <ApplicantStatusTable jobId={job.id} applications={job.applications} />
        </div>

        {/* Schedule Interview Sidebar (Right 1 col) */}
        <div className="space-y-6">
          <div className="card-enterprise space-y-4">
            <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2 border-b border-[#E5E7EB] pb-3">
              <Calendar className="w-5 h-5 text-[#EAB308]" />
              <span>Schedule Recruitment Round</span>
            </h3>

            <ScheduleInterviewForm jobId={job.id} />
          </div>

          {/* Existing Scheduled Rounds */}
          {job.interviews.length > 0 && (
            <div className="card-enterprise space-y-3">
              <h3 className="text-sm font-bold text-[#111827]">Scheduled Interview Rounds</h3>
              <div className="space-y-2">
                {job.interviews.map((iv) => (
                  <div key={iv.id} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs space-y-1">
                    <p className="font-bold text-[#111827]">{iv.title}</p>
                    <p className="text-[#6B7280]">Date: {new Date(iv.scheduledAt).toLocaleString()}</p>
                    <p className="text-[#6B7280]">Venue: {iv.location}</p>
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
