import React, { useState } from 'react';
import './Controls.css';

// This is the critical line where the prop is received.
// Note the curly braces around selectedCrypto.
const Controls = ({ selectedCrypto }) => {
  const [mode, setMode] = useState('backtest');

  // This is a safety check. If for some reason the prop is not passed,
  // we won't crash the app. This is good practice.
  if (!selectedCrypto) {
    return <div>Loading controls...</div>;
  }

  return (
    <div className="controls-container">
      <h2>Controls for {selectedCrypto.name}</h2>
      
      <div className="mode-selector">
        <span>Training Mode</span>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={mode === 'live'} 
            onChange={() => setMode(prev => prev === 'live' ? 'backtest' : 'live')} 
          />
          <span className="slider round"></span>
        </label>
        <span>Trading Mode</span>
      </div>

      <div className="button-group">
        <button className="btn btn-start">
          {mode === 'live' ? 'Start Live Sim' : 'Start Backtest'}
        </button>
        <button className="btn btn-stop" disabled={mode !== 'live'}>
          Stop Simulation
        </button>
        <button className="btn btn-reset">
          Reset Account
        </button>
      </div>
    </div>
  );
};

export default Controls;