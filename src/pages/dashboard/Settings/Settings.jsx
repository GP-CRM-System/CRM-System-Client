
import { Routes, Route, Navigate } from 'react-router-dom';
import SettingsSidebar from './components/SettingsSidebar.jsx';
import ProfileForm from './Profile/ProfileForm';
import Security from './Security/Security';
import Roles from './Roles/Roles';
import Preferences from './Preferences/Preferences';
import PermissionGuard from '../../../components/guard/PermissionGuard';


const Settings = () => {
    return (
        <div className="p-2 bg-gray-50 min-h-screen flex flex-col lg:flex-row gap-6 items-start">
            <SettingsSidebar />
            
            <div className="flex-1 w-full">
                <Routes>
                    <Route path="/" element={<Navigate to="my-profile" replace />} />
                    <Route path="/my-profile" element={<ProfileForm />} />
                    <Route path="/change-password" element={<Security />} />
                    <Route 
                        path="/roles" 
                        element={
                            <PermissionGuard permission="Role.read">
                                <Roles />
                            </PermissionGuard>
                        } 
                    />
                    <Route path="/preferences" element={<Preferences />} />
                </Routes>
            </div>
        </div>
    );
};

export default Settings;
