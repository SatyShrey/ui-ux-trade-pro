"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart2,
  Bell,
  BookOpen,
  ChevronRight,
  DollarSign,
  Globe,
  PieChart,
  Plus,
  Search,
  ShoppingCart,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

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
      className="flex justify-between items-center p-4 bg-gray-900 text-white sticky top-0"
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

const TabSection = () => {
  const [activetab, setactivetab] = useState("Stocks");
  return (
    <motion.div {...fadeinup} className="border-b border-gray-700">
      <div className="mx-auto container">
        <ul className="flex nobar overflow-x-scroll">
          {["Stocks", "Mutual Funds", "ETFs", "Future and Options"].map(
            (tab) => (
              <motion.li
                onClick={() => {
                  setactivetab(tab);
                }}
                key={tab}
                className={`py-2 px-4 cursor-pointer whitespace-nowrap hover:font-semibold ${
                  activetab === tab
                    ? "border-b-2 text-blue-500 border-blue-500"
                    : "text-gray-300 hover:text-blue-500 transition-colors"
                }`}
              >
                {tab}
              </motion.li>
            )
          )}
        </ul>
      </div>
    </motion.div>
  );
};

const generateRandom = (value) => {
  const change = (Math.random() * 2 - 1) * 100;
  const percentageChange = (change / value) * 100;
  return { change, percentageChange };
};

const MarketIndices = () => {
  const [marketdata, setmarketdata] = useState([
    { name: "NIFTY50", value: 20300, change: 0, percentageChange: 0 },
    { name: "BANKNIFTY", value: 50500, change: 0, percentageChange: 0 },
    { name: "SENSEX", value: 30400, change: 0, percentageChange: 0 },
  ]);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setmarketdata((prevdata) =>
        prevdata.map((index) => {
          const { change, percentageChange } = generateRandom(index.value);
          const newValue = index.value + change;
          return { ...index, value: newValue, change, percentageChange };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div
      {...fadeinup}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4"
    >
      {marketdata.map((index) => (
        <motion.div
          onClick={() => router.push(`/dashboard/${index.name}`)}
          whileHover={{ scale: 1.05 }}
          key={index.name}
          className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        >
          <h3 className="font-semibold text-xl text-gray-300">{index.name}</h3>
          <div className="flex items-center space-x-2 justify-between">
            <span className="text-lg text-white">
              {index.value.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span
              className={`flex text-sm items-center ${
                index.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {index.change >= 0 ? <ArrowUpRight /> : <ArrowDownRight />}
              {index.change.toFixed(2)} ( {index.percentageChange.toFixed(2)}% )
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const StockCard = ({ name, initialPrice }) => {
  const [price, setprice] = useState(initialPrice);
  const [change, setchange] = useState(0);
  const [percentageChange, setpercentageChange] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      const { change: randomChange, percentageChange: randomPercentageChange } =
        generateRandom(price);
      setprice((prev) => prev + randomChange);
      setchange(randomChange);
      setpercentageChange(randomPercentageChange);
    }, 1000);
    return () => clearInterval(interval);
  }, [price]);

  return (
    <motion.div
      onClick={() => router.push(`/dashboard/${name}`)}
      className="bg-gray-800 p-4 rounded-lg hover:bg-blue-500/10 hover:scale-105 duration-300 cursor-pointer"
    >
      <h3 className="text-white font-semibold">{name}</h3>
      <div className="flex justify-between">
        <span className="flex items-center justify-between text-white">
          {price.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </span>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`flex text-sm items-center ${
            change >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change >= 0 ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}
          {change.toFixed(2)} ( {percentageChange.toFixed(2)}% )
        </motion.span>
      </div>
    </motion.div>
  );
};

const MostBought = () => {
  return (
    <motion.div {...fadeinup} className="my-8">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold text-white">
          Most Bought on TradePro
        </h2>
        <motion.a
          href="#"
          className="text-blue-500 text-sm hover:underline flex items-center"
        >
          View All <ChevronRight size={16} className="ml-1" />
        </motion.a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StockCard name={"Reliance"} initialPrice={1200} />
        <StockCard name={"Zomato"} initialPrice={1200} />
        <StockCard name={"Tata Consultancy"} initialPrice={1200} />
        <StockCard name={"Airtel"} initialPrice={1200} />
      </div>
    </motion.div>
  );
};

const ProductAndTools = () => {
  const products = [
    { name: "F&O", icon: BarChart2 },
    { name: "IPO", icon: DollarSign },
    { name: "ETFs", icon: PieChart },
    { name: "FDs", icon: TrendingUp },
    { name: "US Stock", icon: Activity },
  ];

  return (
    <motion.div {...fadeinup} className="my-8">
      <h2 className="font-semibold text-xl text-white">Product And Tools</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <motion.div
            key={product.name}
            whileHover={{ scale: 1.05 }}
            className=" hover:shadow-xl hover:bg-blue-500/10 text-center bg-gray-800 p-4 rounded-lg shadow-lg transition-all cursor-pointer rotate-parent"
          >
            <motion.div className="w-12 h-12 rounded-full m-auto flex items-center justify-center mb-2 rotate-child duration-500 bg-blue-600">
              <product.icon className="text-white" />
            </motion.div>
            <span className="text-gray-300">{product.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const TopGainer = () => {
  return (
    <motion.div {...fadeinup} className="my-8">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold text-white">Top Gainer</h2>
        <motion.a
          href="#"
          className="text-blue-500 text-sm hover:underline flex items-center"
        >
          See more
          <ChevronRight size={16} className="ml-1" />
        </motion.a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StockCard name={"HDFC"} initialPrice={1200} />
        <StockCard name={"MARUTISUZUKI"} initialPrice={1200} />
        <StockCard name={"ICICI"} initialPrice={1200} />
        <StockCard name={"TRENT"} initialPrice={1200} />
      </div>
    </motion.div>
  );
};

const companies = [
  { name: "HDFC", descriptions: "", mkc: 1523456.65 },
  { name: "TCS", descriptions: "", mkc: 1523456.65 },
  { name: "AXISBANK", descriptions: "", mkc: 1523456.65 },
  { name: "ADANIPOWER", descriptions: "", mkc: 1523456.65 },
  { name: "TATAMotors", descriptions: "", mkc: 1523456.65 },
];

const TopByMarket = () => {
  return (
    <motion.div {...fadeinup} className="py-4">
      <h2 className="text-xl font-semibold text-white mb-4">
        Top by Market Cap
      </h2>
      <div className="space-y-4">
        {companies.map((item, index) => (
          <motion.div
            key={index}
            className="px-4 rounded-sm bg-gray-800 cursor-pointer h-14 overflow-hidden hover:h-28 duration-300"
          >
            <div className="flex justify-between h-14 items-center">
              <span className="text-white font-semibold">{item.name}</span>
              <span className="flex items-center">
                {item.mkc} CR <Plus className="ml-1 text-blue-600" />
              </span>
            </div>
            <div className="gap-1 cursor-pointer flex items-center">
              <button className="text-white flex items-center gap-1 cursor-pointer bg-blue-500 px-3 py-2 rounded-full">
                View details
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen w-screen overflow-x-hidden">
      <Header />
      <main className="mx-auto container px-2">
        <TabSection />
        <MarketIndices />
        <MostBought />
        <ProductAndTools />
        <TopGainer />
        <TopByMarket />
      </main>
    </div>
  );
}
