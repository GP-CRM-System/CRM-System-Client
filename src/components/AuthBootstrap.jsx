import { useEffect, useState } from 'react';
import Loader from './Loader';

/**
 * AuthBootstrap - Simple loader while Zustand persist hydrates the store
 */
export default function AuthBootstrap({ children }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Give Zustand persist a moment to hydrate
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <Loader size="lg" fullScreen={true} text="Loading..." />;
  }
  
  return children;
}
