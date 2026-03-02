import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ipfs.io' },
      { protocol: 'https', hostname: 'i.seadn.io' },
      { protocol: 'https', hostname: '**.ipfs.nftstorage.link' },
      { protocol: 'https', hostname: 'gateway.ipfscdn.io' }
    ],
  },
  transpilePackages: ["thirdweb", "@farcaster/frame-sdk"],
};

export default nextConfig;
