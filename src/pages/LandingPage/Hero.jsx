import { Link } from "react-router-dom";
import { crmHome, customerFrame } from "../../assets";
import { play_blue, maki_arrow_ri, left_blur, right_blur } from "../../assets/icons/landingPage";

export default function LandingPageHero() {
    return (
        <div
            id="home"
            className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[100px] relative max-w-[1440px] mx-auto overflow-hidden"
        >
            {/* Blur Images */}
            <img 
                src={left_blur} 
                alt="" 
                className="absolute left-0 top-[20%] w-32 sm:w-40 md:w-48 lg:w-64 xl:w-80 -z-10 opacity-60 pointer-events-none"
            />
            <img 
                src={right_blur} 
                alt="" 
                className="absolute right-0 top-0 w-32 sm:w-40 md:w-48 lg:w-64 xl:w-80 -z-10 opacity-60 pointer-events-none"
            />
            <div className="flex flex-col relative z-10">
                <div className="flex justify-center">
                    <img
                        src={customerFrame}
                        alt="frame"
                        className="w-[150px] sm:w-[200px] md:w-[250px]"
                    />
                </div>
                <p className="text-[var(--color-text-body)] flex justify-center p-1 sm:p-2 mt-1 text-[12px] sm:text-[14px] md:text-[16px]">
                    Trusted by 100+ Customers
                </p>
            </div>
            <div className="flex flex-col mt-6 sm:mt-8 max-w-[90%] sm:max-w-[600px] md:max-w-[744px] mx-auto">
                <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] text-center leading-tight text-[var(--color-text-title)]">
                    Manage your Entire Business From One{" "}
                    <span className="text-[#4A90E2]">Nexify</span>
                </h1>

                <p className="font-medium text-[var(--color-text-body)] 
                text-base sm:text-lg 
                md:text-xl lg:text-[24px] text-center mt-3 sm:mt-4 max-w-[700px] mx-auto">
                    A Smart CRM System that unifies sales, accounting, and HR Dashboards
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center mt-6 sm:mt-8 items-stretch sm:items-center">
                <Link
                    to="/login"
                    className="min-w-[160px] sm:min-w-[200px] lg:min-w-[221px] bg-[#4A90E2] font-medium text-base sm:text-lg lg:text-[20px] text-center text-white py-3 px-6 rounded-lg border border-transparent hover:scale-105 hover:shadow-lg duration-200 flex items-center justify-center gap-2"
                >
                    Start Free Trial
                    <img src={maki_arrow_ri} alt="arrow right" className="w-5 h-5" />
                </Link>
                <button className="min-w-[160px] sm:min-w-[200px] lg:min-w-[221px] bg-white font-medium text-base sm:text-lg lg:text-[20px] text-[#4A90E2] py-3 px-6 rounded-lg border border-[#4A90E2] hover:scale-105 hover:shadow-lg duration-200 flex items-center justify-center gap-2">
                    Watch Demo
                    <img src={play_blue} alt="play" className="w-7 h-7"/>
                </button>
            </div>
            <div className="mt-8 sm:mt-12 md:mt-16 flex justify-center mb-2">
                <img
                    src={crmHome}
                    alt="home image"
                    className=""
                />
            </div>
        </div>
    );
}