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
        "facebook",
        "x",
        "discord",
        "coinbase",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("app.phantom"),
  createWallet("com.trustwallet.app"),
  createWallet("io.zerion.wallet"),
  createWallet("com.binance.wallet"),
  createWallet("com.okex.wallet"),
  createWallet("io.1inch.wallet"),
  createWallet("com.coinbase.wallet"),
];

export function WalletConnector() {
  return (
    <ConnectButton
      client={client}
      chain={base}
      wallets={wallets}
      // ENABLE GASLESS TRANSACTIONS (ACCOUNT ABSTRACTION)
      accountAbstraction={{
        chain: base,
        sponsorGas: true,
      }}
      connectModal={{ 
        size: "wide",
        title: "MRxLOLCAT MATRIX",
        titleIcon: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
        showThirdwebBranding: false,
        welcomeScreen: {
          title: "Welcome to the Matrix",
          subtitle: "Initialize your connection to access the Genesis Protocol.",
          img: {
            src: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
            width: 150,
            height: 150,
          },
        },
        termsOfServiceUrl: "https://mrxlolcat.com/terms",
        privacyPolicyUrl: "https://mrxlolcat.com/privacy",
      }}
      theme={darkTheme({
        colors: {
          modalBg: "hsl(0, 0%, 4%)",
          borderColor: "hsl(0, 0%, 15%)",
          primaryButtonBg: "#00f2ff", // Matrix Blue
          primaryButtonText: "#000000",
          accentText: "#ff69b4", // Lolcat Pink
          accentButtonBg: "#ff69b4", 
          accentButtonText: "#000000",
          secondaryButtonBg: "rgba(255, 255, 255, 0.05)",
          secondaryButtonHoverBg: "rgba(255, 255, 255, 0.1)",
          skeletonBg: "rgba(255, 255, 255, 0.05)",
          separatorLine: "rgba(255, 255, 255, 0.05)",
        },
      })}
      connectButton={{
        className: "!bg-[#00f2ff]/10 !text-[#00f2ff] !border !border-[#00f2ff]/30 !rounded-xl !px-5 !py-2.5 !text-[11px] !font-black !uppercase hover:!bg-[#00f2ff]/20 hover:!shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all duration-300",
        label: "CONNECT TO MATRIX"
      }}
      detailsButton={{
        className: "!bg-white/5 !text-white !border !border-white/10 !rounded-xl !px-4 !py-2 !text-[11px] !font-bold hover:!bg-white/10 transition-all",
      }}
    />
  );
}
