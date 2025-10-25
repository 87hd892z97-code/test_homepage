'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import NavigationEffect from './NavigationEffect';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section') as HTMLElement;
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > heroHeight * 0.5); // Change style after scrolling past 50% of hero
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const headerClasses = [
    'site-header',
    isHomePage ? 'home-header' : '',
    isHomePage && isScrolled ? 'scrolled' : ''
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className="main-navigation container">
        <div className="header-left">
          <Link href="/" className="site-title">
            <Image
              src="/ynu-orch-icon-white.png"
              alt="横浜国立大学管弦楽団"
              width={200}
              height={60}
              className="site-logo"
            />
          </Link>
        </div>
        
        <nav className="main-nav">
          <Link href="/about">楽団紹介</Link>
          <Link href="/concerts">演奏会情報</Link>
          <Link href="/donation">寄付について</Link>
          <Link href="/recruit">団員募集</Link>
          <Link href="/contact">お問い合わせ</Link>
          <SearchBar />
        </nav>
        <NavigationEffect />
      </div>
    </header>
  );
}
