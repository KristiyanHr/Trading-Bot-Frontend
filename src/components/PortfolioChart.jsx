import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PortfolioChart = ({ trades, initialBalance = 10000 }) => {
  // --- NEW, CORRECTED CHART DATA LOGIC ---
  const generateChartData = () => {
    if (!trades || trades.length === 0) {
      // Start with a single point at 0 P/L
      return [{ name: 'Start', pnl: 0 }];
    }

    let cumulativePnl = 0;

    const sellTrades = trades.filter(t => t.tradeType === 'SELL' && t.pnl != null);
    sellTrades.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    if (sellTrades.length === 0) {
      return [{ name: 'Start', pnl: 0 }];
    }

    const dataPoints = [{ name: 'Start', pnl: 0 }];

    sellTrades.forEach(trade => {
      // PnL comes directly from our backend for each sell trade
      cumulativePnl += trade.pnl;
      dataPoints.push({
        // Format the date to be more readable on the chart
        name: new Date(trade.timestamp).toLocaleString(), 
        pnl: parseFloat(cumulativePnl.toFixed(2)),
      });
    });

    console.log("Chart Data:", dataPoints); 
    return dataPoints;
  };

  const chartData = generateChartData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        key={chartData.length} 
      >
        <defs>
          <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#4a4a5e" vertical={false} />
        <XAxis dataKey="name" stroke="#a0a0b0" />
        <YAxis 
          stroke="#a0a0b0" 
          domain={['dataMin - 20', 'dataMax + 20']}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #4a4a5e', borderRadius: '8px' }}
          labelStyle={{ color: '#8884d8' }}
          formatter={(value) => [`$${value.toFixed(2)}`, 'Cumulative P/L']}
        />
        <Area type="monotone" dataKey="pnl" stroke="#8884d8" fillOpacity={1} fill="url(#colorPnl)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PortfolioChart;
