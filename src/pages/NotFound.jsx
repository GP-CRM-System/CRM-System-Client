import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-primary-500)] text-[var(--color-white)]">
            <h1 className="text-6xl font-extrabold mb-4">404</h1>
            <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
            <p className="mb-8 text-lg text-[var(--color-primary-100)] text-center max-w-md">Sorry, the page you are looking for does not exist or has been moved.</p>
            <button
                className="bg-[var(--color-white)] text-[var(--color-primary-700)] px-6 py-3 rounded-xl font-semibold hover:bg-[var(--color-primary-100)] transition shadow-lg border-2 border-[var(--color-primary-100)]"
                onClick={() => navigate('/')}
            >
                Go Home
            </button>
        </div>
    );
}
