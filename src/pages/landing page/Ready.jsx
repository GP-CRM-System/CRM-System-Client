import { Link } from "react-router-dom";
import { crmHome } from "../../assets";

export default function LandingPgaeReady() {
  return (
    <div className="w-full bg-[#4A90E2] mt-16 md:mt-20 lg:mt-[124px] py-12 md:py-16 lg:py-20 overflow-hidden relative">
      <div className="text-center font-medium mx-auto max-w-[727px] px-4 text-2xl sm:text-3xl md:text-[36px]">
        <h1 className="text-white mt-8 md:mt-10 lg:mt-[50px]">
          Ready to turn leads into growth?
        </h1>

        <p className="text-[#E8E4E4] text-xl sm:text-2xl md:text-[28px] mt-4">
          Organize your team and boost productivity. Try Nexify free for 30 Days
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 justify-center mt-12 md:mt-16 lg:mt-22">
          <Link to="/login">
            <button className="w-full sm:w-auto sm:min-w-[221px] cursor-pointer text-[#4A90E2] font-medium text-lg md:text-[20px] bg-white py-3 rounded-[6px] hover:scale-105 duration-200">
              Start Free Trial →
            </button>
          </Link>
          <button className="w-full sm:w-auto sm:min-w-[221px] cursor-pointer text-white font-medium text-lg md:text-[20px] bg-[#4A90E2] py-3 rounded-[6px] border-1 border-white hover:scale-105 duration-200">
            Watch Demo &#9654;
          </button>
        </div>
      </div>
      <div className="hidden lg:block relative w-full">
        <img
          src={crmHome}
          alt="crm-home"
          className="
      absolute
      bottom-[-120px]
      right-[-180px]
      w-[600px]
      -rotate-[25deg]
    "
        />
      </div>
    </div>
  );
}
