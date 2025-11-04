import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Scroll-driven granulation: particles fall from the globe and "settle" as the map reveals
export default function GranulateScrollFX({ targetRef }) {
  // Progress from the top of the wrapper (globe) to the top of the next section (map)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  // Granule field falls down and fades as we reach the map
  const fallY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const grainOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 0.2]);

  // A sweeping band that travels downward, suggesting the merge
  const sweepY = useTransform(scrollYProgress, [0, 1], [-120, 260]);
  const sweepOpacity = useTransform(scrollYProgress, [0, 0.15, 0.6, 1], [0, 1, 0.5, 0]);

  // A subtle reveal veil over the map that lifts as you scroll
  const veilOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.35, 0]);

  // Particle background style (memoized)
  const grainStyle = useMemo(
    () => ({
      backgroundImage:
        'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.10) 0 1px, transparent 1px),\n                 radial-gradient(circle at 70% 60%, rgba(255,255,255,0.08) 0 1px, transparent 1px),\n                 radial-gradient(circle at 40% 80%, rgba(239,68,68,0.12) 0 1px, transparent 1px),\n                 radial-gradient(circle at 60% 20%, rgba(255,255,255,0.10) 0 1px, transparent 1px)',
      backgroundSize: '10px 10px, 8px 8px, 12px 12px, 11px 11px',
    }),
    []
  );

  return (
    <div className="pointer-events-none sticky top-0 z-30 h-screen w-full">
      {/* Falling granules field */}
      <motion.div
        style={{ y: fallY, opacity: grainOpacity, ...grainStyle }}
        className="absolute inset-0"
      />

      {/* Sweep band */}
      <motion.div
        style={{ y: sweepY, opacity: sweepOpacity }}
        className="absolute left-0 right-0 h-40 -skew-y-3 bg-gradient-to-b from-red-500/0 via-red-500/40 to-red-500/0 blur-2xl"
      />

      {/* Dark veil that lifts from the map area as we scroll */}
      <motion.div
        style={{ opacity: veilOpacity }}
        className="absolute inset-x-0 bottom-0 h-2/3 bg-neutral-950/70"
      />
    </div>
  );
}
