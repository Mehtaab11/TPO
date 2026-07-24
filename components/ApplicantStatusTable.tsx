'use client';

import { updateApplicationStatus, bulkUpdateApplicationStatus } from '@/app/actions/applications';
import { ApplicationStatus } from '@prisma/client';
import { FileText, CheckCircle2, XCircle, Clock, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface AppItem {
  id: string;
  status: ApplicationStatus;
  appliedAt: Date;
  student: {
    id: string;
    fullName: string;
    rollNumber: string;
    branch: string;
    cgpa: number;
    backlogs: number;
    resumeUrl: string | null;
    skills: string[];
    user: {
      email: string;
    };
  };
}

export function ApplicantStatusTable({
  jobId,
  applications,
}: {
  jobId: string;
  applications: AppItem[];
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.length === applications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(applications.map((a) => a.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSingleUpdate = async (appId: string, newStatus: ApplicationStatus) => {
    toast.loading(`Updating status to ${newStatus}...`);
    const res = await updateApplicationStatus(appId, newStatus);
    toast.dismiss();

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success(`Candidate status updated to ${newStatus}`);
    }
  };

  const handleBulkUpdate = async (newStatus: ApplicationStatus) => {
    if (selectedIds.length === 0) {
      toast.error('Please select at least one candidate for bulk status update.');
      return;
    }

    setLoading(true);
    toast.loading(`Updating ${selectedIds.length} candidate(s) to ${newStatus}...`);
    const res = await bulkUpdateApplicationStatus(selectedIds, newStatus);
    toast.dismiss();
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success(`Bulk updated ${selectedIds.length} candidate(s) to ${newStatus}`);
      setSelectedIds([]);
    }
  };

  if (applications.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 border border-slate-800 text-center space-y-2">
        <p className="text-sm font-medium text-slate-300">No student applications submitted yet for this drive.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedIds.length > 0 && selectedIds.length === applications.length}
            onChange={toggleSelectAll}
            className="rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-0 cursor-pointer"
          />
          <span className="text-slate-300 font-medium">
            Selected: <strong className="text-white">{selectedIds.length}</strong> / {applications.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleBulkUpdate('SHORTLISTED')}
            disabled={loading || selectedIds.length === 0}
            className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 font-semibold disabled:opacity-40 transition-all"
          >
            Bulk Shortlist
          </button>
          <button
            type="button"
            onClick={() => handleBulkUpdate('SELECTED')}
            disabled={loading || selectedIds.length === 0}
            className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 font-semibold disabled:opacity-40 transition-all"
          >
            Bulk Select
          </button>
          <button
            type="button"
            onClick={() => handleBulkUpdate('REJECTED')}
            disabled={loading || selectedIds.length === 0}
            className="px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-300 border border-rose-500/30 hover:bg-rose-600/30 font-semibold disabled:opacity-40 transition-all"
          >
            Bulk Reject
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3.5 w-8"></th>
              <th className="p-3.5">Student Name</th>
              <th className="p-3.5">Branch</th>
              <th className="p-3.5">CGPA</th>
              <th className="p-3.5">Backlogs</th>
              <th className="p-3.5">Resume</th>
              <th className="p-3.5">Current Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3.5">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(app.id)}
                    onChange={() => toggleSelectOne(app.id)}
                    className="rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-0 cursor-pointer"
                  />
                </td>
                <td className="p-3.5">
                  <div className="font-bold text-white">{app.student.fullName}</div>
                  <div className="text-[11px] text-slate-500">{app.student.rollNumber} • {app.student.user.email}</div>
                </td>
                <td className="p-3.5 font-semibold text-slate-200">{app.student.branch}</td>
                <td className="p-3.5 font-bold text-indigo-400">{app.student.cgpa.toFixed(2)}</td>
                <td className="p-3.5">
                  <span
                    className={`font-semibold ${
                      app.student.backlogs === 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {app.student.backlogs}
                  </span>
                </td>
                <td className="p-3.5">
                  {app.student.resumeUrl ? (
                    <a
                      href={app.student.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-500 italic">No Link</span>
                  )}
                </td>
                <td className="p-3.5">
                  <select
                    value={app.status}
                    onChange={(e) => handleSingleUpdate(app.id, e.target.value as ApplicationStatus)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      app.status === 'SELECTED'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : app.status === 'SHORTLISTED'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : app.status === 'REJECTED'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <option value="APPLIED" className="bg-slate-900 text-slate-100">
                      APPLIED
                    </option>
                    <option value="SHORTLISTED" className="bg-slate-900 text-slate-100">
                      SHORTLISTED
                    </option>
                    <option value="INTERVIEW_SCHEDULED" className="bg-slate-900 text-slate-100">
                      INTERVIEW_SCHEDULED
                    </option>
                    <option value="SELECTED" className="bg-slate-900 text-slate-100">
                      SELECTED
                    </option>
                    <option value="REJECTED" className="bg-slate-900 text-slate-100">
                      REJECTED
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
