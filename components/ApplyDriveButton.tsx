'use client';

import { applyToJobDrive } from '@/app/actions/applications';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ApplyDriveButton({
  studentId,
  jobId,
}: {
  studentId?: string;
  jobId: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!studentId) {
      toast.error('Please complete your academic profile before applying.');
      return;
    }

    setLoading(true);
    toast.loading('Validating eligibility & submitting application...');

    try {
      const res = await applyToJobDrive(studentId, jobId);
      toast.dismiss();

      if (res?.error) {
        toast.error(res.error, { duration: 5000 });
      } else {
        toast.success('Application submitted successfully! Good luck 🎉');
      }
    } catch (e) {
      toast.dismiss();
      toast.error('Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleApply}
      disabled={loading}
      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-1.5 disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Applying...</span>
        </>
      ) : (
        <>
          <span>1-Click Apply</span>
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}
