export type ServiceType = 'plumbing' | 'electrical' | 'cleaning' | 'mechanic' | 'renovations';

export interface Professional {
  id: string;
  name: string;
  photo: string;
  service: ServiceType;
  neighborhood: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  description: string;
  coordinates: [number, number]; // [lng, lat]
  verified: boolean;
  yearsExperience: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const serviceLabels: Record<ServiceType, string> = {
  plumbing: 'Fontanería',
  electrical: 'Electricidad',
  cleaning: 'Limpieza',
  mechanic: 'Mecánica',
  renovations: 'Reformas',
};

export const serviceIcons: Record<ServiceType, string> = {
  plumbing: '🔧',
  electrical: '⚡',
  cleaning: '🧹',
  mechanic: '🚗',
  renovations: '🛠',
};

export const serviceColors: Record<ServiceType, string> = {
  plumbing: 'bg-service-plumbing',
  electrical: 'bg-service-electrical',
  cleaning: 'bg-service-cleaning',
  mechanic: 'bg-service-mechanic',
  renovations: 'bg-service-renovations',
};
