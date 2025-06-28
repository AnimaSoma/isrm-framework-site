export function renderEquation() {
  const box = document.getElementById("equation-box");
  if (box) {
    box.innerHTML = `
      <pre style="background: #f0f0f0; padding: 1rem; border-radius: 5px; font-family: monospace;">
U(t) = ΔCoherence(t) / ΔEnergy(t)</pre>
    `;
  }
}