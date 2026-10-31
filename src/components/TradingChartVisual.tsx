import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Activity, BarChart2, Zap, ArrowUpRight, ArrowDownRight, ShieldCheck, Compass } from 'lucide-react';

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  isBullish: boolean;
}

export const TradingChartVisual: React.FC = () => {
  const [activePair, setActivePair] = useState<string>('EUR/USD');
  const [activeTimeframe, setActiveTimeframe] = useState<string>('15M');
  const [currentPrice, setCurrentPrice] = useState<number>(1.08642);
  const [priceChange, setPriceChange] = useState<number>(+0.0034);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [showSmcOverlay, setShowSmcOverlay] = useState<boolean>(true);
  const [simulatedPnl, setSimulatedPnl] = useState<number>(1420.50);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pairs = [
    { symbol: 'EUR/USD', basePrice: 1.0864, decimals: 5, spread: '0.1' },
    { symbol: 'GBP/USD', basePrice: 1.2945, decimals: 5, spread: '0.2' },
    { symbol: 'XAU/USD', basePrice: 2742.8, decimals: 2, spread: '0.8' },
    { symbol: 'BTC/USD', basePrice: 68420.0, decimals: 1, spread: '1.2' },
    { symbol: 'US30', basePrice: 42180.0, decimals: 0, spread: '1.0' },
  ];

  // Base mock candles
  const [candles, setCandles] = useState<Candle[]>(() => {
    const list: Candle[] = [];
    let p = 1.0820;
    for (let i = 0; i < 30; i++) {
      const delta = (Math.sin(i * 0.4) + (Math.random() - 0.48)) * 0.0018;
      const open = p;
      const close = p + delta;
      const high = Math.max(open, close) + Math.random() * 0.0012;
      const low = Math.min(open, close) - Math.random() * 0.0012;
      list.push({
        time: `${10 + Math.floor(i / 4)}:${(i % 4) * 15}`,
        open,
        high,
        low,
        close,
        isBullish: close >= open,
      });
      p = close;
    }
    return list;
  });

  // Live ticking simulation
  useEffect(() => {
    if (!isLiveActive) return;
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.49) * 0.00015;
      setCurrentPrice((prev) => {
        const next = +(prev + delta).toFixed(5);
        return next;
      });
      setSimulatedPnl((prev) => +(prev + (delta > 0 ? 12.5 : -9.5)).toFixed(2));

      // Slightly nudge the last candle
      setCandles((prev) => {
        const copy = [...prev];
        const last = { ...copy[copy.length - 1] };
        last.close = +(last.close + delta).toFixed(5);
        if (last.close > last.high) last.high = last.close;
        if (last.close < last.low) last.low = last.close;
        last.isBullish = last.close >= last.open;
        copy[copy.length - 1] = last;
        return copy;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  // Render HTML5 Canvas Chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw background grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridRows = 6;
    for (let i = 0; i <= gridRows; i++) {
      const y = (height / gridRows) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const gridCols = 10;
    for (let i = 0; i <= gridCols; i++) {
      const x = (width / gridCols) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Min and Max prices for scale
    const prices = candles.flatMap((c) => [c.low, c.high]);
    const minP = Math.min(...prices) * 0.9995;
    const maxP = Math.max(...prices) * 1.0005;
    const range = maxP - minP || 1;

    const getY = (price: number) => height - ((price - minP) / range) * (height - 40) - 20;

    // Draw SMC Zones if enabled
    if (showSmcOverlay) {
      // 1. Fair Value Gap (cyan neon zone)
      const fvgTop = getY(candles[12]?.high || minP + range * 0.65);
      const fvgBottom = getY(candles[14]?.low || minP + range * 0.55);
      const fvgHeight = Math.abs(fvgBottom - fvgTop) || 28;
      
      ctx.fillStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.fillRect(80, Math.min(fvgTop, fvgBottom), width - 120, fvgHeight);
      ctx.strokeRect(80, Math.min(fvgTop, fvgBottom), width - 120, fvgHeight);
      ctx.setLineDash([]);

      // Label
      ctx.font = '10px monospace';
      ctx.fillStyle = '#00f0ff';
      ctx.fillText('FVG (Bullish Imbalance Zone)', 90, Math.min(fvgTop, fvgBottom) + 16);

      // 2. Institutional Order Block (OB)
      const obTop = getY(candles[6]?.high || minP + range * 0.35);
      const obBottom = getY(candles[6]?.low || minP + range * 0.25);
      const obHeight = Math.abs(obBottom - obTop) || 24;

      ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.7)';
      ctx.fillRect(40, Math.min(obTop, obBottom), width - 80, obHeight);
      ctx.strokeRect(40, Math.min(obTop, obBottom), width - 80, obHeight);
      
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('+OB (Institutional Demand Zone)', 50, Math.min(obTop, obBottom) + 15);
    }

    // Draw Candlesticks
    const candleWidth = Math.max(6, (width / candles.length) * 0.6);
    const spacing = width / candles.length;

    candles.forEach((c, i) => {
      const x = i * spacing + spacing / 2;
      const yOpen = getY(c.open);
      const yClose = getY(c.close);
      const yHigh = getY(c.high);
      const yLow = getY(c.low);

      const isBull = c.isBullish;
      ctx.strokeStyle = isBull ? '#00f0ff' : '#ef4444';
      ctx.fillStyle = isBull ? '#00f0ff' : '#ef4444';
      ctx.lineWidth = 1.5;

      // Draw wick
      ctx.beginPath();
      ctx.moveTo(x, yHigh);
      ctx.lineTo(x, yLow);
      ctx.stroke();

      // Draw candle body
      const bodyTop = Math.min(yOpen, yClose);
      const bodyHeight = Math.max(2, Math.abs(yOpen - yClose));
      
      if (isBull) {
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = 'rgba(0, 240, 255, 0.4)';
        ctx.shadowBlur = 6;
      } else {
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = 'rgba(239, 68, 68, 0.4)';
        ctx.shadowBlur = 6;
      }

      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
      ctx.shadowBlur = 0; // reset
    });

    // Draw Current Price Line
    const currentY = getY(currentPrice);
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(0, currentY);
    ctx.lineTo(width, currentY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Price badge on the right axis
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(width - 70, currentY - 11, 70, 22);
    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = '#000000';
    ctx.fillText(currentPrice.toFixed(5), width - 64, currentY + 4);

  }, [candles, currentPrice, showSmcOverlay]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/90 shadow-2xl backdrop-blur-xl">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            LIVE FEED
          </div>

          <div className="flex items-center gap-1 bg-slate-950 rounded-lg p-0.5 border border-slate-800">
            {pairs.map((p) => (
              <button
                key={p.symbol}
                onClick={() => {
                  setActivePair(p.symbol);
                  setCurrentPrice(p.basePrice);
                }}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                  activePair === p.symbol
                    ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p.symbol}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {/* Timeframe selector */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
            {['1M', '5M', '15M', '1H', '4H', '1D'].map((tf) => (
              <button
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                className={`px-1.5 py-0.5 rounded ${
                  activeTimeframe === tf ? 'bg-slate-700 text-white font-bold' : 'hover:text-slate-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* SMC Overlay Toggle */}
          <button
            onClick={() => setShowSmcOverlay(!showSmcOverlay)}
            className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
              showSmcOverlay
                ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            SMC Imbalance
          </button>
        </div>
      </div>

      {/* Main Stats Bar */}
      <div className="grid grid-cols-2 gap-2 border-b border-slate-800/80 bg-slate-900/30 px-4 py-2.5 sm:grid-cols-4 text-xs">
        <div>
          <span className="text-slate-400">Pair Price:</span>
          <div className="flex items-center gap-1.5 font-mono text-base font-bold text-white">
            {currentPrice.toFixed(5)}
            <span className="text-xs text-emerald-400 flex items-center">
              <ArrowUpRight className="h-3 w-3" /> +0.31%
            </span>
          </div>
        </div>
        <div>
          <span className="text-slate-400">Institutional Bias:</span>
          <div className="flex items-center gap-1 font-semibold text-cyan-400 text-sm">
            <Compass className="h-3.5 w-3.5" /> Bullish Order Flow
          </div>
        </div>
        <div>
          <span className="text-slate-400">Current Killzone:</span>
          <div className="font-semibold text-emerald-400 text-sm">New York Open (Overlapped)</div>
        </div>
        <div>
          <span className="text-slate-400">Simulated Student PnL:</span>
          <div className="font-mono font-bold text-emerald-400 text-sm">
            +${simulatedPnl.toLocaleString()} (+4.2R)
          </div>
        </div>
      </div>

      {/* HTML5 Canvas Chart Area */}
      <div className="relative h-64 sm:h-72 w-full bg-slate-950 p-2">
        <canvas
          ref={canvasRef}
          width={800}
          height={320}
          className="h-full w-full object-contain"
        />

        {/* Live floating badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-lg bg-slate-900/80 border border-slate-800 px-3 py-1.5 text-xs text-slate-300 backdrop-blur-md">
          <Activity className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
          <span>Asian Session Liquidity Swept • Targeting London Highs</span>
        </div>
      </div>

      {/* Bottom Terminal Action Bar */}
      <div className="flex flex-wrap items-center justify-between border-t border-slate-800/80 bg-slate-900/70 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
            Spread: <strong className="text-white">0.1 Pips</strong>
          </span>
          <span className="hidden sm:inline">Volume: <strong>14,820 Lots</strong></span>
          <span className="hidden md:inline">Latency: <strong className="text-emerald-400">4ms</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">SMC Signal:</span>
          <span className="rounded bg-emerald-500/20 text-emerald-400 px-2 py-0.5 font-mono font-bold">
            CONFIRMED BUY @ 1.08480
          </span>
        </div>
      </div>
    </div>
  );
};
