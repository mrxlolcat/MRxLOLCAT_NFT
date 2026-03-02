'use client';

import { ConnectButton, darkTheme } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { client } from "@/lib/thirdweb-client";
import { base } from "thirdweb/chains";

const wallets = [
  inAppWallet({
    auth: {
      options: ["farcaster", "email", "google", "apple", "x"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("me.rainbow"),
  createWallet("com.coinbase.wallet"),
];

export function WalletConnector() {
  return (
    <ConnectButton
      client={client}
      chain={base}
      wallets={wallets}
      connectModal={{ 
        size: "wide",
        title: "ACCESS REQUIRED",
        showThirdwebBranding: false,
      }}
      theme={darkTheme({
        colors: {
          modalBg: "#0a0a0a",
          borderColor: "#333333",
          accentText: "#00f2ff",
          accentButtonBg: "#00f2ff",
        },
      })}
      connectButton={{
        className: "!bg-white/5 !text-white !border !border-white/10 !rounded-xl !px-4 !py-2 !text-[10px] !font-black !uppercase hover:!bg-white/10",
        label: "Connect"
      }}
    />
  );
}
