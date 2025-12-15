import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock, CheckCircle2, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Professional } from '@/types/professional';
import { ServiceBadge } from './ServiceBadge';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';

interface BookingModalProps {
  professional: Professional | null;
  onClose: () => void;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '16:00', '17:00', '18:00', '19:00'
];

export const BookingModal = ({ professional, onClose }: BookingModalProps) => {
  const [step, setStep] = useState<'date' | 'time' | 'confirmed'>('date');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!professional) return null;

  const handleConfirm = () => {
    setStep('confirmed');
  };

  // Disable past dates and Sundays
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0; // Disable past dates and Sundays
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-background shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {step !== 'confirmed' && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full p-2 transition-colors hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {step === 'confirmed' ? (
            // Confirmation screen
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10"
              >
                <Clock className="h-12 w-12 text-orange-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground">
                Reserva pendiente de confirmación
              </h2>
              <p className="mt-2 text-muted-foreground">
                Tu solicitud ha sido enviada a la empresa
              </p>

              <div className="mt-6 rounded-xl bg-muted/50 p-4 text-left">
                <div className="flex items-center gap-3">
                  <img
                    src={professional.photo}
                    alt={professional.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{professional.name}</p>
                    <ServiceBadge service={professional.service} size="sm" />
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span>
                      {selectedDate?.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{selectedTime}h</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{professional.neighborhood}, Barcelona</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-orange-500/10 border border-orange-500/20 p-4">
                <p className="text-sm text-foreground font-medium">
                  ⏳ Esperando confirmación
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  La empresa revisará tu solicitud y te confirmará la disponibilidad en breve.
                  Recibirás una notificación cuando la reserva sea confirmada.
                </p>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                <span className="text-primary font-medium">Confianza y proximidad, siempre cerca de ti.</span>
              </p>

              <Button
                size="lg"
                variant="hero"
                className="mt-6 w-full"
                onClick={onClose}
              >
                Entendido
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="border-b border-border p-6">
                <div className="flex items-center gap-3">
                  <img
                    src={professional.photo}
                    alt={professional.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-foreground">
                      Reservar con {professional.name}
                    </h2>
                    <ServiceBadge service={professional.service} size="sm" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {step === 'date' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-4">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      Selecciona una fecha
                    </h3>

                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={isDateDisabled}
                        initialFocus
                        className="rounded-md border"
                        fromDate={new Date()}
                        toDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                      />
                    </div>

                    <Button
                      size="lg"
                      variant="hero"
                      className="mt-6 w-full"
                      disabled={!selectedDate}
                      onClick={() => setStep('time')}
                    >
                      Continuar
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </motion.div>
                )}

                {step === 'time' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <button
                      onClick={() => setStep('date')}
                      className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Cambiar fecha
                    </button>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      <Clock className="h-5 w-5 text-primary" />
                      Selecciona una hora
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedDate?.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`
                            rounded-xl p-3 text-center font-semibold transition-all
                            ${selectedTime === time
                              ? 'bg-primary text-primary-foreground shadow-lg'
                              : 'bg-muted/50 hover:bg-muted text-foreground'
                            }
                          `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <Button
                      size="lg"
                      variant="hero"
                      className="mt-6 w-full"
                      disabled={!selectedTime}
                      onClick={handleConfirm}
                    >
                      Confirmar reserva
                      <CheckCircle2 className="h-5 w-5" />
                    </Button>
                  </motion.div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
