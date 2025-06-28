import { renderEquation } from './components/Equation.js';

document.getElementById('root').innerHTML = `
  <main style="font-family: sans-serif; padding: 2rem; max-width: 800px; margin: auto;">
    <h1 style="font-size: 2rem; margin-bottom: 1rem;">Interactionist Self-Regulation Model (ISRM)</h1>
    <section>
      <p style="font-size: 1rem; line-height: 1.6;">
        Understanding adaptation across biological, artificial, and physical systems has long demanded a unifying principle.
        The Interactionist Self-Regulation Model (ISRM) posits that all adaptive systems—whether molecular or cognitive,
        synthetic or cosmological—operate by modulating a scalar signal <strong>U(t)</strong> under constraint.
      </p>
    </section>
    <section id="equation" style="margin-top: 2rem;">
      <h2 style="font-size: 1.5rem;">Core Equation</h2>
      <div id="equation-box" style="margin-top: 1rem;"></div>
    </section>
  </main>
`;

renderEquation();