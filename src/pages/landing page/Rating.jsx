import { useState } from "react";
import { person1 } from "../../assets";
import { stars } from "../../assets/icons/landingPage";

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
      className="
    flex mx-[100px] flex-col items-center px-4 mt-12
    relative

    before:content-[''] before:absolute before:top-[25%] before:right-0
    before:h-full before:w-[70px] before:bg-[#0194FE]
    before:blur-[120px] before:opacity-30 before:hidden

    lg:before:block
  "
    >
      <h1 className="max-w-[628px] m-auto  text-center  max-md:text-[24px] max-sm:text-[20px] font-medium text-[36px] max-md:mt-15 mt-31">
        Success Stories From <span className="text-[#4A90E2]">Happy</span>{" "}
        Customers
      </h1>

      <div className="flex items-center gap-4">
        {/* Left button */}

        {/* Cards container: 3 fixed cards */}
        <div className="flex gap-6 mt-30">
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
    w-[400px] 
    min-h-[296px] 
    flex-col 
    ${isCenter ? "transition-transform duration-800 ease-out" : ""}
    ${translateY}
  `}
              >
                <img
                  src={stars}
                  alt="rating"
                  className="w-[180px] -ml-8  mb-3"
                />
                <p className="text-left text-[20px] max-w-[355px] text-[#6C6C6C] -mt-5 mb-12">
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
      <div className="flex w-full justify-between mt-25">
        <button
          onClick={prev}
          className="rounded-full bg-[#f8fafc] border border-[#4A90E2] text-[#4A90E2] h-[40px] w-[40px] cursor-pointer z-20"
        >
          ←
        </button>
        <button
          onClick={next}
          className="rounded-full bg-[#4A90E2] text-white h-[40px] w-[40px] cursor-pointer z-10"
        >
          →
        </button>
      </div>
    </div>
  );
}
