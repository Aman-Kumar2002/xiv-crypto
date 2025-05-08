const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/api/markets', async (req, res) => {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true&price_change_percentage=1h,24h,7d';
  try {
    const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch from CoinGecko' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from CoinGecko' });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`)); 