import { motion } from 'motion/react';
import { Sparkles, Plus, Check, Tag } from 'lucide-react';
import { chefCombos } from '../data';
import { useAppStore } from '../store';

export default function ChefCombos() {
  const { addToCart, showToast } = useAppStore();

  const handleAddCombo = (combo: typeof chefCombos[0]) => {
    // Add each item in the combo with its bundled items
    combo.items.forEach((itemName) => {
      // Find item price proportionately or add as combo item
      addToCart({
        name: itemName,
        price: Math.round(combo.price / combo.items.length),
        category: 'Combos & Specials',
        image: combo.image,
      });
    });
    showToast(`Added ${combo.title} bundle to tray!`, 'success');
  };

  return (
    <section id="curated-combos" className="py-20 bg-[#FBF9F4] border-y border-zinc-200/60 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Curated Savings
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-900 tracking-tight">
              Chef’s Signature Combos
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-500 font-medium max-w-md leading-relaxed">
            Perfect pairings curated by our culinary team. Handpicked burgers, fries, and drinks at a celebratory discount.
          </p>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chefCombos.map((combo, index) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-3xl p-6 shadow-soft-sm hover:shadow-xl border border-zinc-200/80 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Banner Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                  {combo.badge}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Save ₹{combo.savings}
                </span>
              </div>

              {/* Combo Image */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-100 mb-5">
                <img
                  src={combo.image}
                  alt={combo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white text-xs font-bold flex items-center gap-1.5">
                  <span className="veg-indicator" />
                  <span>100% Pure Veg</span>
                </div>
              </div>

              {/* Title & Included Items */}
              <div className="space-y-2 flex-1">
                <h3 className="text-2xl font-display font-extrabold text-zinc-900 group-hover:text-amber-600 transition-colors">
                  {combo.title}
                </h3>
                <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
                  {combo.tagline}
                </p>

                <div className="pt-3">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                    What’s Included:
                  </span>
                  <ul className="space-y-1">
                    {combo.items.map((it) => (
                      <li key={it} className="text-xs text-zinc-700 font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 pt-5 border-t border-zinc-100 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-display font-black text-zinc-900">
                      ₹{combo.price}
                    </span>
                    <span className="text-xs text-zinc-400 line-through font-semibold">
                      ₹{combo.originalPrice}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider">
                    Instant Meal Deal
                  </span>
                </div>

                <button
                  onClick={() => handleAddCombo(combo)}
                  className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Combo</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
