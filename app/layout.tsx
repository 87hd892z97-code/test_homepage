import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './components/SearchBar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '横浜国立大学管弦楽団',
  description: '横浜国立大学管弦楽団の公式ウェブサイトです。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <header className="site-header">
          <div className="main-navigation container">
            <div className="header-left">
              <Link href="/" className="site-title">
                <Image
                  src="/ynuorch-icon.jpg"
                  alt="横浜国立大学管弦楽団"
                  width={200}
                  height={60}
                  className="site-logo"
                />
              </Link>
            </div>
            
            <nav className="main-nav">
              <Link href="/about">団紹介</Link>
              <Link href="/concerts">演奏会情報</Link>
              <Link href="/join">練習案内</Link>
              <Link href="/contact">お問い合わせ</Link>
              <SearchBar />
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} 横浜国立大学管弦楽団</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
