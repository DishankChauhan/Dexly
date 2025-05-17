import { useState, useEffect } from 'react';
import { OrderbookData } from '@/types';
import { api } from '@/services/api';

export const useOrderbook = () => {
  const [orderbook, setOrderbook] = useState<OrderbookData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let socket: WebSocket | null = null;

    // Initial fetch
    fetchOrderbook();

    // Set up WebSocket connection
    const connectWebSocket = () => {
      // WebSocket URL - adjust based on your environment
      // Use the correct path that matches the backend WebSocket endpoint
      const wsUrl = window.location.protocol === 'https:' 
        ? `wss://${window.location.host}/api/ws/orderbook`
        : `ws://${window.location.host}/api/ws/orderbook`;
      
      socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log('Orderbook WebSocket connected');
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as OrderbookData;
          if (isMounted) {
            setOrderbook(data);
            setIsLoading(false);
          }
        } catch (err) {
          console.error('Error parsing orderbook data:', err);
        }
      };

      socket.onerror = (event) => {
        console.error('WebSocket error:', event);
        if (isMounted) {
          setError('WebSocket connection error');
          
          // If WebSocket fails, try to fetch data via REST API
          fetchOrderbook();
        }
      };

      socket.onclose = () => {
        console.log('Orderbook WebSocket closed');
        // Try to reconnect after a delay
        if (isMounted) {
          setTimeout(connectWebSocket, 3000);
        }
      };
    };

    // Try to connect via WebSocket
    connectWebSocket();

    // Cleanup function
    return () => {
      isMounted = false;
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const fetchOrderbook = async () => {
    try {
      const data = await api.getOrderbook();
      setOrderbook(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch orderbook:', err);
      setError('Failed to fetch orderbook data');
      setIsLoading(false);
    }
  };

  return {
    orderbook,
    isLoading,
    error,
    refetch: fetchOrderbook,
  };
}; 