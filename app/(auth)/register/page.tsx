'use client';

import { registerUser } from '@/app/actions/auth';
import { Role } from '@prisma/client';
import { GraduationCap, Briefcase, UserPlus, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<Role>('STUDENT');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set('role', selectedRole);

    const res = await registerUser(formData);
    setLoading(false);

    if (res?.error) {
      setErrorMsg(res.error);
      toast.error(res.error);
    }
  };

  return (
    <div className="min-h-[88vh] flex rounded-[24px] overflow-hidden border border-[#E5E7EB] shadow-2xl my-4">
      {/* Left 40% Golden Hero Banner Section */}
      <div className="hidden lg:flex lg:w-[40%] bg-[#EAB308] p-10 flex-col justify-between relative overflow-hidden text-[#111827]">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#111827] text-[#EAB308] flex items-center justify-center font-bold text-xl shadow-lg">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-extrabold text-xl tracking-tight text-[#111827]">TPO Portal</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-[#111827]/80">Join Campus Placement</p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
              Create Your Official Placement Account
            </h1>
            <p className="text-sm font-medium leading-relaxed opacity-90">
              Register as a Student candidate to unlock automated eligibility checks and 1-click applications, or register as a Corporate Recruiter to post campus drives.
            </p>
          </div>

          <div className="space-y-2.5 pt-4 text-xs font-bold border-t border-[#111827]/15">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#111827]" />
              <span>Student Profile & Skill Tagging</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#111827]" />
              <span>Corporate Company Profile Creation</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] font-semibold opacity-80 relative z-10">© 2026 Training & Placement Cell</p>
      </div>

      {/* Right 60% Dark Overlay Background with Centered Glassmorphism Card */}
      <div className="w-full lg:w-[60%] bg-[#111827] p-6 sm:p-12 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-[#111827]/90 to-[#EAB308]/10" />

        <div className="relative z-10 max-w-lg w-full rounded-[24px] bg-white/10 backdrop-blur-md border border-white/15 p-8 shadow-2xl space-y-6 text-white">
          <div className="text-center space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-white">Create Account</h2>
            <p className="text-xs text-slate-300">Choose your role to get started</p>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-white/10 border border-white/15">
            <button
              type="button"
              onClick={() => setSelectedRole('STUDENT')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                selectedRole === 'STUDENT'
                  ? 'bg-[#EAB308] text-[#111827] shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Candidate</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('RECRUITER')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                selectedRole === 'RECRUITER'
                  ? 'bg-[#EAB308] text-[#111827] shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Corporate Recruiter</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-medium text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@domain.edu"
                  className="input-enterprise bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-[#EAB308]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="input-enterprise bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-[#EAB308]"
                />
              </div>
            </div>

            {selectedRole === 'STUDENT' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Alex Morgan"
                      className="input-enterprise bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-[#EAB308]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Roll Number</label>
                    <input
                      type="text"
                      name="rollNumber"
                      required
                      placeholder="CS2026-042"
                      className="input-enterprise bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-[#EAB308]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Branch</label>
                    <select
                      name="branch"
                      required
                      className="input-enterprise bg-[#111827] border-white/20 text-white focus:border-[#EAB308]"
                    >
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="MECH">MECH</option>
                      <option value="CIVIL">CIVIL</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">CGPA</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      name="cgpa"
                      required
                      placeholder="8.50"
                      className="input-enterprise bg-white/10 border-white/20 text-[#EAB308] font-bold focus:border-[#EAB308]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Backlogs</label>
                    <input
                      type="number"
                      min="0"
                      name="backlogs"
                      required
                      defaultValue="0"
                      className="input-enterprise bg-white/10 border-white/20 text-white focus:border-[#EAB308]"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    placeholder="Google / Microsoft / Tech Corp"
                    className="input-enterprise bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-[#EAB308]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Website</label>
                    <input
                      type="url"
                      name="website"
                      placeholder="https://company.com"
                      className="input-enterprise bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-[#EAB308]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Industry</label>
                    <input
                      type="text"
                      name="industry"
                      placeholder="Software & Technology"
                      className="input-enterprise bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-[#EAB308]"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-golden text-center font-bold flex items-center justify-center gap-2 mt-4"
            >
              <span>{loading ? 'REGISTERING...' : `REGISTER AS ${selectedRole}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-300">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#EAB308] hover:underline">
              Sign in &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
