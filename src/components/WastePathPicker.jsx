import React, { useMemo, useState } from 'react';

// Simple equirectangular map with click-to-select and SVG path rendering
const WIDTH = 900;
const HEIGHT = 450;

function projectLonLatToXY(lon, lat) {
  // lon [-180,180], lat [-90,90]
  const x = ((lon + 180) / 360) * WIDTH;
  const y = ((90 - lat) / 180) * HEIGHT;
  return { x, y };
}

function pickGyreSink(lon, lat) {
  // Heuristic: route to nearest major subtropical gyre center
  // Pacific (N/S), Atlantic (N/S), Indian
  const gyres = [
    { name: 'North Pacific Gyre', lon: -140, lat: 30 },
    { name: 'South Pacific Gyre', lon: -110, lat: -30 },
    { name: 'North Atlantic Gyre', lon: -40, lat: 30 },
    { name: 'South Atlantic Gyre', lon: -15, lat: -30 },
    { name: 'Indian Ocean Gyre', lon: 80, lat: -30 },
  ];
  let best = gyres[0];
  let bestDist = Infinity;
  for (const g of gyres) {
    const d = Math.hypot((g.lon - lon) * Math.cos((lat * Math.PI) / 180), g.lat - lat);
    if (d < bestDist) {
      best = g;
      bestDist = d;
    }
  }
  return best;
}

function curvePath(start, end) {
  // Quadratic curve string with a control point offset toward equatorward/eastward
  const s = projectLonLatToXY(start.lon, start.lat);
  const e = projectLonLatToXY(end.lon, end.lat);
  const ctrl = {
    x: (s.x + e.x) / 2 + (e.x - s.x) * 0.15,
    y: (s.y + e.y) / 2 + (e.y - s.y) * -0.15,
  };
  return `M ${s.x},${s.y} Q ${ctrl.x},${ctrl.y} ${e.x},${e.y}`;
}

export default function WastePathPicker() {
  const [point, setPoint] = useState({ lon: 0, lat: 10 });
  const sink = useMemo(() => pickGyreSink(point.lon, point.lat), [point]);
  const d = useMemo(() => curvePath(point, sink), [point, sink]);

  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const lon = (x / rect.width) * 360 - 180;
    const lat = 90 - (y / rect.height) * 180;
    setPoint({ lon, lat });
  }

  const startXY = projectLonLatToXY(point.lon, point.lat);
  const endXY = projectLonLatToXY(sink.lon, sink.lat);

  return (
    <section className="relative w-full snap-start bg-white py-16 text-neutral-900 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 text-center md:mb-12">
          <h2 className="text-3xl font-semibold md:text-5xl">Choose a Drop Point</h2>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
            Click on the map or adjust coordinates. We’ll estimate the current-driven path and where debris tends to accumulate.
          </p>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-[1fr_320px]">
          <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              width="100%"
              height="auto"
              className="block w-full cursor-crosshair bg-gradient-to-br from-sky-50 to-indigo-50"
              onClick={handleClick}
            >
              {/* Base map using simple land silhouettes (very light) */}
              <image
                href="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
                x="0"
                y="0"
                width={WIDTH}
                height={HEIGHT}
                opacity="0.55"
                preserveAspectRatio="none"
              />

              {/* Path */}
              <path d={d} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* Start and end markers */}
              <circle cx={startXY.x} cy={startXY.y} r="6" fill="#ef4444" />
              <circle cx={endXY.x} cy={endXY.y} r="6" fill="#1f2937" />

              {/* Flow arrows along path (simple dashes) */}
              <path d={d} fill="none" stroke="#ef4444" strokeWidth="6" strokeDasharray="1 18" strokeLinecap="round" opacity="0.4" />
            </svg>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-neutral-200 p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Coordinates</h3>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <label className="block">
                  <span className="text-neutral-600">Latitude</span>
                  <input
                    type="number"
                    value={point.lat.toFixed(2)}
                    onChange={(e) => setPoint((p) => ({ ...p, lat: Math.max(-90, Math.min(90, parseFloat(e.target.value) || 0)) }))}
                    className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                  />
                </label>
                <label className="block">
                  <span className="text-neutral-600">Longitude</span>
                  <input
                    type="number"
                    value={point.lon.toFixed(2)}
                    onChange={(e) => setPoint((p) => ({ ...p, lon: Math.max(-180, Math.min(180, parseFloat(e.target.value) || 0)) }))}
                    className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-red-400"
                  />
                </label>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Estimated Sink</h3>
              <p className="mt-2 text-sm text-neutral-700">
                Likely accumulation zone: <span className="font-medium text-neutral-900">{sink.name}</span>
              </p>
              <p className="mt-1 text-sm text-neutral-600">Lat {sink.lat.toFixed(1)}°, Lon {sink.lon.toFixed(1)}°</p>
              <div className="mt-4 rounded-lg bg-gradient-to-br from-red-50 to-rose-50 p-3 text-sm text-red-900">
                Currents tend to drive buoyant plastics toward subtropical gyres, where debris can persist for years.
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200 p-4 shadow-sm">
              <h3 className="text-lg font-semibold">Notes</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                <li>This is an illustrative model, not a forecast.</li>
                <li>Windage, storms, and coastal processes can alter pathways.</li>
                <li>Heavier items may beach or sink nearshore rather than reach gyres.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
