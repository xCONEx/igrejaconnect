
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LeaderCard: React.FC = () => {
  const { user } = useAuth();

  if (user?.role !== 'admin' && user?.role !== 'leader') {
    return null;
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Área do Líder</h3>
            <p className="text-blue-100">
              Você tem acesso completo para gerenciar escalas, membros e configurações do departamento.
            </p>
          </div>
          <div className="p-4 bg-white/20 rounded-full">
            <Users className="h-8 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderCard;
