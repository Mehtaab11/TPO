'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserSessionPayload } from '@/lib/auth';
import { logoutUser } from '@/app/actions/auth';
import {
  LayoutDashboard,
  Briefcase,
  Clock,
  User,
  Users,
  BarChart3,
  Building2,
  FileSpreadsheet,
  PlusCircle,
  LogOut,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar({ session }: { session: UserSessionPayload | null }) {
  const pathname = usePathname();

  const isStudent = session?.role === 'STUDENT';
  const isRecruiter = session?.role === 'RECRUITER';
  const isAdmin = session?.role === 'ADMIN';

  const getNavItems = () => {
    if (isStudent) {
      return [
        { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
        { label: 'Placement Drives', href: '/student/drives', icon: Briefcase },
        { label: 'My Applications', href: '/student/applications', icon: Clock },
        { label: 'Academic Profile', href: '/student/profile', icon: User },
      ];
    }
    if (isRecruiter) {
      return [
        { label: 'Dashboard', href: '/recruiter', icon: LayoutDashboard },
        { label: 'Post New Drive', href: '/recruiter/jobs/new', icon: PlusCircle },
      ];
    }
    if (isAdmin) {
      return [
        { label: 'Analytics Dashboard', href: '/admin', icon: BarChart3 },
        { label: 'Drive Management', href: '/admin/drives', icon: Briefcase },
        { label: 'Student Directory', href: '/admin/students', icon: Users },
      ];
    }
    return [
      { label: 'Home', href: '/', icon: LayoutDashboard },
      { label: 'Sign In', href: '/login', icon: User },
      { label: 'Register', href: '/register', icon: PlusCircle },
    ];
  };

  const navItems = getNavItems();

  return (
    <aside className="w-[280px] fixed left-0 top-[72px] bottom-0 bg-white border-r border-[#E5E7EB] z-30 hidden lg:flex flex-col justify-between p-4 overflow-y-auto">
      {/* Navigation Section */}
      <div className="space-y-6">
        {/* User Card Profile Header in Sidebar */}
        {session && (
          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAB308] text-black font-bold flex items-center justify-center shadow-sm">
              {(session.fullName || session.companyName || session.email).charAt(0)}
            </div>
            <div className="overflow-hidden text-left">
              <p className="text-sm font-bold text-[#111827] truncate">
                {session.fullName || session.companyName || session.email}
              </p>
              <p className="text-xs font-semibold text-[#D97706]">{session.role}</p>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider px-3 block mb-2">
            Navigation Menu
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-3 rounded-xl text-[15px] font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[#EAB308] text-[#111827] font-bold shadow-sm'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#FEF9C3]'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive ? 'text-[#111827]' : 'text-[#6B7280]')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout / Footer Action in Sidebar */}
      {session && (
        <div className="pt-4 border-t border-[#E5E7EB]">
          <form action={logoutUser}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-[15px] font-semibold text-[#EF4444] hover:bg-[#FEE2E2] transition-colors"
            >
              <LogOut className="w-5 h-5 text-[#EF4444]" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
