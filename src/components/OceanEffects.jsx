import React from 'react';

function Sparkline({ points = '0,16 6,14 12,13 18,12 24,12.5 30,13.5 36,15.5 42,16', color = '#ef4444' }) {
  return (
    <svg viewBox="0 0 48 16" className="h-10 w-full">
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
    </svg>
  );
}

const SINK_IMPACTS = {
  np: {
    label: 'North Pacific Gyre (Great Pacific Garbage Patch)',
    phTrend: '8.11 → 8.06',
    coral: 'Patchy reefs; stress tied to heatwaves in Central Pacific',
    microLoad: 'High surface accumulation; large slicks observed',
    pHSpark: '0,6 8,6.7 16,7.7 24,8.6 32,9.7 40,10.6 48,11.4',
    coralSpark: '0,14 8,13 16,12.3 24,11 32,9 40,7.5 48,6',
    plasticSpark: '0,15 8,14 16,12 24,10 32,8 40,6.5 48,5',
    notes: 'Convergence of the North Pacific Subtropical Gyre forms persistent debris fields; fragmentation increases microplastic share.',
  },
  sp: {
    label: 'South Pacific Gyre',
    phTrend: '8.10 → 8.05',
    coral: 'Fringing reefs near South Pacific islands; stress events increasing',
    microLoad: 'Moderate–high; sparser than North Pacific',
    pHSpark: '0,6 8,6.6 16,7.5 24,8.4 32,9.6 40,10.7 48,11.5',
    coralSpark: '0,14 8,13.2 16,12.5 24,11.5 32,10 40,8.3 48,7',
    plasticSpark: '0,15 8,14.2 16,13 24,11.2 32,9.8 40,8.2 48,6.7',
    notes: 'Broad subtropical convergence with fewer direct inputs; still shows rising microplastic concentrations.',
  },
  na: {
    label: 'North Atlantic Gyre',
    phTrend: '8.12 → 8.07',
    coral: 'Caribbean & Mesoamerican reefs face compounding stress',
    microLoad: 'High; dense shipping and riverine inputs',
    pHSpark: '0,6 8,6.6 16,7.6 24,8.5 32,9.6 40,10.6 48,11.3',
    coralSpark: '0,14 8,12.8 16,11.6 24,10 32,8.2 40,6.8 48,5.2',
    plasticSpark: '0,15 8,13.6 16,12 24,10 32,8.3 40,6.8 48,5.3',
    notes: 'Influenced by Gulf Stream and subtropical recirculation; notable surface microplastic loads and episodic sargassum blooms.',
  },
  sa: {
    label: 'South Atlantic Gyre',
    phTrend: '8.10 → 8.05',
    coral: 'Limited reef systems; turbid shelf zones affected by runoff',
    microLoad: 'Moderate; growing with global inputs',
    pHSpark: '0,6 8,6.6 16,7.5 24,8.4 32,9.5 40,10.6 48,11.4',
    coralSpark: '0,14 8,13.5 16,12.7 24,11.7 32,10.5 40,9 48,7.8',
    plasticSpark: '0,15 8,14.4 16,13.2 24,11.6 32,10 40,8.5 48,7.2',
    notes: 'Circulation traps buoyant debris in the subtropical convergence; coastal upwelling regions show different stress profiles.',
  },
  in: {
    label: 'Indian Ocean Gyre',
    phTrend: '8.09 → 8.04',
    coral: 'Widespread bleaching risk in central/eastern basin',
    microLoad: 'High in convergence zones; monsoon cycles redistribute',
    pHSpark: '0,6 8,6.7 16,7.7 24,8.7 32,9.8 40,10.8 48,11.6',
    coralSpark: '0,14 8,12.9 16,11.8 24,10.5 32,8.8 40,7.2 48,5.8',
    plasticSpark: '0,15 8,13.8 16,12.4 24,10.7 32,9 40,7.4 48,6',
    notes: 'Monsoon-driven reversals modulate pathways; strong accumulation evident in central subtropical gyre.',
  },
};

export default function OceanEffects({ sink }) {
  // Default to North Pacific if none selected yet for a clear initial view
  const key = sink?.id || 'np';
  const data = SINK_IMPACTS[key] || SINK_IMPACTS.np;

  return (
    <section className="w-full snap-start bg-neutral-950 py-16 text-white md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold md:text-5xl">Ocean Health Impacts</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            Localized snapshots for {data.label}. Trends are illustrative and scaled for visual comparison.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="text-sm uppercase tracking-wide text-white/60">Ocean pH</div>
            <div className="mt-1 text-3xl font-semibold">{data.phTrend}</div>
            <div className="text-xs text-white/60">Multi-decade trend (approx.)</div>
            <div className="mt-4 rounded-lg bg-black/30 p-2">
              <Sparkline points={data.pHSpark} color="#60a5fa" />
            </div>
            <p className="mt-3 text-sm text-white/70">
              Acidification reduces carbonate availability, impacting calcifiers and weakening reef accretion.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="text-sm uppercase tracking-wide text-white/60">Coral Stress</div>
            <div className="mt-1 text-3xl font-semibold">{data.coral}</div>
            <div className="text-xs text-white/60">Regional conditions</div>
            <div className="mt-4 rounded-lg bg-black/30 p-2">
              <Sparkline points={data.coralSpark} color="#f87171" />
            </div>
            <p className="mt-3 text-sm text-white/70">
              Heat stress and pollution interact with local circulation and depth, altering resilience and recovery.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="text-sm uppercase tracking-wide text-white/60">Microplastic Load</div>
            <div className="mt-1 text-3xl font-semibold">{data.microLoad}</div>
            <div className="text-xs text-white/60">Surface & convergence zones</div>
            <div className="mt-4 rounded-lg bg-black/30 p-2">
              <Sparkline points={data.plasticSpark} color="#34d399" />
            </div>
            <p className="mt-3 text-sm text-white/70">{data.notes}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
