'use client';

import { updateStudentProfile } from '@/app/actions/student';
import { FileText, Save, Plus, X, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/ui/PageHeader';

export default function StudentProfilePage() {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js', 'PostgreSQL']);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const input = {
      fullName: formData.get('fullName') as string,
      rollNumber: formData.get('rollNumber') as string,
      branch: formData.get('branch') as string,
      cgpa: parseFloat((formData.get('cgpa') as string) || '0'),
      backlogs: parseInt((formData.get('backlogs') as string) || '0', 10),
      graduationYear: parseInt((formData.get('graduationYear') as string) || '2026', 10),
      resumeUrl: (formData.get('resumeUrl') as string) || undefined,
      skills,
    };

    const res = await updateStudentProfile(input);
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Academic Profile updated successfully!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="Academic Profile & Resume"
        description="Ensure your CGPA, active backlogs, branch, and PDF resume URL are accurate for automated eligibility validation."
      />

      <div className="card-enterprise">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                defaultValue="Alex Morgan"
                className="input-enterprise"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                required
                defaultValue="CS2026-042"
                className="input-enterprise"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Branch</label>
              <select name="branch" required defaultValue="CSE" className="input-enterprise">
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">CGPA (0.0 - 10.0)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                name="cgpa"
                required
                defaultValue="8.85"
                className="input-enterprise font-bold text-[#EAB308]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Active Backlogs</label>
              <input
                type="number"
                min="0"
                name="backlogs"
                required
                defaultValue="0"
                className="input-enterprise"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Graduation Year</label>
              <input
                type="number"
                name="graduationYear"
                required
                defaultValue="2026"
                className="input-enterprise"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Resume PDF URL</label>
              <input
                type="url"
                name="resumeUrl"
                placeholder="https://drive.google.com/your-resume.pdf"
                defaultValue="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                className="input-enterprise"
              />
            </div>
          </div>

          {/* Skills Management */}
          <div className="space-y-3 pt-4 border-t border-[#E5E7EB]">
            <label className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Technical Skills Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FEF9C3] text-[#D97706] text-xs font-bold border border-[#FDE047]"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:text-rose-600 text-[#D97706]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill tag (e.g., Python, Docker)"
                className="input-enterprise flex-1 text-xs"
              />
              <button
                type="button"
                onClick={addSkill}
                className="btn-secondary-white text-xs h-[46px] flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Tag
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-golden w-full flex items-center justify-center gap-2 h-12 text-sm"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'SAVING PROFILE...' : 'SAVE ACADEMIC PROFILE'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
