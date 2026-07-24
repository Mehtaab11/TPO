import type { Metadata } from 'next';
import './globals.css';
import { Playfair_Display, Poppins } from 'next/font/google';
import { getSession } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { QuickDemoBanner } from '@/components/QuickDemoBanner';
import { ToastProvider } from '@/components/ToastProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

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
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="bg-white text-navy min-h-screen flex flex-col antialiased relative overflow-x-hidden font-sans">
        {/* Background Accent: Mustard Yellow Side Bar Decorations */}
        <div className="fixed top-24 left-0 w-6 h-1 bg-mustard rounded-r-full z-0 opacity-80" />
        <div className="fixed top-32 left-0 w-10 h-1 bg-mustard rounded-r-full z-0 opacity-80" />
        <div className="fixed top-40 left-0 w-8 h-1 bg-mustard rounded-r-full z-0 opacity-80" />

        <div className="fixed bottom-24 right-0 w-8 h-1 bg-mustard rounded-l-full z-0 opacity-80" />
        <div className="fixed bottom-32 right-0 w-12 h-1 bg-mustard rounded-l-full z-0 opacity-80" />
        <div className="fixed bottom-40 right-0 w-6 h-1 bg-mustard rounded-l-full z-0 opacity-80" />

        {/* Corner Organic Blobs */}
        <div className="fixed -top-20 -left-20 w-80 h-80 bg-mustard/15 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-mustard/20 rounded-full blur-3xl pointer-events-none z-0" />

        <ToastProvider />
        <QuickDemoBanner currentRole={session?.role} />
        <Navbar session={session} />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {children}
        </main>
        
        <footer className="border-t border-slate-100 py-6 bg-slate-50 text-center text-xs text-warmgray relative z-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Training & Placement Cell. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-navy cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-navy cursor-pointer transition-colors">Placement Guidelines</span>
              <span className="hover:text-navy cursor-pointer transition-colors">Support</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
