import { useState } from "react";
import { person1 } from "../../assets";
import { stars, arrow_right, right_blur, arrow1, left_blur } from "../../assets/icons/landingPage";

export default function LandingPageRating() {
    const testimonials = [
        {
            img: person1,
            name: "Ahmed SaMy",
            country: "Egypt",
            text: "User-friendly CRM that makes client management simple and efficient",
        },
        {
            img: person1,
            name: "Sara Ali",
            country: "Egypt",
            text: "Efficient tool to manage all customer interactions in one place",
        },
        {
            img: person1,
            name: "Mohamed Adel",
            country: "Egypt",
            text: "Made our workflow much smoother and easier to handle",
        },
        {
            img: person1,
            name: "Laila Hassan",
            country: "Egypt",
            text: "Efficient tool to manage all customer interactions in one place",
        },
        {
            img: person1,
            name: "Youssef Samir",
            country: "Egypt",
            text: "Efficient tool to manage all customer interactions in one place",
        },
        {
            img: person1,
            name: "Mona Tamer",
            country: "Egypt",
            text: "Efficient tool to manage all customer interactions in one place",
        },
        {
            img: person1,
            name: "Hany Farouk",
            country: "Egypt",
            text: "Efficient tool to manage all customer interactions in one place",
        },
        {
            img: person1,
            name: "Nadia Khaled",
            country: "Egypt",
            text: "Efficient tool to manage all customer interactions in one place",
        },
        {
            img: person1,
            name: "Omar Said",
            country: "Egypt",
            text: "Efficient tool to manage all customer interactions in one place",
        },
        {
            img: person1,
            name: "Dina Fathy",
            country: "Egypt",
            text: "Efficient tool to manage all customer interactions in one place",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    
    // Calculate which group (0-3) the current testimonial belongs to
    // Each group has 2-3 testimonials (10 testimonials / 4 groups)
    const getActiveGroup = () => {
        return Math.floor(activeIndex / 2.5); // Groups: 0-2, 3-4, 5-7, 8-9
    };

    const prev = () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const next = () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };
    
    // Jump to a specific group's first testimonial
    const jumpToGroup = (groupIndex) => {
        const groupStarts = [0, 3, 5, 8]; // Start index for each group
        setActiveIndex(groupStarts[groupIndex]);
    };

    // Helper to get index with wrap around
    const getIndex = (offset) => {
        return (activeIndex + offset + testimonials.length) % testimonials.length;
    };

    return (
        <div
            className="flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[100px] mt-12 sm:mt-16 md:mt-20 lg:mt-24 pb-8 relative max-w-[1440px] mx-auto overflow-visible"
        >
            {/* Blur Images */}
            <img 
                src={left_blur} 
                alt="" 
                className="absolute left-0 top-[15%] w-40 sm:w-48 md:w-56 lg:w-72 xl:w-96 -z-10 opacity-50 pointer-events-none"
            />
            <img 
                src={right_blur} 
                alt="" 
                className="absolute right-0 top-[20%] w-40 sm:w-48 md:w-56 lg:w-72 xl:w-96 -z-10 opacity-50 pointer-events-none"
            />
            
            <h1 className="max-w-[628px] mx-auto text-center text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-medium leading-tight">
                Success Stories From <span className="text-[#4A90E2]">Happy</span>{" "}
                Customers
            </h1>

            <div className="hidden lg:flex items-center gap-4 mt-12 lg:mt-16 xl:mt-20 w-full overflow-visible">
                {/* Cards container: 3 fixed cards */}
                <div className="flex gap-6 w-full justify-center items-start">
                    {[-1, 0, 1].map((offset) => {
                        const item = testimonials[getIndex(offset)];
                        const isCenter = offset === 0;

                        return (
                            <div
                                key={getIndex(offset)}
                                className={`bg-white rounded-2xl p-6 flex w-full max-w-[400px] min-h-[296px] flex-col shadow-lg transition-all duration-500 ease-out ${
                                    isCenter ? "-translate-y-8 scale-105" : "translate-y-0 scale-100 opacity-90"
                                }`}
                            >
                                <div className="overflow-hidden mb-2">
                                    <img
                                        src={stars}
                                        alt="rating"
                                        className="w-[140px] h-auto"
                                    />
                                </div>
                                <p className="text-left text-lg text-[#6C6C6C] mb-auto flex-grow">
                                    {item.text}
                                </p>
                                <div className="flex items-center gap-3 mt-6">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div className="flex flex-col text-left">
                                        <h1 className="font-semibold text-[14px]">{item.name}</h1>
                                        <p className="text-[#6C6C6C] text-[12px]">{item.country}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Mobile version - single card */}
            <div className="lg:hidden w-full mt-8">
                <div className="bg-white rounded-2xl p-6 flex flex-col min-h-[296px] mx-auto max-w-[400px] shadow-lg">
                    <div className="overflow-hidden mb-2">
                        <img
                            src={stars}
                            alt="rating"
                            className="w-[140px] h-auto"
                        />
                    </div>
                    <p className="text-left text-lg text-[#6C6C6C] mb-auto flex-grow">
                        {testimonials[activeIndex].text}
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                        <img
                            src={testimonials[activeIndex].img}
                            alt={testimonials[activeIndex].name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex flex-col text-left">
                            <h1 className="font-semibold text-[14px]">{testimonials[activeIndex].name}</h1>
                            <p className="text-[#6C6C6C] text-[12px]">{testimonials[activeIndex].country}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex w-full justify-between items-center mt-8 sm:mt-12 lg:mt-16 max-w-[400px] lg:max-w-full px-4 sm:px-0 pb-4">
                <button
                    onClick={prev}
                    className="rounded-full bg-white border-2 border-[#4A90E2] h-[50px] w-[50px] min-h-[50px] min-w-[50px] flex-shrink-0 hover:bg-[#4A90E2] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-lg group cursor-pointer"
                    aria-label="Previous"
                >
                    <img 
                        src={arrow1} 
                        alt="Previous" 
                        className="w-5 h-5 filter group-hover:brightness-0 group-hover:invert transition-all duration-300 pointer-events-none" 
                    />
                </button>
                
                {/* Indicator Rectangles */}
                <div className="flex gap-2.5 items-center">
                    {[0, 1, 2, 3].map((groupIndex) => {
                        const isActive = getActiveGroup() === groupIndex;
                        return (
                            <button
                                key={groupIndex}
                                onClick={() => jumpToGroup(groupIndex)}
                                className={`transition-all duration-300 cursor-pointer bg-[#4A90E2] ${
                                    isActive
                                        ? "w-9 h-1 bg-[#4A90E2] shadow-md"
                                        : "w-10 h-1 bg-[#4A90E2]/60"
                                }`}
                                aria-label={`Go to group ${groupIndex + 1}`}
                            />
                        );
                    })}
                </div>
                
                <button
                    onClick={next}
                    className="rounded-full bg-[#4A90E2] border-2 border-[#4A90E2] h-[50px] w-[50px] min-h-[50px] min-w-[50px] flex-shrink-0 hover:bg-[#3a7bc8] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer"
                    aria-label="Next"
                >
                    <img 
                        src={arrow_right} 
                        alt="Next" 
                        className="w-5 h-5 filter brightness-0 invert pointer-events-none" 
                    />
                </button>
            </div>

            
        </div>
    );
}