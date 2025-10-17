import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { museumData, museumHandlers } from '../mock';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  QrCode, 
  Camera,
  Info,
  Grid3X3,
  List
} from 'lucide-react';

const Gallery = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [section, setSection] = useState(null);

  useEffect(() => {
    setFavorites(museumHandlers.getFavorites());
    setArtworks(museumHandlers.getArtworksByCategory(category));
    setSection(museumData.sections.find(s => s.id === category));
  }, [category]);

  const toggleFavorite = (artworkId) => {
    if (favorites.includes(artworkId)) {
      const updated = museumHandlers.removeFromFavorites(artworkId);
      setFavorites(updated);
    } else {
      const updated = museumHandlers.addToFavorites(artworkId);
      setFavorites(updated);
    }
  };

  const handleArtworkClick = (artworkId) => {
    navigate(`/artwork/${artworkId}`);
  };

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <p style={{ color: '#ffffff' }}>Gallery not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }}>
      {/* Header */}
      <header className="px-6 py-4 border-b" style={{ 
        borderColor: 'rgba(255, 255, 255, 0.3)',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
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
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold" style={{ 
                background: 'linear-gradient(135deg, #10ac84, #00a085)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {section.name}
              </h1>
              <p className="text-sm" style={{ color: '#6c5ce7' }}>
                {section.description}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? 'linear-gradient(135deg, #6c5ce7, #5f27cd)' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : '#6c5ce7',
                borderRadius: '15px',
                border: viewMode === 'grid' ? 'none' : '2px solid #6c5ce7'
              }}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              style={{
                background: viewMode === 'list' ? 'linear-gradient(135deg, #6c5ce7, #5f27cd)' : 'transparent',
                color: viewMode === 'list' ? '#ffffff' : '#6c5ce7',
                borderRadius: '15px',
                border: viewMode === 'list' ? 'none' : '2px solid #6c5ce7'
              }}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Gallery Content */}
      <main className="px-6 py-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{section.icon}</div>
              <div>
                <Badge 
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#6c5ce7',
                    border: '2px solid #6c5ce7',
                    borderRadius: '20px'
                  }}
                >
                  {artworks.length} artworks
                </Badge>
              </div>
            </div>
          </div>

          {/* Artwork Grid/List */}
          <div className={viewMode === 'grid' 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "space-y-6"
          }>
            {artworks.map((artwork, index) => {
              const cardGradients = [
                'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
                'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)'
              ];
              
              return (
                <Card 
                  key={artwork.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 border-0 shadow-lg ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}
                  style={{ 
                    background: cardGradients[index % 3],
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                  }}
                  onClick={() => handleArtworkClick(artwork.id)}
                >
                  <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className={`w-full object-cover ${
                        viewMode === 'list' ? 'h-32 rounded-l-lg' : 'h-64 rounded-t-lg'
                      }`}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <CardHeader className={viewMode === 'list' ? 'pb-2' : ''}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2" style={{ color: '#2d3436' }}>
                            {artwork.title}
                          </CardTitle>
                          <p className="text-sm mb-1" style={{ color: '#ff6b6b' }}>
                            {artwork.artist}
                          </p>
                          <p className="text-xs" style={{ color: '#636e72' }}>
                            {artwork.year}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(artwork.id);
                          }}
                          style={{
                            color: favorites.includes(artwork.id) ? '#ff6b6b' : '#636e72',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: '15px'
                          }}
                        >
                          <Heart 
                            className="h-4 w-4"
                            fill={favorites.includes(artwork.id) ? 'currentColor' : 'none'}
                          />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className={viewMode === 'list' ? 'pt-0' : ''}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" style={{ color: '#636e72' }} />
                          <span className="text-sm" style={{ color: '#636e72' }}>
                            {artwork.location}
                          </span>
                        </div>
                      </div>

                      {viewMode === 'list' && (
                        <p className="text-sm mb-3 line-clamp-2" style={{ color: '#2d3436' }}>
                          {artwork.description}
                        </p>
                      )}

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Badge 
                            style={{
                              background: 'rgba(255, 255, 255, 0.8)',
                              color: '#6c5ce7',
                              border: '1px solid #6c5ce7',
                              fontSize: '0.75rem',
                              borderRadius: '12px'
                            }}
                          >
                            {artwork.qrCode}
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/scanner', { state: { targetQR: artwork.qrCode } });
                            }}
                            style={{ 
                              color: '#00d2d3',
                              backgroundColor: 'rgba(0, 210, 211, 0.1)',
                              borderRadius: '12px'
                            }}
                          >
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/ar', { state: { artworkId: artwork.id } });
                            }}
                            style={{ 
                              color: '#6c5ce7',
                              backgroundColor: 'rgba(108, 92, 231, 0.1)',
                              borderRadius: '12px'
                            }}
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
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
            style={{ color: '#6c5ce7' }}
          >
            <QrCode className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/ar')}
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

export default Gallery;