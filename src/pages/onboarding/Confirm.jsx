import React from "react";
import { confirm } from "../../assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ConfirmRegister = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <div className="flex flex-col items-center w-[320px] sm:w-[400px]">
        <img src={confirm} alt="Success" className="w-full h-auto mb-10" />

        <h1 className="text-[24px] font-semibold text-(--color-text-title) text-center mb-8 w-full">
          You are successfully registered!
        </h1>

        <button
          onClick={() => {
            toast.success('Onboarding complete! Welcome to your dashboard.');
            navigate("/dashboard");
          }}
          className="bg-[#4A90E2] text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-300 w-full"
        >
          Let’s Start
        </button>
      </div>
    </div>
  );
};

export default ConfirmRegister;