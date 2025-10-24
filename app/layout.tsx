import './globals.css';

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
          <div className="top-bar">
            <div className="container">
              <div className="language-selector">
                <span>JA</span> | <a href="#">EN</a>
              </div>
              <div className="auth-links">
                <a href="#">ログイン</a>
                <a href="#" className="btn-ticket">チケット購入</a>
              </div>
            </div>
          </div>
          <div className="main-header container">
            <h1 className="site-title">Virtual Philharmonic</h1>
            <nav className="main-nav">
              <a href="/concerts">公演</a>
              <a href="/orchestra">楽団</a>
              <a href="/education">教育プログラム</a>
              <a href="/media">メディア</a>
              <a href="/support">支援</a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container footer-content">
            <div className="footer-section">
              <h4>お問い合わせ</h4>
              <p>contact@virtual-philharmonic.jp</p>
              <p>Tel: 03-XXXX-XXXX</p>
            </div>
            <div className="footer-section">
              <h4>フォローする</h4>
              <div className="social-links">
                <a href="#">Twitter</a>
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
              </div>
            </div>
            <div className="footer-section">
              <h4>情報</h4>
              <a href="#">プレス</a>
              <a href="#">採用情報</a>
              <a href="#">アクセス</a>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <p>© {new Date().getFullYear()} Virtual Philharmonic</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
