'use client';

import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';

interface EligibilityProps {
  student: {
    cgpa: number;
    backlogs: number;
    branch: string;
  } | null;
  job: {
    minCgpa: number;
    maxBacklogs: number;
    allowedBranches: string[];
    status: string;
  };
}

export function EligibilityBadge({ student, job }: EligibilityProps) {
  const [showReason, setShowReason] = useState(false);

  if (!student) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <Info className="w-3.5 h-3.5" />
        Complete Profile to Check
      </span>
    );
  }

  const reasons: string[] = [];

  // CGPA Check
  if (student.cgpa < job.minCgpa) {
    reasons.push(`Requires min ${job.minCgpa.toFixed(2)} CGPA (Your CGPA: ${student.cgpa.toFixed(2)})`);
  }

  // Backlog Check
  if (student.backlogs > job.maxBacklogs) {
    reasons.push(`Max ${job.maxBacklogs} backlog(s) allowed (Your backlogs: ${student.backlogs})`);
  }

  // Branch Check
  const allowed = job.allowedBranches.map((b) => b.trim().toUpperCase());
  const studentBranch = student.branch.trim().toUpperCase();

  if (allowed.length > 0 && !allowed.includes('ALL') && !allowed.includes(studentBranch)) {
    reasons.push(`Branch '${student.branch}' not in allowed list (${job.allowedBranches.join(', ')})`);
  }

  const isEligible = reasons.length === 0;

  return (
    <div className="relative inline-block">
      {isEligible ? (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Eligible to Apply
        </span>
      ) : (
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setShowReason(!showReason)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Ineligible ({reasons.length} Reason{reasons.length > 1 ? 's' : ''})
          </button>

          {showReason && (
            <div className="absolute right-0 mt-1 z-30 w-64 p-3 rounded-lg bg-slate-900 border border-rose-500/40 shadow-xl text-xs space-y-1.5 text-slate-200">
              <p className="font-semibold text-rose-400 border-b border-slate-800 pb-1">Ineligibility Details:</p>
              {reasons.map((r, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-rose-300/90 leading-tight">
                  <span className="text-rose-500">•</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
