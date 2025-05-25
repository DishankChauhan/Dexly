-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('MARKET', 'LIMIT');

-- CreateEnum
CREATE TYPE "OrderSide" AS ENUM ('LONG', 'SHORT');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('OPEN', 'FILLED', 'PARTIALLY_FILLED', 'CANCELED', 'EXPIRED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Market" (
    "id" TEXT NOT NULL,
    "assetSymbol" TEXT NOT NULL,
    "marketAddress" TEXT NOT NULL,
    "baseAssetReserve" DECIMAL(30,9) NOT NULL,
    "quoteAssetReserve" DECIMAL(30,9) NOT NULL,
    "fundingRate" DECIMAL(30,9) NOT NULL,
    "lastFundingTs" BIGINT NOT NULL,
    "totalLongSize" DECIMAL(30,9) NOT NULL,
    "totalShortSize" DECIMAL(30,9) NOT NULL,
    "maxLeverage" INTEGER NOT NULL,
    "minMarginRatioBps" INTEGER NOT NULL,
    "feeBps" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "minPositionSize" DECIMAL(30,9) NOT NULL,
    "maxPriceImpactBps" INTEGER NOT NULL,
    "kFactor" DECIMAL(30,9) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Market_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "positionAddress" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "isLong" BOOLEAN NOT NULL,
    "size" DECIMAL(30,9) NOT NULL,
    "entryPrice" DECIMAL(30,9) NOT NULL,
    "collateral" DECIMAL(30,9) NOT NULL,
    "leverage" INTEGER NOT NULL,
    "openedAt" BIGINT NOT NULL,
    "lastFundingTs" BIGINT NOT NULL,
    "realizedPnlFromFunding" DECIMAL(30,9) NOT NULL,
    "liquidationPrice" DECIMAL(30,9) NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "closedAt" BIGINT,
    "closingPrice" DECIMAL(30,9),
    "realizedPnl" DECIMAL(30,9),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "orderType" INTEGER NOT NULL,
    "isLong" BOOLEAN NOT NULL,
    "size" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "collateral" TEXT NOT NULL,
    "leverage" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "maxSlippageBps" INTEGER NOT NULL DEFAULT 100,
    "createdAt" TEXT NOT NULL,
    "positionId" TEXT,
    "executionPrice" TEXT,
    "executedAt" TEXT,
    "cancelledAt" TEXT,
    "txHash" TEXT,
    "lastError" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "side" "OrderSide" NOT NULL,
    "size" DECIMAL(30,9) NOT NULL,
    "price" DECIMAL(30,9) NOT NULL,
    "fee" DECIMAL(30,9) NOT NULL,
    "txHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingPayment" (
    "id" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "amount" DECIMAL(30,9) NOT NULL,
    "rate" DECIMAL(30,9) NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "txHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FundingPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Liquidation" (
    "id" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "liquidator" TEXT,
    "liquidationPrice" DECIMAL(30,9) NOT NULL,
    "collateralReturned" DECIMAL(30,9) NOT NULL,
    "fee" DECIMAL(30,9) NOT NULL,
    "txHash" TEXT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "marketId" TEXT NOT NULL,

    CONSTRAINT "Liquidation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "markPrice" DECIMAL(30,9) NOT NULL,
    "indexPrice" DECIMAL(30,9) NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemHealth" (
    "id" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "metrics" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "SystemHealth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiquidationAttempt" (
    "id" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "currentPrice" TEXT NOT NULL,
    "liquidationPrice" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "LiquidationAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingSettlement" (
    "id" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "rate" TEXT NOT NULL,
    "totalAmount" TEXT NOT NULL,
    "longAmount" TEXT NOT NULL,
    "shortAmount" TEXT NOT NULL,
    "positionCount" INTEGER NOT NULL,

    CONSTRAINT "FundingSettlement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_publicKey_key" ON "User"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "Market_marketAddress_key" ON "Market"("marketAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Position_positionAddress_key" ON "Position"("positionAddress");

-- CreateIndex
CREATE INDEX "Order_userId_isActive_idx" ON "Order"("userId", "isActive");

-- CreateIndex
CREATE INDEX "Order_marketId_isActive_idx" ON "Order"("marketId", "isActive");

-- CreateIndex
CREATE INDEX "Order_positionId_idx" ON "Order"("positionId");

-- CreateIndex
CREATE UNIQUE INDEX "Liquidation_positionId_key" ON "Liquidation"("positionId");

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingPayment" ADD CONSTRAINT "FundingPayment_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingPayment" ADD CONSTRAINT "FundingPayment_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liquidation" ADD CONSTRAINT "Liquidation_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liquidation" ADD CONSTRAINT "Liquidation_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
