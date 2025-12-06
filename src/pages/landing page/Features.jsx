import {
  automatedTicketing,
  hrEmployee,
  salesDeals,
  smartContact,
} from "../../assets/icons/landingPage";

export default function LandingPageFeatures() {
  const featureCards = [
    {
      img: smartContact,
      h1: "Smart Contact",
      p: "Centralized profiles, leave tracking & performance",
    },
    {
      img: salesDeals,
      h1: "Sales & Deals ",
      p: "Track pipeline with boards & workflows",
    },
    {
      img: automatedTicketing,
      h1: "Automated Ticketing",
      p: "Smart routing, priorities & assignments",
    },
    {
      img: hrEmployee,
      h1: "HR & Employee ",
      p: "Employee profiles, leave & performance.",
    },
  ];
  return (
    <div
      id="features"
      className="
    px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[100px] relative

    before:content-[''] before:absolute before:top-[25%] before:left-0 
    before:h-full before:w-[60px] before:bg-[#0194FE] before:blur-[120px] 
    before:opacity-30 before:hidden

    lg:before:block
  "
    >
      <div className="flex justify-center">
        <h1 className="max-w-[796px] m-auto text-center max-md:text-[28px] max-sm:text-[24px] font-medium text-[40px] mt-31">
          Discover the Powerful
          <span className="text-[#4A90E2]"> Features </span>
          that Simplify Your Business Operation
        </h1>
      </div>
      <div className="mt-16 md:mt-24 lg:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureCards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-5 bg-[#f8fafc] rounded-[10px]"
          >
            <img src={card.img} alt={card.h1} className="mb-7" />
            <h1 className="font-medium text-[24px] text-center mb-2 whitespace-nowrap">
              {card.h1}
            </h1>

            <p className="font-medium text-[#8A8A8A] text-[20px] text-center">
              {card.p}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
