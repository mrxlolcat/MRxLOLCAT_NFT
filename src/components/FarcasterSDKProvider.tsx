'use client';

import { useEffect } from 'react';
import sdk from '@farcaster/frame-sdk';

export default function FarcasterSDKProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const init = async () => {
      try {
        // Beritahu Farcaster UI siap
        await sdk.actions.ready();
        
        // Cek context user Farcaster
        const context = await sdk.context;
        if (context?.user) {
          console.log("Farcaster User detected:", context.user.username);
        }
      } catch (error) {
        console.error("Farcaster SDK initialization error:", error);
      }
    };

    init();
  }, []);

  return <>{children}</>;
}
