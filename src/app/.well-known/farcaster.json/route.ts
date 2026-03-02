import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ",
      payload: "eyJkb21haW4iOiJtcnhsb2xjYXQtbmZ0LnZlcmNlbC5hcHAifQ",
      signature: "0xba968fA5d5255d6D95bD23D69bA63De13ceFF731"
    },
    frame: {
      version: "next",
      name: "MRxLOLCAT_NFT",
      imageUrl: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
      button: {
        title: "Launch MRxLOLCAT",
        action: {
          type: "launch_miniapp",
          name: "MRxLOLCAT_NFT",
          url: "https://mrxlolcat-nft.vercel.app/",
          splashImageUrl: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
          splashBackgroundColor: "#111111"
        }
      }
    }
  });
}
