/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Menu, 
  MessageCircle, 
  Settings, 
  Zap, 
  Megaphone, 
  Star, 
  MapPin, 
  Clock,
  ChevronRight,
  ChevronLeft,
  Bike,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useState, FormEvent } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'bookings'>('home');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigateTo = (view: 'home' | 'bookings') => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const menuItems = [
    { name: 'Inicio', action: () => navigateTo('home') },
    { name: 'Reservas', action: () => navigateTo('bookings') },
    { name: 'Contacto', action: () => {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }},
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Navbar */}
      <header className="sticky-nav sticky top-0 z-50 border-b border-brand-light-gray h-16 flex items-center px-4">
        <nav className="w-full flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            <img src="/logo.png" alt="Carles Mecànica Logo" className="h-10" />
            <span className="font-bold text-lg tracking-tight uppercase italic ml-2">
              Carles<span className="text-brand-orange">Mecànica</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://wa.me/34614085416" 
              className="hidden sm:block text-white hover:text-brand-orange transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <button 
              onClick={toggleMenu}
              className="text-white p-1 hover:bg-white/10 rounded-lg transition-colors" 
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-charcoal pt-20 px-6"
          >
            <nav className="flex flex-col space-y-6 text-center">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="text-3xl font-bold hover:text-brand-orange transition-colors py-4 border-b border-brand-light-gray w-full"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-8 flex justify-center space-x-6">
                <a href="https://wa.me/34614085416" className="text-brand-orange">
                  <MessageCircle className="w-10 h-10" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
        {/* Hero Section */}
        <section className="hero-gradient min-h-[85vh] flex flex-col justify-center px-6 py-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
          >
            Tu bicicleta a punto para la <span className="text-brand-orange italic">próxima ruta</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 mb-10 max-w-md mx-auto"
          >
            Taller especializado en MTB, Carretera y E-Bikes en Picassent. Cuidamos cada detalle de tu máquina.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <button 
              onClick={() => navigateTo('bookings')}
              className="w-full max-w-xs bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-lg text-xl shadow-lg transition-transform active:scale-95"
            >
              Pedir Cita Ahora
            </button>
          </motion.div>
        </section>

        {/* Social Proof Bar */}
        <section className="bg-brand-gray py-6 px-4 border-y border-brand-light-gray">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-1">
              <span className="font-bold text-white mr-2">5.0</span>
              <div className="flex text-brand-orange">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-sm font-medium text-gray-400">"Más de 200 ciclistas confían en nosotros"</p>
            <p className="text-xs uppercase tracking-widest text-brand-orange font-bold">Reseñas en Google Maps</p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-10 text-center">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard 
              icon={<Settings className="w-8 h-8" />}
              title="Mantenimiento General"
              description="Revisión completa, limpieza profunda y ajuste de transmisión."
            />
            <ServiceCard 
              icon={<Megaphone className="w-8 h-8" />}
              title="Frenos & Tubeless"
              description="Purgado de frenos hidráulicos, cambio de pastillas y sellado de cubiertas."
            />
            <ServiceCard 
              icon={<Zap className="w-8 h-8" />}
              title="E-Bikes & Motor"
              description="Diagnóstico electrónico, actualización de software y mantenimiento de motor."
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-brand-gray py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-12 text-center text-brand-orange">¿Cómo trabajamos?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Step 
                number="01"
                title="Trae tu bici"
                description="Pásate por el taller en Picassent. Sin esperas si tienes cita previa."
              />
              <Step 
                number="02"
                title="Presupuesto sin compromiso"
                subtitle="Evaluamos el daño o mejora"
                description="Te explicamos qué necesita tu bicicleta y el coste exacto antes de empezar."
              />
              <Step 
                number="03"
                title="Lista para rodar"
                description="Te avisamos cuando esté lista. ¡Tu bici volverá a sentirse como nueva!"
              />
            </div>
          </div>
        </section>

        {/* Testimonial Widget */}
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <div className="bg-brand-light-gray p-8 rounded-2xl border-l-4 border-brand-orange shadow-xl">
            <div className="flex text-brand-orange mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-lg italic text-white mb-6">
              "El mejor taller de la zona. Carles es un profesional impecable, me dejó la E-Bike perfecta después de meses con problemas de electrónica. Recomendable 100%."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center font-bold text-white mr-3">
                JM
              </div>
              <div>
                <p className="font-bold text-white leading-none">Juan Moreno</p>
                <p className="text-xs text-gray-400 mt-1">Ciclista de Montaña</p>
              </div>
            </div>
          </div>
        </section>

          </motion.div>
        ) : (
          <motion.div
            key="bookings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <BookingsPage onBack={() => setCurrentView('home')} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>

      {/* Footer */}
        <footer id="footer" className="bg-brand-gray pt-12 pb-24 px-6 border-t border-brand-light-gray">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-2 h-6 bg-brand-orange mr-2 rounded-full"></span>
                Dónde estamos
              </h3>
              <p className="text-gray-400 mb-2">Carrer Gómez Ferrer, 40</p>
              <p className="text-gray-400 mb-6">46220 Picassent, Valencia</p>
              
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-2 h-6 bg-brand-orange mr-2 rounded-full"></span>
                Horario
              </h3>
              <ul className="text-gray-400 space-y-1">
                <li>Lun - Vie: 10:00 - 14:00 | 17:00 - 19:30</li>
                <li>Sábados: 09:00 - 13:00</li>
                <li>Domingos: Cerrado (¡Ruta!)</li>
              </ul>
            </div>
            
            <div className="w-full h-64 bg-brand-light-gray rounded-2xl overflow-hidden relative shadow-inner">
              <iframe 
                src="https://maps.google.com/maps?q=Carrer%20G%C3%B3mez%20Ferrer%2C%2040%2C%2046220%20Picassent%2C%20Valencia&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                className="grayscale contrast-125 opacity-70"
              ></iframe>
            </div>
          </div>
          <div className="mt-12 text-center text-xs text-gray-500 max-w-7xl mx-auto">
            © 2024 Carles Mecànica & Ciclisme. Passió per les dues rodes.
          </div>
        </footer>

      {/* Floating WhatsApp Button */}
      <motion.a 
        href="https://wa.me/34614085416"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl z-50 text-white"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.a>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <div className="bg-brand-gray p-8 rounded-2xl border border-brand-light-gray flex flex-col items-center text-center hover:border-brand-orange transition-colors group">
      <div className="w-16 h-16 mb-4 flex items-center justify-center bg-brand-light-gray rounded-full text-brand-orange group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <a 
        href="#" 
        className="inline-flex items-center border border-brand-orange text-brand-orange px-6 py-2 rounded-lg font-semibold hover:bg-brand-orange hover:text-white transition-colors"
      >
        Ver detalles
        <ChevronRight className="w-4 h-4 ml-1" />
      </a>
    </div>
  );
}

function Step({ number, title, subtitle, description }: { number: string, title: string, subtitle?: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-6xl font-black text-brand-light-gray mb-4">{number}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {subtitle && <h4 className="text-gray-400 italic mb-2">{subtitle}</h4>}
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function BookingsPage({ onBack }: { onBack: () => void }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bikeType, setBikeType] = useState('MTB');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get number of days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Get the day of the week the month starts on (0=Sun, 1=Mon, ..., 6=Sat)
  // We want to adjust it so 0=Mon, 1=Tue, ..., 6=Sun
  let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const morningSlots = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'];
  const afternoonSlots = ['17:00', '17:30', '18:00', '18:30', '19:00'];

  const handleDateClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDateStr(dateStr);
    setSelectedTime(null);
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentYear, currentMonth + offset, 1);
    setCurrentDate(newDate);
  };

  const isWeekend = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 is Sunday, 6 is Saturday
  };

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDateStr) {
      alert("Por favor, selecciona un día en el calendario.");
      return;
    }
    if (!selectedTime) {
      alert("Por favor, selecciona una franja horaria.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/.netlify/functions/create-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          bikeType,
          description,
          date: selectedDateStr,
          time: selectedTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la reserva');
      }

      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Hubo un problema al procesar tu reserva. Por favor, inténtalo de nuevo o contáctanos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateDisplay = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  if (formSubmitted) {
    return (
      <div className="py-20 px-6 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-brand-gray p-10 rounded-2xl border border-brand-orange"
        >
          <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-white fill-current" />
          </div>
          <h2 className="text-3xl font-bold mb-4">¡Reserva Confirmada!</h2>
          <p className="text-gray-400 mb-8">
            Hemos recibido tu solicitud para el día <span className="text-white font-bold">{selectedDateStr ? formatDateDisplay(selectedDateStr) : ''}</span> a las <span className="text-white font-bold">{selectedTime}</span>. 
            Te enviaremos un correo de confirmación en breve.
          </p>
          <button 
            onClick={onBack}
            className="bg-brand-orange text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Volver al Inicio
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">Reserva tu Cita</h2>
      <p className="text-gray-400 text-center mb-12">Completa tus datos y elige un día y hora disponible en el taller.</p>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* User Form */}
        <div className="bg-brand-gray p-8 rounded-2xl border border-brand-light-gray space-y-6">
          <h3 className="text-xl font-bold flex items-center text-brand-orange">
            <span className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center mr-3 text-sm">1</span>
            Tus Datos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Nombre Completo</label>
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full bg-brand-light-gray border border-brand-light-gray rounded-lg px-4 py-3 focus:border-brand-orange outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Correo Electrónico</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan@ejemplo.com"
                className="w-full bg-brand-light-gray border border-brand-light-gray rounded-lg px-4 py-3 focus:border-brand-orange outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Teléfono</label>
              <input 
                required
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="600 000 000"
                className="w-full bg-brand-light-gray border border-brand-light-gray rounded-lg px-4 py-3 focus:border-brand-orange outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Tipo de Bicicleta</label>
              <select 
                value={bikeType}
                onChange={(e) => setBikeType(e.target.value)}
                className="w-full bg-brand-light-gray border border-brand-light-gray rounded-lg px-4 py-3 focus:border-brand-orange outline-none transition-colors appearance-none"
              >
                <option>MTB</option>
                <option>Carretera</option>
                <option>E-Bike</option>
                <option>Urbana</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">¿Qué necesita tu bici?</label>
            <textarea 
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe brevemente el problema o servicio..."
              className="w-full bg-brand-light-gray border border-brand-light-gray rounded-lg px-4 py-3 focus:border-brand-orange outline-none transition-colors resize-none"
            ></textarea>
          </div>
        </div>

        <div className="bg-brand-gray p-8 rounded-2xl border border-brand-light-gray space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold flex items-center text-brand-orange">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center mr-3 text-sm">2</span>
              Selecciona el Día
            </h3>
            <div className="flex items-center space-x-4">
              <button 
                type="button"
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-brand-light-gray rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-bold min-w-[120px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button 
                type="button"
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-brand-light-gray rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
              <div key={day} className="text-xs font-bold text-gray-500 uppercase">{day}</div>
            ))}
            
            {/* Empty cells for previous month padding */}
            {[...Array(firstDayOfMonth)].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}

            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const isUnavailable = isWeekend(day) || isPast(day);
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = selectedDateStr === dateStr;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isUnavailable}
                  onClick={() => handleDateClick(day)}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all
                    ${isUnavailable ? 'text-gray-700 cursor-not-allowed opacity-30' : 'hover:bg-brand-orange/20 cursor-pointer'}
                    ${isSelected ? 'bg-brand-orange text-white shadow-lg scale-110' : 'bg-brand-light-gray'}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-brand-light-gray rounded-sm mr-2"></div>
              Disponible
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-brand-orange rounded-sm mr-2"></div>
              Seleccionado
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-700 rounded-sm mr-2"></div>
              No disponible
            </div>
          </div>
        </div>

        {/* Time Slots Section */}
        <AnimatePresence>
          {selectedDateStr && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-brand-gray p-8 rounded-2xl border border-brand-light-gray space-y-6 overflow-hidden"
            >
              <h3 className="text-xl font-bold flex items-center text-brand-orange">
                <span className="w-8 h-8 rounded-full bg-brand-orange/20 flex items-center justify-center mr-3 text-sm">3</span>
                Selecciona la Hora
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-3">Mañana (10:00 - 14:00)</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {morningSlots.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`
                          py-2 rounded-lg text-sm font-medium transition-all border
                          ${selectedTime === time 
                            ? 'bg-brand-orange border-brand-orange text-white' 
                            : 'bg-brand-light-gray border-transparent hover:border-brand-orange/50'}
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-3">Tarde (17:00 - 19:30)</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {afternoonSlots.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`
                          py-2 rounded-lg text-sm font-medium transition-all border
                          ${selectedTime === time 
                            ? 'bg-brand-orange border-brand-orange text-white' 
                            : 'bg-brand-light-gray border-transparent hover:border-brand-orange/50'}
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col items-center pt-6">
          {submitError && (
            <div className="w-full max-w-md bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6 text-center text-sm">
              {submitError}
            </div>
          )}
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full max-w-xs bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-lg text-xl shadow-lg transition-transform active:scale-95 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Enviando...' : 'Confirmar Reserva'}
          </button>
          <button 
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="mt-4 text-gray-400 hover:text-white transition-colors"
          >
            Cancelar y volver
          </button>
        </div>
      </form>
    </div>
  );
}
