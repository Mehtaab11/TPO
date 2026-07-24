'use client';

import { quickDemoLogin } from '@/app/actions/auth';
import { Role } from '@prisma/client';
import { ShieldAlert, UserCheck, Briefcase, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function QuickDemoBanner({ currentRole }: { currentRole?: Role }) {
  const [loadingRole, setLoadingRole] = useState<Role | null>(null);

  const handleSwitch = async (role: Role) => {
    setLoadingRole(role);
    toast.loading(`Switching session to ${role}...`);
    try {
      await quickDemoLogin(role);
    } catch (e) {
      toast.dismiss();
    }
  };

  return (
    <div className="bg-mustard-light border-b border-mustard/20 px-4 py-2 text-xs relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-navy font-semibold">
          <ShieldAlert className="w-4 h-4 text-mustard-hover animate-pulse" />
          <span>Interactive Demo Mode: Switch roles instantly with 1-click</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleSwitch('STUDENT')}
            disabled={loadingRole === 'STUDENT'}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs font-bold ${
              currentRole === 'STUDENT'
                ? 'bg-mustard text-white shadow-sm ring-2 ring-mustard-hover'
                : 'bg-white text-navy hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student View</span>
          </button>
          <button
            onClick={() => handleSwitch('RECRUITER')}
            disabled={loadingRole === 'RECRUITER'}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs font-bold ${
              currentRole === 'RECRUITER'
                ? 'bg-mustard text-white shadow-sm ring-2 ring-mustard-hover'
                : 'bg-white text-navy hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Recruiter View</span>
          </button>
          <button
            onClick={() => handleSwitch('ADMIN')}
            disabled={loadingRole === 'ADMIN'}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-xs font-bold ${
              currentRole === 'ADMIN'
                ? 'bg-mustard text-white shadow-sm ring-2 ring-mustard-hover'
                : 'bg-white text-navy hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
