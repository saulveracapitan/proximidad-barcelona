import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, BadgeCheck, Calendar, Clock, Star, ChevronRight } from 'lucide-react';
import { Professional } from '@/types/professional';
import { getReviewsForProfessional } from '@/data/mockProfessionals';
import { ServiceBadge } from './ServiceBadge';
import { RatingStars } from './RatingStars';
import { Button } from './ui/button';

interface ProfessionalProfileProps {
  professional: Professional | null;
  onClose: () => void;
  onBook: (professional: Professional) => void;
}

export const ProfessionalProfile = ({
  professional,
  onClose,
  onBook,
}: ProfessionalProfileProps) => {
  if (!professional) return null;

  const reviews = getReviewsForProfessional(professional.id);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 h-full w-full max-w-lg overflow-y-auto bg-background shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with photo */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-br from-primary to-primary/70" />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute -bottom-16 left-6">
              <div className="relative">
                <img
                  src={professional.photo}
                  alt={professional.name}
                  className="h-32 w-32 rounded-2xl border-4 border-background object-cover shadow-xl"
                />
                {professional.verified && (
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-card p-1 shadow-md">
                    <BadgeCheck className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pt-20 pb-8">
            {/* Name and service */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{professional.name}</h2>
                <div className="mt-2">
                  <ServiceBadge service={professional.service} size="md" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{professional.priceRange}</p>
                <p className="text-sm text-muted-foreground">precio orientativo</p>
              </div>
            </div>

            {/* Location and experience */}
            <div className="mt-4 flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {professional.neighborhood}, Barcelona
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {professional.yearsExperience} años de experiencia
              </span>
            </div>

            {/* Rating */}
            <div className="mt-4">
              <RatingStars
                rating={professional.rating}
                size="lg"
                reviewCount={professional.reviewCount}
              />
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-foreground">Sobre mí</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {professional.description}
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground">Reseñas recientes</h3>
              <div className="mt-4 space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl bg-muted/50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{review.author}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="text-sm font-semibold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                    <p className="mt-2 text-xs text-muted-foreground/70">
                      {new Date(review.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Button
                size="xl"
                variant="hero"
                className="w-full"
                onClick={() => onBook(professional)}
              >
                <Calendar className="h-5 w-5" />
                Contactar / Reservar
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
