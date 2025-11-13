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

        <footer className="py-4 text-muted">
          <div className="max-w-container mx-auto px-4 w-full overflow-x-hidden">
            <div className="flex justify-between items-center gap-4 flex-wrap max-mobile:flex-col max-mobile:text-center max-mobile:gap-4">
              <p className="text-sm">© {new Date().getFullYear()} 横浜国立大学管弦楽団</p>
              <div className="flex gap-4 items-center max-mobile:justify-center">
                <a 
                  href="https://www.instagram.com/ynuorch/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram" 
                  className="flex items-center justify-center text-muted transition-colors duration-300 ease no-underline hover:text-accent"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="max-mobile:w-6 max-mobile:h-6">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/ynuorch" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="X (Twitter)" 
                  className="flex items-center justify-center text-muted transition-colors duration-300 ease no-underline hover:text-accent"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="max-mobile:w-6 max-mobile:h-6">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
