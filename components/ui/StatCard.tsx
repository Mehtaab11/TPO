import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  badge?: string;
  iconColor?: string;
  iconBg?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  badge,
  iconColor = 'text-[#EAB308]',
  iconBg = 'bg-[#FEF9C3]',
}: StatCardProps) {
  return (
    <div className="card-enterprise space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
          {title}
        </span>
        <div className={cn('p-2.5 rounded-xl flex items-center justify-center', iconBg)}>
          <Icon className={cn('w-5 h-5', iconColor)} />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-3xl font-extrabold tracking-tight text-[#111827]">{value}</div>
        {badge && (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEF9C3] text-[#D97706] border border-[#FDE047]">
            {badge}
          </span>
        )}
      </div>

      {trend && (
        <div className="text-xs font-medium text-[#6B7280] flex items-center gap-1">
          <span className="text-[#22C55E] font-bold">↑</span>
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}
