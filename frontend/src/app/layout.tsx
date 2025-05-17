import './globals.css';
import type { Metadata } from 'next';
import WalletContextProvider from '../components/WalletContextProvider';
import '@solana/wallet-adapter-react-ui/styles.css';

export const metadata: Metadata = {
  title: 'Dexly - Perpetual Futures Trading on Solana',
  description: 'Decentralized perpetual futures trading platform built on Solana',
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
      <body>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
} 