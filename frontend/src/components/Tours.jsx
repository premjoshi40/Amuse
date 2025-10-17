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
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Header */}
      <header className="px-6 py-4 border-b" style={{ 
        borderColor: 'rgba(255, 255, 255, 0.2)', 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            style={{ 
              color: '#ff6b6b',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              borderRadius: '20px'
            }}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold" style={{ 
              background: 'linear-gradient(135deg, #10ac84, #00a085)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Guided Tours
            </h1>
            <p className="text-sm" style={{ color: '#6c5ce7' }}>
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
          <div className="text-center mb-12" style={{ 
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '25px',
            padding: '3rem'
          }}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                 style={{ 
                   background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                   boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
                 }}>
              <Route className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ 
              background: 'linear-gradient(135deg, #ff6b6b, #6c5ce7, #10ac84)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Discover Art with Expert Guidance
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#10ac84' }}>
              Let our curators guide you through carefully selected masterpieces with rich stories and fascinating details
            </p>
          </div>

          {/* Tour Options */}
          <div className="space-y-6">
            {museumData.tours.map((tour, index) => {
              const gradients = [
                'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
              ];
              
              return (
                <Card 
                  key={tour.id}
                  className="border-0 transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-lg"
                  style={{ 
                    background: gradients[index],
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                  }}
                  onClick={() => handleTourStart(tour.id)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 flex items-center" style={{ color: '#2d3436' }}>
                          <Route className="h-5 w-5 mr-2" style={{ color: '#ff6b6b' }} />
                          {tour.name}
                        </CardTitle>
                        <CardDescription className="text-base" style={{ color: '#636e72' }}>
                          {tour.description}
                        </CardDescription>
                      </div>
                      <Badge 
                        style={{
                          background: 'rgba(255, 107, 107, 0.2)',
                          color: '#ff6b6b',
                          border: '2px solid #ff6b6b',
                          borderRadius: '20px'
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
                        <Clock className="h-4 w-4" style={{ color: '#6c5ce7' }} />
                        <span className="text-sm" style={{ color: '#636e72' }}>
                          {tour.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" style={{ color: '#10ac84' }} />
                        <span className="text-sm" style={{ color: '#636e72' }}>
                          {tour.stops.length} stops
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" style={{ color: '#00d2d3' }} />
                        <span className="text-sm" style={{ color: '#636e72' }}>
                          Self-paced
                        </span>
                      </div>
                    </div>

                    {/* Tour Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3" style={{ color: '#ff6b6b' }}>
                        Tour Highlights:
                      </h4>
                      <div className="space-y-2">
                        {tour.stops.map((stop, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                                 style={{ 
                                   background: 'linear-gradient(135deg, #6c5ce7, #10ac84)', 
                                   color: '#ffffff' 
                                 }}>
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-medium" style={{ color: '#2d3436' }}>
                                  {museumData.artworks[Object.keys(museumData.artworks)
                                    .find(key => museumData.artworks[key]
                                    .some(art => art.id === stop.artwork))]
                                    ?.find(art => art.id === stop.artwork)?.title || 'Artwork'}
                                </span>
                                <span className="text-sm" style={{ color: '#636e72' }}>
                                  {stop.duration}
                                </span>
                              </div>
                              <p className="text-sm" style={{ color: '#636e72' }}>
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
                              className="w-12 h-12 object-cover rounded-lg shadow-md"
                            />
                          ) : null;
                        })}
                        {tour.artworks.length > 3 && (
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xs shadow-md"
                               style={{ 
                                 background: 'linear-gradient(135deg, #00d2d3, #54a0ff)', 
                                 color: '#ffffff' 
                               }}>
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
                          background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                          color: '#ffffff',
                          borderRadius: '25px',
                          boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
                          border: 'none'
                        }}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Tour
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Create Custom Tour CTA */}
          <Card className="border-0 mt-12 text-center shadow-lg" style={{ 
            background: 'linear-gradient(135d, #d299c2 0%, #fef9d7 100%)',
            borderRadius: '20px'
          }}>
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#2d3436' }}>
                Want a Custom Experience?
              </h3>
              <p className="mb-6" style={{ color: '#636e72' }}>
                Create your own personalized tour by selecting your favorite artworks and interests
              </p>
              <Button
                onClick={() => navigate('/favorites')}
                style={{
                  background: 'linear-gradient(135deg, #6c5ce7, #10ac84)',
                  color: '#ffffff',
                  borderRadius: '25px',
                  boxShadow: '0 8px 25px rgba(108, 92, 231, 0.4)',
                  border: 'none'
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
           style={{ 
             background: 'rgba(255, 255, 255, 0.95)', 
             backdropFilter: 'blur(10px)', 
             borderTop: '1px solid rgba(255, 255, 255, 0.2)',
             boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.1)'
           }}>
        <div className="max-w-md mx-auto flex justify-around">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            style={{ color: '#ff6b6b' }}
          >
            <MapPin className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/scanner')}
            style={{ color: '#00d2d3' }}
          >
            <Play className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tours')}
            style={{ color: '#10ac84' }}
          >
            <Route className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/favorites')}
            style={{ color: '#00d2d3' }}
          >
            <Star className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tours;