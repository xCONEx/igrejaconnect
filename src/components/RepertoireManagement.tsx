
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Music, Play, Heart, Star, Volume2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  bpm: number;
  category: string;
  lastUsed: string;
  popularity: number;
  notes?: string;
}

const RepertoireManagement: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([
    {
      id: '1',
      title: 'Grande é o Senhor',
      artist: 'Aline Barros',
      key: 'G',
      bpm: 120,
      category: 'Louvor',
      lastUsed: '2024-02-10',
      popularity: 5,
      notes: 'Ótima para abertura'
    },
    {
      id: '2',
      title: 'Quão Grande é o Meu Deus',
      artist: 'Soraya Moraes',
      key: 'C',
      bpm: 80,
      category: 'Adoração',
      lastUsed: '2024-02-03',
      popularity: 4,
      notes: 'Momento de intimidade'
    },
    {
      id: '3',
      title: 'Reckless Love',
      artist: 'Cory Asbury',
      key: 'E',
      bpm: 75,
      category: 'Adoração',
      lastUsed: '2024-01-28',
      popularity: 5,
      notes: 'Versão em português disponível'
    },
    {
      id: '4',
      title: 'Goodness of God',
      artist: 'Bethel Music',
      key: 'A',
      bpm: 70,
      category: 'Adoração',
      lastUsed: '2024-01-21',
      popularity: 4,
      notes: ''
    },
    {
      id: '5',
      title: 'Oceans',
      artist: 'Hillsong United',
      key: 'D',
      bpm: 60,
      category: 'Adoração',
      lastUsed: '2024-01-14',
      popularity: 5,
      notes: 'Requer violino'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const categories = ['Todas', 'Louvor', 'Adoração', 'Congregacional', 'Especial'];

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || song.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateSong = () => {
    setSelectedSong(null);
    setIsFormOpen(true);
  };

  const handleEditSong = (song: Song) => {
    setSelectedSong(song);
    setIsFormOpen(true);
  };

  const handleDeleteSong = (songId: string) => {
    setSongs(songs.filter(song => song.id !== songId));
    toast({
      title: "Música removida",
      description: "A música foi removida do repertório.",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Louvor':
        return 'bg-blue-100 text-blue-800';
      case 'Adoração':
        return 'bg-purple-100 text-purple-800';
      case 'Congregacional':
        return 'bg-green-100 text-green-800';
      case 'Especial':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Repertório Musical</h2>
          <p className="text-gray-600 mt-1">Gerencie o repertório de músicas do departamento</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateSong} className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Plus className="h-4 w-4 mr-2" />
              Nova Música
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedSong ? 'Editar Música' : 'Nova Música'}</DialogTitle>
              <DialogDescription>
                {selectedSong ? 'Edite as informações da música' : 'Adicione uma nova música ao repertório'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Formulário de música será implementado aqui</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsFormOpen(false)}>
                  Salvar
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
                <p className="text-sm font-medium text-gray-600">Total de Músicas</p>
                <p className="text-2xl font-bold text-gray-900">{songs.length}</p>
              </div>
              <Music className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mais Tocadas</p>
                <p className="text-2xl font-bold text-blue-600">
                  {songs.filter(s => s.popularity >= 4).length}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Adoração</p>
                <p className="text-2xl font-bold text-purple-600">
                  {songs.filter(s => s.category === 'Adoração').length}
                </p>
              </div>
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Louvor</p>
                <p className="text-2xl font-bold text-blue-600">
                  {songs.filter(s => s.category === 'Louvor').length}
                </p>
              </div>
              <Volume2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Music className="h-5 w-5 text-purple-600" />
                <span>Biblioteca Musical</span>
              </CardTitle>
              <CardDescription>
                Explore e organize o repertório musical
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar músicas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Música</TableHead>
                <TableHead>Artista</TableHead>
                <TableHead>Tom</TableHead>
                <TableHead>BPM</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Popularidade</TableHead>
                <TableHead>Última vez</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSongs.map((song) => (
                <TableRow key={song.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{song.title}</p>
                      {song.notes && (
                        <p className="text-xs text-gray-500 italic">{song.notes}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{song.artist}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {song.key}
                    </Badge>
                  </TableCell>
                  <TableCell>{song.bpm} BPM</TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(song.category)}>
                      {song.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {renderStars(song.popularity)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(song.lastUsed).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditSong(song)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteSong(song.id)}
                        className="text-red-600 hover:text-red-700"
                      >
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
    </div>
  );
};

export default RepertoireManagement;
