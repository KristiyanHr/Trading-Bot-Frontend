import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { SUPPORTED_CRYPTOS } from '../cryptoConfig';

const fetchPriceData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching price data:", error);
    return [];
  }
};

const PriceChart = ({ selectedCrypto }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadChartData = async () => {
      setIsLoading(true);

      // 1. Текущи данни от CoinGecko
      const coingeckoUrl = `https://api.coingecko.com/api/v3/coins/${selectedCrypto.coinGeckoId}/market_chart?vs_currency=usd&days=30&interval=daily`;
      const currentDataResponse = await fetchPriceData(coingeckoUrl);
      const currentPrices = currentDataResponse.prices || [];

      // 2. Изчисляване на правилните дати
      const to = new Date();
      const from = new Date();
      from.setDate(to.getDate() - 30);

      // Миналата година, същия период
      const historicalFrom = new Date(from);
      historicalFrom.setFullYear(from.getFullYear() - 1);

      const historicalTo = new Date(to);
      historicalTo.setFullYear(to.getFullYear() - 1);

      // 3. Исторически данни от бекенда
      const backendUrl = `http://localhost:8080/api/market-data/${selectedCrypto.symbol}?from=${historicalFrom.toISOString()}&to=${historicalTo.toISOString()}`;
      const historicalData = await fetchPriceData(backendUrl);

      console.log("Current Prices:", currentPrices);
      console.log("Historical Data:", historicalData);

      // 4. Комбиниране на данните
      const combinedData = [];
      const maxLength = Math.max(currentPrices.length, historicalData.length);

      for (let i = 0; i < maxLength; i++) {
        combinedData.push({
          name: `Day ${i + 1}`,
          "Current Price": currentPrices[i] ? parseFloat(currentPrices[i][1].toFixed(2)) : null,
          "Historical Price": historicalData[i] ? parseFloat(historicalData[i].price.toFixed(2)) : null,
        });
      }

      setChartData(combinedData);
      setIsLoading(false);
    };

    if (selectedCrypto) {
      loadChartData();
    }
  }, [selectedCrypto]);

  if (isLoading) {
    return <div>Loading price chart...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4a4a5e" />
        <XAxis dataKey="name" stroke="#a0a0b0" />
        <YAxis stroke="#a0a0b0" tickFormatter={(value) => `$${value.toLocaleString()}`} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #4a4a5e' }}
          labelStyle={{ color: '#e0e0e0' }}
        />
        <Legend />
        <Line type="monotone" dataKey="Current Price" stroke="#ff9a8b" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Historical Price" stroke="#6c757d" strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart;