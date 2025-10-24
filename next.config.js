/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,  // Vercelでの画像表示を確実にする
    disableStaticImages: false,  // 静的画像の最適化を有効に
  },
  experimental: {
    serverComponentsExternalPackages: ['bcrypt']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('bcrypt');
    }
    return config;
  }
}

module.exports = nextConfig
