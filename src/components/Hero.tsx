import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Sparkles, Star, Flame, Clock, 
  Plus, Check, ChevronLeft, ChevronRight, MapPin 
} from 'lucide-react';
import { useAppStore } from '../store';
import { BriskiesLogo } from './Logo';

export default function Hero() {
  const { addToCart, setQuickViewItem } = useAppStore();

  const heroShowcase = [
    {
      name: 'Spicy Burger',
      tagline: 'Crispy seasoned patty with a fiery tangy kick',
      price: 80,
      calories: '380 kcal',
      prepTime: '8 mins',
      rating: 4.9,
      badge: 'Bestseller',
      image: '/veg_burger.jpg',
      category: 'Burgers',
      isSpicy: true,
      description: 'Crispy spiced veg patty layered with fresh lettuce, onions, and our signature fiery house sauce.'
    },
    {
      name: 'Nutella Waffle',
      tagline: 'Belgian waffle slathered with pure hazelnut spread',
      price: 130,
      calories: '460 kcal',
      prepTime: '8 mins',
      rating: 5.0,
      badge: "Chef's Special",
      image: '/waffle_stack.jpg',
      category: 'Waffles & Pancakes',
      isSpicy: false,
      description: 'Fresh Belgian waffle slathered generously with warm authentic Nutella hazelnut spread.'
    },
    {
      name: 'Virgin Mojito',
      tagline: 'Sparkling muddled garden mint and fresh lime',
      price: 60,
      calories: '90 kcal',
      prepTime: '4 mins',
      rating: 4.9,
      badge: 'Popular',
      image: '/colorful_mocktails.jpg',
      category: 'Mocktails & Coffee',
      isSpicy: false,
      description: 'Ultra-crisp muddled fresh garden mint, tangy Persian limes, crushed ice, and effervescent sparkling soda.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = heroShowcase[activeIndex];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % heroShowcase.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + heroShowcase.length) % heroShowcase.length);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 md:py-32 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF8F2] to-white">
      {/* Decorative ambient background accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Live Cafe Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-zinc-200/80 shadow-soft-sm text-xs font-bold text-zinc-700 mb-6"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Open Now • 12:00 PM – 10:00 PM</span>
              <span className="text-zinc-300">•</span>
              <span className="text-amber-700 flex items-center gap-1">
                <span className="veg-indicator" style={{ width: 12, height: 12 }} /> 100% Pure Veg
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-zinc-900 tracking-tight leading-[1.08] mb-6"
            >
              Pure comfort food, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600">
                unfiltered joy.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-600 text-base sm:text-lg md:text-xl font-medium max-w-xl mb-8 leading-relaxed"
            >
              Freshly grilled burgers, rich thick shakes, crispy Belgian waffles, and artisanal coolers. Handcrafted with love in Siddharth Vihar, Ghaziabad.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => {
                  const el = document.getElementById('discover-menu');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('curated-combos');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-zinc-50 border border-zinc-200/90 text-zinc-800 font-bold text-sm shadow-soft-sm active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Today’s Combos</span>
              </button>
            </motion.div>

            {/* Social Proof & Location quick hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 pt-6 border-t border-zinc-200/70 flex flex-wrap items-center gap-6 text-xs text-zinc-500 font-semibold"
            >
              <div className="flex items-center gap-1.5 text-zinc-900">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-extrabold text-sm ml-1">4.9 / 5.0</span>
                <span className="text-zinc-400 font-medium">(2,500+ Local Foodies)</span>
              </div>

              <div className="flex items-center gap-1.5 text-zinc-600">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Shop 11, SG Shikhar Heights, Siddharth Vihar</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Dish Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[420px]"
            >
              {/* Card Container */}
              <div className="bg-white rounded-[32px] p-6 shadow-2xl border border-zinc-100 relative z-10 overflow-hidden">
                {/* Image & Badges */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 mb-5">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeItem.name}
                      src={activeItem.image}
                      alt={activeItem.name}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Top floating badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm text-xs font-bold text-amber-800 uppercase tracking-wide">
                      {activeItem.badge}
                    </span>
                    {activeItem.isSpicy && (
                      <span className="px-2.5 py-1 rounded-full bg-red-600 text-white shadow-sm text-xs font-bold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" /> Hot
                      </span>
                    )}
                  </div>

                  {/* 100% Veg Dot */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md p-1.5 rounded-full shadow-sm">
                    <span className="veg-indicator" />
                  </div>
                </div>

                {/* Dish Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                      {activeItem.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-zinc-600">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{activeItem.prepTime}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-black text-zinc-900 leading-tight">
                    {activeItem.name}
                  </h3>

                  <p className="text-xs text-zinc-500 font-medium line-clamp-2">
                    {activeItem.tagline}
                  </p>
                </div>

                {/* Price & Add Action */}
                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                      Price
                    </span>
                    <span className="text-2xl font-display font-black text-zinc-900">
                      ₹{activeItem.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuickViewItem(activeItem as any)}
                      className="px-4 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() =>
                        addToCart({
                          name: activeItem.name,
                          price: activeItem.price,
                          category: activeItem.category,
                          image: activeItem.image,
                        })
                      }
                      className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Tray</span>
                    </button>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-zinc-50 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    {heroShowcase.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          activeIndex === idx ? 'w-5 bg-amber-500' : 'w-1.5 bg-zinc-200'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrev}
                      className="p-1 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors"
                      aria-label="Previous dish"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors"
                      aria-label="Next dish"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative background frame behind card */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-400/20 to-rose-400/20 rounded-[38px] -rotate-2 -z-10" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
