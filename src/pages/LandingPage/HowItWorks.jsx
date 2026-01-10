import React from "react";
import { how, left_blur, right_blur } from "../../assets/icons/landingPage";
import { HashLink } from "react-router-hash-link";

export default function HowItWorks() {
    return (
        <div id="how-it-works" className="relative px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[100px] py-12 md:py-16 lg:py-20 overflow-hidden">
            {/* Blur Images */}
            <img 
                src={left_blur} 
                alt="" 
                className="absolute left-0 top-0 w-32 sm:w-40 md:w-48 lg:w-64 xl:w-80 -z-10 opacity-70 pointer-events-none"
            />
            <img 
                src={right_blur} 
                alt="" 
                className="absolute right-0 bottom-0 w-32 sm:w-40 md:w-48 lg:w-64 xl:w-80 -z-10 opacity-70 pointer-events-none"
            />

            <div className="max-w-[1440px] mx-auto">
                {/* Desktop Layout - Text overlaying illustration on left */}
                <div className="hidden lg:block relative">
                    {/* Full Width Illustration */}
                    <img 
                        src={how} 
                        alt="How it works - 3 step process" 
                        className="w-full h-auto object-contain"
                    />
                    
                    {/* Text overlay on left side */}
                    <div className="absolute top-0 left-0 z-10 max-w-xl p-8 lg:p-12">
                        <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[36px] text-[var(--color-text-title)]">
                            How it Works?
                        </h1>
                        <p className="text-[var(--color-text-body)] mt-4 md:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[28px] font-medium">
                            Your quick guide to setting up and managing your CRM in minutes
                        </p>
                        <HashLink to="#sign-up" smooth>
                            <button className="px-4 sm:px-6 py-2 sm:py-2.5 mt-6 md:mt-8 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base">
                                Get Started
                            </button>
                        </HashLink>
                    </div>
                </div>

                {/* Mobile Steps - Mobile Only */}
                <div className="lg:hidden">
                    <div className="max-w-full mb-8">
                        <h1 className="font-medium text-2xl sm:text-3xl md:text-4xl text-[var(--color-text-title)]">
                            How it Works?
                        </h1>
                        <p className="text-[var(--color-text-body)] mt-4 text-base sm:text-lg md:text-xl font-medium">
                            Your quick guide to setting up and managing your CRM in minutes
                        </p>
                        <HashLink to="#sign-up" smooth>
                            <button className="px-4 sm:px-6 py-2 sm:py-2.5 mt-6 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base">
                                Get Started
                            </button>
                        </HashLink>
                    </div>

                    <div className="flex flex-col gap-8 w-full max-w-md mx-auto">
                        <div className="flex items-start gap-4 bg-white/50 p-6 rounded-lg">
                            <div className="text-4xl font-bold text-blue-500 opacity-30 flex-shrink-0">1</div>
                            <div>
                                <p className="text-lg sm:text-xl font-semibold text-[var(--color-text-title)]">Sign Up</p>
                                <p className="text-sm sm:text-base text-[var(--color-text-body)] mt-2">
                                    Create your account & set up your company
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white/50 p-6 rounded-lg">
                            <div className="text-4xl font-bold text-blue-500 opacity-30 flex-shrink-0">2</div>
                            <div>
                                <p className="text-lg sm:text-xl font-semibold text-[var(--color-text-title)]">Add your Team</p>
                                <p className="text-sm sm:text-base text-[var(--color-text-body)] mt-2">
                                    Invite and organize your members
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 bg-white/50 p-6 rounded-lg">
                            <div className="text-4xl font-bold text-blue-500 opacity-30 flex-shrink-0">3</div>
                            <div>
                                <p className="text-lg sm:text-xl font-semibold text-[var(--color-text-title)]">CRM Dashboard</p>
                                <p className="text-sm sm:text-base text-[var(--color-text-body)] mt-2">
                                    Track leads, performance & activities
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}