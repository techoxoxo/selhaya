"use client";

import { useState, useEffect } from 'react';
import { ThreeSceneFallback } from './ThreeSceneFallback';

// Simple ThreeScene component that falls back to CSS animations
export const ThreeScene = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Try to load Three.js components
    const loadThreeComponents = async () => {
      try {
        await import('@react-three/fiber');
        await import('@react-three/drei');
        await import('@react-three/postprocessing');
        await import('postprocessing');
        await import('three');
        setIsLoaded(true);
      } catch (error) {
        console.warn('Three.js components not available, using fallback:', error);
        setHasError(true);
      }
    };

    loadThreeComponents();
  }, []);

  // Always use fallback for now to avoid build issues
  return <ThreeSceneFallback />;
};