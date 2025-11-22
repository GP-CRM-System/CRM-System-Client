import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { inviteImage , emailIcon, copy } from '../../assets';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const InviteEmployees = () => {
  const navigate = useNavigate();
  const initialValues = { link: "", email: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
    // Simulate invite success
    if (!values.email) {
        toast.error('Please enter a valid email.');
      setSubmitting(false);
      setErrors({ email: 'Email is required' });
      return;
    }
    setTimeout(() => {
      resetForm();
      setSubmitting(false);
        toast.success('Invite sent! Finalize onboarding.');
      navigate('/onboarding/confirm');
    }, 500);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="text-left mb-8">
            <h1 className="text-[28px] font-semibold text-(--color-text-title)">
              Invite your Team
            </h1>
            <p className="text-[20px] font-[400] text-(--color-text-body) mt-5">
              Invite your team using the invite code or Enter their email to
              send them an invite
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {/* Generated Link */}
                <div className="flex flex-col">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <Field
                      type="text"
                      name="link"
                      placeholder="Generated link will appear here"
                      readOnly
                      className="w-full py-3 px-4 text-gray-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyLink("https://example.com/invite")
                      }
                      className="flex items-center justify-center gap-2  bg-gray-100 w-[140px] px-3 py-[8px] mx-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition"
                    >
                      <img
                        src={copy}
                        alt="Copy"
                        className="w-3.5 h-3.5 text-gray-600"
                      />
                      <span className="text-xs font-medium text-gray-700">
                        Copy Link
                      </span>
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <div className="relative w-full">
                    <img
                      src={emailIcon}
                      alt="Email"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    />
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
                    className="text-(--color-error) text-xs mt-2 ml-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4A90E2] text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Invite"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex w-1/2 bg-(--color-primary-500) items-center justify-center p-12">
        <img
          src={inviteImage}
          alt="Invite Illustration"
          className="w-full max-w-lg h-[366px]"
        />
      </div>
    </div>
  );
};

export default InviteEmployees;