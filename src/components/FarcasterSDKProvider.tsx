'use client';

import { useEffect } from 'react';
import sdk from '@farcaster/frame-sdk';

export default function FarcasterSDKProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const init = async () => {
      // Memberitahu Farcaster bahwa UI sudah siap ditampilkan (menghilangkan splash/loading)
      await sdk.actions.ready();
    };

    init();
  }, []);

  return <>{children}</>;
}
