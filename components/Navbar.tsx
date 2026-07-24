'use client';

import Link from 'next/link';
import { logoutUser } from '@/app/actions/auth';
import { UserSessionPayload } from '@/lib/auth';
import {
  GraduationCap,
  Briefcase,
  UserCheck,
  LogOut,
  ChevronRight,
  Sparkles,
  User,
  CheckCircle2,
  Calendar,
  FileSpreadsheet,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Navbar({ session }: { session: UserSessionPayload | null }) {
  const pathname = usePathname();

  const isStudent = session?.role === 'STUDENT';
  const isRecruiter = session?.role === 'RECRUITER';
  const isAdmin = session?.role === 'ADMIN';

  return (
    <nav className="glass-nav sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                TPO Portal <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-normal">Campus 2026</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">Training & Placement Cell</p>
            </div>
          </Link>

          {/* Navigation Links based on Role */}
          <div className="hidden md:flex items-center gap-1">
            {isStudent && (
              <>
                <Link
                  href="/student"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === '/student' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/student/drives"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith('/student/drives') ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Campus Drives
                </Link>
                <Link
                  href="/student/applications"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith('/student/applications') ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  My Applications
                </Link>
                <Link
                  href="/student/profile"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith('/student/profile') ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Academic Profile
                </Link>
              </>
            )}

            {isRecruiter && (
              <>
                <Link
                  href="/recruiter"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === '/recruiter' ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Recruiter Home
                </Link>
                <Link
                  href="/recruiter/jobs/new"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith('/recruiter/jobs/new') ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Post New Drive
                </Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link
                  href="/admin"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === '/admin' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Analytics
                </Link>
                <Link
                  href="/admin/drives"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith('/admin/drives') ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Drive Management
                </Link>
                <Link
                  href="/admin/students"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith('/admin/students') ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Student Directory & CSV
                </Link>
              </>
            )}
          </div>

          {/* Right Action Menu */}
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-medium text-slate-200">
                    {session.fullName || session.companyName || session.email}
                  </span>
                  <span className="text-[11px] font-semibold text-indigo-400">
                    {session.role}
                  </span>
                </div>
                <form action={logoutUser}>
                  <button
                    type="submit"
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/30 transition-all flex items-center gap-1.5 text-xs font-medium"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-lg shadow-indigo-500/25 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
