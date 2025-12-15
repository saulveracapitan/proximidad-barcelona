import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Briefcase, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'login' | 'register';
    onLoginSuccess?: (role: 'client' | 'professional') => void;
}

export const AuthModal = ({ isOpen, onClose, initialView = 'login', onLoginSuccess }: AuthModalProps) => {
    const [view, setView] = useState<'login' | 'register'>(initialView);
    const [role, setRole] = useState<'client' | 'professional'>('client');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md overflow-hidden bg-background rounded-2xl shadow-2xl"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="p-6 pt-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold tracking-tight">
                            {view === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            {view === 'login'
                                ? 'Ingresa a tu cuenta para continuar'
                                : 'Únete a la comunidad de iFix'}
                        </p>
                    </div>

                    <Tabs value={role} onValueChange={(v) => setRole(v as any)} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="client" className="gap-2">
                                <User className="h-4 w-4" />
                                Cliente
                            </TabsTrigger>
                            <TabsTrigger value="professional" className="gap-2">
                                <Briefcase className="h-4 w-4" />
                                Profesional
                            </TabsTrigger>
                        </TabsList>

                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLoginSuccess?.(role); }}>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="email" type="email" placeholder="nombre@ejemplo.com" className="pl-9" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="password" type="password" placeholder="••••••••" className="pl-9" required />
                                </div>
                            </div>

                            {view === 'register' && (
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input id="confirm-password" type="password" placeholder="••••••••" className="pl-9" required />
                                    </div>
                                </div>
                            )}

                            <Button type="submit" className="w-full" size="lg">
                                {view === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </Tabs>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">
                            {view === 'login' ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                        </span>
                        <button
                            onClick={() => setView(view === 'login' ? 'register' : 'login')}
                            className="ml-2 font-medium text-primary hover:underline"
                        >
                            {view === 'login' ? 'Regístrate' : 'Inicia sesión'}
                        </button>
                    </div>
                </div>

                {/* Footer decoration */}
                <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary" />
            </motion.div>
        </div>
    );
};
