import { getSession } from '@/lib/auth';
import { getAllStudents } from '@/app/actions/admin';
import { redirect } from 'next/navigation';
import { Users, Search, Filter, FileText, ExternalLink, GraduationCap, CheckCircle2 } from 'lucide-react';
import { StudentDirectoryFilter } from '@/components/StudentDirectoryFilter';

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" />
            <span>Registered Student Directory</span>
          </h1>
          <p className="text-xs text-slate-400">
            Search candidates across branches, filter by CGPA/backlog criteria, view resume links, and inspect placement history.
          </p>
        </div>

        <div className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
          Matched Candidates: <strong className="text-purple-400">{students.length}</strong>
        </div>
      </div>

      {/* Interactive Filter Bar */}
      <StudentDirectoryFilter currentParams={searchParams} />

      {/* Student List Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3.5">Student Name</th>
              <th className="p-3.5">Roll Number</th>
              <th className="p-3.5">Branch</th>
              <th className="p-3.5">CGPA</th>
              <th className="p-3.5">Backlogs</th>
              <th className="p-3.5">Grad Year</th>
              <th className="p-3.5">Resume PDF</th>
              <th className="p-3.5">Placements / Applications</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {students.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-500 font-medium">
                  No students matching the specified filter criteria.
                </td>
              </tr>
            ) : (
              students.map((s) => {
                const selectedApp = s.applications.find((a) => a.status === 'SELECTED');

                return (
                  <tr key={s.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white">{s.fullName}</div>
                      <div className="text-[11px] text-slate-500">{s.user.email}</div>
                    </td>
                    <td className="p-3.5 font-medium text-slate-200">{s.rollNumber}</td>
                    <td className="p-3.5 font-semibold text-slate-200">{s.branch}</td>
                    <td className="p-3.5 font-bold text-indigo-400">{s.cgpa.toFixed(2)}</td>
                    <td className="p-3.5">
                      <span className={`font-semibold ${s.backlogs === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {s.backlogs}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-300">{s.graduationYear}</td>
                    <td className="p-3.5">
                      {s.resumeUrl ? (
                        <a
                          href={s.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF Resume</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-500 italic">No Resume</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      {selectedApp ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Placed at {selectedApp.job.company.companyName} ({selectedApp.job.ctc})
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">
                          {s.applications.length} Application{s.applications.length === 1 ? '' : 's'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
