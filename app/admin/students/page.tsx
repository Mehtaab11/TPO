import { getSession } from '@/lib/auth';
import { getAllStudents } from '@/app/actions/admin';
import { redirect } from 'next/navigation';
import { Users, FileText, ExternalLink, CheckCircle2 } from 'lucide-react';
import { StudentDirectoryFilter } from '@/components/StudentDirectoryFilter';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: {
    branch?: string;
    minCgpa?: string;
    maxBacklogs?: string;
    graduationYear?: string;
    search?: string;
  };
}) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  const students = await getAllStudents({
    branch: searchParams.branch,
    minCgpa: searchParams.minCgpa ? parseFloat(searchParams.minCgpa) : undefined,
    maxBacklogs: searchParams.maxBacklogs ? parseInt(searchParams.maxBacklogs, 10) : undefined,
    graduationYear: searchParams.graduationYear ? parseInt(searchParams.graduationYear, 10) : undefined,
    searchQuery: searchParams.search,
  });

  const columns = [
    {
      header: 'Student Candidate',
      cell: (s: any) => (
        <div>
          <div className="font-bold text-[#111827]">{s.fullName}</div>
          <div className="text-xs text-[#6B7280]">{s.user.email}</div>
        </div>
      ),
    },
    {
      header: 'Roll Number',
      cell: (s: any) => <span className="font-semibold text-[#111827]">{s.rollNumber}</span>,
    },
    {
      header: 'Branch',
      cell: (s: any) => <span className="font-bold text-[#111827]">{s.branch}</span>,
    },
    {
      header: 'CGPA',
      cell: (s: any) => <span className="font-extrabold text-[#EAB308]">{s.cgpa.toFixed(2)}</span>,
    },
    {
      header: 'Backlogs',
      cell: (s: any) => (
        <span className={`font-bold ${s.backlogs === 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
          {s.backlogs}
        </span>
      ),
    },
    {
      header: 'Grad Year',
      cell: (s: any) => <span className="text-[#6B7280]">{s.graduationYear}</span>,
    },
    {
      header: 'Resume PDF',
      cell: (s: any) =>
        s.resumeUrl ? (
          <a
            href={s.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#3B82F6] hover:underline"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF Link</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-[#6B7280] italic">No Resume</span>
        ),
    },
    {
      header: 'Placement Status',
      cell: (s: any) => {
        const selectedApp = s.applications.find((a: any) => a.status === 'SELECTED');
        return selectedApp ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Placed at {selectedApp.job.company.companyName}
          </span>
        ) : (
          <span className="text-xs text-[#6B7280] font-medium">
            {s.applications.length} Application{s.applications.length === 1 ? '' : 's'}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Registered Student Directory"
        description="Search candidates across branches, filter by CGPA/backlog requirements, view PDF resumes, and track placement history."
        action={
          <div className="text-xs px-4 py-2 rounded-xl bg-[#FEF9C3] text-[#D97706] border border-[#FDE047] font-bold">
            Matched Candidates: {students.length}
          </div>
        }
      />

      <StudentDirectoryFilter currentParams={searchParams} />

      <DataTable columns={columns} data={students} emptyText="No student candidates matching specified filters." />
    </div>
  );
}
