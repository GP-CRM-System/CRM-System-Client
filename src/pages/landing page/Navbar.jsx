import { useState } from "react";
import { logoSvg } from "../../assets";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="relative">
      <header className="flex justify-between items-center p-5 px-4 md:mx-[100px] max-w-[1240px]">
        <Link to="/">
          <div className="flex-shrink-0">
            <img src={logoSvg} alt="logo" className="w-34" />
          </div>
        </Link>

        <ul className="hidden md:flex space-x-10 items-center">
          <HashLink
            smooth
            to="#home"
            className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300"
          >
            Home
          </HashLink>
          <HashLink
            smooth
            to="#about"
            className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300"
          >
            About
          </HashLink>
          <HashLink
            smooth
            to="#features"
            className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300"
          >
            Feature
          </HashLink>
          <HashLink
            smooth
            to="#pricing"
            className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300"
          >
            Pricing
          </HashLink>
          <HashLink
            smooth
            to="#footer"
            className="hover:text-[#4A90E2] hover:translate-y-[-3px] duration-300"
          >
            Contact
          </HashLink>
        </ul>

        <Link to="/login">
          <div className="hidden md:block">
            <button className="text-white cursor-pointer bg-[#4A90E2] min-w-[124px] px-4 py-2 rounded-[5px]">
              Login
            </button>
          </div>
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-[#4A90E2] cursor-pointer text-2xl"
          >
            ☰
          </button>
        </div>
      </header>

      <div
        className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white z-50 transition-all duration-300 ${
          menuOpen ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex items-center justify-end gap-4 p-5">
            <button
              onClick={closeMenu}
              className="text-[#4A90E2] cursor-pointer text-2xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col flex-1 justify-center text-center px-8 space-y-6">
            <HashLink
              smooth
              to="#home"
              onClick={closeMenu}
              className="text-2xl font-semibold text-gray-700 hover:text-[#4A90E2] py-3 border-b border-gray-200 transition-colors duration-200"
            >
              Home
            </HashLink>
            <HashLink
              smooth
              to="#about"
              onClick={closeMenu}
              className="text-2xl font-semibold text-gray-700 hover:text-[#4A90E2] py-3 border-b border-gray-200 transition-colors duration-200"
            >
              About
            </HashLink>
            <HashLink
              smooth
              to="#features"
              onClick={closeMenu}
              className="text-2xl font-semibold text-gray-700 hover:text-[#4A90E2] py-3 border-b border-gray-200 transition-colors duration-200"
            >
              Feature
            </HashLink>
            <HashLink
              smooth
              to="#pricing"
              onClick={closeMenu}
              className="text-2xl font-semibold text-gray-700 hover:text-[#4A90E2] py-3 border-b border-gray-200 transition-colors duration-200"
            >
              Pricing
            </HashLink>
            <HashLink
              smooth
              to="#footer"
              onClick={closeMenu}
              className="text-2xl font-semibold text-gray-700 hover:text-[#4A90E2] py-3 border-b border-gray-200 transition-colors duration-200"
            >
              Contact
            </HashLink>

            {/* Login Button */}
            <Link to="/login" className="pt-4">
              <button
                onClick={closeMenu}
                className="text-white text-xl font-semibold bg-[#4A90E2] w-full py-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
