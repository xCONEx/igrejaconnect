
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle, X, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Blocking {
  id: string;
  memberName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
  requestDate: string;
  notes?: string;
}

const BlockingManagement: React.FC = () => {
  const [blockings, setBlockings] = useState<Blocking[]>([
    {
      id: '1',
      memberName: 'João Silva',
      startDate: '2024-02-15',
      endDate: '2024-02-15',
      reason: 'Viagem a trabalho',
      status: 'Pendente',
      requestDate: '2024-02-10',
      notes: 'Viagem para São Paulo'
    },
    {
      id: '2',
      memberName: 'Maria Santos',
      startDate: '2024-02-20',
      endDate: '2024-02-25',
      reason: 'Férias',
      status: 'Aprovado',
      requestDate: '2024-02-05',
      notes: 'Viagem em família'
    },
    {
      id: '3',
      memberName: 'Pedro Oliveira',
      startDate: '2024-02-12',
      endDate: '2024-02-12',
      reason: 'Compromisso familiar',
      status: 'Aprovado',
      requestDate: '2024-02-08',
      notes: 'Casamento do primo'
    }
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newBlocking, setNewBlocking] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    notes: ''
  });

  const handleCreateBlocking = () => {
    setIsFormOpen(true);
  };

  const handleApproveBlocking = (blockingId: string) => {
    setBlockings(blockings.map(blocking => 
      blocking.id === blockingId 
        ? { ...blocking, status: 'Aprovado' as const }
        : blocking
    ));
    toast({
      title: "Bloqueio aprovado",
      description: "O bloqueio foi aprovado com sucesso.",
    });
  };

  const handleRejectBlocking = (blockingId: string) => {
    setBlockings(blockings.map(blocking => 
      blocking.id === blockingId 
        ? { ...blocking, status: 'Rejeitado' as const }
        : blocking
    ));
    toast({
      title: "Bloqueio rejeitado",
      description: "O bloqueio foi rejeitado.",
    });
  };

  const handleSaveBlocking = () => {
    if (!newBlocking.startDate || !newBlocking.reason) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha a data e o motivo do bloqueio.",
        variant: "destructive"
      });
      return;
    }

    const blocking: Blocking = {
      id: Date.now().toString(),
      memberName: 'Usuário Atual', // Em produção, pegar do contexto
      startDate: newBlocking.startDate,
      endDate: newBlocking.endDate || newBlocking.startDate,
      reason: newBlocking.reason,
      status: 'Pendente',
      requestDate: new Date().toISOString().split('T')[0],
      notes: newBlocking.notes
    };

    setBlockings(prev => [...prev, blocking]);
    setNewBlocking({ startDate: '', endDate: '', reason: '', notes: '' });
    setIsFormOpen(false);
    
    toast({
      title: "Bloqueio solicitado",
      description: "Sua solicitação de bloqueio foi enviada para aprovação.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'bg-green-100 text-green-800';
      case 'Rejeitado':
        return 'bg-red-100 text-red-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Rejeitado':
        return <X className="h-4 w-4 text-red-600" />;
      case 'Pendente':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  // Preparar dados para o calendário
  const blockedDates = blockings
    .filter(blocking => blocking.status === 'Aprovado')
    .flatMap(blocking => {
      const dates = [];
      const start = new Date(blocking.startDate);
      const end = new Date(blocking.endDate);
      
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      return dates;
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Gerenciar Bloqueios</h2>
          <p className="text-gray-600 mt-1">Gerencie os bloqueios de disponibilidade dos membros</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateBlocking} className="bg-gradient-to-r from-orange-600 to-red-600">
              <Plus className="h-4 w-4 mr-2" />
              Solicitar Bloqueio
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Solicitar Bloqueio</DialogTitle>
              <DialogDescription>
                Solicite um bloqueio de disponibilidade para determinadas datas
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Data Início *</label>
                  <input
                    type="date"
                    value={newBlocking.startDate}
                    onChange={(e) => setNewBlocking(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Data Fim</label>
                  <input
                    type="date"
                    value={newBlocking.endDate}
                    onChange={(e) => setNewBlocking(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Motivo *</label>
                <input
                  type="text"
                  value={newBlocking.reason}
                  onChange={(e) => setNewBlocking(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Ex: Viagem, compromisso familiar..."
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Observações</label>
                <Textarea
                  value={newBlocking.notes}
                  onChange={(e) => setNewBlocking(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Informações adicionais (opcional)"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveBlocking}>
                  Solicitar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Bloqueios</p>
                <p className="text-2xl font-bold text-gray-900">{blockings.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {blockings.filter(b => b.status === 'Pendente').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aprovados</p>
                <p className="text-2xl font-bold text-green-600">
                  {blockings.filter(b => b.status === 'Aprovado').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Este Mês</p>
                <p className="text-2xl font-bold text-orange-600">
                  {blockings.filter(b => {
                    const blockDate = new Date(b.startDate);
                    const now = new Date();
                    return blockDate.getMonth() === now.getMonth() && 
                           blockDate.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
              <CalendarIcon className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-orange-600" />
              <span>Calendário de Bloqueios</span>
            </CardTitle>
            <CardDescription>
              Visualize os dias bloqueados aprovados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{
                blocked: blockedDates
              }}
              modifiersStyles={{
                blocked: { backgroundColor: '#fef2f2', color: '#dc2626' }
              }}
              className="rounded-md border"
            />
            <div className="mt-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                <span>Dias bloqueados</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Bloqueios */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-orange-600" />
              <span>Solicitações de Bloqueio</span>
            </CardTitle>
            <CardDescription>
              Gerencie as solicitações de bloqueio dos membros
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Membro</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blockings.map((blocking) => (
                  <TableRow key={blocking.id}>
                    <TableCell className="font-medium">{blocking.memberName}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{new Date(blocking.startDate).toLocaleDateString('pt-BR')}</p>
                        {blocking.endDate !== blocking.startDate && (
                          <p className="text-gray-500">
                            até {new Date(blocking.endDate).toLocaleDateString('pt-BR')}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{blocking.reason}</p>
                        {blocking.notes && (
                          <p className="text-xs text-gray-500">{blocking.notes}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(blocking.status)}
                        <Badge className={getStatusColor(blocking.status)}>
                          {blocking.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {blocking.status === 'Pendente' && (
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApproveBlocking(blocking.id)}
                            className="text-green-600"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectBlocking(blocking.id)}
                            className="text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlockingManagement;
