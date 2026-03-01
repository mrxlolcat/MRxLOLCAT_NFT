'use client';

import { ConnectButton, darkTheme } from 'thirdweb/react';
import { client } from "@/lib/thirdweb-client";
import { base } from "thirdweb/chains";

export function WalletConnector() {
  return (
    <ConnectButton 
      client={client} 
      theme={darkTheme({
        colors: {
          accentText: "#8B5CF6",
          accentButtonBg: "#8B5CF6",
          modalBg: "#020617",
        }
      })}
      chain={base}
      connectButton={{
        className: "!bg-white/5 !text-white !border !border-white/10 !rounded-xl !px-4 !py-2 !text-[10px] !font-black !uppercase hover:!bg-white/10 transition-all",
        label: "Connect Wallet"
      }}
      connectModal={{
        size: "compact",
        showThirdwebBranding: false,
      }}
    />
  );
}
