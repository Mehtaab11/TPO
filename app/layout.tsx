import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from '@/components/ToastProvider';
import { AppShell } from '@/components/ui/AppShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Training & Placement Office (TPO) Enterprise Portal',
  description: 'Enterprise Campus Placement Management System for Students, Recruiters, and TPO Officers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#F8FAFC] text-[#111827] font-sans antialiased">
        <ToastProvider />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
