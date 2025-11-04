import React, { useRef, useState } from 'react';
import HeroGlobe from './components/HeroGlobe';
import WastePathPicker from './components/WastePathPicker';
import OceanEffects from './components/OceanEffects';
import TransitionOverlay from './components/TransitionOverlay';

function App() {
  const [selectedSink, setSelectedSink] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const mapId = 'map-section';

  function startGranulateFlow() {
    setTransitioning(true);
    // Scroll midway through the overlay so it feels like the globe dissolves into the map
    setTimeout(() => {
      const el = document.getElementById(mapId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 550);
  }

  function endGranulateFlow() {
    setTransitioning(false);
  }

  return (
    <main className="h-screen w-full snap-y snap-mandatory overflow-y-auto bg-black selection:bg-red-500/30 selection:text-white">
      <HeroGlobe onStart={startGranulateFlow} />
      <WastePathPicker id={mapId} onSinkChange={setSelectedSink} />
      <OceanEffects sink={selectedSink} />
      <TransitionOverlay active={transitioning} onDone={endGranulateFlow} />
    </main>
  );
}

export default App;
