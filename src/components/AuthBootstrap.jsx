import { useEffect, useState } from 'react';
import Loader from './ui/Loader';
import useAuthStore from '../store/authStore';
import API from '../api/client';

/**
 * AuthBootstrap - Fetches user data on mount if cookies exist
 */
export default function AuthBootstrap({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // If we have user data in store, we're good
        if (isAuthenticated) {
          setIsLoading(false);
          return;
        }

        // No /auth/me endpoint exists, so we rely on persisted state
        // If cookies exist but no persisted state, user needs to login again
        console.log('AuthBootstrap: Checking persisted authentication state...');
        
      } catch (error) {
        console.log('AuthBootstrap: No active session:', error.message);
      } finally {
        setInitialized(true);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <Loader size="lg" fullScreen={true} text="Loading..." />;
  }
  
  return children;
}
