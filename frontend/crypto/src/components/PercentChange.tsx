import React from 'react';

interface Props {
  value: number;
}

const PercentChange: React.FC<Props> = ({ value }) => (
  <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : 'gray' }}>
    {value > 0 ? '▲' : value < 0 ? '▼' : ''} {Math.abs(value).toFixed(2)}%
  </span>
);

export default PercentChange; 