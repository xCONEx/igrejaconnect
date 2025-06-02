
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useAuth } from '@/contexts/AuthContext';

const MemberSlides: React.FC = () => {
  const { user } = useAuth();

  if (user?.role !== 'member') {
    return null;
  }

  // Mock data - em produção viria do backend
  const slides = [
    {
      id: '1',
      title: 'Bem-vindo ao Louvor!',
      description: 'Junte-se a nós para glorificar a Deus através da música',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      bgColor: 'from-blue-500 to-purple-600'
    },
    {
      id: '2',
      title: 'Ensaios toda Terça',
      description: 'Não perca nossos ensaios às 19h30',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      bgColor: 'from-green-500 to-blue-600'
    },
    {
      id: '3',
      title: 'Conferência de Louvor',
      description: 'Evento especial no próximo mês',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop',
      bgColor: 'from-purple-500 to-pink-600'
    },
    {
      id: '4',
      title: 'Novos Instrumentos',
      description: 'Adquirimos novos equipamentos para o ministério',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      bgColor: 'from-orange-500 to-red-600'
    },
    {
      id: '5',
      title: 'Oportunidades de Servir',
      description: 'Venha fazer parte da nossa equipe',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      bgColor: 'from-teal-500 to-green-600'
    }
  ];

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Avisos e Informações</h3>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="p-1">
                  <Card className="border-0">
                    <CardContent className="p-0">
                      <div className={`relative h-48 rounded-lg bg-gradient-to-r ${slide.bgColor} overflow-hidden`}>
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="w-full h-full object-cover mix-blend-overlay"
                        />
                        <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                          <h4 className="font-bold text-lg mb-1">{slide.title}</h4>
                          <p className="text-sm opacity-90">{slide.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default MemberSlides;
