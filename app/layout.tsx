import type { Metadata } from 'next';
import './globals.css';
import { getSession } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { QuickDemoBanner } from '@/components/QuickDemoBanner';
import { ToastProvider } from '@/components/ToastProvider';

export const metadata: Metadata = {
  title: 'Training & Placement Office (TPO) Portal',
  description: 'Enterprise Campus Placement Management System for Students, Recruiters, and TPO Officers.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en" className="dark">
      <body className="bg-[#0b0f19] text-slate-100 min-h-screen flex flex-col antialiased">
        <ToastProvider />
        <QuickDemoBanner currentRole={session?.role} />
        <Navbar session={session} />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-800/80 py-6 bg-[#080b12] text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Training & Placement Cell. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-400 cursor-pointer">Placement Guidelines</span>
              <span className="hover:text-slate-400 cursor-pointer">Support</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
