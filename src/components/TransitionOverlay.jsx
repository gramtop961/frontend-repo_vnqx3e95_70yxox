import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransitionOverlay({ active, onDone, duration = 1600 }) {
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => onDone && onDone(), duration);
    return () => clearTimeout(t);
  }, [active, onDone, duration]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none fixed inset-0 z-50"
        >
          {/* Darken + tint */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Particle grain field using layered radial dots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0 1px, transparent 1px),\n                 radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0 1px, transparent 1px),\n                 radial-gradient(circle at 40% 80%, rgba(239,68,68,0.12) 0 1px, transparent 1px)',
              backgroundSize: '10px 10px, 8px 8px, 12px 12px',
            }}
          />

          {/* Flowing band indicating merge to map */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: duration / 1000, ease: 'easeInOut' }}
            className="absolute -inset-y-8 left-0 right-0 origin-left rotate-3 bg-gradient-to-r from-red-500/0 via-red-500/40 to-red-500/0 blur-2xl"
          />

          {/* Label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-full bg-white/10 px-5 py-2 text-sm text-white backdrop-blur"
            >
              Granulating surface debris → revealing current paths
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
