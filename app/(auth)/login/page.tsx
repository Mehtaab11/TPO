'use client';

import { loginUser, quickDemoLogin } from '@/app/actions/auth';
import { Role } from '@prisma/client';
import { GraduationCap, Briefcase, ShieldCheck, ArrowRight, Lock, Mail } from 'lucide-react';
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
    <div className="min-h-[85vh] relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Decorative Yellow Blobs */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-amber-400/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-500/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-12 w-48 h-48 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none" />

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-[36px] shadow-2xl shadow-amber-500/10 overflow-hidden border border-amber-100">
        
        {/* Top Mustard Yellow Banner with Vector Illustration */}
        <div className="bg-gradient-to-b from-[#f3b300] to-[#e6a800] p-8 text-center relative flex flex-col items-center justify-center min-h-[210px] overflow-hidden">
          {/* Background Decorative Pattern Elements */}
          <div className="absolute top-4 left-4 w-12 h-1.5 bg-amber-300/60 rounded-full" />
          <div className="absolute top-8 left-4 w-8 h-1.5 bg-amber-300/60 rounded-full" />
          <div className="absolute top-12 left-4 w-10 h-1.5 bg-amber-300/60 rounded-full" />
          
          {/* Vector Illustration */}
          <div className="relative z-10 w-full flex items-center justify-center py-2">
            <svg className="w-48 h-32" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Whiteboard / Screen */}
              <rect x="35" y="15" width="100" height="60" rx="4" fill="white" fillOpacity="0.9" />
              <rect x="43" y="25" width="12" height="12" rx="2" fill="#E2E8F0" />
              <rect x="43" y="43" width="12" height="12" rx="2" fill="#E2E8F0" />
              <rect x="62" y="28" width="45" height="6" rx="2" fill="#CBD5E1" />
              <rect x="62" y="46" width="35" height="6" rx="2" fill="#CBD5E1" />

              {/* Character */}
              {/* Body */}
              <path d="M125 55 L135 100 L120 100 Z" fill="#1E3A8A" />
              <path d="M125 55 L145 100 L135 100 Z" fill="#1D4ED8" />
              {/* Legs */}
              <rect x="122" y="80" width="8" height="25" fill="#1E40AF" />
              <rect x="135" y="80" width="8" height="25" fill="#1D4ED8" />
              <ellipse cx="123" cy="105" rx="7" ry="3" fill="#0F172A" />
              <ellipse cx="139" cy="105" rx="7" ry="3" fill="#0F172A" />
              {/* Torso & Shirt */}
              <path d="M122 55 Q130 50 138 55 L142 82 L118 82 Z" fill="#3B82F6" />
              {/* Giant Pencil */}
              <path d="M90 75 L140 45 L146 52 L96 82 Z" fill="#DC2626" />
              <path d="M85 78 L90 75 L96 82 L87 83 Z" fill="#FDE047" />
              <polygon points="85,78 81,80 87,83" fill="#1E293B" />
              {/* Head & Hair */}
              <circle cx="132" cy="42" r="7" fill="#FCA5A5" />
              <path d="M127 40 Q130 33 137 38 C141 42 135 48 132 48 Q127 46 127 40 Z" fill="#1E1B4B" />
              {/* Decorative Geometric Objects */}
              <path d="M40 92 C40 82 60 82 60 92 Z" fill="#1E3A8A" />
              <rect x="42" y="94" width="22" height="6" rx="3" fill="#93C5FD" />
              <circle cx="165" cy="85" r="8" fill="#60A5FA" />
            </svg>
          </div>
        </div>

        {/* Bottom Form Section */}
        <div className="p-8 sm:p-10 space-y-6 bg-white">
          <div className="text-center space-y-1">
            <h1 className="font-serif text-3xl font-extrabold text-slate-800 tracking-wide">
              Login
            </h1>
            <p className="text-xs text-slate-400">Welcome back to TPO Placement Portal</p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Minimal Underlined Email Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="student.alex@tpo.edu"
                className="w-full py-2 bg-transparent border-b-2 border-slate-200 focus:border-[#e6a800] text-slate-800 text-sm font-medium focus:outline-none transition-colors rounded-none placeholder:text-slate-300"
              />
            </div>

            {/* Minimal Underlined Password Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full py-2 bg-transparent border-b-2 border-slate-200 focus:border-[#e6a800] text-slate-800 text-sm font-medium focus:outline-none transition-colors rounded-none placeholder:text-slate-300"
              />
            </div>

            {/* Vibrant Mustard Yellow Pill Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#f3b300] to-[#e6a800] hover:from-[#e5a700] hover:to-[#d69b00] text-white font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          {/* Quick Demo Role Triggers */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-center">
              Quick Demo Account Switcher
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemo('STUDENT')}
                className="py-2 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold transition-all border border-amber-200/60 flex items-center justify-center gap-1"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemo('RECRUITER')}
                className="py-2 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold transition-all border border-amber-200/60 flex items-center justify-center gap-1"
              >
                <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                <span>Recruiter</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemo('ADMIN')}
                className="py-2 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold transition-all border border-amber-200/60 flex items-center justify-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Signup Link */}
          <div className="text-center pt-1">
            <Link
              href="/register"
              className="text-xs font-bold text-[#e6a800] hover:text-[#c48e00] transition-colors tracking-wide"
            >
              Signup for an account &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
