import { useState } from 'react';
import './App.css';
import { SUPPORTED_CRYPTOS } from './cryptoConfig.js';
import Controls from './components/Controls.jsx'; 
import Performance from './components/Performance.jsx';
import TradeHistory from './components/TradeHistory.jsx';

function App() {
  const [selectedCrypto, setSelectedCrypto] = useState(SUPPORTED_CRYPTOS[0]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Crypto Trading Bot Dashboard</h1>
        <div className="crypto-selector">
          <label htmlFor="crypto-select">Selected Asset:</label>
          <select
            id="crypto-select"
            value={selectedCrypto.symbol}
            onChange={(e) => {
              const newCrypto = SUPPORTED_CRYPTOS.find(c => c.symbol === e.target.value);
              setSelectedCrypto(newCrypto);
            }}
          >
            {SUPPORTED_CRYPTOS.map((crypto) => (
              <option key={crypto.symbol} value={crypto.symbol}>
                {crypto.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className='app-main'>
        <div className="dashboard-grid">
          <div className="grid-item-controls">
            {/* This is the critical line where the prop is passed. */}
            <Controls selectedCrypto={selectedCrypto} />
          </div>
          
          <div className="grid-item-kpis">
            <Performance/>
          </div>
          
          <div className="grid-item-chart">
            <h2>Portfolio Value Over Time</h2>
          </div>

          <div className="grid-item-history">
            <TradeHistory/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;