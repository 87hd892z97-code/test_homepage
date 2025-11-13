'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const images = [
  {
    src: '/MInatoMIraiHall1.jpg', // /public直下に配置
    alt: 'みなとみらいホールでの演奏会',
    width: 1920,
    height: 1080
  },
  {
    src: '/KyurianHall.jpg', // /public直下に配置
    alt: 'アプリコホールでの演奏会',
    width: 1920,
    height: 1080
  }
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      // 画像の切り替えとオーバーレイの変化を同時に開始
      setIsTransitioning(true);
      setCurrentIndex((current) => (current + 1) % images.length);
      // 切り替え後：明るく戻る（2秒）
      setTimeout(() => {
        setIsTransitioning(false);
      }, 2000);
    }, 5000); // 5秒ごとに切り替え

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[2000ms] ease-smooth animate-zoom ${
              index === currentIndex 
                ? 'opacity-100 z-[2]' 
                : 'opacity-0 z-[1]'
            }`}
            sizes="100vw"
            onError={(e) => {
              console.error('Image failed to load:', image.src);
              e.currentTarget.style.display = 'none';
            }}
          />
        ))}
        {/* Base dark overlay with gradient - always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-[1] opacity-100" />
        {/* Additional dark overlay - smoothly darkens during transition */}
        <div 
          className={`absolute inset-0 bg-black z-[1] transition-opacity duration-[2000ms] ease-smooth ${
            isTransitioning ? 'opacity-40' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
}
