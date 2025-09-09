"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Simple fallback component without Three.js
export const ThreeSceneFallback = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a simple animated background
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(containerRef.current, {
      background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      duration: 3,
      ease: "power2.inOut"
    })
    .to(containerRef.current, {
      background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
      duration: 3,
      ease: "power2.inOut"
    })
    .to(containerRef.current, {
      background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
      duration: 3,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
    >
      <div className="text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Luxury Experience</h2>
        <p className="text-xl opacity-90">Immersive 3D animations loading...</p>
      </div>
    </div>
  );
};
