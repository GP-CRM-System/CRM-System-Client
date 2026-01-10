import { Link } from "react-router-dom";
import { face, insta, logoSvg, x } from "../../assets";
import { callBlue, emailBlue } from "../../assets/icons/landingPage";
import { HashLink } from "react-router-hash-link";

export default function LandingPageFooter() {
    return (
        <div id="footer" className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[100px] mt-16 sm:mt-20 md:mt-24 pb-4 max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-8 lg:gap-10 xl:gap-12">
                <div className="sm:col-span-2 lg:col-span-1">
                    <Link to="/" className="inline-block">
                        <img src={logoSvg} alt="logo" className="w-28 sm:w-32" />
                    </Link>
                    <p className="max-w-full sm:max-w-[220px] text-sm sm:text-[16px] text-[#8A8A8A] mt-4 sm:mt-5 leading-[1.6]">
                        A Smart CRM System that unifies sales, accounting and HR Dashboards
                    </p>
                </div>

                <div className="mt-4 sm:mt-0">
                    <h1 className="text-[16px] sm:text-[18px] text-[#4A90E2] font-medium mb-3 sm:mb-4">
                        Services
                    </h1>
                    <ul className="space-y-2 sm:space-y-3 lg:space-y-4 mt-4 sm:mt-6 text-[14px] sm:text-[16px] text-[#8A8A8A]">
                        <li className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 cursor-pointer">
                            Contacts
                        </li>
                        <li className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 cursor-pointer">
                            Companies
                        </li>
                        <li className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 cursor-pointer">
                            Deals
                        </li>
                        <li className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 cursor-pointer">
                            Tickets
                        </li>
                        <li className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 cursor-pointer">
                            Orders
                        </li>
                        <li className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 cursor-pointer">
                            Employees
                        </li>
                        <li className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 cursor-pointer">
                            Analytics
                        </li>
                    </ul>
                </div>

                <div className="mt-4 sm:mt-0">
                    <h1 className="text-[16px] sm:text-[18px] text-[#4A90E2] font-medium mb-3 sm:mb-4">
                        Company
                    </h1>
                    <ul className="space-y-2 sm:space-y-3 lg:space-y-4 mt-4 sm:mt-6 text-[14px] sm:text-[16px] text-[#8A8A8A]">
                        <HashLink
                            smooth
                            to="#home"
                            className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 block"
                        >
                            Demo
                        </HashLink>

                        <HashLink
                            smooth
                            to="#about"
                            className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 block"
                        >
                            About
                        </HashLink>

                        <HashLink
                            smooth
                            to="#features"
                            className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 block"
                        >
                            Features
                        </HashLink>

                        <HashLink
                            smooth
                            to="#how-it-works"
                            className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 block"
                        >
                            How it works?
                        </HashLink>

                        <HashLink
                            smooth
                            to="#pricing"
                            className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 block"
                        >
                            Pricing
                        </HashLink>

                        <HashLink
                            smooth
                            to="#footer"
                            className="hover:text-[#4A90E2] hover:translate-x-1 transition-all duration-300 block"
                        >
                            Contact
                        </HashLink>
                    </ul>
                </div>

                <div className="sm:col-span-2 lg:col-span-2 mt-4 sm:mt-0">
                    <h1 className="text-[16px] sm:text-[18px] text-[#4A90E2] font-medium mb-3 sm:mb-4">
                        Join Nexify
                    </h1>

                    <label className="block mt-4 sm:mt-6 text-[14px] sm:text-[16px] text-[#8A8A8A] mb-2">
                        Your Email
                    </label>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <input
                            type="email"
                            className="border border-[#ccc] rounded-md px-3 py-2.5 w-full outline-none focus:border-[#4A90E2] focus:ring-1 focus:ring-[#4A90E2] transition-all text-sm sm:text-base"
                            placeholder="Enter Your Email"
                        />
                        <button className="bg-[#4A90E2] text-white px-6 py-2.5 rounded-md whitespace-nowrap hover:bg-[#3a7bc8] hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base font-medium">
                            Subscribe
                        </button>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <img
                            src={insta}
                            alt="Instagram"
                            className="w-[36px] sm:w-[40px] cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300"
                        />
                        <img
                            src={face}
                            alt="Facebook"
                            className="w-[36px] sm:w-[40px] cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300"
                        />
                        <img
                            src={x}
                            alt="X"
                            className="w-[36px] sm:w-[40px] cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>

            <div className="h-[0.5px] mt-10 sm:mt-12 bg-[#4A90E2]"></div>

            <div className="mt-6 sm:mt-8 mb-8 sm:mb-12 text-[#8A8A8A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                <p className="text-xs sm:text-sm md:text-base">2026 Nexify. All rights reserved</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                        <img src={emailBlue} alt="email" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base break-all sm:break-normal">Nexify@hello.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={callBlue} alt="call" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base">+201068551047</span>
                    </div>
                </div>
            </div>
        </div>
    );
}