'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const images = [
  {
    src: '/MinatoMiraiHall.jpg', // /public直下に配置
    alt: 'みなとみらいホールでの演奏会',
    width: 1920,
    height: 1080
  },
  {
    src: '/AprikoHall.jpg', // /public直下に配置
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
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((current) => (current + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // フェードアウト完了後に画像切り替え
    }, 5000); // 5秒ごとに切り替え

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-image" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`hero-slide ${
            index === currentIndex ? 'active' : ''
          } ${isTransitioning ? 'transitioning' : ''}`}
          style={{ position: 'relative', width: '100%', height: '100%' }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            className="hero-bg-image"
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
      ))}
    </div>
  );
}
