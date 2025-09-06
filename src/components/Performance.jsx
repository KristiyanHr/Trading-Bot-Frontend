import React from "react";
import './Performance.css';

const Performance = () => {
    const performanceData = {
        balance: 9500.00,
        portfolioValue: 1250.50,
        totalNetWorth: 10750.50,
        totalPnl: 750.50,
        pnlPercentage: 7.5
    };

    const isProfitable = performanceData.totalPnl >= 0;

    return (
    <div className="performance-container">
      <h2>Performance</h2>
      <div className="kpi-grid">
        <div className="kpi-item">
          <span className="kpi-label">Balance (USD)</span>
          <span className="kpi-value">${performanceData.balance.toFixed(2)}</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-label">Portfolio Value</span>
          <span className="kpi-value">${performanceData.portfolioValue.toFixed(2)}</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-label">Total Net Worth</span>
          <span className="kpi-value">${performanceData.totalNetWorth.toFixed(2)}</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-label">Total P/L</span>
          <span className={`kpi-value ${isProfitable ? 'profit' : 'loss'}`}>
            {isProfitable ? '+' : '-'}${Math.abs(performanceData.totalPnl).toFixed(2)} ({performanceData.pnlPercentage.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
}

export default Performance;