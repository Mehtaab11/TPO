import { getSession } from '@/lib/auth';
import { getStudentDashboardData } from '@/app/actions/student';
import { redirect } from 'next/navigation';
import { Clock, Building2, Calendar, CheckCircle2, AlertCircle, MapPin, Info } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default async function StudentApplicationsPage() {
  const session = await getSession();
  if (!session || session.role !== 'STUDENT') {
    redirect('/login');
  }

  const data = await getStudentDashboardData();
  const applications = data?.student?.applications || [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Placement Applications"
        description="Track real-time candidate shortlist status, interview schedules, and selection outcomes across all your submitted drives."
      />

      {applications.length === 0 ? (
        <div className="card-enterprise text-center py-16 space-y-4">
          <Clock className="w-12 h-12 text-[#6B7280] mx-auto" />
          <h2 className="text-lg font-bold text-[#111827]">No Applications Submitted</h2>
          <p className="text-sm text-[#6B7280] max-w-sm mx-auto">
            You haven't submitted any applications for campus placement drives yet.
          </p>
          <Link href="/student/drives" className="btn-golden text-xs h-11 inline-flex items-center">
            Browse Open Drives & Apply
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="card-enterprise space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                    {app.job.company.companyName}
                  </span>
                  <h2 className="text-xl font-bold text-[#111827]">{app.job.title}</h2>
                  <p className="text-sm font-semibold text-[#EAB308]">Package: {app.job.ctc}</p>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5">
                  <StatusBadge status={app.status} />
                  <span className="text-xs text-[#6B7280]">
                    Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Scheduled Recruitment Rounds Alert */}
              {app.job.interviews.length > 0 && (
                <div className="p-4 rounded-xl bg-[#FEF9C3] border border-[#FDE047] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#A16207]">
                    <Calendar className="w-4 h-4 text-[#D97706]" />
                    <span>Scheduled Recruitment Rounds</span>
                  </div>
                  {app.job.interviews.map((interview) => (
                    <div key={interview.id} className="text-xs text-[#111827] space-y-0.5 pl-6">
                      <p className="font-bold">• {interview.title}</p>
                      <p className="text-[#6B7280]">
                        Date: {new Date(interview.scheduledAt).toLocaleString()} • Venue: {interview.location}
                      </p>
                      {interview.notes && <p className="text-[#6B7280] italic">Notes: {interview.notes}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
