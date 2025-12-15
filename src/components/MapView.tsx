import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, List, Map as MapIcon, SlidersHorizontal, X, Star, ChevronDown, Wrench, User } from 'lucide-react';
import { MapComponent } from './MapComponent';
import { ProfessionalCard } from './ProfessionalCard';
import { ServiceFilter } from './ServiceFilter';
import { ProfessionalProfile } from './ProfessionalProfile';
import { BookingModal } from './BookingModal';
import { ClientProfile } from './ClientProfile';
import { BusinessProfile } from './BusinessProfile';
import { Button } from './ui/button';
import { mockProfessionals } from '@/data/mockProfessionals';
import { Professional, ServiceType } from '@/types/professional';
import { Input } from './ui/input';

interface MapViewProps {
  onBack: () => void;
  mapboxToken: string;
}

type ViewMode = 'split' | 'map' | 'list';

export const MapView = ({ onBack, mapboxToken }: MapViewProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [profileProfessional, setProfileProfessional] = useState<Professional | null>(null);
  const [bookingProfessional, setBookingProfessional] = useState<Professional | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'price'>('rating');
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userType, setUserType] = useState<'client' | 'business'>('client'); // Toggle between client/business for demo

  // Refs for scrolling to selected professional
  const professionalRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const listContainerRef = useRef<HTMLDivElement | null>(null);

  const filteredProfessionals = useMemo(() => {
    let filtered = mockProfessionals;

    // Filter by services
    if (selectedServices.length > 0) {
      filtered = filtered.filter((p) => selectedServices.includes(p.service));
    }

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered = [...filtered].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'price':
        // Simple price sort based on first number in price range
        filtered = [...filtered].sort((a, b) => {
          const priceA = parseInt(a.priceRange.match(/\d+/)?.[0] || '0');
          const priceB = parseInt(b.priceRange.match(/\d+/)?.[0] || '0');
          return priceA - priceB;
        });
        break;
    }

    return filtered;
  }, [selectedServices, minRating, sortBy]);

  // Scroll to selected professional when it changes
  useEffect(() => {
    if (selectedProfessional && professionalRefs.current[selectedProfessional.id]) {
      const element = professionalRefs.current[selectedProfessional.id];
      if (element && listContainerRef.current) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [selectedProfessional]);

  const toggleService = (service: ServiceType) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleViewProfile = (professional: Professional) => {
    setProfileProfessional(professional);
  };

  const handleBook = (professional: Professional) => {
    setProfileProfessional(null);
    setBookingProfessional(professional);
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <img
                src="/ifix-logo.jpg"
                alt="iFix Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 rounded-lg bg-muted p-1">
              <button
                onClick={() => setViewMode('split')}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${viewMode === 'split'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Dividido
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${viewMode === 'map'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <MapIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${viewMode === 'list'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowUserProfile(true)}
              className="rounded-full"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Filters */}
        <motion.div
          initial={false}
          animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
          className="overflow-hidden md:!h-auto md:!opacity-100"
        >
          <div className="pt-4">
            <ServiceFilter
              selectedServices={selectedServices}
              onToggleService={toggleService}
            />

            <div className="mt-4 flex flex-wrap items-center gap-4">
              {/* Rating filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Valoración mín:</span>
                <div className="flex gap-1">
                  {[0, 4, 4.5, 4.8].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`rounded-lg px-2 py-1 text-sm transition-all ${minRating === rating
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                      {rating === 0 ? 'Todos' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground"
                >
                  <option value="rating">Mejor valorados</option>
                  <option value="reviews">Más reseñas</option>
                  <option value="price">Precio más bajo</option>
                </select>
              </div>

              {/* Results count */}
              <span className="text-sm text-muted-foreground">
                {filteredProfessionals.length} profesionales encontrados
              </span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Map */}
        {(viewMode === 'split' || viewMode === 'map') && (
          <div
            className={`${viewMode === 'split' ? 'hidden md:block md:w-1/2 lg:w-3/5' : 'w-full'
              } relative`}
          >
            <MapComponent
              professionals={filteredProfessionals}
              selectedProfessional={selectedProfessional}
              onSelectProfessional={(p) => {
                setSelectedProfessional(p);
                if (viewMode === 'map') {
                  setProfileProfessional(p);
                }
              }}
              mapboxToken={mapboxToken}
            />
          </div>
        )}

        {/* List */}
        {(viewMode === 'split' || viewMode === 'list') && (
          <div
            ref={listContainerRef}
            className={`${viewMode === 'split' ? 'w-full md:w-1/2 lg:w-2/5' : 'w-full max-w-4xl mx-auto'
              } overflow-y-auto bg-muted/30 p-4`}
          >
            <div className="space-y-4">
              {filteredProfessionals.map((professional, index) => (
                <motion.div
                  key={professional.id}
                  ref={(el) => (professionalRefs.current[professional.id] = el)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedProfessional(professional)}
                  className="cursor-pointer"
                >
                  <ProfessionalCard
                    professional={professional}
                    onViewProfile={handleViewProfile}
                    isHighlighted={selectedProfessional?.id === professional.id}
                  />
                </motion.div>
              ))}

              {filteredProfessionals.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-lg font-medium text-muted-foreground">
                    No se encontraron profesionales
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Prueba a cambiar los filtros de búsqueda
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedServices([]);
                      setMinRating(0);
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile view toggle */}
      <div className="flex md:hidden items-center justify-center gap-2 border-t border-border bg-card p-3">
        <Button
          variant={viewMode === 'map' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('map')}
        >
          <MapIcon className="mr-1 h-4 w-4" />
          Mapa
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('list')}
        >
          <List className="mr-1 h-4 w-4" />
          Lista
        </Button>
      </div>

      {/* Profile modal */}
      <ProfessionalProfile
        professional={profileProfessional}
        onClose={() => setProfileProfessional(null)}
        onBook={handleBook}
      />

      {/* Booking modal */}
      <BookingModal
        professional={bookingProfessional}
        onClose={() => setBookingProfessional(null)}
      />

      {/* User Profile modals */}
      {showUserProfile && userType === 'client' && (
        <ClientProfile onClose={() => setShowUserProfile(false)} />
      )}
      {showUserProfile && userType === 'business' && (
        <BusinessProfile onClose={() => setShowUserProfile(false)} />
      )}
    </div>
  );
};
