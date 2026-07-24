'use client';

import { createJobPosting } from '@/app/actions/jobs';
import { Briefcase, Plus, Calendar, DollarSign, BookOpen, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function NewJobPostingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState<string[]>(['CSE', 'IT', 'ECE']);

  const toggleBranch = (b: string) => {
    if (branches.includes(b)) {
      setBranches(branches.filter((item) => item !== b));
    } else {
      setBranches([...branches, b]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const input = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      ctc: formData.get('ctc') as string,
      minCgpa: parseFloat((formData.get('minCgpa') as string) || '0'),
      maxBacklogs: parseInt((formData.get('maxBacklogs') as string) || '0', 10),
      allowedBranches: branches.length > 0 ? branches : ['ALL'],
      deadline: formData.get('deadline') as string,
    };

    const res = await createJobPosting(input);
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Campus placement drive posted successfully!');
      router.push('/recruiter');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Plus className="w-6 h-6 text-emerald-400" />
          <span>Post New Campus Placement Drive</span>
        </h1>
        <p className="text-xs text-slate-400">
          Define job requirements, CTC offer package, CGPA criteria, max backlog limit, allowed branches, and application deadline.
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Job Title / Designation</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Software Development Engineer (SDE-1)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Offered CTC Package (Salary)</label>
              <input
                type="text"
                name="ctc"
                required
                placeholder="e.g. 18.5 LPA or $85,000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 font-semibold text-emerald-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Application Deadline</label>
              <input
                type="date"
                name="deadline"
                required
                defaultValue={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Minimum Cutoff CGPA</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                name="minCgpa"
                required
                defaultValue="7.5"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Maximum Allowed Active Backlogs</label>
              <input
                type="number"
                min="0"
                name="maxBacklogs"
                required
                defaultValue="0"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Branch Checkboxes */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Eligible Academic Branches</label>
            <div className="flex flex-wrap gap-2">
              {['ALL', 'CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'].map((b) => {
                const isSelected = branches.includes(b);
                return (
                  <button
                    type="button"
                    key={b}
                    onClick={() => toggleBranch(b)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {b} {isSelected ? '✓' : ''}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Job Description & Responsibilities</label>
            <textarea
              name="description"
              rows={4}
              required
              placeholder="Describe candidate responsibilities, required skills, tech stack, and interview process details..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            <span>{loading ? 'Publishing Drive...' : 'Publish Campus Placement Drive'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
