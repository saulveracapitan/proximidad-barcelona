import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Sparkles, Shield, Clock, Users, ChevronRight, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { serviceIcons, serviceLabels, ServiceType } from '@/types/professional';

interface HeroSectionProps {
  onExploreMap: () => void;
  onProfessionalClick: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const services: ServiceType[] = ['plumbing', 'electrical', 'cleaning', 'mechanic', 'renovations'];

export const HeroSection = ({ onExploreMap, onProfessionalClick, onLogin, onRegister }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-[hsl(199_89%_48%)]" />

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-64 w-64 rounded-full bg-primary-foreground/10 blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <img
                src="/ifix-logo.jpg"
                alt="iFix Logo"
                className="h-12 w-auto object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Button
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={onLogin}
              >
                Iniciar Sesión
              </Button>
              <Button
                variant="glass"
                size="sm"
                className="text-primary-foreground border-primary-foreground/20"
                onClick={onRegister}
              >
                Registrarse
              </Button>
            </motion.div>
          </nav>
        </header>

        {/* Hero content */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm">
                <MapPin className="h-4 w-4" />
                Barcelona y alrededores
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl lg:text-7xl"
            >
              Tu profesional de confianza,{' '}
              <span className="relative">
                <span className="relative z-10">cerca de ti</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-secondary/50 -z-0" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg text-primary-foreground/80 md:text-xl"
            >
              Encuentra fontaneros, electricistas, limpiadores y más profesionales verificados en tu barrio.
              <br className="hidden md:block" />
              Proximidad, confianza y calidad garantizada.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                size="xl"
                variant="warm"
                onClick={onExploreMap}
                className="group"
              >
                <Search className="h-5 w-5" />
                Buscar profesional en Barcelona
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Service icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm"
                >
                  <span className="text-lg">{serviceIcons[service]}</span>
                  <span className="text-sm font-medium text-primary-foreground">
                    {serviceLabels[service]}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {[
              { icon: Shield, label: 'Profesionales verificados', value: '100%' },
              { icon: Users, label: 'Clientes satisfechos', value: '+5.000' },
              { icon: Clock, label: 'Respuesta promedio', value: '< 2h' },
              { icon: Sparkles, label: 'Valoración media', value: '4.8 ⭐' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="rounded-2xl bg-primary-foreground/5 p-6 text-center backdrop-blur-sm"
              >
                <stat.icon className="mx-auto h-8 w-8 text-secondary" />
                <p className="mt-3 text-2xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-primary-foreground/70">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
