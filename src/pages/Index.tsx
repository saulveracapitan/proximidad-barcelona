import { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { MapView } from '@/components/MapView';
import { ProfessionalRegistration } from '@/components/ProfessionalRegistration';
import { ProfessionalDashboard } from '@/components/ProfessionalDashboard';

// Token fijo de Mapbox
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic2F1bHZlcmFhIiwiYSI6ImNtajc0dXBpdTAwZ3EzZHM4eG14dzZxa3kifQ.HEH-Snn5aMpftaQdPAnDlA';

import { AuthModal } from '@/components/AuthModal';

const Index = () => {
  // Arranca en home para ver las opciones de login/registro
  const [view, setView] = useState<'home' | 'map' | 'professional' | 'dashboard'>('home');
  const [mapboxToken] = useState(MAPBOX_TOKEN);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  const handleLogin = () => {
    setAuthView('login');
    setIsAuthOpen(true);
  };

  const handleRegister = () => {
    setAuthView('register');
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (role: 'client' | 'professional') => {
    setIsAuthOpen(false);
    if (role === 'professional') {
      setView('dashboard');
    } else {
      setView('map');
    }
  };

  // Dashboard profesional
  if (view === 'dashboard') {
    return <ProfessionalDashboard onBack={() => setView('map')} />;
  }

  // Registro profesional
  if (view === 'professional') {
    return (
      <ProfessionalRegistration
        onBack={() => setView('map')}
        onGoToDashboard={() => setView('dashboard')}
      />
    );
  }

  // Vista mapa
  if (view === 'map') {
    return <MapView onBack={() => setView('home')} mapboxToken={mapboxToken} />;
  }

  // Home
  return (
    <>
      <HeroSection
        onExploreMap={() => setView('map')}
        onProfessionalClick={() => setView('professional')}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView={authView}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Index;
