import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format numbers for display
export function formatNumber(value: number, decimals: number = 2): string {
  if (Math.abs(value) >= 1e9) {
    return (value / 1e9).toFixed(decimals) + 'B';
  }
  if (Math.abs(value) >= 1e6) {
    return (value / 1e6).toFixed(decimals) + 'M';
  }
  if (Math.abs(value) >= 1e3) {
    return (value / 1e3).toFixed(decimals) + 'K';
  }
  return value.toFixed(decimals);
}

// Format currency
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Format percentage
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

// Format price with appropriate decimals
export function formatPrice(price: number, symbol?: string): string {
  let decimals = 2;
  
  // Adjust decimals based on price magnitude
  if (price < 0.01) decimals = 6;
  else if (price < 1) decimals = 4;
  else if (price < 100) decimals = 3;
  
  const formatted = price.toFixed(decimals);
  return symbol ? `$${formatted}` : formatted;
}

// Format PnL with color indication
export function formatPnL(value: number): { formatted: string; isPositive: boolean } {
  const isPositive = value >= 0;
  const formatted = `${isPositive ? '+' : ''}${formatCurrency(value)}`;
  return { formatted, isPositive };
}

// Format time ago
export function formatTimeAgo(timestamp: string | number): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

// Truncate wallet address
export function truncateAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

// Calculate liquidation price
export function calculateLiquidationPrice(
  entryPrice: number,
  leverage: number,
  isLong: boolean,
  maintenanceMargin: number = 0.05 // 5% maintenance margin
): number {
  const liquidationFactor = 1 - maintenanceMargin - (1 / leverage);
  
  if (isLong) {
    return entryPrice * liquidationFactor;
  } else {
    return entryPrice / liquidationFactor;
  }
}

// Calculate PnL
export function calculatePnL(
  entryPrice: number,
  currentPrice: number,
  size: number,
  isLong: boolean
): number {
  if (isLong) {
    return (currentPrice - entryPrice) * size;
  } else {
    return (entryPrice - currentPrice) * size;
  }
}

// Calculate margin ratio
export function calculateMarginRatio(
  collateral: number,
  unrealizedPnL: number,
  positionValue: number
): number {
  const totalValue = collateral + unrealizedPnL;
  return totalValue / positionValue;
}

// Validate trade inputs
export function validateTradeInputs(
  size: string,
  leverage: number,
  collateral: string,
  maxLeverage: number
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  const sizeNum = parseFloat(size);
  const collateralNum = parseFloat(collateral);
  
  if (isNaN(sizeNum) || sizeNum <= 0) {
    errors.push('Size must be a positive number');
  }
  
  if (isNaN(collateralNum) || collateralNum <= 0) {
    errors.push('Collateral must be a positive number');
  }
  
  if (leverage < 1 || leverage > maxLeverage) {
    errors.push(`Leverage must be between 1 and ${maxLeverage}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Get color for PnL
export function getPnLColor(value: number): string {
  if (value > 0) return 'text-green-500';
  if (value < 0) return 'text-red-500';
  return 'text-gray-500';
}

// Get health factor color
export function getHealthFactorColor(healthFactor: number): string {
  if (healthFactor >= 2) return 'text-green-500';
  if (healthFactor >= 1.5) return 'text-yellow-500';
  if (healthFactor >= 1.1) return 'text-orange-500';
  return 'text-red-500';
} 