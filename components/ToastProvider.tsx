'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      theme="dark"
      toastOptions={{
        style: {
          background: '#1f2937',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#f9fafb',
        },
      }}
    />
  );
}
