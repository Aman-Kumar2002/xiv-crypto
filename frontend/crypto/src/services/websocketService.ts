import type { CryptoAsset } from '../types';
import type { AppDispatch } from '../redux/store';
import { updateAssets } from '../redux/cryptoSlice';

function getRandomChange(val: number, percent = 0.01) {
  const change = val * percent * (Math.random() - 0.5) * 2;
  return parseFloat((val + change).toFixed(2));
}

function getRandomPercent(val: number) {
  return parseFloat((val + (Math.random() - 0.5) * 2).toFixed(2));
}

export function startWebSocketSimulation(assets: CryptoAsset[], dispatch: AppDispatch) {
  return setInterval(() => {
    const updated = assets.map(asset => ({
      ...asset,
      price: getRandomChange(asset.price, 0.01),
      percentChange1h: getRandomPercent(asset.percentChange1h),
      percentChange24h: getRandomPercent(asset.percentChange24h),
      percentChange7d: getRandomPercent(asset.percentChange7d),
      volume24h: getRandomChange(asset.volume24h, 0.03),
    }));
    dispatch(updateAssets(updated));
  }, 1500); // Update every 1.5 seconds
} 