
import React, { useRef, useEffect } from "react";

export default function ISRMOrbitSimulation() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = 300;

    let frame = 0;
    const agents = [];

    function createAgent(persistent = false) {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1,
        r: persistent ? 10 : 6,
        coherence: persistent ? 0.9 : Math.random(),
        energy: 0.5 + Math.random() * 0.5,
        salience: persistent ? 0.5 : Math.random() * 0.5,
        persistent,
        lifespan: persistent ? Infinity : 300 + Math.random() * 300,
        age: 0
      };
    }

    const immortal = createAgent(true);
    agents.push(immortal);

    function tick() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, width, height);

      // Spawn new agents occasionally
      if (Math.random() < 0.03) {
        agents.push(createAgent());
      }

      agents.forEach((a, i) => {
        const deltaC = 0.5 + 0.5 * Math.sin((frame + i) * 0.01);
        const U = deltaC - a.energy + a.salience;

        // Update position
        a.x += a.dx;
        a.y += a.dy;

        // Boundaries
        if (a.x < 0 || a.x > width) a.dx *= -1;
        if (a.y < 0 || a.y > height) a.dy *= -1;

        // Aging
        a.age += 1;
        if (!a.persistent && (U < 0 || a.age > a.lifespan)) {
          agents.splice(i, 1);
          return;
        }

        const opacity = a.persistent ? 1 : Math.max(0.2, U);
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${opacity})`; // cyan-400
        ctx.fill();
      });

      frame++;
      requestAnimationFrame(tick);
    }

    tick();
  }, []);

  return (
    <div className="mt-12 mb-20">
      <h3 className="text-center text-slate-100 text-xl font-semibold mb-4">ISRM Survival Simulation</h3>
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg border border-slate-700"
        style={{ background: "#0f172a", height: "300px" }}
      />
      <p className="text-center text-sm text-slate-400 mt-2">
        Agents appear and disappear. One survives indefinitely.
      </p>
    </div>
  );
}
