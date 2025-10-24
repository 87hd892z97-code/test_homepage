/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,  // 開発環境での画像表示を確実にする
    disableStaticImages: false,  // 静的画像の最適化を有効に
  },
}

module.exports = nextConfig
