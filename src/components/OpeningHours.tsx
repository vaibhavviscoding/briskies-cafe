import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, Clock, Copy, Check, ExternalLink, 
  Phone, Instagram, Navigation 
} from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useAppStore } from '../store';

export default function OpeningHours() {
  const { showToast } = useAppStore();
  const [copied, setCopied] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Real location of Briskies Cafe
  const cafeLocation = { lat: 28.6525155, lng: 77.4040816 };
  const fullAddress = 'Shop No - 11, SG Shikhar Heights, Siddharth Vihar, Indirapuram, Ghaziabad, UP 201009';

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDayName = days[new Date().getDay()];

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    showToast('Address copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location-section" className="py-24 bg-[#FAFAF8] border-t border-zinc-200/60 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full inline-block mb-3">
            Come Hang Out
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-zinc-900 tracking-tight">
            Find Us in Siddharth Vihar
          </h2>
          <p className="text-sm md:text-base text-zinc-500 font-medium mt-3 leading-relaxed">
            Cozy seating, chill playlists, and the aroma of sizzling butter. Dine in with us or swing by for quick takeaway.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Hours & Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-soft-sm flex flex-col justify-between"
          >
            <div>
              {/* Card Title */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-2xl text-zinc-900 leading-tight">
                      Operating Hours
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Open 7 Days a Week
                    </span>
                  </div>
                </div>
              </div>

              {/* Hours List */}
              <div className="space-y-2.5 mt-6">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                  const isToday = day === todayDayName;
                  return (
                    <div
                      key={day}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        isToday
                          ? 'bg-amber-50 text-amber-950 font-bold border border-amber-200 shadow-xs'
                          : 'text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{day}</span>
                        {isToday && (
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-full">
                            Today
                          </span>
                        )}
                      </div>
                      <span className="text-zinc-900 font-bold">12:00 PM – 10:00 PM</span>
                    </div>
                  );
                })}
              </div>

              {/* Address Box */}
              <div className="mt-8 pt-6 border-t border-zinc-100">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                  Café Address
                </span>
                <p className="text-sm font-bold text-zinc-800 leading-relaxed">
                  {fullAddress}
                </p>

                <div className="flex flex-wrap gap-2.5 mt-4">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Address'}</span>
                  </button>

                  <a
                    href="https://maps.app.goo.gl/XA3xJ7gCNNGG6Dkg9"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Link */}
            <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-500">
              <span>Follow the Vibe</span>
              <a
                href="https://www.instagram.com/briskies.s?utm_source=qr&stkn=d2Y4bnowMXpubTl6"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-full"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@briskies.s</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Google Maps Visual / Interactive Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden shadow-soft-sm border border-zinc-200 relative min-h-[400px] lg:min-h-full bg-zinc-100"
          >
            {apiKey ? (
              <APIProvider apiKey={apiKey}>
                <Map
                  defaultZoom={15}
                  defaultCenter={cafeLocation}
                  mapId="DEMO_MAP_ID"
                  gestureHandling="greedy"
                  scrollwheel={false}
                  disableDefaultUI={false}
                  style={{ width: '100%', height: '100%', minHeight: '400px' }}
                >
                  <AdvancedMarker position={cafeLocation}>
                    <Pin background="#F59E0B" borderColor="#B45309" glyphColor="#fff" />
                  </AdvancedMarker>
                </Map>
              </APIProvider>
            ) : (
              /* High-fidelity custom map placeholder with direct directions link */
              <div className="w-full h-full min-h-[400px] flex flex-col justify-between p-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-zinc-50">
                <div className="flex justify-between items-start">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-zinc-200 text-xs font-bold text-zinc-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>Siddharth Vihar, Ghaziabad</span>
                  </div>

                  <a
                    href="https://maps.app.goo.gl/XA3xJ7gCNNGG6Dkg9"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-zinc-900 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-zinc-800 transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Central pin animation */}
                <div className="text-center my-auto py-8">
                  <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/40 animate-bounce">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-black text-2xl text-zinc-900 mt-4">
                    Briskies Café
                  </h4>
                  <p className="text-zinc-500 text-xs font-semibold max-w-xs mx-auto mt-1">
                    Shop No - 11, SG Shikhar Heights, Siddharth Vihar
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-zinc-200 text-xs text-zinc-500 flex items-center justify-between">
                  <span>Landmark: Near Indirapuram & Siddharth Vihar Crossing</span>
                  <a
                    href="https://maps.app.goo.gl/XA3xJ7gCNNGG6Dkg9"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-amber-600 hover:text-amber-800 underline"
                  >
                    Launch Navigator →
                  </a>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
