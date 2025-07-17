import React from 'react';

export default function ZodiacLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-midnight-950 to-surface-900">
      <div className="container mx-auto">
        {children}
      </div>
    </div>
  );
} 