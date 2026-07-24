'use client';

import { scheduleInterview } from '@/app/actions/interviews';
import { Calendar, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ScheduleInterviewForm({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const input = {
      jobId,
      title: formData.get('title') as string,
      scheduledAt: formData.get('scheduledAt') as string,
      location: formData.get('location') as string,
      notes: formData.get('notes') as string,
    };

    const res = await scheduleInterview(input);
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Interview round scheduled and published!');
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-300">Round Title</label>
        <input
          type="text"
          name="title"
          required
          placeholder="e.g. Round 1 - Technical Coding"
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-300">Date & Time</label>
        <input
          type="datetime-local"
          name="scheduledAt"
          required
          defaultValue={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-300">Location / Platform Link</label>
        <input
          type="text"
          name="location"
          required
          placeholder="Google Meet / Room 302 Auditorium"
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-300">Notes / Syllabus (Optional)</label>
        <textarea
          name="notes"
          rows={2}
          placeholder="Bring 2 printed resume copies and college ID card..."
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg transition-all flex items-center justify-center gap-1.5"
      >
        <Plus className="w-4 h-4" />
        <span>{loading ? 'Scheduling...' : 'Schedule Round'}</span>
      </button>
    </form>
  );
}
