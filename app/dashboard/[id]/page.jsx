"use client";
import { use, useEffect, useMemo, useState } from "react";
import { motion, } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Clock,
  DollarSign,
  Eye,
  Globe,
  PlusCircle,
  Search,
  ShoppingCart,
  User,
  Zap,
} from "lucide-react";
import Chart from "react-google-charts";

const fadeinup = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

const Header = () => {
  const [ismenuopen, setismenuopen] = useState(false);
  const [notifications, setnotifications] = useState(2);
  return (
    <motion.header
      {...fadeinup}
      className="flex justify-between items-center p-4 bg-gray-900 text-white"
    >
      <div className="flex items-center space-x-8">
        <h1 className="text-2xl text-blue-500 font-bold cursor-pointer hover:scale-105">
          TradePro
        </h1>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li>
              {" "}
              <a
                href="/"
                className="flex items-center text-blue-500 hover:text-blue-300 font-semibold transition-colors"
              >
                <Zap className="mr-1" size={16} />
                Explore
              </a>{" "}
            </li>
            <li>
              {" "}
              <a
                href="/"
                className="flex items-center text-blue-500 hover:text-blue-300 font-semibold transition-colors"
              >
                <Globe className="mr-1" size={16} />
                Investments
              </a>{" "}
            </li>
            <li>
              {" "}
              <a
                href="/"
                className="flex items-center text-blue-500 hover:text-blue-300 font-semibold transition-colors"
              >
                <BookOpen className="mr-1" size={16} />
                Learn{" "}
              </a>{" "}
            </li>
          </ul>
        </nav>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
           <input
            type="text"
            placeholder="What are you looking for today?"
            className="pl-10 pr-4 py-2 bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <Bell className="text-gray-300 hover:text-blue-500 transition-colors cursor-pointer" />
          {notifications > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute -top-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
            >
              {notifications}
            </motion.span>
          )}
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <ShoppingCart className="text-gray-300 hover:text-blue-500 transition-colors cursor-pointer" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <User className="text-gray-300 hover:text-blue-500 transition-colors cursor-pointer" />
        </motion.div>
      </div>
    </motion.header>
  );
};

const BreadCrumb = ({ stock }) => {
  return (
    <motion.div
      {...fadeinup}
      className="flex items-center space-x-2 my-4 text-sm text-gray-400"
    >
      <a href="/" className="hover:text-blue-500">
        Home
      </a>
      <span>/</span>
      <a href="/dashboard" className="hover:text-blue-500">
        Dashboard
      </a>
      <span>/</span>
      <span className="text-blue-500">{stock}</span>
    </motion.div>
  );
};

const generateRandomData = (currentvalue, points) => {
  const data = [["Time", "Low", "Open", "Close", "High"]];
  for (let i = 0; i < points; i++) {
    const time = new Date(Date.now() - i * 5000).toLocaleTimeString();
    const open = currentvalue + Math.random() * 10 - 5;
    const close = open + Math.random() * 10 - 5;
    const low = Math.min(open, close) - Math.random() * 5;
    const high = Math.max(open, close) + Math.random() * 5;
    data.push([time, low, open, close, high]);
    return data;
  }
};

const StockChart = ({ stock }) => {
  const [timeRange, setTimeRange] = useState("5M");
  const [data, setData] = useState(generateRandomData(425371, 5));
  const [currentValue, setCurrentValue] = useState(425371);
  const [change, setChange] = useState({ value: 0, percentage: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateRandomData(
        currentValue,
        getDataPoints(timeRange)
      );
      setData((prevData) => [...prevData, ...newData.slice(1)]);
      setCurrentValue(newData[newData.length - 1][3]);
      console.log(newData);
      const initialValue = data[1][2];
      const changeValue = currentValue - initialValue;
      const changePercentage = (changeValue / initialValue) * 100;
      setChange({ value: changeValue, percentage: changePercentage });
    }, 5000);

    return () => clearInterval(interval);
  }, [timeRange, currentValue, data]);

  const getDataPoints = (range) => {
    switch (range) {
      case "5M":
        return 5;
      case "10M":
        return 10;
      case "15M":
        return 15;
      case "30M":
        return 30;
      case "1H":
        return 60;
      default:
        return 5;
    }
  };

  const options = useMemo(
    () => ({
      backgroundColor: "transparent",
      chartArea: { width: "90%", height: "80%" },
      hAxis: {
        textStyle: { color: "#9CA3AF" },
        baselineColor: "#4B5563",
        gridlines: { color: "transparent" },
        format: "HH:mm",
      },
      vAxis: {
        textStyle: { color: "#9CA3AF" },
        baselineColor: "#4B5563",
        gridlines: { color: "#4B5563" },
      },
      legend: { position: "none" },
      candlestick: {
        fallingColor: { strokeWidth: 0, fill: "#EF4444" },
        risingColor: { strokeWidth: 0, fill: "#10B981" },
      },
      animation: {
        startup: true,
        duration: "1000s",
        easing: "out",
      },
    }),
    []
  );


  return (
    <motion.div
      {...fadeinup}
      className="bg-gray-800 p-6 rounded-lg shadow-lg my-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{stock}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-white">
              {currentValue.toFixed(2)}
            </span>
            <motion.span
              className={`flex items-center ${
                change.value >= 0 ? "text-green-500" : "text-red-500"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={change.value}
            >
              {change.value >= 0 ? (
                <ArrowUpRight size={20} className="mr-1" />
              ) : (
                <ArrowDownRight size={20} className="mr-1" />
              )}
              {change.value > 0 ? "+" : ""}
              {change.value.toFixed(2)} ({change.percentage.toFixed(2)}%)
            </motion.span>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <motion.button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle className="inline-block mr-2" size={16} />
            Create Alert
          </motion.button>
          <motion.button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="inline-block mr-2" size={16} />
            Watchlist
          </motion.button>
        </div>
      </div>
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
      <div className="flex justify-between mt-4 overflow-x-auto">
        {["5M", "10M", "15M", "30M", "1H"].map((range) => (
          <motion.button
            key={range}
            className={`text-sm ${
              timeRange === range ? "text-blue-500" : "text-gray-300"
            } hover:text-blue-500 transition-colors flex items-center`}
            onClick={() => setTimeRange(range)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Clock size={14} className="mr-1" />
            {range}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

const OptionsTable = ({ stock }) => {
  const [options, setOptions] = useState([
    {
      strike: 25400,
      callPrice: 115.15,
      callChange: 17.0,
      putPrice: 97.55,
      putChange: -15.55,
    },
    {
      strike: 25300,
      callPrice: 95.4,
      callChange: -10.9,
      putPrice: 96.65,
      putChange: 28.85,
    },
    {
      strike: 25200,
      callPrice: 78.5,
      callChange: 32.78,
      putPrice: 73.65,
      putChange: -12.25,
    },
    {
      strike: 25100,
      callPrice: 29.7,
      callChange: -10.14,
      putPrice: 28.3,
      putChange: 20.74,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOptions((prevOptions) =>
        prevOptions.map((option) => ({
          ...option,
          callPrice: option.callPrice + (Math.random() - 0.5) * 5,
          callChange: (Math.random() - 0.5) * 10,
          putPrice: option.putPrice + (Math.random() - 0.5) * 5,
          putChange: (Math.random() - 0.5) * 10,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      {...fadeinup}
      className="bg-gray-800 p-6 rounded-lg shadow-lg my-6 overflow-x-auto"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <DollarSign size={24} className="mr-2" />
        Top {stock} Options
      </h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="py-2">Strike</th>
            <th className="py-2">Call</th>
            <th className="py-2">Put</th>
          </tr>
        </thead>
        <tbody>
          {options.map((option, index) => (
            <motion.tr
              key={index}
              className="border-b border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <td className="py-2 text-white">{option.strike}</td>
              <td className="py-2">
                <div className="text-white">{option.callPrice.toFixed(2)}</div>
                <motion.div
                  className={
                    option.callChange >= 0 ? "text-green-500" : "text-red-500"
                  }
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={option.callChange}
                >
                  {option.callChange > 0 ? (
                    <ArrowUpRight size={14} className="inline mr-1" />
                  ) : (
                    <ArrowDownRight size={14} className="inline mr-1" />
                  )}
                  {option.callChange.toFixed(2)}%
                </motion.div>
              </td>
              <td className="py-2">
                <div className="text-white">{option.putPrice.toFixed(2)}</div>
                <motion.div
                  className={
                    option.putChange >= 0 ? "text-green-500" : "text-red-500"
                  }
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={option.putChange}
                >
                  {option.putChange > 0 ? (
                    <ArrowUpRight size={14} className="inline mr-1" />
                  ) : (
                    <ArrowDownRight size={14} className="inline mr-1" />
                  )}
                  {option.putChange.toFixed(2)}%
                </motion.div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default function page({ params }) {
  const { id } = use(params);
  return (
    <div className="bg-gray-900 min-h-screen text-gray-300">
      <Header />
      <main className="container p-4 mx-auto">
        <BreadCrumb stock={id} />
        <StockChart stock={id} />
        <OptionsTable stock={id}/>
      </main>
    </div>
  );
}
