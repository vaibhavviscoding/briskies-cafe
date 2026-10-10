import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Flame, Plus, Sparkles, ArrowRight } from 'lucide-react';
import { useAppStore } from '../store';
import { categories, MenuItem } from '../data';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart, setQuickViewItem } = useAppStore();
  const [query, setQuery] = useState('');
  const [activeChip, setActiveChip] = useState<'all' | 'under100' | 'bestsellers' | 'shakes' | 'spicy'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setActiveChip('all');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Flatten all items with parent category info
  const allItems = categories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      categoryTitle: cat.title,
      categoryImage: cat.image,
      isUnavailable: cat.unavailable || item.unavailable,
    }))
  );

  // Filter items based on query & activeChip
  const filtered = allItems.filter((item) => {
    // Chip filter
    if (activeChip === 'under100' && item.price >= 100) return false;
    if (activeChip === 'bestsellers' && item.badge !== 'Bestseller') return false;
    if (activeChip === 'shakes' && !item.categoryTitle.toLowerCase().includes('shake')) return false;
    if (activeChip === 'spicy' && !item.isSpicy) return false;

    // Query filter
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const matchName = item.name.toLowerCase().includes(q);
    const matchDesc = item.description.toLowerCase().includes(q);
    const matchCat = item.categoryTitle.toLowerCase().includes(q);
    const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));

    return matchName || matchDesc || matchCat || matchTags;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 z-10"
        >
          {/* Search Header */}
          <div className="p-4 sm:p-6 border-b border-zinc-100 flex items-center gap-3">
            <Search className="w-5 h-5 text-amber-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search burgers, thick shakes, waffles, iced teas..."
              className="w-full text-base sm:text-lg font-medium text-zinc-900 placeholder:text-zinc-400 bg-transparent focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-zinc-400 bg-zinc-100 px-2 py-1 rounded-md">
              <span>ESC to exit</span>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="px-4 sm:px-6 py-3 bg-zinc-50/80 border-b border-zinc-100 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
            <span className="text-zinc-400 font-semibold shrink-0">Quick Filter:</span>
            {[
              { id: 'all', label: 'All Items' },
              { id: 'bestsellers', label: '🔥 Bestsellers' },
              { id: 'under100', label: '💰 Under ₹100' },
              { id: 'spicy', label: '🌶️ Spicy Hits' },
              { id: 'shakes', label: '🥤 Shakes' },
            ].map((chip) => (
              <button
                key={chip.id}
                onClick={() => setActiveChip(chip.id as any)}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 ${
                  activeChip === chip.id
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-lg text-zinc-800">No matching dishes found</h4>
                <p className="text-sm text-zinc-500 mt-1 max-w-sm mx-auto">
                  Try searching for "burger", "shake", "fries", or browse our under ₹100 recommendations.
                </p>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    setQuickViewItem(item as MenuItem);
                    setIsSearchOpen(false);
                  }}
                  className="group flex items-center justify-between p-3.5 rounded-2xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all cursor-pointer gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.categoryImage}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 bg-zinc-100 border border-zinc-100"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="veg-indicator shrink-0" />
                        <h4 className="font-bold text-zinc-900 group-hover:text-amber-600 transition-colors text-sm sm:text-base truncate">
                          {item.name}
                        </h4>
                        {item.badge && (
                          <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">{item.description}</p>
                      <div className="flex items-center gap-3 mt-1 text-[11px] font-semibold text-zinc-400">
                        <span>{item.categoryTitle}</span>
                        {item.prepTime && <span>• {item.prepTime}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-display font-black text-zinc-900 text-base sm:text-lg">
                      ₹{item.price}
                    </span>
                    <button
                      disabled={item.isUnavailable}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          name: item.name,
                          price: item.price,
                          category: item.categoryTitle,
                          image: item.categoryImage,
                        });
                      }}
                      className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white font-bold text-xs flex items-center gap-1 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">Add</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer stats */}
          <div className="p-3 px-6 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400 font-medium">
            <span>Showing {filtered.length} vegetarian items</span>
            <span>100% Pure Vegetarian Kitchen</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
