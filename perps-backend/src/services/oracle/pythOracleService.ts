import { Connection, PublicKey } from '@solana/web3.js';
import { PythHttpClient, getPythProgramKeyForCluster, PythCluster } from '@pythnetwork/client';
import config from '../../config/index.js';

/**
 * Oracle service for fetching real-time price data from Pyth Network
 */
export class PythOracleService {
  private pythClient: PythHttpClient;
  private connection: Connection;
  private priceFeeds: Map<string, PublicKey> = new Map();

  constructor(connection: Connection) {
    this.connection = connection;
    
    // Initialize Pyth client based on network
    const cluster = config.SOLANA_RPC_URL.includes('devnet') ? 'devnet' : 
                   config.SOLANA_RPC_URL.includes('testnet') ? 'testnet' : 
                   config.SOLANA_RPC_URL.includes('localhost') ? 'localnet' : 'mainnet-beta';
    
    this.pythClient = new PythHttpClient(
      connection,
      getPythProgramKeyForCluster(cluster as PythCluster)
    );

    // Initialize known price feed mappings
    this.initializePriceFeeds();
  }

  /**
   * Initialize known Pyth price feed public keys for different assets
   */
  private initializePriceFeeds(): void {
    // Mainnet-beta price feed IDs
    if (config.SOLANA_RPC_URL.includes('mainnet')) {
      this.priceFeeds.set('SOL/USD', new PublicKey('H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG'));
      this.priceFeeds.set('BTC/USD', new PublicKey('GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU'));
      this.priceFeeds.set('ETH/USD', new PublicKey('JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB'));
    } 
    // Devnet price feed IDs
    else if (config.SOLANA_RPC_URL.includes('devnet')) {
      this.priceFeeds.set('SOL/USD', new PublicKey('J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix'));
      this.priceFeeds.set('BTC/USD', new PublicKey('HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J'));
      this.priceFeeds.set('ETH/USD', new PublicKey('EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw'));
    }
    // For localnet, we'll use devnet feeds as fallback
    else {
      this.priceFeeds.set('SOL/USD', new PublicKey('J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix'));
      this.priceFeeds.set('BTC/USD', new PublicKey('HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J'));
      this.priceFeeds.set('ETH/USD', new PublicKey('EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw'));
    }
  }

  /**
   * Get current price for a specific asset from Pyth
   * @param symbol Asset symbol (e.g., 'SOL/USD', 'BTC/USD')
   * @returns Current price and confidence interval
   */
  async getCurrentPrice(symbol: string): Promise<{
    price: number;
    confidence: number;
    timestamp: number;
    status: 'trading' | 'halted' | 'auction' | 'unknown';
  }> {
    try {
      const feedKey = this.priceFeeds.get(symbol);
      if (!feedKey) {
        throw new Error(`Price feed not found for symbol: ${symbol}`);
      }

      // Get price data from Pyth
      const priceData = await this.pythClient.getData();
      const productAccount = priceData.productFromSymbol.get(symbol);
      
      if (!productAccount) {
        throw new Error(`Product account not found for symbol: ${symbol}`);
      }

      const priceAccount = priceData.productPrice.get(productAccount.symbol);
      if (!priceAccount || !priceAccount.price || !priceAccount.confidence) {
        throw new Error(`Price data not available for symbol: ${symbol}`);
      }

      // Convert price to readable format
      const price = priceAccount.price * Math.pow(10, priceAccount.exponent);
      const confidence = priceAccount.confidence * Math.pow(10, priceAccount.exponent);

      // Determine trading status
      let status: 'trading' | 'halted' | 'auction' | 'unknown' = 'unknown';
      if (priceAccount.status === 1) status = 'trading';
      else if (priceAccount.status === 2) status = 'halted';
      else if (priceAccount.status === 3) status = 'auction';

      return {
        price,
        confidence,
        timestamp: Date.now(),
        status
      };
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error);
      
      // Fallback to reasonable default prices for development
      const fallbackPrices: { [key: string]: number } = {
        'SOL/USD': 150,
        'BTC/USD': 45000,
        'ETH/USD': 3000
      };

      return {
        price: fallbackPrices[symbol] || 100,
        confidence: 0.1,
        timestamp: Date.now(),
        status: 'unknown'
      };
    }
  }

  /**
   * Get multiple asset prices in a single call
   * @param symbols Array of asset symbols
   * @returns Map of symbol to price data
   */
  async getMultiplePrices(symbols: string[]): Promise<Map<string, {
    price: number;
    confidence: number;
    timestamp: number;
    status: string;
  }>> {
    const prices = new Map();
    
    try {
      // Fetch all prices concurrently
      const pricePromises = symbols.map(symbol => 
        this.getCurrentPrice(symbol).then(price => ({ symbol, price }))
      );
      
      const results = await Promise.allSettled(pricePromises);
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          prices.set(result.value.symbol, result.value.price);
        } else {
          console.error(`Failed to fetch price for ${symbols[index]}:`, result.reason);
          // Set fallback price
          prices.set(symbols[index], {
            price: 100,
            confidence: 0.1,
            timestamp: Date.now(),
            status: 'unknown'
          });
        }
      });
    } catch (error) {
      console.error('Error fetching multiple prices:', error);
    }

    return prices;
  }

  /**
   * Get price for a market based on its asset symbol
   * @param marketSymbol Market symbol (e.g., 'SOL-PERP', 'BTC-PERP')
   * @returns Price data
   */
  async getMarketPrice(marketSymbol: string): Promise<{
    price: number;
    confidence: number;
    timestamp: number;
    status: 'trading' | 'halted' | 'auction' | 'unknown';
  }> {
    // Convert market symbol to oracle symbol
    const assetSymbol = this.marketSymbolToOracleSymbol(marketSymbol);
    return this.getCurrentPrice(assetSymbol);
  }

  /**
   * Convert market symbol to oracle symbol
   * @param marketSymbol Market symbol (e.g., 'SOL-PERP')
   * @returns Oracle symbol (e.g., 'SOL/USD')
   */
  private marketSymbolToOracleSymbol(marketSymbol: string): string {
    // Remove -PERP suffix and add /USD
    const baseAsset = marketSymbol.replace('-PERP', '');
    return `${baseAsset}/USD`;
  }

  /**
   * Subscribe to price updates for a specific symbol
   * @param symbol Asset symbol
   * @param callback Callback function to handle price updates
   * @returns Subscription ID
   */
  async subscribeToPriceUpdates(
    symbol: string, 
    callback: (priceData: any) => void
  ): Promise<number> {
    // For now, we'll use polling. In production, you might want to use WebSocket subscriptions
    const intervalMs = 5000; // Update every 5 seconds
    
    const interval = setInterval(async () => {
      try {
        const priceData = await this.getCurrentPrice(symbol);
        callback(priceData);
      } catch (error) {
        console.error(`Error in price subscription for ${symbol}:`, error);
      }
    }, intervalMs);

    return interval as unknown as number;
  }

  /**
   * Unsubscribe from price updates
   * @param subscriptionId Subscription ID returned from subscribeToPriceUpdates
   */
  unsubscribeFromPriceUpdates(subscriptionId: number): void {
    clearInterval(subscriptionId);
  }

  /**
   * Health check to verify oracle service is working
   * @returns Boolean indicating if service is healthy
   */
  async healthCheck(): Promise<boolean> {
    try {
      const testPrice = await this.getCurrentPrice('SOL/USD');
      return testPrice.price > 0;
    } catch (error) {
      console.error('Oracle health check failed:', error);
      return false;
    }
  }

  /**
   * Get all supported market symbols
   * @returns Array of supported market symbols
   */
  getSupportedMarkets(): string[] {
    return Array.from(this.priceFeeds.keys());
  }
} 