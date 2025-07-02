import React, { useRef, useEffect, useState } from "react";
import BallAvoidanceSim from "./BallAvoidanceSim";
import BallFeedingSim from "./BallFeedingSim";
import FractalSim from "./FractalSim";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Enhanced hover component for math terms using KaTeX
const HoverMathTerm = ({ math, description }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <span className="inline-block relative">
      <span 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="cursor-help text-blue-300 border-b border-dotted border-blue-300"
      >
        <InlineMath math={math} />
      </span>
      
      {isHovering && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg z-10 w-max max-w-[200px] sm:max-w-[300px] text-center">
          {description}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}
    </span>
  );
};

// Original hover term for non-math elements
const HoverTerm = ({ label, description }) => (
  <span className="relative group cursor-help">
    <span className="underline decoration-dotted text-blue-300 font-bold">{label}</span>
    <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-max max-w-[200px] sm:max-w-xs text-sm bg-black text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-xl text-center">
      {description}
    </span>
  </span>
);

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
    <div className="mt-10 text-center px-2">
      {isMobile ? (
        <div className="flex flex-col gap-2 text-center">
          <BlockMath math="U(t) = (\text{Salience}) \cdot" />
          <BlockMath math="(\text{Energy Budget}) \cdot" />
          <BlockMath math="(\text{Prediction Error})" />
          <div className="text-sm mt-2 text-white/70">Where:</div>
          <BlockMath math="\text{Salience} = \alpha M(t) + \beta \sigma^2(t)" />
          <BlockMath math="\text{Energy} = E_{max} - \gamma \int_0^t U(\tau)d\tau + I(t)" />
          <BlockMath math="\text{Error} = \delta|S_{PS}(t) - S_{OS}(t)|" />
        </div>
      ) : (
        <div className="overflow-x-auto py-4">
          <BlockMath math="U(t)=(\alpha M(t) + \beta \sigma^2(t)) \cdot (E_{max} - \gamma \int_0^t U(\tau)d\tau + I(t)) \cdot \delta|S_{PS}(t) - S_{OS}(t)|" />
        </div>
      )}
    </div>
  );
};

// ISRM Introduction Section
const ISRMIntroduction = () => {
  return (
    <div className="py-16 bg-gray-900 text-white border-y border-white/10">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Introduction to ISRM</h2>
        
        <div className="space-y-12">
          {/* Core Concept */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-300">The Fundamental Duality</h3>
            <p className="text-sm sm:text-base text-white/80 mb-4">
              At its core, the Interactionist Self-Regulation Model (ISRM) proposes that all complex adaptive systems—from single cells to human brains, from quantum particles to financial markets—operate through a fundamental duality:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-800/50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="text-lg font-semibold mb-2 text-blue-300">Observer System (OS)</h4>
                <p className="text-sm sm:text-base text-white/80">
                  The Observer System is the system's internal <em>model</em> of reality—its simplified, predictive representation of itself and its environment. This is the story the system tells itself about what is happening and what will happen next.
                </p>
                <div className="mt-4 text-sm">
                  <div className="flex items-start mb-2">
                    <span className="text-blue-400 mr-2 mt-1">•</span>
                    <span>In a <strong>brain</strong>, the OS is your conscious experience and expectations.</span>
                  </div>
                  <div className="flex items-start mb-2">
                    <span className="text-blue-400 mr-2 mt-1">•</span>
                    <span>In a <strong>market</strong>, the OS is the prevailing price consensus and narrative.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1">•</span>
                    <span>In a <strong>particle</strong>, the OS is its inertial tendency to maintain its current state.</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="text-lg font-semibold mb-2 text-green-300">Physical System (PS)</h4>
                <p className="text-sm sm:text-base text-white/80">
                  The Physical System is the raw, unfiltered, high-dimensional data stream of reality. It represents the "ground truth" of what is actually happening, regardless of what the OS expects or believes.
                </p>
                <div className="mt-4 text-sm">
                  <div className="flex items-start mb-2">
                    <span className="text-green-400 mr-2 mt-1">•</span>
                    <span>In a <strong>brain</strong>, the PS is the full sensory input stream from your body and environment.</span>
                  </div>
                  <div className="flex items-start mb-2">
                    <span className="text-green-400 mr-2 mt-1">•</span>
                    <span>In a <strong>market</strong>, the PS is the real-time firehose of all trades, news, and economic data.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">•</span>
                    <span>In a <strong>particle</strong>, the PS is the chaotic bombardment by surrounding molecules or fields.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* The Interaction Process */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-300">The ISRM Loop: How OS and PS Interact</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-800/50 p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">1</div>
                  <h4 className="font-semibold text-white">Prediction</h4>
                </div>
                <p className="text-sm text-white/80">
                  The OS makes a prediction about what will happen in the next moment, based on its current model of reality. This prediction is a simplified, low-energy representation.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">2</div>
                  <h4 className="font-semibold text-white">Comparison</h4>
                </div>
                <p className="text-sm text-white/80">
                  The PS provides the actual data of what occurs. The system compares this raw reality against its prediction, calculating the difference as a <strong>Prediction Error</strong>.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">3</div>
                  <h4 className="font-semibold text-white">Arbitration</h4>
                </div>
                <p className="text-sm text-white/80">
                  The system performs <strong>Energetic Arbitration</strong> on this error. Is it important enough (Salience) and does the system have enough energy (Energy Budget) to justify a costly update?
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center my-4">
              <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-2">
              <div className="bg-gray-800/50 p-5 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">4</div>
                  <h4 className="font-semibold text-white">The Decision Point</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm mb-3 font-medium text-yellow-300">IF U(t) &lt; U_threshold:</p>
                    <p className="text-sm text-white/80 border-l-2 border-yellow-500 pl-3">
                      The error is ignored or filtered. The OS maintains its current model, preserving energy but potentially accumulating error over time. Most errors fall into this category.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm mb-3 font-medium text-green-300">IF U(t) > U_threshold:</p>
                    <p className="text-sm text-white/80 border-l-2 border-green-500 pl-3">
                      An <strong>Update Event</strong> occurs. The system spends significant energy to update its OS, aligning it with the PS data. This is what we experience as a moment of consciousness or a state change.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Coherence */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-300">Coherence: The Core Metric</h3>
            <p className="text-sm sm:text-base text-white/80 mb-6">
              Coherence is the degree of alignment between the OS and PS—between expectation and reality. It is what all ISRM systems strive to maintain, though always under energetic constraint:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-5 rounded-lg border-t-2 border-red-500">
                <h4 className="font-semibold mb-2 text-red-300">Low Coherence</h4>
                <p className="text-sm text-white/80">
                  When OS and PS are severely misaligned, the system experiences high prediction error. This state is energetically expensive to maintain and often leads to a major update or breakdown.
                </p>
                <p className="text-sm mt-2 italic text-white/60">
                  Examples: Cognitive dissonance, market crash, quantum collapse
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-5 rounded-lg border-t-2 border-yellow-500">
                <h4 className="font-semibold mb-2 text-yellow-300">Medium Coherence</h4>
                <p className="text-sm text-white/80">
                  A dynamic balance of minor errors and updates. The system maintains moderate energy expenditure while adapting to changing conditions. This is the typical operational state.
                </p>
                <p className="text-sm mt-2 italic text-white/60">
                  Examples: Normal consciousness, stable market, chemical equilibrium
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-5 rounded-lg border-t-2 border-green-500">
                <h4 className="font-semibold mb-2 text-green-300">High Coherence</h4>
                <p className="text-sm text-white/80">
                  When OS perfectly predicts PS, prediction error is zero. This rare state is energetically efficient but often temporary in complex environments. It's experienced as "flow."
                </p>
                <p className="text-sm mt-2 italic text-white/60">
                  Examples: Flow state, perfect market efficiency, ground state of an atom
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-base sm:text-lg font-medium text-blue-300">
            ISRM provides a unified framework for understanding adaptation, stability, and change across all complex systems.
          </p>
          <p className="text-sm sm:text-base text-white/70 mt-2">
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
      
      requestAnimationFrame(draw);
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

// AI Comparison Section Component
const AIComparisonSection = () => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Current AI vs. ISRM 2.0 – The Structural Upgrade</h3>
      
      <p className="text-white/70 mb-8 text-sm sm:text-base">
        Most current AI systems—no matter how large or well-trained—operate as <strong>monolithic predictors</strong>. 
        They receive input, calculate a response based on learned patterns, and output that result. 
        What they <em>lack</em> is a structural mechanism for handling uncertainty, internal contradiction, 
        or resource constraints in real time.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-12">
        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-blue-900/30">
          <h4 className="text-lg sm:text-xl font-bold mb-4 text-blue-400 flex items-center">
            <span className="mr-2 text-xl sm:text-2xl">🔁</span> Classical AI
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
            <span className="mr-2 text-xl sm:text-2xl">🧠</span> ISRM 2.0: Adaptive, Multi-OS Intelligence
          </h4>
          <p className="mb-4 text-white/70 text-sm sm:text-base">
            ISRM 2.0 replaces the "single mind" with a <strong>stacked, modular mind</strong>—multiple, 
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
            ISRM 2.0 behaves like a parliament of predictive minds, not a dictator of one.
          </p>
        </div>
      </div>
      
      <h4 className="text-lg sm:text-xl font-semibold mb-4 text-blue-300 flex items-center">
        <span className="mr-3 text-xl">🧩</span> Core Differences
      </h4>
      
      <div className="overflow-x-auto mb-12 pb-2">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-left">Feature</th>
              <th className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-left">Classical AI</th>
              <th className="border border-gray-700 px-2 sm:px-4 py-2 sm:py-3 text-left">ISRM 2.0 Framework</th>
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
        <span className="mr-3 text-xl">🚀</span> Why ISRM Is Superior
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
            Each OS can be logged and visualized, making ISRM systems inherently auditable.
          </p>
        </div>
        
        <div className="bg-gray-900 p-4 sm:p-5 rounded-lg border border-green-900/30">
          <h5 className="font-bold mb-2 text-green-400">Emergence</h5>
          <p className="text-white/70 text-sm sm:text-base">
            Narrative selves, trauma patterns, creativity—all arise from the tension and harmony of nested OSs.
          </p>
        </div>
      </div>
      
      <p className="text-lg sm:text-xl text-center font-medium text-green-400 mt-8 sm:mt-10 mb-8 sm:mb-10">
        Classical AI gives you an answer. ISRM 2.0 gives you a mind.
      </p>
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

          {/* Enhanced KaTeX Equation with mobile responsiveness */}
          <ResponsiveEquation />

          <div className="mt-6 text-xs sm:text-sm grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 max-w-3xl mx-auto text-left px-2">
            <div className="flex items-center">
              <span className="w-10 sm:w-12 text-blue-300"><InlineMath math="\alpha, \beta" /></span>
              <span className="text-white/80">Salience parameters</span>
            </div>
            <div className="flex items-center">
              <span className="w-10 sm:w-12 text-blue-300"><InlineMath math="M(t)" /></span>
              <span className="text-white/80">Magnitude of signal</span>
            </div>
            <div className="flex items-center">
              <span className="w-10 sm:w-12 text-blue-300"><InlineMath math="\sigma^2(t)" /></span>
              <span className="text-white/80">Variance/novelty of signal</span>
            </div>
            <div className="flex items-center">
              <span className="w-10 sm:w-12 text-blue-300"><InlineMath math="E_{max}" /></span>
              <span className="text-white/80">Maximum energy capacity</span>
            </div>
            <div className="flex items-center">
              <span className="w-10 sm:w-12 text-blue-300"><InlineMath math="\gamma" /></span>
              <span className="text-white/80">Energy cost per update</span>
            </div>
            <div className="flex items-center">
              <span className="w-10 sm:w-12 text-blue-300"><InlineMath math="I(t)" /></span>
              <span className="text-white/80">Energy input over time</span>
            </div>
            <div className="flex items-center">
              <span className="w-10 sm:w-12 text-blue-300"><InlineMath math="\delta" /></span>
              <span className="text-white/80">Error sensitivity</span>
            </div>
            <div className="flex items-center">
              <span className="w-10 sm:w-12 text-blue-300"><InlineMath math="S_{PS}, S_{OS}" /></span>
              <span className="text-white/80">Physical and Observer systems</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-base sm:text-lg text-white/80">
              The update occurs when <InlineMath math="U(t) > U_{threshold}" />, where <InlineMath math="U_{threshold}" /> is the system's resistance to change.
            </p>
          </div>
        </div>
      </div>

      {/* New Introduction Section */}
      <ISRMIntroduction />

      <section className="py-16 sm:py-28 bg-gray-950 text-white border-t border-white/10">
        <div className="container mx-auto px-4 max-w-5xl space-y-16 sm:space-y-20">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">ISRM Simulations</h2>
            <p className="text-base sm:text-lg text-white/70">
              These interactive environments demonstrate how agent models behave under ISRM-based energetic and coherence constraints.
            </p>
          </div>

          {/* Perceptual Rivalry Simulation - NEW */}
          <PerceptualRivalrySim />

          {/* Original Ball Avoidance Simulation */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">ISRM Ball Avoidance Simulation</h3>
            <p className="text-sm sm:text-base text-white/60 mb-4">
              In this simulation, agents attempt to avoid high-speed obstacle balls. The ISRM agent strategically limits its movement to conserve energy, only reacting when prediction error and salience justify the cost. The Reflex agent responds immediately to threats regardless of energy depletion, while the Stoic agent remains mostly inert.
            </p>
            <BallAvoidanceSim />
          </div>
          
          {/* Original Fractal Simulation */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">ISRM Fractal Coherence Simulation</h3>
            <p className="text-sm sm:text-base text-white/60 mb-4">
              This simulation visualizes recursive self-regulation through a dynamic fractal lattice. Each branch adapts based on coherence, prediction error, and energetic constraint. Touch it—watch how it remembers, decays, and reforms.
            </p>
            <FractalSim />
          </div>

          {/* Original Ball Feeding Simulation */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">ISRM Ball Feeding Simulation</h3>
            <p className="text-sm sm:text-base text-white/60 mb-4">
              Here, agents seek out food to replenish energy while managing movement costs. The ISRM agent optimizes for energy efficiency and selective engagement. The Reflex agent chases any visible food immediately, burning energy quickly. The Machine Learning agent tracks recent cost-to-reward ratios and adapts strategy accordingly.
            </p>
            <BallFeedingSim />
          </div>
          
          {/* AI Comparison Section - NEW */}
          <AIComparisonSection />
        </div>
      </section>
    </>
  );
};

export default SimulationsSection;