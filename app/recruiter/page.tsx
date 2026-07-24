import { getSession } from '@/lib/auth';
import { getJobPostings } from '@/app/actions/jobs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, Plus, Users, ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { PlacementCard } from '@/components/ui/PlacementCard';

export default async function RecruiterDashboardPage() {
  const session = await getSession();
  if (!session || (session.role !== 'RECRUITER' && session.role !== 'ADMIN')) {
    redirect('/login');
  }

  const allJobs = await getJobPostings();
  const recruiterJobs = session.role === 'ADMIN'
    ? allJobs
    : allJobs.filter((j) => j.companyId === session.companyId || j.company.companyName === session.companyName);

  return (
    <div className="space-y-8">
      <PageHeader
        title={session.companyName || 'Recruiter Workspace'}
        description="Manage your campus recruitment drives, review student applicants, inspect resumes, and schedule hiring rounds."
        action={
          <Link href="/recruiter/jobs/new" className="btn-golden text-xs h-11 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Post New Campus Drive</span>
          </Link>
        }
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-[#EAB308]" />
          <span>Active Campus Placement Drives ({recruiterJobs.length})</span>
        </h2>

        {recruiterJobs.length === 0 ? (
          <div className="card-enterprise text-center py-16 space-y-4">
            <Briefcase className="w-12 h-12 text-[#6B7280] mx-auto" />
            <h3 className="text-lg font-bold text-[#111827]">No Campus Drives Posted Yet</h3>
            <p className="text-sm text-[#6B7280] max-w-sm mx-auto">
              Post your first campus hiring drive to start accepting applications from eligible student candidates.
            </p>
            <Link href="/recruiter/jobs/new" className="btn-golden text-xs h-11 inline-flex items-center">
              Post Campus Placement Drive
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recruiterJobs.map((job) => (
              <PlacementCard key={job.id} job={job} isRecruiter />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
