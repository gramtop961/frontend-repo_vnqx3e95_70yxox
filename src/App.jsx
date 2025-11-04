import React, { useRef, useState } from 'react';
import HeroGlobe from './components/HeroGlobe';
import WastePathPicker from './components/WastePathPicker';
import OceanEffects from './components/OceanEffects';
import GranulateScrollFX from './components/GranulateScrollFX';

function App() {
  const [selectedSink, setSelectedSink] = useState(null);
  const mergeRef = useRef(null);
  const mapId = 'map-section';

  return (
    <main className="h-screen w-full snap-y snap-mandatory overflow-y-auto bg-black selection:bg-red-500/30 selection:text-white">
      {/* Scroll-merge wrapper: globe -> map */}
      <div ref={mergeRef} className="relative">
        <HeroGlobe />
        {/* Scroll-driven granulation overlay across the boundary of globe and map */}
        <GranulateScrollFX targetRef={mergeRef} />
        <WastePathPicker id={mapId} onSinkChange={setSelectedSink} />
      </div>

      <OceanEffects sink={selectedSink} />
    </main>
  );
}

export default App;
