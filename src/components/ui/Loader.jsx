import React from 'react';
import { symbolSvg as Logo } from '../../assets';

/**
 * Premium Loader Component
 * Supports multiple sizes, optional text, and context-aware styling.
 */
export default function Loader({
    size = 'lg',
    text = 'Loading...',
    fullScreen = true,
    className = ''
}) {
    const sizeMap = {
        sm: { container: 'h-10 w-10', logo: 'h-6 w-6', ring: 'border-2', text: 'text-xs' },
        md: { container: 'h-16 w-16', logo: 'h-8 w-8', ring: 'border-[3px]', text: 'text-sm' },
        lg: { container: 'h-24 w-24', logo: 'h-12 w-12', ring: 'border-4', text: 'text-base' },
        xl: { container: 'h-32 w-32', logo: 'h-16 w-16', ring: 'border-[5px]', text: 'text-lg' }
    };

    const currentSize = sizeMap[size] || sizeMap.lg;

    const containerClasses = fullScreen
        ? "fixed inset-0 z-[9999] flex items-center justify-center bg-white/40 backdrop-blur-md"
        : "w-full h-full flex items-center justify-center p-4";

    return (
        <div
            className={`${containerClasses} ${className}`}
            role="status"
            aria-live="polite"
            aria-label="Loading content"
        >
            <div className="flex flex-col items-center justify-center">
                <div className={`relative flex items-center justify-center ${currentSize.container}`}>
                    {/* Animated Outer Ring */}
                    <div
                        className={`absolute inset-0 rounded-full border-transparent border-t-blue-600 border-r-blue-400/30 animate-spin ${currentSize.ring}`}
                        style={{ animationDuration: '1s' }}
                    />

                    {/* Pulsing Background Circle */}
                    <div className="absolute inset-2 bg-blue-50 rounded-full animate-pulse opacity-50" />

                    {/* Logo with slight float animation */}
                    <img
                        src={Logo}
                        className={`${currentSize.logo} relative z-10 transition-transform duration-700 hover:scale-110`}
                        style={{
                            animation: 'loader-float 3s ease-in-out infinite'
                        }}
                        alt=""
                        aria-hidden="true"
                    />
                </div>

                {text && (
                    <div className="mt-6 flex flex-col items-center">
                        <span className={`${currentSize.text} font-bold tracking-wider text-gray-800 uppercase`}>
                            {text}
                        </span>

                        {/* Shimmering Progress Bar */}
                        <div className="mt-2 w-16 h-1 bg-gray-100 rounded-full overflow-hidden relative">
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 w-1/2 rounded-full"
                                style={{
                                    animation: 'shimmer-slide 2s infinite linear'
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes loader-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes shimmer-slide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}} />
        </div>
    );
}