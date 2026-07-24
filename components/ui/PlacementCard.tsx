import React from 'react';
import { Building2, Calendar, MapPin, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { EligibilityBadge } from '../EligibilityBadge';
import { ApplyDriveButton } from '../ApplyDriveButton';
import Link from 'next/link';

interface PlacementCardProps {
  job: {
    id: string;
    title: string;
    description: string;
    ctc: string;
    minCgpa: number;
    maxBacklogs: number;
    allowedBranches: string[];
    deadline: string | Date;
    status: string;
    company: {
      companyName: string;
    };
    applications?: any[];
  };
  student?: {
    cgpa: number;
    backlogs: number;
    branch: string;
    id?: string;
  } | null;
  hasApplied?: boolean;
  appliedStatus?: string;
  isRecruiter?: boolean;
  isAdmin?: boolean;
}

export function PlacementCard({
  job,
  student,
  hasApplied,
  appliedStatus,
  isRecruiter,
  isAdmin,
}: PlacementCardProps) {
  return (
    <div className="card-enterprise flex flex-col justify-between space-y-5">
      <div className="space-y-4">
        {/* Card Header: Company Logo Avatar & Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF9C3] text-[#D97706] flex items-center justify-center font-bold text-lg border border-[#FDE047] shadow-sm">
              {job.company.companyName.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                {job.company.companyName}
              </span>
              <h3 className="text-lg font-bold text-[#111827] leading-tight">{job.title}</h3>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <StatusBadge status={job.status} />
            {student && <EligibilityBadge student={student} job={job} />}
          </div>
        </div>

        <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-center text-xs">
          <div>
            <span className="text-[10px] text-[#6B7280] block font-medium uppercase">CTC Offer</span>
            <span className="font-bold text-[#EAB308] text-sm">{job.ctc}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#6B7280] block font-medium uppercase">Min CGPA</span>
            <span className="font-bold text-[#111827] text-sm">{job.minCgpa.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#6B7280] block font-medium uppercase">Deadline</span>
            <span className="font-semibold text-[#111827] text-xs">
              {new Date(job.deadline).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="text-xs text-[#6B7280]">
          <span className="font-semibold text-[#111827]">Allowed Branches: </span>
          {job.allowedBranches.join(', ')}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
        <span className="text-xs font-medium text-[#6B7280]">
          {job.applications ? `${job.applications.length} Applicants` : 'Active Drive'}
        </span>

        {isRecruiter || isAdmin ? (
          <Link
            href={`/recruiter/jobs/${job.id}/applicants`}
            className="btn-secondary-white text-xs h-10 px-4 flex items-center gap-1.5"
          >
            <span>Manage Candidates</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : hasApplied ? (
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC] text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            Applied ({appliedStatus || 'APPLIED'})
          </span>
        ) : (
          <ApplyDriveButton studentId={student?.id} jobId={job.id} />
        )}
      </div>
    </div>
  );
}
