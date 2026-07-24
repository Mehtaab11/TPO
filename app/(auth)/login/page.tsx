'use client';

import { loginUser, quickDemoLogin } from '@/app/actions/auth';
import { Role } from '@prisma/client';
import { GraduationCap, Briefcase, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-[85vh] relative flex items-center justify-center p-4">
      {/* Main Card Container with Mustard Header and White Content Panel */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-navy/10 overflow-hidden border border-mustard/20">
        
        {/* Top Mustard Yellow Banner (#F2AA04) with Vector Illustration */}
        <div className="bg-[#F2AA04] p-8 text-center relative flex flex-col items-center justify-center min-h-[210px] overflow-hidden">
          {/* Side Bar Decoration Accents in Header */}
          <div className="absolute top-4 left-4 w-12 h-1 bg-white/40 rounded-full" />
          <div className="absolute top-7 left-4 w-8 h-1 bg-white/40 rounded-full" />
          <div className="absolute top-10 left-4 w-10 h-1 bg-white/40 rounded-full" />

          {/* Vector Illustration */}
          <div className="relative z-10 w-full flex items-center justify-center py-2">
            <svg className="w-48 h-32" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Whiteboard / Task Board */}
              <rect x="35" y="15" width="100" height="60" rx="4" fill="white" fillOpacity="0.9" />
              <rect x="43" y="25" width="12" height="12" rx="2" fill="#E2E8F0" />
              <rect x="43" y="43" width="12" height="12" rx="2" fill="#E2E8F0" />
              <rect x="62" y="28" width="45" height="6" rx="2" fill="#CBD5E1" />
              <rect x="62" y="46" width="35" height="6" rx="2" fill="#CBD5E1" />

              {/* Person in Navy Jacket (#122340) and Blue Pants */}
              <path d="M125 55 L135 100 L120 100 Z" fill="#122340" />
              <path d="M125 55 L145 100 L135 100 Z" fill="#1E3A8A" />
              <rect x="122" y="80" width="8" height="25" fill="#122340" />
              <rect x="135" y="80" width="8" height="25" fill="#1E3A8A" />
              <ellipse cx="123" cy="105" rx="7" ry="3" fill="#0F172A" />
              <ellipse cx="139" cy="105" rx="7" ry="3" fill="#0F172A" />
              <path d="M122 55 Q130 50 138 55 L142 82 L118 82 Z" fill="#2563EB" />
              {/* Giant Muted Red Pen (#D9453C) */}
              <path d="M90 75 L140 45 L146 52 L96 82 Z" fill="#D9453C" />
              <path d="M85 78 L90 75 L96 82 L87 83 Z" fill="#F2AA04" />
              <polygon points="85,78 81,80 87,83" fill="#122340" />
              {/* Head */}
              <circle cx="132" cy="42" r="7" fill="#FCA5A5" />
              <path d="M127 40 Q130 33 137 38 C141 42 135 48 132 48 Q127 46 127 40 Z" fill="#122340" />
            </svg>
          </div>
        </div>

        {/* Integrated White Main Content Panel */}
        <div className="p-8 sm:p-10 space-y-6 bg-white">
          <div className="text-center space-y-1">
            <h1 className="font-serif-header text-3xl font-extrabold tracking-tight text-center">
              Login
            </h1>
            <p className="text-xs text-warmgray font-sans">Enter your credentials to access your dashboard</p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium text-center font-sans">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Minimalist Single Gray Line Input */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-warmgray block font-sans">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="student.alex@tpo.edu"
                className="w-full py-1.5 bg-transparent border-b border-warmgray-light focus:border-mustard text-navy text-sm font-sans focus:outline-none transition-colors rounded-none placeholder:text-slate-300"
              />
            </div>

            {/* Minimalist Single Gray Line Password */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-warmgray block font-sans">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full py-1.5 bg-transparent border-b border-warmgray-light focus:border-mustard text-navy text-sm font-sans focus:outline-none transition-colors rounded-none placeholder:text-slate-300"
              />
            </div>

            {/* Solid Mustard-Yellow Full-Width Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-mustard text-center flex items-center justify-center font-sans"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          {/* Demo Account Switcher */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-bold text-warmgray uppercase tracking-widest block text-center font-sans">
              Quick Demo Login
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemo('STUDENT')}
                className="py-2 px-2 rounded-full bg-slate-50 hover:bg-mustard/10 text-navy hover:text-mustard-hover text-[11px] font-bold transition-all border border-slate-200 flex items-center justify-center gap-1 font-sans"
              >
                <GraduationCap className="w-3.5 h-3.5 text-mustard" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemo('RECRUITER')}
                className="py-2 px-2 rounded-full bg-slate-50 hover:bg-mustard/10 text-navy hover:text-mustard-hover text-[11px] font-bold transition-all border border-slate-200 flex items-center justify-center gap-1 font-sans"
              >
                <Briefcase className="w-3.5 h-3.5 text-mustard" />
                <span>Recruiter</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemo('ADMIN')}
                className="py-2 px-2 rounded-full bg-slate-50 hover:bg-mustard/10 text-navy hover:text-mustard-hover text-[11px] font-bold transition-all border border-slate-200 flex items-center justify-center gap-1 font-sans"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-mustard" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Secondary Link */}
          <div className="text-center pt-1">
            <Link
              href="/register"
              className="text-xs font-semibold text-warmgray hover:text-navy transition-colors font-sans"
            >
              Signup for an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
