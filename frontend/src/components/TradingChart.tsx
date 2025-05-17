'use client';

import { useEffect, useRef, useState } from 'react';
import * as LightweightCharts from 'lightweight-charts';
import { usePriceData } from '@/hooks/usePriceData';

// Use the correct type from lightweight-charts
type Time = LightweightCharts.Time;

interface ChartData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}

const TradingChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<LightweightCharts.IChartApi | null>(null);
  const seriesRef = useRef<LightweightCharts.ISeriesApi<"Candlestick"> | null>(null);
  const priceLineRef = useRef<any>(null); // Store reference to the price line
  const { priceData } = usePriceData();
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1h' | '4h' | '1d'>('1h');
  
  // In a real app, this would come from an API based on the selected timeframe
  // For now, we'll generate some sample data
  const generateSampleData = (): ChartData[] => {
    const basePrice = priceData?.price || 100;
    const now = new Date();
    const data: ChartData[] = [];
    
    // Generate data points for the last 30 periods based on the selected timeframe
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      
      // Adjust date based on timeframe
      switch (timeframe) {
        case '1m': date.setMinutes(date.getMinutes() - i); break;
        case '5m': date.setMinutes(date.getMinutes() - i * 5); break;
        case '15m': date.setMinutes(date.getMinutes() - i * 15); break;
        case '1h': date.setHours(date.getHours() - i); break;
        case '4h': date.setHours(date.getHours() - i * 4); break;
        case '1d': date.setDate(date.getDate() - i); break;
      }
      
      // Generate random price movements around the base price
      const volatility = 0.02; // 2% volatility
      const change = (Math.random() - 0.5) * volatility * basePrice;
      const open = basePrice + change * (i / 15);
      const close = open + (Math.random() - 0.5) * volatility * basePrice;
      const high = Math.max(open, close) + Math.random() * volatility * basePrice * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * basePrice * 0.5;
      
      // Format time according to lightweight-charts requirements
      let timeValue: Time;
      if (timeframe === '1d') {
        // Use YYYY-MM-DD format for daily bars
        timeValue = date.toISOString().split('T')[0] as Time;
      } else {
        // Use timestamp for intraday bars to ensure uniqueness
        // Convert to seconds for lightweight-charts
        timeValue = Math.floor(date.getTime() / 1000) as Time;
      }
      
      data.push({
        time: timeValue,
        open,
        high,
        low,
        close,
      });
    }
    
    return data;
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = LightweightCharts.createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1E1E30' },
        textColor: '#DDD',
      },
      grid: {
        vertLines: { color: '#2B2B43' },
        horzLines: { color: '#2B2B43' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 450,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });
    
    chartRef.current = chart;

    // Create candlestick series
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });
    
    seriesRef.current = candleSeries;

    // Generate and set data
    const data = generateSampleData();
    candleSeries.setData(data);

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });
    
    // Set scale margins for volume series
    chart.priceScale('').applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
    
    // Generate volume data
    const volumeData = data.map(item => ({
      time: item.time,
      value: Math.random() * 100 + 50,
      color: item.open <= item.close ? '#26a69a' : '#ef5350',
    }));
    
    volumeSeries.setData(volumeData);

    // Add a price line for the current price
    if (priceData) {
      const priceLine = candleSeries.createPriceLine({
        price: priceData.price,
        color: '#2962FF',
        lineWidth: 2,
        lineStyle: LightweightCharts.LineStyle.Dashed,
        axisLabelVisible: true,
        title: 'Current Price',
      });
      priceLineRef.current = priceLine;
    }

    // Fit content and add margin
    chart.timeScale().fitContent();

    // Set up resize listener
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);
  
  // Update price line when price changes
  useEffect(() => {
    if (!seriesRef.current || !priceData) return;
    
    try {
      // If we have an existing price line, remove it
      if (priceLineRef.current) {
        seriesRef.current.removePriceLine(priceLineRef.current);
      }
      
      // Create a new price line
      const priceLine = seriesRef.current.createPriceLine({
        price: priceData.price,
        color: '#2962FF',
        lineWidth: 2,
        lineStyle: LightweightCharts.LineStyle.Dashed,
        axisLabelVisible: true,
        title: 'Current Price',
      });
      
      // Update the reference
      priceLineRef.current = priceLine;
    } catch (err) {
      console.error('Error updating price line:', err);
    }
  }, [priceData]);
  
  // Update chart data when timeframe changes
  useEffect(() => {
    if (!seriesRef.current) return;
    
    const data = generateSampleData();
    seriesRef.current.setData(data);
    
    if (chartRef.current) {
      chartRef.current.timeScale().fitContent();
    }
  }, [timeframe]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">SOL/USD</h2>
        
        <div className="flex space-x-1">
          {(['1m', '5m', '15m', '1h', '4h', '1d'] as const).map((tf) => (
            <button
              key={tf}
              className={`px-2 py-1 text-xs rounded ${
                timeframe === tf
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div ref={chartContainerRef} className="flex-1" />
    </div>
  );
};

export default TradingChart; 