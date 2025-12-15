import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import {
    ArrowLeft,
    DollarSign,
    Eye,
    Calendar,
    TrendingUp,
    User,
    Settings,
    Clock,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceBadge } from './ServiceBadge';

interface ProfessionalDashboardProps {
    onBack: () => void;
}

// Mock data for the dashboard
const earningsData = [
    { name: 'Ene', amount: 1200 },
    { name: 'Feb', amount: 1900 },
    { name: 'Mar', amount: 1500 },
    { name: 'Abr', amount: 2100 },
    { name: 'May', amount: 2400 },
    { name: 'Jun', amount: 2800 },
];

const initialBookings = [
    {
        id: '1',
        clientName: 'Ana López',
        service: 'plumbing',
        date: '15 Dic 2025',
        time: '10:00',
        status: 'pending',
        amount: 85,
        address: 'Carrer de Balmes, 123, 2º 1ª',
        notes: 'El grifo de la cocina gotea constantemente. Necesito que lo revisen lo antes posible.',
        phone: '+34 612 345 678',
        email: 'ana.lopez@email.com'
    },
    {
        id: '2',
        clientName: 'Carlos Ruiz',
        service: 'plumbing',
        date: '14 Dic 2025',
        time: '16:00',
        status: 'confirmed',
        amount: 120,
        address: 'Av. Diagonal, 456, 4º B',
        notes: 'Instalación de lavavajillas nuevo.',
        phone: '+34 623 456 789',
        email: 'carlos.ruiz@email.com'
    },
    {
        id: '3',
        clientName: 'María García',
        service: 'plumbing',
        date: '12 Dic 2025',
        time: '09:00',
        status: 'completed',
        amount: 95,
        address: 'Gran Via de les Corts Catalanes, 789, 1º A',
        notes: 'Revisión general de tuberías.',
        phone: '+34 634 567 890',
        email: 'maria.garcia@email.com'
    },
];

export const ProfessionalDashboard = ({ onBack }: ProfessionalDashboardProps) => {
    const [bookings, setBookings] = useState(initialBookings);
    const [selectedBooking, setSelectedBooking] = useState<typeof initialBookings[0] | null>(null);
    const [showPendingOnly, setShowPendingOnly] = useState(false);

    const handleConfirmBooking = (id: string) => {
        setBookings(bookings.map(booking =>
            booking.id === id ? { ...booking, status: 'confirmed' } : booking
        ));
        if (selectedBooking?.id === id) {
            setSelectedBooking(prev => prev ? { ...prev, status: 'confirmed' } : null);
        }
    };

    const filteredBookings = showPendingOnly
        ? bookings.filter(b => b.status === 'pending')
        : bookings;

    return (
        <div className="min-h-screen bg-background relative">
            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setSelectedBooking(null)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Detalles de la Reserva</h2>
                            <button onClick={() => setSelectedBooking(null)} className="rounded-full p-2 hover:bg-muted">
                                <XCircle className="h-6 w-6 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                                    <User className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{selectedBooking.clientName}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>{selectedBooking.phone}</span>
                                        <span>•</span>
                                        <span>{selectedBooking.email}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 rounded-xl bg-muted/50 p-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium">Fecha y Hora</p>
                                        <p className="text-sm text-muted-foreground">{selectedBooking.date} a las {selectedBooking.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DollarSign className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium">Importe Estimado</p>
                                        <p className="text-sm text-muted-foreground">{selectedBooking.amount}€</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <Settings className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Notas del Cliente</p>
                                        <p className="text-sm text-muted-foreground">{selectedBooking.notes}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5">
                                        <CheckCircle2 className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Dirección</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground">{selectedBooking.address}</p>
                                            <Button variant="outline" size="sm" className="h-7 text-xs">
                                                Cómo llegar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">Estado:</span>
                                    {selectedBooking.status === 'pending' && (
                                        <span className="flex items-center gap-1 text-xs text-orange-500 font-medium bg-orange-500/10 px-2 py-0.5 rounded-full">
                                            <Clock className="h-3 w-3" /> Pendiente
                                        </span>
                                    )}
                                    {selectedBooking.status === 'confirmed' && (
                                        <span className="flex items-center gap-1 text-xs text-blue-500 font-medium bg-blue-500/10 px-2 py-0.5 rounded-full">
                                            <CheckCircle2 className="h-3 w-3" /> Confirmada
                                        </span>
                                    )}
                                    {selectedBooking.status === 'completed' && (
                                        <span className="flex items-center gap-1 text-xs text-green-500 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">
                                            <CheckCircle2 className="h-3 w-3" /> Completada
                                        </span>
                                    )}
                                </div>

                                {selectedBooking.status === 'pending' && (
                                    <Button onClick={() => handleConfirmBooking(selectedBooking.id)}>
                                        Confirmar Reserva
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Header */}
            <header className="border-b border-border bg-card px-4 py-4 shadow-sm sticky top-0 z-10">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={onBack}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">Panel Profesional</h1>
                            <p className="text-xs text-muted-foreground">Fontanería García</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Settings className="h-5 w-5" />
                        </Button>
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                            FG
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Ingresos Totales
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2.845€</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% respecto al mes pasado
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Visitas al Perfil
                            </CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">
                                +12% respecto al mes pasado
                            </p>
                        </CardContent>
                    </Card>
                    <Card
                        className={`cursor-pointer transition-colors hover:bg-muted/50 ${showPendingOnly ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setShowPendingOnly(!showPendingOnly)}
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Reservas Activas
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{bookings.filter(b => b.status === 'pending').length}</div>
                            <p className="text-xs text-muted-foreground">
                                {showPendingOnly ? 'Mostrando solo pendientes' : 'Click para filtrar pendientes'}
                            </p>
                        </CardContent>
                    </Card>

                    {/* New Metrics */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Valoración Media
                            </CardTitle>
                            <div className="flex items-center">
                                <span className="text-yellow-500 mr-1">★</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4.9</div>
                            <p className="text-xs text-muted-foreground">
                                Basado en 127 reseñas
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Tasa de Conversión
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3.2%</div>
                            <p className="text-xs text-muted-foreground">
                                +0.4% respecto al mes pasado
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Tiempo de Respuesta
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1.5h</div>
                            <p className="text-xs text-muted-foreground">
                                -15min respecto al mes pasado
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Chart */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Resumen de Ingresos</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={earningsData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#888888"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}€`}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        />
                                        <Bar
                                            dataKey="amount"
                                            fill="hsl(var(--primary))"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Bookings */}
                    <Card className="col-span-3">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>
                                {showPendingOnly ? 'Reservas Pendientes' : 'Reservas Recientes'}
                            </CardTitle>
                            {showPendingOnly && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowPendingOnly(false)}
                                    className="h-8 text-xs"
                                >
                                    Ver todas
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {filteredBookings.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No hay reservas pendientes
                                    </div>
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <div
                                            key={booking.id}
                                            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                                            onClick={() => setSelectedBooking(booking)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                                    <User className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium leading-none">{booking.clientName}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {booking.date} • {booking.time}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="font-bold text-sm">{booking.amount}€</span>
                                                {booking.status === 'pending' && (
                                                    <span className="flex items-center gap-1 text-xs text-orange-500 font-medium bg-orange-500/10 px-2 py-0.5 rounded-full">
                                                        <Clock className="h-3 w-3" /> Pendiente
                                                    </span>
                                                )}
                                                {booking.status === 'confirmed' && (
                                                    <span className="flex items-center gap-1 text-xs text-blue-500 font-medium bg-blue-500/10 px-2 py-0.5 rounded-full">
                                                        <CheckCircle2 className="h-3 w-3" /> Confirmada
                                                    </span>
                                                )}
                                                {booking.status === 'completed' && (
                                                    <span className="flex items-center gap-1 text-xs text-green-500 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">
                                                        <CheckCircle2 className="h-3 w-3" /> Completada
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            {!showPendingOnly && (
                                <Button variant="outline" className="w-full mt-6">
                                    Ver todas las reservas
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};
