import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoSvg as Logo , symbolSvg as symbol } from '../assets';

export default function Landing() {
    const navigate = useNavigate();
    
    return (
        <div className="flex min-h-screen bg-white font-parkinsans">
            {/* Left Side - Form/Content */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-left mb-12">
                        <img src={Logo} alt="CRM Logo" className="h-12 w-48 mb-8" />
                        <h1 className="text-[32px] font-semibold text-gray-900 mb-2">
                            Next & Simplify
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Build meaningful customer relationships and drive business growth
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-4 mb-12">
                        <button
                            className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 shadow-sm"
                            onClick={() => navigate('/onboarding/signup')}
                        >
                            Start Free Trial
                        </button>
                        
                        <button
                            className="w-full text-blue-600 font-semibold py-4 px-6 rounded-xl hover:bg-blue-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                            onClick={() => navigate('/login')}
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-3 text-gray-500 text-sm bg-gray-50 rounded-xl px-6 py-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 bg-blue-200 rounded-full border-2 border-white shadow-sm"></div>
                            ))}
                        </div>
                        <span className="font-medium">Trusted by 500+ growing businesses</span>
                    </div>

                    {/* Footer */}
                    <footer className="mt-12 text-center">
                        <div className="text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} Nexify. All rights reserved.
                        </div>
                    </footer>
                </div>
            </div>

            {/* Right Side - Visual (matches register page style) */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 items-center justify-center p-12">
                <div className="text-center text-white max-w-lg">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-white/80 rounded-3xl backdrop-blur-sm  border border-white/90 mx-auto mb-6 flex items-center justify-center">
                            <img src={symbol} alt="Symbol" className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Streamline Your Business</h2>
                        <p className="text-blue-100 text-lg leading-relaxed">
                            Join thousands of businesses that use our platform to manage customer relationships, 
                            automate workflows, and drive sustainable growth.
                        </p>
                    </div>
                    
                    {/* Features List */}
                    <div className="space-y-4 text-left">
                        {[
                            'Customer management made simple',
                            'Real-time analytics and insights', 
                            'Team collaboration tools',
                            'Secure and reliable platform'
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center text-blue-100">
                                <span className="text-lg mr-3">✓</span>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}