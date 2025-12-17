import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, MapPin, Briefcase, User, Mail, Phone, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ServiceType, serviceLabels, serviceIcons } from '@/types/professional';

interface ProfessionalRegistrationProps {
  onBack: () => void;
  onGoToDashboard: () => void;
}

const services: ServiceType[] = ['plumbing', 'electrical', 'cleaning', 'mechanic', 'renovations'];

const neighborhoods = [
  'Eixample', 'Gràcia', 'Sants', 'Poblenou', 'Sarrià',
  'El Raval', 'El Born', 'Barceloneta', 'Horta', 'Les Corts'
];

export const ProfessionalRegistration = ({ onBack, onGoToDashboard }: ProfessionalRegistrationProps) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('');
  const [customService, setCustomService] = useState('');
  const [customNeighborhood, setCustomNeighborhood] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-service-cleaning/10"
          >
            <CheckCircle2 className="h-14 w-14 text-service-cleaning" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground">¡Bienvenido a iFix!</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tu perfil ha sido creado con éxito. Pronto empezarás a recibir solicitudes de clientes en tu zona.
          </p>

          <div className="mt-8 rounded-2xl bg-primary/5 border border-primary/20 p-6">
            <h3 className="text-lg font-semibold text-foreground">Modelo de suscripción</h3>
            <p className="mt-2 text-muted-foreground">
              Suscripción mensual fija. <span className="font-semibold text-primary">Sin comisiones por trabajo.</span>
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Tú te quedas con el 100% de lo que ganas. Así de simple.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <Button
              size="lg"
              variant="hero"
              className="w-full"
              onClick={onGoToDashboard}
            >
              Ir a mi panel
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={onBack}
            >
              Volver al mapa
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-4 shadow-sm">
        <div className="container mx-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <img
            src="/ifix-logo-new.png"
            alt="iFix Logo"
            className="h-10 w-auto object-contain"
          />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Únete como profesional
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Consigue más clientes en tu barrio de Barcelona
            </p>
          </motion.div>

          {/* Value proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 rounded-2xl bg-gradient-to-r from-primary to-[hsl(199_89%_48%)] p-6 text-primary-foreground"
          >
            <h3 className="text-xl font-semibold">¿Por qué iFix?</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span>Suscripción mensual fija - Sin sorpresas</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span>0% comisiones por trabajo realizado</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span>Clientes de tu zona, cerca de ti</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span>Perfil verificado que genera confianza</span>
              </li>
            </ul>
          </motion.div>

          {/* Registration form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            {/* Personal info */}
            <div className="rounded-2xl bg-card p-6 shadow-md">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <User className="h-5 w-5 text-primary" />
                Información personal
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nombre del negocio *
                  </label>
                  <Input placeholder="Ej: Fontanería García" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tu nombre *
                  </label>
                  <Input placeholder="Ej: Marc García" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="email" placeholder="tu@email.com" className="pl-10" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="tel" placeholder="612 345 678" className="pl-10" required />
                  </div>
                </div>
              </div>
            </div>

            {/* Service selection */}
            <div className="rounded-2xl bg-card p-6 shadow-md">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Briefcase className="h-5 w-5 text-primary" />
                Tu servicio *
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className={`
                      flex flex-col items-center gap-2 rounded-xl p-4 transition-all
                      ${selectedService === service
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-muted/50 hover:bg-muted text-foreground'
                      }
                    `}
                  >
                    <span className="text-2xl">{serviceIcons[service]}</span>
                    <span className="text-sm font-medium">{serviceLabels[service]}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setSelectedService('other' as any)}
                  className={`
                    flex flex-col items-center gap-2 rounded-xl p-4 transition-all
                    ${selectedService === ('other' as any)
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-muted/50 hover:bg-muted text-foreground'
                    }
                  `}
                >
                  <span className="text-2xl">✨</span>
                  <span className="text-sm font-medium">Otro</span>
                </button>
              </div>

              {selectedService === ('other' as any) && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Especifica tu sector *
                  </label>
                  <Input
                    placeholder="Ej: Carpintería, Jardinería..."
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            {/* Location */}
            <div className="rounded-2xl bg-card p-6 shadow-md">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                Zona de Barcelona *
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
                {neighborhoods.map((neighborhood) => (
                  <button
                    key={neighborhood}
                    type="button"
                    onClick={() => setSelectedNeighborhood(neighborhood)}
                    className={`
                      rounded-lg px-3 py-2 text-sm font-medium transition-all
                      ${selectedNeighborhood === neighborhood
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 hover:bg-muted text-foreground'
                      }
                    `}
                  >
                    {neighborhood}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setSelectedNeighborhood('Otro')}
                  className={`
                    rounded-lg px-3 py-2 text-sm font-medium transition-all
                    ${selectedNeighborhood === 'Otro'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 hover:bg-muted text-foreground'
                    }
                  `}
                >
                  Otro
                </button>
              </div>

              {selectedNeighborhood === 'Otro' && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Especifica tu zona *
                  </label>
                  <Input
                    placeholder="Ej: Sant Andreu, Nou Barris..."
                    value={customNeighborhood}
                    onChange={(e) => setCustomNeighborhood(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="xl"
              variant="hero"
              className="w-full"
              disabled={
                !selectedService ||
                !selectedNeighborhood ||
                (selectedService === ('other' as any) && !customService) ||
                (selectedNeighborhood === 'Otro' && !customNeighborhood)
              }
            >
              Crear mi perfil profesional
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Al registrarte, aceptas nuestros términos de servicio y política de privacidad.
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
};
