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
import { ReactNode, useState, FormEvent, useEffect } from 'react';
import logoImg from './assets/logo.png';

const reviews = [
  {
    text: "Llevé mi e-bike para una revisión completa y el resultado fue espectacular. Carles es un apasionado de las bicis y se nota en cómo trabaja. Precios muy justos.",
    name: "Laura G.",
    role: "Local Guide",
    initials: "LG"
  },
  {
    text: "Gran profesional, trato cercano y muy rápido. Me solucionó un problema con los frenos que en otros talleres no daban con la tecla. 100% recomendable.",
    name: "David M.",
    role: "Cliente",
    initials: "DM"
  },
  {
    text: "El mejor taller de bicicletas de Picassent y alrededores. Siempre te aconseja lo mejor para tu bici sin intentar venderte cosas innecesarias. Trato de 10.",
    name: "Carlos R.",
    role: "Local Guide",
    initials: "CR"
  },
  {
    text: "Servicio impecable. Me preparó la bici de carretera para una competición y todo fue perfecto. Muy detallista y puntual con las entregas.",
    name: "Javier T.",
    role: "Cliente",
    initials: "JT"
  },
  {
    text: "Descubrí este taller por casualidad y ya no llevo mi bici a otro sitio. Carles es súper amable, te explica todo lo que le hace a la bici y los precios son muy competitivos.",
    name: "Marta V.",
    role: "Local Guide",
    initials: "MV"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'bookings'>('home');
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
      <header className="sticky-nav sticky top-0 z-50 border-b border-gray-dark h-16 md:h-20 flex items-center px-4">
        <nav className="w-full flex justify-between items-center">
          {/* Left-aligned Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            <img src={logoImg} alt="Carles Mecànica - Taller de Bicicletas en Picassent" className="h-10 md:h-14 object-contain" />
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://wa.me/34614085416" 
              className="hidden sm:block text-white hover:text-brand-green transition-colors"
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
            className="fixed inset-0 z-40 bg-bg-color pt-20 px-6"
          >
            <nav className="flex flex-col space-y-6 text-center">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="text-3xl font-bold hover:text-brand-green transition-colors py-4 border-b border-gray-dark w-full"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-8 flex justify-center space-x-6">
                <a href="https://wa.me/34614085416" className="text-brand-green">
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
        <section className="hero-gradient wave-border min-h-[85vh] flex flex-col justify-center px-6 py-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl mb-4"
          >
            Taller de bicicletas en <span className="text-brand-green">Picassent</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 mb-10 max-w-md mx-auto"
          >
            Especialistas en reparación y mantenimiento de MTB, Carretera y E-Bikes. Servicio mecánico profesional, rápido y de confianza.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <button 
              onClick={() => navigateTo('bookings')}
              className="w-full max-w-xs bg-brand-green hover:bg-brand-green/80 text-bg-color font-bold py-4 rounded-lg text-xl shadow-lg transition-transform active:scale-95"
            >
              Pedir Cita Ahora
            </button>
          </motion.div>
        </section>

        {/* Social Proof Bar */}
        <section className="bg-bg-color py-6 px-4 border-y border-gray-dark wave-border">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-1">
              <span className="font-bold text-white mr-2">5.0</span>
              <div className="flex text-brand-green">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-sm font-medium text-gray-400">"Más de 200 ciclistas confían en nosotros"</p>
            <p className="text-xs uppercase tracking-widest text-brand-green font-bold">Reseñas en Google Maps</p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-6 max-w-7xl mx-auto wave-border">
          <h2 className="text-3xl mb-10 text-center">Servicios de Mecánica de Bicicletas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard 
              icon={<Settings className="w-8 h-8" />}
              title="Mantenimiento y Revisión"
              description="Ajuste de cambios, frenos, lubricación y revisión general para que tu bicicleta ruede perfecta."
            />
            <ServiceCard 
              icon={<Megaphone className="w-8 h-8" />}
              title="Reparación de Frenos y Tubeless"
              description="Purgado de frenos hidráulicos, cambio de pastillas y tubelizado de ruedas con máxima garantía."
            />
            <ServiceCard 
              icon={<Zap className="w-8 h-8" />}
              title="Reparación de E-Bikes"
              description="Diagnóstico electrónico, actualización de software y mantenimiento especializado de motores de bicicletas eléctricas."
            />
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-bg-color py-16 px-6 wave-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl mb-12 text-center text-brand-green">¿Cómo arreglar tu bici con nosotros?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Step 
                number="01"
                title="Trae tu bicicleta"
                description="Pásate por nuestro taller de bicis en Picassent. Te atenderemos sin esperas si tienes cita previa."
              />
              <Step 
                number="02"
                title="Presupuesto de reparación"
                subtitle="Evaluamos el daño o mejora"
                description="Te explicamos qué necesita tu bici y el coste exacto de la reparación antes de empezar."
              />
              <Step 
                number="03"
                title="Lista para rodar"
                description="Te avisamos cuando tu bicicleta esté reparada. ¡Volverá a sentirse como nueva en la montaña o carretera!"
              />
            </div>
          </div>
        </section>

        {/* Testimonial Widget */}
        <section className="py-16 px-6 max-w-4xl mx-auto wave-border">
          <div className="bg-gray-dark p-8 rounded-2xl border-l-4 border-brand-green shadow-xl relative min-h-[300px] md:min-h-[250px]">
            <div className="flex text-brand-green mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute left-8 right-8"
              >
                <p className="text-lg italic text-white mb-6">
                  "{reviews[currentReview].text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center font-bold text-bg-color mr-3">
                    {reviews[currentReview].initials}
                  </div>
                  <div>
                    <p className="font-bold text-white leading-none">{reviews[currentReview].name}</p>
                    <p className="text-xs text-gray-400 mt-1">{reviews[currentReview].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-4 right-8 flex space-x-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReview(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentReview ? 'bg-brand-green' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
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
        <footer id="footer" className="bg-bg-color pt-12 pb-24 px-6 border-t border-gray-dark">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-8">
                <img src={logoImg} alt="Carles Mecànica - Taller de Bicicletas en Picassent" className="h-12 md:h-16 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-2 h-6 bg-brand-green mr-2 rounded-full"></span>
                Dónde estamos
              </h3>
              <p className="text-gray-400 mb-2">Carrer Gómez Ferrer, 40</p>
              <p className="text-gray-400 mb-6">46220 Picassent, Valencia</p>
              <p className="text-gray-400 mb-6 italic text-sm">Tu taller de bicicletas de confianza cerca de ti.</p>
              
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-2 h-6 bg-brand-green mr-2 rounded-full"></span>
                Horario
              </h3>
              <ul className="text-gray-400 space-y-1">
                <li>Lun - Vie: 10:00 - 14:00 | 17:00 - 19:30</li>
                <li>Sábados: 09:00 - 13:00</li>
                <li>Domingos: Cerrado (¡Ruta!)</li>
              </ul>
            </div>
            
            <div className="w-full h-64 bg-gray-dark rounded-2xl overflow-hidden relative shadow-inner">
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
            © 2026 Carles Mecànica & Ciclisme. Taller de reparación de bicicletas en Picassent, Valencia. Passió per les dues rodes.
          </div>
        </footer>

      {/* Floating WhatsApp Button */}
      <motion.a 
        href="https://wa.me/34614085416"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-green rounded-full flex items-center justify-center shadow-2xl z-50 text-bg-color"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.a>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: ReactNode, title: string, description: string }) {
  return (
    <div className="bg-bg-color p-8 rounded-2xl border border-gray-dark flex flex-col items-center text-center hover:border-brand-green transition-colors group">
      <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-dark rounded-full text-brand-green group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <a 
        href="#" 
        className="inline-flex items-center border border-brand-green text-brand-green px-6 py-2 rounded-lg font-semibold hover:bg-brand-green hover:text-bg-color transition-colors"
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
      <div className="text-6xl font-black text-gray-dark mb-4">{number}</div>
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
  
  // Booked slots state
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('carles_booked_slots');
    if (saved) return JSON.parse(saved);
    
    // Generate some mock booked slots for demonstration
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatD = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    return {
      [formatD(today)]: ['10:00', '11:30', '18:00'],
      [formatD(tomorrow)]: ['12:00', '17:30', '19:00']
    };
  });
  
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
      // Intentamos llamar a la función de Netlify
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
          console.warn('La función de Netlify devolvió un error, usando fallback local.');
        }
      } catch (fetchError) {
        console.warn('No se pudo conectar con la función de Netlify (probablemente en entorno de desarrollo). Usando fallback local.', fetchError);
        // Mock API call delay for local development
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Update booked slots (Optimistic UI update)
      const updatedSlots = { ...bookedSlots };
      if (!updatedSlots[selectedDateStr]) {
        updatedSlots[selectedDateStr] = [];
      }
      updatedSlots[selectedDateStr].push(selectedTime);
      
      setBookedSlots(updatedSlots);
      localStorage.setItem('carles_booked_slots', JSON.stringify(updatedSlots));

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
          className="bg-bg-color p-10 rounded-2xl border border-brand-green"
        >
          <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-bg-color fill-current" />
          </div>
          <h2 className="text-3xl font-bold mb-4">¡Reserva Confirmada!</h2>
          <p className="text-gray-400 mb-8">
            Hemos recibido tu solicitud para el día <span className="text-white font-bold">{selectedDateStr ? formatDateDisplay(selectedDateStr) : ''}</span> a las <span className="text-white font-bold">{selectedTime}</span>. 
            Te enviaremos un correo de confirmación en breve.
          </p>
          <button 
            onClick={onBack}
            className="bg-brand-green text-bg-color font-bold py-3 px-8 rounded-lg hover:bg-brand-green/80 transition-colors"
          >
            Volver al Inicio
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">Reserva tu Cita en el Taller</h2>
      <p className="text-gray-400 text-center mb-12">Completa tus datos y elige un día y hora disponible para reparar o revisar tu bicicleta.</p>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* User Form */}
        <div className="bg-bg-color p-8 rounded-2xl border border-gray-dark space-y-6">
          <h3 className="text-xl font-bold flex items-center text-brand-green">
            <span className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center mr-3 text-sm">1</span>
            Tus Datos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Nombre Completo <span className="text-brand-green">*</span></label>
              <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full bg-gray-dark border border-gray-dark rounded-lg px-4 py-3 focus:border-brand-green outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Correo Electrónico <span className="text-brand-green">*</span></label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan@ejemplo.com"
                className="w-full bg-gray-dark border border-gray-dark rounded-lg px-4 py-3 focus:border-brand-green outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Teléfono <span className="text-brand-green">*</span></label>
              <input 
                required
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="600 000 000"
                className="w-full bg-gray-dark border border-gray-dark rounded-lg px-4 py-3 focus:border-brand-green outline-none transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Tipo de Bicicleta</label>
              <select 
                value={bikeType}
                onChange={(e) => setBikeType(e.target.value)}
                className="w-full bg-gray-dark border border-gray-dark rounded-lg px-4 py-3 focus:border-brand-green outline-none transition-colors appearance-none"
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
              className="w-full bg-gray-dark border border-gray-dark rounded-lg px-4 py-3 focus:border-brand-green outline-none transition-colors resize-none"
            ></textarea>
          </div>
        </div>

        <div className="bg-bg-color p-8 rounded-2xl border border-gray-dark space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold flex items-center text-brand-green">
              <span className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center mr-3 text-sm">2</span>
              Selecciona el Día
            </h3>
            <div className="flex items-center space-x-4">
              <button 
                type="button"
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-gray-dark rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-bold min-w-[120px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button 
                type="button"
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-gray-dark rounded-full transition-colors"
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
                    ${isUnavailable ? 'text-gray-700 cursor-not-allowed opacity-30' : 'hover:bg-brand-green/20 cursor-pointer'}
                    ${isSelected ? 'bg-brand-green text-bg-color shadow-lg scale-110' : 'bg-gray-dark'}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-dark rounded-sm mr-2"></div>
              Disponible
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-brand-green rounded-sm mr-2"></div>
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
              className="bg-bg-color p-8 rounded-2xl border border-gray-dark space-y-6 overflow-hidden"
            >
              <h3 className="text-xl font-bold flex items-center text-brand-green">
                <span className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center mr-3 text-sm">3</span>
                Selecciona la Hora
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-3">Mañana (10:00 - 14:00)</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {morningSlots.map(time => {
                      const isBooked = selectedDateStr && bookedSlots[selectedDateStr]?.includes(time);
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedTime(time)}
                          className={`
                            py-2 rounded-lg text-sm font-medium transition-all border
                            ${isBooked 
                              ? 'bg-red-900/40 border-red-500/30 text-red-400 cursor-not-allowed line-through' 
                              : selectedTime === time 
                                ? 'bg-brand-green border-brand-green text-bg-color' 
                                : 'bg-gray-dark border-transparent hover:border-brand-green/50'}
                          `}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-3">Tarde (17:00 - 19:30)</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {afternoonSlots.map(time => {
                      const isBooked = selectedDateStr && bookedSlots[selectedDateStr]?.includes(time);
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedTime(time)}
                          className={`
                            py-2 rounded-lg text-sm font-medium transition-all border
                            ${isBooked 
                              ? 'bg-red-900/40 border-red-500/30 text-red-400 cursor-not-allowed line-through' 
                              : selectedTime === time 
                                ? 'bg-brand-green border-brand-green text-bg-color' 
                                : 'bg-gray-dark border-transparent hover:border-brand-green/50'}
                          `}
                        >
                          {time}
                        </button>
                      );
                    })}
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
            className={`w-full max-w-xs bg-brand-green hover:bg-brand-green/80 text-bg-color font-bold py-4 rounded-lg text-xl shadow-lg transition-transform active:scale-95 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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
