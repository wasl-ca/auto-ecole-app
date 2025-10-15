// src/components/common/FancyLoader.jsx
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );
}
