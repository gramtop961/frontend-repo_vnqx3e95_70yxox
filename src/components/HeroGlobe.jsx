import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroGlobe() {
  return (
    <section className="relative h-screen w-full snap-start overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/M2rj0DQ6tP7dSzSz/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle gradient vignette that doesn't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
          Follow the Journey of Ocean-Bound Waste
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
          Spin the Earth. Scroll to watch it granulate into microplastics and reform as we trace where debris travels and the ecosystems it affects.
        </p>
        <div className="mt-10 flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 text-sm text-white/90 backdrop-blur">
          <span>Scroll to explore</span>
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-red-400" />
        </div>
      </div>
    </section>
  );
}
