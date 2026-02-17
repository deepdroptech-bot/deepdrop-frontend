import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import  { useState, useEffect } from "react";

export default function Loader() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (

<AnimatePresence mode="wait">
  {isLoading && (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center 
                 bg-gradient-to-br from-red-600 via-blue-600 to-black"
    >
      {/* Animated Logo Container */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative p-8 rounded-3xl"
      >

        <img
          src="/images/logo.png"  // or {logo}
          alt="Logo"
          className="absolute inset-0 bg-blue-500 blur-2xl opacity-30 rounded-3xl" 
        />
      </motion.div>

      {/* Loading Text */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-2xl font-bold text-white tracking-wide"
      >
        Loading Your Page...
      </motion.h2>
    </motion.div>
  )}
</AnimatePresence>

  );
}
