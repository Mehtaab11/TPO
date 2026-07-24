import React from 'react';
import { cn } from '@/lib/utils';

export type StatusType =
  | 'UPCOMING'
  | 'OPEN'
  | 'CLOSED'
  | 'COMPLETED'
  | 'APPLIED'
  | 'SHORTLISTED'
  | 'INTERVIEW_SCHEDULED'
  | 'SELECTED'
  | 'REJECTED';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getBadgeStyle = (st: string) => {
    switch (st) {
      case 'OPEN':
      case 'SELECTED':
        return 'bg-[#DCFCE7] text-[#15803D] border-[#86EFAC]';
      case 'SHORTLISTED':
      case 'INTERVIEW_SCHEDULED':
        return 'bg-[#DBEAFE] text-[#1D4ED8] border-[#93C5FD]';
      case 'UPCOMING':
      case 'APPLIED':
        return 'bg-[#FEF9C3] text-[#A16207] border-[#FDE047]';
      case 'CLOSED':
      case 'REJECTED':
        return 'bg-[#FEE2E2] text-[#B91C1C] border-[#FCA5A5]';
      case 'COMPLETED':
        return 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]';
      default:
        return 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]';
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border transition-colors',
        getBadgeStyle(status),
        className
      )}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
}
