"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Performance monitoring and optimization utilities
export const PerformanceOptimizer = () => {
  const fpsRef = useRef<HTMLDivElement>(null);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // FPS monitoring
    const updateFPS = () => {
      frameCountRef.current++;
      const currentTime = performance.now();
      
      if (currentTime - lastTimeRef.current >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / (currentTime - lastTimeRef.current));
        
        if (fpsRef.current) {
          fpsRef.current.textContent = `FPS: ${fps}`;
          
          // Color coding based on performance
          if (fps >= 55) {
            fpsRef.current.style.color = '#10b981'; // Green
          } else if (fps >= 30) {
            fpsRef.current.style.color = '#f59e0b'; // Yellow
          } else {
            fpsRef.current.style.color = '#ef4444'; // Red
          }
        }
        
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }
      
      animationFrameRef.current = requestAnimationFrame(updateFPS);
    };

    // Start FPS monitoring
    animationFrameRef.current = requestAnimationFrame(updateFPS);

    // Performance optimizations
    const optimizePerformance = () => {
      // Reduce animation complexity on low-end devices
      const deviceMemory = (navigator as { deviceMemory?: number }).deviceMemory || 8; // Default to 8GB if not available
      const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                            deviceMemory <= 4 ||
                            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (isLowEndDevice) {
        // Disable complex animations
        gsap.globalTimeline.timeScale(0.5);
        
        // Reduce particle count
        const particleElements = document.querySelectorAll('[data-particle-count]');
        particleElements.forEach(el => {
          const currentCount = parseInt(el.getAttribute('data-particle-count') || '100');
          el.setAttribute('data-particle-count', Math.floor(currentCount * 0.3).toString());
        });
      }

      // Adaptive quality based on device pixel ratio
      const pixelRatio = window.devicePixelRatio || 1;
      if (pixelRatio > 2) {
        // High DPI display optimizations
        document.documentElement.style.setProperty('--animation-quality', 'high');
      } else {
        document.documentElement.style.setProperty('--animation-quality', 'medium');
      }
    };

    optimizePerformance();

    // Memory cleanup
    const cleanup = () => {
      // Clear GSAP timelines
      gsap.killTweensOf("*");
      
      // Clear any pending animations
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    // Cleanup on unmount
    return cleanup;
  }, []);

  // Only show FPS counter in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white px-3 py-1 rounded text-xs font-mono">
      <div ref={fpsRef}>FPS: --</div>
    </div>
  );
};

// Intersection Observer for lazy loading animations
export const useIntersectionObserver = (callback: () => void, options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(element);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback, options]);

  return ref;
};

// Debounced resize handler for responsive animations
export const useDebouncedResize = (callback: () => void, delay: number = 250) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(callback, delay);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay]);
};

// Preload critical animations
export const preloadAnimations = () => {
  // Preload GSAP plugins
  if (typeof window !== 'undefined') {
    import('gsap/ScrollTrigger');
    import('gsap/TextPlugin');
  }
};

// Adaptive animation quality
export const getAnimationQuality = () => {
  if (typeof window === 'undefined') return 'medium';
  
  const connection = (navigator as { connection?: { effectiveType?: string } }).connection;
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  const isLowEndDevice = navigator.hardwareConcurrency <= 2;
  
  if (isSlowConnection || isLowEndDevice) {
    return 'low';
  } else if (navigator.hardwareConcurrency >= 8) {
    return 'high';
  } else {
    return 'medium';
  }
};

