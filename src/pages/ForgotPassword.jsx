import React from "react";
import { email as emailIcon, forgotPassword as forgotPasswordImg } from "../assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword as forgotPasswordApi } from "../api/auth";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const initialValues = { email: "" };

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      toast.success(data.data || "Reset link sent to your email!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || error?.message || "Failed to send reset link");
    },
  });

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await forgotPasswordMutation.mutateAsync(values.email);
    } catch (err) {
      console.error("Forgot password error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="text-left mb-10">
            <h1
              className="text-[28px] font-semibold mb-4"
              style={{ color: "var(--color-text-title)" }}
            >
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
                        className="w-5 h-5 opacity-60"
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
                    className="text-xs mt-1"
                    style={{ color: "var(--color-error)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 mt-8"
                  style={{ backgroundColor: "var(--color-primary-500)" }}
                  disabled={isSubmitting || forgotPasswordMutation.isPending}
                >
                  {forgotPasswordMutation.isPending ? "Sending..." : "Send Code"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-8 text-center">
            <a href="/login" className="text-sm font-semibold hover:underline" style={{ color: "var(--color-primary-500)" }}>
              Back to Login
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 items-center justify-center p-12" style={{ backgroundColor: "var(--color-primary-500)" }}>
        <img
          src={forgotPasswordImg}
          alt="Forgot Password Illustration"
          className="w-full max-w-lg h-[366px]"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;