"use client";
import { use, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BarChart2,
  Bell,
  BookOpen,
  ChevronRight,
  Clock,
  DollarSign,
  Eye,
  Globe,
  PieChart,
  Plus,
  PlusCircle,
  Search,
  ShoppingCart,
  TrendingUp,
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
            placeholder="What are you looking for?"
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

const getRandom = (currentvalue, points) => {
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
  const [timerange, settimerange] = useState("5M");
  const [currentvalue, setcurrentvalue] = useState(485451);
  const [change, setchange] = useState({ value: 0, percentage: 0 });
  const [data, setdata] = useState(getRandom(currentvalue, 5));

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = getRandom(currentvalue, getDataPoints(timerange));
      setdata((prev) => [...prev, ...newData.slice(1)]);
      setcurrentvalue(newData[newData.length - 1][3]);
      const initialvalue = data[1][2];
      const changevalue = currentvalue - initialvalue;
      const changepercentage = (changevalue / initialvalue) * 100;
      setchange({ value: changevalue, percentage: changepercentage });
    }, 5000);
    return () => clearInterval(interval);
  }, [timerange, data]);

  const options = {
    legend: "none",
    backgroundColor: "transparent",
    bar: { groupWidth: "100%" }, // Remove space between bars.
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
      risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
    },
  };
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
  return (
    <motion.div {...fadeinup} className="bg-gray-800 p-4 rounded-sm">
      <div className="flex justify-between mb-2 not-sm:flex-col">
        <div>
          <h2 className="font-semibold text-xl">{stock}</h2>
          <div className="flex">
            <span className="mr-2 text-white text-xl font-semibold">{currentvalue.toFixed(2)}</span>
            <span
              className={`${
                change.value >= 0 ? "text-green-500" : "text-red-500"
              } flex items-center`}
            > {change.value>=0 ?<ArrowUp size={16}/>:<ArrowDown size={16}/>}
              {change.value >= 0 ? "+" : ""}
              {change.value.toFixed(2)}({change.percentage.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-600 duration-300 rounded-sm p-2 h-fit flex items-center text-white gap-1 cursor-pointer hover:scale-105 hover:bg-blue-500">
            <PlusCircle />
            Create Alert
          </button>
          <button className="bg-blue-600 duration-300 rounded-sm p-2 h-fit flex items-center text-white gap-1 cursor-pointer hover:scale-105 hover:bg-blue-500">
            <Eye /> Watchlist
          </button>
        </div>
      </div>
      <Chart
        chartType="CandlestickChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
        legendToggle={true}
      />
      <div className="flex justify-between m-3">
        {["5M", "10M", "15M", "30M", "1H"].map((range) => (
          <button
            key={range}
            onClick={() => settimerange(range)}
            className={`${
              range === timerange ? "text-blue-500" : ""
            } cursor-pointer`}
          >
            <Clock />
            {range}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const OptionsTable=({stock})=>{
  const [options, setoptions] = useState([
    {strike:25300,callPrice:95.4,callChange:-10.9,putPrice:96.65,putChange:28.85},
    {strike:25200,callPrice:95.4,callChange:-10.9,putPrice:96.65,putChange:28.85},
    {strike:25100,callPrice:95.4,callChange:-10.9,putPrice:96.65,putChange:28.85},
    {strike:24900,callPrice:95.4,callChange:-10.9,putPrice:96.65,putChange:28.85},
    {strike:24800,callPrice:95.4,callChange:-10.9,putPrice:96.65,putChange:28.85},
    {strike:24700,callPrice:95.4,callChange:-10.9,putPrice:96.65,putChange:28.85},
    {strike:24600,callPrice:95.4,callChange:-10.9,putPrice:96.65,putChange:28.85},
  ]);
  useEffect(()=>{
    const interval=setInterval(()=>{
      setoptions(prev=>(
        prev.map(option=>(
          {...option,callPrice:option.callPrice + (Math.random()-0.5) * 5,
            callChange:(Math.random()-0.5)*10,
            putPrice:option.putPrice+ (Math.random()-0.5) * 5,putChange:(Math.random()-0.5)*10,
          }
        ))
      ))
    },1000)
    return ()=>clearInterval(interval);
  },[]);

  return (
    <motion.div {...fadeinup} className="mt-10 bg-gray-800 rounded-sm p-4">
      <h3 className="text-xl tex-white font-bold flex items-center mb-4">
        {" "}
        <DollarSign size={24} className="mr-2"/>
        Top {stock} options
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
          {options.map((option,index)=>(
            <motion.tr key={index} {...fadeinup} className="border-b border-gray-700">
              <td className="py-2 text-white">{option.strike}</td>
              <td className="py-2">
                <div>{option.callPrice.toFixed(2)}</div>
                <div className={`${option.callChange > 0 ?"text-green-500":"text-red-500"}`}>{option.callChange > 0 ?<ArrowUp size={16} className="inline mr-1"/>:<ArrowDown size={16} className="inline mr-1"/>}{option.callChange.toFixed(2)}</div>
              </td>
              <td className="py-2">
                <div>{option.putPrice.toFixed(2)}</div>
                <div>{option.putChange > 0 ?<ArrowUp size={16} className="inline mr-1"/>:<ArrowDown size={16} className="inline mr-1"/>}{option.putChange.toFixed(2)}</div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

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
