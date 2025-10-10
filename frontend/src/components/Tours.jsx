import React from 'react';
import { useNavigate } from 'react-router-dom';
import { museumData } from '../mock';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Users,
  Route,
  Play,
  Star,
  ArrowRight
} from 'lucide-react';

const Tours = () => {
  const navigate = useNavigate();

  const handleTourStart = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f0f' }}>
      {/* Header */}
      <header className="px-6 py-4 border-b" style={{ borderColor: '#1f1f1f' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            style={{ color: '#d4af37' }}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold" style={{ color: '#ffffff' }}>
              Guided Tours
            </h1>
            <p className="text-sm" style={{ color: '#888888' }}>
              Expert-curated journeys through art
            </p>
          </div>
          
          <div className="w-16"></div>
        </div>
      </header>

      {/* Tours Content */}
      <main className="px-6 py-8 pb-24">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
              <Route className="h-10 w-10" style={{ color: '#d4af37' }} />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Discover Art with Expert Guidance
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#888888' }}>
              Let our curators guide you through carefully selected masterpieces with rich stories and fascinating details
            </p>
          </div>

          {/* Tour Options */}
          <div className="space-y-6">
            {museumData.tours.map((tour) => (
              <Card 
                key={tour.id}
                className="border-0 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{ backgroundColor: '#1a1a1a' }}
                onClick={() => handleTourStart(tour.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 flex items-center" style={{ color: '#ffffff' }}>
                        <Route className="h-5 w-5 mr-2" style={{ color: '#d4af37' }} />
                        {tour.name}
                      </CardTitle>
                      <CardDescription className="text-base" style={{ color: '#cccccc' }}>
                        {tour.description}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant="secondary"
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        color: '#d4af37',
                        border: '1px solid rgba(212, 175, 55, 0.3)'
                      }}
                    >
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" style={{ color: '#d4af37' }} />
                      <span className="text-sm" style={{ color: '#cccccc' }}>
                        {tour.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" style={{ color: '#d4af37' }} />
                      <span className="text-sm" style={{ color: '#cccccc' }}>
                        {tour.stops.length} stops
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" style={{ color: '#d4af37' }} />
                      <span className="text-sm" style={{ color: '#cccccc' }}>
                        Self-paced
                      </span>
                    </div>
                  </div>

                  {/* Tour Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3" style={{ color: '#d4af37' }}>
                      Tour Highlights:
                    </h4>
                    <div className="space-y-2">
                      {tour.stops.map((stop, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                               style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)', color: '#d4af37' }}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium" style={{ color: '#ffffff' }}>
                                {museumData.artworks[Object.keys(museumData.artworks)
                                  .find(key => museumData.artworks[key]
                                  .some(art => art.id === stop.artwork))]
                                  ?.find(art => art.id === stop.artwork)?.title || 'Artwork'}
                              </span>
                              <span className="text-sm" style={{ color: '#888888' }}>
                                {stop.duration}
                              </span>
                            </div>
                            <p className="text-sm" style={{ color: '#888888' }}>
                              {stop.focus}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {tour.artworks.slice(0, 3).map((artworkId) => {
                        const artwork = Object.values(museumData.artworks)
                          .flat()
                          .find(art => art.id === artworkId);
                        return artwork ? (
                          <img
                            key={artworkId}
                            src={artwork.image}
                            alt={artwork.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        ) : null;
                      })}
                      {tour.artworks.length > 3 && (
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xs"
                             style={{ backgroundColor: '#d4af37', color: '#000000' }}>
                          +{tour.artworks.length - 3}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTourStart(tour.id);
                      }}
                      style={{
                        backgroundColor: '#d4af37',
                        color: '#000000'
                      }}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Tour
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Create Custom Tour CTA */}
          <Card className="border-0 mt-12 text-center" style={{ backgroundColor: '#1a1a1a' }}>
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>
                Want a Custom Experience?
              </h3>
              <p className="mb-6" style={{ color: '#888888' }}>
                Create your own personalized tour by selecting your favorite artworks and interests
              </p>
              <Button
                onClick={() => navigate('/favorites')}
                variant="outline"
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid #d4af37',
                  color: '#d4af37'
                }}
              >
                Build Custom Tour
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 px-6 py-4"
           style={{ backgroundColor: 'rgba(15, 15, 15, 0.95)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-md mx-auto flex justify-around">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            style={{ color: '#ffffff' }}
          >
            <MapPin className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/scanner')}
            style={{ color: '#ffffff' }}
          >
            <Play className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tours')}
            style={{ color: '#d4af37' }}
          >
            <Route className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/favorites')}
            style={{ color: '#ffffff' }}
          >
            <Star className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tours;