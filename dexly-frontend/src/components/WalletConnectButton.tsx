'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWalletContext } from '@/contexts/WalletContext';
import { truncateAddress } from '@/lib/utils';

export function WalletConnectButton() {
  const { connected } = useWallet();
  const { isConnected, user, login, logout, isLoading } = useWalletContext();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuthenticate = async () => {
    if (!connected) return;
    
    setIsAuthenticating(true);
    try {
      await login();
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (!connected) {
    return <WalletMultiButton />;
  }

  if (connected && !isConnected) {
    return (
      <button
        onClick={handleAuthenticate}
        disabled={isAuthenticating || isLoading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition-colors"
      >
        {isAuthenticating || isLoading ? 'Authenticating...' : 'Sign In'}
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="text-sm text-gray-300">
        {user?.address && truncateAddress(user.address)}
      </div>
      <button
        onClick={handleLogout}
        className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm transition-colors"
      >
        Disconnect
      </button>
    </div>
  );
} 