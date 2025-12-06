import React from "react";
import { email as emailIcon } from "../assets";

import {forgotPassword} from "../assets";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";

const ForgotPassword = () => {
  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {};

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="text-left mb-10">
            <h1 className="text-[28px]  font-semibold text-(--color-text-title) mb-4">
              Forgot password?
            </h1>
            <p className="text-[20px] font-[400] text-[#8A8A8A] mb-[44px]">
              Enter your Details to Reset Password
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="flex flex-col gap-2 relative">
                  <div className="relative flex items-center">
                    <div className="absolute left-3 inset-y-0 flex items-center">
                      <img
                        src={emailIcon}
                        alt="Email icon"
                        className="w-5 h-5 text-gray-400"
                      />
                    </div>

                    <Field
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />
                  </div>

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-(--color-error) text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4A90E2] text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 mt-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Code"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-(--color-primary-500) items-center justify-center p-12">
        <img
          src={forgotPassword}
          alt="Forgot Password Illustration"
          className="w-full max-w-lg h-[366px]"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;