
import React from 'react';
import { Home, Calendar, Users, Music, Ban, UserPlus, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const isAdminOrLeader = user?.role === 'admin' || user?.role === 'leader';
  const isAdmin = user?.role === 'admin';

  const navigationItems = [
    { id: 'overview', icon: Home, label: 'Início' },
    { id: 'scales', icon: Calendar, label: 'Escalas' },
    ...(isAdminOrLeader ? [{ id: 'members', icon: Users, label: 'Membros' }] : []),
    { id: 'repertoire', icon: Music, label: 'Repertório' },
    { id: 'blocking', icon: Ban, label: 'Bloqueios' },
    ...(isAdmin || user?.role === 'leader' ? [{ id: 'invite', icon: UserPlus, label: 'Convidar' }] : []),
    { id: 'settings', icon: Settings, label: 'Config' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-2 py-1 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;
