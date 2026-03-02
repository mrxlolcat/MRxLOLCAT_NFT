/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["thirdweb"],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.ipfs.nftstorage.link' },
      { protocol: 'https', hostname: 'gateway.ipfscdn.io' }
    ]
  }
};
export default nextConfig;
