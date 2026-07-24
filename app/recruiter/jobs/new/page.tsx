'use client';

import { createJobPosting } from '@/app/actions/jobs';
import { Briefcase, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/ui/PageHeader';

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
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="Post New Campus Placement Drive"
        description="Define job requirements, offered CTC package, CGPA cutoffs, backlog limit, allowed branches, and application deadline."
      />

      <div className="card-enterprise">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Job Title / Role</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Software Engineer (SDE-1)"
              className="input-enterprise"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Offered CTC Package</label>
              <input
                type="text"
                name="ctc"
                required
                placeholder="e.g. 18.5 LPA"
                className="input-enterprise font-bold text-[#EAB308]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Application Deadline</label>
              <input
                type="date"
                name="deadline"
                required
                defaultValue={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                className="input-enterprise"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Minimum Cutoff CGPA</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                name="minCgpa"
                required
                defaultValue="7.5"
                className="input-enterprise"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Maximum Allowed Backlogs</label>
              <input
                type="number"
                min="0"
                name="maxBacklogs"
                required
                defaultValue="0"
                className="input-enterprise"
              />
            </div>
          </div>

          {/* Branch Checkboxes */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Eligible Academic Branches</label>
            <div className="flex flex-wrap gap-2">
              {['ALL', 'CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL'].map((b) => {
                const isSelected = branches.includes(b);
                return (
                  <button
                    type="button"
                    key={b}
                    onClick={() => toggleBranch(b)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-[#EAB308] text-[#111827] border-[#EAB308] shadow-sm'
                        : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {b} {isSelected ? '✓' : ''}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Job Description & Requirements</label>
            <textarea
              name="description"
              rows={4}
              required
              placeholder="Describe candidate responsibilities, required technical skills, and interview process..."
              className="w-full p-4 rounded-xl border border-[#E5E7EB] bg-white text-sm text-[#111827] focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20 transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-golden w-full flex items-center justify-center gap-2 h-12 text-sm"
          >
            <Briefcase className="w-4 h-4" />
            <span>{loading ? 'PUBLISHING DRIVE...' : 'PUBLISH CAMPUS PLACEMENT DRIVE'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
