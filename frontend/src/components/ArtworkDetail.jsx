import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { museumHandlers } from '../mock';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  QrCode, 
  Camera,
  Share2,
  Info,
  Palette,
  History,
  Sparkles,
  Calendar,
  Ruler
} from 'lucide-react';

const ArtworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const artworkData = museumHandlers.getArtwork(id);
    setArtwork(artworkData);
    setFavorites(museumHandlers.getFavorites());
  }, [id]);

  const toggleFavorite = () => {
    if (favorites.includes(id)) {
      const updated = museumHandlers.removeFromFavorites(id);
      setFavorites(updated);
    } else {
      const updated = museumHandlers.addToFavorites(id);
      setFavorites(updated);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork.title,
          text: `Check out ${artwork.title} by ${artwork.artist}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f0f0f' }}>
        <p style={{ color: '#ffffff' }}>Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f0f' }}>
      {/* Header */}
      <header className="px-6 py-4 border-b" style={{ borderColor: '#1f1f1f' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            style={{ color: '#d4af37' }}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFavorite}
              style={{
                color: favorites.includes(artwork.id) ? '#ff6b6b' : '#888888'
              }}
            >
              <Heart 
                className="h-5 w-5"
                fill={favorites.includes(artwork.id) ? 'currentColor' : 'none'}
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              style={{ color: '#d4af37' }}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24">
        {/* Hero Image */}
        <div className="relative">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>
              {artwork.title}
            </h1>
            <div className="flex items-center space-x-4">
              <p className="text-xl" style={{ color: '#d4af37' }}>
                {artwork.artist}
              </p>
              <Badge 
                variant="secondary"
                style={{
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  color: '#ffffff',
                  border: '1px solid rgba(212, 175, 55, 0.5)'
                }}
              >
                {artwork.year}
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-6" style={{ backgroundColor: '#1a1a1a' }}>
          <div className="max-w-7xl mx-auto flex justify-center space-x-4">
            <Button
              onClick={() => navigate('/scanner', { state: { targetQR: artwork.qrCode } })}
              style={{
                backgroundColor: '#d4af37',
                color: '#000000',
                borderRadius: '12px'
              }}
            >
              <QrCode className="mr-2 h-4 w-4" />
              Scan QR Code
            </Button>
            <Button
              onClick={() => navigate('/ar', { state: { artworkId: artwork.id } })}
              variant="outline"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #d4af37',
                color: '#d4af37',
                borderRadius: '12px'
              }}
            >
              <Camera className="mr-2 h-4 w-4" />
              AR View
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="px-6 py-6">
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4" style={{ backgroundColor: '#1a1a1a' }}>
                <TabsTrigger 
                  value="overview"
                  style={{ 
                    color: activeTab === 'overview' ? '#000000' : '#888888',
                    backgroundColor: activeTab === 'overview' ? '#d4af37' : 'transparent'
                  }}
                >
                  <Info className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="history"
                  style={{ 
                    color: activeTab === 'history' ? '#000000' : '#888888',
                    backgroundColor: activeTab === 'history' ? '#d4af37' : 'transparent'
                  }}
                >
                  <History className="h-4 w-4 mr-2" />
                  History
                </TabsTrigger>
                <TabsTrigger 
                  value="technique"
                  style={{ 
                    color: activeTab === 'technique' ? '#000000' : '#888888',
                    backgroundColor: activeTab === 'technique' ? '#d4af37' : 'transparent'
                  }}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Technique
                </TabsTrigger>
                <TabsTrigger 
                  value="details"
                  style={{ 
                    color: activeTab === 'details' ? '#000000' : '#888888',
                    backgroundColor: activeTab === 'details' ? '#d4af37' : 'transparent'
                  }}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="border-0" style={{ backgroundColor: '#1a1a1a' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#ffffff' }}>About This Artwork</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed mb-6" style={{ color: '#cccccc' }}>
                      {artwork.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center" style={{ color: '#d4af37' }}>
                          <MapPin className="h-4 w-4 mr-2" />
                          Location
                        </h4>
                        <p style={{ color: '#cccccc' }}>{artwork.location}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center" style={{ color: '#d4af37' }}>
                          <QrCode className="h-4 w-4 mr-2" />
                          Quick Access
                        </h4>
                        <div className="flex space-x-2">
                          <Badge variant="outline" style={{ color: '#d4af37', borderColor: '#d4af37' }}>
                            {artwork.qrCode}
                          </Badge>
                          <Badge variant="outline" style={{ color: '#d4af37', borderColor: '#d4af37' }}>
                            {artwork.nfcCode}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card className="border-0" style={{ backgroundColor: '#1a1a1a' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#ffffff' }}>Historical Context</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: '#d4af37' }}>About the Artist</h4>
                      <p style={{ color: '#cccccc' }}>{artwork.artist_info}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: '#d4af37' }}>Historical Background</h4>
                      <p style={{ color: '#cccccc' }}>{artwork.historical_context}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: '#d4af37' }}>Cultural Significance</h4>
                      <p style={{ color: '#cccccc' }}>{artwork.cultural_significance}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technique" className="mt-6">
                <Card className="border-0" style={{ backgroundColor: '#1a1a1a' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#ffffff' }}>Artistic Techniques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: '#d4af37' }}>Medium & Techniques</h4>
                      <p style={{ color: '#cccccc' }}>{artwork.techniques}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center" style={{ color: '#d4af37' }}>
                          <Palette className="h-4 w-4 mr-2" />
                          Medium
                        </h4>
                        <p style={{ color: '#cccccc' }}>{artwork.medium}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center" style={{ color: '#d4af37' }}>
                          <Ruler className="h-4 w-4 mr-2" />
                          Dimensions
                        </h4>
                        <p style={{ color: '#cccccc' }}>{artwork.dimensions}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="mt-6">
                <Card className="border-0" style={{ backgroundColor: '#1a1a1a' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#ffffff' }}>Interesting Facts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: '#d4af37' }}>Provenance</h4>
                      <p style={{ color: '#cccccc' }}>{artwork.provenance}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4" style={{ color: '#d4af37' }}>Did You Know?</h4>
                      <ul className="space-y-3">
                        {artwork.interesting_facts.map((fact, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                 style={{ backgroundColor: '#d4af37' }}></div>
                            <span style={{ color: '#cccccc' }}>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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

export default ArtworkDetail;