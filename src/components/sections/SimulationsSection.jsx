import React, { useRef, useEffect, useState } from "react";
import BallAvoidanceSim from "./BallAvoidanceSim";
import BallFeedingSim from "./BallFeedingSim";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Enhanced hover component for math terms using KaTeX
const HoverMathTerm = ({ term, definition }) => {
  return (
    <span className="group relative cursor-help border-b border-dotted border-blue-400 text-blue-400">
      {term}
      <span className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 w-64 bg-gray-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        {definition}
      </span>
    </span>
  );
};

// Hover component for source citations
const HoverSource = ({ label, source }) => (
  <span className="group relative cursor-help">
    <span className="text-blue-300 underline decoration-dotted">{label}</span>
    <span className="invisible group-hover:visible absolute top-full left-0 w-64 mt-1 bg-gray-800 text-white text-xs p-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
      Source: {source}
    </span>
  </span>
);

// ISRM Time Comparison Section
const ISRMTimeComparison = () => {
  const timeData = [
    {
      label: "Relativity (Einstein)",
      view: "Time is a fourth dimension in spacetime. All moments exist simultaneously (block universe).",
      contrast: "Time emerges only when U(t) exceeds threshold. No update = no experienced time.",
      source: "Einstein, A. (1916). Relativity: The Special and General Theory."
    },
    {
      label: "Thermodynamic Arrow",
      view: "Time flows in the direction of increasing entropy.",
      contrast: "Time flows when coherence is lost and updated—entropy is one contributor to U(t).",
      source: "Eddington, A. S. (1928). The Nature of the Physical World."
    },
    {
      label: "Quantum Time (Page–Wootters)",
      view: "Time is relational—emerges from entanglement between subsystems.",
      contrast: "ISRM models the observer system's internal change, not subsystem correlation alone.",
      source: "Page, D. N., & Wootters, W. K. (1983). Physical Review D, 27(12), 2885–2892."
    },
    {
      label: "Presentism (Philosophy)",
      view: "Only the present moment exists. Past and future are fictions.",
      contrast: "Each update defines a new present—the past is a coherence memory, the future is a prediction.",
      source: "Craig, W. L. (2001). Time and the Metaphysics of Relativity."
    },
    {
      label: "Perceptual Neuroscience",
      view: "Time is constructed from delay compensation and sensory integration (e.g. ~500ms rule).",
      contrast: "ISRM explains these as coherence buffering—delays are the system preventing premature updates.",
      source: "Eagleman, D. M. (2008). Current Opinion in Neurobiology, 18(2), 131–136."
    }
  ];

  return (
    <div className="mt-16 bg-gray-900 p-6 sm:p-10 rounded-lg border border-white/10">
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-300">
        Time as Update: ISRM vs Classical Views
      </h3>
      <p className="text-white/70 text-center mb-8 max-w-3xl mx-auto">
        In ISRM, time is not a fixed dimension nor a subjective illusion—it is the <em>experience of an update</em>. 
        When coherence fails and U(t) exceeds threshold, the system transitions—and that moment is experienced as time. 
        This stands in stark contrast to major conceptions from physics and philosophy:
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px] text-sm text-white/80">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-700 px-4 py-3 text-left font-medium">Theory</th>
              <th className="border border-gray-700 px-4 py-3 text-left font-medium">View of Time</th>
              <th className="border border-gray-700 px-4 py-3 text-left font-medium">ISRM Contrast</th>
            </tr>
          </thead>
          <tbody>
            {timeData.map((row, i) => (
              <tr key={i} className="bg-gray-900 group">
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  <HoverSource label={row.label} source={row.source} />
                </td>
                <td className="border border-gray-700 px-4 py-3">{row.view}</td>
                <td className="border border-gray-700 px-4 py-3 text-green-300">{row.contrast}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-center">
        <p className="text-lg text-white/80 font-medium">
          Time is not a background—<span className="text-blue-400 font-semibold">it is the event horizon of coherence change.</span>
        </p>
      </div>
    </div>
  );
};

// Mobile-friendly equation component
const ResponsiveEquation = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Use simpler equation on mobile
  const isMobile = windowWidth < 768;
  
  return (
    <div className="mt-8 sm:mt-12 flex flex-col items-center">
      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="hidden sm:block">
          <BlockMath math="U(t) = (\alpha M(t) + \beta \sigma^2(t)) \cdot (E_{max} - \gamma \int_0^t U(\tau)d\tau + I(t)) \cdot \delta|S_{PS}(t) - S_{OS}(t)|" />
        </div>
        <div className="sm:hidden">
          <BlockMath math="U(t) = (S) \cdot (E) \cdot (PE)" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-gray-800/50 p-5 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-purple-400">Salience</h3>
          <BlockMath math="(\alpha M(t) + \beta \sigma^2(t))" />
          <p className="text-sm mt-3 text-white/80">
            How important is this error? Combines <HoverMathTerm term="Magnitude" definition="The intensity or strength of the input signal." /> and <HoverMathTerm term="Variance" definition="How novel or unpredictable the signal is." /> to determine attention worthiness.
          </p>
        </div>

        <div className="bg-gray-800/50 p-5 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-blue-400">Energy Budget</h3>
          <BlockMath math="(E_{max} - \gamma \int_0^t U(\tau)d\tau + I(t))" />
          <p className="text-sm mt-3 text-white/80">
            Can we afford this update? Tracks the system's available energy, the cost of previous updates, and incoming energy influx.
          </p>
        </div>

        <div className="bg-gray-800/50 p-5 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-red-400">Prediction Error</h3>
          <BlockMath math="\delta|S_{PS}(t) - S_{OS}(t)|" />
          <p className="text-sm mt-3 text-white/80">
            How wrong is our model? Measures the discrepancy between the Physical System (reality) and Observer System (our model).
          </p>
        </div>
      </div>

      <div className="mt-6 bg-gray-800/50 p-5 rounded-lg max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-yellow-400">Update Signal Potential</h3>
            <p className="text-sm mb-3 text-white/80">
              <InlineMath math="U(t)" /> is a scalar "pressure to update" that rises when:
            </p>
            <ul className="text-sm space-y-2 text-white/80 list-disc pl-5">
              <li>The prediction error is large</li>
              <li>The error is highly salient</li>
              <li>The system has sufficient energy</li>
            </ul>
          </div>

          <div>
            <p className="text-sm mb-3 font-medium text-green-300">IF U(t) &gt; U_threshold:</p>
            <p className="text-sm text-white/80 border-l-2 border-green-500 pl-3">
              An <strong>Update Event</strong> occurs. The system spends significant energy to update its OS, aligning it with the PS data. This is what we experience as a moment of consciousness or a state change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ISRM Introduction Component
const ISRMIntroduction = () => {
  return (
    <div className="py-16 bg-gray-900 text-white border-y border-white/10">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Understanding ISRM</h2>
        
        <div className="space-y-8">
          <p className="text-white/80">
            The Interactionist Self-Regulation Model (ISRM) provides a unified framework for understanding how complex systems adapt to their environment while managing limited energy resources. At its core, ISRM describes two fundamental components that exist in any adaptive system:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-300">Observer System (OS)</h3>
              <p className="text-white/80">
                The system's internal model of reality—its simplified, predictive representation of itself and its environment. The OS is the "story" the system tells itself about what's happening.
              </p>
            </div>
            
            <div className="bg-gray-800 p-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-300">Physical System (PS)</h3>
              <p className="text-white/80">
                The raw, unfiltered data stream of reality—the "ground truth" of what's actually happening, regardless of what the OS expects or believes.
              </p>
            </div>
          </div>
          
          <p className="text-white/80">
            These systems interact in a continuous loop: the OS makes predictions, the PS provides actual data, and the mismatch between them creates prediction error. The system must decide whether to spend limited energy to update its model or to maintain its current understanding.
          </p>
          
          <p className="text-white/80">
            <strong className="text-blue-300">Coherence</strong> represents the alignment between expectation and reality. When the OS accurately predicts the PS, the system achieves high coherence—an efficient state that preserves energy. When predictions fail, coherence drops, creating pressure to update that's balanced against available energy.
          </p>
          
          <p className="text-white/80">
            This balance—between maintaining an outdated but energy-efficient model versus spending energy to update to a more accurate one—is the fundamental dynamic of all adaptive systems, from single cells to human brains to financial markets.
          </p>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-lg font-medium text-blue-300">
            The simulations below demonstrate these principles in action.
          </p>
        </div>
      </div>
    </div>
  );
};

// Perceptual Rivalry Simulation Component
const PerceptualRivalrySim = () => {
  const canvasRef = useRef(null);
  const [error, setError] = useState(0);
  const [activeModel, setActiveModel] = useState("A");
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const errorThreshold = 5.0;
    let errorLevel = 0;
    let model = "A";
    let animationFrameId;
    
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    function draw() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a border
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      
      // Draw the current perceived state
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = Math.min(canvas.width, canvas.height) * 0.4;
      
      // Draw Necker cube based on current model
      if (model === "A") {
        drawNeckerCubeA(ctx, centerX, centerY, size);
      } else {
        drawNeckerCubeB(ctx, centerX, centerY, size);
      }
      
      // Draw error accumulation bar
      const barWidth = canvas.width * 0.8;
      const barHeight = 20;
      const barX = (canvas.width - barWidth) / 2;
      const barY = canvas.height - 40;
      
      // Background bar
      ctx.fillStyle = "#333";
      ctx.fillRect(barX, barY, barWidth, barHeight);
      
      // Error level
      const errorWidth = (errorLevel / errorThreshold) * barWidth;
      ctx.fillStyle = errorLevel < errorThreshold * 0.7 ? "#4287f5" : "#f55a42";
      ctx.fillRect(barX, barY, errorWidth, barHeight);
      
      // Threshold marker
      ctx.strokeStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(barX + barWidth, barY);
      ctx.lineTo(barX + barWidth, barY + barHeight);
      ctx.stroke();
      
      // Label
      ctx.fillStyle = "#fff";
      ctx.font = "12px sans-serif";
      ctx.fillText("Prediction Error", barX, barY - 5);
      ctx.fillText("Threshold", barX + barWidth + 5, barY + 12);
      
      // Model label - make it responsive to canvas width
      ctx.font = "16px sans-serif";
      const modelText = `Current: Model ${model}`;
      const textWidth = ctx.measureText(modelText).width;
      const textX = Math.max(centerX - textWidth/2, 10); // Center but ensure it stays within bounds
      ctx.fillText(modelText, textX, canvas.height - 10);
      
      // Update error and check for flip
      errorLevel += 0.03;
      if (errorLevel >= errorThreshold) {
        model = model === "A" ? "B" : "A";
        errorLevel = 0;
        setActiveModel(model);
      }
      
      setError(errorLevel.toFixed(2));
      
      animationFrameId = requestAnimationFrame(draw);
    }
    
    function drawNeckerCubeA(ctx, x, y, size) {
      const s = size / 2;
      
      // Draw front face (emphasized)
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#42f5a7";
      ctx.beginPath();
      ctx.moveTo(x - s, y - s);
      ctx.lineTo(x + s, y - s);
      ctx.lineTo(x + s, y + s);
      ctx.lineTo(x - s, y + s);
      ctx.lineTo(x - s, y - s);
      ctx.stroke();
      
      // Draw back face (fainter)
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#888";
      ctx.beginPath();
      ctx.moveTo(x - s/2, y - s/2);
      ctx.lineTo(x + s/2, y - s/2);
      ctx.lineTo(x + s/2, y + s/2);
      ctx.lineTo(x - s/2, y + s/2);
      ctx.lineTo(x - s/2, y - s/2);
      ctx.stroke();
      
      // Draw connecting lines
      ctx.beginPath();
      ctx.moveTo(x - s, y - s);
      ctx.lineTo(x - s/2, y - s/2);
      ctx.moveTo(x + s, y - s);
      ctx.lineTo(x + s/2, y - s/2);
      ctx.moveTo(x + s, y + s);
      ctx.lineTo(x + s/2, y + s/2);
      ctx.moveTo(x - s, y + s);
      ctx.lineTo(x - s/2, y - s/2);
      ctx.stroke();
    }
    
    function drawNeckerCubeB(ctx, x, y, size) {
      const s = size / 2;
      
      // Draw back face (emphasized)
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#4287f5";
      ctx.beginPath();
      ctx.moveTo(x - s/2, y - s/2);
      ctx.lineTo(x + s/2, y - s/2);
      ctx.lineTo(x + s/2, y + s/2);
      ctx.lineTo(x - s/2, y + s/2);
      ctx.lineTo(x - s/2, y - s/2);
      ctx.stroke();
      
      // Draw front face (fainter)
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#888";
      ctx.beginPath();
      ctx.moveTo(x - s, y - s);
      ctx.lineTo(x + s, y - s);
      ctx.lineTo(x + s, y + s);
      ctx.lineTo(x - s, y + s);
      ctx.lineTo(x - s, y - s);
      ctx.stroke();
      
      // Draw connecting lines
      ctx.beginPath();
      ctx.moveTo(x - s, y - s);
      ctx.lineTo(x - s/2, y - s/2);
      ctx.moveTo(x + s, y - s);
      ctx.lineTo(x + s/2, y - s/2);
      ctx.moveTo(x + s, y + s);
      ctx.lineTo(x + s/2, y + s/2);
      ctx.moveTo(x - s, y + s);
      ctx.lineTo(x - s/2, y - s/2);
      ctx.stroke();
    }
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-2">Perceptual Rivalry Simulation</h3>
      <p className="text-white/60 mb-4">
        This simulation demonstrates how ISRM explains the "flip" in perceptual rivalry. 
        As prediction error accumulates, it eventually crosses a threshold that triggers a perceptual update.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg overflow-hidden border border-white/10">
          <canvas ref={canvasRef} className="w-full h-[300px] bg-gray-950" />
        </div>
        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
          <h4 className="text-xl font-semibold mb-3 text-blue-300">ISRM Analysis</h4>
          <p className="mb-3 text-sm sm:text-base">
            In this Necker cube demonstration, the OS (your perception) interprets the ambiguous cube in one of two ways.
          </p>
          <p className="mb-3 text-sm sm:text-base">
            However, the PS (visual system) continues to receive contradictory evidence that supports both interpretations.
          </p>
          <p className="mb-3 text-sm sm:text-base">
            This contradiction creates prediction error that accumulates over time, increasing the "pressure" to update.
          </p>
          <p className="mb-3 text-sm sm:text-base">
            Current state: <span className="font-bold text-blue-300">Model {activeModel}</span>
          </p>
          <p className="mb-3 text-sm sm:text-base">
            Current error: <span className="font-bold text-blue-300">{error}</span> / 5.0
          </p>
          <p className="font-bold text-sm sm:text-base">
            When error crosses the threshold, perception "flips" to the alternative interpretation.
          </p>
        </div>
      </div>
    </div>
  );
};

// Coherent Oscillation Network (Fixed version)
const CoherentOscillationSim = () => {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const animationRef = useRef(null);
  const [running, setRunning] = useState(true);
  const [initialized, setInitialized] = useState(false);
  
  // Initialize nodes only once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Create nodes
    const initialNodeCount = 30;
    const newNodes = [];
    
    for (let i = 0; i < initialNodeCount; i++) {
      newNodes.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 5 + Math.random() * 10,
        phase: Math.random() * Math.PI * 2,
        frequency: 0.02 + Math.random() * 0.04, // Increased frequency for more drama
        energy: 0.3 + Math.random() * 0.7,
        connections: [],
      });
    }
    
    // Create connections between nodes
    for (let i = 0; i < newNodes.length; i++) {
      const node = newNodes[i];
      const connectionCount = 2 + Math.floor(Math.random() * 3);
      
      for (let j = 0; j < connectionCount; j++) {
        const targetIdx = Math.floor(Math.random() * newNodes.length);
        if (targetIdx !== i && !node.connections.includes(targetIdx)) {
          node.connections.push(targetIdx);
        }
      }
    }
    
    nodesRef.current = newNodes;
    setInitialized(true);
    
    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!initialized || !running) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const animate = () => {
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      const nodes = nodesRef.current;
      
      // Update phase for each node
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Update phase based on own frequency
        node.phase = (node.phase + node.frequency) % (Math.PI * 2);
        
        // Adjust phase based on connected nodes (coupling)
        let phaseAdjustment = 0;
        for (const connIdx of node.connections) {
          const connNode = nodes[connIdx];
          const phaseDiff = connNode.phase - node.phase;
          
          // Sync based on energy availability
          const syncStrength = node.energy * 0.015;
          phaseAdjustment += Math.sin(phaseDiff) * syncStrength;
          
          // Energy cost of syncing
          node.energy = Math.max(0.1, node.energy - 0.0005);
        }
        
        // Apply adjustment
        node.phase = (node.phase + phaseAdjustment) % (Math.PI * 2);
        
        // Recover energy slowly
        node.energy = Math.min(1.0, node.energy + 0.0002);

        // Add slow drift
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < node.size || node.x > width - node.size) node.vx *= -1;
        if (node.y < node.size || node.y > height - node.size) node.vy *= -1;
      }
      
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        for (const connIdx of node.connections) {
          const connNode = nodes[connIdx];
          
          // Calculate phase coherence
          const phaseDiff = Math.abs(node.phase - connNode.phase);
          const coherence = 1 - (Math.min(phaseDiff, Math.PI * 2 - phaseDiff) / Math.PI);
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connNode.x, connNode.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${coherence * 0.8})`;
          ctx.lineWidth = coherence * 3;
          ctx.stroke();
        }
      }
      
      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulseSize = node.size * (1 + 0.3 * Math.sin(node.phase));
        
        // Color based on energy and phase
        const hue = (node.phase / (Math.PI * 2)) * 360;
        const saturation = 50 + node.energy * 50;
        const lightness = 40 + node.energy * 30;
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.3 + 0.7 * node.energy;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initialized, running]);
  
  const toggleRunning = () => setRunning(!running);
  
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold text-purple-400">Coherent Oscillation Network</h4>
          <button
            onClick={toggleRunning}
            className="px-4 py-2 bg-purple-600 rounded text-white text-sm hover:bg-purple-700 transition"
          >
            {running ? 'Pause' : 'Resume'}
          </button>
        </div>
        
        <p className="text-sm text-white/80">
          This simulation demonstrates how a network of oscillating nodes synchronizes based on energy availability and prediction error. 
          Each node attempts to align its phase with connected nodes, spending energy to do so. 
          When energy depletes, synchronization weakens.
        </p>
        
        <div className="relative bg-black/40 rounded-lg overflow-hidden h-[400px]">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-3">
            <div className="flex justify-between text-xs text-white/70">
              <span>Bright connections = High coherence</span>
              <span>Fading nodes = Low energy</span>
            </div>
          </div>
        </div>
        
        <div className="bg-black/30 p-4 rounded-lg">
          <h5 className="font-medium text-white mb-2">ISRM Analysis:</h5>
          <p className="text-sm text-white/70 mb-2">
            <strong>OS:</strong> Each node's oscillation phase
          </p>
          <p className="text-sm text-white/70 mb-2">
            <strong>PS:</strong> The phases of connected nodes
          </p>
          <p className="text-sm text-white/70">
            <strong>Energy Budget:</strong> Determines how strongly a node can adjust to synchronize
          </p>
        </div>
      </div>
    </div>
  );
};

// Ecosystem Tipping Point Simulation
const EcosystemTippingPointSim = () => {
  const [ecosystem, setEcosystem] = useState({
    health: 100,
    resilience: 100,
    stressor: 0,
    collapsed: false,
    timeline: Array(50).fill(100),
    stressorTimeline: Array(50).fill(0),
    year: 0
  });
  const [speed, setSpeed] = useState(1);
  const [paused, setPaused] = useState(false);
  const [reset, setReset] = useState(false);
  
  useEffect(() => {
    if (reset) {
      setEcosystem({
        health: 100,
        resilience: 100,
        stressor: 0,
        collapsed: false,
        timeline: Array(50).fill(100),
        stressorTimeline: Array(50).fill(0),
        year: 0
      });
      setReset(false);
      return;
    }
    
    if (paused) return;
    
    const interval = setInterval(() => {
      setEcosystem(prev => {
        // Clone the ecosystem
        const next = {...prev};
        
        // Add year
        next.year = prev.year + 1;
        
        // Slowly increase environmental stressor
        if (!prev.collapsed && Math.random() < 0.7) {
          next.stressor = Math.min(100, prev.stressor + 0.5);
        }
        
        // Calculate resilience loss based on stressor
        // (resilience buffers health loss but eventually depletes)
        const resilienceLoss = prev.stressor * 0.05;
        next.resilience = Math.max(0, prev.resilience - resilienceLoss);
        
        // Health depends on stressor and remaining resilience
        const healthLoss = prev.stressor * (1 - prev.resilience / 100) * 0.1;
        next.health = Math.max(0, prev.health - healthLoss);
        
        // Check for ecosystem collapse
        if (next.health < 30 && !prev.collapsed) {
          next.collapsed = true;
          next.health = Math.max(0, next.health - 20); // Sudden drop at collapse
        }
        
        // Allow some recovery if stressor decreases
        if (prev.stressor < 10 && !prev.collapsed) {
          next.resilience = Math.min(100, prev.resilience + 0.5);
          next.health = Math.min(100, prev.health + 0.2);
        }
        
        // Update timelines (for the chart)
        next.timeline = [...prev.timeline.slice(1), next.health];
        next.stressorTimeline = [...prev.stressorTimeline.slice(1), next.stressor];
        
        return next;
      });
    }, 500 / speed);
    
    return () => clearInterval(interval);
  }, [paused, speed, reset]);
  
  const addRandomEvent = () => {
    setEcosystem(prev => {
      const next = {...prev};
      
      // Random event - could be good or bad
      const eventImpact = Math.random() < 0.7 ? -15 : 5;
      next.stressor = Math.max(0, Math.min(100, prev.stressor + eventImpact));
      
      return next;
    });
  };
  
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-semibold text-green-400">Ecosystem Tipping Point</h4>
          <div className="flex gap-2">
            <button
              onClick={() => setPaused(!paused)}
              className="px-3 py-1 bg-blue-600 rounded text-white text-sm hover:bg-blue-700 transition"
            >
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={() => setReset(true)}
              className="px-3 py-1 bg-gray-600 rounded text-white text-sm hover:bg-gray-700 transition"
            >
              Reset
            </button>
          </div>
        </div>
        
        <p className="text-sm text-white/80">
          This simulation demonstrates how ecosystems can maintain stability against chronic stressors until a critical threshold is reached, at which point a rapid regime shift occurs. The system uses its resilience as a buffer, but once this resource is depleted, collapse can be sudden and dramatic.
        </p>
        
        <div className="bg-black/40 rounded-lg p-4 h-[200px] relative">
          {/* Visualization - simple chart */}
          <div className="absolute inset-0 flex items-end">
            {ecosystem.timeline.map((value, i) => (
              <div 
                key={i} 
                className="w-full h-full flex flex-col justify-end"
                style={{ opacity: i / ecosystem.timeline.length }}
              >
                {/* Stressor bar */}
                <div 
                  className="w-full bg-red-500 opacity-40"
                  style={{ height: `${ecosystem.stressorTimeline[i]}%` }}
                />
                
                {/* Gap */}
                <div 
                  className="w-full"
                  style={{ height: `${100 - ecosystem.stressorTimeline[i] - value}%` }}
                />
                
                {/* Health bar */}
                <div 
                  className={`w-full ${value > 30 ? 'bg-green-500' : 'bg-yellow-500'}`}
                  style={{ height: `${value}%` }}
                />
              </div>
            ))}
          </div>
          
          {/* Tipping point line */}
          <div 
            className="absolute left-0 right-0 border-t border-dashed border-yellow-400 pointer-events-none"
            style={{ top: '70%' }}
          >
            <span className="absolute right-0 -top-5 text-xs text-yellow-400">Tipping Point</span>
          </div>
          
          {/* Year counter */}
          <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white/90">
            Year: {ecosystem.year}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-black/30 p-3 rounded-lg">
            <h5 className="text-sm font-medium text-white mb-1">Ecosystem Health</h5>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
              <div 
                className={`h-full rounded-full ${
                  ecosystem.health > 60 ? 'bg-green-500' : 
                  ecosystem.health > 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${ecosystem.health}%` }} 
              />
            </div>
            <p className="text-xs text-white/60">{ecosystem.health.toFixed(1)}%</p>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg">
            <h5 className="text-sm font-medium text-white mb-1">Resilience</h5>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
              <div 
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${ecosystem.resilience}%` }} 
              />
            </div>
            <p className="text-xs text-white/60">{ecosystem.resilience.toFixed(1)}%</p>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg">
            <h5 className="text-sm font-medium text-white mb-1">Environmental Stressor</h5>
            <div className="w-full bg-gray-800 rounded-full h-2 mb-1">
              <div 
                className="h-full rounded-full bg-red-500"
                style={{ width: `${ecosystem.stressor}%` }} 
              />
            </div>
            <p className="text-xs text-white/60">{ecosystem.stressor.toFixed(1)}%</p>
          </div>
        </div>
        
        <div className="flex gap-3 justify-between">
          <button
            onClick={addRandomEvent}
            className="px-4 py-2 bg-purple-600 rounded text-white text-sm hover:bg-purple-700 transition"
          >
            Random Event
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">Speed:</span>
            <select 
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="bg-gray-800 text-white text-sm rounded px-2 py-1 border border-gray-700"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={5}>5x</option>
            </select>
          </div>
        </div>
        
        <div className="bg-black/30 p-4 rounded-lg">
          <h5 className="font-medium text-white mb-2">ISRM Analysis:</h5>
          <p className="text-sm text-white/70 mb-2">
            <strong>OS:</strong> The ecosystem's homeostatic state (stability)
          </p>
          <p className="text-sm text-white/70 mb-2">
            <strong>PS:</strong> Environmental stressors and conditions
          </p>
          <p className="text-sm text-white/70 mb-2">
            <strong>Energy Budget:</strong> The ecosystem's resilience (buffering capacity)
          </p>
          <p className="text-sm text-white/70">
            <strong>Update Event:</strong> The regime shift or ecosystem collapse
          </p>
        </div>
      </div>
    </div>
  );
};

// AI Comparison Section Component
const AIComparisonSection = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Current AI vs. ISRM Agents– The Structural Upgrade</h3>
      
      <p className="text-white/70 mb-8 text-sm sm:text-base">
        Most current AI systems—no matter how large or well-trained—operate as <strong>monolithic predictors</strong>. 
        They receive input, calculate a response based on learned patterns, and output that result. 
        What they <em>lack</em> is a structural mechanism for handling uncertainty, internal contradiction, 
        or resource constraints in real time.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-12">
        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-blue-900/30">
          <h4 className="text-lg sm:text-xl font-bold mb-4 text-blue-400 flex items-center">
            <span className="mr-2 text-xl sm:text-2xl"></span> Classical AI
          </h4>
          <ul className="space-y-2 text-white/70 list-inside text-sm sm:text-base">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 flex-shrink-0">-</span>
              <span>One brain, one prediction.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 flex-shrink-0">-</span>
              <span>Prediction updated by gradient descent, nearest neighbors, or direct input-response coupling.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 flex-shrink-0">-</span>
              <span>No memory of internal disagreement. No structured self-model.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 flex-shrink-0">-</span>
              <span>If input shifts unexpectedly, classical AI either adapts slowly or produces brittle, unstable behavior.</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-green-900/30">
          <h4 className="text-lg sm:text-xl font-bold mb-4 text-green-400 flex items-center">
            <span className="mr-2 text-xl sm:text-2xl"></span> ISRM Agents: Adaptive, Multi-OS Intelligence
          </h4>
          <p className="mb-4 text-white/70 text-sm sm:text-base">
            ISRM Agents replace the "single mind" with a <strong>stacked, modular mind</strong>—multiple, 
            independent Observer Systems (OSs), each:
          </p>
          <ul className="space-y-2 text-white/70 list-inside text-sm sm:text-base">
            <li className="flex items-start">
              <span className="text-green-400 mr-2 flex-shrink-0">-</span>
              <span>Tracks its own predictions.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2 flex-shrink-0">-</span>
              <span>Accumulates its own energy, coherence, and salience.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-400 mr-2 flex-shrink-0">-</span>
              <span>Reports its local U(t):</span>
            </li>
          </ul>
          <div className="my-4 bg-gray-800 p-3 rounded-md flex justify-center overflow-x-auto">
            <code className="text-green-300 whitespace-nowrap text-sm sm:text-base">U(t) = Salience - EnergyCost + Coherence</code>
          </div>
          <p className="text-white/70 text-sm sm:text-base">
            These OSs <strong>compete and cooperate</strong> for control, in a dynamic negotiation. 
            ISRM Agents behave like a parliament of predictive minds, not a dictator of one.
          </p>
        </div>
      </div>
      
      <h4 className="text-lg sm:text-xl font-semibold mb-4 text-blue-300 flex items-center">
        <span className="mr-3 text-xl"></span> Core Differences
      </h4>
      
      <div className="overflow-x-auto mb-12 pb-2">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-left">Feature</th>
              <th className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-left">Classical AI</th>
              <th className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-left">ISRM Agent Framework</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base">
            <tr className="bg-gray-900">
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 font-medium">Prediction Source</td>
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-white/70">Single inference engine</td>
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-green-300">Multiple Observer Systems (OSs)</td>
            </tr>
            <tr className="bg-gray-900">
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 font-medium">Conflict Handling</td>
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-white/70">No awareness of contradiction</td>
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-green-300">Competing U(t) values arbitrate dominance</td>
            </tr>
            <tr className="bg-gray-900">
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 font-medium">Adaptation Mode</td>
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-white/70">Input-driven gradient update</td>
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-green-300">Energy- and coherence-aware feedback loop</td>
            </tr>
            <tr className="bg-gray-900">
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 font-medium">Self-Model</td>
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-white/70">Absent or hardcoded</td>
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-green-300">Emergent through OS interaction and arbitration</td>
            </tr>
            <tr className="bg-gray-900">
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 font-medium">Memory of Error</td>
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-white/70">Limited to parameters or buffers</td>
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-green-300">Tracked via coherence decay and U(t) trajectory</td>
            </tr>
            <tr className="bg-gray-900">
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 font-medium">Control Strategy</td>
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-white/70">Linear regression toward target</td>
              <td className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-green-300">Adaptive arbitration under energetic constraint</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h4 className="text-lg sm:text-xl font-semibold mb-4 text-blue-300 flex items-center">
        <span className="mr-3 text-xl"></span> Why ISRM Agents Are Superior
      </h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-gray-900 p-4 sm:p-5 rounded-lg border border-green-900/30">
          <h5 className="font-bold mb-2 text-green-400">Resilience</h5>
          <p className="text-white/70 text-sm sm:text-base">
            ISRM agents degrade gracefully—when energy is low, they don't crash; they negotiate minimal behavior.
          </p>
        </div>
        
        <div className="bg-gray-900 p-4 sm:p-5 rounded-lg border border-green-900/30">
          <h5 className="font-bold mb-2 text-green-400">Insight</h5>
          <p className="text-white/70 text-sm sm:text-base">
            Contradiction isn't discarded, it's preserved and resolved over time, simulating internal debate.
          </p>
        </div>
        
        <div className="bg-gray-900 p-4 sm:p-5 rounded-lg border border-green-900/30">
          <h5 className="font-bold mb-2 text-green-400">Modularity</h5>
          <p className="text-white/70 text-sm sm:text-base">
            Visual, audio, somatic, emotional, and cognitive modules all operate semi-independently.
          </p>
        </div>
        
        <div className="bg-gray-900 p-4 sm:p-5 rounded-lg border border-green-900/30">
          <h5 className="font-bold mb-2 text-green-400">Transparency</h5>
          <p className="text-white/70 text-sm sm:text-base">
            ISRM agents are not black-box predictors—they are transparent, modular intelligences composed of multiple interacting Observer Systems (OSs). Each OS models a different part of reality, maintains its own energy budget, tracks coherence with the environment, and calculates its own internal update signal:
<InlineMath math="U(t) = \text{Salience} - \text{EnergyCost} + \text{PredictionError}" />.

When an OS’s pressure to update exceeds its threshold, it initiates a conscious shift—whether that's a movement, a change in focus, or a full reorganization of internal state.

This nested structure allows ISRM agents to:

Resolve internal contradictions through arbitration

Adapt dynamically to changing environments

Degrade gracefully under low energy

Reveal their reasoning in real time

ISRM agents are glass-box minds—you can watch them think, track every pressure to act, and understand precisely why they change. This makes them ideal for scientific research, safety-critical systems, and next-generation AI.
          </p>
        </div>
        
        <div className="bg-gray-900 p-4 sm:p-5 rounded-lg border border-green-900/30">
          <h5 className="font-bold mb-2 text-green-400">Emergence</h5>
          <p className="text-white/70 text-sm sm:text-base">
            The ISRM agent is a Nested OS architecture—a layered mind composed of competing and cooperating predictive systems. Each layer manages its own coherence under energy constraints, and behavior emerges through update arbitration. Rather than a single controller, the agent acts as a parliament of minds governed by adaptive pressure signals.There is no central controller—only a dynamic negotiation of perspectives, each vying for expression when its U(t) exceeds threshold.Behavior is not pre-coded—it is negotiated, emergent, and always energetically justified.
          </p>
        </div>
      </div>
      
      <p className="text-lg sm:text-xl text-center font-small text-green-400 mt-8 sm:mt-10 mb-8 sm:mb-10">
        Classical AI gives you an answer, ISRM Agents give you a mind.  
        
 <p className="text-white/70 text-sm sm:text-base">
            Open for collaboration as we expand all sections of ISRM-framework. Suggested citation format: Schell, J.P. Interactionist Self-Regulation Model (ISRM): A Unifying Principle of Adaptive Systems. 2025. https://isrm-framework.org.
            
            <p className="text-white/70 text-sm sm:text-base">
            For More Information contact me John Paul Schell, Stem Cell Biologist/Systems Theorist johnpaulschell@gmail.com📍 https://github.com/AnimaSoma/isrm-framework-site STOCKHOLM, SWEDEN .
          </p>
          </p>
      </p>
    </div>
  );
};

// Theory Comparison Table Component
const TheoryComparisonTable = () => {
  const theoryData = [
    {
      label: "GWT",
      subtitle: "Global Workspace Theory",
      fails: "Energy arbitration, timing",
      advantage: "Computable U(t)-driven broadcast",
      source: "Baars, B. J. (1988). A Cognitive Theory of Consciousness."
    },
    {
      label: "IIT",
      subtitle: "Integrated Information Theory",
      fails: "Real-time causality",
      advantage: "Nested coherence with cost dynamics",
      source: "Tononi, G. (2004). BMC Neuroscience, 5(1), 42."
    },
    {
      label: "HOT",
      subtitle: "Higher Order Thought Theory",
      fails: "Physical constraints",
      advantage: "Multi-level OS arbitration",
      source: "Rosenthal, D. (2005). Consciousness and Mind."
    },
    {
      label: "RPT",
      subtitle: "Recurrent Processing Theory",
      fails: "Threshold control",
      advantage: "Update events triggered by U(t)",
      source: "Lamme, V. A. (2006). Trends in Cognitive Sciences, 10(11), 494–501."
    },
    {
      label: "FEP",
      subtitle: "Free Energy Principle",
      fails: "Novelty tolerance",
      advantage: "Coherence under constraint, not suppression",
      source: "Friston, K. (2010). Nature Reviews Neuroscience, 11(2), 127–138."
    }
  ];

  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-4">ISRM vs. Existing Consciousness Theories</h3>
      <p className="text-white/70 mb-6">
        While ISRM builds upon insights from several established theories of consciousness and complex systems, 
        it addresses critical limitations in each framework. The table below compares ISRM with five influential theories:
      </p>
      
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-3 text-left font-medium">Theory</th>
              <th className="border border-gray-700 px-4 py-3 text-left font-medium">Fails to Model</th>
              <th className="border border-gray-700 px-4 py-3 text-left font-medium">ISRM Advantage</th>
            </tr>
          </thead>
          <tbody>
            {theoryData.map((row, i) => (
              <tr key={i} className="bg-gray-900 group">
                <td className="border border-gray-700 px-4 py-3">
                  <div className="font-semibold text-blue-300">
                    <HoverSource label={row.label} source={row.source} />
                  </div>
                  <div className="text-xs text-white/60">{row.subtitle}</div>
                </td>
                <td className="border border-gray-700 px-4 py-3 text-white/80">{row.fails}</td>
                <td className="border border-gray-700 px-4 py-3 text-green-300">{row.advantage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-blue-300">Global Workspace Theory (GWT)</h4>
          <p className="text-white/80 mb-3">
            GWT posits that consciousness arises when information is broadcast from a "global workspace" to multiple specialized neural modules. While GWT describes <em>what</em> happens during conscious awareness, it lacks a computational mechanism for <em>when</em> and <em>why</em> this broadcast occurs.
          </p>
          <p className="text-white/80">
            <span className="text-green-300 font-medium">ISRM advantage:</span> The U(t) equation provides a precise, computable trigger for the broadcast event, grounding GWT in energetic constraints that explain why consciousness is discrete and sparse rather than continuous.
          </p>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-blue-300">Integrated Information Theory (IIT)</h4>
          <p className="text-white/80 mb-3">
            IIT defines consciousness as integrated information (Φ), measuring how much a system's whole exceeds the sum of its parts. However, IIT struggles with temporal dynamics and real-time causality—it describes the potential for consciousness rather than its moment-to-moment manifestation.
          </p>
          <p className="text-white/80">
            <span className="text-green-300 font-medium">ISRM advantage:</span> ISRM implements nested coherence dynamics with explicit cost accounting, making causality explicit by showing how integrated information must exceed metabolic thresholds to manifest as conscious experience.
          </p>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-blue-300">Higher Order Thought Theory (HOT)</h4>
          <p className="text-white/80 mb-3">
            HOT proposes that consciousness emerges when a system has thoughts about its own mental states. While conceptually elegant, HOT lacks a physical implementation model and doesn't address why some meta-representations become conscious while others remain subliminal.
          </p>
          <p className="text-white/80">
            <span className="text-green-300 font-medium">ISRM advantage:</span> ISRM's multi-level OS architecture provides a concrete implementation of higher-order representation, with OS modules at different levels competing for energy resources through explicit arbitration mechanisms.
          </p>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-blue-300">Recurrent Processing Theory (RPT)</h4>
          <p className="text-white/80 mb-3">
            RPT suggests that consciousness arises from recurrent neural activity between higher and lower brain areas. However, it lacks a clear mechanism for why some recurrent processes reach consciousness while others remain subliminal.
          </p>
          <p className="text-white/80">
            <span className="text-green-300 font-medium">ISRM advantage:</span> ISRM explains the threshold phenomenon in recurrent processing by showing how update events are triggered when U(t) exceeds U_threshold, providing a quantitative model for when recurrent processing reaches conscious awareness.
          </p>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-blue-300">Free Energy Principle (FEP)</h4>
          <p className="text-white/80 mb-3">
            FEP posits that biological systems minimize surprise (or "free energy") by updating their internal models to better predict sensory inputs. However, FEP assumes continuous model updating and doesn't explain why systems often tolerate prediction errors rather than immediately resolving them.
          </p>
          <p className="text-white/80">
            <span className="text-green-300 font-medium">ISRM advantage:</span> ISRM shows how systems maintain coherence under constraint rather than simply minimizing prediction error. The energy budget term explains why novelty is sometimes tolerated and explored rather than suppressed.
          </p>
        </div>
      </div>
    </div>
  );
};

// ISRM in the Cosmos Section
const ISRMCosmosSection = () => {
  const cosmosData = [
    {
      model: "ΛCDM",
      contribution: "Adds teleodynamic interpretation to cosmic expansion",
      source: "Planck Collaboration (2018). A&A, 641, A6."
    },
    {
      model: "Holography",
      contribution: "Models the OS as the decoding boundary",
      source: "’t Hooft, G. (1993); Susskind, L. (1995). Journal of Mathematical Physics."
    },
    {
      model: "It from Bit",
      contribution: "Introduces salience filtering for which bits collapse reality",
      source: "Wheeler, J. A. (1989). Information, physics, quantum: The search for links."
    },
    {
      model: "Decoherence",
      contribution: "U(t) becomes the collapse trigger",
      source: "Zurek, W. H. (2003). Rev. Mod. Phys., 75, 715–775."
    },
    {
      model: "Anthropic Principle",
      contribution: "Reframes fine-tuning as nested coherence survival",
      source: "Barrow, J. D., & Tipler, F. J. (1986). The Anthropic Cosmological Principle."
    }
  ];

  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-4">ISRM in the Cosmos: A New Physical Interpretation</h3>
      <p className="text-white/70 mb-6">
        Beyond biology and computation, ISRM offers a novel lens for interpreting fundamental physics and cosmology. By framing physical laws as coherence-preserving mechanisms, we can gain new insights into the structure and evolution of the universe.
      </p>
      
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-3 text-left font-medium">Model</th>
              <th className="border border-gray-700 px-4 py-3 text-left font-medium">ISRM Contribution</th>
            </tr>
          </thead>
          <tbody>
            {cosmosData.map((row, i) => (
              <tr key={i} className="bg-gray-900 group">
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  <HoverSource label={row.model} source={row.source} />
                </td>
                <td className="border border-gray-700 px-4 py-3 text-green-300">{row.contribution}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-blue-300">ΛCDM & Cosmic Expansion</h4>
          <p className="text-white/80">
            The standard model of cosmology (Lambda-Cold Dark Matter) describes an expanding universe driven by dark energy. ISRM offers a "teleodynamic" interpretation, suggesting that cosmic expansion is not random but a coherence-preserving mechanism that balances gravitational clustering with universal stability.
          </p>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-blue-300">Holography & Observer Systems</h4>
          <p className="text-white/80">
            The Holographic Principle suggests that the information of a volume of space can be described by a theory on its boundary. ISRM models this boundary as an Observer System that decodes information from the volume it encloses, with physical laws emerging from this OS/PS interaction.
          </p>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-blue-300">"It from Bit" & Salience Filtering</h4>
          <p className="text-white/80">
            Wheeler's "It from Bit" hypothesis posits that the universe is fundamentally informational. ISRM adds a crucial layer by introducing salience filtering, suggesting that only bits of information that are meaningful enough to cross the U(t) threshold actually collapse into physical reality.
          </p>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-blue-300">Decoherence & U(t) Collapse Trigger</h4>
          <p className="text-white/80">
            Decoherence explains how quantum systems lose their quantum properties and behave classically. ISRM provides a causal mechanism for this process, with U(t) acting as the collapse trigger. When coherence strain and energy costs cross a threshold, the system is forced to collapse into a classical state.
          </p>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-blue-300">Anthropic Principle & Nested Coherence</h4>
          <p className="text-white/80">
            The Anthropic Principle suggests that the universe's properties must be compatible with life. ISRM reframes this as "nested coherence survival," proposing that the universe's parameters are fine-tuned because they are the result of a long history of nested systems successfully maintaining their coherence.
          </p>
        </div>
      </div>
    </div>
  );
};

// ISRM on the Quantum Scale Section
const ISRMQuantumSection = () => {
  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-4">ISRM on the Quantum Scale</h3>
      <div className="space-y-6">
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">
            <HoverSource label="Quantum Mechanics (QM)" source="Born, M. (1926). Zur Quantenmechanik der Stoßvorgänge. Zeitschrift für Physik, 37(12), 863–867." />
          </h4>
          <p className="text-white/80 mb-3">
            <strong>Claim:</strong> Particles exist in a probabilistic wavefunction until measurement collapses it into a definite state.
          </p>
          <p className="text-white/80 mb-3">
            <span className="text-green-300 font-medium">What ISRM agrees with:</span> Prediction and uncertainty are fundamental. Collapse is tied to observation.
          </p>
          <p className="text-white/80 mb-3">
            <span className="text-red-300 font-medium">ISRM critique:</span> No model for why or when collapse happens—just that it does. Observation is treated as an external intervention, not an internal process. No energetic or coherence threshold to explain timing or variability.
          </p>
          <p className="text-white/80">
            <span className="text-green-300 font-medium">ISRM Enhancement:</span> Collapse is a U(t)-driven update event. When predictive error in the system exceeds an energetic and coherence threshold, a discrete update (collapse) occurs. Observation isn’t an external magic—it’s a structural function of coherence failure.
          </p>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">
            <HoverSource label="Decoherence Theory" source="Zurek, W. H. (2003). Rev. Mod. Phys., 75, 715–775." />
          </h4>
          <p className="text-white/80 mb-3">
            <strong>Claim:</strong> Quantum systems appear classical due to entanglement with environment—interference terms vanish, but there’s no "real" collapse.
          </p>
          <p className="text-white/80 mb-3">
            <span className="text-green-300 font-medium">What ISRM agrees with:</span> Entanglement matters. Coherence loss is critical.
          </p>
          <p className="text-white/80 mb-3">
            <span className="text-red-300 font-medium">ISRM critique:</span> Decoherence explains classicality but not subjective experience. Doesn’t say which basis becomes real, or why now.
          </p>
          <p className="text-white/80">
            <span className="text-green-300 font-medium">ISRM Enhancement:</span> ISRM adds a decision function: when decoherence leads to salience + prediction error crossing U(t) threshold, a specific state is selected and made “real.” Collapse is conditional, not inevitable.
          </p>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">
            <HoverSource label="Many Worlds Interpretation (MWI)" source="Everett, H. (1957). 'Relative state' formulation of quantum mechanics. Reviews of Modern Physics, 29(3), 454." />
          </h4>
          <p className="text-white/80 mb-3">
            <strong>Claim:</strong> All possible outcomes exist; we just experience one branch due to splitting of the universe.
          </p>
          <p className="text-white/80 mb-3">
            <span className="text-green-300 font-medium">What ISRM agrees with:</span> Keeps unitary evolution. Avoids magic collapse.
          </p>
          <p className="text-white/80 mb-3">
            <span className="text-red-300 font-medium">ISRM critique:</span> MWI requires infinite branching with no constraint. No model of why a conscious observer follows a specific branch.
          </p>
          <p className="text-white/80">
            <span className="text-green-300 font-medium">ISRM Enhancement:</span> Instead of splitting worlds, ISRM proposes splitting coherence. Only branches that maintain energetic coherence under U(t) can persist. “You” don’t follow one world—you are the OS that remains coherent along one trajectory.
          </p>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">
            <HoverSource label="Quantum Bayesianism (QBism)" source="Fuchs, C. A., Mermin, N. D., & Schack, R. (2014). An introduction to QBism with an application to the locality of quantum mechanics. American Journal of Physics, 82(8), 749-754." />
          </h4>
          <p className="text-white/80 mb-3">
            <strong>Claim:</strong> The wavefunction is subjective—it represents the observer’s belief, not physical reality.
          </p>
          <p className="text-white/80 mb-3">
            <span className="text-green-300 font-medium">What ISRM agrees with:</span> Prediction is observer-dependent. Collapse is informational.
          </p>
          <p className="text-white/80 mb-3">
            <span className="text-red-300 font-medium">ISRM critique:</span> Doesn’t explain where beliefs come from or how they are constrained. No account of why some beliefs are updated and others are suppressed.
          </p>
          <p className="text-white/80">
            <span className="text-green-300 font-medium">ISRM Enhancement:</span> ISRM formalizes belief updating via prediction error under energy budget. Belief isn't arbitrary—it’s energetically justified. Subjective inference becomes adaptive coherence maintenance, not whim.
          </p>
        </div>
      </div>
    </div>
  );
};

// ISRM on the Atomic Scale Section
const ISRMAtomicSection = () => {
  const atomicData = [
    {
      mystery: "Why collapse happens at all",
      explanation: "U(t) threshold from predictive failure",
      source: "von Neumann, J. (1932). Mathematical Foundations of Quantum Mechanics."
    },
    {
      mystery: "Why not all decohered states become real",
      explanation: "Only those with high-enough coherence survive",
      source: "Zurek, W. H. (2003). Rev. Mod. Phys., 75(3), 715–775."
    },
    {
      mystery: "Why atomic orbitals are stable",
      explanation: "They are coherence wells under energy constraint",
      source: "Bohr, N. (1913). On the Constitution of Atoms and Molecules."
    },
    {
      mystery: "Why reactions occur suddenly",
      explanation: "Salience spikes cause forced updates (chemical U(t) > threshold)",
      source: "Arrhenius, S. (1889). On the Reaction Velocity of the Inversion of Cane Sugar by Acids."
    },
    {
      mystery: "Why bonding happens",
      explanation: "Predictive errors resolve better together than apart",
      source: "Pauling, L. (1939). The Nature of the Chemical Bond."
    }
  ];

  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-4">ISRM on the Atomic Scale</h3>
      <p className="text-white/70 mb-6">
        Atoms are typically modeled with Schrödinger’s Equation, electron clouds/probability distributions, and orbital hybridization. These are powerful, but they don’t explain why electrons don’t collapse into the nucleus, they don’t model atomic structure as a dynamic, self-regulating system, and they treat stability as mathematically true, not emergent.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-green-300">ISRM Adds:</h4>
          <ul className="space-y-4 text-white/80">
            <li>
              <strong>Stability as Coherence:</strong> An atom is stable because its internal OS-PS coherence is high. The electron cloud is a probabilistic model, and each orbital is a local minima in prediction error.
            </li>
            <li>
              <strong>Electron Transition = U(t) spike:</strong> Electrons jump orbitals not randomly—but when prediction error or salience crosses threshold. Photon absorption increases U(t), triggering coherent update = transition.
            </li>
            <li>
              <strong>Valence Behavior = Salience Arbitration:</strong> Why atoms form bonds? Because external inputs (other atoms) generate prediction errors that only resolve through shared coherence (bonding).
            </li>
          </ul>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-green-300">Chemical Reactions as ISRM Negotiations</h4>
          <p className="text-white/80 mb-3">
            In traditional chemistry, bonds form due to energy minima and reactions occur when activation energy is overcome. With ISRM:
          </p>
          <ul className="space-y-4 text-white/80">
            <li>Each molecule is a nested OS.</li>
            <li>Reactions occur when combined salience + error + energy exceeds coherence barrier.</li>
            <li>Predictive models update → new stable OS emerges (the product).</li>
          </ul>
        </div>
      </div>
      
      <h4 className="text-lg font-semibold mb-4 text-blue-300">What ISRM Helps Us Understand</h4>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-3 text-left font-medium">Mystery</th>
              <th className="border border-gray-700 px-4 py-3 text-left font-medium">ISRM Explanation</th>
            </tr>
          </thead>
          <tbody>
            {atomicData.map((row, i) => (
              <tr key={i} className="bg-gray-900 group">
                <td className="border border-gray-700 px-4 py-3">
                  <HoverSource label={row.mystery} source={row.source} />
                </td>
                <td className="border border-gray-700 px-4 py-3 text-green-300">{row.explanation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ISRM on the Cellular Scale Section
const ISRMCellularSection = () => {
  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-4">ISRM on the Cellular Scale</h3>
      <p className="text-white/70 mb-6">
        The cell is the fundamental unit of life, where ISRM principles are clearly expressed through metabolism, signaling, and gene regulation. Traditional models often describe these as separate mechanical processes, but ISRM unifies them as a single coherence-seeking system.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-green-300">Astrocytes and Neurons: A Coherence Partnership</h4>
          <p className="text-white/80 mb-3">
            <strong>Traditional View:</strong> Neurons are the primary information processors, while astrocytes provide passive metabolic support.
          </p>
          <p className="text-white/80">
            <span className="text-green-300 font-medium">ISRM Enhancement:</span> The neuron-astrocyte unit is a single ISRM system. Neurons process fast prediction errors (PS), while astrocytes manage the slower, energy-intensive coherence and resource allocation (OS). Astrocytic calcium waves act as a secondary U(t) signal, gating neural activity based on metabolic capacity.
          </p>
        </div>
        
        <div className="bg-gray-900 p-5 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-green-300">Cell State Shifts: Energetic Decisions</h4>
          <p className="text-white/80 mb-3">
            <strong>Traditional View:</strong> Cell differentiation or apoptosis are triggered by specific signaling pathways.
          </p>
          <p className="text-white/80">
            <span className="text-green-300 font-medium">ISRM Enhancement:</span> A cell state shift is a major OS update, only initiated when the U(t) signal (combining external signals, internal state errors, and energy levels) crosses a critical threshold. This explains why cells in identical environments can make different fate decisions based on their internal energetic history.
          </p>
        </div>
      </div>
    </div>
  );
};

const SimulationsSection = () => {
  return (
    <>
      <div className="relative w-full min-h-screen bg-black">
        <video autoPlay muted loop playsInline className="absolute top-20 left-0 w-full h-[80vh] object-cover opacity-10 z-0">
          <source src="/My Movie 1.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 py-16 sm:py-32 px-4 text-center text-white">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 sm:mb-10">Interactionist Self-Regulation Model (ISRM)</h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Understanding adaptation across biological, artificial, and physical systems has long demanded a unifying principle capable of integrating prediction, coherence, and energetic limitation. Here, we introduce the Interactionist Self-Regulation Model (ISRM), a general framework grounded in the energetic cost of state updating under constraint. The model posits that all adaptive systems—whether molecular or cognitive, synthetic or cosmological—operate by modulating a scalar signal:
          </p>

          <ResponsiveEquation />

          <div className="mt-6 text-center">
            <p className="text-base sm:text-lg text-white/80">
              The update occurs when <InlineMath math="U(t) > U_{threshold}" />, where <InlineMath math="U_{threshold}" /> is the system's resistance to change.
            </p>
          </div>
        </div>
      </div>

      <ISRMIntroduction />

      <section className="py-16 sm:py-28 bg-gray-950 text-white border-t border-white/10">
        <div className="container mx-auto px-4 max-w-5xl space-y-16 sm:space-y-20">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">ISRM Simulations</h2>
            <p className="text-base sm:text-lg text-white/70">
              These interactive environments demonstrate how agent models behave under ISRM-based energetic and coherence constraints.
            </p>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">ISRM Ball Avoidance Simulation</h3>
            <p className="text-sm sm:text-base text-white/60 mb-4">
              In this simulation, agents attempt to avoid high-speed obstacle balls. The ISRM agent strategically limits its movement to conserve energy, only reacting when prediction error and salience justify the cost. The Reflex agent responds immediately to threats regardless of energy depletion, while the Stoic agent remains mostly inert.
            </p>
            <BallAvoidanceSim />
          </div>
          
          <CoherentOscillationSim />
          <PerceptualRivalrySim />
          <EcosystemTippingPointSim />

          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">ISRM Ball Feeding Simulation</h3>
            <p className="text-sm sm:text-base text-white/60 mb-4">
              Here, agents seek out food to replenish energy while managing movement costs. The ISRM agent optimizes for energy efficiency and selective engagement. The Reflex agent chases any visible food immediately, burning energy quickly. The Machine Learning agent tracks recent cost-to-reward ratios and adapts strategy accordingly.
            </p>
            <BallFeedingSim />
          </div>

          {/* -------- Theoretical Frameworks -------- */}

          <div className="text-center pt-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Theoretical Frameworks</h2>
            <p className="text-base sm:text-lg text-white/70">
              ISRM provides a new lens for interpreting and extending existing theories across multiple domains.
            </p>
          </div>
          
          <ISRMQuantumSection />
          <ISRMAtomicSection />
          <ISRMCellularSection />
          <TheoryComparisonTable />
          <ISRMCosmosSection />
          <ISRMTimeComparison />
          <AIComparisonSection />
        </div>
      </section>
    </>
  );
};

export default SimulationsSection;
