import { Link } from "react-router-dom";
import { crmHome, customnerFrame } from "../../assets";

export default function LandingPageHero() {
  return (
    <div
      id="home"
      className="
    mt-12 mx-[100px] sm:mt-22 px-4
    relative

    before:content-[''] before:absolute before:top-0 before:right-0
    before:h-full before:w-[70px] before:bg-[#0194FE]
    before:blur-[120px] before:opacity-30 before:hidden
    lg:before:block

    after:content-[''] after:absolute after:top-[33%] after:left-0
    after:h-full after:w-[70px] after:bg-[#0194FE]
    after:blur-[120px] after:opacity-30 after:hidden
    lg:after:block
  "
    >
      {" "}
      <div className="flex flex-col">
        <div className="flex justify-center">
          <img
            src={customnerFrame}
            alt="frame"
            className="w-[150px] sm:w-[200px] md:w-[250px]"
          />
        </div>
        <p className="text-[#8A8A8A] flex justify-center p-1 sm:p-2 mt-1 text-[12px] sm:text-[14px] md:text-[16px]">
          Using 100+ Customers
        </p>
      </div>
      <div className="flex flex-col mt-6 sm:mt-8 max-w-[90%] sm:max-w-[600px] md:max-w-[744px] m-auto">
        <h1 className="font-semibold max-md:text-[28px] max-sm:text-[24px] text-[40px] text-center">
          Manage your Entire Business From One{" "}
          <span className="text-[#4A90E2]">Nexify</span>
        </h1>

        <p className="font-medium text-[#8A8A8A] text-[16px] sm:text-[20px] md:text-[24px] text-center mt-2">
          A Smart CRM Nexify System that unifies sales, accounting and HR
          Dashboard
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center mt-6 sm:mt-8">
        <Link
          to="/login"
          className="min-w-[180px] sm:min-w-[221px] bg-[#4A90E2] font-medium text-[16px] text-center sm:text-[20px] text-white py-3 rounded-[6px] border border-[#B3B3B3] hover:scale-105 duration-200"
        >
          Start Free Trial →
        </Link>
        <button className="min-w-[180px] sm:min-w-[221px] bg-white font-medium text-[16px] sm:text-[20px] text-[#4A90E2] py-3 rounded-[6px] border border-[#B3B3B3] hover:scale-105 duration-200">
          Watch Demo &#9654;
        </button>
      </div>
      <div className="mt-8 sm:mt-16 flex justify-center">
        <img
          src={crmHome}
          alt="home image"
          className="w-full max-w-[600px] max-sm:hidden md:max-w-[1000px]"
        />
      </div>
    </div>
  );
}
