import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { resetPasswordImage, password } from "../assets"

const ResetPassword = () => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Old password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your new password"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {};

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="text-left mb-8">
            <h1 className="text-[26px] sm:text-[28px] font-semibold text-(--color-text-title)">
              Reset Password
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
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {/* Old Password */}
                <div className="relative flex flex-col">
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center justify-center h-full">
                      <img
                        src={password}
                        alt="Password icon"
                        className="w-5 h-5 text-gray-400"
                      />
                    </div>
                    <Field
                      type="password"
                      name="oldPassword"
                      placeholder="Old Password"
                      className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />
                  </div>
                  <ErrorMessage
                    name="oldPassword"
                    component="div"
                    className="text-(--color-error) text-xs mt-2 ml-1"
                  />
                </div>

                {/* New Password */}
                <div className="relative flex flex-col">
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center justify-center h-full">
                      <img
                        src={password}
                        alt="Password icon"
                        className="w-5 h-5 text-gray-400"
                      />
                    </div>
                    <Field
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />
                  </div>
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-(--color-error) text-xs mt-2 ml-1"
                  />
                </div>

                {/* Confirm Password */}
                <div className="relative flex flex-col">
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center justify-center h-full">
                      <img
                        src={password}
                        alt="Password icon"
                        className="w-5 h-5 text-gray-400"
                      />
                    </div>
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-(--color-error) text-xs mt-2 ml-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4A90E2] text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 mt-10"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex w-1/2 bg-(--color-primary-500) items-center justify-center p-12">
        <img
          src={resetPasswordImage}
          alt="Reset Password Illustration"
          className="w-full max-w-lg h-[366px]"
        />
      </div>
    </div>
  );
};

export default ResetPassword;