'use client';

import { registerUser } from '@/app/actions/auth';
import { Role } from '@prisma/client';
import { GraduationCap, Briefcase, UserPlus, ArrowRight } from 'lucide-react';
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
    <div className="min-h-[85vh] relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Decorative Yellow Blobs */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-amber-400/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-500/25 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-[36px] shadow-2xl shadow-amber-500/10 overflow-hidden border border-amber-100">
        
        {/* Top Mustard Yellow Banner with Vector Illustration */}
        <div className="bg-gradient-to-b from-[#f3b300] to-[#e6a800] p-6 text-center relative flex flex-col items-center justify-center min-h-[190px] overflow-hidden">
          {/* Background Decorative Dots */}
          <div className="absolute top-6 right-6 flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
          </div>

          {/* Vector Illustration - Character with Magnifying Glass / Verification */}
          <div className="relative z-10 w-full flex items-center justify-center py-1">
            <svg className="w-48 h-28" viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Character Bending / Inspecting */}
              <path d="M75 40 Q85 30 95 38 L102 65 L80 65 Z" fill="#1E3A8A" />
              <rect x="80" y="65" width="8" height="30" fill="#1E40AF" />
              <rect x="92" y="65" width="8" height="30" fill="#1D4ED8" />
              <ellipse cx="80" cy="95" rx="7" ry="3" fill="#0F172A" />
              <ellipse cx="98" cy="95" rx="7" ry="3" fill="#0F172A" />
              {/* Head & Hair */}
              <circle cx="102" cy="30" r="7" fill="#FCA5A5" />
              <path d="M96 28 Q100 20 107 26 C110 30 105 35 102 35 Q97 33 96 28 Z" fill="#1E1B4B" />
              {/* Arm holding magnifying glass */}
              <path d="M92 42 L118 48" stroke="#1E3A8A" strokeWidth="4" strokeLinecap="round" />
              <circle cx="122" cy="49" r="6" stroke="#DC2626" strokeWidth="3" fill="none" />
              <line x1="126" y1="53" x2="132" y2="59" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />

              {/* Dots on ground */}
              <circle cx="130" cy="92" r="3" fill="white" />
              <circle cx="145" cy="92" r="3" fill="white" />
              <circle cx="160" cy="92" r="3" fill="white" />
            </svg>
          </div>
        </div>

        {/* Bottom Form Section */}
        <div className="p-8 sm:p-10 space-y-6 bg-white">
          <div className="text-center space-y-1">
            <h1 className="font-serif text-3xl font-extrabold text-slate-800 tracking-wide">
              Signup
            </h1>
            <p className="text-xs text-slate-400">Join the Campus Placement Office Network</p>
          </div>

          {/* Role Selection Pill Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 rounded-full bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedRole('STUDENT')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold transition-all ${
                selectedRole === 'STUDENT'
                  ? 'bg-[#e6a800] text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Candidate</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole('RECRUITER')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold transition-all ${
                selectedRole === 'RECRUITER'
                  ? 'bg-[#e6a800] text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Corporate Recruiter</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@domain.edu"
                  className="w-full py-1.5 bg-transparent border-b-2 border-slate-200 focus:border-[#e6a800] text-slate-800 text-sm font-medium focus:outline-none transition-colors rounded-none placeholder:text-slate-300"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full py-1.5 bg-transparent border-b-2 border-slate-200 focus:border-[#e6a800] text-slate-800 text-sm font-medium focus:outline-none transition-colors rounded-none placeholder:text-slate-300"
                />
              </div>
            </div>

            {selectedRole === 'STUDENT' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Alex Morgan"
                      className="w-full py-1.5 bg-transparent border-b-2 border-slate-200 focus:border-[#e6a800] text-slate-800 text-sm font-medium focus:outline-none transition-colors rounded-none placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      name="rollNumber"
                      required
                      placeholder="CS2026-042"
                      className="w-full py-1.5 bg-transparent border-b-2 border-slate-200 focus:border-[#e6a800] text-slate-800 text-sm font-medium focus:outline-none transition-colors rounded-none placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Branch
                    </label>
                    <select
                      name="branch"
                      required
                      className="w-full py-1.5 bg-transparent border-b-2 border-slate-200 focus:border-[#e6a800] text-slate-800 text-sm font-medium focus:outline-none transition-colors rounded-none"
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
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      CGPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      name="cgpa"
                      required
                      placeholder="8.50"
                      className="w-full py-1.5 bg-transparent border-b-2 border-slate-200 focus:border-[#e6a800] text-slate-800 text-sm font-semibold text-[#e6a800] focus:outline-none transition-colors rounded-none placeholder:text-slate-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Active Backlogs
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="backlogs"
                      required
                      defaultValue="0"
                      className="w-full py-1.5 bg-transparent border-b-2 border-slate-200 focus:border-[#e6a800] text-slate-800 text-sm font-medium focus:outline-none transition-colors rounded-none"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    placeholder="Google / Microsoft / Tech Corp"
                    className="w-full py-1.5 bg-transparent border-b-2 border-slate-200 focus:border-[#e6a800] text-slate-800 text-sm font-medium focus:outline-none transition-colors rounded-none placeholder:text-slate-300"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Website URL
                    </label>
                    <input
                      type="url"
                      name="website"
                      placeholder="https://company.com"
                      className="w-full py-1.5 bg-transparent border-b-2 border-slate-200 focus:border-[#e6a800] text-slate-800 text-sm font-medium focus:outline-none transition-colors rounded-none placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Industry
                    </label>
                    <input
                      type="text"
                      name="industry"
                      placeholder="Software & Technology"
                      className="w-full py-1.5 bg-transparent border-b-2 border-slate-200 focus:border-[#e6a800] text-slate-800 text-sm font-medium focus:outline-none transition-colors rounded-none placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Vibrant Mustard Yellow Pill Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#f3b300] to-[#e6a800] hover:from-[#e5a700] hover:to-[#d69b00] text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? 'CREATING ACCOUNT...' : `SIGNUP AS ${selectedRole}`}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center pt-2">
            <Link
              href="/login"
              className="text-xs font-bold text-[#e6a800] hover:text-[#c48e00] transition-colors tracking-wide"
            >
              Already have an account? Login &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
