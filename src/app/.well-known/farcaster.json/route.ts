import { NextResponse } from 'next/server';

export async function GET() {
  const miniAppConfig = {
    version: "1",
    name: "MRxLOLCAT_NFT",
    iconUrl: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
    homeUrl: "https://mrxlolcat-nft.vercel.app/",
    imageUrl: "https://ipfs.io/ipfs/QmaxJiJ3RQSDvuHNw5DearPFLdU8cA2L5dxDd9UWMwLUex/0.jpeg",
    buttonTitle: "Launch MRxLOLCAT"
  };

  return NextResponse.json({
    accountAssociation: {
      header: "eyJmaWQiOjg4MTU5NywidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDdkRjBEMjAwRTQ3MmNkOGVBRDhFQTM1QmU3YTYzQTU4M0NiN2Y1NzMifQ",
      payload: "eyJkb21haW4iOiJtcnhsb2xjYXQtbmZ0LnZlcmNlbC5hcHAifQ",
      signature: "xk8PabHDa+1wXPbleE3/+dU7fVYpiGY6sop4HQ7Ax/xRaJoMKcDr29c6NButb5AHwXuuv6UiX7wmvf+WMhyGdhs="
    },
    frame: miniAppConfig,
    miniapp: miniAppConfig
  });
}
