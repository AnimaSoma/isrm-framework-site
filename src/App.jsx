import React from 'react'

export default function App() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-6">
          Interactionist Self-Regulation Model (ISRM)
        </h1>
        <div className="bg-slate-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">ISRM Core Equation</h2>
          <p className="text-lg font-mono bg-slate-800 p-4 rounded-lg border border-slate-600">
            U(t) = E(t) * C(t) - ΔP(t)
          </p>
        </div>
        <section className="mt-10 text-slate-300">
          <h2 className="text-xl font-semibold mb-2">What is ISRM?</h2>
          <p className="leading-relaxed">
            The Interactionist Self-Regulation Model (ISRM) provides a unified principle for understanding adaptation across all scales of existence—from atomic to cosmic, cellular to cognitive, and synthetic to societal. It posits that systems optimize their survival and coherence through the minimization of prediction error, constrained by energy availability and temporal thresholds.
          </p>
        </section>
      </div>
    </main>
  )
}