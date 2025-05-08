import type { CryptoAsset } from '../types';
import { sampleData } from '../data/sampleData';

const LOCAL_PROXY_API = 'http://localhost:4000/api/markets';

export async function fetchCryptoData(): Promise<CryptoAsset[]> {
  try {
    console.log('[Crypto] Attempting to fetch real data from proxy...');
    const response = await fetch(
      LOCAL_PROXY_API,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      console.warn('[Crypto] Failed to fetch from local proxy, using sample data');
      console.log('[Crypto] USING SAMPLE DATA');
      return sampleData;
    }

    const data = await response.json();
    console.log('[Crypto] USING REAL API DATA');
    
    return data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      icon: coin.image,
      price: coin.current_price,
      percentChange1h: coin.price_change_percentage_1h_in_currency || 0,
      percentChange24h: coin.price_change_percentage_24h_in_currency || 0,
      percentChange7d: coin.price_change_percentage_7d_in_currency || 0,
      marketCap: coin.market_cap,
      volume24h: coin.total_volume,
      circulatingSupply: coin.circulating_supply / 1000000, // Convert to millions
      maxSupply: coin.max_supply ? coin.max_supply / 1000000 : null, // Convert to millions
      chart7d: coin.sparkline_in_7d?.price ? 
        `data:image/svg+xml;base64,${btoa(generateSparklineSVG(coin.sparkline_in_7d.price))}` : 
        '/assets/default_chart.svg'
    }));
  } catch (error) {
    console.error('[Crypto] Error fetching crypto data:', error);
    console.warn('[Crypto] Using sample data as fallback');
    console.log('[Crypto] USING SAMPLE DATA');
    return sampleData;
  }
}

// Helper function to generate SVG sparkline
function generateSparklineSVG(prices: number[]): string {
  const width = 80;
  const height = 32;
  const padding = 2;
  
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min;
  
  const points = prices.map((price, i) => {
    const x = (i / (prices.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((price - min) / range) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <polyline
        fill="none"
        stroke="#646cff"
        stroke-width="1.5"
        points="${points}"
      />
    </svg>
  `;
} 