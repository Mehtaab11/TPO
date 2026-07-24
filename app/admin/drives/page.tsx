import { getSession } from '@/lib/auth';
import { getJobPostings } from '@/app/actions/jobs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Zap, Plus, Users, Calendar } from 'lucide-react';
import { UpdateJobStatusButton } from '@/components/UpdateJobStatusButton';
import { CsvExportButton } from '@/components/CsvExportButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { PlacementCard } from '@/components/ui/PlacementCard';

export default async function AdminDrivesPage() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  const jobs = await getJobPostings();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Campus Placement Drives Management"
        description="Control drive lifecycle status (OPEN, UPCOMING, CLOSED, COMPLETED), inspect cutoffs, and export candidate shortlist CSVs."
        action={
          <Link href="/recruiter/jobs/new" className="btn-golden text-xs h-11 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create New Campus Drive</span>
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <PlacementCard key={job.id} job={job} isAdmin />
        ))}
      </div>
    </div>
  );
}
