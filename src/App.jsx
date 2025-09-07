import { useState, useEffect } from 'react';
import './App.css';
import { SUPPORTED_CRYPTOS } from './cryptoConfig.js';
import Controls from './components/Controls.jsx';
import Performance from './components/Performance.jsx';
import TradeHistory from './components/TradeHistory.jsx';
import { getAccountData } from './apiService.js';

function App() {
  const [ selectedCrypto, setSelectedCrypto ] = useState(SUPPORTED_CRYPTOS[0]);
  const [ accountStatus, setAccountStatus ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const fetchData = async () => {
    console.log("Fetching account data...");
    setIsLoading(true);
    const data = await getAccountData();
    setAccountStatus(data);
    setIsLoading(false);
    console.log("Account data fetched: ", data);
  }

  useEffect(() => {
    fetchData();

    let intervalId = null;
    
    if (isLive) {
      console.log("Live Mode is ON. Starting 10 seccong polling");
      intervalId = setInterval(fetchData, 10000); // Poll every 10 seconds
    }

    return () => {
      if (intervalId) {
        console.log("Live Mode turned OFF. Stopping polling.");
        clearInterval(intervalId);
      }
    }

  }, [isLive]);

  if (isLoading) {
    return <div className="loading-screen"><h1>Loading Dashboard....</h1></div>;
  }

  if (!accountStatus) {
    return <div className="loading-screen"><h1>Error loading account data. Is the backend running?.</h1></div>;
  }

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
            <Controls 
              selectedCrypto={selectedCrypto} 
              onActionComplete = {fetchData}
              isLive={isLive}
              setIsLive={setIsLive}
            />
          </div>
          
          <div className="grid-item-kpis">
            <Performance accountStatus = {accountStatus} />
          </div>
          
          <div className="grid-item-chart">
            <h2>Portfolio Value Over Time</h2>
          </div>

          <div className="grid-item-history">
            <TradeHistory trades = {accountStatus.trades}/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;