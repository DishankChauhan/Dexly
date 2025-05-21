import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';
import { PerpsContractService } from '../blockchain/perpsContractService.js';
import { SolanaClient } from '../blockchain/solanaClient.js';
import prisma from '../../db/prisma.js';
import { Position, Market } from '../../models/perps.js';
import config from '../../config/index.js';

type Client = {
  ws: WebSocket;
  id: string;
  subscriptions: {
    markets: string[];
    positions: boolean;
    userKey?: string;
  };
};

/**
 * WebSocket service for real-time data updates
 */
export class WebSocketService {
  private wss: WebSocketServer;
  private clients: Map<string, Client> = new Map();
  private contractService: PerpsContractService;
  private solanaClient: SolanaClient;
  
  // Intervals for periodic data broadcasting
  private marketUpdateInterval: NodeJS.Timeout | null = null;
  private positionUpdateInterval: NodeJS.Timeout | null = null;
  
  /**
   * Initialize the WebSocket service
   * @param server HTTP server to attach the WebSocket server to
   */
  constructor(server: http.Server, contractService: PerpsContractService, solanaClient: SolanaClient) {
    this.wss = new WebSocketServer({ server });
    this.contractService = contractService;
    this.solanaClient = solanaClient;
    
    this.setupWebSocketServer();
    this.startDataBroadcasts();
  }
  
  /**
   * Set up WebSocket server event handlers
   */
  private setupWebSocketServer(): void {
    this.wss.on('connection', (ws: WebSocket) => {
      // Generate client ID and store the client
      const clientId = `client_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const client: Client = {
        ws,
        id: clientId,
        subscriptions: {
          markets: [],
          positions: false
        }
      };
      
      this.clients.set(clientId, client);
      console.log(`Client connected: ${clientId}`);
      
      // Send welcome message
      ws.send(JSON.stringify({
        type: 'welcome',
        clientId,
        timestamp: new Date().toISOString(),
        message: 'Connected to Perps WebSocket server'
      }));
      
      // Handle messages from the client
      ws.on('message', (message: string) => {
        try {
          const data = JSON.parse(message.toString());
          this.handleClientMessage(clientId, data);
        } catch (error) {
          console.error(`Invalid message from client ${clientId}:`, error);
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Invalid message format'
          }));
        }
      });
      
      // Handle client disconnect
      ws.on('close', () => {
        console.log(`Client disconnected: ${clientId}`);
        this.clients.delete(clientId);
      });
      
      // Handle errors
      ws.on('error', (error) => {
        console.error(`WebSocket error for client ${clientId}:`, error);
        this.clients.delete(clientId);
      });
    });
    
    console.log('WebSocket server initialized');
  }
  
  /**
   * Handle messages from the client
   */
  private handleClientMessage(clientId: string, data: any): void {
    const client = this.clients.get(clientId);
    if (!client) return;
    
    switch (data.type) {
      case 'subscribe':
        this.handleSubscription(client, data);
        break;
        
      case 'unsubscribe':
        this.handleUnsubscription(client, data);
        break;
        
      default:
        client.ws.send(JSON.stringify({
          type: 'error',
          message: 'Unknown message type'
        }));
    }
  }
  
  /**
   * Handle client subscription requests
   */
  private handleSubscription(client: Client, data: any): void {
    // Subscribe to market updates
    if (data.markets && Array.isArray(data.markets)) {
      client.subscriptions.markets = [
        ...new Set([...client.subscriptions.markets, ...data.markets])
      ];
      client.ws.send(JSON.stringify({
        type: 'subscription',
        channel: 'markets',
        markets: client.subscriptions.markets
      }));
    }
    
    // Subscribe to position updates for a specific user
    if (data.positions && data.userKey) {
      client.subscriptions.positions = true;
      client.subscriptions.userKey = data.userKey;
      client.ws.send(JSON.stringify({
        type: 'subscription',
        channel: 'positions',
        userKey: data.userKey
      }));
    }
  }
  
  /**
   * Handle client unsubscription requests
   */
  private handleUnsubscription(client: Client, data: any): void {
    // Unsubscribe from market updates
    if (data.markets && Array.isArray(data.markets)) {
      client.subscriptions.markets = client.subscriptions.markets.filter(
        market => !data.markets.includes(market)
      );
      client.ws.send(JSON.stringify({
        type: 'unsubscription',
        channel: 'markets',
        markets: client.subscriptions.markets
      }));
    }
    
    // Unsubscribe from position updates
    if (data.positions) {
      client.subscriptions.positions = false;
      client.subscriptions.userKey = undefined;
      client.ws.send(JSON.stringify({
        type: 'unsubscription',
        channel: 'positions'
      }));
    }
  }
  
  /**
   * Start periodic data broadcasts
   */
  private startDataBroadcasts(): void {
    // Broadcast market updates every 5 seconds
    this.marketUpdateInterval = setInterval(async () => {
      await this.broadcastMarketUpdates();
    }, 5000);
    
    // Broadcast position updates every 10 seconds
    this.positionUpdateInterval = setInterval(async () => {
      await this.broadcastPositionUpdates();
    }, 10000);
  }
  
  /**
   * Stop periodic data broadcasts
   */
  public stopDataBroadcasts(): void {
    if (this.marketUpdateInterval) {
      clearInterval(this.marketUpdateInterval);
      this.marketUpdateInterval = null;
    }
    
    if (this.positionUpdateInterval) {
      clearInterval(this.positionUpdateInterval);
      this.positionUpdateInterval = null;
    }
  }
  
  /**
   * Broadcast market updates to subscribed clients
   */
  private async broadcastMarketUpdates(): Promise<void> {
    try {
      // Get all available markets
      const markets = await this.contractService.getMarkets();
      
      // For each client, send updates for their subscribed markets
      for (const [clientId, client] of this.clients.entries()) {
        try {
          if (client.subscriptions.markets.length === 0) continue;
          
          // Filter markets based on client subscriptions
          const subscribedMarkets = markets.filter(market => 
            client.subscriptions.markets.includes(market.market?.toString() || '')
          );
          
          if (subscribedMarkets.length === 0) continue;
          
          // Get latest price data for each market
          const marketData = await Promise.all(subscribedMarkets.map(async (market) => {
            const marketId = market.market?.toString() || '';
            
            // Calculate mark price from vAMM
            const baseAssetReserve = market.baseAssetReserve;
            const quoteAssetReserve = market.quoteAssetReserve;
            const markPrice = (quoteAssetReserve * BigInt(1e9)) / baseAssetReserve;
            
            // Get funding rate
            const fundingRate = market.fundingRate || BigInt(0);
            
            return {
              marketId,
              markPrice: markPrice.toString(),
              fundingRate: fundingRate.toString(),
              longSize: market.totalLongSize?.toString() || '0',
              shortSize: market.totalShortSize?.toString() || '0',
              timestamp: Date.now()
            };
          }));
          
          // Send the data to the client
          client.ws.send(JSON.stringify({
            type: 'market_update',
            data: marketData
          }));
        } catch (error) {
          console.error(`Error broadcasting market updates to client ${clientId}:`, error);
        }
      }
    } catch (error) {
      console.error('Error broadcasting market updates:', error);
    }
  }
  
  /**
   * Broadcast position updates to subscribed clients
   */
  private async broadcastPositionUpdates(): Promise<void> {
    try {
      // For each client, send position updates if subscribed
      for (const [clientId, client] of this.clients.entries()) {
        try {
          if (!client.subscriptions.positions || !client.subscriptions.userKey) continue;
          
          // Get positions for the user
          const positions = await this.contractService.getUserPositions(client.subscriptions.userKey);
          
          // Send position updates
          client.ws.send(JSON.stringify({
            type: 'position_update',
            data: positions.map(position => ({
              positionId: position.id,
              marketId: position.market.toString(),
              isLong: position.isLong,
              size: position.size.toString(),
              collateral: position.collateral.toString(),
              entryPrice: position.entryPrice.toString(),
              liquidationPrice: position.liquidationPrice.toString(),
              pnl: '0', // Calculate PnL in a production environment
              fundingRate: '0', // Get funding rate in a production environment
              timestamp: Date.now()
            }))
          }));
        } catch (error) {
          console.error(`Error broadcasting position updates to client ${clientId}:`, error);
        }
      }
    } catch (error) {
      console.error('Error broadcasting position updates:', error);
    }
  }
  
  /**
   * Broadcast a specific event to all connected clients or filtered clients
   */
  public broadcastEvent(eventType: string, data: any, filter?: (client: Client) => boolean): void {
    for (const [clientId, client] of this.clients.entries()) {
      // Apply filter if provided
      if (filter && !filter(client)) continue;
      
      try {
        client.ws.send(JSON.stringify({
          type: eventType,
          data,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.error(`Error broadcasting event to client ${clientId}:`, error);
      }
    }
  }
  
  /**
   * Get the number of connected clients
   */
  public getClientCount(): number {
    return this.clients.size;
  }
} 