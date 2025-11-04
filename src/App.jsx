import React, { useState } from 'react';
import HeroGlobe from './components/HeroGlobe';
import WastePathPicker from './components/WastePathPicker';
import OceanEffects from './components/OceanEffects';

function App() {
  const [selectedSink, setSelectedSink] = useState(null);

  return (
    <main className="h-screen w-full snap-y snap-mandatory overflow-y-auto bg-black selection:bg-red-500/30 selection:text-white">
      <HeroGlobe />
      <WastePathPicker onSinkChange={setSelectedSink} />
      <OceanEffects sink={selectedSink} />
    </main>
  );
}

export default App;
