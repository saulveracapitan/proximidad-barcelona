import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Professional, ServiceType, serviceIcons } from '@/types/professional';

interface MapComponentProps {
  professionals: Professional[];
  selectedProfessional: Professional | null;
  onSelectProfessional: (professional: Professional) => void;
  mapboxToken: string;
}

// Barcelona center coordinates
const BARCELONA_CENTER: [number, number] = [2.1734, 41.3851];
const BARCELONA_BOUNDS: [[number, number], [number, number]] = [
  [2.0, 41.30], // Southwest
  [2.3, 41.47], // Northeast
];

export const MapComponent = ({
  professionals,
  selectedProfessional,
  onSelectProfessional,
  mapboxToken,
}: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const userLocationMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Create custom marker element
  const createMarkerElement = useCallback((professional: Professional, isSelected: boolean) => {
    const el = document.createElement('div');
    el.className = 'marker-container';
    el.innerHTML = `
      <div class="marker ${isSelected ? 'marker-selected' : ''}" data-service="${professional.service}">
        <span class="marker-icon">${serviceIcons[professional.service]}</span>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .marker-container {
        cursor: pointer;
        transform: translate(-50%, -100%);
      }
      .marker {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        background: white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border: 3px solid white;
        transition: all 0.2s ease;
      }
      .marker:hover {
        transform: rotate(-45deg) scale(1.1);
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
      }
      .marker-selected {
        transform: rotate(-45deg) scale(1.15);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        border-color: hsl(217, 91%, 50%);
      }
      .marker-icon {
        transform: rotate(45deg);
        font-size: 18px;
      }
      .marker[data-service="plumbing"] { background: hsl(199, 89%, 48%); }
      .marker[data-service="electrical"] { background: hsl(45, 93%, 47%); }
      .marker[data-service="cleaning"] { background: hsl(152, 69%, 47%); }
      .marker[data-service="mechanic"] { background: hsl(0, 72%, 51%); }
      .marker[data-service="renovations"] { background: hsl(262, 83%, 58%); }
    `;
    el.appendChild(style);

    return el;
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: BARCELONA_CENTER,
      zoom: 13,
      maxBounds: BARCELONA_BOUNDS,
      pitch: 0,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: false }),
      'top-right'
    );

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Get user location
  useEffect(() => {
    if (!mapLoaded) return;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          setUserLocation(userCoords);
        },
        (error) => {
          console.log('Geolocation error:', error.message);
          // Silently fail - user location is optional
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }, [mapLoaded]);

  // Update markers when professionals change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    professionals.forEach((professional) => {
      const el = createMarkerElement(
        professional,
        selectedProfessional?.id === professional.id
      );

      el.addEventListener('click', () => {
        onSelectProfessional(professional);
      });

      const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat(professional.coordinates)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [professionals, mapLoaded, createMarkerElement, onSelectProfessional, selectedProfessional]);

  // Fly to selected professional
  useEffect(() => {
    if (!map.current || !selectedProfessional) return;

    map.current.flyTo({
      center: selectedProfessional.coordinates,
      zoom: 15,
      duration: 1000,
    });
  }, [selectedProfessional]);

  // Add user location marker
  useEffect(() => {
    if (!map.current || !userLocation) return;

    // Remove existing user location marker
    if (userLocationMarkerRef.current) {
      userLocationMarkerRef.current.remove();
    }

    // Create user location marker element
    const el = document.createElement('div');
    el.className = 'user-location-marker';

    const style = document.createElement('style');
    style.textContent = `
      .user-location-marker {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #3b82f6;
        border: 3px solid white;
        box-shadow: 0 0 0 rgba(59, 130, 246, 0.4);
        animation: pulse 2s infinite;
        cursor: pointer;
      }
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
        }
      }
    `;
    el.appendChild(style);

    // Create and add marker
    const marker = new mapboxgl.Marker({ element: el })
      .setLngLat(userLocation)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          '<div style="padding: 4px 8px; font-size: 12px;">📍 Tu ubicación</div>'
        )
      )
      .addTo(map.current!);

    userLocationMarkerRef.current = marker;

    return () => {
      if (userLocationMarkerRef.current) {
        userLocationMarkerRef.current.remove();
      }
    };
  }, [userLocation]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainer} className="h-full w-full" />

      {/* Location button */}
      {mapLoaded && (
        <button
          onClick={() => {
            // If we already have the user location, just fly to it
            if (userLocation && map.current) {
              map.current.flyTo({
                center: userLocation,
                zoom: 15,
                duration: 1000,
              });
              return;
            }

            // Otherwise, request location
            if ('geolocation' in navigator) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const userCoords: [number, number] = [
                    position.coords.longitude,
                    position.coords.latitude,
                  ];
                  console.log('📍 Ubicación obtenida:', userCoords);
                  setUserLocation(userCoords);

                  // Fly to user location
                  if (map.current) {
                    map.current.flyTo({
                      center: userCoords,
                      zoom: 15,
                      duration: 1000,
                    });
                  }
                },
                (error) => {
                  alert('No se pudo obtener tu ubicación. Por favor, permite el acceso a la ubicación en tu navegador.');
                  console.error('Geolocation error:', error);
                },
                {
                  enableHighAccuracy: true,
                  timeout: 10000,
                  maximumAge: 0,
                }
              );
            } else {
              alert('Tu navegador no soporta geolocalización');
            }
          }}
          className={`absolute bottom-24 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 ${userLocation
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          title="Mi ubicación"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </button>
      )}

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Cargando mapa...</p>
          </div>
        </div>
      )}
    </div>
  );
};
