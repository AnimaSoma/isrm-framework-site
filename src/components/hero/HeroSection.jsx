import HeroShader from './HeroShader';

const HeroSection = () => {
  return (
    <section className="relative text-center py-40 overflow-hidden">
      <HeroShader />
      <h1 className="text-5xl font-bold mb-6 relative z-10">🌌 The Self-Regulating Universe</h1>
      <p className="text-xl text-white/80 max-w-2xl mx-auto relative z-10">
        ISRM explains adaptive systems using a single scalar function: U(t) = ΔC - E + S
      </p>
    </section>
  );
};

export default HeroSection;
