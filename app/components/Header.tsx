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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const headerClasses = [
    'site-header',
    isHomePage ? 'home-header' : '',
    isHomePage && isScrolled ? 'scrolled' : ''
  ].filter(Boolean).join(' ');

  return (
    <>
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
          
          {/* Mobile menu button */}
          <button 
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="メニューを開く"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          
          <NavigationEffect />
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <nav className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button 
              className="mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="メニューを閉じる"
            >
              ×
            </button>
            
            <Link href="/about" className="mobile-menu-link">楽団紹介</Link>
            <Link href="/concerts" className="mobile-menu-link">演奏会情報</Link>
            <Link href="/donation" className="mobile-menu-link">寄付について</Link>
            <Link href="/recruit" className="mobile-menu-link">団員募集</Link>
            <Link href="/contact" className="mobile-menu-link">お問い合わせ</Link>
            <div className="mobile-search">
              <SearchBar />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
