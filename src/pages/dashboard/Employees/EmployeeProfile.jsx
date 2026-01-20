import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmployeeProfile } from "./useEmployeeProfile";
import PageLayout from "../../../components/PageLayout";
import {
    Mail,
    Phone,
    Building2,
    Monitor,
    MapPin,
    Calendar,
    Trophy,
    Briefcase,
    FileText,
    Users
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { homepage, paper, people, trophy } from "../../../assets";

const performanceData = [
    { name: 'JUL', value: 5 },
    { name: 'AUG', value: 5 },
    { name: 'SEP', value: 5 },
    { name: 'OCT', value: 8 },
    { name: 'NOV', value: 38 },
];

export default function EmployeeProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { employee, isLoading, error } = useEmployeeProfile(id);

    if (isLoading) {
        return (
            <PageLayout
                breadcrumb={[
                    { text: 'Employees', link: '/dashboard/employee' },
                    { text: 'View Profile' }
                ]}
                hideSearch={true}
            >
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--color-primary-500)' }}></div>
                </div>
            </PageLayout>
        );
    }

    if (error || !employee) {
        return (
            <PageLayout
                title=""
                breadcrumb={[
                    { text: 'Employees', link: '/dashboard/employee' },
                    { text: 'View Profile' }
                ]}
                hideSearch={true}
            >
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Employee Not Found</h2>
                        <p className="text-gray-600 mb-4">The employee you're looking for doesn't exist or you don't have permission to view it.</p>
                        <button
                            onClick={() => navigate('/dashboard/employee')}
                            className="px-6 py-2 rounded-lg text-white font-medium transition-colors"
                            style={{ backgroundColor: 'var(--color-primary-500)' }}
                        >
                            Back to Employees
                        </button>
                    </div>
                </div>
            </PageLayout>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const roleName = typeof employee.role === 'object' ? employee.role?.name : 'N/A';

    return (
        <PageLayout
            title=""
            breadcrumb={[
                { text: 'Employees', link: '/dashboard/employee' },
                { text: 'View Profile' }
            ]}
            hideSearch={true}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Employee Card & Stats */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-start gap-5 mb-6">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                {employee.profileImage ? (
                                    <img src={employee.profileImage} alt={employee.fullName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                                        {employee.fullName?.charAt(0) || 'U'}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900 mb-0.5">{employee.fullName || 'N/A'}</h2>
                                <p className="text-sm text-gray-500 mb-3">{roleName}</p>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-50 text-green-600 text-xs font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    {employee.status || 'Active'}
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { label: 'Projects Completed', value: '200' },
                                { label: 'Active Projects', value: '5' },
                                { label: 'Working hours', value: '16H' },
                                { label: 'Days at Company', value: '145' }
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-[10px] text-gray-400 mb-1 leading-tight">{stat.label}</p>
                                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Overview */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-base font-bold text-gray-900 mb-6">Performance Overview</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                        domain={[0, 40]}
                                        ticks={[0, 10, 20, 30, 40]}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-base font-bold text-gray-900 mb-6">Recent Activity</h3>
                        <div className="space-y-6">
                            {[
                                {
                                    title: 'Completed project',
                                    highlight: 'Mobile App Redesign',
                                    time: '2 hours ago',
                                    icon: <img src={trophy} className="w-5 h-5 text-green-500" />,
                                    bg: 'bg-green-50'
                                },
                                {
                                    title: 'Started working on',
                                    highlight: 'Dashboard Analytics',
                                    time: '1 day ago',
                                    icon: <img src={homepage} className="w-5 h-5 text-blue-500" />,
                                    bg: 'bg-blue-50'
                                },
                                {
                                    title: 'Uploaded designs for',
                                    highlight: 'E-commerce Website',
                                    time: '5 days ago',
                                    icon: <img src={paper} className="w-5 h-5 text-orange-500" />,
                                    bg: 'bg-orange-50'
                                },
                                {
                                    title: 'Team meeting about',
                                    highlight: 'Q4 Planning',
                                    time: '8 days ago',
                                    icon: <img src={people} className="w-5 h-5 text-purple-500" />,
                                    bg: 'bg-purple-50'
                                }
                            ].map((activity, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-full ${activity.bg} flex items-center justify-center flex-shrink-0`}>
                                        {activity.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900 font-medium">
                                            {activity.title} <span className="text-blue-600">{activity.highlight}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-base font-bold text-gray-900 mb-6">Contact Information</h3>
                        <div className="space-y-5">
                            {[
                                { icon: <Mail className="w-5 h-5 text-blue-500" />, label: 'Email', value: employee.email || 'N/A' },
                                { icon: <Phone className="w-5 h-5 text-blue-500" />, label: 'Phone', value: employee.phone || 'N/A' },
                                { icon: <Building2 className="w-5 h-5 text-blue-500" />, label: 'Company', value: 'Nexify' },
                                { icon: <Monitor className="w-5 h-5 text-blue-500" />, label: 'Work Mode', value: 'Hybrid' },
                                { icon: <MapPin className="w-5 h-5 text-blue-500" />, label: 'Location', value: 'Cairo, Egypt' },
                                { icon: <Calendar className="w-5 h-5 text-blue-500" />, label: 'Joining Date', value: formatDate(employee.createdAt) }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="mt-0.5">{item.icon}</div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 mb-0.5">{item.label}</p>
                                        <p className="text-sm font-medium text-gray-900">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-base font-bold text-gray-900 mb-6">Skills</h3>
                        <div className="space-y-5">
                            {[
                                { name: 'UI Design', value: 90 },
                                { name: 'UX Research', value: 95 },
                                { name: 'Prototype', value: 80 },
                                { name: 'Figma', value: 92 },
                                { name: 'Adobe XD', value: 85 },
                                { name: 'Adobe Photoshop', value: 70 },
                                { name: 'Adobe Illustrator', value: 75 }
                            ].map((skill, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                                        <span className="text-xs font-medium text-gray-400">{skill.value}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-blue-500 transition-all duration-500"
                                            style={{ width: `${skill.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

