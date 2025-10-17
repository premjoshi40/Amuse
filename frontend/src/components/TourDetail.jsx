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
      <div className="min-h-screen flex items-center justify-center" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
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
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Header */}
      <header className="px-6 py-4 border-b" style={{ 
        borderColor: 'rgba(255, 255, 255, 0.2)',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tours')}
            style={{ 
              color: '#ff6b6b',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              borderRadius: '20px'
            }}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Tours
          </Button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold" style={{ 
              background: 'linear-gradient(135deg, #10ac84, #00a085)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {tour.name}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-sm" style={{ color: '#6c5ce7' }}>
              <span>{formatTime(elapsedTime)} / {tour.duration}</span>
              <span>•</span>
              <span>Stop {currentStop + 1} of {tour.stops.length}</span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTour}
            style={{ 
              color: '#00d2d3',
              backgroundColor: 'rgba(0, 210, 211, 0.1)',
              borderRadius: '15px'
            }}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 py-4" style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="max-w-4xl mx-auto">
          <Progress 
            value={progress} 
            className="w-full h-3"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '10px'
            }}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm" style={{ color: '#10ac84' }}>
              Progress: {Math.round(progress)}%
            </span>
            <Badge 
              style={{
                background: isCompleted ? 'linear-gradient(135deg, #10ac84, #00a085)' : 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '20px'
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
              <div className="mb-8" style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '25px',
                padding: '3rem'
              }}>
                <h2 className="text-3xl font-bold mb-4" style={{ 
                  background: 'linear-gradient(135deg, #ff6b6b, #6c5ce7, #10ac84)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {tour.name}
                </h2>
                <p className="text-lg" style={{ color: '#636e72' }}>
                  {tour.description}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="text-center p-6 rounded-20px" style={{
                  background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                  borderRadius: '20px'
                }}>
                  <Clock className="h-8 w-8 mx-auto mb-2" style={{ color: '#ff6b6b' }} />
                  <p className="font-semibold" style={{ color: '#2d3436' }}>{tour.duration}</p>
                  <p className="text-sm" style={{ color: '#636e72' }}>Duration</p>
                </div>
                <div className="text-center p-6 rounded-20px" style={{
                  background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                  borderRadius: '20px'
                }}>
                  <MapPin className="h-8 w-8 mx-auto mb-2" style={{ color: '#10ac84' }} />
                  <p className="font-semibold" style={{ color: '#2d3436' }}>{tour.stops.length} Stops</p>
                  <p className="text-sm" style={{ color: '#636e72' }}>Artworks</p>
                </div>
                <div className="text-center p-6 rounded-20px" style={{
                  background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
                  borderRadius: '20px'
                }}>
                  <Play className="h-8 w-8 mx-auto mb-2" style={{ color: '#6c5ce7' }} />
                  <p className="font-semibold" style={{ color: '#2d3436' }}>Self-Paced</p>
                  <p className="text-sm" style={{ color: '#636e72' }}>Experience</p>
                </div>
              </div>

              <Button
                onClick={startTour}
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
                <div className="text-center p-8 rounded-25px" style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '25px'
                }}>
                  <CheckCircle className="h-16 w-16 mx-auto mb-6" style={{ color: '#10ac84' }} />
                  <h2 className="text-3xl font-bold mb-4" style={{ 
                    background: 'linear-gradient(135deg, #10ac84, #00a085)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Tour Complete!
                  </h2>
                  <p className="text-lg mb-8" style={{ color: '#636e72' }}>
                    You've completed the {tour.name} in {formatTime(elapsedTime)}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() => navigate('/tours')}
                      style={{
                        background: 'linear-gradient(135deg, #6c5ce7, #5f27cd)',
                        color: '#ffffff',
                        borderRadius: '25px',
                        boxShadow: '0 8px 25px rgba(108, 92, 231, 0.4)',
                        border: 'none'
                      }}
                    >
                      Explore More Tours
                    </Button>
                    <Button
                      onClick={resetTour}
                      style={{
                        background: 'linear-gradient(135deg, #00d2d3, #54a0ff)',
                        color: '#ffffff',
                        borderRadius: '25px',
                        boxShadow: '0 8px 25px rgba(0, 210, 211, 0.4)',
                        border: 'none'
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
                    <Card className="border-0 shadow-lg" style={{ 
                      background: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '20px'
                    }}>
                      <CardContent className="p-0">
                        <div className="grid lg:grid-cols-2 gap-0">
                          <div className="relative">
                            <img
                              src={currentArtwork.image}
                              alt={currentArtwork.title}
                              className="w-full h-80 lg:h-full object-cover rounded-l-20px"
                              style={{ borderRadius: '20px 0 0 20px' }}
                            />
                            <div className="absolute top-4 left-4">
                              <Badge 
                                style={{
                                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                                  color: '#ffffff',
                                  borderRadius: '15px',
                                  border: 'none'
                                }}
                              >
                                Stop {currentStop + 1} of {tour.stops.length}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="mb-6">
                              <h3 className="text-2xl font-bold mb-2" style={{ color: '#2d3436' }}>
                                {currentArtwork.title}
                              </h3>
                              <p className="text-lg mb-2" style={{ color: '#ff6b6b' }}>
                                {currentArtwork.artist}
                              </p>
                              <p className="text-sm mb-4" style={{ color: '#636e72' }}>
                                {currentArtwork.year} • {currentArtwork.location}
                              </p>
                            </div>

                            <div className="mb-6">
                              <h4 className="font-semibold mb-3" style={{ color: '#10ac84' }}>
                                Tour Focus:
                              </h4>
                              <p style={{ color: '#636e72' }}>
                                {tour.stops[currentStop].focus}
                              </p>
                            </div>

                            <div className="flex space-x-3">
                              <Button
                                onClick={() => viewArtwork(currentArtwork.id)}
                                variant="outline"
                                size="sm"
                                style={{
                                  background: 'transparent',
                                  border: '2px solid #6c5ce7',
                                  color: '#6c5ce7',
                                  borderRadius: '15px'
                                }}
                              >
                                View Details
                              </Button>
                              <Button
                                onClick={() => navigate('/scanner', { state: { targetQR: currentArtwork.qrCode } })}
                                variant="outline"
                                size="sm"
                                style={{
                                  background: 'transparent',
                                  border: '2px solid #00d2d3',
                                  color: '#00d2d3',
                                  borderRadius: '15px'
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
                                  background: 'transparent',
                                  border: '2px solid #10ac84',
                                  color: '#10ac84',
                                  borderRadius: '15px'
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
               style={{ 
                 background: 'rgba(255, 255, 255, 0.95)', 
                 backdropFilter: 'blur(10px)',
                 borderRadius: '25px',
                 boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
               }}>
            <Button
              onClick={previousStop}
              disabled={currentStop === 0}
              variant="outline"
              size="sm"
              style={{
                background: 'transparent',
                border: '2px solid #ff6b6b',
                color: currentStop === 0 ? '#cccccc' : '#ff6b6b',
                borderRadius: '15px'
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={pauseTour}
              style={{
                background: 'linear-gradient(135deg, #6c5ce7, #5f27cd)',
                color: '#ffffff',
                borderRadius: '15px',
                border: 'none'
              }}
            >
              {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              onClick={nextStop}
              style={{
                background: 'linear-gradient(135deg, #10ac84, #00a085)',
                color: '#ffffff',
                borderRadius: '15px',
                border: 'none'
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
            style={{ color: '#10ac84' }}
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/tours')}
            style={{ color: '#6c5ce7' }}
          >
            <Play className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;