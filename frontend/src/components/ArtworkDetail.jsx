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
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <p style={{ color: '#ffffff' }}>Artwork not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
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
            onClick={() => navigate(-1)}
            style={{ 
              color: '#ff6b6b',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              borderRadius: '20px'
            }}
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
                color: favorites.includes(artwork.id) ? '#ff6b6b' : '#636e72',
                backgroundColor: favorites.includes(artwork.id) ? 'rgba(255, 107, 107, 0.1)' : 'rgba(99, 110, 114, 0.1)',
                borderRadius: '15px'
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
              style={{ 
                color: '#6c5ce7',
                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                borderRadius: '15px'
              }}
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
              <p className="text-xl" style={{ color: '#ff6b6b' }}>
                {artwork.artist}
              </p>
              <Badge 
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#6c5ce7',
                  border: '2px solid #6c5ce7',
                  borderRadius: '20px'
                }}
              >
                {artwork.year}
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-6" style={{ 
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="max-w-7xl mx-auto flex justify-center space-x-4">
            <Button
              onClick={() => navigate('/scanner', { state: { targetQR: artwork.qrCode } })}
              style={{
                background: 'linear-gradient(135deg, #00d2d3, #54a0ff)',
                color: '#ffffff',
                borderRadius: '25px',
                boxShadow: '0 8px 25px rgba(0, 210, 211, 0.4)',
                border: 'none'
              }}
            >
              <QrCode className="mr-2 h-4 w-4" />
              Scan QR Code
            </Button>
            <Button
              onClick={() => navigate('/ar', { state: { artworkId: artwork.id } })}
              style={{
                background: 'linear-gradient(135deg, #6c5ce7, #10ac84)',
                color: '#ffffff',
                borderRadius: '25px',
                boxShadow: '0 8px 25px rgba(108, 92, 231, 0.4)',
                border: 'none'
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
              <TabsList className="grid w-full grid-cols-4" style={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px'
              }}>
                {[
                  { value: 'overview', icon: Info, label: 'Overview' },
                  { value: 'history', icon: History, label: 'History' },
                  { value: 'technique', icon: Palette, label: 'Technique' },
                  { value: 'details', icon: Sparkles, label: 'Details' }
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value}
                    style={{ 
                      color: activeTab === tab.value ? '#ffffff' : '#636e72',
                      background: activeTab === tab.value ? 'linear-gradient(135deg, #ff6b6b, #10ac84)' : 'transparent',
                      borderRadius: '15px',
                      border: 'none'
                    }}
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="border-0 shadow-lg" style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px'
                }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#2d3436' }}>About This Artwork</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed mb-6" style={{ color: '#636e72' }}>
                      {artwork.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center" style={{ color: '#ff6b6b' }}>
                          <MapPin className="h-4 w-4 mr-2" />
                          Location
                        </h4>
                        <p style={{ color: '#636e72' }}>{artwork.location}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center" style={{ color: '#6c5ce7' }}>
                          <QrCode className="h-4 w-4 mr-2" />
                          Quick Access
                        </h4>
                        <div className="flex space-x-2">
                          <Badge style={{ 
                            color: '#00d2d3', 
                            borderColor: '#00d2d3',
                            background: 'rgba(0, 210, 211, 0.1)',
                            borderRadius: '12px'
                          }}>
                            {artwork.qrCode}
                          </Badge>
                          <Badge style={{ 
                            color: '#6c5ce7', 
                            borderColor: '#6c5ce7',
                            background: 'rgba(108, 92, 231, 0.1)',
                            borderRadius: '12px'
                          }}>
                            {artwork.nfcCode}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card className="border-0 shadow-lg" style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px'
                }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#2d3436' }}>Historical Context</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: '#ff6b6b' }}>About the Artist</h4>
                      <p style={{ color: '#636e72' }}>{artwork.artist_info}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: '#6c5ce7' }}>Historical Background</h4>
                      <p style={{ color: '#636e72' }}>{artwork.historical_context}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: '#00d2d3' }}>Cultural Significance</h4>
                      <p style={{ color: '#636e72' }}>{artwork.cultural_significance}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technique" className="mt-6">
                <Card className="border-0 shadow-lg" style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px'
                }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#2d3436' }}>Artistic Techniques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: '#ff6b6b' }}>Medium & Techniques</h4>
                      <p style={{ color: '#636e72' }}>{artwork.techniques}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center" style={{ color: '#6c5ce7' }}>
                          <Palette className="h-4 w-4 mr-2" />
                          Medium
                        </h4>
                        <p style={{ color: '#636e72' }}>{artwork.medium}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center" style={{ color: '#00d2d3' }}>
                          <Ruler className="h-4 w-4 mr-2" />
                          Dimensions
                        </h4>
                        <p style={{ color: '#636e72' }}>{artwork.dimensions}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="mt-6">
                <Card className="border-0 shadow-lg" style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '20px'
                }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#2d3436' }}>Interesting Facts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3" style={{ color: '#ff6b6b' }}>Provenance</h4>
                      <p style={{ color: '#636e72' }}>{artwork.provenance}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4" style={{ color: '#6c5ce7' }}>Did You Know?</h4>
                      <ul className="space-y-3">
                        {artwork.interesting_facts.map((fact, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                 style={{ backgroundColor: index % 2 === 0 ? '#ff6b6b' : '#6c5ce7' }}></div>
                            <span style={{ color: '#636e72' }}>{fact}</span>
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

export default ArtworkDetail;