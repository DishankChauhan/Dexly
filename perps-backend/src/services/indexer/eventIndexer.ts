import { Connection, PublicKey, ConfirmedSignatureInfo } from '@solana/web3.js';
import { SolanaClient } from '../blockchain/solanaClient.js';
import prisma from '../../db/prisma.js';
import config from '../../config/index.js';
import BN from 'bn.js';
import bs58 from 'bs58';
import * as borsh from 'borsh';

// Event signature identifiers - these match the program's internal event emit strings
const EVENT_SIGNATURES = {
  TRADE: 'Program log: TRADE',
  LIQUIDATION: 'Program log: LIQUIDATION',
  FUNDING: 'Program log: FUNDING'
};

// Borsh schema definitions for event data
class TradeEventData {
  marketId: BN;
  trader: Uint8Array;
  positionId: BN;
  isLong: boolean;
  size: BN;
  collateral: BN;
  entryPrice: BN;
  fee: BN;

  constructor(props: any) {
    this.marketId = props.marketId;
    this.trader = props.trader;
    this.positionId = props.positionId;
    this.isLong = props.isLong;
    this.size = props.size;
    this.collateral = props.collateral;
    this.entryPrice = props.entryPrice;
    this.fee = props.fee;
  }

  static schema = new Map([
    [
      TradeEventData,
      {
        kind: 'struct',
        fields: [
          ['marketId', 'u64'],
          ['trader', [32]],
          ['positionId', 'u64'],
          ['isLong', 'bool'],
          ['size', 'u64'],
          ['collateral', 'u64'],
          ['entryPrice', 'u64'], 
          ['fee', 'u64']
        ]
      }
    ]
  ]);
}

class LiquidationEventData {
  marketId: BN;
  trader: Uint8Array;
  liquidator: Uint8Array;
  positionId: BN;
  liquidationPrice: BN;
  collateralReturned: BN;
  fee: BN;

  constructor(props: any) {
    this.marketId = props.marketId;
    this.trader = props.trader;
    this.liquidator = props.liquidator;
    this.positionId = props.positionId;
    this.liquidationPrice = props.liquidationPrice;
    this.collateralReturned = props.collateralReturned;
    this.fee = props.fee;
  }

  static schema = new Map([
    [
      LiquidationEventData,
      {
        kind: 'struct',
        fields: [
          ['marketId', 'u64'],
          ['trader', [32]],
          ['liquidator', [32]],
          ['positionId', 'u64'],
          ['liquidationPrice', 'u64'],
          ['collateralReturned', 'u64'],
          ['fee', 'u64']
        ]
      }
    ]
  ]);
}

class FundingEventData {
  marketId: BN;
  fundingRate: BN;
  markPrice: BN;
  indexPrice: BN;

  constructor(props: any) {
    this.marketId = props.marketId;
    this.fundingRate = props.fundingRate;
    this.markPrice = props.markPrice;
    this.indexPrice = props.indexPrice;
  }

  static schema = new Map([
    [
      FundingEventData,
      {
        kind: 'struct',
        fields: [
          ['marketId', 'u64'],
          ['fundingRate', 'i64'],
          ['markPrice', 'u64'],
          ['indexPrice', 'u64']
        ]
      }
    ]
  ]);
}

// Event discriminator mapping
const EVENT_DISCRIMINATORS = {
  TRADE: Buffer.from([84, 114, 97, 100, 101, 69, 118, 101]), // "TradeEve" in ASCII
  LIQUIDATION: Buffer.from([76, 105, 113, 117, 105, 100, 97, 116]), // "Liquidat" in ASCII
  FUNDING: Buffer.from([70, 117, 110, 100, 105, 110, 103, 69]) // "FundingE" in ASCII
};

interface EventData {
  txSignature: string;
  blockTime: number;
  slot: number;
  data: Record<string, string | number | boolean>;
}

// For borsh deserialization
const deserializeUnchecked = (schema: Map<any, any>, classType: any, buffer: Buffer) => {
  // borsh library doesn't have deserializeUnchecked anymore, so we implement our own
  try {
    // Using our own basic parsing since deserialize expects different parameters
    // This is a simple implementation that just creates an instance and assigns properties
    const instance = new classType({});
    
    // For each field defined in the schema, extract and assign the value
    const fields = schema.get(classType).fields;
    let offset = 0;
    
    for (const [fieldName, fieldType] of fields) {
      let value;
      
      // Handle different field types
      if (fieldType === 'u64' || fieldType === 'i64') {
        value = new BN(buffer.slice(offset, offset + 8), 'le');
        offset += 8;
      } else if (fieldType === 'bool') {
        value = buffer[offset] === 1;
        offset += 1;
      } else if (Array.isArray(fieldType) && typeof fieldType[0] === 'number') {
        // Fixed length array (e.g., pubkey [32])
        const len = fieldType[0];
        value = buffer.slice(offset, offset + len);
        offset += len;
      } else {
        // Default fallback
        console.warn(`Unsupported field type: ${fieldType}`);
        offset += 4; // Skip over unknown fields
      }
      
      instance[fieldName] = value;
    }
    
    return instance;
  } catch (e) {
    console.error('Borsh deserialization error:', e);
    return null;
  }
};

/**
 * Service for indexing on-chain events
 */
export class EventIndexer {
  private solanaClient: SolanaClient;
  private connection: Connection;
  private programId: PublicKey;
  private lastProcessedSignature: string | undefined = undefined;
  private initialSignaturesFetched = false;
  
  constructor(solanaClient: SolanaClient) {
    this.solanaClient = solanaClient;
    this.connection = solanaClient.getConnection();
    this.programId = new PublicKey(config.PROGRAM_ID);
  }
  
  /**
   * Start indexing events
   */
  async startIndexing(intervalMs: number = 10000): Promise<NodeJS.Timeout> {
    console.log('Starting event indexer...');
    
    // Set up interval to fetch and process new transactions
    const interval = setInterval(async () => {
      await this.fetchAndProcessTransactions();
    }, intervalMs);
    
    // Run immediately
    this.fetchAndProcessTransactions();
    
    return interval;
  }
  
  /**
   * Fetch and process new transactions
   */
  private async fetchAndProcessTransactions(): Promise<void> {
    try {
      // On the first run, get the most recent transactions
      let signatures: ConfirmedSignatureInfo[];
      if (!this.initialSignaturesFetched) {
        signatures = await this.connection.getSignaturesForAddress(
          this.programId,
          { limit: 50 } // Start with most recent 50 signatures on first run
        );
        
        // Mark as fetched
        this.initialSignaturesFetched = true;
        
        if (signatures.length > 0) {
          // Set last processed signature
          this.lastProcessedSignature = signatures[signatures.length - 1].signature;
          console.log(`Initialized with most recent signature: ${signatures[0].signature}`);
        }
      } else {
        // Get transactions that occurred after our last processed one
        signatures = await this.connection.getSignaturesForAddress(
          this.programId,
          { 
            until: this.lastProcessedSignature, 
            limit: 100
          }
        );
        
        if (signatures.length > 0) {
          // Update last processed signature
          this.lastProcessedSignature = signatures[signatures.length - 1].signature;
        }
      }
      
      if (signatures.length === 0) {
        return;
      }
      
      console.log(`Found ${signatures.length} new transactions to process`);
      
      // Process each transaction
      for (const signatureInfo of signatures) {
        await this.processTransaction(signatureInfo);
      }
      
      console.log(`Processed ${signatures.length} transactions`);
    } catch (error) {
      console.error('Error fetching and processing transactions:', error);
    }
  }
  
  /**
   * Process a single transaction
   */
  private async processTransaction(signatureInfo: ConfirmedSignatureInfo): Promise<void> {
    try {
      const signature = signatureInfo.signature;
      const blockTime = signatureInfo.blockTime || Math.floor(Date.now() / 1000);
      
      // Get transaction
      const tx = await this.connection.getParsedTransaction(
        signature,
        { maxSupportedTransactionVersion: 0 }
      );
      
      if (!tx || !tx.meta) {
        return;
      }
      
      // Check if this transaction involves our program
      const programInstructionIndex = tx.transaction.message.instructions.findIndex(
        (ix: any) => ix.programId?.toString() === this.programId.toString()
      );
      
      if (programInstructionIndex === -1) {
        return;
      }
      
      // Extract logs for our program
      const logs = tx.meta.logMessages || [];
      
      // Process logs to extract events
      await this.processEvents(signature, logs, blockTime);
    } catch (error) {
      console.error(`Error processing transaction ${signatureInfo.signature}:`, error);
    }
  }

  /**
   * Process logs to extract and handle events
   */
  private async processEvents(signature: string, logs: string[], blockTime: number): Promise<void> {
    try {
      // Find event data in logs
      const eventDataLogs = logs.filter(log => log.startsWith('Program data: '));
      const programLogs = logs.filter(log => log.includes(`Program ${this.programId.toString()}`));
      
      // Process each event type
      if (logs.some(log => log.includes(EVENT_SIGNATURES.TRADE))) {
        await this.processTradeEvent(signature, logs, eventDataLogs, blockTime);
      }
      
      if (logs.some(log => log.includes(EVENT_SIGNATURES.LIQUIDATION))) {
        await this.processLiquidationEvent(signature, logs, eventDataLogs, blockTime);
      }
      
      if (logs.some(log => log.includes(EVENT_SIGNATURES.FUNDING))) {
        await this.processFundingEvent(signature, logs, eventDataLogs, blockTime);
      }
    } catch (error) {
      console.error(`Error processing events for transaction ${signature}:`, error);
    }
  }
  
  /**
   * Decode event data from logs with proper Borsh decoding
   * @param eventDataLogs Logs containing base58 encoded binary event data
   * @param eventType Type of event to decode
   */
  private decodeEventData<T>(eventDataLogs: string[], eventType: keyof typeof EVENT_DISCRIMINATORS): T | null {
    try {
      // Find the correct event data log
      const eventLog = eventDataLogs.find(log => {
        const base58Data = log.replace('Program data: ', '');
        const eventData = bs58.decode(base58Data);
        const discriminator = eventData.slice(0, 8);
        return Buffer.from(discriminator).equals(EVENT_DISCRIMINATORS[eventType]);
      });
      
      if (!eventLog) {
        return null;
      }
      
      // Decode the event data
      const base58Data = eventLog.replace('Program data: ', '');
      const eventData = bs58.decode(base58Data);
      const dataBuffer = Buffer.from(eventData.slice(8)); // Skip the discriminator
      
      // Use Borsh to decode the event data based on the event type
      let decodedData: any = null;
      
      switch (eventType) {
        case 'TRADE':
          decodedData = deserializeUnchecked(
            TradeEventData.schema,
            TradeEventData,
            dataBuffer
          );
          break;
        
        case 'LIQUIDATION':
          decodedData = deserializeUnchecked(
            LiquidationEventData.schema,
            LiquidationEventData,
            dataBuffer
          );
          break;
        
        case 'FUNDING':
          decodedData = deserializeUnchecked(
            FundingEventData.schema,
            FundingEventData,
            dataBuffer
          );
          break;
      }
      
      return decodedData as T;
    } catch (error) {
      console.error(`Error decoding ${eventType} event data:`, error);
      return null;
    }
  }
  
  /**
   * Parse structured event data from logs
   * Backup method when Borsh decoding fails
   */
  private parseStructuredEventData(logs: string[], eventPrefix: string): Record<string, string> {
    const eventData: Record<string, string> = {};
    
    // Look for structured log lines like "Program log: EVENT_TYPE: key=value"
    for (const log of logs) {
      if (log.startsWith(`Program log: ${eventPrefix}:`)) {
        const dataPart = log.split(`${eventPrefix}:`)[1].trim();
        const pairs = dataPart.split(',').map(p => p.trim());
        
        for (const pair of pairs) {
          const [key, value] = pair.split('=').map(p => p.trim());
          if (key && value) {
            eventData[key] = value;
          }
        }
      }
    }
    
    return eventData;
  }
  
  /**
   * Process a trade event
   */
  private async processTradeEvent(
    signature: string,
    logs: string[],
    eventDataLogs: string[],
    blockTime: number
  ): Promise<void> {
    try {
      // Try to decode the event using Borsh
      const eventData = this.decodeEventData<TradeEventData>(eventDataLogs, 'TRADE');
      
      // If Borsh decoding fails, fall back to structured log parsing
      if (!eventData) {
        console.warn('Falling back to structured log parsing for trade event');
        await this.processTradeEventFromLogs(signature, logs, blockTime);
        return;
      }
      
      // Convert binary public key to string
      const trader = new PublicKey(eventData.trader).toString();
      
      // Generate position ID (marketId + positionId)
      const positionId = `${eventData.marketId.toString()}-${eventData.positionId.toString()}`;
      
      // Store trade event in database
      await prisma.trade.create({
        data: {
          id: `trade-${signature}`,
          orderId: `order-${signature}`,
          positionId,
          userId: trader,
          marketId: eventData.marketId.toString(),
          side: eventData.isLong ? 'LONG' : 'SHORT',
          size: eventData.size.toString(),
          price: eventData.entryPrice.toString(),
          fee: eventData.fee.toString(),
          txHash: signature,
        },
      });
      
      console.log(`Indexed trade event: ${signature} (Position: ${positionId})`);
    } catch (error) {
      console.error(`Error processing trade event for transaction ${signature}:`, error);
    }
  }
  
  /**
   * Process trade event using structured logs as fallback
   */
  private async processTradeEventFromLogs(
    signature: string,
    logs: string[],
    blockTime: number
  ): Promise<void> {
    try {
      // Extract data from structured logs
      const eventData = this.parseStructuredEventData(logs, 'TRADE');
      
      // Extract position ID, which must be present
      const positionId = eventData.positionId || '';
      if (!positionId) {
        console.warn(`Missing position ID in trade event: ${signature}`);
        return;
      }
      
      // Extract other required fields
      const marketId = eventData.marketId || '';
      const userId = eventData.userId || '';
      const side = eventData.side || 'LONG';
      const size = eventData.size || '0';
      const price = eventData.price || '0';
      const fee = eventData.fee || '0';
      
      // Store trade event in database
      await prisma.trade.create({
        data: {
          id: `trade-${signature}`,
          orderId: `order-${signature}`,
          positionId,
          userId,
          marketId,
          side: side as any,
          size,
          price,
          fee,
          txHash: signature,
        },
      });
      
      console.log(`Indexed trade event from logs: ${signature} (Position: ${positionId})`);
    } catch (error) {
      console.error(`Error processing trade event from logs for transaction ${signature}:`, error);
    }
  }
  
  /**
   * Process a liquidation event
   */
  private async processLiquidationEvent(
    signature: string,
    logs: string[],
    eventDataLogs: string[],
    blockTime: number
  ): Promise<void> {
    try {
      // Try to decode the event using Borsh
      const eventData = this.decodeEventData<LiquidationEventData>(eventDataLogs, 'LIQUIDATION');
      
      // If Borsh decoding fails, fall back to structured log parsing
      if (!eventData) {
        console.warn('Falling back to structured log parsing for liquidation event');
        await this.processLiquidationEventFromLogs(signature, logs, blockTime);
        return;
      }
      
      // Convert binary public keys to strings
      const trader = new PublicKey(eventData.trader).toString();
      const liquidator = new PublicKey(eventData.liquidator).toString();
      
      // Generate position ID
      const positionId = `${eventData.marketId.toString()}-${eventData.positionId.toString()}`;
      
      // Store liquidation event in database
      await prisma.liquidation.create({
        data: {
          id: `liquidation-${signature}`,
          positionId,
          marketId: eventData.marketId.toString(),
          liquidator,
          liquidationPrice: eventData.liquidationPrice.toString(),
          collateralReturned: eventData.collateralReturned.toString(),
          fee: eventData.fee.toString(),
          txHash: signature,
          timestamp: BigInt(blockTime),
        },
      });
      
      // Update position to closed if it exists in our database
      try {
        await prisma.position.update({
          where: { id: positionId },
          data: {
            isClosed: true,
            closedAt: BigInt(blockTime),
          },
        });
      } catch (err) {
        // Position might not exist in our database, that's ok
        console.log(`Position ${positionId} not found in database for liquidation update`);
      }
      
      console.log(`Indexed liquidation event: ${signature} (Position: ${positionId})`);
    } catch (error) {
      console.error(`Error processing liquidation event for transaction ${signature}:`, error);
    }
  }
  
  /**
   * Process liquidation event using structured logs as fallback
   */
  private async processLiquidationEventFromLogs(
    signature: string,
    logs: string[],
    blockTime: number
  ): Promise<void> {
    try {
      // Extract data from structured logs
      const eventData = this.parseStructuredEventData(logs, 'LIQUIDATION');
      
      // Extract required fields
      const positionId = eventData.positionId || '';
      if (!positionId) {
        console.warn(`Missing position ID in liquidation event: ${signature}`);
        return;
      }
      
      const marketId = eventData.marketId || '';
      const liquidator = eventData.liquidator || '';
      const liquidationPrice = eventData.price || '0';
      const collateralReturned = eventData.collateralReturned || '0';
      const fee = eventData.fee || '0';
      
      // Store liquidation event in database
      await prisma.liquidation.create({
        data: {
          id: `liquidation-${signature}`,
          positionId,
          marketId,
          liquidator,
          liquidationPrice,
          collateralReturned,
          fee,
          txHash: signature,
          timestamp: BigInt(blockTime),
        },
      });
      
      // Update position to closed if it exists in our database
      try {
        await prisma.position.update({
          where: { id: positionId },
          data: {
            isClosed: true,
            closedAt: BigInt(blockTime),
          },
        });
      } catch (err) {
        // Position might not exist in our database, that's ok
        console.log(`Position ${positionId} not found in database for liquidation update`);
      }
      
      console.log(`Indexed liquidation event from logs: ${signature} (Position: ${positionId})`);
    } catch (error) {
      console.error(`Error processing liquidation event from logs for transaction ${signature}:`, error);
    }
  }
  
  /**
   * Process a funding event
   */
  private async processFundingEvent(
    signature: string,
    logs: string[],
    eventDataLogs: string[],
    blockTime: number
  ): Promise<void> {
    try {
      // Try to decode the event using Borsh
      const eventData = this.decodeEventData<FundingEventData>(eventDataLogs, 'FUNDING');
      
      // If Borsh decoding fails, fall back to structured log parsing
      if (!eventData) {
        console.warn('Falling back to structured log parsing for funding event');
        await this.processFundingEventFromLogs(signature, logs, blockTime);
        return;
      }
      
      // Store funding event in database
      await prisma.fundingPayment.create({
        data: {
          id: `funding-${signature}-market`,
          marketId: eventData.marketId.toString(),
          positionId: '0', // This is a market-level funding event
          amount: '0',
          rate: eventData.fundingRate.toString(),
          timestamp: BigInt(blockTime),
          txHash: signature,
        },
      });
      
      // Record market price snapshot
      await prisma.priceHistory.create({
        data: {
          id: `price-${eventData.marketId.toString()}-${blockTime}`,
          marketId: eventData.marketId.toString(),
          markPrice: eventData.markPrice.toString(),
          indexPrice: eventData.indexPrice.toString(),
          timestamp: BigInt(blockTime),
        },
      });
      
      console.log(`Indexed funding event: ${signature} (Market: ${eventData.marketId.toString()}, Rate: ${eventData.fundingRate.toString()})`);
    } catch (error) {
      console.error(`Error processing funding event for transaction ${signature}:`, error);
    }
  }
  
  /**
   * Process funding event using structured logs as fallback
   */
  private async processFundingEventFromLogs(
    signature: string,
    logs: string[],
    blockTime: number
  ): Promise<void> {
    try {
      // Extract data from structured logs
      const eventData = this.parseStructuredEventData(logs, 'FUNDING');
      
      // Extract required fields
      const marketId = eventData.marketId || '';
      if (!marketId) {
        console.warn(`Missing market ID in funding event: ${signature}`);
        return;
      }
      
      const rate = eventData.rate || '0';
      const markPrice = eventData.markPrice || '0';
      const indexPrice = eventData.indexPrice || '0';
      
      // Record the funding payment
      await prisma.fundingPayment.create({
        data: {
          id: `funding-${signature}-market`,
          marketId,
          positionId: '0', // This is a market-level funding event
          amount: '0',
          rate,
          timestamp: BigInt(blockTime),
          txHash: signature,
        },
      });
      
      // Record the market price snapshot
      await prisma.priceHistory.create({
        data: {
          id: `price-${marketId}-${blockTime}`,
          marketId,
          markPrice,
          indexPrice,
          timestamp: BigInt(blockTime),
        },
      });
      
      console.log(`Indexed funding event from logs: ${signature} (Market: ${marketId}, Rate: ${rate})`);
    } catch (error) {
      console.error(`Error processing funding event from logs for transaction ${signature}:`, error);
    }
  }
} 