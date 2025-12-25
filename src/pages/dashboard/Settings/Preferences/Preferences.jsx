import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const Preferences = () => {
    const [preferences, setPreferences] = useState({
        theme: 'Light Mode',
        notification: 'In-app',
        language: 'English'
    });

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex-1 relative">
            <div className="border border-blue-500 border-dashed absolute inset-0 m-1 pointer-events-none rounded-xl opacity-20 hidden"></div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">Preferences</h2>
            <p className="text-sm text-gray-500 mb-8">Customization according to your preferences</p>

            <div className="space-y-6 max-w-2xl">
                {/* Theme Selection */}
                <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">Select Theme</label>
                    <div className="relative w-64">
                        <select
                            value={preferences.theme}
                            onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                            className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 outline-none focus:border-blue-500 cursor-pointer"
                        >
                            <option>Light Mode</option>
                            <option>Dark Mode</option>
                            <option>System Default</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                            <IoIosArrowDown />
                        </div>
                    </div>
                </div>

                {/* Notification Type */}
                <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">Notification Type</label>
                    <div className="relative w-64">
                        <select
                            value={preferences.notification}
                            onChange={(e) => setPreferences({ ...preferences, notification: e.target.value })}
                            className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 outline-none focus:border-blue-500 cursor-pointer"
                        >
                            <option>In-app</option>
                            <option>Email</option>
                            <option>Both</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                            <IoIosArrowDown />
                        </div>
                    </div>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">Language</label>
                    <div className="relative w-64">
                        <select
                            value={preferences.language}
                            onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                            className="w-full appearance-none px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 outline-none focus:border-blue-500 cursor-pointer"
                        >
                            <option>English</option>
                            <option>Arabic</option>
                            <option>French</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                            <IoIosArrowDown />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preferences;
