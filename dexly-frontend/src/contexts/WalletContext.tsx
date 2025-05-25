'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletContextType, User } from '@/types';
import { apiService } from '@/lib/api';
import bs58 from 'bs58';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const { publicKey, signMessage, connected, disconnect } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    if (!publicKey || !signMessage) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    try {
      // Generate nonce from backend
      const nonceResponse = await apiService.generateNonce(publicKey.toString());
      
      if (!nonceResponse.success || !nonceResponse.data) {
        throw new Error('Failed to generate nonce');
      }

      const { message } = nonceResponse.data;

      // Sign the message
      const messageBytes = new TextEncoder().encode(message);
      const signature = await signMessage(messageBytes);
      const signatureBase58 = bs58.encode(signature);

      // Verify signature with backend
      const verifyResponse = await apiService.verifySignature(
        publicKey.toString(),
        signatureBase58,
        message
      );

      if (!verifyResponse.success || !verifyResponse.data) {
        throw new Error('Failed to verify signature');
      }

      const { token, user: userData } = verifyResponse.data;

      // Store token in localStorage
      localStorage.setItem('auth_token', token);
      
      // Set user data
      setUser({
        publicKey: publicKey.toString(),
        address: publicKey.toString(),
        ...userData
      });

    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
      disconnect();
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('auth_token');
      if (token && connected && publicKey) {
        try {
          const sessionResponse = await apiService.getSession();
          if (sessionResponse.success && sessionResponse.data?.authenticated) {
            setUser({
              publicKey: publicKey.toString(),
              address: publicKey.toString(),
              ...sessionResponse.data.user
            });
          } else {
            localStorage.removeItem('auth_token');
          }
        } catch (error) {
          console.error('Session check failed:', error);
          localStorage.removeItem('auth_token');
        }
      }
    };

    checkSession();
  }, [connected, publicKey]);

  // Clear user when wallet disconnects
  useEffect(() => {
    if (!connected) {
      setUser(null);
      localStorage.removeItem('auth_token');
    }
  }, [connected]);

  const value: WalletContextType = {
    isConnected: connected && !!user,
    publicKey,
    user,
    login,
    logout,
    isLoading
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
} 