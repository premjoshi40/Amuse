import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { museumHandlers } from '../mock';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Heart, 
  Trash2,
  Share2,
  Download,
  Grid3X3,
  List,
  Camera,
  QrCode,
  Route
} from 'lucide-react';

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [favoriteArtworks, setFavoriteArtworks] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const favoriteIds = museumHandlers.getFavorites();
    setFavorites(favoriteIds);
    
    // Get full artwork data for favorites
    const artworks = favoriteIds.map(id => museumHandlers.getArtwork(id)).filter(Boolean);
    setFavoriteArtworks(artworks);
  }, []);

  const removeFromFavorites = (artworkId) => {
    const updated = museumHandlers.removeFromFavorites(artworkId);
    setFavorites(updated);
    setFavoriteArtworks(prev => prev.filter(art => art.id !== artworkId));
  };

  const clearAllFavorites = () => {
    favorites.forEach(id => museumHandlers.removeFromFavorites(id));
    setFavorites([]);
    setFavoriteArtworks([]);
  };

  const shareCollection = async () => {
    const artworkTitles = favoriteArtworks.map(art => art.title).join(', ');
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Museum Collection',
          text: `Check out my favorite artworks: ${artworkTitles}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(
        `My favorite artworks from the museum: ${artworkTitles}`
      );
    }
  };

  const createCustomTour = () => {
    // This would create a custom tour based on favorites
    navigate('/tours', { state: { customArtworks: favorites } });
  };

  const handleArtworkClick = (artworkId) => {
    navigate(`/artwork/${artworkId}`);
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
              My Collection
            </h1>
            <p className="text-sm" style={{ color: '#888888' }}>
              {favorites.length} saved artworks
            </p>
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

      {/* Main Content */}
      <main className="px-6 py-8 pb-24">
        <div className="max-w-7xl mx-auto">
          
          {favoriteArtworks.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <Heart className="h-16 w-16 mx-auto mb-6" style={{ color: '#888888' }} />
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#ffffff' }}>
                No Favorites Yet
              </h2>
              <p className="text-lg mb-8 max-w-md mx-auto" style={{ color: '#888888' }}>
                Start exploring the museum and tap the heart icon to save your favorite artworks here
              </p>
              <Button
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: '#d4af37',
                  color: '#000000'
                }}
              >
                Explore Museum
              </Button>
            </div>
          ) : (
            /* Favorites Content */
            <div>
              {/* Action Bar */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <Badge 
                    variant="secondary"
                    style={{
                      backgroundColor: 'rgba(212, 175, 55, 0.1)',
                      color: '#d4af37',
                      border: '1px solid rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    {favoriteArtworks.length} artworks
                  </Badge>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={createCustomTour}
                    variant="outline"
                    size="sm"
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #d4af37',
                      color: '#d4af37'
                    }}
                  >
                    <Route className="h-4 w-4 mr-2" />
                    Create Tour
                  </Button>
                  <Button
                    onClick={shareCollection}
                    variant="outline"
                    size="sm"
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #d4af37',
                      color: '#d4af37'
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    onClick={clearAllFavorites}
                    variant="outline"
                    size="sm"
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #f87171',
                      color: '#f87171'
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Artwork Grid/List */}
              <div className={viewMode === 'grid' 
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
              }>
                {favoriteArtworks.map((artwork) => (
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
                          viewMode === 'list' ? 'h-32 rounded-l-lg' : 'h-48 rounded-t-lg'
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
                              removeFromFavorites(artwork.id);
                            }}
                            style={{ color: '#ff6b6b' }}
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                      </CardHeader>
                      
                      <CardContent className={viewMode === 'list' ? 'pt-0' : ''}>
                        {viewMode === 'list' && (
                          <p className="text-sm mb-3 line-clamp-2" style={{ color: '#cccccc' }}>
                            {artwork.description}
                          </p>
                        )}

                        <div className="flex justify-between items-center">
                          <Badge 
                            variant="outline"
                            style={{
                              backgroundColor: 'transparent',
                              color: '#d4af37',
                              border: '1px solid #d4af37',
                              fontSize: '0.75rem'
                            }}
                          >
                            {artwork.category}
                          </Badge>
                          
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

              {/* Collection Stats */}
              <Card className="border-0 mt-12" style={{ backgroundColor: '#1a1a1a' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#ffffff' }}>Collection Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold mb-1" style={{ color: '#d4af37' }}>
                        {favoriteArtworks.filter(art => art.category === 'paintings').length}
                      </div>
                      <p className="text-sm" style={{ color: '#888888' }}>Paintings</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1" style={{ color: '#d4af37' }}>
                        {favoriteArtworks.filter(art => art.category === 'sculptures').length}
                      </div>
                      <p className="text-sm" style={{ color: '#888888' }}>Sculptures</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1" style={{ color: '#d4af37' }}>
                        {favoriteArtworks.filter(art => art.category === 'historical').length}
                      </div>
                      <p className="text-sm" style={{ color: '#888888' }}>Historical</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
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
            <Grid3X3 className="h-5 w-5" />
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
            style={{ color: '#d4af37' }}
          >
            <Heart className="h-5 w-5 fill-current" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Favorites;