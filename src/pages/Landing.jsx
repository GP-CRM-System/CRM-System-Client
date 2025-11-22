import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoSvg as Logo } from '../assets';

export default function Landing() {
    const navigate = useNavigate();
    
    return (
        <div className="landing-page min-h-screen bg-white flex flex-col items-center justify-center px-6 py-8">
            {/* Logo */}
            <div className="mb-16">
                <img src={Logo} alt="CRM Logo" className="h-16 w-48" />
            </div>

            {/* Main Content */}
            <div className="text-center max-w-md">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Next & Simplify
                </h1>

                {/* Description */}
                <p className="text-gray-600 mb-12 text-lg leading-relaxed">
                    Build meaningful customer relationships and drive business growth
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-4 mb-16">
                    <button
                        className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                        onClick={() => navigate('/onboarding/signup')}
                    >
                        Start Free Trial
                    </button>
                    
                    <button
                        className="text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                        onClick={() => navigate('/login')}
                    >
                        Sign In
                    </button>
                </div>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-3 text-gray-500 text-sm">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-6 h-6 bg-blue-200 rounded-full border-2 border-white"></div>
                        ))}
                    </div>
                    <span>Trusted by 500+ businesses</span>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-16">
                <div className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Nexify
                </div>
            </footer>
        </div>
    );
}