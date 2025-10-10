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
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f0f' }}>
      {/* Header */}
      <header className="px-6 py-4 border-b" style={{ borderColor: '#1f1f1f', backgroundColor: '#0f0f0f' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: '#d4af37' }}>
              <LayoutGrid className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#ffffff' }}>
                Amuse
              </h1>
              <p className="text-sm" style={{ color: '#888888' }}>
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
                backgroundColor: 'transparent',
                border: '1px solid #d4af37',
                color: '#d4af37'
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
                backgroundColor: 'transparent',
                border: '1px solid #d4af37',
                color: '#d4af37'
              }}
            >
              <Route className="h-4 w-4 mr-2" />
              Tours
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-4"
                style={{ 
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, #d4af37, #f7d794)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
              Discover Art Like Never Before
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8"
               style={{ color: '#cccccc' }}>
              Experience an immersive journey through history's greatest artworks with AR, interactive displays, and instant information discovery.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button 
              onClick={handleQuickScan}
              size="lg"
              style={{
                backgroundColor: '#d4af37',
                color: '#000000',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                borderRadius: '12px'
              }}
            >
              <QrCode className="mr-2 h-5 w-5" />
              Quick Scan
            </Button>
            <Button
              onClick={handleARMode}
              variant="outline"
              size="lg"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #d4af37',
                color: '#d4af37',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                borderRadius: '12px'
              }}
            >
              <Camera className="mr-2 h-5 w-5" />
              AR Experience
            </Button>
            <Button
              onClick={() => navigate('/tours')}
              variant="outline"
              size="lg"
              style={{
                backgroundColor: 'transparent', 
                border: '2px solid #d4af37',
                color: '#d4af37',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                borderRadius: '12px'
              }}
            >
              <Route className="mr-2 h-5 w-5" />
              Guided Tours
            </Button>
          </div>
        </div>
      </section>

      {/* Museum Sections */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Explore Collections
            </h3>
            <p className="text-lg" style={{ color: '#888888' }}>
              Dive into our curated galleries featuring masterpieces from around the world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {museumData.sections.map((section) => (
              <Card 
                key={section.id}
                className="cursor-pointer transition-all duration-300 hover:scale-105 border-0"
                style={{ backgroundColor: '#1a1a1a' }}
                onClick={() => handleSectionClick(section.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4">{section.icon}</div>
                  <CardTitle className="text-xl mb-2" style={{ color: '#ffffff' }}>
                    {section.name}
                  </CardTitle>
                  <CardDescription style={{ color: '#cccccc' }}>
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary"
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        color: '#d4af37',
                        border: '1px solid rgba(212, 175, 55, 0.3)'
                      }}
                    >
                      {section.artworkCount} pieces
                    </Badge>
                    <ArrowRight className="h-5 w-5" style={{ color: '#d4af37' }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Revolutionary Museum Experience
            </h3>
            <p className="text-lg" style={{ color: '#888888' }}>
              Cutting-edge technology meets timeless art
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <Scan className="h-8 w-8" style={{ color: '#d4af37' }} />
              </div>
              <h4 className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>
                NFC & QR Scanning
              </h4>
              <p className="text-sm" style={{ color: '#888888' }}>
                Tap your phone near any artwork for instant information
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <Camera className="h-8 w-8" style={{ color: '#d4af37' }} />
              </div>
              <h4 className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>
                AR Integration
              </h4>
              <p className="text-sm" style={{ color: '#888888' }}>
                See artworks come to life with augmented reality
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <Users className="h-8 w-8" style={{ color: '#d4af37' }} />
              </div>
              <h4 className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>
                Guided Tours
              </h4>
              <p className="text-sm" style={{ color: '#888888' }}>
                Expert-curated journeys through art history
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <Heart className="h-8 w-8" style={{ color: '#d4af37' }} />
              </div>
              <h4 className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>
                Personal Collection
              </h4>
              <p className="text-sm" style={{ color: '#888888' }}>
                Save and organize your favorite artworks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 px-6 py-4"
           style={{ backgroundColor: 'rgba(15, 15, 15, 0.95)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-md mx-auto flex justify-around">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            style={{ color: '#d4af37' }}
          >
            <MapPin className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleQuickScan}
            style={{ color: '#ffffff' }}
          >
            <QrCode className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleARMode}
            style={{ color: '#ffffff' }}
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/favorites')}
            style={{ color: '#ffffff' }}
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;