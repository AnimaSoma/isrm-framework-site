
import React, { useRef, useEffect } from 'react';

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function useISRMEngine(ref) {
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let blobs = Array.from({ length: 10 }).map(() => ({
      x: random(0, width),
      y: random(0, height),
      r: random(20, 80),
      dx: random(-1, 1),
      dy: random(-1, 1),
    }));

    let energy = 1.0;
    let coherence = 0.5;
    let salience = 0.5;
    let threshold = 0.4;

    function update() {
      coherence = 0.5 + 0.5 * Math.sin(Date.now() * 0.001);
      energy = 0.4 + 0.3 * Math.cos(Date.now() * 0.0007);
      salience = Math.min(1, salience * 0.98);

      const U = coherence - energy + salience;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(20, 20, 40, 0.9)';
      ctx.fillRect(0, 0, width, height);

      if (U > threshold) {
        blobs.forEach(b => {
          b.x += b.dx;
          b.y += b.dy;

          if (b.x < 0 || b.x > width) b.dx *= -1;
          if (b.y < 0 || b.y > height) b.dy *= -1;
        });
      }

      blobs.forEach(b => {
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        gradient.addColorStop(0, `rgba(100,200,255,0.2)`);
        gradient.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(update);
    }

    update();

    const onMove = () => salience = 1;
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
}

export default function ISRMBackground() {
  const canvasRef = useRef();
  useISRMEngine(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
}
