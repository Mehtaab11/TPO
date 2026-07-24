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
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Navbar({ session }: { session: UserSessionPayload | null }) {
  const pathname = usePathname();

  const isStudent = session?.role === 'STUDENT';
  const isRecruiter = session?.role === 'RECRUITER';
  const isAdmin = session?.role === 'ADMIN';

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-mustard flex items-center justify-center shadow-md shadow-mustard/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-serif font-bold text-xl text-navy tracking-tight flex items-center gap-1.5">
                TPO Portal <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-mustard/15 text-mustard-hover font-bold">2026</span>
              </span>
              <p className="text-[10px] text-warmgray font-medium tracking-wide">Training & Placement Cell</p>
            </div>
          </Link>

          {/* Navigation Links based on Role */}
          <div className="hidden md:flex items-center gap-1">
            {isStudent && (
              <>
                <Link
                  href="/student"
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    pathname === '/student' ? 'bg-mustard text-white shadow-sm' : 'text-warmgray hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/student/drives"
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    pathname.startsWith('/student/drives') ? 'bg-mustard text-white shadow-sm' : 'text-warmgray hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  Campus Drives
                </Link>
                <Link
                  href="/student/applications"
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    pathname.startsWith('/student/applications') ? 'bg-mustard text-white shadow-sm' : 'text-warmgray hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  My Applications
                </Link>
                <Link
                  href="/student/profile"
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    pathname.startsWith('/student/profile') ? 'bg-mustard text-white shadow-sm' : 'text-warmgray hover:text-navy hover:bg-slate-50'
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
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    pathname === '/recruiter' ? 'bg-mustard text-white shadow-sm' : 'text-warmgray hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  Recruiter Home
                </Link>
                <Link
                  href="/recruiter/jobs/new"
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    pathname.startsWith('/recruiter/jobs/new') ? 'bg-mustard text-white shadow-sm' : 'text-warmgray hover:text-navy hover:bg-slate-50'
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
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    pathname === '/admin' ? 'bg-mustard text-white shadow-sm' : 'text-warmgray hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  Analytics
                </Link>
                <Link
                  href="/admin/drives"
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    pathname.startsWith('/admin/drives') ? 'bg-mustard text-white shadow-sm' : 'text-warmgray hover:text-navy hover:bg-slate-50'
                  }`}
                >
                  Drive Management
                </Link>
                <Link
                  href="/admin/students"
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                    pathname.startsWith('/admin/students') ? 'bg-mustard text-white shadow-sm' : 'text-warmgray hover:text-navy hover:bg-slate-50'
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
                  <span className="text-xs font-bold text-navy">
                    {session.fullName || session.companyName || session.email}
                  </span>
                  <span className="text-[10px] font-semibold text-mustard-hover">
                    {session.role}
                  </span>
                </div>
                <form action={logoutUser}>
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 transition-all flex items-center gap-1.5 text-xs font-semibold"
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
                  className="px-4 py-2 text-xs font-bold text-navy hover:text-mustard-hover bg-slate-100 hover:bg-slate-200/60 rounded-full transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 text-xs font-bold text-white bg-mustard hover:bg-mustard-hover rounded-full shadow-md shadow-mustard/30 transition-all"
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
