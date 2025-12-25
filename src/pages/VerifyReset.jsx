import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyResetToken } from "../api/auth";
import { toast } from "react-hot-toast";

const VerifyReset = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract token from query params
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["verifyResetToken", token],
        queryFn: () => verifyResetToken(token),
        enabled: !!token,
        retry: false,
    });

    useEffect(() => {
        if (!token) {
            toast.error("Invalid or missing reset token");
            navigate("/forgot-password");
            return;
        }

        if (data && !isLoading) {
            // Token is valid, redirect to reset-password and pass token in state
            navigate("/reset-password", {
                replace: true,
                state: {
                    token,
                    verified: true,
                    fullName: data?.data?.fullName
                }
            });
        }
    }, [data, isLoading, token, navigate]);

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white p-6">
                <div className="w-full max-w-md text-center">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">Invalid Reset Link</h1>
                    <p className="text-gray-600 mb-8">
                        {error?.response?.data?.error || "This reset link is invalid or has expired."}
                    </p>
                    <button
                        onClick={() => navigate("/forgot-password")}
                        className="w-full text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300"
                        style={{ backgroundColor: "var(--color-primary-500)" }}
                    >
                        Request New Link
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2] mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Verifying your reset link...</p>
            </div>
        </div>
    );
};

export default VerifyReset;
