
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from './DashboardHeader';
import StatsCards from './StatsCards';
import RecentActivities from './RecentActivities';
import LeaderCard from './LeaderCard';
import MemberSlides from './MemberSlides';
import ScaleManagement from './ScaleManagement';
import MemberManagement from './MemberManagement';
import RepertoireManagement from './RepertoireManagement';
import BlockingManagement from './BlockingManagement';
import InviteManagement from './InviteManagement';
import SettingsManagement from './SettingsManagement';
import MobileNavigation from './MobileNavigation';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const isAdminOrLeader = user?.role === 'admin' || user?.role === 'leader';
  const isAdmin = user?.role === 'admin';
  const isMember = user?.role === 'member';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      <DashboardHeader setActiveTab={setActiveTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <TabsList className="grid w-full grid-cols-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="scales">Escalas</TabsTrigger>
              {isAdminOrLeader && (
                <TabsTrigger value="members">Membros</TabsTrigger>
              )}
              <TabsTrigger value="repertoire">Repertório</TabsTrigger>
              <TabsTrigger value="blocking">Bloqueios</TabsTrigger>
              {(isAdmin || user?.role === 'leader') && (
                <TabsTrigger value="invite">
                  {isAdmin ? 'Convidar Líder' : 'Convidar Colaborador'}
                </TabsTrigger>
              )}
              
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-8">
            <StatsCards />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentActivities />
              {user?.role === 'leader' && <LeaderCard />}
              {isMember && <MemberSlides />}
            </div>
          </TabsContent>

          <TabsContent value="scales">
            <ScaleManagement />
          </TabsContent>

          {isAdminOrLeader && (
            <TabsContent value="members">
              <MemberManagement />
            </TabsContent>
          )}

          <TabsContent value="repertoire">
            <RepertoireManagement />
          </TabsContent>

          <TabsContent value="blocking">
            <BlockingManagement />
          </TabsContent>

          {(isAdmin || user?.role === 'leader') && (
            <TabsContent value="invite">
              <InviteManagement />
            </TabsContent>
          )}

          <TabsContent value="settings">
            <SettingsManagement />
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Dashboard;
