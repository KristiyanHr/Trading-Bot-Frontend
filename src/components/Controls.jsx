import React, { useState } from 'react';
import './Controls.css';
import { startBacktest, startLiveSim, stopLiveSim, resetAccount } from '../apiService';

const Controls = ({ selectedCrypto, onActionComplete, isLive, setIsLive }) => {
  const [mode, setMode] = useState('backtest');
  const [ isLoading, setIsLoading ] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);
    if (mode === 'live') {
        await startLiveSim(selectedCrypto.symbol);
        setIsLive(true);
    }else{
        await resetAccount();
        await startBacktest(selectedCrypto.symbol);
        alert("Backtest started in the background. The dashboard will update periodically.");
        setTimeout(() => onActionComplete(), 8000); 
    }
    setIsLoading(false);
  }

  const handleStop = async () => {
    await stopLiveSim();
    setIsLive(false);
    onActionComplete();
  }

  const handleReset = async () => {
    setIsLoading(true);
    await resetAccount();
    setIsLoading(false);
    onActionComplete();
  }

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
            disabled={isLive} 
          />
          <span className="slider round"></span>
        </label>
        <span>Trading Mode</span>
      </div>

      <div className="button-group">
        <button className="btn btn-start"
          onClick={handleStart}
          disabled = { isLoading || isLive }
        >
            { isLoading ? 'Processing...' : (mode === 'live' ? 'Start Live Sim' : 'Start Backtest')}
        </button>

        <button className="btn btn-stop"
         disabled={ !isLive }
         onClick={handleStop}
        >
          Stop Simulation
        </button>

        <button className="btn btn-reset"
         onClick={handleReset}
         disabled={ isLoading || isLive }>
          Reset Account
        </button>
      </div>
        {isLive && <p className="live-indicator">Live Simulation is Running...</p>}
    </div>
  );
};

export default Controls;