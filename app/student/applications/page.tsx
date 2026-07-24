import { getSession } from '@/lib/auth';
import { getStudentDashboardData } from '@/app/actions/student';
import { redirect } from 'next/navigation';
import { Clock, Building2, Calendar, CheckCircle2, AlertCircle, MapPin, Info } from 'lucide-react';
import Link from 'next/link';

export default async function StudentApplicationsPage() {
  const session = await getSession();
  if (!session || session.role !== 'STUDENT') {
    redirect('/login');
  }

  const data = await getStudentDashboardData();
  const applications = data?.student?.applications || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Clock className="w-6 h-6 text-emerald-400" />
          <span>My Job Drive Applications</span>
        </h1>
        <p className="text-xs text-slate-400">
          Track real-time candidate shortlist status, interview schedules, and selection outcomes.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 border border-slate-800 text-center space-y-4">
          <Clock className="w-12 h-12 text-slate-600 mx-auto" />
          <h2 className="text-lg font-bold text-white">No Applications Submitted</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            You haven't submitted any applications for campus placement drives yet.
          </p>
          <Link
            href="/student/drives"
            className="inline-block px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30"
          >
            Browse Open Drives
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                    {app.job.company.companyName}
                  </span>
                  <h2 className="text-lg font-bold text-white">{app.job.title}</h2>
                  <p className="text-xs text-slate-400 font-medium">Package: {app.job.ctc}</p>
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      app.status === 'SELECTED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : app.status === 'SHORTLISTED'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        : app.status === 'INTERVIEW_SCHEDULED'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                        : app.status === 'REJECTED'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    Status: {app.status}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Scheduled Interviews Notice */}
              {app.job.interviews.length > 0 && (
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span>Scheduled Recruitment Rounds</span>
                  </div>
                  {app.job.interviews.map((interview) => (
                    <div key={interview.id} className="text-xs text-slate-300 space-y-0.5 pl-6">
                      <p className="font-medium text-white">• {interview.title}</p>
                      <p className="text-slate-400">
                        Date: {new Date(interview.scheduledAt).toLocaleString()} • Venue: {interview.location}
                      </p>
                      {interview.notes && <p className="text-[11px] text-slate-400 italic">Notes: {interview.notes}</p>}
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
