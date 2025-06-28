import { useState } from 'react';

const EquationExplorer = () => {
  const [coherence, setCoherence] = useState(0.5); // ΔC
  const [energy, setEnergy] = useState(0.3);       // E
  const [salience, setSalience] = useState(0.4);   // S

  const U = (coherence - energy + salience).toFixed(2);
  const threshold = 0.8;

  return (
    <section className="bg-isrm-dark text-white p-6 mt-12 rounded-xl border border-white/10 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🔬 Equation Explorer</h2>
      <p className="mb-4">U(t) = ΔC - E + S</p>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">ΔC (Coherence): {coherence}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={coherence}
            onChange={(e) => setCoherence(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1">E (Energy): {energy}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={energy}
            onChange={(e) => setEnergy(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1">S (Salience): {salience}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={salience}
            onChange={(e) => setSalience(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-6 text-lg font-mono">
        U(t) = {U} {U >= threshold ? '✅ Update' : '❌ No Update'}
      </div>
    </section>
  );
};

export default EquationExplorer;
