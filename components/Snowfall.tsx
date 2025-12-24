
import React, { useEffect, useState, useRef } from 'react';
import { SnowParticle } from '../types';

const Snowfall: React.FC = () => {
  const [particles, setParticles] = useState<SnowParticle[]>([]);
  const requestRef = useRef<number>();

  useEffect(() => {
    const initialParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.1 + 0.05,
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setParticles(initialParticles);

    const animate = () => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          y: p.y + p.speed > 100 ? -2 : p.y + p.speed,
          x: p.x + Math.sin(p.y / 10) * 0.02
        }))
      );
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;
