
import React from 'react';
import { motion } from 'framer-motion';

interface CoupleProps {
  pose: 'initial' | 'smiling' | 'walking' | 'sorry' | 'holding' | 'hugging';
}

const CoupleIllustration: React.FC<CoupleProps> = ({ pose }) => {
  // Simple stylized characters
  const boyVariants = {
    initial: { x: -20, y: 0, rotate: 0 },
    smiling: { x: -20, y: -5, rotate: 2 },
    walking: { x: -30, y: 0, transition: { repeat: Infinity, duration: 0.8, yoyo: true } },
    sorry: { x: -15, y: 10, rotate: -5 },
    holding: { x: -15, y: 0, rotate: 2 },
    hugging: { x: -5, y: 0, rotate: 5 },
  };

  const girlVariants = {
    initial: { x: 20, y: 0, rotate: 0 },
    smiling: { x: 20, y: -5, rotate: -2 },
    walking: { x: 30, y: 0, transition: { repeat: Infinity, duration: 0.8, yoyo: true, delay: 0.4 } },
    sorry: { x: 15, y: 0, rotate: 0 },
    holding: { x: 15, y: 0, rotate: -2 },
    hugging: { x: 5, y: 0, rotate: -5 },
  };

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Glow Effect */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-48 h-48 bg-yellow-200 rounded-full blur-3xl opacity-30" 
      />

      <div className="relative flex items-end justify-center h-full pb-10 gap-2">
        {/* Boy Character */}
        <motion.div
          animate={boyVariants[pose]}
          className="relative flex flex-col items-center"
        >
          {/* Hat */}
          <div className="w-12 h-8 bg-red-600 rounded-t-full relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-sm" />
          </div>
          {/* Face */}
          <div className="w-10 h-10 bg-[#ffe0bd] rounded-full mt-[-2px] border-2 border-[#f1c27d] relative overflow-hidden">
             {/* Eyes */}
             <div className="absolute top-4 left-2 w-1.5 h-1.5 bg-black rounded-full" />
             <div className="absolute top-4 right-2 w-1.5 h-1.5 bg-black rounded-full" />
             {/* Smile */}
             <motion.div 
               animate={{ height: pose === 'smiling' ? 4 : 1 }}
               className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-red-400 rounded-full" 
             />
          </div>
          {/* Scarf */}
          <div className="w-12 h-4 bg-green-700 rounded-full mt-[-4px] z-10" />
          {/* Body */}
          <div className="w-14 h-16 bg-red-700 rounded-b-lg rounded-t-sm" />
        </motion.div>

        {/* Girl Character */}
        <motion.div
          animate={girlVariants[pose]}
          className="relative flex flex-col items-center"
        >
           {/* Bow or Hat */}
           <div className="w-12 h-8 bg-red-600 rounded-t-full relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-sm" />
          </div>
          {/* Face */}
          <div className="w-10 h-10 bg-[#ffe0bd] rounded-full mt-[-2px] border-2 border-[#f1c27d] relative overflow-hidden">
             {/* Eyes */}
             <div className="absolute top-4 left-2 w-1.5 h-1.5 bg-black rounded-full" />
             <div className="absolute top-4 right-2 w-1.5 h-1.5 bg-black rounded-full" />
             {/* Smile */}
             <motion.div 
               animate={{ height: pose === 'smiling' ? 4 : 1 }}
               className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-red-400 rounded-full" 
             />
          </div>
          {/* Scarf */}
          <div className="w-12 h-4 bg-white rounded-full mt-[-4px] z-10 border border-gray-200" />
          {/* Body */}
          <div className="w-14 h-16 bg-green-800 rounded-b-lg rounded-t-sm" />
        </motion.div>

        {/* Props based on pose */}
        {pose === 'holding' && (
             <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
             >
                <div className="text-red-500 text-2xl">❤️</div>
             </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoupleIllustration;
