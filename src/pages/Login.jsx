import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login as loginImage, email as emailIcon, password as passwordIcon, google, facebook, twitter } from '../assets';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuthStore from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login, initiateGoogleAuth } from '../api/auth';
import { toast } from 'react-hot-toast';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const setCredentials = useAuthStore((state) => state.setCredentials);
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // React Query mutation for login
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            console.log('✅ Login response:', data);
            console.log('🍪 Cookies after login:', document.cookie);
            console.log('👤 User from response:', data?.data?.user);
            console.log('🎭 Role from user:', data?.data?.user?.role);
            console.log('🔍 Role type:', typeof data?.data?.user?.role);
            
            // Backend returns: { message, data: { token, refreshToken, user } }
            // But role might just be an ID string, not populated
            setCredentials(data);

            // If role is just an ID, fetch full profile with populated role
            const userId = data?.data?.user?._id;
            const userRole = data?.data?.user?.role;
            
            if (userId && typeof userRole === 'string') {
                console.log('⚠️ Role is not populated, fetching profile...');
                try {
                    const API = (await import('../api/client')).default;
                    const profileResponse = await API.get(`/profile/${userId}`);
                    console.log('📥 Profile response:', profileResponse.data);
                    
                    // Update credentials with populated role
                    setCredentials(profileResponse.data);
                } catch (error) {
                    console.error('❌ Failed to fetch profile:', error);
                }
            }

            toast.success("Login successful!");
            navigate('/dashboard');
        },
        onError: (error) => {
            console.error('❌ Login error:', error);
            toast.error(error?.response?.data?.message || error?.message || 'Login failed');
        },
    });

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated, navigate]);

    const initialValues = { email: '', password: '', remember: false };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const { email, password } = values;
        loginMutation.mutate({ email, password });
        setSubmitting(false);
    };

    return (
        <div className="flex min-h-screen bg-white">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="text-left mb-8">
                        <h1 className="text-[28px] font-semibold" style={{ color: 'var(--color-text-title)' }}>Welcome to our CRM</h1>
                        <h1 className="text-[28px] font-semibold" style={{ color: 'var(--color-text-title)' }}>Sign In to Latest Updates</h1>
                        <p className="text-xl font-[400] mt-5" style={{ color: 'var(--color-text-body)' }}>Enter your Details to sign in</p>
                    </div>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div className="relative">
                                    <img src={emailIcon} alt="Email icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="E-mail"
                                        className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-xs mt-1" style={{ color: 'var(--color-error)' }} />
                                </div>

                                <div className="relative">
                                    <Field
                                        type={passwordVisible ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password"
                                        className="w-full py-3 pl-4 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                    <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    <ErrorMessage name="password" component="div" className="text-xs mt-1" style={{ color: 'var(--color-error)' }} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center text-sm">
                                        <Field type="checkbox" name="remember" className="h-4 w-4 border-gray-300 rounded bg-white" style={{ accentColor: 'var(--color-primary-500)' }} />
                                        <span className="ml-2">Remember me</span>
                                    </label>
                                    <Link to="/forgot-password" className="text-sm underline" style={{ color: 'var(--color-primary-500)' }}>Forgot password?</Link>
                                </div>

                                <button type="submit" className="w-full text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300" style={{ backgroundColor: 'var(--color-primary-500)' }} disabled={isSubmitting || loginMutation.isPending}>
                                    {loginMutation.isPending ? 'Logging in...' : 'Login'}
                                </button>
                                {loginMutation.isError && <div className="text-xs mt-2" style={{ color: 'var(--color-error)' }}>{loginMutation.error?.response?.data?.message || loginMutation.error?.message || 'Login failed'}</div>}
                            </Form>
                        )}
                    </Formik>

                    <div className="text-center my-6">
                        <div className="flex items-center w-full">
                            <hr className="flex-grow border-t border-gray-200" />
                            <span className="mx-4" style={{ color: 'var(--color-text-title)' }}>Or Login With</span>
                            <hr className="flex-grow border-t border-gray-200" />
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-4">
                            <button 
                                type="button"
                                onClick={initiateGoogleAuth}
                                className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                            >
                                <img src={google} alt="Google" className="h-6 w-6" />
                            </button>
                            <button type="button" className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full text-blue-800 hover:bg-gray-50 transition-colors">
                                <img src={facebook} alt="Facebook" className="h-9 w-9" />
                            </button>
                            <button type="button" className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full text-blue-500 hover:bg-gray-50 transition-colors">
                                <img src={twitter} alt="Twitter" className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account? <Link to="/onboarding/signup" className="font-semibold underline" style={{ color: 'var(--color-primary-500)' }}>Sign up</Link>
                    </p>
                </div>
            </div>

            <div className="hidden lg:flex w-1/2 items-center justify-center p-12" style={{ backgroundColor: 'var(--color-primary-500)' }}>
                <img src={loginImage} alt="CRM Illustration" className="w-full max-w-lg h-[366px]" />
            </div>
        </div>
    );
};

export default Login;