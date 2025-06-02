
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const RecentActivities: React.FC = () => {
  const recentActivities = [
    { action: 'Nova escala criada para Fevereiro', time: '2 horas atrás', type: 'success' },
    { action: 'Maria Santos bloqueou dia 15/02', time: '1 dia atrás', type: 'warning' },
    { action: 'Música "Grande é o Senhor" adicionada', time: '3 dias atrás', type: 'info' },
    { action: 'João Silva confirmou presença', time: '1 semana atrás', type: 'success' }
  ];

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-purple-600" />
          <span>Atividades Recentes</span>
        </CardTitle>
        <CardDescription>
          Últimas atualizações do sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
