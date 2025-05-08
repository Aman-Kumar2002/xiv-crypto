import React from 'react';

interface Props {
  src: string;
  alt: string;
}

const Chart7D: React.FC<Props> = ({ src, alt }) => {
  // Default chart SVG if src is missing or invalid
  const defaultChart = `
    <svg width="80" height="32" xmlns="http://www.w3.org/2000/svg">
      <polyline
        fill="none"
        stroke="#646cff"
        stroke-width="1.5"
        points="2,16 20,8 40,24 60,4 78,16"
      />
    </svg>
  `;

  const chartSrc = src || `data:image/svg+xml;base64,${btoa(defaultChart)}`;

  return (
    <img 
      src={chartSrc} 
      alt={alt} 
      className="h-7 w-20 object-contain inline-block"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = `data:image/svg+xml;base64,${btoa(defaultChart)}`;
      }}
    />
  );
};

export default Chart7D; 