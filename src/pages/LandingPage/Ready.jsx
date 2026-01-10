import { Link } from "react-router-dom";
import { crmHome } from "../../assets";
import { play } from "../../assets/icons/landingPage";

export default function LandingPgaeReady() {
    return (
        <div className="w-full bg-[#4A90E2] mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-[124px] py-12 md:py-16 lg:py-20 overflow-hidden relative">
            <div className="text-center font-medium mx-auto max-w-[727px] px-4">
                <h1 className="text-white mt-6 sm:mt-8 md:mt-10 lg:mt-[50px] text-2xl sm:text-3xl md:text-4xl lg:text-[36px] leading-tight">
                    Ready to turn leads into growth?
                </h1>

                <p className="text-[#E8E4E4] text-lg sm:text-xl md:text-2xl lg:text-[28px] mt-4 leading-relaxed">
                    Organize your team and boost productivity. Try Nexify free for 30 Days
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-7 justify-center mt-8 sm:mt-12 lg:mt-16 xl:mt-22">
                    <Link to="/login" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto sm:min-w-[200px] lg:min-w-[221px] cursor-pointer text-[#4A90E2] font-medium text-lg md:text-[20px] bg-white py-3 px-6 rounded-lg hover:scale-105 hover:shadow-xl duration-200 flex items-center justify-center gap-2 mx-auto">
                            Start Free Trial
                            <span className="text-xl">→</span>
                        </button>
                    </Link>
                    <button className="w-full sm:w-auto sm:min-w-[200px] lg:min-w-[221px] cursor-pointer text-white font-medium text-lg md:text-[20px] bg-transparent py-3 px-6 rounded-lg border-2 border-white hover:scale-105 hover:bg-white hover:text-[#4A90E2] duration-200 flex items-center justify-center gap-2 mx-auto sm:mx-0 group">
                        <img src={play} alt="play" className="w-5 h-5 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0" />
                        Watch Demo
                    </button>
                </div>
            </div>
            <div className="hidden xl:block relative w-full h-[400px]">
                <img
                    src={crmHome}
                    alt="crm-home"
                    className="
                        absolute
                        bottom-0
                        right-0
                        w-[500px]
                        -rotate-[25deg]
                        transform
                        translate-x-[100px]
                        translate-y-[80px]
                    "
                />
            </div>
        </div>
    );
}