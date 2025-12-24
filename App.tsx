
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Snowfall from './components/Snowfall';
import CoupleIllustration from './components/CoupleIllustration';
import { SECTIONS } from './constants';
import { Heart, Star, Music, Volume2, VolumeX, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Smooth scroll progress for animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate current section based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const index = Math.min(
        Math.floor(v * SECTIONS.length),
        SECTIONS.length - 1
      );
      setCurrentSectionIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentSection = SECTIONS[currentSectionIndex];

  return (
    <div ref={containerRef} className="relative bg-[#051a12] min-h-[600vh]">
      <Snowfall />

      {/* Persistent Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
         {/* Decorative Twinkling Lights */}
         <div className="absolute top-10 left-0 right-0 flex justify-around opacity-50">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                    <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                </motion.div>
            ))}
         </div>
         
         {/* Big Pine Trees (Silhouettes) */}
         <div className="absolute bottom-0 left-0 opacity-20 transform translate-x-[-20%]">
            <svg width="400" height="600" viewBox="0 0 200 300">
                <path d="M100 0 L150 100 L50 100 Z" fill="#0a2e1f" />
                <path d="M100 50 L170 170 L30 170 Z" fill="#0a2e1f" />
                <path d="M100 120 L200 280 L0 280 Z" fill="#0a2e1f" />
            </svg>
         </div>
         <div className="absolute bottom-0 right-0 opacity-20 transform translate-x-[20%]">
            <svg width="400" height="600" viewBox="0 0 200 300">
                <path d="M100 0 L150 100 L50 100 Z" fill="#0a2e1f" />
                <path d="M100 50 L170 170 L30 170 Z" fill="#0a2e1f" />
                <path d="M100 120 L200 280 L0 280 Z" fill="#0a2e1f" />
            </svg>
         </div>
      </div>

      {/* Floating Couple Container */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
         <motion.div
            style={{
                y: useTransform(smoothProgress, [0, 1], [50, -50]),
                scale: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 1.2])
            }}
            className="flex flex-col items-center"
         >
            <CoupleIllustration pose={currentSection.pose} />
         </motion.div>
      </div>

      {/* Content Sections */}
      <div className="relative z-30">
        {SECTIONS.map((section, idx) => (
          <section
            key={section.id}
            className="h-screen flex items-center justify-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-center bg-black/30 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl"
            >
              <motion.h1 
                className={`text-4xl md:text-6xl font-christmas mb-6 ${section.accentColor}`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {section.title}
              </motion.h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light italic">
                {section.description}
              </p>

              {idx === 0 && (
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-12 flex flex-col items-center text-white/40"
                >
                    <span className="text-sm mb-2">Scroll kebawah ya...</span>
                    <ChevronDown size={24} />
                </motion.div>
              )}
              
              {idx === SECTIONS.length - 1 && (
                <motion.div className="mt-8 flex justify-center gap-4">
                    <Heart className="text-red-500 fill-red-500 animate-pulse" />
                    <Heart className="text-red-500 fill-red-500 animate-pulse delay-75" />
                    <Heart className="text-red-500 fill-red-500 animate-pulse delay-150" />
                </motion.div>
              )}
            </motion.div>
          </section>
        ))}
      </div>

      {/* Audio Toggle (Placeholder logic) */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors flex items-center justify-center"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Floating Decorative Elements */}
      <AnimatePresence>
        {currentSectionIndex === 5 && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 pointer-events-none z-10"
            >
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-red-500"
                        initial={{ 
                            x: Math.random() * window.innerWidth, 
                            y: window.innerHeight + 100,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{ 
                            y: -100,
                            x: (Math.random() - 0.5) * 200 + (Math.random() * window.innerWidth)
                        }}
                        transition={{ 
                            duration: Math.random() * 3 + 2, 
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    >
                        <Heart fill="currentColor" />
                    </motion.div>
                ))}
            </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-4 left-4 z-40 text-white/30 text-xs">
        Crafted with Love &bull; Christmas 2025
      </footer>
    </div>
  );
};

export default App;
