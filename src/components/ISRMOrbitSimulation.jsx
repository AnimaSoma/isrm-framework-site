
import React, { useRef, useEffect } from "react";

export default function ISRMOrbitSimulation() {
  const canvasRef = useRef();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = 300;

    let frame = 0;
    const agents = [];

    function createAgent(persistent = false) {
      return {
        id: persistent ? "IMM" : Math.random().toString(36).substring(7),
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

      if (Math.random() < 0.03) {
        agents.push(createAgent());
      }

      agents.forEach((a, i) => {
        const deltaC = 0.5 + 0.5 * Math.sin((frame + i) * 0.01);
        const U = deltaC - a.energy + a.salience;

        a.x += a.dx;
        a.y += a.dy;

        if (a.x < 0 || a.x > width) a.dx *= -1;
        if (a.y < 0 || a.y > height) a.dy *= -1;

        a.age += 1;
        if (!a.persistent && (U < 0 || a.age > a.lifespan)) {
          agents.splice(i, 1);
          return;
        }

        // Set color
        let fillColor = a.persistent ? "#38bdf8" : U < 0 ? "#f43f5e" : "#60a5fa";
        const opacity = a.persistent ? 1 : Math.max(0.2, U);

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = fillColor + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Label
        ctx.font = a.persistent ? "bold 11px Inter" : "10px Inter";
        ctx.fillStyle = "#e0f2fe";
        ctx.textAlign = "center";
        ctx.fillText(a.persistent ? "IMM" : `U: ${U.toFixed(2)}`, a.x, a.y + a.r + 12);
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
        width={1200}
        height={300}
        className="w-full max-w-full rounded-lg border border-slate-700"
        style={{ background: "#0f172a" }}
      />
      <p className="text-center text-sm text-slate-400 mt-2">
        Agents show their U(t) values. One survives indefinitely.
      </p>
    </div>
  );
}
