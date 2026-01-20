import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { inviteEmployee } from "../../api/employees";
import { inviteImage, emailIcon, copy } from "../../assets";

const InviteTeam = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [inviteData, setInviteData] = useState(null);

    const inviteMutation = useMutation({
        mutationFn: inviteEmployee,
        onSuccess: (data) => {
            toast.success("Invitation sent successfully!");
            setInviteData(data.data);
            setEmail("");
            // Auto-navigate to confirm page after a short delay to show success
            setTimeout(() => {
                navigate("/onboarding/confirm");
            }, 1500);
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.error ||
                error?.message ||
                "Failed to send invitation"
            );
        },
    });

    const handleInvite = (e) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        inviteMutation.mutate(email);
    };

    const handleCopyLink = () => {
        const link = inviteData?.loginUrl || "https://nexify.com/invite";
        navigator.clipboard.writeText(link);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="text-left mb-8">
                        <h1
                            className="text-[28px] font-semibold"
                            style={{ color: "var(--color-text-title)" }}
                        >
                            Invite your Team
                        </h1>
                        <p
                            className="text-[20px] font-[400] mt-5"
                            style={{ color: "var(--color-text-body)" }}
                        >
                            Invite your team using the invite code or Enter their email to
                            send them an invite
                        </p>
                    </div>

                    <form onSubmit={handleInvite} className="space-y-6">
                        {/* Generated Link Display */}
                        <div className="relative flex items-center border border-[#4A90E2] rounded-lg bg-[var(--color-primary-100)/50] overflow-hidden">
                            <input
                                type="text"
                                value={inviteData?.loginUrl || ""}
                                placeholder="Generated link will appear here"
                                readOnly
                                className="w-full py-3.5 px-4 bg-transparent text-[#9CA3AF] outline-none text-[15px] bg-[#4A90E2] border-[#4A90E2]"
                            />
                            <button
                                type="button"
                                onClick={handleCopyLink}
                                className="flex items-center gap-2 bg-white border border-[#8A8A8A] rounded-lg px-3 py-1.5 mr-2 hover:bg-gray-50 transition-colors w-[150px]"
                            >
                                <img src={copy} alt="copy" className="w-4 h-4" />
                                <span className="text-[13px] font-medium text-[#374151]">Copy Link</span>
                            </button>
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <img src={emailIcon} alt="email" className="w-5 h-5 opacity-60" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-mail"
                                className="w-full py-3.5 pl-12 pr-4 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#4A90E2] focus:border-transparent outline-none transition-all text-[15px]"
                            />
                        </div>

                        {/* Invite Button */}
                        <button
                            type="submit"
                            disabled={inviteMutation.isPending}
                            className="w-full text-white font-semibold py-3.5 px-4 rounded-lg hover:opacity-90 transition-all text-[16px] shadow-sm"
                            style={{ backgroundColor: "#4A90E2" }}
                        >
                            {inviteMutation.isPending ? "Sending..." : "Invite"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Side - Illustration */}
            <div
                className="hidden lg:flex w-1/2 items-center justify-center p-12"
                style={{ backgroundColor: "var(--color-primary-500)" }}
            >
                <img src={inviteImage} alt="Invite Illustration" className="w-full max-w-lg" />
            </div>
        </div>
    );
};

export default InviteTeam;
