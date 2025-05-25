# Dexly Frontend - Solana Perpetual Futures Trading Platform

A modern, responsive frontend for trading perpetual futures on Solana, built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Trading Features
- **Real-time Trading Interface** - Trade SOL, BTC, ETH perpetual futures with up to 20x leverage
- **Advanced Price Charts** - Interactive charts with multiple timeframes and technical indicators
- **Position Management** - View, manage, and close positions with real-time PnL tracking
- **Order Types** - Market and limit orders with trade simulation
- **Funding Rate Display** - Live funding rates with countdown timers

### Wallet Integration
- **Multi-Wallet Support** - Phantom, Solflare, Torus wallet integration
- **Signature-based Authentication** - Secure wallet-based login without passwords
- **Session Management** - Persistent authentication with JWT tokens

### Portfolio & Analytics
- **Portfolio Overview** - Real-time portfolio value, PnL, and margin utilization
- **PnL History** - Historical profit/loss charts with multiple timeframes
- **Trading Statistics** - Win rate, profit factor, Sharpe ratio, and more
- **Leaderboard** - Top traders by PnL, volume, and win rate

### User Experience
- **Responsive Design** - Mobile-first design that works on all devices
- **Dark Theme** - Professional dark theme optimized for trading
- **Real-time Updates** - Live price feeds and position updates
- **Loading States** - Smooth loading indicators and error handling

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Wallet**: Solana Wallet Adapter
- **State Management**: React Hooks + Context API
- **HTTP Client**: Fetch API with custom service layer

## 📁 Project Structure

```
dexly-frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Main trading dashboard
│   │   ├── portfolio/         # Portfolio analytics page
│   │   ├── leaderboard/       # Trader leaderboard
│   │   └── layout.tsx         # Root layout with providers
│   ├── components/            # Reusable UI components
│   │   ├── WalletConnectButton.tsx
│   │   ├── MarketSelector.tsx
│   │   ├── PriceChart.tsx
│   │   ├── TradePanel.tsx
│   │   ├── PositionsTable.tsx
│   │   ├── PortfolioOverview.tsx
│   │   ├── FundingRateBar.tsx
│   │   ├── PnLChart.tsx
│   │   ├── TradingStats.tsx
│   │   ├── Navigation.tsx
│   │   └── Providers.tsx
│   ├── contexts/              # React contexts
│   │   └── WalletContext.tsx  # Wallet state management
│   ├── lib/                   # Utility libraries
│   │   ├── api.ts            # Backend API service
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript type definitions
│       └── index.ts          # All type definitions
├── public/                    # Static assets
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── package.json              # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Running Dexly backend server

### Installation

1. **Clone and install dependencies**
```bash
cd dexly-frontend
npm install
```

2. **Configure environment variables**
```bash
# Create .env.local file
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3001`

### Build for Production
```bash
npm run build
npm start
```

## 🔌 Backend Integration

The frontend connects to the Dexly backend API for:

### Authentication Flow
1. User connects Solana wallet (Phantom/Solflare)
2. Frontend requests nonce from `/api/auth/nonce`
3. User signs message with wallet
4. Frontend verifies signature at `/api/auth/verify`
5. Backend returns JWT token for authenticated requests

### API Endpoints Used
- **Markets**: `GET /api/markets` - Fetch available trading pairs
- **Positions**: `GET /api/positions/user/:address` - User's open positions
- **Trading**: `POST /api/positions/open` - Open new position
- **PnL**: `GET /api/pnl/:address` - Real-time profit/loss data
- **Portfolio**: `GET /api/stats/portfolio/:address` - Portfolio overview
- **Leaderboard**: `GET /api/stats/leaderboard` - Top traders

## 🎨 UI Components

### Core Trading Components

#### TradePanel
- Long/Short position selection
- Leverage slider (1x to 20x)
- Market/Limit order types
- Real-time trade simulation
- Collateral and size inputs

#### PriceChart
- Interactive price charts
- Multiple timeframes (1M, 5M, 15M, 1H, 4H, 1D)
- Real-time price updates
- Volume indicators

#### PositionsTable
- Open positions overview
- Real-time PnL updates
- Liquidation price warnings
- One-click position closing

#### PortfolioOverview
- Total portfolio value
- Available balance
- Margin utilization
- Risk metrics

### Navigation & Layout

#### Navigation
- Responsive navigation bar
- Active page highlighting
- Mobile-friendly design
- Integrated wallet connection

#### WalletConnectButton
- Multi-wallet support
- Connection status display
- Authentication flow
- Disconnect functionality

## 📱 Responsive Design

The frontend is built mobile-first with responsive breakpoints:

- **Mobile**: < 768px - Stacked layout, touch-friendly controls
- **Tablet**: 768px - 1024px - Optimized for tablet trading
- **Desktop**: > 1024px - Full trading interface with sidebars

## 🔒 Security Features

- **Wallet-based Authentication** - No passwords, only cryptographic signatures
- **JWT Token Management** - Secure session handling with automatic refresh
- **Input Validation** - Client-side validation for all trading inputs
- **Error Boundaries** - Graceful error handling and recovery

## 🎯 Trading Flow

### Opening a Position
1. Select market (SOL-PERP, BTC-PERP, ETH-PERP)
2. Choose direction (Long/Short)
3. Set size and leverage
4. Review trade simulation
5. Confirm and sign transaction

### Managing Positions
1. View open positions in real-time
2. Monitor PnL and liquidation prices
3. Close positions with one click
4. Track funding payments

### Portfolio Analysis
1. View portfolio overview
2. Analyze PnL history
3. Review trading statistics
4. Compare with leaderboard

## 🚀 Performance Optimizations

- **Code Splitting** - Automatic route-based code splitting
- **Image Optimization** - Next.js automatic image optimization
- **Bundle Analysis** - Webpack bundle optimization
- **Caching** - API response caching and state management
- **Lazy Loading** - Component lazy loading for better performance

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build and test
npm run build
```

## 🔧 Configuration

### Tailwind CSS
Custom configuration for trading interface:
- Dark theme colors
- Trading-specific utilities
- Responsive breakpoints
- Custom animations

### Next.js
- App Router configuration
- Webpack optimizations for Solana libraries
- Environment variable handling
- Build optimizations

## 📈 Future Enhancements

- **Advanced Charts** - TradingView integration
- **Order Book** - Real-time order book display
- **Advanced Orders** - Stop-loss, take-profit orders
- **Social Trading** - Copy trading functionality
- **Mobile App** - React Native mobile application
- **WebSocket Integration** - Real-time price feeds
- **Advanced Analytics** - More detailed trading metrics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API integration guide

---

**Built with ❤️ for the Solana ecosystem**
