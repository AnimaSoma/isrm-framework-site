import Navbar from './components/navigation/Navbar';
import HeroSection from './components/hero/HeroSection';
import EquationExplorer from './components/sections/EquationExplorer';
import FrameworkOverview from './components/sections/FrameworkOverview';

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <HeroSection />
      <FrameworkOverview />

      <main className="p-10">
        <h1 className="text-3xl font-bold mb-6">✅ Framework + Equation Explorer</h1>
        <p className="text-white/80 mb-10">Adjust parameters below to compute U(t):</p>
        <EquationExplorer />
      </main>
    </div>
  );
}

export default App;
