import './globals.css';
import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <header className="site-header">
          <div className="container header-inner">
            {/* サイトタイトルをホームへリンク */}
            <h1 className="site-title">
              <Link href="/">仮想大学オーケストラ</Link>
            </h1>
            <nav className="site-nav">
              {/* ...existing code... */}
              <Link href="/about">紹介</Link>
              <Link href="/concerts">公演</Link>
              <Link href="/members">メンバー</Link>
              <Link href="/contact">連絡</Link>
              {/* ...existing code... */}
            </nav>
          </div>
        </header>

        <main className="container site-main">{children}</main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <p>© {new Date().getFullYear()} 仮想大学オーケストラ</p>
            <p className="small">お問い合わせ: orchestra@example.edu</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
