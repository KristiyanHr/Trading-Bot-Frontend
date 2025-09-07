import React from 'react';
import './TradeHistory.css'; 

const TradeHistory = ( { trades }) => {
 
    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    }

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
            {trades && trades.length > 0 ? (
              trades.map((trade) => (
              <tr key={trade.id}>
                <td>{formatTimestamp(trade.timestamp)}</td>
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
                  {trade.tradeType === 'SELL' && trade.pnl != null ? 
                    (trade.pnl >= 0 ? `+$${trade.pnl.toFixed(2)}` : `-$${Math.abs(trade.pnl).toFixed(2)}`) : '—'}
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No trades yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default TradeHistory;