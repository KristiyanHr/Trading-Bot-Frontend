import React from 'react';
import './TradeHistory.css'; // We will create this

const TradeHistory = () => {
  // Placeholder data. Tomorrow, this will come from our backend.
  const trades = [
    { id: 1, timestamp: '2025-09-06 10:30:15', symbol: 'BTCUSDT', tradeType: 'BUY', quantity: 0.015, price: 66666.66 },
    { id: 2, timestamp: '2025-09-06 11:45:20', symbol: 'BTCUSDT', tradeType: 'SELL', quantity: 0.015, price: 67100.00, pnl: 6.49 },
    { id: 3, timestamp: '2025-09-06 14:05:00', symbol: 'BTCUSDT', tradeType: 'BUY', quantity: 0.014, price: 67500.00 },
  ];

  return (
    <div className="trade-history-container">
      <h2>Trade History</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Asset</th>
              <th>Action</th>
              <th>Quantity</th>
              <th>Price (USD)</th>
              <th>Total Value</th>
              <th>P/L (USD)</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id}>
                <td>{trade.timestamp}</td>
                <td>{trade.symbol}</td>
                <td>
                  <span className={`action-badge ${trade.tradeType.toLowerCase()}`}>
                    {trade.tradeType}
                  </span>
                </td>
                <td>{trade.quantity.toFixed(6)}</td>
                <td>${trade.price.toFixed(2)}</td>
                <td>${(trade.quantity * trade.price).toFixed(2)}</td>
                <td className={trade.pnl >= 0 ? 'profit' : 'loss'}>
                  {trade.tradeType === 'SELL' ? (trade.pnl >= 0 ? `+$${trade.pnl.toFixed(2)}` : `-$${Math.abs(trade.pnl).toFixed(2)}`) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistory;