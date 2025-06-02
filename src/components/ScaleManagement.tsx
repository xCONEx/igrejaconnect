import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Eye, Edit, Trash2, Users, Clock, Music } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ScaleForm from './ScaleForm';
import ScaleDetails from './ScaleDetails';

interface Scale {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  status: 'Ativa' | 'Rascunho' | 'Concluída';
  teamCount: number;
}

const ScaleManagement: React.FC = () => {
  const [scales, setScales] = useState<Scale[]>([
    {
      id: '1',
      title: 'Culto de Domingo - Manhã',
      date: '2024-02-15',
      time: '09:00',
      type: 'Louvor',
      status: 'Ativa',
      teamCount: 8
    },
    {
      id: '2',
      title: 'Culto de Domingo - Noite',
      date: '2024-02-15',
      time: '19:00',
      type: 'Louvor',
      status: 'Ativa',
      teamCount: 6
    },
    {
      id: '3',
      title: 'Culto de Quarta-feira',
      date: '2024-02-12',
      time: '19:30',
      type: 'Oração',
      status: 'Concluída',
      teamCount: 4
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedScale, setSelectedScale] = useState<Scale | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleCreateScale = () => {
    setSelectedScale(null);
    setIsFormOpen(true);
  };

  const handleEditScale = (scale: Scale) => {
    setSelectedScale(scale);
    setIsFormOpen(true);
  };

  const handleViewDetails = (scale: Scale) => {
    setSelectedScale(scale);
    setIsDetailsOpen(true);
  };

  const handleDeleteScale = (scaleId: string) => {
    setScales(scales.filter(scale => scale.id !== scaleId));
    toast({
      title: "Escala excluída",
      description: "A escala foi removida com sucesso.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativa':
        return 'bg-green-100 text-green-800';
      case 'Rascunho':
        return 'bg-yellow-100 text-yellow-800';
      case 'Concluída':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gerenciar Escalas</h2>
          <p className="text-gray-600 mt-1">Crie e gerencie as escalas do seu departamento</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateScale} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="h-4 w-4 mr-2" />
              Nova Escala
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedScale ? 'Editar Escala' : 'Nova Escala'}</DialogTitle>
              <DialogDescription>
                {selectedScale ? 'Edite os detalhes da escala' : 'Crie uma nova escala para o seu departamento'}
              </DialogDescription>
            </DialogHeader>
            <ScaleForm 
              scale={selectedScale} 
              onSave={() => setIsFormOpen(false)}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Music className="h-5 w-5 text-blue-600" />
            <span>Escalas Cadastradas</span>
          </CardTitle>
          <CardDescription>
            Visualize e gerencie todas as escalas do departamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Equipe</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scales.map((scale) => (
                <TableRow key={scale.id}>
                  <TableCell className="font-medium">{scale.title}</TableCell>
                  <TableCell>{new Date(scale.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    {scale.time}
                  </TableCell>
                  <TableCell>{scale.type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scale.status)}`}>
                      {scale.status}
                    </span>
                  </TableCell>
                  <TableCell className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-500" />
                    {scale.teamCount} pessoas
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(scale)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditScale(scale)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteScale(scale.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Escala</DialogTitle>
            <DialogDescription>
              Visualize todos os detalhes da escala selecionada
            </DialogDescription>
          </DialogHeader>
          {selectedScale && (
            <ScaleDetails 
              scale={selectedScale} 
              onClose={() => setIsDetailsOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScaleManagement;
