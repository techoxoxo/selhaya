"use client";

import { useEffect } from 'react';
import { ThreeSceneFallback } from './ThreeSceneFallback';

// Simple ThreeScene component that falls back to CSS animations
export const ThreeScene = () => {
  useEffect(() => {
    // Try to load Three.js components in the background
    const loadThreeComponents = async () => {
      try {
        await import('@react-three/fiber');
        await import('@react-three/drei');
        await import('@react-three/postprocessing');
        await import('postprocessing');
        await import('three');
        console.log('Three.js components loaded successfully');
      } catch (error) {
        console.warn('Three.js components not available, using fallback:', error);
      }
    };

    loadThreeComponents();
  }, []);

  // Always use fallback for now to avoid build issues
  return <ThreeSceneFallback />;
};