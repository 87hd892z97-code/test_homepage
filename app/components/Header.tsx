'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavigationEffect from './NavigationEffect';

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isPastConcertsPage = pathname?.startsWith('/concerts/past');

  const handleLogoKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = '/';
    }
  };

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

  // Header hide/show on scroll (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth <= 720;

      if (isMobile) {
        if (currentScrollY > 100) { // Only hide after scrolling down a bit
          if (currentScrollY > lastScrollY) {
            // Scrolling down
            setHeaderVisible(false);
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            setHeaderVisible(true);
          }
        } else {
          // Near top, always show header
          setHeaderVisible(true);
        }
      } else {
        // Desktop always show
        setHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
    isHomePage && isScrolled ? 'scrolled' : '',
    !headerVisible ? 'header-hidden' : ''
  ].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClasses}>
        <div className="main-navigation container">
          <div className="header-left">
            <Link
              href="/"
              className="site-title logo-button"
              role="button"
              aria-label="ホームページに戻る"
              tabIndex={0}
              onKeyDown={handleLogoKeyDown}
            >
              <Image
                src="/ynu_orch-logo.svg"
                alt="横浜国立大学管弦楽団"
                width={200}
                height={60}
                className="site-logo"
                priority
              />
            </Link>
          </div>

          <nav className="main-nav">
            <Link
              href="/about"
              className={pathname === '/about' ? 'active' : ''}
            >
              楽団紹介
            </Link>
            <Link
              href="/concerts"
              className={pathname === '/concerts' ? 'active' : ''}
            >
              演奏会情報
            </Link>
            <Link
              href="/donation"
              className={pathname === '/donation' ? 'active' : ''}
            >
              寄付について
            </Link>
            <Link
              href="/recruit"
              className={pathname === '/recruit' ? 'active' : ''}
            >
              団員募集
            </Link>
            <Link
              href="/contact"
              className={pathname === '/contact' ? 'active' : ''}
            >
              お問い合わせ
            </Link>
          </nav>

          {/* Sidebar toggle button for past concerts page - on the right */}
          {isPastConcertsPage && (
            <button
              className="sidebar-toggle-nav"
              onClick={() => {
                const isHidden = document.body.classList.contains('sidebar-hidden');
                if (isHidden) {
                  document.body.classList.remove('sidebar-hidden');
                } else {
                  document.body.classList.add('sidebar-hidden');
                }
              }}
              aria-label="演奏会グループを開閉"
            >
              <span className="hamburger">
                <span></span>
                <span></span>
              </span>
            </button>
          )}

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
          </nav>
        </div>
      )}
    </>
  );
}
