import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { register, email, password, person, phone, google, facebook, twitter } from '../../assets';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { REGISTER } from '../../api/auth';
import { toast } from 'react-hot-toast';

export default function SignUp() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const setCredentials = useAuthStore((state) => state.setCredentials);
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (isAuthenticated && user?.company) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, user, navigate]);

    const registerMutation = useMutation({
        mutationFn: REGISTER,
        onSuccess: (data) => {
            const user = data.user || data.data?.user || data.data;
            setCredentials({ user });
                toast.success('Registration successful! Please create your company.');
            navigate('/onboarding/create-company');
        },
        onError: (error) => {
                toast.error(error?.response?.data?.message || error?.message || 'Registration failed');
        },
    });

    console.log('isAuthenticated:', isAuthenticated)

    const initialValues = {
        fullName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        phone: Yup.string()
            .matches(/^\d+$/, 'Phone Number must be digits only')
            .required('Phone Number is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        terms: Yup.bool().oneOf([true], 'You must accept the terms & conditions'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        const { fullName, phone, email, password } = values;
        if (!fullName || !email || !password) {
            toast.error('Please fill all required fields.');
            setSubmitting(false);
            setErrors({
                fullName: !fullName ? 'Full Name is required' : undefined,
                email: !email ? 'Email is required' : undefined,
                password: !password ? 'Password is required' : undefined,
            });
            return;
        }
        try {
            await registerMutation.mutateAsync({ fullName, phone, email, password });
        } catch (err) {
            console.error('Registration error:', err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="text-left mb-8">
                        <h1 className="text-[28px] font-semibold text-(--color-text-title) ">Welcome to our CRM</h1>
                        <h1 className="text-[28px] font-semibold text-(--color-text-title)">Sign Up to getting started</h1>
                        <p className="text-xl font-[400] text-(--color-text-body) mt-5">Enter your Details to sign up</p>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div className="relative">
                                    <img src={person} alt="Person icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Field
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                    <ErrorMessage name="fullName" component="div" className="text-(--color-error) text-xs mt-1" />
                                </div>
                                <div className="relative">
                                    <img src={phone} alt="Phone icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Field
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                    <ErrorMessage name="phone" component="div" className="text-(--color-error) text-xs mt-1" />
                                </div>
                                <div className="relative">
                                    <img src={email} alt="Email icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="E-mail"
                                        className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-(--color-error) text-xs mt-1" />
                                </div>
                                <div className="relative">
                                    <img src={password} alt="Password icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Field
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        className="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                    <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    <ErrorMessage name="password" component="div" className="text-(--color-error) text-xs mt-1" />
                                </div>
                                <div className="relative">
                                    <img src={password} alt="Password icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Field
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        className="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                                    />
                                    <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    <ErrorMessage name="confirmPassword" component="div" className="text-(--color-error) text-xs mt-1" />
                                </div>
                                {/* Terms & Conditions Checkbox */}
                                <div className="flex items-center">
                                    <Field type="checkbox" name="terms" id="terms" className="h-4 w-4 border-gray-300 rounded bg-white focus:ring-blue-500" style={{ accentColor: 'var(--color-primary-500)' }} />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">I agree with terms & Conditions</label>
                                </div>
                                <ErrorMessage name="terms" component="div" className="text-(--color-error) text-xs mt-1" />
                                {/* Sign Up Button */}
                                <button type="submit" className="w-full bg-(--color-primary-500) text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300" disabled={isSubmitting || registerMutation.isPending}>
                                    {registerMutation.isPending ? 'Signing up...' : 'Sign up'}
                                </button>
                                {registerMutation.isError && (
                                    <div className="text-(--color-error) text-xs mt-2">
                                        {registerMutation.error?.response?.data?.message || registerMutation.error?.message || 'Registration failed'}
                                    </div>
                                )}
                            </Form>
                        )}
                    </Formik>
                    {/* Social Login Section */}
                    <div className="text-center my-6">
                        <div className="flex items-center w-full">
                            <hr className="flex-grow border-t border-gray-200" />
                            <span className="mx-4 text-gray-500">Or Login With</span>
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
                    {/* Sign In Link */}
                    <p className="text-center text-sm text-gray-600">
                        Already Have An Account? <a href="/login" className="font-semibold text-blue-600 hover:underline">Sign in</a>
                    </p>
                </div>
            </div>
            <div className="hidden lg:flex w-1/2 bg-(--color-primary-500) items-center justify-center p-12">
                <img src={register} alt="CRM Illustration" className="w-full max-w-lg h-[366px]" />
            </div>
        </div>
    );
}
