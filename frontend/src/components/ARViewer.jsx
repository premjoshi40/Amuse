import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { museumHandlers } from '../mock';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { 
  ArrowLeft, 
  Camera, 
  RotateCcw,
  Maximize2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Info,
  Loader2,
  Smartphone
} from 'lucide-react';

const ARViewer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isARActive, setIsARActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [artwork, setArtwork] = useState(null);
  const [arMode, setArMode] = useState('3d'); // '3d', 'info', 'animation'
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Get artwork from navigation state if provided
  const artworkId = location.state?.artworkId;

  useEffect(() => {
    if (artworkId) {
      const artworkData = museumHandlers.getArtwork(artworkId);
      setArtwork(artworkData);
    }
  }, [artworkId]);

  const initializeAR = async () => {
    setIsLoading(true);
    
    try {
      const result = await museumHandlers.initializeAR();
      if (result.success) {
        setIsARActive(true);
        toast({
          title: "AR Mode Activated!",
          description: "Point your camera at the artwork to begin",
        });
      }
    } catch (error) {
      toast({
        title: "AR Initialization Failed",
        description: "Please check camera permissions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    toast({
      title: audioEnabled ? "Audio Disabled" : "Audio Enabled",
      description: audioEnabled ? "AR sounds muted" : "AR sounds activated",
    });
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Animation Paused" : "Animation Playing",
      description: isPlaying ? "3D animation stopped" : "3D animation started",
    });
  };

  const switchMode = (mode) => {
    setArMode(mode);
    toast({
      title: "AR Mode Changed",
      description: `Switched to ${mode} mode`,
    });
  };

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
          
          <div className="text-center">
            <h1 className="text-xl font-bold" style={{ color: '#ffffff' }}>
              AR Experience
            </h1>
            <p className="text-sm" style={{ color: '#888888' }}>
              Immersive artwork visualization
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAudio}
            style={{ color: audioEnabled ? '#d4af37' : '#888888' }}
          >
            {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* AR Interface */}
      <main className="pb-24">
        
        {!isARActive ? (
          /* AR Setup Screen */
          <div className="px-6 py-12">
            <div className="max-w-md mx-auto text-center">
              
              {artwork && (
                <Card className="border-0 mb-8" style={{ backgroundColor: '#1a1a1a' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="text-left">
                        <h3 className="font-semibold mb-1" style={{ color: '#ffffff' }}>
                          {artwork.title}
                        </h3>
                        <p className="text-sm" style={{ color: '#d4af37' }}>
                          {artwork.artist}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-6">
                <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center"
                     style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                  {isLoading ? (
                    <Loader2 className="h-16 w-16 animate-spin" style={{ color: '#d4af37' }} />
                  ) : (
                    <Camera className="h-16 w-16" style={{ color: '#d4af37' }} />
                  )}
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold" style={{ color: '#ffffff' }}>
                    Activate AR Mode
                  </h2>
                  <p style={{ color: '#888888' }}>
                    Experience this artwork in 3D with interactive elements and detailed information overlays
                  </p>
                </div>

                <Button
                  onClick={initializeAR}
                  disabled={isLoading}
                  size="lg"
                  style={{
                    backgroundColor: '#d4af37',
                    color: '#000000',
                    padding: '1rem 2rem'
                  }}
                >
                  {isLoading ? 'Initializing...' : 'Start AR Experience'}
                </Button>
              </div>

              {/* Instructions */}
              <Card className="border-0 mt-8" style={{ backgroundColor: '#1a1a1a' }}>
                <CardHeader>
                  <CardTitle className="text-center" style={{ color: '#ffffff' }}>
                    AR Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm" style={{ color: '#cccccc' }}>
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-4 w-4" style={{ color: '#d4af37' }} />
                      <span>Hold your phone steady and point at the artwork</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Camera className="h-4 w-4" style={{ color: '#d4af37' }} />
                      <span>Allow camera access for AR functionality</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Info className="h-4 w-4" style={{ color: '#d4af37' }} />
                      <span>Tap on AR elements to get more information</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* AR Active Screen */
          <div className="relative h-screen">
            {/* Simulated Camera View */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-64 h-64 mx-auto rounded-lg border-2 border-dashed flex items-center justify-center"
                       style={{ borderColor: '#d4af37' }}>
                    <div className="text-center">
                      <Camera className="h-16 w-16 mx-auto mb-4" style={{ color: '#d4af37' }} />
                      <p style={{ color: '#ffffff' }}>AR Camera View</p>
                      <p className="text-sm" style={{ color: '#888888' }}>
                        Point at artwork to see 3D overlay
                      </p>
                    </div>
                  </div>
                  
                  {artwork && (
                    <div className="bg-black bg-opacity-50 rounded-lg p-4">
                      <Badge 
                        variant="secondary"
                        style={{
                          backgroundColor: 'rgba(212, 175, 55, 0.2)',
                          color: '#d4af37'
                        }}
                      >
                        AR Mode: {arMode.toUpperCase()}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* AR Overlay Elements */}
              <div className="absolute top-20 left-6 right-6">
                <div className="flex justify-between items-start">
                  <Card className="border-0" style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}>
                    <CardContent className="p-3">
                      <p className="text-sm" style={{ color: '#d4af37' }}>
                        {artwork?.title || 'Scan an artwork to begin'}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleAnimation}
                      style={{
                        backgroundColor: 'rgba(26, 26, 26, 0.8)',
                        color: isPlaying ? '#d4af37' : '#ffffff'
                      }}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{
                        backgroundColor: 'rgba(26, 26, 26, 0.8)',
                        color: '#ffffff'
                      }}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* AR Mode Selector */}
              <div className="absolute bottom-32 left-6 right-6">
                <div className="flex justify-center space-x-2 p-2 rounded-lg"
                     style={{ backgroundColor: 'rgba(26, 26, 26, 0.8)' }}>
                  <Button
                    variant={arMode === '3d' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => switchMode('3d')}
                    style={{
                      backgroundColor: arMode === '3d' ? '#d4af37' : 'transparent',
                      color: arMode === '3d' ? '#000000' : '#ffffff'
                    }}
                  >
                    3D View
                  </Button>
                  <Button
                    variant={arMode === 'info' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => switchMode('info')}
                    style={{
                      backgroundColor: arMode === 'info' ? '#d4af37' : 'transparent',
                      color: arMode === 'info' ? '#000000' : '#ffffff'
                    }}
                  >
                    Info
                  </Button>
                  <Button
                    variant={arMode === 'animation' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => switchMode('animation')}
                    style={{
                      backgroundColor: arMode === 'animation' ? '#d4af37' : 'transparent',
                      color: arMode === 'animation' ? '#000000' : '#ffffff'
                    }}
                  >
                    Animation
                  </Button>
                </div>
              </div>

              {/* Exit AR Button */}
              <div className="absolute top-6 right-6">
                <Button
                  onClick={() => setIsARActive(false)}
                  variant="ghost"
                  size="sm"
                  style={{
                    backgroundColor: 'rgba(26, 26, 26, 0.8)',
                    color: '#ffffff'
                  }}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Exit AR
                </Button>
              </div>
            </div>
          </div>
        )}
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
            <Info className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/scanner')}
            style={{ color: '#ffffff' }}
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/ar')}
            style={{ color: '#d4af37' }}
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/favorites')}
            style={{ color: '#ffffff' }}
          >
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ARViewer;