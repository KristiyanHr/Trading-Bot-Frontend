import { useState, useEffect } from 'react';
import './App.css';
import { SUPPORTED_CRYPTOS } from './cryptoConfig.js';
import Controls from './components/Controls.jsx';
import Performance from './components/Performance.jsx';
import TradeHistory from './components/TradeHistory.jsx';
import { getAccountData, getTradeHistoryByType } from './apiService.js';
import PortfolioChart from './components/PortfolioChart.jsx';


function App() {
  const [ selectedCrypto, setSelectedCrypto ] = useState(SUPPORTED_CRYPTOS[0]);
  const [ accountStatus, setAccountStatus ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [mode, setMode] = useState('backtest'); 
  const [trades, setTrades] = useState([]);


  const fetchData = async () => {
    console.log(`Fetching data for mode: ${mode}`);
    setIsLoading(true);

    const statusData = await getAccountData();

    const tradeData = await getTradeHistoryByType(mode);
    
    setAccountStatus(statusData);
    setTrades(tradeData); 
    setIsLoading(false);
    console.log("Status:", statusData, "Trades:", tradeData);
  };

  useEffect(() => {
    fetchData();

    let intervalId = null;
    
    if (isLive) {
      console.log("Live Mode is ON. Starting 10 seccong polling");
      intervalId = setInterval(fetchData, 5000);
    }

    return () => {
      if (intervalId) {
        console.log("Live Mode turned OFF. Stopping polling.");
        clearInterval(intervalId);
      }
    }

  }, [isLive, mode]);

  const tradesToShow = accountStatus ? 
    accountStatus.trades.filter(trade => 
      trade.simulationType && trade.simulationType.toLowerCase() === mode
    )
    : [];

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
              mode={mode}
              setMode={setMode}
            />
          </div>
          
          <div className="grid-item-kpis">
            <Performance accountStatus = {accountStatus} />
          </div>
          
          <div className="grid-item-chart">
            <h2>Portfolio Value Over Time</h2>
            <PortfolioChart 
              trades = {trades}
              initialBalance={10000}  />
          </div>

          <div className="grid-item-history">
            <TradeHistory
              trades = {trades}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;