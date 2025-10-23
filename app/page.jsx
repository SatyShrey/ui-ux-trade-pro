"use client";
import {
  ArrowRight,
  BarChart2,
  Bell,
  Book,
  Globe,
  Menu,
  PieChart,
  Shield,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

const tradingFeatures = [
  {
    icon: <Globe size={32} />,
    title: "Global Markets",
    description:
      "Access a wide range of international markets and trade various assets from a single platform.",
  },
  {
    icon: <Zap size={32} />,
    title: "Real-time Data",
    description:
      "Stay informed with lightning-fast, real-time market data and instant trade execution.",
  },
  {
    icon: <Shield size={32} />,
    title: "Secure Trading",
    description:
      "Trade with confidence using our advanced encryption and multi-factor authentication system.",
  },
  {
    icon: <PieChart size={32} />,
    title: "Portfolio Analysis",
    description:
      "Gain insights into your portfolio performance with comprehensive analysis tools ans reports.",
  },
  {
    icon: <Bell size={32} />,
    title: "Price Alerts",
    description:
      "Never miss a trading opportunity with customizable price alerts and notifications.",
  },
  {
    icon: <Book size={32} />,
    title: "Trading Education",
    description:
      "Enhance your trading skills with our extensive library of educational resources and webinars.",
  },
];

const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const ininview = useInView(ref, { once: true, amount: 0 });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={ininview ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
};

const FeatureBox = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl flex flex-col items-center text-center h-full relative overflow-hidden hover:scale-105 shadow-blue-400 duration-300 hover:shadow-[0_0_20px] ">
      <div className="text-blue-500 mb-4 relative z-10">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white relative z-10">
        {title}
      </h3>
      <p className="text-gray-300 mb-4 grow relative z-10">{description}</p>
      <button className="mt-auto text-blue-500 flex items-center text-sm font-medium relative cursor-pointer">
        Learn more <ArrowRight className="ml-1" size={16} />
      </button>
    </div>
  );
};

export default function Home() {
  const [ismenuopen, setismenuopen] = useState(false);
  const containerRef = useRef(null);
  const [menuHeight, setmenuHeight] = useState(0);
  const timeOut = useRef();
  const router = useRouter();

  function toggleMenu() {
    clearTimeout(timeOut.current);
    if (ismenuopen) {
      setmenuHeight(0);
      timeOut.current = setTimeout(() => {
        setismenuopen(false);
      }, 600);
    } else {
      setmenuHeight(230);
      setismenuopen(true);
    }
  }

  return (
    <div ref={containerRef} className="bg-gray-900 min-h-screen text-white">
      <header className=" container mx-auto px-4 py-6 flex justify-between items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-blue-500 font-bold text-3xl"
        >
          TradePro
        </motion.div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {["Markets", "Tading", "Analysis", "Learn"].map((item, index) => (
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={index}
              >
                <span className="text-gray-300 hover:text-blue-500 transition-colors cursor-pointer">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </nav>
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/dashboard")}
          className="hidden md:block bg-blue-600 p-2 transition-colors duration-300 rounded hover:bg-blue-500 cursor-pointer"
        >
          Start trading
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:hidden text-white cursor-pointer active:scale-95 hover:scale-105"
          onClick={toggleMenu}
        >
          {ismenuopen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </header>
      {ismenuopen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: menuHeight }}
          transition={{ duration: 0.6 }}
          className="md:hidden bg-gray-800 overflow-hidden px-2"
        >
          <ul>
            {["Markets", "Tading", "Analysis", "Learn"].map((item, index) => (
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                key={index}
                className="my-4"
              >
                <span className="text-gray-300 hover:text-blue-500 transition-colors cursor-pointer">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 p-2 transition-colors duration-300 rounded hover:bg-blue-500 cursor-pointer active:scale-[99%] w-full"
          >
            Start trading
          </motion.button>
        </motion.div>
      )}

      <main className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center py-20">
            <h1 className="text-6xl font-bold mb-6">
              Trade Smarter, not Harder
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl text-gray-400 mb-12"
            >
              Access global markets with real-time data ande advanced trading
              tools
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded bg-blue-600 hover:bg-blue-500 flex cursor-pointer items-center mx-auto transition-colors duration-300"
            >
              Open Free Account <ArrowRight />
            </motion.button>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="py-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8">
                  Advanced Trading Tools
                </h2>
                <ul className="space-y-6">
                  {[
                    "Real-time market data",
                    "Advanced charting",
                    "Risk management tools",
                  ].map((item, index) => (
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      key={index}
                      className="flex items-center text-xl text-gray-300 hover:scale-105 duration-300 hover:text-blue-400 cursor-pointer"
                    >
                      <BarChart2 className="mr-3 text-blue-500" size={20} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-800 p-8 rounded-2xl shadow-2xl hover:scale-105 duration-300 relative overflow-hidden group"
              >
                <img
                  className="w-full rounded-2xl"
                  src="https://cdn.pixabay.com/photo/2021/08/06/00/38/stock-trading-6525084_1280.jpg"
                  alt="trading platform screen-shot"
                />
                <div className="absolute inset-0 bg-blue-800 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="py-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-800 p-8 rounded-2xl shadow-2xl hover:scale-105 duration-300 relative overflow-hidden group"
              >
                <img
                  className="w-full rounded-2xl"
                  src="https://cdn.pixabay.com/photo/2024/05/31/05/24/trading-8799817_1280.png"
                  alt="trading platform screen-shot"
                />
                <div className="absolute inset-0 bg-blue-800 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-8">
                  Market Analysis at your fingertips
                </h2>
                <p className="text-gray-300 text-xl mb-8">
                  Get in-depth market analysis and informed trading
                </p>
                <div className="flex items-center bg-gray-800 p-6 rounded-xl relative overflow-hidden group">
                  <TrendingUp
                    className="text-blue-500 mr-6 relative z-10"
                    size={48}
                  />
                  <div className="relative z-10">
                    <div className="text-blue-500 text-5xl font-bold">+500</div>
                    <p className="text-gray-300 text-xl">
                      Global markets available for trading
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-gray-900 py-20">
            <div className=" container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Why choose TradePro
                </h2>
                <p className="text-xl text-gray-300">
                  Experience the advantage of professional grade trading tools
                  and resources
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {tradingFeatures.map((item, index) => (
                  <FeatureBox
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-blue-500 rounded text-center py-12 relative overflow-hidden group">
            <div className=" absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <h2 className="font-bold text-4xl mb-6 relative z-10">
              Ready to start trading
            </h2>
            <p className="text-xl mb-8 rlative z-10">
              Join thousands of traders and start your journey to fnancial
              success.
            </p>
            <button className="bg-white text-blue-600 p-2 rounded-md text-xl font-bold hover:bg-gray-200 transition-colors duration-300 relative z-10 cursor-pointer">
              Create Free Account
            </button>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
