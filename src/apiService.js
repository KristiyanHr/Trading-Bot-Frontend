const API_BASE_URL = "http://localhost:8080/api";

const postRequest = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const message = await response.text();
    console.log(`Response from ${endpoint}:`, message);
    return { success: true, message };
  } catch (error) {
    console.error(`Error calling ${endpoint}:`, error);
    return { success: false, message: error.message };
  }
};

export const startBacktest = (symbol) => {
  return postRequest(`bot/start-backtest/${symbol}`);
};

export const startLiveSim = (symbol) => {
  return postRequest(`bot/start-live/${symbol}`);
};

export const stopLiveSim = () => {
  return postRequest("bot/stop-live");
};

export const resetAccount = () => {
  return postRequest("bot/reset");
};

export const getAccountData = async () => {
  try {
    // We are now getting the full status, not just a single account object
    const response = await fetch(`${API_BASE_URL}/account/1`);
    if (!response.ok) throw new Error("Failed to fetch account status");
    return await response.json();
  } catch (error) {
    console.error("Error fetching account data:", error);
    return null;
  }
};
