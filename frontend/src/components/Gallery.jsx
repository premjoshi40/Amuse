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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f0f0f' }}>
        <p style={{ color: '#ffffff' }}>Gallery not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f0f' }}>
      {/* Header */}
      <header className="px-6 py-4 border-b" style={{ borderColor: '#1f1f1f' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              style={{ color: '#d4af37' }}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#ffffff' }}>
                {section.name}
              </h1>
              <p className="text-sm" style={{ color: '#888888' }}>
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
                backgroundColor: viewMode === 'grid' ? '#d4af37' : 'transparent',
                color: viewMode === 'grid' ? '#000000' : '#d4af37'
              }}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              style={{
                backgroundColor: viewMode === 'list' ? '#d4af37' : 'transparent',
                color: viewMode === 'list' ? '#000000' : '#d4af37'
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
                  variant="secondary"
                  style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    color: '#d4af37',
                    border: '1px solid rgba(212, 175, 55, 0.3)'
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
            {artworks.map((artwork) => (
              <Card 
                key={artwork.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-0 ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
                style={{ backgroundColor: '#1a1a1a' }}
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
                        <CardTitle className="text-lg mb-2" style={{ color: '#ffffff' }}>
                          {artwork.title}
                        </CardTitle>
                        <p className="text-sm mb-1" style={{ color: '#d4af37' }}>
                          {artwork.artist}
                        </p>
                        <p className="text-xs" style={{ color: '#888888' }}>
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
                          color: favorites.includes(artwork.id) ? '#ff6b6b' : '#888888'
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
                        <MapPin className="h-4 w-4" style={{ color: '#888888' }} />
                        <span className="text-sm" style={{ color: '#888888' }}>
                          {artwork.location}
                        </span>
                      </div>
                    </div>

                    {viewMode === 'list' && (
                      <p className="text-sm mb-3 line-clamp-2" style={{ color: '#cccccc' }}>
                        {artwork.description}
                      </p>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Badge 
                          variant="outline"
                          style={{
                            backgroundColor: 'transparent',
                            color: '#d4af37',
                            border: '1px solid #d4af37',
                            fontSize: '0.75rem'
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
                          style={{ color: '#d4af37' }}
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
                          style={{ color: '#d4af37' }}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
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
            <QrCode className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/ar')}
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

export default Gallery;