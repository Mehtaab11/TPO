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
    <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-indigo-500/20 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-indigo-300 font-medium">
          <ShieldAlert className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Interactive Demo Mode: Switch roles instantly with 1-click</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleSwitch('STUDENT')}
            disabled={loadingRole === 'STUDENT'}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              currentRole === 'STUDENT'
                ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student View</span>
          </button>
          <button
            onClick={() => handleSwitch('RECRUITER')}
            disabled={loadingRole === 'RECRUITER'}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              currentRole === 'RECRUITER'
                ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Recruiter View</span>
          </button>
          <button
            onClick={() => handleSwitch('ADMIN')}
            disabled={loadingRole === 'ADMIN'}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
              currentRole === 'ADMIN'
                ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-400'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
