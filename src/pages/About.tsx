import { motion } from 'motion/react';
import { 
  Heart, Sparkles, ShieldCheck, ArrowRight, 
  MapPin, Instagram, Coffee, Utensils, Star 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BriskiesLogo } from '../components/Logo';
import { useAppStore } from '../store';

export default function About() {
  const { setQuickViewItem } = useAppStore();

  const milestones = [
    {
      year: '2026',
      title: 'The Dream Takes Shape',
      desc: 'Founded by Divyansh Joseph with a single mission: bring elevated, pure vegetarian comfort food to Siddharth Vihar.',
    },
    {
      year: 'Day 1',
      title: 'The Pure Veg Vow',
      desc: 'A dedicated 100% vegetarian kitchen with zero animal products, strictly pure dairy, and real artisan ingredients.',
    },
    {
      year: 'Today',
      title: 'Your Neighborhood Sanctuary',
      desc: 'Over 2,500+ locals visit for our signature Spicy Burgers, Nutella Waffles, and cold-brewed coffees.',
    },
  ];

  const galleryItems = [
    {
      title: 'Crafted Veg Burgers',
      tagline: 'Handmade patties, house sauces & buttered buns',
      image: '/veg_burger.jpg',
      category: 'Burgers',
      price: 80,
    },
    {
      title: 'Golden Belgian Waffles',
      tagline: 'Pressed crisp, drenched in warm Nutella & Biscoff',
      image: '/waffle_stack.jpg',
      category: 'Waffles & Pancakes',
      price: 130,
    },
    {
      title: 'Artisanal Mocktails',
      tagline: 'Muddled fresh mint, citrus & sparkling fizz',
      image: '/colorful_mocktails.jpg',
      category: 'Mocktails & Coffee',
      price: 60,
    },
    {
      title: 'Velvety Thick Shakes',
      tagline: 'Real ice cream, crunchy Oreos & roasted nuts',
      image: '/vibrant_shake.jpg',
      category: 'Shakes',
      price: 80,
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* 1. Hero Story Section */}
      <section className="relative px-6 md:px-12 max-w-[1400px] mx-auto mb-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            The Briskies Story • Est. 2026
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-zinc-900 tracking-tight leading-[1.08] mb-6">
            Good food is the foundation of a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-600">
              good mood.
            </span>
          </h1>

          <p className="text-zinc-600 text-base sm:text-lg md:text-xl font-medium leading-relaxed">
            Briskies was born out of a simple observation: why should vegetarians ever have to settle for dry, afterthought burger patties or boring menus? We set out to create a vibrant café where vegetarian comfort food takes center stage.
          </p>
        </div>
      </section>

      {/* 2. Meet the Founder Section */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-28">
        <div className="bg-[#FAF8F2] rounded-[40px] p-8 sm:p-12 lg:p-16 border border-zinc-200/80 shadow-soft-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Founder Story & Quote */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 bg-white px-3 py-1 rounded-full border border-amber-200 inline-block">
                The Visionary Behind Briskies
              </span>

              <h2 className="text-3xl sm:text-5xl font-display font-black text-zinc-900 tracking-tight">
                Meet Divyansh Joseph
              </h2>

              <blockquote className="text-lg sm:text-xl md:text-2xl font-serif italic text-zinc-700 border-l-4 border-amber-500 pl-6 py-2 leading-relaxed">
                “We didn’t just want to build another café; we wanted to create a neighborhood living room where every flavor tells a story, every patty is sizzling fresh, and every visit feels like coming home.”
              </blockquote>

              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                As a passionate food enthusiast, Divyansh noticed that finding genuinely memorable, pure vegetarian comfort food in Ghaziabad was harder than it should be. Briskies was created to bridge that gap—combining bold flavors, cozy aesthetics, and warm hospitality at honest prices.
              </p>

              <div className="pt-4 flex items-center gap-4">
                <div>
                  <h4 className="font-display font-black text-xl text-zinc-900">
                    Divyansh Joseph
                  </h4>
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                    Founder & Culinary Lead
                  </p>
                </div>
                <div className="h-8 w-[1px] bg-zinc-300" />
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <span className="veg-indicator" style={{ width: 12, height: 12 }} />
                  <span>100% Pure Veg Commitment</span>
                </div>
              </div>
            </div>

            {/* Right: Founder Photo Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-zinc-200 group">
                <img
                  src="/founder.jpg"
                  alt="Divyansh Joseph - Founder of Briskies Cafe"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-hand text-2xl text-amber-300">"Welcome to our table."</p>
                  <p className="text-xs font-bold text-white/80 mt-1">Divyansh Joseph • Ghaziabad, UP</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. The 4 Culinary Commandments */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-28">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-900 tracking-tight">
            Our 4 Culinary Vows
          </h2>
          <p className="text-zinc-500 font-medium text-sm sm:text-base mt-2">
            The guiding rules behind every item that leaves our kitchen griddle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Pure Veg Sanctuary',
              desc: 'Dedicated vegetarian equipment, zero animal products, pure dairy, and complete peace of mind for every vegetarian foodie.',
            },
            {
              num: '02',
              title: 'Fresh Daily Griddles',
              desc: 'We never serve pre-fried or stale frozen patties. Vegetables are chopped fresh every morning, and buns are griddled with pure butter.',
            },
            {
              num: '03',
              title: 'Generous Indulgence',
              desc: 'From real Nutella on our waffles to double patties on our Jumbo Burgers, we never skimp on the good stuff.',
            },
            {
              num: '04',
              title: 'Genuine Hospitality',
              desc: 'A cozy third space where friends gather, laughter echoes, and anyone can grab a quick pick-me-up coffee or celebratory feast.',
            },
          ].map((vow) => (
            <div
              key={vow.num}
              className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200/80 shadow-soft-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-display font-black text-3xl text-amber-500 block mb-4">
                  {vow.num}
                </span>
                <h3 className="font-display font-extrabold text-xl text-zinc-900 mb-2">
                  {vow.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                  {vow.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center gap-1 text-[11px] font-bold text-amber-700">
                <span>The Briskies Way</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Signature Creation Showcase */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full inline-block mb-3">
              Crafted in Our Kitchen
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-900 tracking-tight">
              A Taste of Our Specialties
            </h2>
          </div>
          <Link
            to="/#discover-menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.title}
              className="group bg-white rounded-3xl p-4 border border-zinc-200 shadow-soft-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md p-1 rounded-full">
                  <span className="veg-indicator" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                  {item.category}
                </span>
                <h4 className="font-display font-black text-lg text-zinc-900 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-500 font-medium line-clamp-2">
                  {item.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-lg font-display font-black text-zinc-900">
                  From ₹{item.price}
                </span>
                <Link
                  to="/#discover-menu"
                  className="text-xs font-bold text-zinc-700 hover:text-amber-600 flex items-center gap-1"
                >
                  <span>Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Visit Us Call to Action */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="bg-zinc-900 text-white rounded-[36px] p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="font-hand text-3xl text-amber-400 block -rotate-2">
              Good Food • Good Mood
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight">
              Ready to taste pure vegetarian comfort?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-medium leading-relaxed">
              We’re open every day from 12:00 PM to 10:00 PM at Shop No - 11, SG Shikhar Heights, Siddharth Vihar, Ghaziabad.
            </p>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/#discover-menu"
                className="px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all"
              >
                Order Online
              </Link>
              <a
                href="https://maps.app.goo.gl/XA3xJ7gCNNGG6Dkg9"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
