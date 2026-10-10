import { useEffect } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Instagram, MapPin, Phone, Heart, ShoppingBag, 
  Search, ArrowUp, Sparkles, Utensils 
} from 'lucide-react';
import NewNavbar from './components/NewNavbar';
import { BriskiesLogo } from './components/Logo';
import { useAppStore } from './store';

export default function Layout() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { cartItems, setIsCartOpen, setIsSearchOpen } = useAppStore();

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans antialiased text-zinc-900 bg-white overflow-x-hidden relative flex flex-col min-h-screen selection:bg-amber-100 selection:text-amber-900 pb-20 lg:pb-0">
      <NewNavbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Modern High-Polish Footer */}
      <footer id="contact" className="bg-[#18181B] text-white pt-20 pb-12 px-6 sm:px-12 relative z-20 border-t border-zinc-800">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-800">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="w-[140px] h-[55px] flex items-center brightness-110">
              <BriskiesLogo />
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Siddharth Vihar’s dedicated pure vegetarian café for hot handcrafted burgers, signature thick shakes, grilled sandwiches, and golden Belgian waffles.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="veg-indicator" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                100% Pure Vegetarian Kitchen
              </span>
            </div>

            <div className="pt-3">
              <a
                href="https://www.instagram.com/briskies.s?utm_source=qr&stkn=d2Y4bnowMXpubTl6"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 hover:text-white bg-rose-950/60 hover:bg-rose-900/60 px-4 py-2 rounded-full border border-rose-800/60 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4 text-rose-400" />
                <span>Follow @briskies.s on Instagram</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-zinc-300">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold text-zinc-400">
              <li>
                <button
                  onClick={() => {
                    if (pathname !== '/') navigate('/#discover-menu');
                    else document.getElementById('discover-menu')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (pathname !== '/') navigate('/#curated-combos');
                    else document.getElementById('curated-combos')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Chef’s Combos
                </button>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  Our Story & Founder
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Kitchen Screen</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Timing */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-zinc-300">
              Operating Hours
            </h4>
            <div className="space-y-1.5 text-xs text-zinc-400 font-medium leading-relaxed">
              <p className="text-zinc-200 font-bold">Open Every Day (7 Days)</p>
              <p className="text-amber-400 font-display font-bold text-base">
                12:00 PM – 10:00 PM
              </p>
              <p className="text-[11px] text-zinc-500 pt-1">
                Dine-in table service & fresh takeaway counter orders.
              </p>
            </div>
          </div>

          {/* Col 4: Visit & Address */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-zinc-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              Visit the Café
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              Shop No - 11, SG Shikhar Heights,<br />
              Siddharth Vihar, Indirapuram,<br />
              Ghaziabad, Uttar Pradesh 201009
            </p>
            <a
              href="https://maps.app.goo.gl/XA3xJ7gCNNGG6Dkg9"
              target="_blank"
              rel="noreferrer"
              className="inline-block text-xs font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors"
            >
              Open in Google Maps →
            </a>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="max-w-[1400px] mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 Briskies Café. Handcrafted with passion in Ghaziabad.</p>
          <div className="flex items-center gap-4">
            <span className="font-hand text-amber-500 text-lg">"Good Food • Good Mood"</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Mobile Bottom Action Pill (Optimized for One-Thumb Reach) */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/60 shadow-2xl rounded-2xl p-2 px-3 flex items-center justify-between text-white">
          <button
            onClick={() => {
              if (pathname !== '/') navigate('/#discover-menu');
              else document.getElementById('discover-menu')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-1 p-1 text-zinc-300 hover:text-white"
          >
            <Utensils className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold">Menu</span>
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center gap-1 p-1 text-zinc-300 hover:text-white"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold">Search</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Tray ({totalCount})</span>
            {totalCount > 0 && <span className="text-amber-100 font-black">₹{cartTotal}</span>}
          </button>

          <Link
            to="/about"
            className="flex flex-col items-center gap-1 p-1 text-zinc-300 hover:text-white"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-bold">Story</span>
          </Link>

          <a
            href="https://maps.app.goo.gl/XA3xJ7gCNNGG6Dkg9"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 p-1 text-zinc-300 hover:text-white"
          >
            <MapPin className="w-4 h-4 text-rose-400" />
            <span className="text-[10px] font-bold">Map</span>
          </a>
        </div>
      </div>
    </div>
  );
}
