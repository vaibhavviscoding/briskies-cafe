import { motion } from 'motion/react';
import { ShieldCheck, Timer, Leaf, HeartHandshake, Sparkles } from 'lucide-react';

export default function Features() {
  const pillars = [
    {
      icon: Leaf,
      title: '100% Pure Vegetarian',
      desc: 'Dedicated vegetarian kitchen with zero cross-contamination. Sourcing fresh paneer, crisp farm veggies, and authentic dairy daily.',
      badge: 'Uncompromised',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      icon: Sparkles,
      title: 'Handcrafted With Love',
      desc: 'No artificial powders or frozen shortcuts. Every sauce, burger patty, and waffle batter is prepared from proprietary house recipes.',
      badge: 'Artisanal',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      icon: Timer,
      title: 'Speedy Counter Service',
      desc: 'Piping hot burgers and thick creamy shakes served fresh without painful waiting times. Track your order live on screen.',
      badge: 'Fast & Fresh',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      icon: HeartHandshake,
      title: 'Honest Community Hangout',
      desc: 'Designed as a vibrant third space in Siddharth Vihar. Unapologetic comfort food, genuine smiles, and cozy vibes for friends and families.',
      badge: 'Local Spirit',
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-zinc-50/50 to-white border-t border-zinc-100 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full inline-block mb-3">
            Our Food Philosophy
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-900 tracking-tight leading-tight">
            Why Briskies Hits Different
          </h2>
          <p className="text-sm md:text-base text-zinc-500 font-medium mt-3 leading-relaxed">
            We didn’t just open another fast-food joint. We set out to prove that vegetarian comfort food can be bold, indulgent, and undeniably craveable.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white p-7 rounded-3xl border border-zinc-200/80 shadow-soft-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 bg-zinc-100 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl text-zinc-900 mb-2.5 group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-1.5 text-xs font-bold text-amber-700">
                  <span className="veg-indicator" style={{ width: 12, height: 12 }} />
                  <span>The Briskies Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
