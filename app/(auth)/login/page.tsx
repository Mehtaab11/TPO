'use client';

import { loginUser, quickDemoLogin } from '@/app/actions/auth';
import { Role } from '@prisma/client';
import { GraduationCap, Lock, Mail, ShieldCheck, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const res = await loginUser(formData);
    setLoading(false);
    if (res?.error) {
      setErrorMsg(res.error);
      toast.error(res.error);
    }
  };

  const handleDemo = async (role: Role) => {
    toast.loading(`Signing in as ${role}...`);
    await quickDemoLogin(role);
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
              <p className="text-xs font-bold uppercase tracking-widest text-[#111827]/80">Campus Placement Office</p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
              Empowering Careers & Campus Recruiting
            </h1>
            <p className="text-sm font-medium leading-relaxed opacity-90">
              "The future belongs to those who prepare for it today. Streamline your placement workflow with real-time verification and automated shortlists."
            </p>
          </div>

          <div className="space-y-2.5 pt-4 text-xs font-bold border-t border-[#111827]/15">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#111827]" />
              <span>Real-Time Server Eligibility Calculation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#111827]" />
              <span>1-Click Candidate Job Drive Application</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#111827]" />
              <span>Direct PDF Resume Verification & CSV Exports</span>
            </div>
          </div>
        </div>

        {/* Vector SVG Graphic */}
        <div className="relative z-10 py-4 flex justify-center">
          <svg className="w-64 h-36" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="15" width="140" height="70" rx="6" fill="white" fillOpacity="0.9" />
            <rect x="40" y="25" width="16" height="16" rx="3" fill="#111827" />
            <rect x="40" y="48" width="16" height="16" rx="3" fill="#111827" />
            <rect x="64" y="28" width="60" height="8" rx="2" fill="#EAB308" />
            <rect x="64" y="52" width="45" height="8" rx="2" fill="#EAB308" />
            <circle cx="150" cy="50" r="10" fill="#22C55E" />
          </svg>
        </div>

        <p className="text-[11px] font-semibold opacity-80 relative z-10">© 2026 Training & Placement Management System</p>
      </div>

      {/* Right 60% Dark Overlay Background with Centered Glassmorphism Card */}
      <div className="w-full lg:w-[60%] bg-[#111827] p-6 sm:p-12 flex items-center justify-center relative overflow-hidden">
        {/* Background Image / Glow Accent */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-[#111827]/90 to-[#EAB308]/10" />

        {/* Centered Glassmorphism Card */}
        <div className="relative z-10 max-w-md w-full rounded-[24px] bg-white/10 backdrop-blur-md border border-white/15 p-8 shadow-2xl space-y-6 text-white">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h2>
            <p className="text-xs text-slate-300">Sign in to your placement portal account</p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-medium text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="student.alex@tpo.edu"
                  className="input-enterprise pl-11 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-[#EAB308] focus:ring-[#EAB308]/30"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <span className="text-xs text-[#EAB308] hover:underline cursor-pointer">Forgot Password?</span>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="input-enterprise pl-11 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-[#EAB308] focus:ring-[#EAB308]/30"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                defaultChecked
                className="rounded border-slate-700 bg-white/10 text-[#EAB308] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-slate-300 font-medium cursor-pointer">
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-golden text-center font-bold flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? 'AUTHENTICATING...' : 'SIGN IN TO PORTAL'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block text-center">
              Quick Demo Sign In
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemo('STUDENT')}
                className="py-2 px-2 rounded-xl bg-white/10 hover:bg-[#EAB308] text-white hover:text-[#111827] text-xs font-bold transition-all border border-white/10 flex items-center justify-center gap-1"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemo('RECRUITER')}
                className="py-2 px-2 rounded-xl bg-white/10 hover:bg-[#EAB308] text-white hover:text-[#111827] text-xs font-bold transition-all border border-white/10 flex items-center justify-center gap-1"
              >
                <Briefcase className="w-4 h-4" />
                <span>Recruiter</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemo('ADMIN')}
                className="py-2 px-2 rounded-xl bg-white/10 hover:bg-[#EAB308] text-white hover:text-[#111827] text-xs font-bold transition-all border border-white/10 flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-300">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-[#EAB308] hover:underline">
              Register now &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
