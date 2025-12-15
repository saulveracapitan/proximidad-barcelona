import { ServiceType, serviceLabels, serviceIcons, serviceColors } from '@/types/professional';
import { cn } from '@/lib/utils';

interface ServiceBadgeProps {
  service: ServiceType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ServiceBadge = ({ 
  service, 
  size = 'md', 
  showLabel = true,
  className 
}: ServiceBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium text-white',
        serviceColors[service],
        sizeClasses[size],
        className
      )}
    >
      <span>{serviceIcons[service]}</span>
      {showLabel && <span>{serviceLabels[service]}</span>}
    </span>
  );
};
