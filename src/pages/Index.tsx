import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { MapView } from '@/components/MapView';
import { ProfessionalRegistration } from '@/components/ProfessionalRegistration';

// Token fijo de Mapbox
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic2F1bHZlcmFhIiwiYSI6ImNtajc0dXBpdTAwZ3EzZHM4eG14dzZxa3kifQ.HEH-Snn5aMpftaQdPAnDlA';

const Index = () => {
  // Arranca directamente en el mapa
  const [view, setView] = useState<'home' | 'map' | 'professional'>('map');
  const [mapboxToken] = useState(MAPBOX_TOKEN);

  // Registro profesional
  if (view === 'professional') {
    return <ProfessionalRegistration onBack={() => setView('map')} />;
  }

  // Vista mapa (siempre activa)
  if (view === 'map') {
    return <MapView onBack={() => setView('home')} mapboxToken={mapboxToken} />;
  }

  // Home (opcional, si sigues usándolo)
  return (
    <HeroSection
      onExploreMap={() => setView('map')}
      onProfessionalClick={() => setView('professional')}
    />
  );
};

export default Index;
