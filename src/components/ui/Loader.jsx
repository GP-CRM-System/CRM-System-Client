import React from 'react';
import { symbolSvg as Logo } from '../../assets';

export default function Loader({
    size = 'lg',
    text = 'Loading...',
    fullScreen = true,
    className = ''
}) {
    const sizeClasses = {
        sm: 'h-8 w-8',
        md: 'h-12 w-12',
        lg: 'h-16 w-16',
        xl: 'h-20 w-20'
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
    };

    const containerClasses = fullScreen
        ? "w-full h-screen flex items-center justify-center bg-[var(--color-background)]"
        : "w-full h-full flex items-center justify-center";

    return (
        <div
            className={`${containerClasses} ${className}`}
            role="status"
            aria-live="polite"
            aria-label="Loading content"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <img
                        src={Logo}
                        className={`${sizeClasses[size]} animate-spin-slow text-[var(--color-primary-500)]`}
                        alt=""
                        aria-hidden="true"
                    />
                </div>

                {/* Text with fade animation */}
                <span className={`${textSizes[size]} font-semibold text-[var(--color-primary-500)] animate-pulse`}>
                    {text}
                </span>

                {/* Optional: Progress indicator dots */}
                <div className="flex gap-1" aria-hidden="true">
                    {[0, 1, 2].map((dot) => (
                        <div
                            key={dot}
                            className="h-2 w-2 bg-[var(--color-primary-500)] rounded-full animate-bounce"
                            style={{ animationDelay: `${dot * 0.2}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}