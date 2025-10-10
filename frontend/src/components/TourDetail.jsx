import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { museumData, museumHandlers } from '../mock';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  ArrowRight,
  Clock, 
  MapPin, 
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Camera,
  QrCode
} from 'lucide-react';

const TourDetail = () => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [currentStop, setCurrentStop] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [completedStops, setCompletedStops] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const tourData = museumHandlers.getTour(tourId);
    setTour(tourData);
  }, [tourId]);

  useEffect(() => {
    let interval;
    if (isActive && tour) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, tour]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTour = () => {
    setIsActive(true);
    setCurrentStop(0);
    setCompletedStops([]);
    setElapsedTime(0);
  };

  const pauseTour = () => {
    setIsActive(!isActive);
  };

  const nextStop = () => {
    if (currentStop < tour.stops.length - 1) {
      setCompletedStops(prev => [...prev, currentStop]);
      setCurrentStop(prev => prev + 1);
    } else {
      // Tour completed
      setCompletedStops(prev => [...prev, currentStop]);
      setIsActive(false);
    }
  };

  const previousStop = () => {
    if (currentStop > 0) {
      setCurrentStop(prev => prev - 1);
      setCompletedStops(prev => prev.filter(stop => stop !== currentStop - 1));
    }
  };

  const resetTour = () => {
    setIsActive(false);
    setCurrentStop(0);
    setCompletedStops([]);
    setElapsedTime(0);
  };

  const viewArtwork = (artworkId) => {
    navigate(`/artwork/${artworkId}`);
  };

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f0f0f' }}>
        <p style={{ color: '#ffffff' }}>Tour not found</p>
      </div>
    );
  }

  const currentArtwork = Object.values(museumData.artworks)
    .flat()
    .find(art => art.id === tour.stops[currentStop]?.artwork);

  const progress = ((completedStops.length + (isActive ? 0.5 : 0)) / tour.stops.length) * 100;
  const isCompleted = completedStops.length === tour.stops.length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f0f' }}>
      {/* Header */}
      <header className="px-6 py-4 border-b" style={{ borderColor: '#1f1f1f' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tours')}
            style={{ color: '#d4af37' }}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Tours
          </Button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold" style={{ color: '#ffffff' }}>
              {tour.name}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-sm" style={{ color: '#888888' }}>
              <span>{formatTime(elapsedTime)} / {tour.duration}</span>
              <span>•</span>
              <span>Stop {currentStop + 1} of {tour.stops.length}</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTour}
            style={{ color: '#888888' }}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 py-4" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto">
          <Progress 
            value={progress} 
            className="w-full h-2"
            style={{ backgroundColor: '#333333' }}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm" style={{ color: '#888888' }}>
              Progress: {Math.round(progress)}%
            </span>
            <Badge 
              variant={isCompleted ? "default" : "secondary"}
              style={{
                backgroundColor: isCompleted ? '#4ade80' : 'rgba(212, 175, 55, 0.1)',
                color: isCompleted ? '#000000' : '#d4af37'
              }}
            >
              {isCompleted ? 'Completed!' : isActive ? 'Active' : 'Paused'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-24">
        {!isActive && currentStop === 0 && completedStops.length === 0 ? (
          /* Tour Start Screen */
          <div className="px-6 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
                  {tour.name}
                </h2>
                <p className="text-lg" style={{ color: '#888888' }}>
                  {tour.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2" style={{ color: '#d4af37' }} />
                  <p className="font-semibold" style={{ color: '#ffffff' }}>{tour.duration}</p>
                  <p className="text-sm" style={{ color: '#888888' }}>Duration</p>
                </div>
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2" style={{ color: '#d4af37' }} />
                  <p className="font-semibold" style={{ color: '#ffffff' }}>{tour.stops.length} Stops</p>
                  <p className="text-sm" style={{ color: '#888888' }}>Artworks</p>
                </div>
                <div className="text-center">
                  <Play className="h-8 w-8 mx-auto mb-2" style={{ color: '#d4af37' }} />
                  <p className="font-semibold" style={{ color: '#ffffff' }}>Self-Paced</p>
                  <p className="text-sm" style={{ color: '#888888' }}>Experience</p>
                </div>
              </div>

              <Button
                onClick={startTour}
                size="lg"
                style={{
                  backgroundColor: '#d4af37',
                  color: '#000000',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem'
                }}
              >
                <Play className="h-5 w-5 mr-2" />
                Begin Tour
              </Button>
            </div>
          </div>
        ) : (
          /* Active Tour Content */
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
              
              {isCompleted ? (
                /* Tour Completion Screen */
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 mx-auto mb-6" style={{ color: '#4ade80' }} />
                  <h2 className="text-3xl font-bold mb-4" style={{ color: '#ffffff' }}>
                    Tour Complete!
                  </h2>
                  <p className="text-lg mb-8" style={{ color: '#888888' }}>
                    You've completed the {tour.name} in {formatTime(elapsedTime)}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() => navigate('/tours')}
                      style={{
                        backgroundColor: '#d4af37',
                        color: '#000000'
                      }}
                    >
                      Explore More Tours
                    </Button>
                    <Button
                      onClick={resetTour}
                      variant="outline"
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #d4af37',
                        color: '#d4af37'
                      }}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Restart Tour
                    </Button>
                  </div>
                </div>
              ) : (
                /* Current Stop Content */
                <div className="space-y-8">
                  {/* Current Artwork */}
                  {currentArtwork && (
                    <Card className="border-0" style={{ backgroundColor: '#1a1a1a' }}>
                      <CardContent className="p-0">
                        <div className="grid lg:grid-cols-2 gap-0">
                          <div className="relative">
                            <img
                              src={currentArtwork.image}
                              alt={currentArtwork.title}
                              className="w-full h-80 lg:h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge 
                                style={{
                                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                  color: '#d4af37'
                                }}
                              >
                                Stop {currentStop + 1} of {tour.stops.length}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="mb-6">
                              <h3 className="text-2xl font-bold mb-2" style={{ color: '#ffffff' }}>
                                {currentArtwork.title}
                              </h3>
                              <p className="text-lg mb-2" style={{ color: '#d4af37' }}>
                                {currentArtwork.artist}
                              </p>
                              <p className="text-sm mb-4" style={{ color: '#888888' }}>
                                {currentArtwork.year} • {currentArtwork.location}
                              </p>
                            </div>

                            <div className="mb-6">
                              <h4 className="font-semibold mb-3" style={{ color: '#d4af37' }}>
                                Tour Focus:
                              </h4>
                              <p style={{ color: '#cccccc' }}>
                                {tour.stops[currentStop].focus}
                              </p>
                            </div>

                            <div className="flex space-x-3">
                              <Button
                                onClick={() => viewArtwork(currentArtwork.id)}
                                variant="outline"
                                size="sm"
                                style={{
                                  backgroundColor: 'transparent',
                                  border: '1px solid #d4af37',
                                  color: '#d4af37'
                                }}
                              >
                                View Details
                              </Button>
                              <Button
                                onClick={() => navigate('/scanner', { state: { targetQR: currentArtwork.qrCode } })}
                                variant="outline"
                                size="sm"
                                style={{
                                  backgroundColor: 'transparent',
                                  border: '1px solid #d4af37',
                                  color: '#d4af37'
                                }}
                              >
                                <QrCode className="h-4 w-4 mr-2" />
                                Scan
                              </Button>
                              <Button
                                onClick={() => navigate('/ar', { state: { artworkId: currentArtwork.id } })}
                                variant="outline"
                                size="sm"
                                style={{
                                  backgroundColor: 'transparent',
                                  border: '1px solid #d4af37',
                                  color: '#d4af37'
                                }}
                              >
                                <Camera className="h-4 w-4 mr-2" />
                                AR View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Tour Controls */}
      {isActive && !isCompleted && (
        <div className="fixed bottom-20 left-0 right-0 px-6">
          <div className="max-w-md mx-auto flex justify-center space-x-4 p-4 rounded-lg"
               style={{ backgroundColor: 'rgba(15, 15, 15, 0.95)', backdropFilter: 'blur(10px)' }}>
            <Button
              onClick={previousStop}
              disabled={currentStop === 0}
              variant="outline"
              size="sm"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #d4af37',
                color: currentStop === 0 ? '#666666' : '#d4af37'
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={pauseTour}
              style={{
                backgroundColor: '#d4af37',
                color: '#000000'
              }}
            >
              {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              onClick={nextStop}
              style={{
                backgroundColor: '#d4af37',
                color: '#000000'
              }}
            >
              {currentStop === tour.stops.length - 1 ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}

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
            onClick={() => navigate('/tours')}
            style={{ color: '#d4af37' }}
          >
            <Play className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;