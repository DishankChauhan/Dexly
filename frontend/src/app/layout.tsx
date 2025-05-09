import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WalletContextProvider from "../components/WalletContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dexly - Perpetual Futures Trading on Solana",
  description: "Trade perpetual futures on Solana with leverage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
} 