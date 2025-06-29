import { useEffect, useRef } from "react";

const SurvivalSim = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let agent = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: 0,
      vy: 0,
      memory: Array(60).fill(0),
      radius: 10,
      energy: 1.0,
    };

    let balls = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      radius: 12,
    }));

    const distance = (a, b) => {
      return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    };

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Move balls
      for (let ball of balls) {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x < 0 || ball.x > canvas.width) ball.vx *= -1;
        if (ball.y < 0 || ball.y > canvas.height) ball.vy *= -1;

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#f55ac2";
        ctx.fill();
      }

      // Compute coherence signal
      let closest = balls.reduce((acc, b) =>
        distance(agent, b) < distance(agent, acc) ? b : acc
      );
      let d = distance(agent, closest);
      let dC = 1.0 - Math.min(d / 200, 1.0);
      let E = 0.05;
      let S = d < 80 ? 0.4 : 0.1;
      let U = dC - E + S;
      const memAvg = agent.memory.reduce((a, b) => a + b, 0) / agent.memory.length;
      const U_thresh = 0.6 - memAvg * 0.2;

      // Move if coherence pressure high
      if (U >= U_thresh) {
        let dx = agent.x - closest.x;
        let dy = agent.y - closest.y;
        let mag = Math.sqrt(dx * dx + dy * dy) || 1;
        agent.vx += (dx / mag) * 0.5;
        agent.vy += (dy / mag) * 0.5;
      }

      // Update position
      agent.x += agent.vx;
      agent.y += agent.vy;
      agent.vx *= 0.9;
      agent.vy *= 0.9;

      // Boundaries
      if (agent.x < 0) agent.vx = Math.abs(agent.vx);
      if (agent.x > canvas.width) agent.vx = -Math.abs(agent.vx);
      if (agent.y < 0) agent.vy = Math.abs(agent.vy);
      if (agent.y > canvas.height) agent.vy = -Math.abs(agent.vy);

      // Collision detection
      let hit = 0;
      for (let ball of balls) {
        if (distance(agent, ball) < agent.radius + ball.radius) {
          hit = 1;
          break;
        }
      }

      agent.memory.shift();
      agent.memory.push(hit);

      // Draw agent
      ctx.beginPath();
      ctx.arc(agent.x, agent.y, agent.radius, 0, Math.PI * 2);
      ctx.fillStyle = hit ? "red" : "#42f5a7";
      ctx.fill();

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className="rounded-lg overflow-hidden border border-white/10">
      <canvas ref={canvasRef} className="w-full h-[400px] bg-black" />
    </div>
  );
};

export default SurvivalSim;
