import { getSession } from '@/lib/auth';
import { getStudentDashboardData } from '@/app/actions/student';
import { redirect } from 'next/navigation';
import { Briefcase, Building2, Calendar, Clock, Award, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { PlacementCard } from '@/components/ui/PlacementCard';

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
      <PageHeader
        title="Campus Placement Drives 2026"
        description={`View active campus placement drives. Eligibility badges update live based on your CGPA (${student?.cgpa.toFixed(2) || '0.00'}) and backlogs (${student?.backlogs || 0}).`}
        action={
          <div className="text-xs px-4 py-2 rounded-xl bg-[#FEF9C3] text-[#D97706] border border-[#FDE047] font-bold">
            Active Open Drives: {openJobs.length}
          </div>
        }
      />

      {openJobs.length === 0 ? (
        <div className="card-enterprise text-center py-16 space-y-4">
          <Briefcase className="w-12 h-12 text-[#6B7280] mx-auto" />
          <h2 className="text-lg font-bold text-[#111827]">No Active Placement Drives</h2>
          <p className="text-sm text-[#6B7280] max-w-md mx-auto">
            There are currently no open placement drives matching your criteria. Check back later as recruiters publish new roles.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {openJobs.map((job) => {
            const hasApplied = appliedJobIds.has(job.id);
            const appObj = student?.applications.find((a) => a.jobId === job.id);

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
  );
}
