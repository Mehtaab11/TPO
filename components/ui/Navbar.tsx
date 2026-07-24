'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserSessionPayload } from '@/lib/auth';
import { logoutUser, quickDemoLogin } from '@/app/actions/auth';
import { Role } from '@prisma/client';
import {
  GraduationCap,
  Search,
  Bell,
  User,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
  Menu,
} from 'lucide-react';
import { toast } from 'sonner';

export function Navbar({ session }: { session: UserSessionPayload | null }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleDemoSwitch = async (role: Role) => {
    toast.loading(`Switching session to ${role}...`);
    await quickDemoLogin(role);
  };

  return (
    <header className="h-[72px] sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] px-4 sm:px-8 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#EAB308] text-[#111827] flex items-center justify-center shadow-md shadow-[#EAB308]/25 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-[#111827] flex items-center gap-1.5">
              TPO Portal <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF9C3] text-[#D97706] border border-[#FDE047]">2026</span>
            </span>
            <p className="text-[10px] text-[#6B7280] font-semibold tracking-wide uppercase">University Placement Cell</p>
          </div>
        </Link>
      </div>

      {/* Center Search Input */}
      <div className="hidden md:flex items-center max-w-md w-full relative">
        <Search className="w-5 h-5 text-[#6B7280] absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search placement drives, companies, students..."
          className="w-full h-11 pl-11 pr-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-sm text-[#111827] focus:outline-none focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20 transition-all placeholder:text-[#9CA3AF]"
        />
      </div>

      {/* Right User Bar & Quick Demo Switcher */}
      <div className="flex items-center gap-3">
        {/* Quick Demo Switcher Buttons */}
        <div className="hidden xl:flex items-center gap-1.5 p-1 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-bold">
          <button
            onClick={() => handleDemoSwitch('STUDENT')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              session?.role === 'STUDENT' ? 'bg-[#EAB308] text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => handleDemoSwitch('RECRUITER')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              session?.role === 'RECRUITER' ? 'bg-[#EAB308] text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Recruiter
          </button>
          <button
            onClick={() => handleDemoSwitch('ADMIN')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              session?.role === 'ADMIN' ? 'bg-[#EAB308] text-[#111827] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Notifications Dropdown Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-[#F8FAFC] hover:bg-[#FEF9C3] text-[#111827] border border-[#E5E7EB] flex items-center justify-center transition-colors relative"
          >
            <Bell className="w-5 h-5 text-[#6B7280]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EAB308]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-[#E5E7EB] shadow-xl p-4 space-y-3 z-50">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
                <span className="font-bold text-sm text-[#111827]">Placement Notices</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF9C3] text-[#D97706]">3 New</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                  <p className="font-bold text-[#111827]">Google Cloud Drive Live</p>
                  <p className="text-[#6B7280]">Applications open for SDE-1 role.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB]">
                  <p className="font-bold text-[#111827]">Microsoft Interview Schedule</p>
                  <p className="text-[#6B7280]">Technical coding round scheduled.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu Dropdown */}
        {session ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#F8FAFC] transition-colors border border-transparent hover:border-[#E5E7EB]"
            >
              <div className="w-9 h-9 rounded-xl bg-[#EAB308] text-[#111827] font-extrabold text-sm flex items-center justify-center shadow-sm">
                {(session.fullName || session.companyName || session.email).charAt(0)}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-[#111827] truncate max-w-[120px]">
                  {session.fullName || session.companyName || session.email}
                </span>
                <span className="text-[10px] font-semibold text-[#D97706]">{session.role}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#6B7280]" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#E5E7EB] shadow-xl p-2 z-50 space-y-1">
                <div className="p-3 border-b border-[#E5E7EB]">
                  <p className="text-xs font-bold text-[#111827] truncate">
                    {session.fullName || session.companyName || session.email}
                  </p>
                  <p className="text-[10px] text-[#6B7280]">{session.email}</p>
                </div>

                <form action={logoutUser}>
                  <button
                    type="submit"
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#EF4444] hover:bg-[#FEE2E2] transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login" className="btn-secondary-white text-xs h-10 px-4">
              Sign In
            </Link>
            <Link href="/register" className="btn-golden text-xs h-10 px-4">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
