# 🔮 Oracle Integration

This document explains the oracle integration that replaces mock price data with real-time price feeds from external oracles.

## 📋 Overview

The oracle integration provides real-time price data for perpetual futures markets by connecting to external price feed providers. The system is designed with redundancy and fallback mechanisms to ensure reliability.

## 🏗 Architecture

### Oracle Service Stack
```
┌─────────────────────────────────────┐
│           Frontend/API              │
├─────────────────────────────────────┤
│        OracleService               │
│    (Aggregator & Caching)         │
├─────────────────────────────────────┤
│     PythOracleService             │
│   (Primary Price Provider)        │
├─────────────────────────────────────┤
│     SwitchboardService            │
│   (Secondary Price Provider)      │
├─────────────────────────────────────┤
│       Database Fallback           │
│   (Last Known Good Prices)        │
└─────────────────────────────────────┘
```

### Components

1. **OracleService**: Main aggregator service that coordinates between multiple oracle providers
2. **PythOracleService**: Primary integration with Pyth Network price feeds
3. **SwitchboardService**: Secondary integration (TODO: future implementation)
4. **Caching Layer**: In-memory price caching with TTL
5. **Database Fallback**: Historical price data for emergency fallback

## 🚀 Features

### ✅ Implemented
- **Real-time Price Feeds**: Live price data from Pyth Network
- **Multi-Market Support**: SOL, BTC, ETH perpetual futures
- **Automatic Fallback**: Database and default price fallbacks
- **Price Caching**: 30-second cache to reduce oracle calls
- **Health Monitoring**: Oracle service health checks
- **Real-time Subscriptions**: WebSocket price updates
- **Network Support**: Mainnet, Devnet, and Localnet configurations

### 🔄 In Progress
- **Switchboard Integration**: Secondary oracle provider
- **Price Confidence Scoring**: Weighted oracle aggregation
- **Circuit Breakers**: Automatic failover mechanisms

## 📊 Supported Markets

| Market Symbol | Pyth Feed | Status |
|---------------|-----------|--------|
| SOL-PERP      | SOL/USD   | ✅ Active |
| BTC-PERP      | BTC/USD   | ✅ Active |
| ETH-PERP      | ETH/USD   | ✅ Active |

## 🔧 Usage

### Basic Price Fetching
```typescript
import { OracleService } from './services/oracle/oracleService.js';

const oracleService = new OracleService(connection);

// Get single market price
const priceData = await oracleService.getMarketPrice('SOL-PERP');
console.log(`SOL Price: $${priceData.price}`);

// Get multiple market prices
const prices = await oracleService.getMultipleMarketPrices(['SOL-PERP', 'BTC-PERP']);
```

### Real-time Price Subscriptions
```typescript
// Subscribe to price updates
await oracleService.startPriceUpdates('SOL-PERP', (priceUpdate) => {
  console.log(`New SOL price: $${priceUpdate.indexPrice}`);
});

// Stop subscription
oracleService.stopPriceUpdates('SOL-PERP');
```

### Health Monitoring
```typescript
const health = await oracleService.healthCheck();
console.log('Oracle Status:', {
  overall: health.overall,
  pyth: health.pyth,
  switchboard: health.switchboard
});
```

## 🔧 Configuration

### Environment Variables
```bash
# Solana RPC URL (determines oracle network)
SOLANA_RPC_URL=https://api.devnet.solana.com

# Optional: Price update intervals
PRICE_UPDATE_INTERVAL_MS=10000
ORACLE_CACHE_TTL_MS=30000
```

### Network-Specific Feeds

#### Mainnet Price Feeds
- SOL/USD: `H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG`
- BTC/USD: `GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU`
- ETH/USD: `JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB`

#### Devnet Price Feeds
- SOL/USD: `J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix`
- BTC/USD: `HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J`
- ETH/USD: `EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw`

## 🧪 Testing

### Run Oracle Integration Test
```bash
# Build the project first
npm run build

# Run comprehensive oracle test
npm run test:oracle
```

The test will verify:
- ✅ Solana connection
- ✅ Pyth oracle connectivity
- ✅ Price fetching functionality
- ✅ Real-time subscription system
- ✅ Health monitoring
- ✅ Fallback mechanisms

### Manual Testing
```bash
# Test individual components
node --experimental-specifier-resolution=node -e "
import { OracleService } from './dist/src/services/oracle/oracleService.js';
import { SolanaClient } from './dist/src/services/blockchain/solanaClient.js';

const client = new SolanaClient();
const oracle = new OracleService(client.getConnection());

const price = await oracle.getMarketPrice('SOL-PERP');
console.log('SOL Price:', price);
"
```

## 🔄 Migration from Mock Data

### Before (Mock Prices)
```typescript
function getMockPriceForMarket(marketId: string): number {
  const mockPrices = {
    'SOL-PERP': 150,
    'BTC-PERP': 45000,
    'ETH-PERP': 3000
  };
  return mockPrices[marketId] || 100;
}
```

### After (Real Oracle Data)
```typescript
async function getRealPriceForMarket(marketId: string): Promise<number> {
  try {
    const priceData = await oracleService.getMarketPrice(marketId);
    return priceData.price; // Real price from Pyth
  } catch (error) {
    // Automatic fallback to last known good price
    return await getFallbackPrice(marketId);
  }
}
```

## 📈 Performance & Reliability

### Caching Strategy
- **Cache TTL**: 30 seconds for price data
- **Cache Keys**: `market_{symbol}` format
- **Memory Usage**: Minimal (Map-based storage)

### Fallback Hierarchy
1. **Primary**: Pyth Network real-time feeds
2. **Secondary**: Switchboard feeds (when implemented)
3. **Tertiary**: Last known database prices (< 1 hour old)
4. **Ultimate**: Reasonable default prices

### Error Handling
- **Network Issues**: Automatic retry with exponential backoff
- **Invalid Data**: Data validation and sanitization
- **Service Outages**: Graceful degradation to fallback sources

## 🚨 Monitoring & Alerts

### Health Checks
- Oracle service connectivity
- Price data freshness
- API response times
- Error rates

### Logging
```
✅ Oracle price updated: SOL-PERP $150.25 (confidence: ±$0.05)
⚠️  Oracle fallback triggered: BTC-PERP using database price
❌ Oracle service degraded: Pyth connection timeout
```

## 🔮 Future Enhancements

### Planned Features
- **Switchboard Integration**: Secondary oracle provider
- **Price Confidence Scoring**: Weighted price aggregation
- **Circuit Breakers**: Automatic pause on suspicious price movements
- **Historical Data**: Long-term price history storage
- **Performance Metrics**: Oracle response time tracking
- **Multi-Chain Support**: Ethereum, Polygon oracle feeds

### Advanced Features
- **Volatility Monitoring**: Price spike detection
- **Cross-Oracle Arbitrage**: Price discrepancy alerts
- **Custom Oracle**: Support for private price feeds
- **Governance Integration**: Community-driven oracle selection

## 📚 Resources

- [Pyth Network Documentation](https://docs.pyth.network/)
- [Switchboard Documentation](https://docs.switchboard.xyz/)
- [Solana Web3.js Guide](https://docs.solana.com/developing/clients/javascript-api)
- [Oracle Integration Best Practices](https://docs.chain.link/data-feeds/selecting-data-feeds)