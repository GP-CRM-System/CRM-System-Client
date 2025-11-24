import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { 
  businessIcon,
  companies as companyIcon, 
  employee as employeesIcon
  } from "../../assets";
import { createCompany } from "../../api/company";
import { type as companyTypes } from "../../constant/company";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { toast } from "react-hot-toast";

const CreateCompany = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  console.log('user22', user);
  
  const createCompanyMutation = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
        toast.success('Company created! Invite your team.');
      navigate("/onboarding/invite");
    },
    onError: (error) => {
        toast.error(error?.response?.data?.message || error?.message || 'Failed to create company');
    },
  });

  const initialValues = {
    companyName: "",
    numberOfEmployees: "",
    businessType: "",
    owner: "",
    email: "",
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company name is required"),
    numberOfEmployees: Yup.number()
      .typeError("Must be a number")
      .required("Number of employees is required"),
    businessType: Yup.string().required("Business type is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    if (!values.companyName || !values.email) {
      toast.error('Please fill all required fields.');
      setSubmitting(false);
      setErrors({ companyName: !values.companyName ? 'Company name is required' : undefined, email: !values.email ? 'Email is required' : undefined });
      return;
    }
    try {
      await createCompanyMutation.mutateAsync({
        name: values.companyName,
        numberOfEmployees: Number(values.numberOfEmployees),
        type: values.businessType,
        email: values.email,
        owner: user?._id,
      });
      resetForm();
    } catch (error) {
      console.error("Failed to create company:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="text-left mb-8">
            <h1 className="text-[28px] font-semibold text-(--color-text-title)">
              Create Company
            </h1>
            <p className="text-[20px] font-[400] text-(--color-text-body) mt-5">
              Enter your Details to create Company
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form className="space-y-6">
                {/* Company Name */}
                <div className="flex flex-col">
                  <div className="relative w-full">
                    <img
                      src={companyIcon}
                      alt="Company icon"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    />
                    <Field
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />
                  </div>
                  <ErrorMessage
                    name="companyName"
                    component="div"
                    className="text-(--color-error) text-xs mt-2 ml-1"
                  />
                </div>

                {/* Number of Employees */}
                <div className="flex flex-col">
                  <div className="relative w-full">
                    <img
                      src={employeesIcon || ""}
                      alt="Employees icon"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    />
                    <Field
                      type="text"
                      name="numberOfEmployees"
                      placeholder="Number of Employees"
                      className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />
                  </div>
                  <ErrorMessage
                    name="numberOfEmployees"
                    component="div"
                    className="text-(--color-error) text-xs mt-2 ml-1"
                  />
                </div>

                {/* Business Type */}
                <div className="flex flex-col">
                  <div className="relative w-full">
                    <img
                      src={businessIcon || ""}
                      alt="Business icon"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    />
                    <Field
                      as="select"
                      name="businessType"
                      className={`w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300 ${!values.businessType ? 'text-gray-400' : 'text-gray-900'}`}
                    >
                      <option value="" disabled>Select Business Type</option>
                      {companyTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Field>
                  </div>
                  <ErrorMessage
                    name="businessType"
                    component="div"
                    className="text-(--color-error) text-xs mt-2 ml-1"
                  />
                </div>

                {/* Company Email */}
                <div className="flex flex-col">
                  <div className="relative w-full">
                    <img
                      src={businessIcon || ""}
                      alt="Email icon"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    />
                    <Field
                      type="email"
                      name="email"
                      placeholder="Company Email"
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
                  disabled={isSubmitting || createCompanyMutation.isPending}
                >
                  {createCompanyMutation.isPending ? "Submitting..." : "Complete Registration"}
                </button>
                {createCompanyMutation.isError && (
                  <div className="text-(--color-error) text-xs mt-2 ml-1">
                    {createCompanyMutation.error?.response?.data?.message || createCompanyMutation.error?.message || "Failed to create company"}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex w-1/2 bg-(--color-primary-500) items-center justify-center p-12">
        <img
          src={createCompany}
          alt="Create Company Illustration"
          className="w-full max-w-lg h-[366px]"
        />
      </div>
    </div>
  );
};

export default CreateCompany;