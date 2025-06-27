
import React, { useEffect, useRef, useState } from "react";

export default function ISRMGuardianSim() {
  const canvasRef = useRef(null);
  const [agents, setAgents] = useState([]);
  const agentCount = 12;
  const radius = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight * 0.7;

    const createAgent = (id) => {
      const strategies = ["wander", "attract", "repel"];
      return {
        id,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        color: id === 0 ? "white" : id % 3 === 0 ? "cyan" : id % 3 === 1 ? "red" : "yellow",
        strategy: id === 0 ? "isrm" : strategies[Math.floor(Math.random() * strategies.length)],
      };
    };

    let state = Array.from({ length: agentCount }, (_, i) => createAgent(i));

    const update = () => {
      for (let a of state) {
        if (a.strategy === "isrm") {
          // Avoid collisions
          for (let b of state) {
            if (b !== a) {
              const dx = b.x - a.x;
              const dy = b.y - a.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 60) {
                a.vx -= dx / dist;
                a.vy -= dy / dist;
              }
            }
          }
          // Avoid walls
          if (a.x < 40 || a.x > width - 40) a.vx *= -1;
          if (a.y < 40 || a.y > height - 40) a.vy *= -1;
        } else if (a.strategy === "repel") {
          a.vx += (Math.random() - 0.5) * 0.3;
          a.vy += (Math.random() - 0.5) * 0.3;
        } else if (a.strategy === "attract") {
          a.vx *= 0.98;
          a.vy *= 0.98;
        } else {
          a.vx += (Math.random() - 0.5) * 0.1;
          a.vy += (Math.random() - 0.5) * 0.1;
        }

        a.x += a.vx;
        a.y += a.vy;

        // Bounds
        if (a.x < radius || a.x > width - radius) a.vx *= -1;
        if (a.y < radius || a.y > height - radius) a.vy *= -1;
      }
    };

    const draw = () => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      for (let a of state) {
        ctx.beginPath();
        ctx.arc(a.x, a.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = a.color;
        ctx.fill();
      }
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    loop();
    setAgents(state);
  }, []);

  return (
    <div className="w-full">
      <canvas ref={canvasRef} className="border border-gray-700 rounded shadow-lg w-full" />
      <p className="text-center mt-2 text-sm text-gray-400">
        White = ISRM Ball (self-regulating)<br />
        Red = Repellers | Yellow = Wanderers | Cyan = Attractors
      </p>
    </div>
  );
}
