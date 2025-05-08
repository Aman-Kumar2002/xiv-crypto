import React from 'react';
import { useSelector } from 'react-redux';
import { selectAssets } from '../redux/selectors';
import { formatCurrency, formatNumber } from '../utils/formatters';
import type { CryptoAsset } from '../types';
import Chart7D from './Chart7D';

const CryptoTable: React.FC = () => {
  const assets = useSelector(selectAssets);

  return (
    <div className="w-full px-1 sm:px-2 md:px-4 py-2 sm:py-4 md:py-6 bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto -mx-1 sm:-mx-2 md:-mx-4">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th scope="col" className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">1h %</th>
              <th scope="col" className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h %</th>
              <th scope="col" className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">7d %</th>
              <th scope="col" className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Market Cap</th>
              <th scope="col" className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Volume(24h)</th>
              <th scope="col" className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Circulating Supply</th>
              <th scope="col" className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">7D Chart</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assets.map((asset: CryptoAsset, idx: number) => (
              <tr key={asset.id} className="hover:bg-gray-50">
                <td className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 whitespace-nowrap text-sm font-medium text-gray-900">{idx + 1}</td>
                <td className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 whitespace-nowrap min-w-0">
                  <div className="flex items-center min-w-0">
                    <img src={asset.icon} alt={asset.symbol} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full" />
                    <div className="ml-2 sm:ml-4 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{asset.name}</div>
                      <div className="text-xs text-gray-500 truncate">{asset.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{formatCurrency(asset.price)}</td>
                <td className={`px-1 sm:px-2 md:px-4 py-2 sm:py-3 whitespace-nowrap text-sm text-right font-medium ${asset.percentChange1h > 0 ? 'text-green-600' : asset.percentChange1h < 0 ? 'text-red-500' : 'text-gray-400'}`}>{asset.percentChange1h > 0 ? '▲' : asset.percentChange1h < 0 ? '▼' : ''} {Math.abs(asset.percentChange1h).toFixed(2)}%</td>
                <td className={`px-1 sm:px-2 md:px-4 py-2 sm:py-3 whitespace-nowrap text-sm text-right font-medium ${asset.percentChange24h > 0 ? 'text-green-600' : asset.percentChange24h < 0 ? 'text-red-500' : 'text-gray-400'}`}>{asset.percentChange24h > 0 ? '▲' : asset.percentChange24h < 0 ? '▼' : ''} {Math.abs(asset.percentChange24h).toFixed(2)}%</td>
                <td className={`px-1 sm:px-2 md:px-4 py-2 sm:py-3 whitespace-nowrap text-sm text-right font-medium ${asset.percentChange7d > 0 ? 'text-green-600' : asset.percentChange7d < 0 ? 'text-red-500' : 'text-gray-400'}`}>{asset.percentChange7d > 0 ? '▲' : asset.percentChange7d < 0 ? '▼' : ''} {Math.abs(asset.percentChange7d).toFixed(2)}%</td>
                <td className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900 hidden sm:table-cell">{formatNumber(asset.marketCap)}</td>
                <td className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900 hidden md:table-cell">{formatNumber(asset.volume24h)}</td>
                <td className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900 hidden lg:table-cell">{formatNumber(asset.circulatingSupply)} <span className="text-gray-500">{asset.symbol}</span></td>
                <td className="px-1 sm:px-2 md:px-4 py-2 sm:py-3 whitespace-nowrap text-center"><div className="w-16 sm:w-20 md:w-24 mx-auto"><Chart7D src={asset.chart7d} alt={`${asset.symbol} 7d chart`} /></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable; 