import React from 'react';
import { getSession } from '@/lib/auth';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col font-sans">
      {/* 72px Sticky Top Navbar */}
      <Navbar session={session} />

      <div className="flex flex-1">
        {/* 280px Fixed Left Sidebar */}
        <Sidebar session={session} />

        {/* Scrollable Main Content Canvas (Max-width 1600px, 32px Padding) */}
        <main className="flex-1 lg:pl-[280px] w-full">
          <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
