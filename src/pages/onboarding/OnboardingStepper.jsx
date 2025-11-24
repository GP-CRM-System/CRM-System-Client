import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const steps = [
    '/onboarding/signup',
    '/onboarding/create-company',
    '/onboarding/invite',
    '/onboarding/confirm',
];

export default function OnboardingStepper() {
    const location = useLocation();
    const currentStep = steps.findIndex((step) => location.pathname.startsWith(step));
    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <div className="onboarding-stepper min-h-screen bg-gray-50 flex flex-col">
            {/* Static progress bar at top */}
            {/* <div className="w-full h-1 bg-gray-300">
                <div
                    className="h-1 bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div> */}
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
