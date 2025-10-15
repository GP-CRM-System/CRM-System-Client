import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login as loginImage, email as emailIcon, password as passwordIcon, google, facebook, twitter } from '../assets';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../store/authSlice';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated, navigate]);

    const initialValues = { email: '', password: '', remember: false };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        const { email, password } = values;
        dispatch(loginUser({ email, password }));
        setSubmitting(false);
    };

    return (
        <div className="flex min-h-screen bg-white">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="text-left mb-8">
                        <h1 className="text-[28px] font-semibold text-(--color-text-title)">Welcome to our CRM</h1>
                        <h1 className="text-[28px] font-semibold text-(--color-text-title)">Sign In to Latest Updates</h1>
                        <p className="text-xl font-[400] text-(--color-text-body) mt-5">Enter your Details to sign in</p>
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
                                    <ErrorMessage name="email" component="div" className="text-(--color-error) text-xs mt-1" />
                                </div>

                                <div className="relative">
                                    <img src={passwordIcon} alt="Password icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Field
                                        type={passwordVisible ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password"
                                        className="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                    <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    <ErrorMessage name="password" component="div" className="text-(--color-error) text-xs mt-1" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center text-sm">
                                        <Field type="checkbox" name="remember" className="h-4 w-4 border-gray-300 rounded bg-white" style={{ accentColor: 'var(--color-primary-500)' }} />
                                        <span className="ml-2">Remember me</span>
                                    </label>
                                    <Link to="/forgot-password" className="text-sm text-(--color-primary-500) underline">Forgot password?</Link>
                                </div>

                                <button type="submit" className="w-full bg-(--color-primary-500) text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300" disabled={isSubmitting || loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                                {error && <div className="text-(--color-error) text-xs mt-2">{error}</div>}
                            </Form>
                        )}
                    </Formik>

                    <div className="text-center my-6">
                        <div className="flex items-center w-full">
                            <hr className="flex-grow border-t border-gray-200" />
                            <span className="mx-4 text-(--color-text-title)">Or Login With</span>
                            <hr className="flex-grow border-t border-gray-200" />
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-4">
                            <button className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                                <img src={google} alt="Google" className="h-6 w-6" />
                            </button>
                            <button className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full text-blue-800 hover:bg-gray-50 transition-colors">
                                <img src={facebook} alt="Facebook" className="h-9 w-9" />
                            </button>
                            <button className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full text-blue-500 hover:bg-gray-50 transition-colors">
                                <img src={twitter} alt="Twitter" className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account? <Link to="/" className="font-semibold text-(--color-primary-500) underline">Sign up</Link>
                    </p>
                </div>
            </div>

            <div className="hidden lg:flex w-1/2 bg-(--color-primary-500) items-center justify-center p-12">
                <img src={loginImage} alt="CRM Illustration" className="w-full max-w-lg h-[366px]" />
            </div>
        </div>
    );
};

export default Login;