import { checkMark } from "../../assets/icons/landingPage";

export default function LandingPagePricing() {
  return (
    <div
      id="pricing"
      className="
    px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[100px] 
    mt-16 md:mt-20 lg:mt-31 relative

    before:content-[''] before:absolute before:top-[25%] before:left-0 
    before:h-full before:w-[70px] before:bg-[#0194FE]
    before:blur-[120px] before:opacity-30 before:hidden

    lg:before:block
  "
    >
      <h1 className="max-w-[645px] m-auto text-center  max-md:text-[28px] max-sm:text-[24px] font-medium text-[40px] mt-31">
        {" "}
        Your Choose The Perfect <span className="text-[#4A90E2]">Plan</span> For
        Your Business{" "}
      </h1>
      <div className="flex flex-col lg:flex-row gap-5 justify-center mt-12 md:mt-20 lg:mt-30 items-center lg:items-stretch">
        <div className="h-auto lg:h-[537px] w-full max-w-[399px] border-[#8A8A8A] border-1 rounded-[12px] hover:scale-105 duration-200">
          <div className="text-center mt-7">
            <h1 className="font-medium text-[32px]">Free</h1>
            <p className="mt-2 text-[20px] text-[#8A8A8A]">
              Perfect For individuals
            </p>
            <h1 className="font-medium text-[32px] mt-8">
              0${" "}
              <span className="font-medium text-[16px] text-[#8A8A8A] ">
                /month
              </span>
            </h1>
          </div>

          <div className="flex flex-col space-y-5 mt-8 px-6 text-[20px]">
            <p className="flex gap-2">
              <span>
                <img src={checkMark} alt="check mark" className="w-6 mt-1" />
              </span>
              1 User
            </p>
            <p className="flex gap-2">
              <span>
                <img src={checkMark} alt="check mark" className="w-6 mt-1" />
              </span>
              Basic data limits
            </p>
            <p className="flex gap-2">
              <span>
                <img src={checkMark} alt="check mark" className="w-6 mt-1" />
              </span>
              Contact & deal management
            </p>
            <p className="flex gap-2">
              <span>
                <img src={checkMark} alt="check mark" className="w-6 mt-1" />
              </span>
              Ideal for small teams getting started
            </p>
          </div>
          <div className="flex justify-center pb-7">
            <button className="mt-8 min-w-[349px] w-full mx-6 p-3 text-[#4A90E2] border-[1px] rounded-[8px] border-[#4A90E2] cursor-pointer ">
              Get Started
            </button>
          </div>
        </div>

        <div className="h-auto lg:h-[600px] w-full max-w-[399px] relative mt-8 lg:mt-[-32px] border-[#4A90E2] border-2 rounded-[12px] hover:scale-105 duration-200">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#4A90E2] text-white px-4 py-2 rounded-[7px] text-[18px] font-medium shadow-md">
            Most Popular
          </div>
          <div className="text-center mt-7">
            <h1 className="font-medium text-[#4A90E2] text-[32px]">Monthly</h1>
            <p className="mt-2 text-[20px] text-[#8A8A8A]">
              Best for growing businesses
            </p>
            <h1 className="font-medium text-[32px] mt-12">
              49${" "}
              <span className="font-medium text-[16px] text-[#8A8A8A] ">
                /year
              </span>
            </h1>
          </div>

          <div className="flex flex-col space-y-5 mt-12 px-6 text-[20px]">
            <p className="flex gap-2">
              <span>
                <img src={checkMark} alt="check mark" className="w-6 mt-1" />
              </span>
              1 User
            </p>
            <p className="flex gap-2">
              <span>
                <img src={checkMark} alt="check mark" className="w-6 mt-1" />
              </span>
              Basic data limits
            </p>
            <p className="flex gap-2">
              <span>
                <img src={checkMark} alt="check mark" className="w-6 mt-1" />
              </span>
              Contact & deal management
            </p>
            <p className="flex gap-2">
              <span>
                <img src={checkMark} alt="check mark" className="w-6 mt-1" />
              </span>
              Ideal for small teams getting started
            </p>
          </div>

          <div className="flex justify-center pb-7">
            <button className="mt-16 min-w-[349px] w-full mx-6 p-3 text-white bg-[#4A90E2] border-[1px] rounded-[8px] border-[#4A90E2] cursor-pointer">
              Get Started
            </button>
          </div>
        </div>

        <div className="h-auto lg:h-[537px] w-full max-w-[399px] border-[#8A8A8A] border-1 rounded-[12px] hover:scale-105 duration-200">
          <div className="text-center mt-7">
            <h1 className="font-medium text-[32px]">Yearly</h1>
            <p className="mt-2 text-[20px] text-[#8A8A8A]">
              Best for growing businesses
            </p>
            <h1 className="font-medium text-[32px] mt-8">
              49${" "}
              <span className="font-medium text-[16px] text-[#8A8A8A] ">
                /year
              </span>
            </h1>
          </div>

          <div className="flex flex-col space-y-5 mt-8 px-6 text-[20px]">
            <p className="flex gap-2">
              <span>
                <img src={checkMark} alt="check mark" className="w-6 mt-1" />
              </span>
              1 User
            </p>
            <p className="flex gap-2">
              <span>
                <img src={checkMark} alt="check mark" className="w-6 mt-1" />
              </span>
              Basic data limits
            </p>
            <p className="flex gap-2">
              <span>
                <img src={checkMark} alt="check mark" className="w-6 mt-1" />
              </span>
              Contact & deal management
            </p>
            <p className="flex gap-2">
              <span>
                <img src={checkMark} alt="check mark" className="w-6 mt-1" />
              </span>
              Ideal for small teams getting started
            </p>
          </div>

          <div className="flex justify-center pb-7">
            <button className="mt-8 min-w-[349px] w-full mx-6 p-3 text-[#4A90E2] border-[1px] rounded-[8px] border-[#4A90E2] cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
