// src/components/ISRMIntroduction.jsx

const ISRMIntroduction = () => {
  return (
    <div className="py-16 bg-gray-900 text-white border-y border-white/10">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Understanding ISRM</h2>
        
        <div className="space-y-8">
          <p className="text-white/80">
            The Interactionist Self-Regulation Model (ISRM) provides a unified framework for understanding how complex systems adapt to their environment while managing limited energy resources. At its core, ISRM describes two fundamental components that exist in any adaptive system:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-300">Observer System (OS)</h3>
              <p className="text-white/80">
                The system's internal model of reality—its simplified, predictive representation of itself and its environment. The OS is the "story" the system tells itself about what's happening.
              </p>
            </div>
            
            <div className="bg-gray-800 p-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-300">Physical System (PS)</h3>
              <p className="text-white/80">
                The raw, unfiltered data stream of reality—the "ground truth" of what's actually happening, regardless of what the OS expects or believes.
              </p>
            </div>
          </div>
          
          <p className="text-white/80">
            These systems interact in a continuous loop: the OS makes predictions, the PS provides actual data, and the mismatch between them creates prediction error. The system must decide whether to spend limited energy to update its model or to maintain its current understanding.
          </p>
          
          <p className="text-white/80">
            <strong className="text-blue-300">Coherence</strong> represents the alignment between expectation and reality. When the OS accurately predicts the PS, the system achieves high coherence—an efficient state that preserves energy. When predictions fail, coherence drops, creating pressure to update that's balanced against available energy.
          </p>
          
          <p className="text-white/80">
            This balance—between maintaining an outdated but energy-efficient model versus spending energy to update to a more accurate one—is the fundamental dynamic of all adaptive systems, from single cells to human brains to financial markets.
          </p>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-lg font-medium text-blue-300">
            The simulations below demonstrate these principles in action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ISRMIntroduction;
