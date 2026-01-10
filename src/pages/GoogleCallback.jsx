import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import API from '../api/client';
import Loader from '../components/ui/Loader';
import { toast } from 'react-hot-toast';

/**
 * GoogleCallback - Handles the Google OAuth callback
 * Backend redirects here with auth data after successful Google authentication
 */
export default function GoogleCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const setCredentials = useAuthStore((state) => state.setCredentials);

    useEffect(() => {
        const handleCallback = async () => {
            try {
                console.log('Google callback - handling authentication');
                
                // Check if user data is passed in query params
                const userParam = searchParams.get('user');
                
                if (userParam) {
                    // Backend passed user data in URL
                    const userData = JSON.parse(decodeURIComponent(userParam));
                    console.log('User data from URL:', userData);
                    
                    // Fetch full profile with populated role
                    const profileResponse = await API.get(`/profile/${userData._id}`);
                    console.log('Profile response:', profileResponse.data);
                    
                    if (profileResponse.data) {
                        setCredentials(profileResponse.data);
                        toast.success('Welcome! Google sign-in successful');
                        navigate('/dashboard/home');
                    } else {
                        throw new Error('Failed to get profile data');
                    }
                } else {
                    // Fallback: Try to get user from cookies (if backend sets them)
                    // This requires /auth/me endpoint or similar
                    throw new Error('No user data received from Google authentication');
                }
            } catch (error) {
                console.error('Google auth callback error:', error);
                toast.error('Google authentication failed. Please try again.');
                navigate('/login');
            }
        };

        // Add a small delay to ensure cookies are set
        const timer = setTimeout(handleCallback, 300);
        return () => clearTimeout(timer);
    }, [navigate, setCredentials, searchParams]);

    return <Loader size="lg" fullScreen={true} text="Completing Google Sign-in..." />;
}
