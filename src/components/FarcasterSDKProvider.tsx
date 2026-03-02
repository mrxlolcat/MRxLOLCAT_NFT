'use client';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';

export default function FarcasterSDKProvider({ children }: { children: React.ReactNode }) {
  const [isReadyCalled, setIsReadyCalled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isReadyCalled) {
      const init = async () => {
        try {
          // Memberitahu Farcaster bahwa UI sudah siap
          await sdk.actions.ready();
          console.log("Farcaster SDK: ready() called successfully");
          setIsReadyCalled(true);
        } catch (error) {
          console.error("Farcaster SDK: ready() error:", error);
        }
      };

      // Gunakan setTimeout 0 untuk memastikan DOM sudah dirender sepenuhnya
      setTimeout(init, 0);
    }
  }, [isReadyCalled]);

  return <>{children}</>;
}
