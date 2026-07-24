'use client';

import { updateJobPostingStatus } from '@/app/actions/jobs';
import { DriveStatus } from '@prisma/client';
import { useState } from 'react';
import { toast } from 'sonner';

export function UpdateJobStatusButton({
  jobId,
  currentStatus,
}: {
  jobId: string;
  currentStatus: DriveStatus;
}) {
  const [status, setStatus] = useState<DriveStatus>(currentStatus);
  const [updating, setUpdating] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as DriveStatus;
    setUpdating(true);
    toast.loading(`Updating drive status to ${newStatus}...`);

    const res = await updateJobPostingStatus(jobId, newStatus);
    toast.dismiss();
    setUpdating(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      setStatus(newStatus);
      toast.success(`Drive status updated to ${newStatus}`);
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={updating}
      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
        status === 'OPEN'
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          : status === 'CLOSED'
          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          : status === 'COMPLETED'
          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
      }`}
    >
      <option value="OPEN" className="bg-slate-900 text-slate-100">
        OPEN
      </option>
      <option value="UPCOMING" className="bg-slate-900 text-slate-100">
        UPCOMING
      </option>
      <option value="CLOSED" className="bg-slate-900 text-slate-100">
        CLOSED
      </option>
      <option value="COMPLETED" className="bg-slate-900 text-slate-100">
        COMPLETED
      </option>
    </select>
  );
}
