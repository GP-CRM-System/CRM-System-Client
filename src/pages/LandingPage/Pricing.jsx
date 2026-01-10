import { checkMark, left_blur } from "../../assets/icons/landingPage";
import { Link } from "react-router-dom";

export default function LandingPagePricing() {
    return (
        <div
            id="pricing"
            className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[100px] mt-12 sm:mt-16 md:mt-20 lg:mt-24 relative max-w-[1440px] mx-auto overflow-hidden"
        >
            {/* Left Blur */}
            <img 
                src={left_blur} 
                alt="" 
                className="absolute left-0 top-[20%] w-32 sm:w-40 md:w-48 lg:w-64 xl:w-80 -z-10 opacity-60 pointer-events-none"
            />
            <h1 className="max-w-[645px] mx-auto text-center text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-medium leading-tight">
                {" "}
                Your Choose The Perfect <span className="text-[#4A90E2]">Plan</span> For
                Your Business{" "}
            </h1>
            <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 justify-center mt-8 sm:mt-12 md:mt-16 lg:mt-20 items-center lg:items-stretch">
                <div className="h-auto w-full max-w-[399px] border border-[#8A8A8A] rounded-[12px] hover:scale-105 duration-200 flex flex-col">
                    <div className="text-center mt-7">
                        <h1 className="font-medium text-[28px] sm:text-[32px]">Free</h1>
                        <p className="mt-2 text-lg sm:text-[20px] text-[#8A8A8A]">
                            Perfect For individuals
                        </p>
                        <h1 className="font-medium text-[28px] sm:text-[32px] mt-6 sm:mt-8">
                            0${" "}
                            <span className="font-medium text-sm sm:text-[16px] text-[#8A8A8A] ">
                                /month
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-col space-y-4 sm:space-y-5 mt-6 sm:mt-8 px-6 text-lg sm:text-[20px]">
                        <p className="flex gap-2">
                            <span>
                                <img src={checkMark} alt="check mark" className="w-5 sm:w-6 mt-1" />
                            </span>
                            1 User
                        </p>
                        <p className="flex gap-2">
                            <span>
                                <img src={checkMark} alt="check mark" className="w-5 sm:w-6 mt-1" />
                            </span>
                            Basic data limits
                        </p>
                        <p className="flex gap-2">
                            <span>
                                <img src={checkMark} alt="check mark" className="w-5 sm:w-6 mt-1" />
                            </span>
                            Contact & deal management
                        </p>
                        <p className="flex gap-2">
                            <span>
                                <img src={checkMark} alt="check mark" className="w-5 sm:w-6 mt-1" />
                            </span>
                            Ideal for small teams getting started
                        </p>
                    </div>
                    <div className="flex justify-center pb-7 mt-auto pt-6">
                        <Link to="/login" className="w-full mx-6">
                            <button className="min-w-[280px] sm:min-w-[320px] lg:min-w-[349px] w-full p-3 text-[#4A90E2] border-[1px] rounded-[8px] border-[#4A90E2] cursor-pointer hover:bg-[#4A90E2] hover:text-white transition-all">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="h-auto w-full max-w-[399px] relative border-2 border-[#4A90E2] rounded-[12px] hover:scale-105 duration-200 flex flex-col shadow-lg">
                    <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 bg-[#4A90E2] text-white px-4 py-2 rounded-[7px] text-base sm:text-[18px] font-medium shadow-md whitespace-nowrap">
                        Most Popular
                    </div>
                    <div className="text-center mt-7">
                        <h1 className="font-medium text-[#4A90E2] text-[28px] sm:text-[32px]">Monthly</h1>
                        <p className="mt-2 text-lg sm:text-[20px] text-[#8A8A8A]">
                            Best for growing businesses
                        </p>
                        <h1 className="font-medium text-[28px] sm:text-[32px] mt-8 sm:mt-12">
                            49${" "}
                            <span className="font-medium text-sm sm:text-[16px] text-[#8A8A8A] ">
                                /year
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-col space-y-4 sm:space-y-5 mt-8 sm:mt-12 px-6 text-lg sm:text-[20px]">
                        <p className="flex gap-2">
                            <span>
                                <img src={checkMark} alt="check mark" className="w-5 sm:w-6 mt-1" />
                            </span>
                            1 User
                        </p>
                        <p className="flex gap-2">
                            <span>
                                <img src={checkMark} alt="check mark" className="w-5 sm:w-6 mt-1" />
                            </span>
                            Basic data limits
                        </p>
                        <p className="flex gap-2">
                            <span>
                                <img src={checkMark} alt="check mark" className="w-5 sm:w-6 mt-1" />
                            </span>
                            Contact & deal management
                        </p>
                        <p className="flex gap-2">
                            <span>
                                <img src={checkMark} alt="check mark" className="w-5 sm:w-6 mt-1" />
                            </span>
                            Ideal for small teams getting started
                        </p>
                    </div>

                    <div className="flex justify-center pb-7 mt-auto pt-12">
                        <Link to="/login" className="w-full mx-6">
                            <button className="min-w-[280px] sm:min-w-[320px] lg:min-w-[349px] w-full p-3 text-white bg-[#4A90E2] border-[1px] rounded-[8px] border-[#4A90E2] cursor-pointer hover:bg-[#3a7bc8] transition-all">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="h-auto w-full max-w-[399px] border border-[#8A8A8A] rounded-[12px] hover:scale-105 duration-200 flex flex-col shadow-md">
                    <div className="text-center mt-7">
                        <h1 className="font-medium text-[28px] sm:text-[32px]">Yearly</h1>
                        <p className="mt-2 text-lg sm:text-[20px] text-[#8A8A8A]">
                            Best for growing businesses
                        </p>
                        <h1 className="font-medium text-[28px] sm:text-[32px] mt-6 sm:mt-8">
                            49${" "}
                            <span className="font-medium text-sm sm:text-[16px] text-[#8A8A8A] ">
                                /year
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-col space-y-4 sm:space-y-5 mt-6 sm:mt-8 px-6 text-lg sm:text-[20px]">
                        <p className="flex gap-2">
                            <span>
                                <img src={checkMark} alt="check mark" className="w-5 sm:w-6 mt-1" />
                            </span>
                            1 User
                        </p>
                        <p className="flex gap-2">
                            <span>
                                <img src={checkMark} alt="check mark" className="w-5 sm:w-6 mt-1" />
                            </span>
                            Basic data limits
                        </p>
                        <p className="flex gap-2">
                            <span>
                                <img src={checkMark} alt="check mark" className="w-5 sm:w-6 mt-1" />
                            </span>
                            Contact & deal management
                        </p>
                        <p className="flex gap-2">
                            <span>
                                <img src={checkMark} alt="check mark" className="w-5 sm:w-6 mt-1" />
                            </span>
                            Ideal for small teams getting started
                        </p>
                    </div>

                    <div className="flex justify-center pb-7 mt-auto pt-6">
                        <Link to="/login" className="w-full mx-6">
                            <button className="min-w-[280px] sm:min-w-[320px] lg:min-w-[349px] w-full p-3 text-[#4A90E2] border-[1px] rounded-[8px] border-[#4A90E2] cursor-pointer hover:bg-[#4A90E2] hover:text-white transition-all">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}