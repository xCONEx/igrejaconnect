
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Music, Clock } from 'lucide-react';

const StatsCards: React.FC = () => {
  const statsCards = [
    {
      title: 'Próxima Escala',
      value: '15 Fev',
      description: 'Culto da Manhã',
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      title: 'Membros Ativos',
      value: '12',
      description: '+2 este mês',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Músicas',
      value: '45',
      description: 'No repertório',
      icon: Music,
      color: 'bg-purple-500'
    },
    {
      title: 'Bloqueios',
      value: '3',
      description: 'Este mês',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
