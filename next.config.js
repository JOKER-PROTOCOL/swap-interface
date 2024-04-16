/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  images: {
    // image url sample: https://s2.coinmarketcap.com/static/img/coins/64x64/11289.png
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's2.coinmarketcap.com',
        port: '',
        pathname: '/static/img/**',
      },
    ],
  },
  typescript:{
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // async rewrites() {
  //   // return [
  //   //   {
  //   //     source: '/:path*',
  //   //     destination: 'http://api.async.finance/:path*',

  //   //   },
  //   // ]

  //   return {
  //     fallback: [
  //       {
  //         source: '/:path*',
  //         destination: 'http://api.async.finance/:path*',
  
  //       },
  //     ],
  //   }
  // }
}

module.exports = nextConfig
