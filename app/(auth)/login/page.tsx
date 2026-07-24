'use client';

import { loginUser, quickDemoLogin } from '@/app/actions/auth';
import { Role } from '@prisma/client';
import { GraduationCap, Briefcase, ShieldCheck, ArrowRight, Lock, Mail } from 'lucide-react';
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
    <div className="max-w-md mx-auto py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/25">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Sign In to TPO Portal</h1>
        <p className="text-xs text-slate-400">Access your placement dashboard, active drives, and status updates.</p>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                name="email"
                required
                placeholder="student.alex@tpo.edu"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#111827] px-2 text-slate-400 font-medium">Or Quick Demo Login</span>
          </div>
        </div>

        {/* Quick Demo Login Triggers */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleDemo('STUDENT')}
            className="p-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 flex flex-col items-center gap-1 transition-all text-xs font-medium"
          >
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>Student</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemo('RECRUITER')}
            className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 flex flex-col items-center gap-1 transition-all text-xs font-medium"
          >
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>Recruiter</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemo('ADMIN')}
            className="p-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 flex flex-col items-center gap-1 transition-all text-xs font-medium"
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
}
