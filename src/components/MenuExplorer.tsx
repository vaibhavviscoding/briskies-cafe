import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, Flame, Clock, Zap, Plus, Minus, Heart, 
  Sparkles, AlertCircle, Eye, Check 
} from 'lucide-react';
import { categories, MenuItem, Category } from '../data';
import { useAppStore } from '../store';

const categoryIcons: Record<string, string> = {
  burgers: '🍔',
  momos: '🥟',
  shakes: '🥤',
  sandwiches: '🥪',
  beverages: '🍹',
  fries: '🍟',
  waffles: '🧇',
};

export default function MenuExplorer() {
  const { 
    cartItems, addToCart, updateQuantity, setQuickViewItem,
    favorites, toggleFavorite, activeCategory, setActiveCategory,
    activeMood, setActiveMood
  } = useAppStore();

  const [searchFilter, setSearchFilter] = useState('');

  // Flattened item list with category mapping
  const allCategorizedItems = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      items: cat.items.map((it) => ({
        ...it,
        categoryTitle: cat.title,
        categoryImage: cat.image,
        categoryUnavailable: cat.unavailable,
      })),
    }));
  }, []);

  // Filtered categories and items
  const displayedCategories = useMemo(() => {
    return allCategorizedItems
      .map((cat) => {
        // If a specific category tab is selected
        if (activeCategory !== 'all' && cat.id !== activeCategory) {
          return null;
        }

        const filteredItems = cat.items.filter((item) => {
          // Mood filter
          if (activeMood === 'bestsellers' && item.badge !== 'Bestseller') return false;
          if (activeMood === 'under100' && item.price >= 100) return false;
          if (activeMood === 'spicy' && !item.isSpicy) return false;
          if (activeMood === 'sweet' && !['shakes', 'waffles'].includes(cat.id)) return false;
          if (activeMood === 'protein' && !item.tags?.includes('protein')) return false;
          if (activeMood === 'favorites' && !favorites.includes(item.name)) return false;

          // Inline search if typed
          if (searchFilter.trim()) {
            const q = searchFilter.toLowerCase();
            return (
              item.name.toLowerCase().includes(q) ||
              item.description.toLowerCase().includes(q) ||
              item.tags?.some((t) => t.toLowerCase().includes(q))
            );
          }

          return true;
        });

        if (filteredItems.length === 0) return null;

        return {
          ...cat,
          items: filteredItems,
        };
      })
      .filter(Boolean) as Category[];
  }, [allCategorizedItems, activeCategory, activeMood, favorites, searchFilter]);

  const totalResultsCount = displayedCategories.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );

  return (
    <section id="discover-menu" className="py-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Always Fresh & Pure Veg
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-zinc-900 tracking-tight leading-tight">
            Discover Our Menu
          </h2>
          <p className="text-zinc-500 font-medium text-base md:text-lg mt-3 leading-relaxed">
            Every dish is prepared fresh to order using premium vegetarian ingredients, signature marinades, and genuine butter.
          </p>
        </div>

        {/* Category Pill Navigation */}
        <div className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md py-4 border-b border-zinc-100 -mx-6 px-6 md:-mx-12 md:px-12">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-zinc-900 text-white shadow-md'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
              }`}
            >
              <span>🍽️ All Dishes</span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-zinc-900 text-white shadow-md'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                }`}
              >
                <span>{categoryIcons[cat.id] || '🍴'}</span>
                <span>{cat.title}</span>
                {cat.unavailable && (
                  <span className="text-[10px] text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-full">
                    Sold Out
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mood / Quick Filter Sub-strip */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar pt-1">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider shrink-0 mr-1">
              Filter:
            </span>

            {[
              { id: 'all', label: 'All Items' },
              { id: 'bestsellers', label: '🔥 Bestsellers' },
              { id: 'under100', label: '💰 Under ₹100' },
              { id: 'spicy', label: '🌶️ Spicy' },
              { id: 'sweet', label: '🍫 Sweet Cravings' },
              { id: 'protein', label: '💪 High Protein' },
              ...(favorites.length > 0
                ? [{ id: 'favorites', label: `❤️ Favorites (${favorites.length})` }]
                : []),
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMood(m.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all ${
                  activeMood === m.id
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border border-zinc-200'
                }`}
              >
                {m.label}
              </button>
            ))}

            {activeMood !== 'all' && (
              <button
                onClick={() => setActiveMood('all')}
                className="text-xs text-amber-600 hover:text-amber-800 font-bold underline ml-2 shrink-0"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-12 space-y-16">
          {displayedCategories.length === 0 ? (
            <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-zinc-200/80 p-8">
              <AlertCircle className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
              <h3 className="font-display font-bold text-2xl text-zinc-800">
                No items match this filter
              </h3>
              <p className="text-zinc-500 text-sm mt-1 max-w-sm mx-auto">
                Try switching the category or mood filter to explore our other vegetarian dishes.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setActiveMood('all');
                }}
                className="mt-6 px-6 py-2.5 rounded-full bg-zinc-900 text-white font-bold text-xs"
              >
                Show All Dishes
              </button>
            </div>
          ) : (
            displayedCategories.map((cat) => (
              <div key={cat.id} id={cat.id} className="scroll-mt-40">
                {/* Category Header Bar */}
                <div className="flex items-end justify-between border-b border-zinc-100 pb-4 mb-8">
                  <div>
                    <span className="font-hand text-amber-600 text-xl block -rotate-1">
                      {cat.tagline}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-extrabold text-zinc-900 tracking-tight flex items-center gap-3">
                      <span>{cat.title}</span>
                      {cat.unavailable && (
                        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider border border-rose-200">
                          Currently Unavailable
                        </span>
                      )}
                    </h3>
                  </div>

                  <span className="text-xs font-bold text-zinc-400">
                    {cat.items.length} {cat.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {cat.items.map((item, idx) => {
                    const isUnavailable = cat.unavailable || item.unavailable;
                    const cartItem = cartItems.find((i) => i.name === item.name);
                    const qtyInCart = cartItem ? cartItem.quantity : 0;
                    const isFav = favorites.includes(item.name);

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className={`group bg-white rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between relative shadow-soft-sm hover:shadow-xl ${
                          isUnavailable
                            ? 'opacity-65 border-zinc-200 bg-zinc-50/60'
                            : 'border-zinc-200/90 hover:border-amber-300'
                        }`}
                      >
                        {/* Dish Visual Header */}
                        <div
                          onClick={() => setQuickViewItem(item as MenuItem)}
                          className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-zinc-100 mb-4 cursor-pointer"
                        >
                          <img
                            src={cat.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                          {/* Floating Badges */}
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                            <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-full shadow-sm">
                              <span className="veg-indicator" />
                            </div>

                            {item.badge && (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-extrabold uppercase tracking-wide shadow-sm">
                                {item.badge}
                              </span>
                            )}

                            {item.isSpicy && (
                              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center gap-0.5 shadow-sm">
                                <Flame className="w-3 h-3" /> Spicy
                              </span>
                            )}
                          </div>

                          {/* Top Right Favorite Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(item.name);
                            }}
                            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-zinc-600 hover:text-rose-500 transition-colors shadow-sm"
                            aria-label="Add to favorites"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isFav ? 'fill-rose-500 text-rose-500' : ''
                              }`}
                            />
                          </button>

                          {/* Bottom info on image */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                            {item.prepTime && (
                              <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                <Clock className="w-3 h-3 text-amber-400" />
                                {item.prepTime}
                              </span>
                            )}
                            {item.calories && (
                              <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                <Zap className="w-3 h-3 text-amber-400" />
                                {item.calories}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center justify-between">
                            <h4
                              onClick={() => setQuickViewItem(item as MenuItem)}
                              className="font-display font-extrabold text-xl text-zinc-900 group-hover:text-amber-600 transition-colors cursor-pointer"
                            >
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>{item.rating || 4.8}</span>
                            </div>
                          </div>

                          <p className="text-xs text-zinc-500 font-medium line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Price & Cart Actions */}
                        <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">
                              Price
                            </span>
                            <span className="text-2xl font-display font-black text-zinc-900">
                              ₹{item.price}
                            </span>
                          </div>

                          {isUnavailable ? (
                            <span className="text-xs font-bold text-zinc-400 bg-zinc-100 px-3 py-1.5 rounded-full">
                              Sold Out
                            </span>
                          ) : qtyInCart > 0 ? (
                            /* Already in Cart Stepper */
                            <div className="flex items-center bg-zinc-100 rounded-full p-1 border border-zinc-200 shadow-sm">
                              <button
                                onClick={() => updateQuantity(item.name, -1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center bg-white text-zinc-800 shadow-sm hover:bg-zinc-50 active:scale-95 transition-transform"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-zinc-900">
                                {qtyInCart}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.name, 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center bg-white text-zinc-800 shadow-sm hover:bg-zinc-50 active:scale-95 transition-transform"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            /* Add to Cart Button */
                            <button
                              onClick={() =>
                                addToCart({
                                  name: item.name,
                                  price: item.price,
                                  category: cat.title,
                                  image: cat.image,
                                })
                              }
                              className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add</span>
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
