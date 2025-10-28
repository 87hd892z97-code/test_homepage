/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,  // Vercelでの画像表示を確実にする
    disableStaticImages: false,  // 静的画像の最適化を有効に
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
