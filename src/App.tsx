import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Cpu, 
  Zap, 
  Trophy, 
  Users, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  ChevronRight, 
  ExternalLink,
  Wrench,
  Hammer,
  Cog,
  Dna,
  ArrowLeft,
  Clock,
  User,
  Menu,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { events, EventDetail } from './data/events';

// --- Scroll To Top ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Constants ---

const GALLERY_IMAGES = [
  { src: "/r/assets/gallery-1.jpg", alt: "Mechanical Workshop" },
  { src: "/r/assets/gallery-2.jpg", alt: "Technical Presentation" },
  { src: "/r/assets/gallery-3.jpg", alt: "Project Expo" },
  { src: "/r/assets/gallery-4.jpg", alt: "Inauguration Ceremony" },
  { src: "/r/assets/gallery-1.jpg", alt: "Student Innovation" },
  { src: "/r/assets/gallery-2.jpg", alt: "Robotics Competition" },
];

// --- Components ---

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-03-24T09:00:00');
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8">
      {[
        { label: 'DAYS', value: timeLeft.days },
        { label: 'HOURS', value: timeLeft.hours },
        { label: 'MINS', value: timeLeft.minutes },
        { label: 'SECS', value: timeLeft.seconds },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-14 h-18 sm:w-16 sm:h-20 bg-white border-2 border-orange-500 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-orange-50/50 border-b border-orange-100" />
            <span className="text-2xl sm:text-3xl font-bold text-orange-600 relative z-10">{String(item.value).padStart(2, '0')}</span>
            <div className="absolute top-1 left-1 w-2 h-2 bg-orange-500 rounded-full opacity-30" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full opacity-30" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold text-orange-800 mt-2 tracking-widest">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

interface EventCardProps {
  id: string;
  icon: any;
  name: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({ id, icon: Icon, name, description }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass-card p-8 rounded-3xl flex flex-col items-start group transition-all duration-300 hover:border-orange-400"
  >
    <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/30 group-hover:rotate-12 transition-transform">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{name}</h3>
    <p className="text-slate-600 text-sm leading-relaxed mb-6">{description}</p>
    <Link to={`/event/${id}`} className="flex items-center gap-2 text-orange-600 font-bold text-sm group/btn">
      VIEW DETAILS <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

const TimelineItem = ({ time, title, description, side }: { time: string, title: string, description: string, side: 'left' | 'right' }) => (
  <div className={`flex w-full mb-12 items-center justify-between ${side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
    <div className="hidden md:block w-5/12" />
    <div className="z-20 flex items-center justify-center w-10 h-10 bg-orange-500 rounded-full shadow-lg shadow-orange-500/40 border-4 border-white shrink-0 absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0">
      <div className="w-2 h-2 bg-white rounded-full animate-ping" />
    </div>
    <motion.div 
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`w-[calc(50%-2rem)] md:w-5/12 glass-card p-4 sm:p-6 rounded-3xl ${side === 'left' ? 'mr-auto text-right' : 'ml-auto text-left'} md:text-left`}
    >
      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-[10px] sm:text-xs font-bold rounded-full mb-2 sm:mb-3">{time}</span>
      <h4 className="text-sm sm:text-lg font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-slate-500 text-[10px] sm:text-sm leading-tight">{description}</p>
    </motion.div>
  </div>
);

const GalleryCarousel = () => {
  const images = GALLERY_IMAGES;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-[1.5rem] md:rounded-[3rem] shadow-2xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative aspect-video w-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Pause Indicator */}
        <AnimatePresence>
          {isPaused && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 bg-orange-500/90 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] font-black tracking-widest uppercase flex items-center gap-2 shadow-lg z-20"
            >
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-white rounded-full" />
                <div className="w-1 h-3 bg-white rounded-full" />
              </div>
              PAUSED
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Dots Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-500 rounded-full ${
                i === currentIndex 
                  ? 'w-8 h-1.5 bg-orange-500' 
                  : 'w-1.5 h-1.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

// --- Pages ---

const MinimalMechanicalBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="absolute -top-20 -right-20 text-orange-100"
    >
      <Settings size={300} />
    </motion.div>
    <motion.div 
      animate={{ rotate: -360 }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 -left-20 text-orange-100"
    >
      <Settings size={250} />
    </motion.div>
    <motion.div 
      animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }}
      transition={{ duration: 12, repeat: Infinity }}
      className="absolute top-1/4 right-10 text-orange-200/50"
    >
      <Wrench size={40} />
    </motion.div>
    <motion.div 
      animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
      transition={{ duration: 15, repeat: Infinity }}
      className="absolute bottom-1/4 left-10 text-orange-200/50"
    >
      <Hammer size={50} />
    </motion.div>
    <motion.div 
      animate={{ scale: [1, 1.05, 1], rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity }}
      className="absolute bottom-10 right-1/4 text-orange-200/30"
    >
      <Cog size={80} />
    </motion.div>
  </div>
);

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'EVENTS', href: '#events' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SCHEDULE', href: '#schedule' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <div className="min-h-screen font-sans relative overflow-hidden">
      <MinimalMechanicalBackground />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-3 sm:px-6 py-2 sm:py-4">
        <div className="max-w-7xl mx-auto glass-card rounded-full px-4 sm:px-8 py-1 sm:py-2 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white shrink-0">
              <Settings size={18} className="animate-spin-slow" />
            </div>
            <span className="font-display font-black text-lg sm:text-xl tracking-tighter hidden min-[450px]:block">DYNAMECHS</span>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-bold text-slate-600">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-orange-600 transition-colors">{link.name}</a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a href="#events" className="hidden sm:block bg-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all hover:scale-105 active:scale-95">
              EXPLORE
            </a>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-slate-600 hover:text-orange-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-4 right-4 md:hidden z-40"
            >
              <div className="glass-card rounded-3xl p-6 shadow-2xl border border-orange-100">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-lg font-bold text-slate-600 hover:text-orange-600 transition-colors py-2 border-b border-orange-50 last:border-0"
                    >
                      {link.name}
                    </a>
                  ))}
                  <a 
                    href="#events" 
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-2 bg-orange-500 text-white text-center py-4 rounded-2xl font-black shadow-lg shadow-orange-500/30"
                  >
                    EXPLORE EVENTS
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex flex-col items-center justify-center">
        {/* Background Mechanical Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 text-orange-100 opacity-40"
          >
            <Settings size={400} />
          </motion.div>
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -right-20 text-orange-100 opacity-40"
          >
            <Settings size={500} />
          </motion.div>
          
          {/* Floating Tools */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/4 left-10 text-orange-200 opacity-30"
          >
            <Wrench size={60} />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-1/4 right-20 text-orange-200 opacity-30"
          >
            <Hammer size={80} />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/3 right-1/4 text-orange-200 opacity-20"
          >
            <Cog size={120} />
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-black tracking-[0.3em] rounded-full uppercase">
              National Level Technical Symposium
            </span>
          </motion.div>

          <motion.div className="animate-float relative">
            {/* Title Mechanical Accents */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -top-12 -left-12 text-orange-500/20"
            >
              <Settings size={80} />
            </motion.div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 -right-12 text-orange-500/20"
            >
              <Cog size={100} />
            </motion.div>

            <h1 className="flex flex-col items-center leading-none w-full">
              <span className="shiny-text text-5xl sm:text-7xl md:text-9xl font-display font-black tracking-tighter flex text-shadow-premium">
                <span className="text-black">DYNA</span>
                <span className="text-[#D35400]">MECHS</span>
              </span>
              <motion.span 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-linear-to-b from-orange-500 to-orange-700 mt-2 filter drop-shadow-[0_10px_10px_rgba(211,84,0,0.3)]" 
                style={{ WebkitTextStroke: '2px #D35400' }}
              >
                2026
              </motion.span>
            </h1>
          </motion.div>

          {/* Mechanical Tools Orbiting Title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 pointer-events-none hidden md:block">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-1/4 text-orange-400/40"
            >
              <Wrench size={32} />
            </motion.div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 right-1/4 text-orange-400/40"
            >
              <Hammer size={32} />
            </motion.div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 -left-10 text-orange-400/40"
            >
              <Settings size={40} />
            </motion.div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 -right-10 text-orange-400/40"
            >
              <Cog size={40} />
            </motion.div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-2xl md:text-3xl font-serif italic text-slate-700"
          >
            "Set the Trail Blazing"
          </motion.p>

          <div className="mt-6 space-y-1 text-slate-500 font-bold text-[10px] sm:text-sm uppercase tracking-widest px-4">
            <p>Department of Mechanical Engineering</p>
            <p>JNTUA College of Engineering Anantapur (Autonomous)</p>
          </div>

          <CountdownTimer />

          <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#events" className="bg-orange-500 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-full font-black text-base sm:text-lg shadow-2xl shadow-orange-500/40 hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 sm:gap-3">
              EXPLORE EVENTS <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="#about" className="bg-white text-orange-600 border-2 border-orange-500 px-6 py-3 sm:px-10 sm:py-4 rounded-full font-black text-base sm:text-lg hover:bg-orange-50 transition-all hover:scale-105 active:scale-95">
              LEARN MORE
            </a>
          </div>

          <div className="mt-16 flex items-center gap-4 text-slate-400">
            <Calendar size={20} className="text-orange-500" />
            <span className="font-bold tracking-widest">24 MARCH 2026</span>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <MapPin size={20} className="text-orange-500" />
            <span className="font-bold tracking-widest">JNTUA CEA</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50" />
            <div className="relative glass-card p-4 rounded-[2.5rem] rotate-3 max-w-md mx-auto">
              <img 
                src="/r/assets/about.png" 
                alt="Mechanical Engineering" 
                className="rounded-[1.5rem] w-full aspect-[3/4] object-cover shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-3xl shadow-xl">
                <Trophy size={40} />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-orange-500 rounded-full" />
              <span className="text-orange-600 font-black tracking-widest text-sm uppercase">About DYNAMECHS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-8 leading-tight">
              <span className="text-orange-500">Mechanical Engineering</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              DYNAMECHS 2026 is a premier National Level Technical Symposium organized by the Department of Mechanical Engineering at JNTUA College of Engineering Anantapur. 
              Our mission is to provide a dynamic platform for students to showcase their technical prowess, creative problem-solving skills, and innovative ideas.
            </p>
            <div className="grid grid-cols-1 gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-black text-orange-500">7+</span>
                <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Technical Events</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 px-6 bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-orange-600 font-black tracking-[0.3em] text-xs uppercase">Competition Arena</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 mt-4">TECHNICAL EVENTS</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.filter(e => e.category === 'technical').map((event) => (
              <EventCard key={event.id} id={event.id} icon={event.icon} name={event.name} description={event.shortDescription} />
            ))}
          </div>
        </div>
      </section>

      {/* Non-Technical Events Section */}
      <section id="non-tech-events" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-orange-600 font-black tracking-[0.3em] text-xs uppercase">Fun Zone</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 mt-4">NON-TECHNICAL EVENTS</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.filter(e => e.category === 'non-technical').map((event) => (
              <EventCard key={event.id} id={event.id} icon={event.icon} name={event.name} description={event.shortDescription} />
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-24 px-6 bg-[#FFFBF7] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-orange-600 font-black tracking-[0.3em] text-xs uppercase">Event Timeline</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 mt-4">SYMPOSIUM SCHEDULE</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-orange-100 rounded-full" />
            
            <div className="space-y-4 relative">
              <TimelineItem time="09:00 AM" title="Opening Ceremony" description="Inauguration of DYNAMECHS 2026 by distinguished guests." side="left" />
              <TimelineItem time="10:30 AM" title="Technical Events" description="TechSpark, TECWIZ, and TECRITY preliminary rounds begin." side="right" />
              <TimelineItem time="01:30 PM" title="Project Expo" description="Showcasing working models and innovative student projects." side="left" />
              <TimelineItem time="02:30 PM" title="EV Workshop" description="Special session on Electric Vehicle Technology trends." side="right" />
              <TimelineItem time="04:30 PM" title="Prize Distribution" description="Celebrating the winners and concluding the symposium." side="left" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-orange-600 font-black tracking-[0.3em] text-xs uppercase">Visuals</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 mt-4 uppercase">Symposium Gallery</h2>
          </div>

          <GalleryCarousel />

          <div className="mt-12 flex justify-center">
            <Link 
              to="/gallery" 
              className="group flex items-center gap-3 bg-white text-orange-600 border-2 border-orange-500 px-8 py-4 rounded-full font-black text-lg hover:bg-orange-50 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/10"
            >
              <ImageIcon size={24} />
              VIEW FULL GALLERY 
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-orange-600 font-black tracking-[0.3em] text-xs uppercase">Get in Touch</span>
              <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 mt-4 mb-8">CONTACT US</h2>
              <p className="text-slate-600 mb-12">Have questions about the events or registration? Reach out to our team.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email</h4>
                    <p className="text-slate-500">dynamechs2k26.jntua@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Location</h4>
                    <p className="text-slate-500">JNTUA College of Engineering, Anantapur, AP.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-6 rounded-3xl">
                  <h4 className="font-black text-orange-600 text-xs uppercase tracking-widest mb-4">Chairperson</h4>
                  <p className="font-bold text-slate-900">Dr. K. Kalyani Radha</p>
                  <p className="text-slate-500 text-sm">9440517729</p>
                </div>
                <div className="glass-card p-6 rounded-3xl">
                  <h4 className="font-black text-orange-600 text-xs uppercase tracking-widest mb-4">Coordinator</h4>
                  <p className="font-bold text-slate-900">Dr. B. Chandra Mohana Reddy</p>
                  <p className="text-slate-500 text-sm">9908139544</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-10 rounded-[2.5rem]">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Student Coordinators</h3>
              <div className="space-y-6">
                {[
                  { name: 'K. Praveen', phone: '9035454159' },
                  { name: 'G. Rohith Kumar', phone: '9392409591' },
                  { name: 'A. Alekhya', phone: '9866691400' },
                ].map((student, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl">
                    <span className="font-bold text-slate-800">{student.name}</span>
                    <div className="flex items-center gap-2 text-orange-600 font-bold">
                      <Phone size={16} />
                      <span>{student.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 bg-slate-900 rounded-3xl text-white">
                <p className="text-sm opacity-60 mb-2 uppercase tracking-widest font-bold">Event Resources</p>
                <p className="text-lg font-bold mb-4">Symposium Brochure</p>
                <a href="/public/assets/brochure.pdf" download="DynaMechs2k26_Brochure.pdf" className="block w-full text-center bg-orange-500 py-3 rounded-xl font-black hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                  <ExternalLink size={18} /> DOWNLOAD PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-orange-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
              <Settings size={18} />
            </div>
            <span className="font-display font-black text-xl tracking-tighter">DYNAMECHS 2026</span>
          </div>
          <p className="text-slate-400 text-sm font-bold">
            © 2026 Department of Mechanical Engineering, JNTUA CEA
          </p>
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 hover:bg-orange-500 hover:text-white transition-all">
              <Mail size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 hover:bg-orange-500 hover:text-white transition-all">
              <Phone size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Event Not Found</h1>
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-orange-600 font-bold"
        >
          <ArrowLeft size={20} /> BACK TO HOME
        </button>
      </div>
    );
  }

  const Icon = event.icon;

  return (
    <div className="min-h-screen bg-white font-sans relative overflow-hidden">
      <MinimalMechanicalBackground />
      {/* Detail Nav */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto glass-card rounded-full px-6 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-600 hover:text-orange-600 font-bold text-sm transition-colors"
          >
            <ArrowLeft size={18} /> BACK
          </button>
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
              <Settings size={18} className="animate-spin-slow" />
            </div>
            <span className="font-display font-black text-xl tracking-tighter">DYNAMECHS</span>
          </Link>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image Column */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50" />
              <div className="relative glass-card p-4 rounded-[3rem]">
                <img 
                  src={event.image} 
                  alt={event.name} 
                  className="rounded-[2.5rem] w-full aspect-[3/4] object-cover shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-8 rounded-3xl shadow-xl">
                  <Icon size={48} />
                </div>
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-black tracking-[0.3em] rounded-full uppercase">
                  {event.category} Event
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 mb-8 leading-tight uppercase">
                {event.name}
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed mb-12">
                {event.fullDescription}
              </p>

              <div className="space-y-12">
                {/* Event Details Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {event.venue && (
                    <div className="glass-card p-6 rounded-3xl border-l-4 border-orange-500">
                      <div className="flex items-center gap-3 text-orange-600 font-black text-xs uppercase tracking-widest mb-2">
                        <MapPin size={16} /> VENUE
                      </div>
                      <p className="text-slate-900 font-bold">{event.venue}</p>
                    </div>
                  )}
                  {event.timeline && (
                    <div className="glass-card p-6 rounded-3xl border-l-4 border-orange-500">
                      <div className="flex items-center gap-3 text-orange-600 font-black text-xs uppercase tracking-widest mb-2">
                        <Clock size={16} /> TIMELINE
                      </div>
                      <p className="text-slate-900 font-bold">{event.timeline}</p>
                    </div>
                  )}
                  {event.prizes && (
                    <div className="glass-card p-6 rounded-3xl border-l-4 border-orange-500">
                      <div className="flex items-center gap-3 text-orange-600 font-black text-xs uppercase tracking-widest mb-2">
                        <Trophy size={16} /> PRIZES
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-900 font-bold"><span className="text-orange-600">Winner:</span> {event.prizes.winner}</p>
                        <p className="text-slate-900 font-bold"><span className="text-orange-600">Runner:</span> {event.prizes.runner}</p>
                      </div>
                    </div>
                  )}
                  {event.fees && (
                    <div className="glass-card p-6 rounded-3xl border-l-4 border-orange-500">
                      <div className="flex items-center gap-3 text-orange-600 font-black text-xs uppercase tracking-widest mb-2">
                        <Zap size={16} /> REGISTRATION FEE
                      </div>
                      <div className="space-y-1">
                        {event.fees.map((fee, i) => (
                          <p key={i} className="text-slate-900 font-bold text-sm">
                            {fee.label}: <span className="text-orange-600">{fee.amount}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Rules */}
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-1 bg-orange-500 rounded-full" />
                    RULES & GUIDELINES
                  </h3>
                  <ul className="space-y-4">
                    {event.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-600">
                        <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 shrink-0 mt-1">
                          <span className="text-xs font-bold">{i + 1}</span>
                        </div>
                        <span className="text-lg">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coordinators */}
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-1 bg-orange-500 rounded-full" />
                    EVENT COORDINATORS
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {event.coordinators.map((coord, i) => (
                      <div key={i} className="glass-card p-6 rounded-3xl flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
                          <User size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{coord.name}</p>
                          <div className="flex items-center gap-2 text-orange-600 text-sm font-bold">
                            <Phone size={14} />
                            <span>{coord.phone}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="pt-8">
                  <a 
                    href={event.registrationLink || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-orange-500 text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl shadow-orange-500/40 hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                  >
                    REGISTER FOR {event.name} <ChevronRight size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-orange-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
              <Settings size={18} />
            </div>
            <span className="font-display font-black text-xl tracking-tighter">DYNAMECHS 2026</span>
          </Link>
          <p className="text-slate-400 text-sm font-bold">
            © 2026 Department of Mechanical Engineering, JNTUA CEA
          </p>
        </div>
      </footer>
    </div>
  );
};

const GalleryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans relative overflow-hidden">
      <MinimalMechanicalBackground />
      {/* Detail Nav */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto glass-card rounded-full px-6 py-3 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-600 hover:text-orange-600 font-bold text-sm transition-colors"
          >
            <ArrowLeft size={18} /> BACK TO HOME
          </button>
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
              <Settings size={18} className="animate-spin-slow" />
            </div>
            <span className="font-display font-black text-xl tracking-tighter">DYNAMECHS</span>
          </Link>
          <div className="hidden sm:block w-32" /> {/* Spacer */}
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-black tracking-[0.3em] text-xs uppercase">Visual Archive</span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 mt-4 uppercase">Symposium Gallery</h1>
            <p className="text-slate-500 mt-4 font-serif italic text-lg">Capturing the moments of innovation and excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] shadow-xl aspect-video"
              >
                <img 
                  src={img.src} 
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <p className="text-white font-bold text-xl">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-orange-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white">
              <Settings size={18} />
            </div>
            <span className="font-display font-black text-xl tracking-tighter">DYNAMECHS 2026</span>
          </Link>
          <p className="text-slate-400 text-sm font-bold">
            © 2026 Department of Mechanical Engineering, JNTUA CEA
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter basename="/r">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
