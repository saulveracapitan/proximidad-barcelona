import { motion } from 'framer-motion';
import { Building2, Mail, Phone, MapPin, Calendar, Settings, LogOut, Star, TrendingUp, Users, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { RatingStars } from './RatingStars';

interface BusinessProfileProps {
    onClose: () => void;
}

export const BusinessProfile = ({ onClose }: BusinessProfileProps) => {
    // Mock business data - in a real app, this would come from authentication/database
    const businessData = {
        name: 'Fontaneria Express BCN',
        logo: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop',
        email: 'info@fontaneriaexpress.com',
        phone: '+34 932 123 456',
        address: 'Carrer de Valencia, 234, Barcelona',
        service: 'Fontanería',
        memberSince: 'Marzo 2020',
        rating: 4.9,
        reviewCount: 127,
        completedJobs: 342,
        responseTime: '< 2h',
        yearsExperience: 15,
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card shadow-2xl"
            >
                {/* Header */}
                <div className="relative h-32 bg-gradient-to-br from-primary to-primary/80">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="absolute right-4 top-4 text-primary-foreground hover:bg-primary-foreground/20"
                    >
                        ✕
                    </Button>
                </div>

                {/* Profile Content */}
                <div className="relative px-6 pb-6">
                    {/* Logo */}
                    <div className="relative -mt-16 mb-4">
                        <img
                            src={businessData.logo}
                            alt={businessData.name}
                            className="h-32 w-32 rounded-2xl border-4 border-card object-cover shadow-lg"
                        />
                    </div>

                    {/* Name and Service */}
                    <div className="mb-2">
                        <h2 className="text-2xl font-bold text-foreground">{businessData.name}</h2>
                        <p className="text-sm text-muted-foreground">Empresa • {businessData.service}</p>
                    </div>

                    {/* Rating */}
                    <div className="mb-6">
                        <RatingStars rating={businessData.rating} reviewCount={businessData.reviewCount} />
                    </div>

                    {/* Info Cards */}
                    <div className="space-y-4">
                        {/* Contact Info */}
                        <Card className="p-4">
                            <h3 className="mb-3 font-semibold text-foreground">Información de contacto</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-foreground">{businessData.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-foreground">{businessData.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-foreground">{businessData.address}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Business Stats */}
                        <Card className="p-4">
                            <h3 className="mb-3 font-semibold text-foreground">Estadísticas del negocio</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-muted/50 p-3 text-center">
                                    <div className="flex items-center justify-center gap-1 text-primary">
                                        <TrendingUp className="h-5 w-5" />
                                        <p className="text-2xl font-bold">{businessData.completedJobs}</p>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">Trabajos completados</p>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-3 text-center">
                                    <div className="flex items-center justify-center gap-1 text-primary">
                                        <Clock className="h-5 w-5" />
                                        <p className="text-2xl font-bold">{businessData.responseTime}</p>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">Tiempo de respuesta</p>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-3 text-center">
                                    <div className="flex items-center justify-center gap-1 text-primary">
                                        <Star className="h-5 w-5" />
                                        <p className="text-2xl font-bold">{businessData.rating}</p>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">Valoración media</p>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-3 text-center">
                                    <div className="flex items-center justify-center gap-1 text-primary">
                                        <Building2 className="h-5 w-5" />
                                        <p className="text-2xl font-bold">{businessData.yearsExperience}</p>
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">Años de experiencia</p>
                                </div>
                            </div>
                        </Card>

                        {/* Membership Info */}
                        <Card className="p-4">
                            <h3 className="mb-3 font-semibold text-foreground">Información de membresía</h3>
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-foreground">Miembro desde {businessData.memberSince}</span>
                            </div>
                        </Card>

                        {/* Actions */}
                        <div className="space-y-2 pt-2">
                            <Button variant="default" className="w-full justify-start gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Ver panel de control
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <Settings className="h-4 w-4" />
                                Configuración del negocio
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10">
                                <LogOut className="h-4 w-4" />
                                Cerrar sesión
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};
