import React from 'react';
import { motion } from 'framer-motion';

export default function GranulateSection() {
  return (
    <section className="relative h-screen w-full snap-start overflow-hidden bg-neutral-950 text-white">
      {/* Animated particles/grain overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 0 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06) 0 1px, transparent 1px)',
            backgroundSize: '10px 10px, 8px 8px',
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-semibold md:text-5xl"
        >
          From Debris to Microplastics
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
          className="mt-4 max-w-2xl text-white/80"
        >
          As plastics weather, they granulate into smaller fragments. Scroll further and the fragments coalesce as we trace where currents carry them.
        </motion.p>

        <div className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="h-24 rounded-xl bg-gradient-to-br from-red-500/20 to-red-400/10 ring-1 ring-red-500/20"
            >
              <div className="h-full w-full animate-pulse rounded-xl bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:12px_12px]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
