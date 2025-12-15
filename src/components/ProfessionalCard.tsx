import { motion } from 'framer-motion';
import { MapPin, BadgeCheck, Clock } from 'lucide-react';
import { Professional } from '@/types/professional';
import { ServiceBadge } from './ServiceBadge';
import { RatingStars } from './RatingStars';
import { Button } from './ui/button';

interface ProfessionalCardProps {
  professional: Professional;
  onViewProfile: (professional: Professional) => void;
  isHighlighted?: boolean;
}

export const ProfessionalCard = ({
  professional,
  onViewProfile,
  isHighlighted = false,
}: ProfessionalCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`
        group relative rounded-2xl bg-card p-4 transition-all duration-300
        ${isHighlighted 
          ? 'ring-2 ring-primary shadow-xl shadow-primary/10' 
          : 'shadow-md hover:shadow-xl'
        }
      `}
    >
      <div className="flex gap-4">
        {/* Photo */}
        <div className="relative flex-shrink-0">
          <img
            src={professional.photo}
            alt={professional.name}
            className="h-20 w-20 rounded-xl object-cover"
          />
          {professional.verified && (
            <div className="absolute -bottom-1 -right-1 rounded-full bg-card p-0.5">
              <BadgeCheck className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">
                {professional.name}
              </h3>
              <div className="mt-1">
                <ServiceBadge service={professional.service} size="sm" />
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-primary">
                {professional.priceRange}
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {professional.neighborhood}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {professional.yearsExperience} años
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <RatingStars
              rating={professional.rating}
              size="sm"
              reviewCount={professional.reviewCount}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewProfile(professional)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Ver perfil
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
