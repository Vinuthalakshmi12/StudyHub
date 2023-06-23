/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "cloudflare-ipfs.com",
      },
      {
        hostname: "m.media-amazon.com",
      },
      {
        hostname: "d28hgpri8am2if.cloudfront.net",
      },
      {
        hostname:"i.pinimg.com"
      },{
        hostname:"m.media-amazon.com"
      }
    ],
  },
};

module.exports = nextConfig;
