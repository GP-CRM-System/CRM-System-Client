import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { verificationCode } from "../assets";
const VerificationCode = () => {
  const initialValues = { code: ["", "", "", ""] };

  const validationSchema = Yup.object({
    code: Yup.array()
      .of(Yup.string().matches(/^[0-9]$/, "Must be a number"))
      .min(4, "Enter the full code")
      .required("Verification code is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {};

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="text-left mb-8">
            <h1 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-(--color-text-title)">
              Verification Code
            </h1>
            <p className="text-sm sm:text-base lg:text-[20px] font-[400] text-(--color-text-body) mt-5">
              A verification code has been sent to your email. Please enter the
              code to continue.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="flex justify-between">
                  {values.code.map((_, index) => (
                    <Field
                      key={index}
                      name={`code[${index}]`}
                      type="text"
                      maxLength="1"
                      placeholder="_"
                      className="w-18 h-18 text-center border border-gray-300 rounded-lg text-lg sm:text-xl focus:ring-blue-500 focus:border-blue-500 outline-none mt-5"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^[0-9]?$/.test(value)) {
                          setFieldValue(`code[${index}]`, value);
                        }
                      }}
                    />
                  ))}
                </div>

                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-(--color-error) text-xs mt-1"
                />

                <p className="text-xs sm:text-sm text-black text-center">
                  Didn’t receive the code?{" "}
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    Resend it
                  </span>
                </p>

                <button
                  type="submit"
                  className="w-full bg-[#4A90E2] text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none mt-10 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex w-1/2 bg-(--color-primary-500) items-center justify-center p-12">
        <img
          src={verificationCode}
          alt="Verification Illustration"
          className="w-full max-w-lg h-[366px]"
        />
      </div>
    </div>
  );
};

export default VerificationCode;