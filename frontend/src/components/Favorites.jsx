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
              My Collection
            </h1>
            <p className="text-sm" style={{ color: '#10ac84' }}>
              {favorites.length} saved artworks
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? 'linear-gradient(135deg, #10ac84, #00a085)' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : '#10ac84',
                borderRadius: '15px',
                border: viewMode === 'grid' ? 'none' : '2px solid #10ac84'
              }}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              style={{
                background: viewMode === 'list' ? 'linear-gradient(135deg, #10ac84, #00a085)' : 'transparent',
                color: viewMode === 'list' ? '#ffffff' : '#10ac84',
                borderRadius: '15px',
                border: viewMode === 'list' ? 'none' : '2px solid #10ac84'
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
            <div className="text-center py-16" style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '25px',
              padding: '3rem'
            }}>
              <Heart className="h-16 w-16 mx-auto mb-6" style={{ color: '#ff6b6b' }} />
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#2d3436' }}>
                No Favorites Yet
              </h2>
              <p className="text-lg mb-8 max-w-md mx-auto" style={{ color: '#636e72' }}>
                Start exploring the museum and tap the heart icon to save your favorite artworks here
              </p>
              <Button
                onClick={() => navigate('/')}
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                  color: '#ffffff',
                  borderRadius: '25px',
                  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
                  border: 'none'
                }}
              >
                Explore Museum
              </Button>
            </div>
          ) : (
            /* Favorites Content */
            <div>
              {/* Action Bar */}
              <div className="flex justify-between items-center mb-8 p-4 rounded-20px"
                   style={{
                     background: 'rgba(255, 255, 255, 0.9)',
                     borderRadius: '20px'
                   }}>
                <div>
                  <Badge 
                    style={{
                      background: 'rgba(255, 107, 107, 0.2)',
                      color: '#ff6b6b',
                      border: '2px solid #ff6b6b',
                      borderRadius: '20px'
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
                      background: 'transparent',
                      border: '2px solid #10ac84',
                      color: '#10ac84',
                      borderRadius: '20px'
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
                      background: 'transparent',
                      border: '2px solid #00d2d3',
                      color: '#00d2d3',
                      borderRadius: '20px'
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
                      background: 'transparent',
                      border: '2px solid #ff6b6b',
                      color: '#ff6b6b',
                      borderRadius: '20px'
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Artwork Grid/List */}
              <div className={viewMode === 'grid' 
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
              }>
                {favoriteArtworks.map((artwork, index) => {
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
                            viewMode === 'list' ? 'h-32 rounded-l-lg' : 'h-48 rounded-t-lg'
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
                                removeFromFavorites(artwork.id);
                              }}
                              style={{
                                color: '#ff6b6b',
                                backgroundColor: 'rgba(255, 107, 107, 0.2)',
                                borderRadius: '15px'
                              }}
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </Button>
                          </div>
                        </CardHeader>
                        
                        <CardContent className={viewMode === 'list' ? 'pt-0' : ''}>
                          {viewMode === 'list' && (
                            <p className="text-sm mb-3 line-clamp-2" style={{ color: '#2d3436' }}>
                              {artwork.description}
                            </p>
                          )}

                          <div className="flex justify-between items-center">
                            <Badge 
                              style={{
                                background: 'rgba(255, 255, 255, 0.8)',
                                color: '#10ac84',
                                border: '1px solid #10ac84',
                                fontSize: '0.75rem',
                                borderRadius: '12px'
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
                                  color: '#10ac84',
                                  backgroundColor: 'rgba(16, 172, 132, 0.1)',
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

              {/* Collection Stats */}
              <Card className="border-0 mt-12 shadow-lg" style={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '20px'
              }}>
                <CardHeader>
                  <CardTitle style={{ color: '#2d3436' }}>Collection Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold mb-1" style={{ color: '#ff6b6b' }}>
                        {favoriteArtworks.filter(art => art.category === 'paintings').length}
                      </div>
                      <p className="text-sm" style={{ color: '#636e72' }}>Paintings</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1" style={{ color: '#10ac84' }}>
                        {favoriteArtworks.filter(art => art.category === 'sculptures').length}
                      </div>
                      <p className="text-sm" style={{ color: '#636e72' }}>Sculptures</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1" style={{ color: '#00d2d3' }}>
                        {favoriteArtworks.filter(art => art.category === 'historical').length}
                      </div>
                      <p className="text-sm" style={{ color: '#636e72' }}>Historical</p>
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
            <Grid3X3 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/scanner')}
            style={{ color: '#00d2d3' }}
          >
            <QrCode className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/ar')}
            style={{ color: '#10ac84' }}
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/favorites')}
            style={{ color: '#ff6b6b' }}
          >
            <Heart className="h-5 w-5 fill-current" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Favorites;