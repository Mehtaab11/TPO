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
    <div className="card-enterprise space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2 relative">
          <Search className="w-5 h-5 text-[#6B7280] absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
            placeholder="Search student name, roll no, email..."
            className="input-enterprise pl-11"
          />
        </div>

        {/* Branch Filter */}
        <div>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="input-enterprise"
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
            placeholder="Min CGPA (7.5)"
            className="input-enterprise"
          />
        </div>

        {/* Max Backlogs */}
        <div>
          <input
            type="number"
            value={maxBacklogs}
            onChange={(e) => setMaxBacklogs(e.target.value)}
            placeholder="Max Backlogs (0)"
            className="input-enterprise"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#E5E7EB]">
        <button
          type="button"
          onClick={resetFilters}
          className="btn-secondary-white text-xs h-10 flex items-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Filters</span>
        </button>
        <button
          type="button"
          onClick={applyFilters}
          className="btn-golden text-xs h-10 flex items-center gap-1.5"
        >
          <Filter className="w-4 h-4" />
          <span>Apply Filters</span>
        </button>
      </div>
    </div>
  );
}
