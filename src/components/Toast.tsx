import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useAppStore } from '../store';

export default function Toast() {
  const { toast } = useAppStore();

  return (
    <div className="fixed bottom-6 right-6 z-[100] pointer-events-none flex flex-col gap-2 max-w-sm w-full px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md text-sm font-semibold ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 text-emerald-100 border-emerald-800/60 shadow-emerald-950/30'
                : toast.type === 'alert'
                ? 'bg-rose-950/90 text-rose-100 border-rose-800/60 shadow-rose-950/30'
                : 'bg-zinc-900/90 text-zinc-100 border-zinc-700/60 shadow-zinc-950/30'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
              {toast.type === 'alert' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-amber-400 shrink-0" />}
              <span className="leading-tight">{toast.message}</span>
            </div>
            <button
              onClick={() => useAppStore.setState({ toast: null })}
              className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
