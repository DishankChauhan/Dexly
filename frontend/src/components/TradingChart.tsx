'use client';

import { useEffect, useRef } from 'react';
import { createChart, ColorType, CrosshairMode, LineStyle } from 'lightweight-charts';
import { usePriceData } from '@/hooks/usePriceData';

interface TradingChartProps {
  marketId: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ marketId }) => {
  const { priceData, priceHistory, fundingRate } = usePriceData(marketId);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  
  useEffect(() => {
    if (chartContainerRef.current) {
      const handleResize = () => {
        if (chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current?.clientWidth || 600
          });
        }
      };
      
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: '#1E293B' },
          textColor: '#D1D5DB',
        },
        width: chartContainerRef.current.clientWidth,
        height: 500,
        grid: {
          vertLines: { color: '#334155' },
          horzLines: { color: '#334155' },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
          vertLine: {
            width: 1,
            color: '#6B7280',
            style: LineStyle.Dashed,
          },
          horzLine: {
            width: 1,
            color: '#6B7280',
            style: LineStyle.Dashed,
          },
        },
        timeScale: {
          borderColor: '#4B5563',
          timeVisible: true,
          secondsVisible: false,
        },
        rightPriceScale: {
          borderColor: '#4B5563',
        },
      });
      
      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#10B981',
        downColor: '#EF4444',
        borderDownColor: '#EF4444',
        borderUpColor: '#10B981',
        wickDownColor: '#EF4444',
        wickUpColor: '#10B981',
      });
      
      chartRef.current = chart;
      seriesRef.current = candlestickSeries;
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
        chartRef.current = null;
        seriesRef.current = null;
      };
    }
  }, []);

  // Update chart data when price history changes
  useEffect(() => {
    if (seriesRef.current && priceHistory && priceHistory.length > 0) {
      // Convert priceHistory to OHLC format
      // Since we only have close prices, we'll create a basic candle
      // where open = previous close or same as close if first
      const ohlcData = priceHistory.map((point, index) => {
        const prevPrice = index > 0 ? priceHistory[index - 1].price : point.price;
        const open = prevPrice;
        const high = Math.max(open, point.price);
        const low = Math.min(open, point.price);
        const close = point.price;
        
        return {
          time: Math.floor(point.timestamp / 1000), // Convert ms to seconds for chart
          open,
          high,
          low,
          close,
        };
      });
      
      seriesRef.current.setData(ohlcData);
      
      // Add current price as a marker
      if (priceData && priceData.price) {
        const currentTime = Math.floor(Date.now() / 1000);
        seriesRef.current.update({
          time: currentTime,
          open: priceData.price,
          high: priceData.price,
          low: priceData.price,
          close: priceData.price,
        });
      }
      
      // Make sure the most recent data is visible
      if (chartRef.current) {
        chartRef.current.timeScale().fitContent();
      }
    }
  }, [priceHistory, priceData]);
  
  return (
    <div 
      ref={chartContainerRef} 
      className="w-full h-full"
    />
  );
};

export default TradingChart; 