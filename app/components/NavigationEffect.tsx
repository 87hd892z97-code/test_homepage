'use client';

import { useEffect } from 'react';

export default function NavigationEffect() {
  useEffect(() => {
    const nav = document.querySelector('.main-nav') as HTMLElement;
    const navLinks = document.querySelectorAll('.main-nav a:not(.search-container a)') as NodeListOf<HTMLElement>;
    
    if (!nav || navLinks.length === 0) return;

    let lastHoveredLink: HTMLElement | null = null;

    // 下線の位置を設定（requestAnimationFrameで滑らかに）
    const updateUnderline = (targetLink: HTMLElement | null) => {
      requestAnimationFrame(() => {
        if (!targetLink) {
          nav.style.setProperty('--underline-opacity', '0');
          return;
        }
        
        const navRect = nav.getBoundingClientRect();
        const linkRect = targetLink.getBoundingClientRect();
        
        const left = linkRect.left - navRect.left;
        const width = linkRect.width;
        
        nav.style.setProperty('--underline-left', `${left}px`);
        nav.style.setProperty('--underline-width', `${width}px`);
        nav.style.setProperty('--underline-opacity', '1');
      });
    };

    // ホバーイベントを追加
    navLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        lastHoveredLink = link;
        updateUnderline(link);
      });
    });

    // ナビゲーションから離れた時の処理
    nav.addEventListener('mouseleave', () => {
      requestAnimationFrame(() => {
        // 下線を必ず右から左に縮退させる
        nav.style.transition = '--underline-width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        nav.style.setProperty('--underline-width', '0px');
      });
    });

    // ナビゲーションに戻った時の処理
    nav.addEventListener('mouseenter', () => {
      requestAnimationFrame(() => {
        nav.style.transition = '--underline-width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), --underline-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        // 最後にホバーしていた項目が存在する場合は、そこから下線を伸ばす
        if (lastHoveredLink) {
          updateUnderline(lastHoveredLink);
        }
      });
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener('mouseenter', () => {
          updateUnderline(link);
        });
      });
      nav.removeEventListener('mouseleave', () => {
        nav.style.setProperty('--underline-width', '0px');
      });
      nav.removeEventListener('mouseenter', () => {
        if (lastHoveredLink) {
          updateUnderline(lastHoveredLink);
        }
      });
    };
  }, []);

  return null;
}
