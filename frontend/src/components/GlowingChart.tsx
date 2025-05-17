'use client';

import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';

interface ChartProps {
  data: Array<{
    time: string;
    value: number;
  }>;
  width?: string | number;
  height?: string | number;
  lineColor?: string;
  areaColor?: string;
  className?: string;
}

export default function GlowingChart({
  data,
  width = '100%',
  height = '100%',
  lineColor = '#4f46e5',
  areaColor = 'rgba(79, 70, 229, 0.2)',
  className = '',
}: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;
    
    // Clean up on unmount
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    // Create chart
    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'rgba(255, 255, 255, 0.5)',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      width: container.clientWidth,
      height: container.clientHeight,
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      crosshair: {
        horzLine: {
          color: 'rgba(255, 255, 255, 0.3)',
          labelBackgroundColor: 'rgba(79, 70, 229, 0.75)',
        },
        vertLine: {
          color: 'rgba(255, 255, 255, 0.3)',
          labelBackgroundColor: 'rgba(79, 70, 229, 0.75)',
        },
      },
      handleScroll: false,
      handleScale: false,
    });

    chartRef.current = chart;

    // Create area series
    const areaSeries = chart.addAreaSeries({
      lineColor,
      topColor: areaColor,
      bottomColor: 'rgba(79, 70, 229, 0.01)',
      lineWidth: 2,
      priceFormat: {
        type: 'price',
        precision: 2,
        minMove: 0.01,
      },
    });

    // Set data
    areaSeries.setData(data);

    // Fit the chart to the data
    chart.timeScale().fitContent();

    // Responsive resize
    const handleResize = () => {
      if (chartRef.current && container) {
        chartRef.current.applyOptions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data, lineColor, areaColor]);

  return (
    <div className={`relative ${className}`}>
      <div ref={chartContainerRef} style={{ width, height }} className="chart-container" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </div>
  );
} 