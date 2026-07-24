'use client';

import { Search, Filter, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function StudentDirectoryFilter({
  currentParams,
}: {
  currentParams: {
    branch?: string;
    minCgpa?: string;
    maxBacklogs?: string;
    search?: string;
  };
}) {
  const router = useRouter();

  const [search, setSearch] = useState(currentParams.search || '');
  const [branch, setBranch] = useState(currentParams.branch || 'ALL');
  const [minCgpa, setMinCgpa] = useState(currentParams.minCgpa || '');
  const [maxBacklogs, setMaxBacklogs] = useState(currentParams.maxBacklogs || '');

  const applyFilters = () => {
    const query = new URLSearchParams();
    if (search) query.set('search', search);
    if (branch && branch !== 'ALL') query.set('branch', branch);
    if (minCgpa) query.set('minCgpa', minCgpa);
    if (maxBacklogs) query.set('maxBacklogs', maxBacklogs);

    router.push(`/admin/students?${query.toString()}`);
  };

  const resetFilters = () => {
    setSearch('');
    setBranch('ALL');
    setMinCgpa('');
    setMaxBacklogs('');
    router.push('/admin/students');
  };

  return (
    <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search Input */}
        <div className="lg:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
            placeholder="Search student name, roll no, or email..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Branch Filter */}
        <div>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-purple-500"
          >
            <option value="ALL">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
        </div>

        {/* Min CGPA */}
        <div>
          <input
            type="number"
            step="0.1"
            value={minCgpa}
            onChange={(e) => setMinCgpa(e.target.value)}
            placeholder="Min CGPA (e.g. 7.5)"
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Max Backlogs */}
        <div>
          <input
            type="number"
            value={maxBacklogs}
            onChange={(e) => setMaxBacklogs(e.target.value)}
            placeholder="Max Backlogs (e.g. 0)"
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-800/60">
        <button
          type="button"
          onClick={resetFilters}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
        <button
          type="button"
          onClick={applyFilters}
          className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md flex items-center gap-1"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Apply Filters</span>
        </button>
      </div>
    </div>
  );
}
