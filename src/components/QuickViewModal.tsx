import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Star, Flame, Clock, Zap, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import { useAppStore } from '../store';
import { categories } from '../data';

export default function QuickViewModal() {
  const { quickViewItem, setQuickViewItem, addToCart, cartItems, favorites, toggleFavorite } = useAppStore();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [quickViewItem]);

  if (!quickViewItem) return null;

  const isFav = favorites.includes(quickViewItem.name);
  const cartItem = cartItems.find((i) => i.name === quickViewItem.name);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  // Find image for item if category image or custom image exists
  const parentCategory = categories.find((c) =>
    c.items.some((it) => it.name === quickViewItem.name)
  );
  const displayImage = parentCategory?.image || '/veg_burger.jpg';

  // Find actual items for pairings if any
  const pairedItems = quickViewItem.pairings
    ? categories
        .flatMap((c) => c.items)
        .filter((it) => quickViewItem.pairings?.includes(it.name))
    : [];

  const handleAdd = () => {
    addToCart(
      {
        name: quickViewItem.name,
        price: quickViewItem.price,
        category: parentCategory?.title || 'Specials',
        image: displayImage,
      },
      qty
    );
    setQuickViewItem(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewItem(null)}
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-zinc-100"
        >
          {/* Close & Favorite Floating Action Bar */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(quickViewItem.name)}
              className="p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-zinc-700 hover:text-rose-500 transition-colors"
              aria-label="Toggle favorite"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => setQuickViewItem(null)}
              className="p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-zinc-700 hover:text-zinc-950 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Left: Dish Visual */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[280px] bg-zinc-100 overflow-hidden">
              <img
                src={displayImage}
                alt={quickViewItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />

              {/* Pure Veg Badge Pill */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                <span className="veg-indicator" />
                <span className="text-xs font-bold tracking-wide text-emerald-800 uppercase">
                  100% Pure Veg
                </span>
              </div>
            </div>

            {/* Right: Info & Ordering */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                {/* Category & Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                    {parentCategory?.title || 'Featured'}
                  </span>
                  {quickViewItem.badge && (
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
                      {quickViewItem.badge}
                    </span>
                  )}
                  {quickViewItem.isSpicy && (
                    <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md">
                      <Flame className="w-3.5 h-3.5" /> Spicy
                    </span>
                  )}
                </div>

                {/* Dish Name */}
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-zinc-900 tracking-tight leading-tight">
                  {quickViewItem.name}
                </h3>

                {/* Rating & Metas */}
                <div className="flex items-center gap-4 mt-2.5 text-xs text-zinc-500 font-medium">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{quickViewItem.rating || 4.9}</span>
                    <span className="text-zinc-400">({quickViewItem.reviewsCount || 80}+ reviews)</span>
                  </div>
                  {quickViewItem.prepTime && (
                    <div className="flex items-center gap-1 text-zinc-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{quickViewItem.prepTime}</span>
                    </div>
                  )}
                  {quickViewItem.calories && (
                    <div className="flex items-center gap-1 text-zinc-600">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{quickViewItem.calories}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="mt-4 text-zinc-600 text-sm leading-relaxed">
                  {quickViewItem.description}
                </p>

                {/* Recommended Pairings */}
                {pairedItems.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-zinc-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                      Frequently Paired With
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pairedItems.map((p) => (
                        <button
                          key={p.name}
                          onClick={() => {
                            addToCart({
                              name: p.name,
                              price: p.price,
                              category: parentCategory?.title || 'Side',
                            });
                          }}
                          className="group inline-flex items-center gap-1.5 text-xs font-semibold bg-zinc-50 hover:bg-amber-50 hover:text-amber-800 text-zinc-700 px-3 py-1.5 rounded-full border border-zinc-200 transition-all"
                        >
                          <span>{p.name}</span>
                          <span className="font-bold text-zinc-900 group-hover:text-amber-800">
                            +₹{p.price}
                          </span>
                          <Plus className="w-3 h-3 text-zinc-400 group-hover:text-amber-600" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Price & Add Stepper */}
              <div className="mt-8 pt-5 border-t border-zinc-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                    Total Price
                  </span>
                  <span className="text-2xl font-display font-black text-zinc-900">
                    ₹{quickViewItem.price * qty}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-zinc-100 rounded-full p-1 border border-zinc-200">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-zinc-700 shadow-sm hover:bg-zinc-50 active:scale-95 transition-transform"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-zinc-800">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-zinc-700 shadow-sm hover:bg-zinc-50 active:scale-95 transition-transform"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Tray CTA */}
                  <button
                    disabled={quickViewItem.unavailable}
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-200 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-amber-500/25 active:scale-95 transition-all text-sm"
                  >
                    <span>{quickViewItem.unavailable ? 'Sold Out' : 'Add to Tray'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
