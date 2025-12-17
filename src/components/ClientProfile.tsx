import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Settings, LogOut, Building2, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ClientProfileProps {
    onClose: () => void;
    onLogout: () => void;
}

export const ClientProfile = ({ onClose, onLogout }: ClientProfileProps) => {
    // Mock client data - in a real app, this would come from authentication/database
    const clientData = {
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        phone: '+34 612 345 678',
        address: 'Carrer de Jordi Girona, 1-3, 08034 Barcelona',
        memberSince: 'Enero 2024',
        bookingsCount: 12,
        favoriteServices: ['Fontanería', 'Electricidad'],
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
                    {/* Avatar */}
                    <div className="relative -mt-16 mb-4">
                        <div className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-secondary ring-4 ring-card">
                            <User className="h-16 w-16 text-secondary-foreground" />
                        </div>
                    </div>

                    {/* Name and Role */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-foreground">{clientData.name}</h2>
                        <p className="text-sm text-muted-foreground">Cliente</p>
                    </div>

                    {/* Info Cards */}
                    <div className="space-y-4">
                        {/* Contact Info */}
                        <Card className="p-4">
                            <h3 className="mb-3 font-semibold text-foreground">Información de contacto</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-foreground">{clientData.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-foreground">{clientData.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-foreground">{clientData.address}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Activity Stats */}
                        <Card className="p-4">
                            <h3 className="mb-3 font-semibold text-foreground">Actividad</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-lg bg-muted/50 p-3 text-center">
                                    <p className="text-2xl font-bold text-primary">{clientData.bookingsCount}</p>
                                    <p className="text-xs text-muted-foreground">Reservas realizadas</p>
                                </div>
                                <div className="rounded-lg bg-muted/50 p-3 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <p className="mt-1 text-xs text-muted-foreground">Miembro desde</p>
                                    <p className="text-sm font-medium text-foreground">{clientData.memberSince}</p>
                                </div>
                            </div>
                        </Card>

                        {/* My Bookings */}
                        <Card className="p-4">
                            <h3 className="mb-3 font-semibold text-foreground">Mis Reservas</h3>
                            <div className="space-y-3">
                                {[
                                    {
                                        id: '1',
                                        professional: 'Fontanería García',
                                        service: 'Fontanería',
                                        date: '22 Dic 2025',
                                        time: '10:00',
                                        status: 'pending',
                                        price: '85€'
                                    },
                                    {
                                        id: '2',
                                        professional: 'Electricidad Segura',
                                        service: 'Electricidad',
                                        date: '20 Dic 2025',
                                        time: '16:30',
                                        status: 'confirmed',
                                        price: '60€'
                                    },
                                    {
                                        id: '3',
                                        professional: 'Limpiezas BCN',
                                        service: 'Limpieza',
                                        date: '10 Dic 2025',
                                        time: '09:00',
                                        status: 'completed',
                                        price: '45€'
                                    }
                                ].map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <p className="font-medium text-foreground">{booking.professional}</p>
                                            <p className="text-xs text-muted-foreground">{booking.service} • {booking.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-foreground">{booking.price}</p>
                                            {booking.status === 'pending' && (
                                                <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                                                    Pendiente
                                                </span>
                                            )}
                                            {booking.status === 'confirmed' && (
                                                <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                                    Confirmada
                                                </span>
                                            )}
                                            {booking.status === 'completed' && (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                                    Completada
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Favorite Services */}
                        <Card className="p-4">
                            <h3 className="mb-3 font-semibold text-foreground">Servicios favoritos</h3>
                            <div className="flex flex-wrap gap-2">
                                {clientData.favoriteServices.map((service) => (
                                    <span
                                        key={service}
                                        className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>
                        </Card>

                        {/* Actions */}
                        <div className="space-y-2 pt-2">
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <Settings className="h-4 w-4" />
                                Configuración de cuenta
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10"
                                onClick={onLogout}
                            >
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
