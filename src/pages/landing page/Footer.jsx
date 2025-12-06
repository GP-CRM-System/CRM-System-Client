import { Link } from "react-router-dom";
import { face, insta, logoSvg, x } from "../../assets";
import { callBlue, emailBlue } from "../../assets/icons/landingPage";
import { HashLink } from "react-router-hash-link";

export default function LandingPageFooter() {
  return (
    <div id="footer" className="mx-4 sm:mx-8 md:mx-16 lg:mx-[100px] mt-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/">
            <img src={logoSvg} alt="logo" className="w-32" />
          </Link>
          <p className="max-w-full sm:max-w-[190px] text-[16px] text-[#8A8A8A] mt-5 leading-[1.6]">
            A Smart CRM System that unifies sales, accounting and HR Dashboards
          </p>
        </div>

        <div>
          <h1 className="text-[16px] text-[#4A90E2] font-medium mb-4">
            Services
          </h1>
          <ul className="space-y-3 sm:space-y-4 lg:space-y-5 mt-6 text-[16px] text-[#8A8A8A]">
            <li className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 cursor-pointer">
              Contacts
            </li>
            <li className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 cursor-pointer">
              Companies
            </li>
            <li className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 cursor-pointer">
              Deals
            </li>
            <li className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 cursor-pointer">
              Tickets
            </li>
            <li className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 cursor-pointer">
              Orders
            </li>
            <li className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 cursor-pointer">
              Employees
            </li>
            <li className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 cursor-pointer">
              Analytics
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-[16px] text-[#4A90E2] font-medium mb-4">
            Company
          </h1>
          <ul className="space-y-3 sm:space-y-4 lg:space-y-5 mt-6 text-[16px] text-[#8A8A8A]">
            <HashLink
              smooth
              to="#home"
              className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 block"
            >
              Demo
            </HashLink>

            <HashLink
              smooth
              to="#about"
              className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 block"
            >
              About
            </HashLink>

            <HashLink
              smooth
              to="#features"
              className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 block"
            >
              Features
            </HashLink>

            <HashLink
              smooth
              to="#how-it-works"
              className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 block"
            >
              How it works?
            </HashLink>

            <HashLink
              smooth
              to="#pricing"
              className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 block"
            >
              Pricing
            </HashLink>

            <HashLink
              smooth
              to="#footer"
              className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300 block"
            >
              Contact
            </HashLink>
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-2">
          <h1 className="text-[16px] text-[#4A90E2] font-medium mb-4">
            Join Nexify
          </h1>

          <label className="block mt-6 text-[16px] text-[#8A8A8A] mb-2">
            Your Email
          </label>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="text"
              className="border border-[#ccc] rounded-md px-3 py-2 w-full outline-none"
              placeholder="Enter Your Email"
            />
            <button className="bg-[#4A90E2] text-white px-6 py-2 rounded-md whitespace-nowrap hover:bg-blue-600 transition-colors duration-200">
              Subscribe
            </button>
          </div>

          <div className="flex gap-4 mt-6">
            <img
              src={insta}
              alt="Instagram"
              className="w-[40px] cursor-pointer hover:translate-y-[-3px] duration-300"
            />
            <img
              src={face}
              alt="Facebook"
              className="w-[40px] cursor-pointer hover:translate-y-[-3px] duration-300"
            />
            <img
              src={x}
              alt="X"
              className="w-[40px] cursor-pointer hover:translate-y-[-3px] duration-300"
            />
          </div>
        </div>
      </div>

      <div className="h-[0.5px] mt-12 bg-[#4A90E2]"></div>

      <div className="mt-8 mb-12 text-[#8A8A8A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <p className="text-sm sm:text-base">2026 Nexify. All rights reserved</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2">
            <img src={emailBlue} alt="email" className="w-5 h-5" />
            <span className="text-sm sm:text-base">Nexify@hello.com</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={callBlue} alt="call" className="w-5 h-5" />
            <span className="text-sm sm:text-base">+201068551047</span>
          </div>
        </div>
      </div>
    </div>
  );
}
