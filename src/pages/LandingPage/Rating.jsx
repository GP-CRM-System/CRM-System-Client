import { useState } from "react";
import { person1 } from "../../assets";
import { stars, arrow_left, arrow_right, right_blur } from "../../assets/icons/landingPage";

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

    const prev = () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const next = () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    // Helper to get index with wrap around
    const getIndex = (offset) => {
        return (activeIndex + offset + testimonials.length) % testimonials.length;
    };

    return (
        <div
            className="flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-20 xl:px-[100px] mt-12 sm:mt-16 md:mt-20 lg:mt-24 relative max-w-[1440px] mx-auto overflow-hidden"
        >
            {/* Right Blur */}
            <img 
                src={right_blur} 
                alt="" 
                className="absolute right-0 top-[20%] w-32 sm:w-40 md:w-48 lg:w-64 xl:w-80 -z-10 opacity-60 pointer-events-none"
            />
            <h1 className="max-w-[628px] mx-auto text-center text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-medium leading-tight">
                Success Stories From <span className="text-[#4A90E2]">Happy</span>{" "}
                Customers
            </h1>

            <div className="hidden lg:flex items-center gap-4 mt-12 lg:mt-16 xl:mt-20 w-full overflow-hidden">
                {/* Cards container: 3 fixed cards */}
                <div className="flex gap-6 w-full justify-center">
                    {[-1, 0, 1].map((offset) => {
                        const item = testimonials[getIndex(offset)];
                        const isCenter = offset === 0;
                        const translateY = isCenter ? "translate-y-18" : "translate-y-0";

                        return (
                            <div
                                key={getIndex(offset)}
                                className={`
    bg-white 
    rounded-2xl 
    p-5 
    flex 
    w-full
    max-w-[400px]
    min-h-[296px] 
    flex-col 
    ${isCenter ? "transition-transform duration-800 ease-out" : ""}
    ${translateY}
  `}
                            >
                                <img
                                    src={stars}
                                    alt="rating"
                                    className="w-[180px] -ml-8 mb-3"
                                />
                                <p className="text-left text-lg sm:text-[20px] text-[#6C6C6C] -mt-5 mb-12">
                                    {item.text}
                                </p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-10 h-10 rounded-full object-cover"
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
                <div className="bg-white rounded-2xl p-5 flex flex-col min-h-[296px] mx-auto max-w-[400px]">
                    <img
                        src={stars}
                        alt="rating"
                        className="w-[180px] -ml-8 mb-3"
                    />
                    <p className="text-left text-lg text-[#6C6C6C] -mt-5 mb-12">
                        {testimonials[activeIndex].text}
                    </p>
                    <div className="flex items-center gap-3">
                        <img
                            src={testimonials[activeIndex].img}
                            alt={testimonials[activeIndex].name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex flex-col text-left">
                            <h1 className="font-semibold text-[14px]">{testimonials[activeIndex].name}</h1>
                            <p className="text-[#6C6C6C] text-[12px]">{testimonials[activeIndex].country}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex w-full justify-between mt-8 sm:mt-12 lg:mt-16 max-w-[400px] lg:max-w-full">
                <button
                    onClick={prev}
                    className="rounded-full bg-white border-2 border-[#4A90E2] h-[50px] w-[50px] cursor-pointer z-20 hover:bg-[#4A90E2] hover:scale-110 transition-all flex items-center justify-center shadow-md group"
                    aria-label="Previous"
                >
                    <img src={arrow_left} alt="Previous" className="w-6 h-6 filter group-hover:brightness-0 group-hover:invert" />
                </button>
                <button
                    onClick={next}
                    className="rounded-full bg-[#4A90E2] border-2 border-[#4A90E2] h-[50px] w-[50px] cursor-pointer z-10 hover:bg-[#3a7bc8] hover:scale-110 transition-all flex items-center justify-center shadow-md"
                    aria-label="Next"
                >
                    <img src={arrow_right} alt="Next" className="w-6 h-6 filter brightness-0 invert" />
                </button>
            </div>
        </div>
    );
}