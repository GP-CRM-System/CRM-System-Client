
import useProfileStore from '../../../store/profileStore';
import SettingsSidebar from './components/SettingsSidebar.jsx';
import ProfileForm from './Profile/ProfileForm';
import Security from './Security/Security';
import Roles from './Roles/Roles';
import Preferences from './Preferences/Preferences';


const Settings = () => {
    const { activeTab } = useProfileStore();

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileForm />;
            case 'security':
                return <Security />;
            case 'role':
                return <Roles />;
            case 'preferences':
                return <Preferences />;
            default:
                return <ProfileForm />;
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen flex flex-col lg:flex-row gap-6 items-start">
            <SettingsSidebar />
            {renderContent()}
        </div>
    );
};

export default Settings;
