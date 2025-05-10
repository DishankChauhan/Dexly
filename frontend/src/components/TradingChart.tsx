'use client';

import { useEffect, useRef } from 'react';
import * as LightweightCharts from 'lightweight-charts';

const TradingChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

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
    });

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    // Create candlestick series
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // Sample data - in a real app, this would come from an API
    const data = [
      { time: '2023-01-01', open: 90, high: 95, low: 85, close: 91 },
      { time: '2023-01-02', open: 91, high: 98, low: 90, close: 97 },
      { time: '2023-01-03', open: 97, high: 105, low: 95, close: 104 },
      { time: '2023-01-04', open: 104, high: 108, low: 100, close: 102 },
      { time: '2023-01-05', open: 102, high: 110, low: 100, close: 109 },
      { time: '2023-01-06', open: 109, high: 115, low: 107, close: 110 },
      { time: '2023-01-07', open: 110, high: 112, low: 105, close: 107 },
      { time: '2023-01-08', open: 107, high: 107, low: 95, close: 98 },
      { time: '2023-01-09', open: 98, high: 105, low: 96, close: 102 },
      { time: '2023-01-10', open: 102, high: 108, low: 100, close: 105 },
    ];

    candleSeries.setData(data);

    // Fit content and add margin
    chart.timeScale().fitContent();

    // Set up resize listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return <div ref={chartContainerRef} className="w-full h-full" />;
};

export default TradingChart; 