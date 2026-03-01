'use client';

import { ConnectButton, darkTheme } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { client } from "@/lib/thirdweb-client";
import { base } from "thirdweb/chains";

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "farcaster",
        "email",
        "phone",
        "passkey",
        "google",
        "apple",
        "x",
        "coinbase",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
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
        title: "MRxLOLCAT ACCESS",
        showThirdwebBranding: false,
        welcomeScreen: {
          title: "Official NFT Portal",
          subtitle: "Connect to participate in the MRxLOLCAT Collection.",
          img: {
            src: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
            width: 150,
            height: 150,
          },
        },
      }}
      theme={darkTheme({
        colors: {
          modalBg: "#0a0a0a",
          borderColor: "#333333",
          accentText: "#ff69b4",
          accentButtonBg: "#ff69b4",
        },
      })}
      connectButton={{
        className: "!bg-white/5 !text-white !border !border-white/10 !rounded-xl !px-4 !py-2 !text-[10px] !font-black !uppercase hover:!bg-white/10 transition-all",
        label: "Connect Wallet"
      }}
    />
  );
}
