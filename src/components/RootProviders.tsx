'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThirdwebProvider } from "thirdweb/react";

export function RootProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
}
