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
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Header hide/show on scroll (mobile only, controlled by CSS media query)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

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

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);


  // Header base classes
  const headerBaseClasses = "fixed top-0 left-0 right-0 z-20 transition-all duration-300 ease py-2";
  
  // Header background and text color based on state
  const headerStyleClasses = isHomePage && !isScrolled
    ? "glass-header-dark text-white"
    : "glass-header text-text-secondary";
  
  // Header visibility (only hide on mobile when scrolling)
  const headerVisibilityClasses = !headerVisible ? "max-nav-break:-translate-y-full" : "";
  
  const headerClasses = `${headerBaseClasses} ${headerStyleClasses} ${headerVisibilityClasses}`;

  // Navigation link classes
  const getNavLinkClasses = (isActive: boolean) => {
    const baseClasses = "relative px-4 py-2 transition-colors duration-300 ease font-sans tracking-tight text-base";
    if (isHomePage && !isScrolled) {
      return `${baseClasses} text-white ${isActive ? 'text-white' : ''}`;
    }
    return `${baseClasses} ${isActive ? 'text-accent dark:text-[#4fc3f7]' : 'text-text-secondary dark:text-[#cccccc] hover:text-accent dark:hover:text-[#4fc3f7]'}`;
  };

  return (
    <>
      <header className={headerClasses}>
        <div className="flex items-center justify-between py-2 relative max-w-container mx-auto px-4 w-full overflow-x-hidden min-h-[60px]">
          <div className="flex items-center gap-6 flex-shrink-0 mr-auto">
            <Link
              href="/"
              className="flex items-center justify-center cursor-pointer p-2 m-[-0.5rem] min-h-11 min-w-11 bg-transparent border-0 no-underline"
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
                className="h-[60px] w-auto object-contain bg-transparent select-none block pointer-events-none"
                style={!isHomePage || isScrolled ? {
                  // accent色 #2b6cb0 (rgb(43, 108, 176)) に近づけるフィルター
                  filter: 'brightness(0) saturate(100%) invert(17%) sepia(100%) saturate(7000%) hue-rotate(208deg) brightness(0.75) contrast(1.8)',
                  opacity: 1,
                  transition: 'none',
                } : {
                  filter: 'none',
                  opacity: 1,
                  transition: 'none',
                }}
                priority
              />
            </Link>
          </div>

          <nav 
            className="main-nav flex gap-8 relative flex-nowrap mr-12 max-nav-break:hidden"
            style={{
              '--underline-left': 'var(--underline-left, 0px)',
              '--underline-width': 'var(--underline-width, 0px)',
              '--underline-opacity': 'var(--underline-opacity, 1)',
            } as React.CSSProperties}
          >
            {/* Underline indicator */}
            <div 
              className={`absolute bottom-0 h-px transition-all duration-[800ms] ease-smooth will-change-transform translate-z-0 ${
                isHomePage && !isScrolled ? 'bg-white' : 'bg-accent'
              }`}
              style={{
                left: 'var(--underline-left, 0px)',
                width: 'var(--underline-width, 0px)',
                opacity: 'var(--underline-opacity, 1)',
              }}
            />
            <Link
              href="/about"
              className={getNavLinkClasses(pathname === '/about')}
            >
              楽団紹介
            </Link>
            <Link
              href="/concerts"
              className={getNavLinkClasses(pathname === '/concerts')}
            >
              演奏会情報
            </Link>
            <Link
              href="/donation"
              className={getNavLinkClasses(pathname === '/donation')}
            >
              寄付について
            </Link>
            <Link
              href="/recruit"
              className={getNavLinkClasses(pathname === '/recruit')}
            >
              団員募集
            </Link>
            <Link
              href="/contact"
              className={getNavLinkClasses(pathname === '/contact')}
            >
              お問い合わせ
            </Link>
          </nav>

          {/* Sidebar toggle button for past concerts page - on the right */}
          {isPastConcertsPage && (
            <button
              className="bg-transparent border-0 flex items-center justify-center cursor-pointer p-2 absolute right-4 top-1/2 -translate-y-1/2 flex-shrink-0 z-10 animate-hamburger-intro max-mobile:hidden"
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
              <span className="flex flex-col justify-center gap-0 w-3.5 h-2.5 transition-all duration-slow ease-out relative">
                <span className="block h-[1.5px] w-full bg-accent transition-transform duration-slow ease-out absolute top-1/2 left-0 -translate-y-1/2"></span>
                <span className="block h-[1.5px] w-full bg-accent transition-transform duration-slow ease-out absolute top-1/2 left-0 -translate-y-1/2"></span>
              </span>
            </button>
          )}

          {/* Mobile menu button */}
          <button
            className="hidden max-nav-break:block absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer p-2 z-[1001]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニューを開く"
          >
            <span className={`flex flex-col w-6 h-[18px] justify-between ${menuOpen ? 'active' : ''}`}>
              <span className={`block h-0.5 w-full rounded-sm transition-all duration-300 ease ${
                isHomePage && !isScrolled ? 'bg-white' : 'bg-accent'
              } ${menuOpen ? 'rotate-45 translate-x-[5px] translate-y-[5px]' : ''}`}></span>
              <span className={`block h-0.5 w-full rounded-sm transition-all duration-300 ease ${
                isHomePage && !isScrolled ? 'bg-white' : 'bg-accent'
              } ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full rounded-sm transition-all duration-300 ease ${
                isHomePage && !isScrolled ? 'bg-white' : 'bg-accent'
              } ${menuOpen ? '-rotate-45 translate-x-[7px] -translate-y-[6px]' : ''}`}></span>
            </span>
          </button>

          <NavigationEffect />
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="max-nav-break:fixed max-nav-break:inset-0 max-nav-break:z-[1000] max-nav-break:flex max-nav-break:items-center max-nav-break:justify-center max-nav-break:animate-fade-in hidden"
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
          onClick={() => setMenuOpen(false)}
        >
          <nav className="flex flex-col items-center gap-8 text-center relative" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              className="fixed right-4 top-4 max-mobile:top-11 max-mobile:opacity-0 max-mobile:animate-fade-in-button bg-transparent border-0 text-white text-3xl cursor-pointer p-2 leading-none transition-colors duration-300 ease z-[1001] hover:text-accent"
              onClick={() => setMenuOpen(false)}
              aria-label="メニューを閉じる"
            >
              ×
            </button>

            <Link href="/about" className="text-white no-underline text-2xl font-light p-4 transition-colors duration-300 ease font-sans hover:text-accent">楽団紹介</Link>
            <Link href="/concerts" className="text-white no-underline text-2xl font-light p-4 transition-colors duration-300 ease font-sans hover:text-accent">演奏会情報</Link>
            <Link href="/donation" className="text-white no-underline text-2xl font-light p-4 transition-colors duration-300 ease font-sans hover:text-accent">寄付について</Link>
            <Link href="/recruit" className="text-white no-underline text-2xl font-light p-4 transition-colors duration-300 ease font-sans hover:text-accent">団員募集</Link>
            <Link href="/contact" className="text-white no-underline text-2xl font-light p-4 transition-colors duration-300 ease font-sans hover:text-accent">お問い合わせ</Link>
          </nav>
        </div>
      )}
    </>
  );
}
