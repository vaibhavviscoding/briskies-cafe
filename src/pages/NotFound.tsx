import { motion } from 'motion/react';
import { ArrowLeft, Utensils, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BriskiesLogo } from '../components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-24 h-24 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto shadow-inner border border-amber-200"
        >
          <Utensils className="w-12 h-12 text-amber-500" />
        </motion.div>

        <div className="space-y-2">
          <span className="font-display font-black text-6xl text-amber-500 block">
            404
          </span>
          <h1 className="text-3xl font-display font-black text-zinc-900 tracking-tight">
            Looks like someone ate this page!
          </h1>
          <p className="text-zinc-500 text-sm font-medium leading-relaxed">
            The page you’re looking for doesn't exist or has moved. How about a hot burger or thick shake instead?
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/#discover-menu"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
