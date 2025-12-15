import { ServiceType, serviceLabels, serviceIcons } from '@/types/professional';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ServiceFilterProps {
  selectedServices: ServiceType[];
  onToggleService: (service: ServiceType) => void;
  className?: string;
}

const services: ServiceType[] = ['plumbing', 'electrical', 'cleaning', 'mechanic', 'renovations'];

const serviceBgColors: Record<ServiceType, string> = {
  plumbing: 'bg-service-plumbing/10 hover:bg-service-plumbing/20 data-[selected=true]:bg-service-plumbing',
  electrical: 'bg-service-electrical/10 hover:bg-service-electrical/20 data-[selected=true]:bg-service-electrical',
  cleaning: 'bg-service-cleaning/10 hover:bg-service-cleaning/20 data-[selected=true]:bg-service-cleaning',
  mechanic: 'bg-service-mechanic/10 hover:bg-service-mechanic/20 data-[selected=true]:bg-service-mechanic',
  renovations: 'bg-service-renovations/10 hover:bg-service-renovations/20 data-[selected=true]:bg-service-renovations',
};

const serviceTextColors: Record<ServiceType, string> = {
  plumbing: 'text-service-plumbing data-[selected=true]:text-white',
  electrical: 'text-service-electrical data-[selected=true]:text-foreground',
  cleaning: 'text-service-cleaning data-[selected=true]:text-white',
  mechanic: 'text-service-mechanic data-[selected=true]:text-white',
  renovations: 'text-service-renovations data-[selected=true]:text-white',
};

export const ServiceFilter = ({
  selectedServices,
  onToggleService,
  className,
}: ServiceFilterProps) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {services.map((service) => {
        const isSelected = selectedServices.includes(service);
        return (
          <motion.button
            key={service}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-selected={isSelected}
            onClick={() => onToggleService(service)}
            className={cn(
              'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
              serviceBgColors[service],
              serviceTextColors[service]
            )}
          >
            <span className="text-base">{serviceIcons[service]}</span>
            <span>{serviceLabels[service]}</span>
          </motion.button>
        );
      })}
    </div>
  );
};
