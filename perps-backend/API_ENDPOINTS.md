# Dexly Perps API Documentation

## Overview

This document outlines the comprehensive API endpoints for the Dexly perpetual futures trading platform, including authentication, profit/loss tracking, and user statistics.

## Base URL

```
http://localhost:3000/api
```

## Authentication

### Authentication Flow

1. **Request Nonce**: Get a unique nonce for wallet signature
2. **Sign Message**: Sign the nonce with your wallet
3. **Verify Signature**: Submit the signature to get a JWT token
4. **Use Token**: Include the JWT token in the Authorization header

### Auth Endpoints

#### 🔐 Generate Nonce
```http
POST /api/auth/nonce
```

**Request Body:**
```json
{
  "publicKey": "FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "nonce": "64-character-hex-string",
    "message": "Sign this message to authenticate with Dexly: 64-character-hex-string",
    "expiresIn": 300000
  }
}
```

#### ✅ Verify Signature
```http
POST /api/auth/verify
```

**Request Body:**
```json
{
  "publicKey": "FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q",
  "signature": "base58-encoded-signature",
  "message": "Sign this message to authenticate with Dexly: 64-character-hex-string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt-token",
    "user": {
      "publicKey": "FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q",
      "address": "FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q"
    },
    "expiresIn": "7d"
  }
}
```

#### 📋 Get Session
```http
GET /api/auth/session
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "publicKey": "FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q",
      "address": "FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q",
      "id": "user_FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-15T12:00:00.000Z"
    },
    "authenticated": true
  }
}
```

---

## 💰 Profit & Loss (PnL) API

### PnL Endpoints

#### 📊 Get User PnL Summary
```http
GET /api/pnl/:address
```

**Parameters:**
- `address` (string): User's wallet address

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalPnl": 1250.75,
      "unrealizedPnl": 300.25,
      "realizedPnl": 800.50,
      "fundingPnl": 150.00,
      "totalVolume": 50000.00,
      "winRate": 65.5,
      "profitFactor": 1.8,
      "totalTrades": 42,
      "winningTrades": 28,
      "losingTrades": 14,
      "averageWin": 75.30,
      "averageLoss": -42.15,
      "largestWin": 250.00,
      "largestLoss": -120.00,
      "currentPositions": 3
    },
    "positions": [
      {
        "positionId": "pos_123",
        "marketId": "SOL-PERP",
        "marketSymbol": "SOL-PERP",
        "isLong": true,
        "size": 100,
        "entryPrice": 145.50,
        "currentPrice": 150.25,
        "unrealizedPnl": 475.00,
        "unrealizedPnlPercentage": 23.75,
        "realizedPnlFromFunding": 12.50,
        "liquidationPrice": 120.30,
        "marginRatio": 0.15,
        "leverage": 5,
        "collateral": 2000.00,
        "openedAt": 1704067200,
        "daysOpen": 15.5
      }
    ]
  }
}
```

#### 📈 Get PnL History
```http
GET /api/pnl/:address/history?timeframe=30d&granularity=daily
```

**Parameters:**
- `address` (string): User's wallet address
- `timeframe` (optional): `7d`, `30d`, `90d`, `1y` (default: `30d`)
- `granularity` (optional): `daily` (default: `daily`)

**Response:**
```json
{
  "success": true,
  "data": {
    "timeframe": "30d",
    "granularity": "daily",
    "history": [
      {
        "date": "2024-01-01",
        "dailyPnl": 45.25,
        "cumulativePnl": 45.25,
        "volume": 5000.00,
        "trades": 3,
        "realizedPnl": 40.00,
        "unrealizedPnl": 0,
        "fundingPnl": 5.25
      }
    ]
  }
}
```

#### 🎯 Get Position PnL
```http
GET /api/pnl/position/:positionId
```

**Parameters:**
- `positionId` (string): Position ID

**Response:**
```json
{
  "success": true,
  "data": {
    "positionId": "pos_123",
    "marketId": "SOL-PERP",
    "marketSymbol": "SOL-PERP",
    "isLong": true,
    "size": 100,
    "entryPrice": 145.50,
    "currentPrice": 150.25,
    "unrealizedPnl": 475.00,
    "unrealizedPnlPercentage": 23.75,
    "liquidationPrice": 120.30,
    "collateral": 2000.00,
    "leverage": 5,
    "openedAt": 1704067200,
    "fundingPnl": 12.50,
    "trades": [
      {
        "id": "trade_456",
        "side": "LONG",
        "size": 100,
        "price": 145.50,
        "fee": 5.82,
        "timestamp": 1704067200000,
        "txHash": "signature123"
      }
    ]
  }
}
```

---

## 📊 User Statistics API

### Stats Endpoints

#### 🏦 Get Portfolio Overview
```http
GET /api/stats/portfolio/:address
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalPortfolioValue": 12500.75,
    "totalPnl": 1250.75,
    "totalPnlPercentage": 11.1,
    "collateralInUse": 8000.00,
    "availableBalance": 4500.75,
    "totalMarginUsed": 8000.00,
    "marginUtilization": 64.0,
    "openPositions": 3,
    "positionsAtRisk": 0,
    "averageLeverage": 4.2,
    "estimatedLiquidationValue": 0
  }
}
```

#### 📈 Get Trading Statistics
```http
GET /api/stats/trading/:address?timeframe=30d
```

**Parameters:**
- `timeframe` (optional): `7d`, `30d`, `90d`, `1y` (default: `30d`)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTrades": 42,
    "totalVolume": 125000.50,
    "averageTradeSize": 2976.20,
    "winRate": 65.5,
    "profitFactor": 1.8,
    "sharpeRatio": 1.45,
    "maxDrawdown": 8.5,
    "winningStreaks": 7,
    "losingStreaks": 3,
    "averageHoldTime": 24.5,
    "tradingFrequency": 1.4,
    "bestTrade": 450.75,
    "worstTrade": -180.25,
    "totalFees": 125.50,
    "marketsTraded": ["SOL-PERP", "BTC-PERP", "ETH-PERP"]
  }
}
```

#### 🎯 Get Performance Metrics
```http
GET /api/stats/performance/:address
```

**Response:**
```json
{
  "success": true,
  "data": {
    "daily": {
      "returns": [0.02, -0.01, 0.03, 0.00, 0.01],
      "volatility": 0.015,
      "sharpeRatio": 1.33
    },
    "weekly": {
      "returns": [0.05, 0.02, -0.01, 0.04],
      "volatility": 0.025,
      "sharpeRatio": 1.20
    },
    "monthly": {
      "returns": [0.08, 0.12, -0.03],
      "volatility": 0.075,
      "sharpeRatio": 1.10
    },
    "totalReturn": 1250.75,
    "totalReturnPercentage": 11.1,
    "benchmarkComparison": 6.1
  }
}
```

#### 🏆 Get Leaderboard
```http
GET /api/stats/leaderboard?timeframe=30d&metric=totalPnl&limit=50
```

**Parameters:**
- `timeframe` (optional): `7d`, `30d`, `90d`, `1y` (default: `30d`)
- `metric` (optional): `totalPnl`, `totalPnlPercentage`, `totalVolume`, `winRate`, `profitFactor` (default: `totalPnl`)
- `limit` (optional): Number of results (default: `50`)

**Response:**
```json
{
  "success": true,
  "data": {
    "timeframe": "30d",
    "metric": "totalPnl",
    "leaderboard": [
      {
        "userId": "user_123",
        "publicKey": "FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q",
        "totalPnl": 5250.75,
        "totalPnlPercentage": 25.3,
        "totalVolume": 250000.00,
        "winRate": 78.5,
        "profitFactor": 2.4,
        "totalTrades": 89,
        "rank": 1
      }
    ],
    "totalTraders": 156
  }
}
```

---

## 🚀 Testing the APIs

### Test the APIs
```bash
# Test all new endpoints
npm run test:apis

# Start the server first
npm run dev

# Then in another terminal
npm run test:apis
```

### Using cURL

```bash
# Test portfolio overview
curl "http://localhost:3000/api/stats/portfolio/DemoUserPublicKey123"

# Test PnL summary
curl "http://localhost:3000/api/pnl/DemoUserPublicKey123"

# Test leaderboard
curl "http://localhost:3000/api/stats/leaderboard?limit=10"
```

### Using the Frontend

These APIs are designed to integrate seamlessly with the Next.js frontend:

```typescript
// Example React hook for PnL data
const { data: pnlData } = useSWR(
  address ? `/api/pnl/${address}` : null,
  fetcher
);

// Example usage in portfolio page
const { data: portfolioData } = useSWR(
  address ? `/api/stats/portfolio/${address}` : null,
  fetcher
);
```

---

## 🔧 Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "error": "Error description",
  "message": "Detailed error message"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (invalid token)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

---

## 🔒 Security Notes

1. **Authentication**: JWT tokens expire after 7 days
2. **Rate Limiting**: Consider implementing rate limiting in production
3. **CORS**: Configure CORS for your frontend domain
4. **Environment Variables**: Store JWT secrets securely
5. **Input Validation**: All inputs are validated and sanitized

---

## 📝 Implementation Status

✅ **Complete:**
- PnL Controller (Real-time PnL, History, Position-level)
- Stats Controller (Portfolio, Trading Stats, Performance, Leaderboard)
- Routes and API integration
- Test infrastructure

⚠️ **Partial:**
- Auth Controller (needs JWT signature issue resolution)

🔄 **Next Steps:**
1. Fix JWT signature verification in AuthController
2. Add authentication middleware to protected routes
3. Implement rate limiting
4. Add input validation middleware
5. Set up monitoring and logging 