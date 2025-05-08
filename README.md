# XIV Crypto

A real-time cryptocurrency dashboard built with React, Redux, and Node.js.

## Tech Stack

- **Frontend:**
  - React 18
  - Redux Toolkit
  - TypeScript
  - Vite
  - Tailwind CSS
  - React Router
  - Redux Persist

- **Backend:**
  - Node.js
  - Express
  - Axios
  - CORS

- **Data Source:**
  - CoinGecko API (via local proxy)

## Architecture

- **Frontend:**
  - React components for UI
  - Redux for state management
  - Redux Persist for caching data
  - Vite for fast development and building

- **Backend:**
  - Express server as a proxy to CoinGecko API
  - CORS enabled for local development
  - Fallback to sample data if API fails

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/xiv_crypto.git
   cd xiv_crypto
   ```

2. **Install dependencies:**
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd frontend/crypto
   npm install
   ```

3. **Start the backend server:**
   ```bash
   node server.js
   ```

4. **Start the frontend development server:**
   ```bash
   cd frontend/crypto
   npm run dev
   ```

5. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

## Features

- Real-time cryptocurrency price updates
- Detailed market data (price, market cap, volume, etc.)
- 7-day price charts
- Responsive design
- Fallback to sample data if API is unavailable

## Project Structure

```
xiv_crypto/
├── frontend/
│   └── crypto/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Chart7D.tsx
│       │   │   ├── CryptoTable.tsx
│       │   │   └── PercentChange.tsx
│       │   ├── data/
│       │   │   └── sampleData.ts
│       │   ├── redux/
│       │   │   ├── cryptoSlice.ts
│       │   │   ├── selectors.ts
│       │   │   └── store.ts
│       │   ├── services/
│       │   │   ├── cryptoService.ts
│       │   │   └── websocketService.ts
│       │   ├── utils/
│       │   │   └── formatters.ts
│       │   ├── types.ts
│       │   ├── App.tsx
│       │   ├── index.css
│       │   ├── main.tsx
│       │   └── vite-env.d.ts
│       ├── package.json
│       └── vite.config.ts
└── server.js
```

 