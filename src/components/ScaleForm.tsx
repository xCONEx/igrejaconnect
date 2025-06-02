
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Clock, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ScaleSection {
  id: string;
  title: string;
  description?: string;
  items: ScaleItem[];
}

interface ScaleItem {
  id: string;
  title: string;
  time: string;
  responsible: string;
  notes?: string;
}

interface ScaleFormProps {
  scale?: any;
  onSave: (data: any) => void; // <- recebe os dados da escala
  onCancel: () => void;
}

const ScaleForm: React.FC<ScaleFormProps> = ({ scale, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: scale?.title || '',
    date: scale?.date || '',
    time: scale?.time || '',
    type: scale?.type || '',
    description: scale?.description || '',
    status: scale?.status || 'Rascunho'
  });

  const [sections, setSections] = useState<ScaleSection[]>([
    {
      id: '1',
      title: 'Preparação',
      description: 'Atividades de preparação antes do culto',
      items: [
        { id: '1', title: 'Chegada e preparação dos instrumentos', time: '08:00', responsible: '', notes: '' },
        { id: '2', title: 'Ensaio das músicas', time: '08:30', responsible: '', notes: '' }
      ]
    },
    {
      id: '2',
      title: 'Louvor',
      description: 'Momento de louvor e adoração',
      items: [
        { id: '3', title: 'Abertura com oração', time: '09:00', responsible: '', notes: '' },
        { id: '4', title: 'Primeira música', time: '09:05', responsible: '', notes: '' },
        { id: '5', title: 'Segunda música', time: '09:10', responsible: '', notes: '' }
      ]
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSection = () => {
    const newSection: ScaleSection = {
      id: Date.now().toString(),
      title: 'Nova Seção',
      description: '',
      items: []
    };
    setSections(prev => [...prev, newSection]);
  };

  const handleUpdateSection = (sectionId: string, field: string, value: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, [field]: value }
        : section
    ));
  };

  const handleRemoveSection = (sectionId: string) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
  };

  const handleAddItem = (sectionId: string) => {
    const newItem: ScaleItem = {
      id: Date.now().toString(),
      title: 'Novo Item',
      time: '',
      responsible: '',
      notes: ''
    };
    
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, items: [...section.items, newItem] }
        : section
    ));
  };

  const handleUpdateItem = (sectionId: string, itemId: string, field: string, value: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            items: section.items.map(item => 
              item.id === itemId 
                ? { ...item, [field]: value }
                : item
            )
          }
        : section
    ));
  };

  const handleRemoveItem = (sectionId: string, itemId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, items: section.items.filter(item => item.id !== itemId) }
        : section
    ));
  };

const handleSave = () => {
  if (!formData.title || !formData.date || !formData.time) {
    toast({
      title: "Campos obrigatórios",
      description: "Preencha título, data e horário.",
      variant: "destructive"
    });
    return;
  }

  const escalaCompleta = {
    ...formData,
    sections
  };

  toast({
    title: "Escala salva",
    description: "A escala foi salva com sucesso.",
  });

  onSave(escalaCompleta); // <- envia os dados
};


  return (
    <div className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título da Escala *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ex: Culto de Domingo - Manhã"
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo de Culto</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
  <SelectItem value="Imersão">Imersão</SelectItem>
  <SelectItem value="Prosperar Negócios">Prosperar Negócios</SelectItem>
  <SelectItem value="Homens de Honra">Homens de Honra</SelectItem>
  <SelectItem value="Femininas">Femininas</SelectItem>
  <SelectItem value="Reunião Lideres e Colaboradores">Reunião Líderes e Colaboradores</SelectItem>
  <SelectItem value="Freedom">Freedom</SelectItem>
  <SelectItem value="Sabado Sobrenatural">Sábado Sobrenatural</SelectItem>
  <SelectItem value="Culto da Familia">Culto da Família</SelectItem>
  <SelectItem value="Culto de missões">Culto de Missões</SelectItem>
  <SelectItem value="Eventos">Especial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Data *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="time">Horário *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descrição adicional sobre a escala..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Seções da Escala */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Estrutura da Escala</h3>
          <Button onClick={handleAddSection} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Seção
          </Button>
        </div>

        {sections.map((section) => (
          <Card key={section.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-2">
                  <Input
                    value={section.title}
                    onChange={(e) => handleUpdateSection(section.id, 'title', e.target.value)}
                    placeholder="Título da seção"
                    className="font-semibold"
                  />
                  <Input
                    value={section.description || ''}
                    onChange={(e) => handleUpdateSection(section.id, 'description', e.target.value)}
                    placeholder="Descrição da seção (opcional)"
                    className="text-sm"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSection(section.id)}
                  className="text-red-600 hover:text-red-700 ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-3 items-center p-3 bg-gray-50 rounded-lg">
                    <div className="col-span-4">
                      <Input
                        value={item.title}
                        onChange={(e) => handleUpdateItem(section.id, item.id, 'title', e.target.value)}
                        placeholder="Título do item"
                        className="text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <Input
                          type="time"
                          value={item.time}
                          onChange={(e) => handleUpdateItem(section.id, item.id, 'time', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <Input
                          value={item.responsible}
                          onChange={(e) => handleUpdateItem(section.id, item.id, 'responsible', e.target.value)}
                          placeholder="Responsável"
                          className="text-sm"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Input
                        value={item.notes || ''}
                        onChange={(e) => handleUpdateItem(section.id, item.id, 'notes', e.target.value)}
                        placeholder="Observações"
                        className="text-sm"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(section.id, item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddItem(section.id)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </div>
            </CardContent>
          </Card>
               ))}
      </div>

      {/* Ações */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>
          Salvar Escala
        </Button>
      </div>
    </div>
  );
};

export default ScaleForm;
