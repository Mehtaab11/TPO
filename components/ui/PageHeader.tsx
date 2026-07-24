import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight text-[#111827]">{title}</h1>
        {description && (
          <p className="text-base text-[#6B7280] font-normal leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-3 self-start md:self-auto">{action}</div>}
    </div>
  );
}
