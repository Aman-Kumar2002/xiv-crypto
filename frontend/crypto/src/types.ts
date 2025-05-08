export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chart7d: string;
} 