import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Settings, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import SettingsManagement from './SettingsManagement';

type DashboardHeaderProps = {
  setActiveTab: (value: string) => void;
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ setActiveTab }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bem-vindo, <span className="font-medium">{user?.name}</span> - {user?.department}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Desktop - com texto */}
            <div className="hidden md:flex items-center space-x-3">
              <Button value="settings" variant="outline" size="sm" onClick={() => setActiveTab("settings")}>
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
            
            {/* Mobile - só ícones */}
            <div className="md:hidden flex items-center space-x-2">
              <Button value="settings" variant="outline" size="sm" onClick={() => setActiveTab("settings")}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>



      
    </div>
  );
};

export default DashboardHeader;
