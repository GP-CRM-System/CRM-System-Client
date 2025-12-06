export default function LandingPageAbout() {
  return (
    <div
      id="about"
      className="
        mx-[100px] max-sm:mx-[20px] px-4 mt-12 lg:mt-31 relative
        lg:after:content-[''] lg:after:absolute lg:after:right-0 lg:after:top-0 
        lg:after:h-full lg:after:w-[60px] lg:after:bg-[#0194FE] 
        lg:after:blur-[120px] lg:after:opacity-30
      "
    >
      <div>
        <h1 className="font-medium text-[28px] sm:text-[32px] lg:text-[36px]">
          About <span className="text-[#4A90E2]">Nexify</span>
        </h1>
        <p className="font-medium text-[#1A1A1A] text-[16px] sm:text-[18px] lg:text-[24px] mt-6 sm:mt-8">
          Nexify streamlines your business operations by improving workflow
          efficiency across all departments. Our platform centralizes company
          data in one secure location, eliminating silos and reducing
          redundancy. With built-in collaboration tools, your teams can work
          together seamlessly, share insights in real-time, and make data-driven
          decisions that accelerate growth
        </p>
      </div>

      <div className="mt-12 sm:mt-20 flex flex-wrap gap-4 sm:gap-6 p-3 shadow-[1px_5px_8px_#8A8A8A]">
        <div className="flex-1 min-w-[150px] sm:min-w-[200px] p-5 text-center">
          <h1 className="font-medium text-[24px] sm:text-[28px] lg:text-[36px]">
            25 M+
          </h1>
          <p className="font-medium text-[#8A8A8A] text-[16px] sm:text-[20px] lg:text-[24px]">
            Active User
          </p>
        </div>
        <div className="flex-1 min-w-[150px] sm:min-w-[200px] p-5 text-center">
          <h1 className="font-medium text-[24px] sm:text-[28px] lg:text-[36px]">
            500K+
          </h1>
          <p className="font-medium text-[#8A8A8A] text-[16px] sm:text-[20px] lg:text-[24px]">
            Deals Closed Monthly
          </p>
        </div>
        <div className="flex-1 min-w-[150px] sm:min-w-[200px] p-5 text-center">
          <h1 className="font-medium text-[24px] sm:text-[28px] lg:text-[36px]">
            $50B+
          </h1>
          <p className="font-medium text-[#8A8A8A] text-[16px] sm:text-[20px] lg:text-[24px]">
            Revenue Managed
          </p>
        </div>
        <div className="flex-1 min-w-[150px] sm:min-w-[200px] p-5 text-center">
          <h1 className="font-medium text-[24px] sm:text-[28px] lg:text-[36px]">
            300%
          </h1>
          <p className="font-medium text-[#8A8A8A] text-[16px] sm:text-[20px] lg:text-[24px]">
            Faster Sales Cycle
          </p>
        </div>
      </div>
    </div>
  );
}
