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
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-br from-red-500 via-blue-500 to-white"
          >
            <motion.div
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="bg-gradient-to-tr from-red-500 to-blue-600 p-8 rounded-3xl shadow-2xl"
            >
              <Zap className="text-white w-20 h-20" fill="currentColor" />
            </motion.div>
            <motion.h2
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mt-6 text-2xl font-black text-white"
                        >
                          {"Loading Your Page..."}
                        </motion.h2>
          </motion.div>
        ) : null}
      </AnimatePresence>
  );
}
