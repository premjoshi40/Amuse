import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { museumHandlers } from '../mock';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { 
  ArrowLeft, 
  QrCode, 
  Wifi, 
  Camera,
  Scan,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

const Scanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanType, setScanType] = useState('qr');
  
  // Get target QR from navigation state if provided
  const targetQR = location.state?.targetQR;

  useEffect(() => {
    // Auto-scan if target QR is provided
    if (targetQR) {
      handleScan('qr', targetQR);
    }
  }, [targetQR]);

  const simulateScan = async (type, code) => {
    setIsScanning(true);
    setScanResult(null);
    
    try {
      let result;
      if (type === 'qr') {
        result = await museumHandlers.scanQR(code);
      } else {
        result = await museumHandlers.scanNFC(code);
      }
      
      if (result) {
        setScanResult({ success: true, artwork: result });
        toast({
          title: "Scan Successful!",
          description: `Found artwork: ${result.title}`,
        });
      } else {
        setScanResult({ success: false, error: 'Artwork not found' });
        toast({
          title: "Scan Failed",
          description: "No artwork found for this code",
          variant: "destructive",
        });
      }
    } catch (error) {
      setScanResult({ success: false, error: error.message });
      toast({
        title: "Scan Error",
        description: "Failed to scan code",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleScan = (type, code) => {
    setScanType(type);
    simulateScan(type, code);
  };

  const handleManualScan = (code) => {
    handleScan('qr', code);
  };

  const viewArtwork = (artworkId) => {
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
            onClick={() => navigate(-1)}
            style={{ color: '#d4af37' }}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold" style={{ color: '#ffffff' }}>
              Scanner
            </h1>
            <p className="text-sm" style={{ color: '#888888' }}>
              Scan QR codes or use NFC to discover artworks
            </p>
          </div>
          
          <div className="w-16"></div>
        </div>
      </header>

      {/* Scanner Interface */}
      <main className="px-6 py-8 pb-24">
        <div className="max-w-md mx-auto">
          
          {/* Scanner Type Selection */}
          <div className="flex mb-8 p-1 rounded-lg" style={{ backgroundColor: '#1a1a1a' }}>
            <Button
              variant={scanType === 'qr' ? 'default' : 'ghost'}
              className="flex-1"
              onClick={() => setScanType('qr')}
              style={{
                backgroundColor: scanType === 'qr' ? '#d4af37' : 'transparent',
                color: scanType === 'qr' ? '#000000' : '#ffffff'
              }}
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </Button>
            <Button
              variant={scanType === 'nfc' ? 'default' : 'ghost'}
              className="flex-1"
              onClick={() => setScanType('nfc')}
              style={{
                backgroundColor: scanType === 'nfc' ? '#d4af37' : 'transparent',
                color: scanType === 'nfc' ? '#000000' : '#ffffff'
              }}
            >
              <Wifi className="h-4 w-4 mr-2" />
              NFC
            </Button>
          </div>

          {/* Scanner Area */}
          <Card className="border-0 mb-8" style={{ backgroundColor: '#1a1a1a' }}>
            <CardContent className="p-8 text-center">
              {isScanning ? (
                <div className="space-y-4">
                  <Loader2 className="h-16 w-16 mx-auto animate-spin" style={{ color: '#d4af37' }} />
                  <p style={{ color: '#ffffff' }}>
                    Scanning {scanType.toUpperCase()}...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-32 h-32 mx-auto rounded-lg border-2 border-dashed flex items-center justify-center"
                       style={{ borderColor: '#d4af37' }}>
                    {scanType === 'qr' ? (
                      <QrCode className="h-16 w-16" style={{ color: '#d4af37' }} />
                    ) : (
                      <Wifi className="h-16 w-16" style={{ color: '#d4af37' }} />
                    )}
                  </div>
                  <p style={{ color: '#ffffff' }}>
                    {scanType === 'qr' 
                      ? 'Point your camera at a QR code'
                      : 'Hold your phone near an NFC tag'
                    }
                  </p>
                  <Button
                    onClick={() => {
                      // Simulate camera activation
                      setIsScanning(true);
                      setTimeout(() => setIsScanning(false), 2000);
                    }}
                    style={{
                      backgroundColor: '#d4af37',
                      color: '#000000'
                    }}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Start {scanType.toUpperCase()} Scan
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Test Buttons */}
          <Card className="border-0 mb-8" style={{ backgroundColor: '#1a1a1a' }}>
            <CardHeader>
              <CardTitle className="text-center" style={{ color: '#ffffff' }}>
                Demo Codes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleManualScan('QR001')}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #d4af37',
                    color: '#d4af37'
                  }}
                >
                  QR001
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleManualScan('QR002')}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #d4af37',
                    color: '#d4af37'
                  }}
                >
                  QR002
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleManualScan('QR003')}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #d4af37',
                    color: '#d4af37'
                  }}
                >
                  QR003
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleScan('nfc', 'NFC004')}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #d4af37',
                    color: '#d4af37'
                  }}
                >
                  NFC004
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Scan Result */}
          {scanResult && (
            <Card className="border-0" style={{ backgroundColor: '#1a1a1a' }}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {scanResult.success ? (
                    <CheckCircle className="h-5 w-5" style={{ color: '#4ade80' }} />
                  ) : (
                    <AlertCircle className="h-5 w-5" style={{ color: '#f87171' }} />
                  )}
                  <CardTitle style={{ color: '#ffffff' }}>
                    {scanResult.success ? 'Artwork Found!' : 'Scan Failed'}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {scanResult.success ? (
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <img
                        src={scanResult.artwork.image}
                        alt={scanResult.artwork.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1" style={{ color: '#ffffff' }}>
                          {scanResult.artwork.title}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: '#d4af37' }}>
                          {scanResult.artwork.artist}
                        </p>
                        <Badge 
                          variant="secondary"
                          style={{
                            backgroundColor: 'rgba(212, 175, 55, 0.1)',
                            color: '#d4af37',
                            border: '1px solid rgba(212, 175, 55, 0.3)'
                          }}
                        >
                          {scanResult.artwork.year}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      onClick={() => viewArtwork(scanResult.artwork.id)}
                      className="w-full"
                      style={{
                        backgroundColor: '#d4af37',
                        color: '#000000'
                      }}
                    >
                      View Artwork Details
                    </Button>
                  </div>
                ) : (
                  <p style={{ color: '#f87171' }}>
                    {scanResult.error}
                  </p>
                )}
              </CardContent>
            </Card>
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
            <QrCode className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/scanner')}
            style={{ color: '#d4af37' }}
          >
            <Scan className="h-5 w-5" />
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
            <CheckCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Scanner;