import React from "react";
import './Performance.css';

const Performance = ({accountStatus}) => {
    const initialBalance = 10000;
    const totalPnl = accountStatus.totalNetWorth - initialBalance;
    const pnlPercentage = (totalPnl / initialBalance) * 100;
    const isProfitable = totalPnl >= 0;

    return (
    <div className="performance-container">
      <h2>Performance</h2>
      <div className="kpi-grid">
        <div className="kpi-item">
          <span className="kpi-label">Balance (USD)</span>
          <span className="kpi-value">${accountStatus.balance.toFixed(2)}</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-label">Portfolio Value</span>
          <span className="kpi-value">${accountStatus.portfolioValue.toFixed(2)}</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-label">Total Net Worth</span>
          <span className="kpi-value">${accountStatus.totalNetWorth.toFixed(2)}</span>
        </div>
        <div className="kpi-item">
          <span className="kpi-label">Total P/L</span>
          <span className={`kpi-value ${isProfitable ? 'profit' : 'loss'}`}>
            {isProfitable ? '+' : '-'}${Math.abs(totalPnl).toFixed(2)} ({pnlPercentage.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
}

export default Performance;