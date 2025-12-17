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
                src="/ifix-logo-new.png"
                alt="iFix Logo"
                className="h-20 w-auto object-contain"
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
              { icon: Users, label: 'Clientes que repetirían', value: '+98%' },
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

          {/* Pricing Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-20 mb-10"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">Planes Simples y Transparentes</h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                Sin comisiones ocultas. Elige cómo quieres usar iFix.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Client Plan */}
              <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 text-center relative overflow-hidden group hover:bg-white/15 transition-all">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-cyan-300" />
                <h3 className="text-2xl font-bold text-white mb-2">Para Clientes</h3>
                <div className="my-6">
                  <span className="text-5xl font-extrabold text-white">Gratis</span>
                  <span className="text-white/60 text-lg block mt-2">para siempre</span>
                </div>
                <ul className="text-left text-white/80 space-y-3 mb-8 mx-auto max-w-xs">
                  <li className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-cyan-300" />
                    Acceso a todos los profesionales
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-cyan-300" />
                    Sin comisiones por reserva
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-cyan-300" />
                    Soporte prioritario
                  </li>
                </ul>
                <Button
                  onClick={onRegister}
                  className="w-full bg-white text-primary hover:bg-white/90 font-bold"
                >
                  Empezar Gratis
                </Button>
              </div>

              {/* Professional Plan */}
              <div className="rounded-3xl bg-gradient-to-br from-secondary/20 to-primary/40 backdrop-blur-md border border-secondary/50 p-8 text-center relative overflow-hidden transform md:-translate-y-4 shadow-2xl">
                <div className="absolute top-4 right-4 bg-secondary text-primary font-bold text-xs px-3 py-1 rounded-full animate-pulse">
                  OFERTA ESPECIAL
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Para Profesionales</h3>
                <div className="my-6">
                  <span className="text-5xl font-extrabold text-white">50€</span>
                  <span className="text-white/60 text-lg">/mes</span>
                  <div className="mt-2 inline-block bg-green-500/20 text-green-300 px-4 py-1 rounded-full text-sm font-bold border border-green-500/30">
                    ¡Primer mes GRATIS!
                  </div>
                </div>
                <ul className="text-left text-white/90 space-y-3 mb-8 mx-auto max-w-xs">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-secondary" />
                    Perfil destacado en el mapa
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-secondary" />
                    Gestión de reservas ilimitada
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-secondary" />
                    Estadísticas de negocio
                  </li>
                </ul>
                <Button
                  onClick={onRegister}
                  className="w-full bg-secondary text-primary hover:bg-secondary/90 font-bold shadow-lg shadow-secondary/20"
                >
                  Unirme como Profesional
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
