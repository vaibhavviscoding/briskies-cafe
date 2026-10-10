import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, ShoppingBag, Menu, X, Heart, Sparkles, ChefHat, 
  MapPin, BookOpen, Clock, Utensils, ShieldCheck 
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BriskiesLogo } from './Logo';
import { useAppStore } from '../store';
import SearchModal from './SearchModal';
import CartDrawer from './CartDrawer';
import QuickViewModal from './QuickViewModal';
import Toast from './Toast';

export default function NewNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { 
    cartItems, setIsCartOpen, setIsSearchOpen, favorites,
    activeMood, setActiveMood, setActiveCategory
  } = useAppStore();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleNavClick = (anchorId?: string, routePath?: string) => {
    setIsMobileMenuOpen(false);
    if (routePath) {
      navigate(routePath);
      return;
    }
    if (anchorId) {
      if (location.pathname !== '/') {
        navigate('/#' + anchorId);
      } else {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Menu', action: () => handleNavClick('discover-menu') },
    { label: 'Curated Combos', action: () => handleNavClick('curated-combos') },
    { label: 'Our Story', action: () => handleNavClick(undefined, '/about') },
    { label: 'Location & Hours', action: () => handleNavClick('location-section') },
    { label: 'Kitchen Screen', action: () => handleNavClick(undefined, '/admin'), badge: 'Live' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 md:px-8 py-3 md:py-4 ${
          isScrolled
            ? 'backdrop-blur-xl bg-white/85 shadow-sm border-b border-zinc-200/60'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand Identity */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Briskies Cafe Homepage"
          >
            <div className="w-[105px] h-[48px] sm:w-[125px] sm:h-[54px] flex items-center transform transition-transform group-hover:scale-105">
              <BriskiesLogo />
            </div>
            <div className="hidden xl:flex flex-col border-l border-zinc-200 pl-3">
              <span className="font-hand text-amber-600 text-lg leading-none -rotate-1">
                Good Food • Good Mood
              </span>
              <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase mt-0.5 flex items-center gap-1">
                <span className="veg-indicator" style={{ width: 12, height: 12 }} />
                Pure Veg Sanctuary
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200/80 shadow-soft-sm">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="relative px-4 py-2 rounded-full text-xs xl:text-sm font-bold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/80 transition-all flex items-center gap-1.5"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 rounded-full animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right: Interactive Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-600 bg-white/80 hover:bg-white hover:text-zinc-900 border border-zinc-200/80 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-soft-sm hover:shadow transition-all group"
              aria-label="Search dishes"
            >
              <Search className="w-4 h-4 text-amber-600 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Search menu</span>
              <kbd className="hidden md:inline-block text-[10px] font-mono text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                ⌘K
              </kbd>
            </button>

            {/* Favorites indicator */}
            {favorites.length > 0 && (
              <button
                onClick={() => {
                  setActiveMood('favorites');
                  handleNavClick('discover-menu');
                }}
                className="relative p-2 sm:p-2.5 rounded-full bg-white/80 hover:bg-white border border-zinc-200/80 text-rose-500 shadow-soft-sm transition-all hover:scale-105"
                title={`${favorites.length} saved favorites`}
              >
                <Heart className="w-4 h-4 fill-rose-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
                  {favorites.length}
                </span>
              </button>
            )}

            {/* Cart Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
              aria-label="Open tray"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                {totalItemCount > 0 && (
                  <motion.span
                    key={totalItemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-zinc-900"
                  >
                    {totalItemCount}
                  </motion.span>
                )}
              </div>
              <span className="hidden sm:inline">Tray</span>
              {totalItemCount > 0 && (
                <span className="text-amber-400 font-extrabold border-l border-zinc-700 pl-2">
                  ₹{cartTotal}
                </span>
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full lg:hidden bg-white/80 border border-zinc-200 text-zinc-700 hover:bg-white"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-3 bg-white/95 backdrop-blur-xl rounded-3xl p-5 border border-zinc-200 shadow-xl overflow-hidden"
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="w-full flex items-center justify-between p-3 rounded-2xl text-left font-bold text-zinc-800 hover:bg-zinc-50 active:bg-amber-50"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1 font-bold text-emerald-700">
                  <span className="veg-indicator" style={{ width: 12, height: 12 }} /> 100% Pure Veg
                </span>
                <span>Open: 12 PM – 10 PM</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Modals rendered on all pages */}
      <SearchModal />
      <CartDrawer />
      <QuickViewModal />
      <Toast />
    </>
  );
}
