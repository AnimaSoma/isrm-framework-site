import { useRef, useEffect, useState } from "react";

const BallFeedingSim = () => {
  const canvasRef = useRef(null);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = canvas.width = 800;
    const height = canvas.height = 500;

    const balls = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 6,
    }));

    const agents = {
      ISRM: {
        x: 100,
        y: height / 2,
        vx: 0,
        vy: 0,
        r: 10,
        color: "#42f5a7",
        energy: 50,
        memory: Array(30).fill(0),
        score: 0,
      },
      Chaser: {
        x: 700,
        y: height / 2,
        vx: 0,
        vy: 0,
        r: 10,
        color: "#4287f5",
        energy: 50,
        score: 0,
      }
    };

    function dist(a, b) {
      return Math.hypot(a.x - b.x, a.y - b.y);
    }

    function update() {
      ctx.clearRect(0, 0, width, height);

      // Draw balls
      balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fillStyle = "#f55ac2";
        ctx.fill();
      });

      Object.entries(agents).forEach(([label, agent]) => {
        const closest = balls.reduce((a, b) =>
          dist(agent, b) < dist(agent, a) ? b : a
        );
        const d = dist(agent, closest);

        let moved = false;

        if (agent.energy > 5) {
          const dx = closest.x - agent.x;
          const dy = closest.y - agent.y;
          const mag = Math.hypot(dx, dy) || 1;

          agent.vx += (dx / mag) * 0.6;
          agent.vy += (dy / mag) * 0.6;
          agent.energy -= 2;
          moved = true;
        }

        agent.x += agent.vx;
        agent.y += agent.vy;
        agent.vx *= 0.9;
        agent.vy *= 0.9;

        // Wall bounce (rectangle)
        if (agent.x - agent.r < 0 || agent.x + agent.r > width) {
          agent.vx *= -1;
          agent.x = Math.max(agent.r, Math.min(agent.x, width - agent.r));
        }
        if (agent.y - agent.r < 0 || agent.y + agent.r > height) {
          agent.vy *= -1;
          agent.y = Math.max(agent.r, Math.min(agent.y, height - agent.r));
        }

        const contactIndex = balls.findIndex(b => dist(agent, b) < agent.r + b.r);
        if (contactIndex !== -1) {
          agent.energy = Math.min(100, agent.energy + 20);
          agent.score++;
          balls.splice(contactIndex, 1);
          forceUpdate(t => t + 1);
        }

        if (!moved) {
          agent.energy = Math.min(100, agent.energy + 0.5);
        }

        // Draw agent
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, agent.r, 0, Math.PI * 2);
        ctx.fillStyle = agent.color;
        ctx.fill();

        // Label + energy bar
        ctx.fillStyle = "white";
        ctx.font = "12px monospace";
        ctx.fillText(`${label}: E=${Math.floor(agent.energy)} S=${agent.score}`, agent.x - 40, agent.y - 20);

        ctx.fillStyle = "#333";
        ctx.fillRect(agent.x - 20, agent.y + 15, 40, 5);
        ctx.fillStyle = "#0f0";
        ctx.fillRect(agent.x - 20, agent.y + 15, (agent.energy / 100) * 40, 5);
      });

      requestAnimationFrame(update);
    }

    update();

    // Autopopulate balls every 3 seconds
    const ballTimer = setInterval(() => {
      balls.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 6,
      });
      forceUpdate(t => t + 1);
    }, 3000);

    return () => clearInterval(ballTimer);
  }, []);

  return (
    <div className="rounded-lg overflow-hidden border border-white/10">
      <canvas ref={canvasRef} className="w-full h-[500px] bg-black" />
    </div>
  );
};

export default BallFeedingSim;
