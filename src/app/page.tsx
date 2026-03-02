'use client';

import dynamic from 'next/dynamic';

const MainApp = dynamic(() => import('@/components/MainApp'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white font-black tracking-widest animate-pulse uppercase text-xs">
        Initializing MRxLOLCAT System...
      </div>
    </div>
  ),
});

export default function Page() {
  return <MainApp />;
}
