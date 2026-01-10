import {
    automatedTicketing,
    hrEmployee,
    salesDeals,
    smartContact,
    right_blur,
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
            h1: "Sales & Deals",
            p: "Track pipeline with boards & workflows",
        },
        {
            img: automatedTicketing,
            h1: "Automated Ticketing",
            p: "Smart routing, priorities & assignments",
        },
        {
            img: hrEmployee,
            h1: "HR & Employee",
            p: "Employee profiles, leave & performance",
        },
    ];
    return (
        <div
            id="features"
            className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[100px] mt-12 sm:mt-16 md:mt-20 lg:mt-24 pb-8 relative max-w-[1440px] mx-auto overflow-visible"
        >
            {/* Right Blur */}
            <img 
                src={right_blur} 
                alt="" 
                className="absolute right-0 top-[15%] w-32 sm:w-40 md:w-48 lg:w-64 xl:w-80 -z-10 opacity-60 pointer-events-none"
            />
            <div className="flex justify-center">
                <h1 className="max-w-[796px] mx-auto text-center text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-medium leading-tight">
                    Discover the Powerful
                    <span className="text-[#4A90E2]"> Features </span>
                    that Simplify Your Business Operation
                </h1>
            </div>
            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {featureCards.map((card, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-5    hover:shadow-md transition-shadow"
                    >
                        <img src={card.img} alt={card.h1} className="mb-5 w-16 h-16" />
                        <h1 className="font-medium text-xl sm:text-2xl text-center mb-2 whitespace-nowrap">
                            {card.h1}
                        </h1>

                        <p className="font-medium text-[#8A8A8A] text-base sm:text-lg text-center">
                            {card.p}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}