import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { museumData, museumHandlers } from '../mock';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Camera, 
  QrCode, 
  Heart, 
  MapPin, 
  Users, 
  Sparkles,
  ArrowRight,
  Scan,
  LayoutGrid,
  Route
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(museumHandlers.getFavorites());
  }, []);

  const handleSectionClick = (sectionId) => {
    navigate(`/gallery/${sectionId}`);
  };

  const handleQuickScan = () => {
    navigate('/scanner');
  };

  const handleARMode = () => {
    navigate('/ar');
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
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
                 style={{ 
                   background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                   boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
                 }}>
              <LayoutGrid className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ 
                background: 'linear-gradient(135deg, #10ac84, #00a085)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Amuse
              </h1>
              <p className="text-sm" style={{ color: '#6c5ce7' }}>
                Interactive Museum Experience
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => navigate('/favorites')}
              variant="outline"
              size="sm"
              style={{
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                border: '2px solid #ff6b6b',
                color: '#ff6b6b',
                borderRadius: '25px'
              }}
            >
              <Heart className="h-4 w-4 mr-2" />
              {favorites.length}
            </Button>
            <Button
              onClick={() => navigate('/tours')}
              variant="outline" 
              size="sm"
              style={{
                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                border: '2px solid #6c5ce7',
                color: '#6c5ce7',
                borderRadius: '25px'
              }}
            >
              <Route className="h-4 w-4 mr-2" />
              Tours
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16" style={{ 
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
      }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-4"
                style={{ 
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24, #6c5ce7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
              Discover Art Like Never Before
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8"
               style={{ color: '#5f27cd' }}>
              Experience an immersive journey through history's greatest artworks with AR, interactive displays, and instant information discovery.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button 
              onClick={handleQuickScan}
              size="lg"
              style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                color: '#ffffff',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                borderRadius: '25px',
                boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
                border: 'none'
              }}
            >
              <QrCode className="mr-2 h-5 w-5" />
              Quick Scan
            </Button>
            <Button
              onClick={handleARMode}
              size="lg"
              style={{
                background: 'linear-gradient(135deg, #6c5ce7, #5f27cd)',
                color: '#ffffff',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                borderRadius: '25px',
                boxShadow: '0 8px 25px rgba(108, 92, 231, 0.4)',
                border: 'none'
              }}
            >
              <Camera className="mr-2 h-5 w-5" />
              AR Experience
            </Button>
            <Button
              onClick={() => navigate('/tours')}
              size="lg"
              style={{
                background: 'linear-gradient(135deg, #00d2d3, #54a0ff)',
                color: '#ffffff',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                borderRadius: '25px',
                boxShadow: '0 8px 25px rgba(0, 210, 211, 0.4)',
                border: 'none'
              }}
            >
              <Route className="mr-2 h-5 w-5" />
              Guided Tours
            </Button>
          </div>
        </div>
      </section>

      {/* Museum Sections */}
      <section className="px-6 py-12" style={{ 
        background: 'rgba(255, 255, 255, 0.95)'
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4" style={{ 
              background: 'linear-gradient(135deg, #5f27cd, #341f97)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Explore Collections
            </h3>
            <p className="text-lg" style={{ color: '#6c5ce7' }}>
              Dive into our curated galleries featuring masterpieces from around the world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {museumData.sections.map((section, index) => {
              const gradients = [
                'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
              ];
              const iconColors = ['#ff6b6b', '#00d2d3', '#6c5ce7'];
              
              return (
                <Card 
                  key={section.id}
                  className="cursor-pointer transition-all duration-300 hover:scale-105 border-0 shadow-lg"
                  style={{ 
                    background: gradients[index],
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                  }}
                  onClick={() => handleSectionClick(section.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="text-6xl mb-4" style={{ 
                      filter: `hue-rotate(${index * 60}deg)` 
                    }}>
                      {section.icon}
                    </div>
                    <CardTitle className="text-xl mb-2" style={{ color: '#2d3436' }}>
                      {section.name}
                    </CardTitle>
                    <CardDescription style={{ color: '#636e72' }}>
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge 
                        style={{
                          background: 'rgba(255, 255, 255, 0.8)',
                          color: iconColors[index],
                          border: `2px solid ${iconColors[index]}`,
                          borderRadius: '20px'
                        }}
                      >
                        {section.artworkCount} pieces
                      </Badge>
                      <ArrowRight className="h-5 w-5" style={{ color: iconColors[index] }} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Revolutionary Museum Experience
            </h3>
            <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Cutting-edge technology meets timeless art
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Scan, title: 'NFC & QR Scanning', desc: 'Tap your phone near any artwork for instant information', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
              { icon: Camera, title: 'AR Integration', desc: 'See artworks come to life with augmented reality', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
              { icon: Users, title: 'Guided Tours', desc: 'Expert-curated journeys through art history', gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)' },
              { icon: Heart, title: 'Personal Collection', desc: 'Save and organize your favorite artworks', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg"
                     style={{ 
                       background: feature.gradient,
                       boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                     }}>
                  <feature.icon className="h-8 w-8" style={{ color: '#ffffff' }} />
                </div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>
                  {feature.title}
                </h4>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            onClick={handleQuickScan}
            style={{ color: '#6c5ce7' }}
          >
            <QrCode className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleARMode}
            style={{ color: '#00d2d3' }}
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/favorites')}
            style={{ color: '#ff6b6b' }}
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;