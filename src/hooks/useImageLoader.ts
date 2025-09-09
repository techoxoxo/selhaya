import { useState, useEffect } from 'react';

export const useImageLoader = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!src) {
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);
    setIsError(false);

    const img = document.createElement('img');
    
    const handleLoad = () => {
      setIsLoaded(true);
      setIsError(false);
    };

    const handleError = () => {
      setIsLoaded(true);
      setIsError(true);
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = src;

    // Cleanup function
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isLoaded, isError };
};

