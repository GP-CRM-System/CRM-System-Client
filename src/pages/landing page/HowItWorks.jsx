import React from "react";
import Xarrow from "react-xarrows";

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="mx-[100px] mt-31">
      {/* Section Title */}
      <div className="max-w-xl mb-16">
        <h1 className="font-medium text-[36px]">How it Works?</h1>
        <p className="text-[#8A8A8A] mt-6 mqx-w-[715px] text-[28px] font-medium">
          Your quick guide to setting up and managing your CRM in minutes
        </p>
        <button className=" px-6 py-2 mt-22 border border-blue-500 text-blue-600 rounded-lg">
          Get Started
        </button>
      </div>

      <div className="relative w-full h-[450px]">
        {/* SVG Curved Line */}

        {/* Step 1 */}
        <div className="relative w-full h-[500px]">
          {/* Step 1 */}
          <div id="step1" className="absolute left-[30px] top-[330px]">
            <div className="w-6 h-6 bg-white border-2 border-blue-500 rounded-lg"></div>
            <div className="mt-4">
              <p className="text-xl font-semibold">Sign Up</p>
              <p className="text-gray-500 w-40">
                Create your account & set up your company
              </p>
            </div>
            <div className="absolute text-[110px] text-[#4A90E2] opacity-20  font-bold -z-10 -top-20 left-4">
              1
            </div>
          </div>

          {/* Step 2 */}
          <div id="step2" className="absolute left-[450px] top-[230px]">
            <div className="w-6 h-6 bg-white border-2 border-blue-500 rounded-lg"></div>
            <div className="mt-4">
              <p className="text-xl font-semibold">Add your Team</p>
              <p className="text-gray-500 w-48">
                Invite and organize your members
              </p>
            </div>
            <div className="absolute text-[110px] text-[#4A90E2] opacity-20 font-bold -z-10 -top-20 left-4">
              2
            </div>
          </div>

          {/* Step 3 */}
          <div id="step3" className="absolute left-[900px] top-[60px]">
            <div className="w-6 h-6 bg-white border-2 border-blue-500 rounded-lg"></div>
            <div className="mt-4">
              <p className="text-xl font-semibold">CRM Dashboard</p>
              <p className="text-gray-500 w-48">
                Track leads, performance & activities
              </p>
            </div>
            <div className="absolute text-[110px] text-[#4A90E2] opacity-20  font-bold -z-10 -top-20 left-4">
              3
            </div>
          </div>

          {/* Xarrows */}
          <Xarrow
            start="step1"
            end="step2"
            curveness={3}
            color="#3B82F6"
            strokeWidth={2}
            showHead={false}
            startAnchor="left" // تبدأ قبل العنصر 20px
            endAnchor="right"
          />

          <Xarrow
            start="step2"
            end="step3"
            curveness={0.5}
            color="#3B82F6"
            strokeWidth={2}
            headSize={0}
          />
        </div>
      </div>
    </div>
  );
}
