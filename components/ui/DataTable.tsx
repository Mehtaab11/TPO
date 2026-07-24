'use client';

import React from 'react';

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: keyof T;
  emptyText?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  emptyText = 'No data records found.',
}: DataTableProps<T>) {
  return (
    <div className="card-enterprise p-0 overflow-hidden border border-[#E5E7EB] shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#111827]">
          <thead className="bg-[#F8FAFC] text-[#6B7280] text-xs font-bold uppercase tracking-wider border-b border-[#E5E7EB] sticky top-0">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] bg-white">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-[#6B7280]">
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="hover:bg-[#FEF9C3]/40 transition-colors">
                  {columns.map((col, idx) => (
                    <td key={idx} className="px-6 py-4 font-medium text-sm">
                      {col.cell ? col.cell(row) : (row[col.accessorKey!] as unknown as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
