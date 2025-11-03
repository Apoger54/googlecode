'use client';

import { useAuth } from '@/lib/authContext';
import { ReactNode } from 'react';

export default function BusinessLayout({ children }: { children: ReactNode }) {
  const { role } = useAuth();

  // This is a basic route guard.
  // In a real app, you'd redirect or show an unauthorized page.
  if (role !== 'business') {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>You must be a business user to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
