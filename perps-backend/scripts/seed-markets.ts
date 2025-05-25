import { PrismaClient } from '../generated/prisma/index.js';
import { Decimal } from 'decimal.js';

const prisma = new PrismaClient();

const markets = [
  {
    id: 'SOL-PERP',
    assetSymbol: 'SOL',
    marketAddress: 'sol_market_address_placeholder',
    baseAssetReserve: new Decimal(1000000),
    quoteAssetReserve: new Decimal(150000000),
    fundingRate: new Decimal(0),
    lastFundingTs: BigInt(Date.now()),
    totalLongSize: new Decimal(0),
    totalShortSize: new Decimal(0),
    maxLeverage: 20,
    minMarginRatioBps: 500, // 5%
    feeBps: 10, // 0.1%
    isActive: true,
    minPositionSize: new Decimal(1),
    maxPriceImpactBps: 1000, // 10%
    kFactor: new Decimal(1000000)
  },
  {
    id: 'BTC-PERP',
    assetSymbol: 'BTC',
    marketAddress: 'btc_market_address_placeholder',
    baseAssetReserve: new Decimal(1000),
    quoteAssetReserve: new Decimal(45000000),
    fundingRate: new Decimal(0),
    lastFundingTs: BigInt(Date.now()),
    totalLongSize: new Decimal(0),
    totalShortSize: new Decimal(0),
    maxLeverage: 20,
    minMarginRatioBps: 500, // 5%
    feeBps: 10, // 0.1%
    isActive: true,
    minPositionSize: new Decimal(0.001),
    maxPriceImpactBps: 1000, // 10%
    kFactor: new Decimal(1000000)
  },
  {
    id: 'ETH-PERP',
    assetSymbol: 'ETH',
    marketAddress: 'eth_market_address_placeholder',
    baseAssetReserve: new Decimal(10000),
    quoteAssetReserve: new Decimal(30000000),
    fundingRate: new Decimal(0),
    lastFundingTs: BigInt(Date.now()),
    totalLongSize: new Decimal(0),
    totalShortSize: new Decimal(0),
    maxLeverage: 20,
    minMarginRatioBps: 500, // 5%
    feeBps: 10, // 0.1%
    isActive: true,
    minPositionSize: new Decimal(0.01),
    maxPriceImpactBps: 1000, // 10%
    kFactor: new Decimal(1000000)
  }
];

async function seedMarkets() {
  console.log('Seeding markets...');
  
  try {
    for (const market of markets) {
      const result = await prisma.market.upsert({
        where: { id: market.id },
        update: {
          ...market,
          updatedAt: new Date()
        },
        create: market
      });
      
      console.log(`✅ Created/updated market: ${result.id} (${result.assetSymbol})`);
    }
    
    console.log('\n🎉 Market seeding completed successfully!');
    
    // Verify markets were created
    const allMarkets = await prisma.market.findMany({
      select: {
        id: true,
        assetSymbol: true,
        isActive: true
      }
    });
    
    console.log('\nCreated markets:');
    allMarkets.forEach(market => {
      console.log(`  - ${market.id} (${market.assetSymbol}) - Active: ${market.isActive}`);
    });
    
  } catch (error) {
    console.error('Error seeding markets:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding
seedMarkets().catch((error) => {
  console.error('Fatal error during seeding:', error);
  process.exit(1);
}); 