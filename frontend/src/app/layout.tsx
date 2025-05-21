import './globals.css';
import type { Metadata } from 'next';
import WalletContextProvider from '../components/WalletContextProvider';
import '@solana/wallet-adapter-react-ui/styles.css';

export const metadata: Metadata = {
  title: 'Dexly - Perpetual Futures on Solana',
  description: 'Trade perpetual futures with up to 10x leverage on Solana.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/ds-digital" rel="stylesheet" />
      </head>
      <body className="space-bg">
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
        
        {/* Star background elements */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                opacity: Math.random() * 0.7 + 0.1,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
              }}
            />
          ))}
        </div>
      </body>
    </html>
  );
} 