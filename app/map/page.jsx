"use client"

/* 
 import React from 'react';
import { Chart } from 'react-google-charts';

const BitcoinChart = ({ data }) => {
  const chartData = [
    ['Date', 'Price (USD)'],
    ...data,
  ];

  const options = {
    title: 'Bitcoin Price Over Time',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: {
      title: 'Date',
      format: 'MMM dd, yyyy',
    },
    vAxis: {
      title: 'Price (USD)',
    },
    colors: ['#f2a900'], // Bitcoin gold
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
  );
};

const sampleData = [
  ['2025-10-01', 27500],
  ['2025-10-08', 28250],
  ['2025-10-15', 29000],
  ['2025-10-22', 29550],
];

const App = () => (
  <div>
    <h2>Bitcoin Trend</h2>
    <BitcoinChart data={sampleData} />
  </div>
);

export default App;*/

import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const generateRandomCandle = (lastClose) => {
  const open = lastClose;
  const close = +(open + (Math.random() - 0.5) * 500).toFixed(2);
  const high = Math.max(open, close) + Math.random() * 200;
  const low = Math.min(open, close) - Math.random() * 200;
  return [new Date(), open, high, low, close];
};

const LiveCandlestickChart = () => {
  const [data, setData] = useState([
    ['Time', 'Open', 'High', 'Low', 'Close'],
    [new Date(), 27000, 27200, 26800, 27150],
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const last = data[data.length - 1];
      const newCandle = generateRandomCandle(last[4]);
      setData((prev) => [...prev.slice(-20), newCandle]); // keep last 20 candles
    }, 3000); // update every 3 seconds

    return () => clearInterval(interval);
  }, [data]);

  const options = {
    title: 'Live Bitcoin Candlestick Chart',
    legend: 'none',
    bar: { groupWidth: '80%' },
    candlestick: {
        fallingColor: { strokeWidth: 0, fill: "#EF4444" },
        risingColor: { strokeWidth: 0, fill: "#10B981" },
      },
    hAxis: {
      title: 'Time',
      format: 'HH:mm:ss',
    },
    vAxis: {
      title: 'Price (USD)',
    },
  };

  return (
    <Chart
      chartType="CandlestickChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default LiveCandlestickChart;