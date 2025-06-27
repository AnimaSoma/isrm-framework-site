
import React, { useRef, useEffect } from "react";

export default function ISRMImmortalLearner() {
  const canvasRef = useRef();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = 400;

    let frame = 0;
    const agents = [];
    const dangerMap = {};

    function createAgent(persistent = false) {
      return {
        id: persistent ? "IMM" : Math.random().toString(36).substring(7),
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() * 2 - 1) * (persistent ? 0.6 : 1),
        dy: (Math.random() * 2 - 1) * (persistent ? 0.6 : 1),
        r: persistent ? 10 : 6,
        persistent,
        energy: persistent ? 0.35 : 0.4 + Math.random() * 0.6,
        salience: persistent ? 0.5 : Math.random() * 0.5,
        age: 0,
        memory: [],
      };
    }

    const immortal = createAgent(true);
    agents.push(immortal);

    function updateDangerMap(x, y) {
      const gx = Math.floor(x / 20);
      const gy = Math.floor(y / 20);
      const key = `${gx},${gy}`;
      dangerMap[key] = (dangerMap[key] || 0) + 1;
    }

    function avoidDangerZones(agent) {
      const gx = Math.floor(agent.x / 20);
      const gy = Math.floor(agent.y / 20);
      const dirs = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [-1, -1], [1, -1], [-1, 1],
      ];
      let safest = null;
      let minThreat = Infinity;

      dirs.forEach(([dx, dy]) => {
        const key = `${gx + dx},${gy + dy}`;
        const threat = dangerMap[key] || 0;
        if (threat < minThreat) {
          minThreat = threat;
          safest = [dx, dy];
        }
      });

      if (safest) {
        agent.dx += safest[0] * 0.1;
        agent.dy += safest[1] * 0.1;
      }
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, width, height);

      if (Math.random() < 0.03) agents.push(createAgent());

      agents.forEach((a, i) => {
        const deltaC = 0.6 + 0.4 * Math.sin((frame + i) * 0.01);
        const U = Math.max(0, deltaC - a.energy + a.salience);

        if (!a.persistent && (U <= 0 || a.age > 400)) {
          agents.splice(i, 1);
          return;
        }

        if (a.persistent) avoidDangerZones(a);

        a.x += a.dx;
        a.y += a.dy;
        a.age += 1;

        if (a.x < 0 || a.x > width) a.dx *= -1;
        if (a.y < 0 || a.y > height) a.dy *= -1;

        for (let j = 0; j < agents.length; j++) {
          const b = agents[j];
          if (a !== b) {
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < a.r + b.r) {
              updateDangerMap(a.x, a.y);
              if (!a.persistent) {
                agents.splice(i, 1);
                return;
              }
            }
          }
        }

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = a.persistent ? "#38bdf8" : "#60a5fa";
        ctx.fill();

        ctx.font = "10px Inter";
        ctx.fillStyle = "#e0f2fe";
        ctx.textAlign = "center";
        ctx.fillText(a.persistent ? "IMM" : `U: ${U.toFixed(2)}`, a.x, a.y + a.r + 10);
      });

      frame++;
      requestAnimationFrame(tick);
    }

    tick();
  }, []);

  return (
    <div className="mt-10 mb-16 text-center">
      <h3 className="text-slate-100 text-xl font-semibold mb-4">ISRM Collision-Aware Agent</h3>
      <canvas
        ref={canvasRef}
        width={1200}
        height={400}
        className="w-full max-w-full rounded-lg border border-slate-700"
        style={{ background: "#0f172a" }}
      />
      <p className="text-sm text-slate-400 mt-2">
        IMM learns to avoid collisions using coherence-preserving movement.
      </p>
    </div>
  );
}
