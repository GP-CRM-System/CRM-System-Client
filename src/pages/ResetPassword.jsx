import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { resetPasswordImage, password as passwordIcon } from "../assets";
import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../api/auth";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token and verification status from location state
  const { token, verified, fullName } = location.state || {};

  useEffect(() => {
    if (!token || !verified) {
      navigate("/forgot-password");
    }
  }, [token, verified, navigate]);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const resetPasswordMutation = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("Password reset successfully! You can now login.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || error?.message || "Failed to reset password");
    },
  });

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your new password"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      setSubmitting(false);
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token,
        password: values.newPassword,
      });
    } catch (err) {
      console.error("Reset password error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!token || !verified) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="text-left mb-8">
            <h1
              className="text-[26px] sm:text-[28px] font-semibold"
              style={{ color: "var(--color-text-title)" }}
            >
              Reset Password
            </h1>
            <p
              className="text-sm sm:text-base lg:text-[20px] font-[400] mt-5"
              style={{ color: "var(--color-text-body)" }}
            >
              Hi {fullName || "there"}, please enter your new password below.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {/* New Password */}
                <div className="relative flex flex-col">
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center justify-center h-full">
                      <img
                        src={passwordIcon}
                        alt="Password icon"
                        className="w-5 h-5 opacity-60"
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
                    className="text-xs mt-2 ml-1"
                    style={{ color: "var(--color-error)" }}
                  />
                </div>

                {/* Confirm Password */}
                <div className="relative flex flex-col">
                  <div className="relative flex items-center">
                    <div className="absolute left-3 flex items-center justify-center h-full">
                      <img
                        src={passwordIcon}
                        alt="Password icon"
                        className="w-5 h-5 opacity-60"
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
                    className="text-xs mt-2 ml-1"
                    style={{ color: "var(--color-error)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 mt-10"
                  style={{ backgroundColor: "var(--color-primary-500)" }}
                  disabled={isSubmitting || resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12" style={{ backgroundColor: "var(--color-primary-500)" }}>
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