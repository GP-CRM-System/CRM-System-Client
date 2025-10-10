import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaTwitter, FaUser, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import {register} from '../assets'

const Register = () => {
    // State to manage the visibility of password fields
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    return (
        <div className="flex min-h-screen bg-white">
            
            {/* Left Half: The Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="text-left mb-8">
                        <h1 className="text-[28px] font-semibold text-(--color-text-title) font-(family-name:--font-poppins)">Welcome to our CRM</h1>
                        <h1 className="text-[28px] font-semibold text-(--color-text-title) font-(family-name:--font-poppins)">Sign Up to getting started</h1>
                        <p className="text-xl font-[400] text-(--color-text-body) mt-5 font-(family-name:--font-poppins)">Enter your Details to sign up</p>
                    </div>

                    <form className="space-y-4">
                        {/* Input Fields with Icons */}
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            />
                        </div>
                        <div className="relative">
                            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            />
                        </div>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            />
                        </div>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Password"
                                className="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            />
                            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                         <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="w-full py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                            />
                            <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Terms & Conditions Checkbox */}
                        <div className="flex items-center">
                            <input type="checkbox" id="terms" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">I agree with terms & Conditions</label>
                        </div>

                        {/* Sign Up Button */}
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
                            Sign up
                        </button>
                    </form>

                    {/* Social Login Section */}
                    <div className="text-center my-6">
                        <p className="text-gray-500">Or Login With</p>
                        <div className="flex justify-center items-center gap-4 mt-4">
                            <button className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                                <FcGoogle size={24} />
                            </button>
                            <button className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full text-blue-800 hover:bg-gray-50 transition-colors">
                                <FaFacebook size={24} />
                            </button>
                            <button className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full text-blue-500 hover:bg-gray-50 transition-colors">
                                <FaTwitter size={24} />
                            </button>
                        </div>
                    </div>
                    
                    {/* Sign In Link */}
                    <p className="text-center text-sm text-gray-600">
                        Already Have An Account? <a href="/login" className="font-semibold text-blue-600 hover:underline">Sign in</a>
                    </p>
                </div>
            </div>

            {/* Right Half: The Illustration */}
            <div className="hidden lg:flex w-1/2 bg-(--color-primary-500) items-center justify-center p-12">
                {/* Find free illustrations on sites like undraw.co, storyset.com, or freepik.com */}
                <img src={register} alt="CRM Illustration" className="w-full max-w-lg" />
            </div>
        </div>
    );
};

export default Register;