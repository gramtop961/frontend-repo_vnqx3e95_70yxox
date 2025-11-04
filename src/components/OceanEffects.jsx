import React from 'react';

function Sparkline({ points = '0,16 6,14 12,13 18,12 24,12.5 30,13.5 36,15.5 42,16', color = '#ef4444' }) {
  return (
    <svg viewBox="0 0 48 16" className="h-10 w-full">
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
    </svg>
  );
}

export default function OceanEffects() {
  return (
    <section className="w-full snap-start bg-neutral-950 py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold md:text-5xl">Ocean Health Impacts</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            Waste and microplastics affect chemistry and habitats. These snapshots highlight key stress indicators.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="text-sm uppercase tracking-wide text-white/60">Ocean pH</div>
            <div className="mt-1 text-3xl font-semibold">~8.10 → 8.05</div>
            <div className="text-xs text-white/60">Multi-decade trend (approx.)</div>
            <div className="mt-4 rounded-lg bg-black/30 p-2">
              <Sparkline points="0,6 8,6.5 16,7.4 24,8.2 32,9.5 40,10.5 48,11.2" color="#60a5fa" />
            </div>
            <p className="mt-3 text-sm text-white/70">
              Increased CO₂ lowers pH (ocean acidification), reducing carbonate ions needed by corals and shell-formers.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="text-sm uppercase tracking-wide text-white/60">Coral Stress</div>
            <div className="mt-1 text-3xl font-semibold">Bleaching ↑</div>
            <div className="text-xs text-white/60">Frequency and severity</div>
            <div className="mt-4 rounded-lg bg-black/30 p-2">
              <Sparkline points="0,14 8,13 16,12 24,10.5 32,9 40,7 48,5" color="#f87171" />
            </div>
            <p className="mt-3 text-sm text-white/70">
              Heatwaves, acidification, and pollution increase bleaching events, weakening reefs and coastal protection.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="text-sm uppercase tracking-wide text-white/60">Microplastic Load</div>
            <div className="mt-1 text-3xl font-semibold">Rising</div>
            <div className="text-xs text-white/60">Surface & seafloor</div>
            <div className="mt-4 rounded-lg bg-black/30 p-2">
              <Sparkline points="0,15 8,14 16,12.5 24,11 32,9 40,7 48,5.5" color="#34d399" />
            </div>
            <p className="mt-3 text-sm text-white/70">
              Fibers and fragments are found from surface slicks to deep sediments, entering food webs across trophic levels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
