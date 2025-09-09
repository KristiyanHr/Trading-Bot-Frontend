# Automated Crypto Trading Bot (Frontend)

This project is the frontend dashboard for a simulated automated cryptocurrency trading bot. It's a full-stack application with a Java Spring Boot backend and this React frontend. This repository contains the frontend code.

The dashboard provides a user-friendly interface to control the trading bot, visualize its performance in real-time, and analyze market data.

**Backend Repository:** https://github.com/KristiyanHr/Trading-Bot-Backend

## Features

*   **Dynamic Dashboard:** A responsive and modern UI built with React.
*   **Bot Controls:** Easily start/stop simulations and switch between Training (Backtest) and Trading (Live) modes.
*   **Multi-Asset Support:** A dropdown allows the user to select and control the bot for different cryptocurrencies (e.g., Bitcoin, Ethereum).
*   **Real-Time Performance Tracking:** Key Performance Indicators (KPIs) like Balance, Portfolio Value, and Total P/L are updated periodically.
*   **Interactive Charts:**
    *   **Portfolio Performance:** An area chart visualizes the cumulative Profit/Loss over the course of a simulation.
    *   **Price Analysis:** A powerful comparison chart that plots the current price trend (last 30 days) against the historical trend from one year ago.
*   **Detailed Trade History:** A clear, scrollable table showing every trade the bot has executed.

## Technical Requirements & Stack

*   **Framework/Library:** React (with Vite for a fast development environment)
*   **Charting:** Recharts
*   **Styling:** Custom CSS with a modern, responsive grid/flexbox layout.
*   **API Communication:** Asynchronous `fetch` calls to the backend REST API.

## Setup & Running the Application

### Prerequisites
*   Node.js (v18 or newer recommended)
*   npm (usually comes with Node.js)
*   The backend application must be running first.

### 1. Installation

1.  Navigate to the root directory of the `trading-bot-frontend` project in your terminal.
2.  Install all the required npm packages:

    npm install


### 2. Running the Frontend

1.  After the installation is complete, start the Vite development server:

    npm run dev

2.  The application will automatically open in your browser.
3.  The frontend will be available at `http://localhost:5173`.
