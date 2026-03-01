'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Providers } from './Providers';

export function RootClientLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure content renders but avoids server/client mismatch for Web3 state
  return (
    <Providers>
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </Providers>
  );
}
