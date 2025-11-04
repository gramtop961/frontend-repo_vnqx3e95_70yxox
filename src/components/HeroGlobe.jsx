import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroGlobe({ onStart }) {
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
          Spin the Earth. Then granulate and merge into a current map to trace where debris travels and the ecosystems it affects.
        </p>
        <div className="mt-10 flex items-center gap-3">
          <button
            onClick={() => onStart && onStart()}
            className="rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-red-500/30 transition hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Granulate & Reveal Map
          </button>
          <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur">
            or scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
}
