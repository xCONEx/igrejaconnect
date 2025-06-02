
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Mail, Users, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Invite {
  id: string;
  email: string;
  role: 'leader' | 'member';
  department: string;
  leaderId?: string; // <- novo campo!
  status: 'Enviado' | 'Aceito' | 'Expirado';
  sentDate: string;
}

const InviteManagement: React.FC = () => {
  const { user } = useAuth();
  const [invites, setInvites] = useState<Invite[]>([
    {
      id: '1',
      email: 'novo.lider@igreja.com',
      role: 'leader',
      department: 'Mídia',
      status: 'Enviado',
      sentDate: '2024-02-10'
    },
    {
      id: '2',
      email: 'colaborador@igreja.com',
      role: 'member',
      department: 'Louvor',
      status: 'Aceito',
      sentDate: '2024-02-08'
    }
  ]);

  const [formData, setFormData] = useState({
    email: '',
    role: user?.role === 'admin' ? 'leader' : 'member',
    department: user?.department || ''
  });

  const departments = [
    'Louvor',
    'Louvor - Juniores',
    'Louvor - Teens',
    'Mídia',
    'Mídia - Juniores',
    'Sonoplastia',
    'Instrumentos'
  ];

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const newInvite: Invite = {
    id: Date.now().toString(),
    email: formData.email,
    role: formData.role as 'leader' | 'member',
    department: formData.department,
    leaderId: user?.role === 'leader' ? user.id : undefined,
    status: 'Enviado',
    sentDate: new Date().toISOString().split('T')[0]
  };

  setInvites([...invites, newInvite]);

  toast({
    title: "Convite enviado",
    description: `Convite enviado para ${formData.email} com sucesso.`,
  });

  setFormData({
    email: '',
    role: user?.role === 'admin' ? 'leader' : 'member',
    department: user?.department || ''
  });
};


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Enviado':
        return 'bg-yellow-100 text-yellow-800';
      case 'Aceito':
        return 'bg-green-100 text-green-800';
      case 'Expirado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          {isAdmin ? 'Convidar Líder' : 'Convidar Colaborador'}
        </h2>
        <p className="text-gray-600 mt-1">
          {isAdmin 
            ? 'Convide novos líderes para gerenciar departamentos' 
            : 'Adicione colaboradores ao seu departamento'
          }
        </p>
      </div>

      {/* Formulário de Convite */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5 text-blue-600" />
            <span>Novo Convite</span>
          </CardTitle>
          <CardDescription>
            Preencha as informações para enviar um convite
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@igreja.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    {isAdmin && <SelectItem value="leader">Líder</SelectItem>}
                    <SelectItem value="member">Colaborador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Mail className="h-4 w-4 mr-2" />
              Enviar Convite
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Convites */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-600" />
            <span>Convites Enviados</span>
          </CardTitle>
          <CardDescription>
            Acompanhe o status dos convites enviados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invites.map((invite) => (
              <div key={invite.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    {invite.role === 'leader' ? 
                      <Shield className="h-4 w-4 text-blue-600" /> : 
                      <Users className="h-4 w-4 text-blue-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{invite.email}</p>
                    <p className="text-sm text-gray-600">
                      {invite.role === 'leader' ? 'Líder' : 'Colaborador'} - {invite.department}
                    </p>
                    <p className="text-xs text-gray-500">
                      Enviado em {new Date(invite.sentDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(invite.status)}>
                  {invite.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteManagement;
