import './globals.css';
import Header from './components/Header';
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />

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
