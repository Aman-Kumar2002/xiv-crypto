import React from 'react';
import type { CryptoAsset } from '../types';
import PercentChange from './PercentChange';
import Chart7D from './Chart7D';

interface Props {
  asset: CryptoAsset;
  index: number;
}

const CryptoRow: React.FC<Props> = ({ asset, index }) => (
  <tr>
    <td>{index + 1}</td>
    <td>
      <img src={asset.logo} alt={asset.symbol} style={{ width: 28, height: 28 }} />
    </td>
    <td>{asset.name}</td>
    <td>{asset.symbol}</td>
    <td>${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
    <td><PercentChange value={asset.percentChange1h} /></td>
    <td><PercentChange value={asset.percentChange24h} /></td>
    <td><PercentChange value={asset.percentChange7d} /></td>
    <td>${asset.marketCap.toLocaleString()}</td>
    <td>${asset.volume24h.toLocaleString()}</td>
    <td>{asset.circulatingSupply.toLocaleString()}M</td>
    <td>{asset.maxSupply.toLocaleString()}M</td>
    <td><Chart7D src={asset.chart7d} alt={`${asset.symbol} 7d chart`} /></td>
  </tr>
);

export default CryptoRow; 