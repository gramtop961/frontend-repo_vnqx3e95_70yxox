import React from 'react';
import HeroGlobe from './components/HeroGlobe';
import GranulateSection from './components/GranulateSection';
import WastePathPicker from './components/WastePathPicker';
import OceanEffects from './components/OceanEffects';

function App() {
  return (
    <main className="h-screen w-full snap-y snap-mandatory overflow-y-auto bg-black selection:bg-red-500/30 selection:text-white">
      <HeroGlobe />
      <GranulateSection />
      <WastePathPicker />
      <OceanEffects />
    </main>
  );
}

export default App;
