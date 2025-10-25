'use client';

import { useEffect } from 'react';

export default function NavigationEffect() {
  useEffect(() => {
    const nav = document.querySelector('.main-nav') as HTMLElement;
    const navLinks = document.querySelectorAll('.main-nav a:not(.search-container a)') as NodeListOf<HTMLElement>;
    
    if (!nav || navLinks.length === 0) return;

    // 下線の初期位置を設定
    const updateUnderline = (targetLink: HTMLElement) => {
      const navRect = nav.getBoundingClientRect();
      const linkRect = targetLink.getBoundingClientRect();
      
      const left = linkRect.left - navRect.left;
      const width = linkRect.width;
      
      nav.style.setProperty('--underline-left', `${left}px`);
      nav.style.setProperty('--underline-width', `${width}px`);
    };

    // ホバーイベントを追加
    navLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        updateUnderline(link);
      });
    });

    // ナビゲーションから離れた時の処理
    nav.addEventListener('mouseleave', () => {
      nav.style.setProperty('--underline-left', '0px');
      nav.style.setProperty('--underline-width', '0px');
    });

    // 初期状態で最初のリンクに下線を設定
    if (navLinks.length > 0) {
      updateUnderline(navLinks[0]);
    }

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener('mouseenter', () => {
          updateUnderline(link);
        });
      });
      nav.removeEventListener('mouseleave', () => {
        nav.style.setProperty('--underline-left', '0px');
        nav.style.setProperty('--underline-width', '0px');
      });
    };
  }, []);

  return null;
}
