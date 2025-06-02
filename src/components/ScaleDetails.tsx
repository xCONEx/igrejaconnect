import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Calendar, Music, CheckCircle, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';

interface ScaleDetailsProps {
  scale: any;
  onClose: () => void;
}

const ScaleDetails: React.FC<ScaleDetailsProps> = ({ scale, onClose }) => {
  const [showTeamByDepartment, setShowTeamByDepartment] = useState(false);

  // Mock data organizado por departamentos
  const teamByDepartment = {
    'LOUVOR': [
      { name: 'João Silva', role: 'Guitarra', status: 'Confirmado' },
      { name: 'Maria Santos', role: 'Vocal Principal', status: 'Confirmado' },
      { name: 'Ana Costa', role: 'Teclado', status: 'Confirmado' }
    ],
    'LOUVOR - JUNIORES': [
      { name: 'Pedro Junior', role: 'Violão', status: 'Confirmado' },
      { name: 'Sofia Lima', role: 'Vocal', status: 'Pendente' }
    ],
    'MÍDIA': [
      { name: 'Carlos Lima', role: 'Operador de Som', status: 'Bloqueado' },
      { name: 'Rafael Santos', role: 'Projeção', status: 'Confirmado' }
    ],
    'MÍDIA - JUNIORES': [
      { name: 'Lucas Oliveira', role: 'Câmera', status: 'Confirmado' }
    ]
  };

  // Mock data para demonstração
  const scaleDetails = {
    sections: [
      {
        id: '1',
        title: 'Preparação',
        description: 'Atividades de preparação antes do culto',
        items: [
          { 
            id: '1', 
            title: 'Chegada e preparação dos instrumentos', 
            time: '08:00', 
            responsible: 'João Silva',
            status: 'Confirmado',
            notes: 'Verificar afinação do violão'
          },
          { 
            id: '2', 
            title: 'Ensaio das músicas', 
            time: '08:30', 
            responsible: 'Maria Santos',
            status: 'Pendente',
            notes: 'Revisar cifras'
          }
        ]
      },
      {
        id: '2',
        title: 'Louvor',
        description: 'Momento de louvor e adoração',
        items: [
          { 
            id: '3', 
            title: 'Abertura com oração', 
            time: '09:00', 
            responsible: 'Pastor João',
            status: 'Confirmado',
            notes: ''
          },
          { 
            id: '4', 
            title: 'Grande é o Senhor', 
            time: '09:05', 
            responsible: 'Ana Costa',
            status: 'Confirmado',
            notes: 'Tom: G'
          },
          { 
            id: '5', 
            title: 'Quão Grande é o Meu Deus', 
            time: '09:10', 
            responsible: 'Carlos Lima',
            status: 'Bloqueado',
            notes: 'Substituir por Pedro'
          }
        ]
      },
      {
        id: '3',
        title: 'Ministração',
        description: 'Momento da palavra e ministração',
        items: [
          { 
            id: '6', 
            title: 'Palavra do Pastor', 
            time: '09:30', 
            responsible: 'Pastor João',
            status: 'Confirmado',
            notes: 'Tema: Fé e Esperança'
          },
          { 
            id: '7', 
            title: 'Oração final', 
            time: '10:15', 
            responsible: 'Pastor João',
            status: 'Confirmado',
            notes: ''
          }
        ]
      }
    ],
    team: [
      { name: 'João Silva', role: 'Guitarra', status: 'Confirmado' },
      { name: 'Maria Santos', role: 'Vocal', status: 'Confirmado' },
      { name: 'Ana Costa', role: 'Teclado', status: 'Confirmado' },
      { name: 'Carlos Lima', role: 'Baixo', status: 'Bloqueado' },
      { name: 'Pedro Oliveira', role: 'Bateria', status: 'Pendente' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return 'bg-green-100 text-green-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Bloqueado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmado':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Pendente':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Bloqueado':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{scale.title}</h2>
          <div className="flex items-center space-x-4 mt-2 text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(scale.date).toLocaleDateString('pt-BR')}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {scale.time}
            </div>
            <Badge variant="outline">{scale.type}</Badge>
          </div>
        </div>
        <Badge className={getStatusColor(scale.status)}>
          {scale.status}
        </Badge>
      </div>

      {/* Equipe Escalada com opção de visualização por departamento */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Equipe Escalada</span>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTeamByDepartment(!showTeamByDepartment)}
            >
              {showTeamByDepartment ? (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Ver por Função
                </>
              ) : (
                <>
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Ver por Departamento
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showTeamByDepartment ? (
            <div className="space-y-6">
              {Object.entries(teamByDepartment).map(([department, members]) => (
                members.length > 0 && (
                  <div key={department}>
                    <h4 className="font-semibold text-lg text-gray-800 mb-3 border-b border-gray-200 pb-2">
                      {department}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {members.map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(member.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                              {member.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {scaleDetails.team.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(member.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Estrutura Detalhada */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Music className="h-5 w-5 mr-2 text-purple-600" />
          Estrutura da Escala
        </h3>
        
        {scaleDetails.sections.map((section) => (
          <Card key={section.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{section.title}</CardTitle>
              {section.description && (
                <p className="text-sm text-gray-600">{section.description}</p>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {item.time}
                        </div>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-1" />
                          {item.responsible}
                        </div>
                        {item.notes && (
                          <p className="text-sm text-gray-500 italic">{item.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botão Fechar */}
      <div className="flex justify-end pt-6 border-t">
        <Button onClick={onClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
};

export default ScaleDetails;
