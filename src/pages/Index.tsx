import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { MapView } from '@/components/MapView';
import { ProfessionalRegistration } from '@/components/ProfessionalRegistration';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Key, MapPin, ExternalLink } from 'lucide-react';

// You can set this to your Mapbox public token
const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2F1bHZlcmFhIiwiYSI6ImNtajc0dXBpdTAwZ3EzZHM4eG14dzZxa3kifQ.HEH-Snn5aMpftaQdPAnDlA';

const Index = () => {
  const [view, setView] = useState<'home' | 'map' | 'professional'>('home');
  const [mapboxToken, setMapboxToken] = useState(MAPBOX_TOKEN);
  const [tokenInput, setTokenInput] = useState('');

  const handleExploreMap = () => {
    setView('map');
  };

  const handleProfessionalClick = () => {
    setView('professional');
  };

  // Professional registration
  if (view === 'professional') {
    return <ProfessionalRegistration onBack={() => setView('home')} />;
  }

  // If no token is set, show a token input screen when trying to access map
  if (view === 'map' && !mapboxToken) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-card p-8 shadow-xl border border-border">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mx-auto">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mt-6 text-center text-2xl font-bold text-foreground">
              Configurar Mapa
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              Para ver el mapa interactivo de Barcelona, necesitas un token público de Mapbox.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mapbox Public Token
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="pk.eyJ1Ijoi..."
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                size="lg"
                variant="hero"
                className="w-full"
                disabled={!tokenInput.startsWith('pk.')}
                onClick={() => setMapboxToken(tokenInput)}
              >
                Activar Mapa
              </Button>

              <div className="text-center">
                <a
                  href="https://mapbox.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Obtener token en mapbox.com
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <Button
              variant="ghost"
              className="mt-4 w-full"
              onClick={() => setView('home')}
            >
              Volver al inicio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'map') {
    return <MapView onBack={() => setView('home')} mapboxToken={mapboxToken} />;
  }

  return <HeroSection onExploreMap={handleExploreMap} onProfessionalClick={handleProfessionalClick} />;
};

export default Index;
