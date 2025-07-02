import React, { useEffect, useRef } from 'react';

const FractalSim = () => {
  const canvasRef = useRef(null);
  const fractalRef = useRef(null);

  useEffect(() => {
    class FractalNode {
      constructor(depth, angle, position, branchLength = 100) {
        this.depth = depth;
        this.angle = angle;
        this.position = position;
        this.branchLength = branchLength * (0.9 - (Math.random() * 0.1));
        
        // ISRM parameters with slower decay rates
        this.prediction = 0.5;
        this.coherence = 1.0;
        this.energy = 1.0;
        this.salience = 0.0;
        
        // Growth tracking
        this.growthActivity = 0;
        this.lastGrowthFrame = 0;
        this.isVisible = false;
        this.activeState = 1.0; // New parameter to track overall activity (0-1)
        
        this.children = [];
        
        // Pre-calculate endpoint for efficiency
        const radians = this.angle * Math.PI / 180;
        this.endX = this.position.x + Math.cos(radians) * this.branchLength;
        this.endY = this.position.y + Math.sin(radians) * this.branchLength;
        this.endPosition = { x: this.endX, y: this.endY };
      }

      update(inputSignal) {
        // Calculate prediction error (difference between model and reality)
        const error = Math.abs(this.prediction - inputSignal);
        
        // Update salience based on prediction error (with temporal smoothing)
        this.salience = this.salience * 0.95 + error * 0.05;
        
        // ISRM update signal: U(t) = error - energyCost + salience
        const energyCost = 1 - this.energy;
        const updateSignal = error - energyCost + this.salience;
        
        // Only update when signal exceeds threshold (Energetic Arbitration)
        if (updateSignal > 0.3) {
          // Update prediction toward input signal
          this.prediction += 0.1 * (inputSignal - this.prediction);
          
          // Coherence decreases with error but more slowly
          this.coherence = Math.max(0.2, this.coherence - error * 0.05);
          
          // Energy consumption is reduced
          this.energy = Math.max(0.3, this.energy - 0.03);
        } else {
          // Very slight coherence decay even without update
          this.coherence = Math.max(0.2, this.coherence - 0.005);
          
          // Prediction drifts slightly toward baseline
          this.prediction += 0.005 * (0.5 - this.prediction);
        }
        
        // Energy recovery over time - faster recovery
        this.energy = Math.min(1.0, this.energy + 0.015);
        
        // Decay growth activity more slowly
        this.growthActivity *= 0.98;
        
        // Update active state - this controls visibility and participation
        // Keep nodes active longer
        this.activeState = Math.max(0.3, this.activeState * 0.995);
        
        // Propagate update to children with filtered signal
        this.children.forEach(child => {
          // Children receive a filtered version of the input signal
          const childSignal = 0.8 * this.prediction + 0.2 * inputSignal;
          child.update(childSignal);
        });
      }

      draw(ctx, camera) {
        // Skip drawing if node is mostly inactive
        if (this.activeState < 0.1) {
          return;
        }
        
        // Apply culling with safety margins proportional to zoom
        const startX = this.position.x * camera.zoom + camera.offsetX;
        const startY = this.position.y * camera.zoom + camera.offsetY;
        const endX = this.endX * camera.zoom + camera.offsetX;
        const endY = this.endY * camera.zoom + camera.offsetY;

        // Use a more generous buffer for culling at high zoom levels
        const bufferSize = Math.max(100, this.branchLength * camera.zoom * 2);
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        
        // More permissive culling to ensure visibility at high zoom
        if (
          (endX < -bufferSize && startX < -bufferSize) ||
          (endX > canvasWidth + bufferSize && startX > canvasWidth + bufferSize) ||
          (endY < -bufferSize && startY < -bufferSize) ||
          (endY > canvasHeight + bufferSize && startY > canvasHeight + bufferSize)
        ) {
          // Skip drawing if completely outside view
          this.isVisible = false;
          return;
        }
        
        this.isVisible = true;
        
        // Set line style based on ISRM parameters
        ctx.strokeStyle = this.getColor();
        
        // Non-linear line width scaling based on zoom - prevents too thin or too thick lines
        const zoomScaleFactor = Math.log10(camera.zoom + 1) + 1;
        const baseWidth = this.getLineWidth();
        const scaledWidth = baseWidth * zoomScaleFactor;
        
        // Apply active state to line width (fade out inactive nodes)
        const activeWidth = scaledWidth * this.activeState;
        
        // Clamp width to reasonable bounds
        ctx.lineWidth = Math.max(0.5, Math.min(15, activeWidth));
        
        // Draw branch
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Highlight active growth nodes
        if (this.growthActivity > 0.5) {
          const glowSize = this.growthActivity * 10 * zoomScaleFactor;
          ctx.fillStyle = `rgba(255, 255, 255, ${this.growthActivity * 0.5 * this.activeState})`;
          ctx.beginPath();
          ctx.arc(endX, endY, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Draw children
        this.children.forEach(child => child.draw(ctx, camera));
      }
      
      // Check if node is in the current view with a wider margin for high zoom
      isInView(camera, canvas) {
        const endX = this.endX * camera.zoom + camera.offsetX;
        const endY = this.endY * camera.zoom + camera.offsetY;
        
        // More generous margin for high zoom levels
        const zoomMargin = Math.max(200, camera.zoom * 100);
        
        return (
          endX >= -zoomMargin && 
          endX <= canvas.width + zoomMargin && 
          endY >= -zoomMargin && 
          endY <= canvas.height + zoomMargin
        );
      }

      getColor() {
        // Blend between red (0), yellow (60), and green (120) based on coherence
        const hue = Math.min(120, this.coherence * 180);
        
        // Make the brightness responsive to prediction
        const lightness = 25 + this.prediction * 50;
        
        // Enhance the saturation response to energy
        const saturation = 70 + this.energy * 30;
        
        // Apply active state to color opacity
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.max(0.1, this.activeState)})`;
      }

      getLineWidth() {
        // Base width decreases with depth
        const baseWidth = Math.max(0.5, 4 - this.depth * 0.4);
        
        // Adjust by energy and coherence
        return baseWidth * (0.5 + this.energy * 0.5) * (0.5 + this.coherence * 0.5);
      }
    }

    class ReactiveFractal {
      constructor(canvas, maxDepth = 9) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.maxDepth = maxDepth;
        this.inputSignal = 0.5;
        this.inputHistory = [];
        this.lastUpdateTime = 0;
        this.isRunning = false;
        this.totalNodes = 0;
        this.frameCount = 0;
        this.pulse = null;
        
        // Growth tracking variables
        this.lastNodeCount = 0;
        this.stallCounter = 0;
        this.growthDirectionAngle = -90; // Default growth direction (upward)
        this.visibleNodeCount = 0;
        this.activeNodeCount = 0;
        
        // Camera/zoom state
        this.camera = {
          zoom: 1.0,
          targetZoom: 1.0,
          zoomSpeed: 0.1,
          offsetX: 0,
          offsetY: 0,
          targetOffsetX: 0,
          targetOffsetY: 0,
          panSpeed: 0.1,
          zoomPoint: { x: 0, y: 0 },
          isDragging: false,
          dragStart: { x: 0, y: 0 }
        };
        
        // Initialize the canvas and create initial fractal structure
        this.resizeCanvas();
        
        // Set up event listeners
        window.addEventListener('resize', this.handleResize);
        this.setupMouseTracking();
      }
      
      handleResize = () => {
        this.resizeCanvas();
      }

      resizeCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Position root node higher on the canvas
        const startPos = { 
          x: this.canvas.width / 2, 
          y: this.canvas.height * 0.7  
        };
        
        // Create a substantial initial branch
        const initialBranchLength = Math.min(this.canvas.height * 0.25, 250);
        
        // Create the root node
        this.rootNode = new FractalNode(
          this.maxDepth, 
          -90, // Growing upward
          startPos, 
          initialBranchLength
        );
        
        this.totalNodes = 1;
        
        // Build initial fractal with multiple levels
        this.buildInitialStructure(this.rootNode, 0, 4);
        
        // Force immediate growth to create a substantial initial fractal
        this.forceGrowToDepth(5);
        
        // Reset camera position on resize
        this.camera.offsetX = 0;
        this.camera.offsetY = 0;
        this.camera.targetOffsetX = 0;
        this.camera.targetOffsetY = 0;
      }
      
      buildInitialStructure(node, currentDepth, initialDepth) {
        if (node.depth <= 0 || currentDepth >= initialDepth) {
          return;
        }
        
        // Calculate branch parameters
        const angleSpread = 25 + (1 - node.coherence) * 15;
        const childLength = node.branchLength * (0.7 + node.energy * 0.2);
        
        // Create left and right branches
        const child1 = new FractalNode(
          node.depth - 1,
          node.angle + angleSpread,
          node.endPosition,
          childLength
        );
        
        const child2 = new FractalNode(
          node.depth - 1,
          node.angle - angleSpread,
          node.endPosition,
          childLength
        );
        
        // Add children to node
        node.children.push(child1, child2);
        this.totalNodes += 2;
        
        // Occasionally add a middle branch for more complexity
        if (Math.random() < 0.2 && node.depth > 2) {
          const middleAngle = node.angle + (Math.random() * 10 - 5);
          const middleBranch = new FractalNode(
            node.depth - 1,
            middleAngle,
            node.endPosition,
            childLength * 0.85
          );
          node.children.push(middleBranch);
          this.totalNodes++;
        }
        
        // Recursively build structure for children
        this.buildInitialStructure(child1, currentDepth + 1, initialDepth);
        this.buildInitialStructure(child2, currentDepth + 1, initialDepth);
      }
      
      forceGrowToDepth(targetDepth) {
        let currentDepth = 0;
        let moreToGrow = true;
        
        while (moreToGrow && currentDepth < targetDepth) {
          moreToGrow = this.growFractalOneLevel();
          currentDepth++;
        }
      }
      
      // Count active nodes in the scene
      countActiveNodes(node) {
        // Count this node if it's active
        let count = node.activeState > 0.3 ? 1 : 0;
        
        // Add counts from children
        for (const child of node.children) {
          count += this.countActiveNodes(child);
        }
        
        return count;
      }
      
      // Count visible nodes in the scene
      countVisibleNodes(node) {
        let count = node.isVisible ? 1 : 0;
        for (const child of node.children) {
          count += this.countVisibleNodes(child);
        }
        return count;
      }
      
      refreshLeafNodes(leafNodes) {
        // Count how many nodes we'll refresh
        const refreshCount = Math.min(40, Math.floor(leafNodes.length * 0.25));
        
        if (refreshCount === 0) return false;
        
        // Filter for visible nodes first, if none then use all
        let visibleNodes = leafNodes.filter(node => 
          node.isInView(this.camera, this.canvas)
        );
        
        // If we have no visible nodes, use any nodes
        const nodesToConsider = visibleNodes.length > 0 ? visibleNodes : leafNodes;
        
        // Sort by energy and coherence to find the healthiest nodes
        const healthyNodes = nodesToConsider
          .filter(node => node.energy > 0.3 && node.coherence > 0.2)
          .sort((a, b) => (b.energy + b.coherence) - (a.energy + a.coherence))
          .slice(0, refreshCount);
        
        if (healthyNodes.length === 0) {
          // If no healthy nodes found, refresh random nodes as a fallback
          const randomNodes = nodesToConsider
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.min(10, nodesToConsider.length));
            
          // Revitalize them first
          randomNodes.forEach(node => {
            node.energy = Math.min(1.0, node.energy + 0.5);
            node.coherence = Math.min(1.0, node.coherence + 0.5);
            node.activeState = 1.0;
            node.depth = Math.min(3, node.depth + 2);
          });
          
          return randomNodes.length > 0;
        }
        
        // Refresh the depth of healthy nodes
        healthyNodes.forEach(node => {
          // Set a more generous depth at higher zoom levels
          const zoomFactor = Math.min(3, Math.max(1, this.camera.zoom));
          node.depth = Math.min(4, node.depth + Math.ceil(zoomFactor));
          
          // Also revitalize the node
          node.energy = Math.min(1.0, node.energy + 0.3);
          node.coherence = Math.min(1.0, node.coherence + 0.3);
          node.activeState = 1.0;
        });
        
        return healthyNodes.length > 0;
      }
      
      growFractalOneLevel() {
        // Find all leaf nodes
        const leafNodes = this.findLeafNodes(this.rootNode);
        
        // Only grow nodes that still have depth remaining and are sufficiently active
        let nodesToGrow = leafNodes.filter(node => 
          node.depth > 0 && 
          node.children.length === 0 && 
          node.activeState > 0.5
        );
        
        // Check visible node count and prioritize visible area if needed
        this.visibleNodeCount = this.countVisibleNodes(this.rootNode);
        this.activeNodeCount = this.countActiveNodes(this.rootNode);
        
        // If very few visible nodes, focus strongly on visible area
        const zoomFactor = Math.min(5, Math.max(1, this.camera.zoom));
        if (this.visibleNodeCount < 100 * zoomFactor) {
          const visibleNodes = nodesToGrow.filter(node => 
            node.isInView(this.camera, this.canvas)
          );
          
          // If we have visible nodes, prioritize them
          if (visibleNodes.length > 0) {
            nodesToGrow = visibleNodes;
          }
        }
        
        // Check if growth is stalling
        if (nodesToGrow.length === 0) {
          // Track stall state
          if (this.totalNodes === this.lastNodeCount) {
            this.stallCounter++;
          } else {
            this.stallCounter = 0;
            this.lastNodeCount = this.totalNodes;
          }
          
          // If stalled for multiple frames, refresh leaf nodes
          if (this.stallCounter > 3) {
            if (this.refreshLeafNodes(leafNodes)) {
              // Find new nodes to grow after refresh
              nodesToGrow = this.findLeafNodes(this.rootNode)
                .filter(node => 
                  node.depth > 0 && 
                  node.children.length === 0 && 
                  node.activeState > 0.5
                );
              
              // Prioritize visible nodes again
              if (this.camera.zoom > 1.5) {
                const visibleNodes = nodesToGrow.filter(node => 
                  node.isInView(this.camera, this.canvas)
                );
                if (visibleNodes.length > 0) {
                  nodesToGrow = visibleNodes;
                }
              }
              
              this.stallCounter = 0;
              return true;
            }
          }
          
          return false;
        } else {
          // Reset stall counter if we have nodes to grow
          this.stallCounter = 0;
          this.lastNodeCount = this.totalNodes;
        }
        
        // Process nodes in chunks
        const chunkSize = 20;
        let nodesProcessed = 0;
        let newNodesCreated = 0;
        
        while (nodesProcessed < nodesToGrow.length) {
          const chunk = nodesToGrow.slice(nodesProcessed, nodesProcessed + chunkSize);
          
          chunk.forEach(node => {
            // Skip if this node already has children
            if (node.children.length > 0) return;
            
            // Calculate branch parameters
            const angleSpread = 25 + (1 - node.coherence) * 15;
            const childLength = node.branchLength * (0.7 + node.energy * 0.2);
            
            // Create left and right branches
            const child1 = new FractalNode(
              node.depth - 1,
              node.angle + angleSpread,
              node.endPosition,
              childLength
            );
            
            const child2 = new FractalNode(
              node.depth - 1,
              node.angle - angleSpread,
              node.endPosition,
              childLength
            );
            
            // Add children to node
            node.children.push(child1, child2);
            this.totalNodes += 2;
            newNodesCreated += 2;
            
            // Record growth activity
            node.growthActivity = 1.0;
            node.activeState = 1.0;
            node.lastGrowthFrame = this.frameCount;
            
            // Update growth direction
            this.growthDirectionAngle = node.angle;
            
            // Occasionally add a middle branch for more complexity
            if (Math.random() < 0.2 && node.depth > 1) {
              const middleAngle = node.angle + (Math.random() * 10 - 5);
              const middleBranch = new FractalNode(
                node.depth - 1,
                middleAngle,
                node.endPosition,
                childLength * 0.85
              );
              node.children.push(middleBranch);
              this.totalNodes++;
              newNodesCreated++;
            }
          });
          
          nodesProcessed += chunk.length;
        }
        
        return newNodesCreated > 0;
      }
      
      findLeafNodes(node, leafNodes = []) {
        if (node.children.length === 0) {
          leafNodes.push(node);
        } else {
          node.children.forEach(child => this.findLeafNodes(child, leafNodes));
        }
        return leafNodes;
      }

      setupMouseTracking() {
        if (!this.canvas) return;
        
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        this.canvas.addEventListener('click', this.handleClick);
        this.canvas.addEventListener('wheel', this.handleWheel);
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.canvas.addEventListener('mouseleave', this.handleMouseUp);
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', this.handleTouchStart);
        this.canvas.addEventListener('touchmove', this.handleTouchMove);
        this.canvas.addEventListener('touchend', this.handleTouchEnd);
      }
      
      handleMouseMove = (e) => {
        const relativeX = e.clientX / this.canvas.width;
        this.inputHistory.push(relativeX);
        if (this.inputHistory.length > 10) this.inputHistory.shift();
        this.inputSignal = this.inputHistory.reduce((sum, val) => sum + val, 0) / this.inputHistory.length;
        
        // Handle dragging for manual panning
        if (this.camera.isDragging) {
          const dx = e.clientX - this.camera.dragStart.x;
          const dy = e.clientY - this.camera.dragStart.y;
          
          this.camera.targetOffsetX = this.camera.offsetX + dx;
          this.camera.targetOffsetY = this.camera.offsetY + dy;
        }
      }
      
      handleClick = (e) => {
        // Only register as click if not dragging
        if (!this.camera.isDragging || 
            (Math.abs(e.clientX - this.camera.dragStart.x) < 5 && 
             Math.abs(e.clientY - this.camera.dragStart.y) < 5)) {
          
          // Convert click position to fractal space
          const fractalX = (e.clientX - this.camera.offsetX) / this.camera.zoom;
          const fractalY = (e.clientY - this.camera.offsetY) / this.camera.zoom;
          
          // Revitalize the fractal (boost energy and coherence)
          this.revitalizeFractal(this.rootNode);
          
          // Create a visual pulse effect
          this.pulse = {
            x: e.clientX,
            y: e.clientY,
            radius: 10,
            opacity: 1.0,
            maxRadius: Math.max(this.canvas.width, this.canvas.height) * 0.2
          };
          
          // Set this as the new center for future zooms
          this.camera.zoomPoint = { x: e.clientX, y: e.clientY };
        }
      }
      
      handleMouseDown = (e) => {
        this.camera.isDragging = true;
        this.camera.dragStart = { x: e.clientX, y: e.clientY };
      }
      
      handleMouseUp = () => {
        if (this.camera.isDragging) {
          this.camera.offsetX = this.camera.targetOffsetX;
          this.camera.offsetY = this.camera.targetOffsetY;
          this.camera.isDragging = false;
        }
      }
      
      handleWheel = (e) => {
        e.preventDefault();
        
        // Set zoom point to mouse position
        this.camera.zoomPoint = { x: e.clientX, y: e.clientY };
        
        // Calculate zoom delta - smaller steps for more control
        const zoomDelta = -e.deltaY * 0.001;
        const newZoom = Math.max(0.1, Math.min(50, this.camera.targetZoom * (1 + zoomDelta)));
        
        if (newZoom !== this.camera.targetZoom) {
          // Calculate how coordinates will shift due to zoom
          const zoomRatio = newZoom / this.camera.targetZoom;
          
          // Current position in fractal space
          const fractalX = (this.camera.zoomPoint.x - this.camera.targetOffsetX) / this.camera.targetZoom;
          const fractalY = (this.camera.zoomPoint.y - this.camera.targetOffsetY) / this.camera.targetZoom;
          
          // New offset to keep mouse point stationary
          this.camera.targetOffsetX = this.camera.zoomPoint.x - fractalX * newZoom;
          this.camera.targetOffsetY = this.camera.zoomPoint.y - fractalY * newZoom;
          
          // Set new target zoom
          this.camera.targetZoom = newZoom;
        }
      }
      
      // Touch handlers for mobile zooming
      handleTouchStart = (e) => {
        if (e.touches.length === 1) {
          // Single touch - start drag
          this.camera.isDragging = true;
          this.camera.dragStart = { 
            x: e.touches[0].clientX, 
            y: e.touches[0].clientY 
          };
        } else if (e.touches.length === 2) {
          // Double touch - start pinch zoom
          this.camera.isDragging = false;
          
          // Calculate midpoint between touches
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          this.camera.zoomPoint = {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2
          };
          
          // Calculate initial distance for pinch reference
          this.initialPinchDistance = Math.hypot(
            touch1.clientX - touch2.clientX,
            touch1.clientY - touch2.clientY
          );
        }
        
        // Update input signal
        if (e.touches.length === 1) {
          const relativeX = e.touches[0].clientX / this.canvas.width;
          this.inputSignal = relativeX;
        }
      }
      
      handleTouchMove = (e) => {
        e.preventDefault();
        
        if (e.touches.length === 1 && this.camera.isDragging) {
          // Single touch - handle drag
          const dx = e.touches[0].clientX - this.camera.dragStart.x;
          const dy = e.touches[0].clientY - this.camera.dragStart.y;
          
          this.camera.targetOffsetX = this.camera.offsetX + dx;
          this.camera.targetOffsetY = this.camera.offsetY + dy;
        } else if (e.touches.length === 2 && this.initialPinchDistance) {
          // Double touch - handle pinch zoom
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          
          // Calculate new midpoint
          const midpoint = {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2
          };
          
          // Calculate new distance
          const currentDistance = Math.hypot(
            touch1.clientX - touch2.clientX,
            touch1.clientY - touch2.clientY
          );
          
          // Calculate zoom change
          const zoomRatio = currentDistance / this.initialPinchDistance;
          
          // Update zoom point
          this.camera.zoomPoint = midpoint;
          
          // Calculate new zoom level
          const newZoom = Math.max(0.1, Math.min(50, this.camera.targetZoom * zoomRatio));
          
          // Current position in fractal space
          const fractalX = (this.camera.zoomPoint.x - this.camera.targetOffsetX) / this.camera.targetZoom;
          const fractalY = (this.camera.zoomPoint.y - this.camera.targetOffsetY) / this.camera.targetZoom;
          
          // New offset to keep midpoint stationary
          this.camera.targetOffsetX = this.camera.zoomPoint.x - fractalX * newZoom;
          this.camera.targetOffsetY = this.camera.zoomPoint.y - fractalY * newZoom;
          
          // Set new target zoom
          this.camera.targetZoom = newZoom;
          
          // Update reference distance
          this.initialPinchDistance = currentDistance;
        }
      }
      
      handleTouchEnd = () => {
        // Finalize any dragging
        if (this.camera.isDragging) {
          this.camera.offsetX = this.camera.targetOffsetX;
          this.camera.offsetY = this.camera.targetOffsetY;
          this.camera.isDragging = false;
        }
        
        // Reset pinch zoom reference
        this.initialPinchDistance = null;
      }

      revitalizeFractal(node) {
        // Stronger revitalization to keep more nodes active
        node.energy = Math.min(1.0, node.energy + 0.4);
        node.coherence = Math.min(1.0, node.coherence + 0.3);
        node.activeState = 1.0;
        node.children.forEach(child => this.revitalizeFractal(child));
      }

      start() {
        if (!this.isRunning) {
          this.isRunning = true;
          this.lastUpdateTime = performance.now();
          this.animate();
        }
      }
      
      stop() {
        this.isRunning = false;
        
        // Clean up event listeners
        window.removeEventListener('resize', this.handleResize);
        if (this.canvas) {
          this.canvas.removeEventListener('mousemove', this.handleMouseMove);
          this.canvas.removeEventListener('click', this.handleClick);
          this.canvas.removeEventListener('wheel', this.handleWheel);
          this.canvas.removeEventListener('mousedown', this.handleMouseDown);
          this.canvas.removeEventListener('mouseup', this.handleMouseUp);
          this.canvas.removeEventListener('mouseleave', this.handleMouseUp);
          this.canvas.removeEventListener('touchstart', this.handleTouchStart);
          this.canvas.removeEventListener('touchmove', this.handleTouchMove);
          this.canvas.removeEventListener('touchend', this.handleTouchEnd);
        }
      }

      updateCamera() {
        // Apply smooth transitions for zoom and pan
        if (this.camera.zoom !== this.camera.targetZoom) {
          this.camera.zoom += (this.camera.targetZoom - this.camera.zoom) * this.camera.zoomSpeed;
          
          // Snap to target if very close
          if (Math.abs(this.camera.zoom - this.camera.targetZoom) < 0.001) {
            this.camera.zoom = this.camera.targetZoom;
          }
        }
        
        if (this.camera.offsetX !== this.camera.targetOffsetX) {
          this.camera.offsetX += (this.camera.targetOffsetX - this.camera.offsetX) * this.camera.panSpeed;
          
          // Snap to target if very close
          if (Math.abs(this.camera.offsetX - this.camera.targetOffsetX) < 0.5) {
            this.camera.offsetX = this.camera.targetOffsetX;
          }
        }
        
        if (this.camera.offsetY !== this.camera.targetOffsetY) {
          this.camera.offsetY += (this.camera.targetOffsetY - this.camera.offsetY) * this.camera.panSpeed;
          
          // Snap to target if very close
          if (Math.abs(this.camera.offsetY - this.camera.targetOffsetY) < 0.5) {
            this.camera.offsetY = this.camera.targetOffsetY;
          }
        }
      }

      animate = () => {
        if (!this.isRunning) return;
        
        const now = performance.now();
        const dt = now - this.lastUpdateTime;
        
        // Update at approximately 30fps
        if (dt > 33) {
          this.lastUpdateTime = now;
          this.frameCount++;
          
          // Add small random fluctuation to input
          const fluctuation = Math.random() * 0.05 - 0.025;
          const adjustedInput = Math.max(0, Math.min(1, this.inputSignal + fluctuation));
          
          // Update fractal state based on ISRM principles
          this.rootNode.update(adjustedInput);
          
          // Optimize the growth rate based on zoom level
          const zoomFactor = Math.min(10, Math.max(1, this.camera.zoom));
          
          // Base growth chance increases with zoom level
          const baseGrowthChance = 0.4 + (this.inputSignal * 0.3);
          const growthChance = baseGrowthChance * Math.sqrt(zoomFactor);
          
          // Multiple growth attempts based on zoom level and active nodes
          const growthAttempts = Math.floor(Math.sqrt(zoomFactor));
          
          // Boost growth attempts if we have fewer active nodes
          const activeNodeRatio = this.activeNodeCount / Math.max(1, this.totalNodes);
          const activityBoost = activeNodeRatio < 0.5 ? 2 : 1;
          
          // Track if we had any growth this frame
          let hadGrowth = false;
          
          for (let i = 0; i < growthAttempts * activityBoost; i++) {
            if (Math.random() < growthChance) {
              hadGrowth = this.growFractalOneLevel() || hadGrowth;
            }
          }
          
          // Guaranteed growth at intervals, more frequent at higher zoom
          if (this.frameCount % Math.max(5, Math.floor(30 / Math.sqrt(zoomFactor))) === 0) {
            hadGrowth = this.growFractalOneLevel() || hadGrowth;
          }
          
          // Periodically revitalize a random section to keep more nodes active
          if (this.frameCount % 90 === 0) {
            const leafNodes = this.findLeafNodes(this.rootNode);
            if (leafNodes.length > 0) {
              const randomNode = leafNodes[Math.floor(Math.random() * leafNodes.length)];
              this.revitalizeFractal(randomNode);
            }
          }
          
          // Update camera position and zoom
          this.updateCamera();
          
          // Clear canvas and redraw
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          
          // Draw fractal with camera transformation
          this.rootNode.draw(this.ctx, this.camera);
          
          // Update and draw pulse effect if active
          this.updatePulse();
          
          // Draw zoom level and active node indicator
          this.drawStatusIndicators();
        }
        
        requestAnimationFrame(this.animate);
      }
      
      updatePulse() {
        if (this.pulse) {
          // Draw pulse
          this.ctx.beginPath();
          this.ctx.arc(this.pulse.x, this.pulse.y, this.pulse.radius, 0, Math.PI * 2);
          
          // Use custom color if provided, otherwise default to white
          const colorBase = this.pulse.color || 'rgba(255, 255, 255, ';
          this.ctx.strokeStyle = `${colorBase}${this.pulse.opacity})`;
          this.ctx.lineWidth = 2;
          this.ctx.stroke();
          
          // Update pulse parameters
          this.pulse.radius += 8;
          this.pulse.opacity -= 0.02;
          
          // Remove pulse when it fades out
          if (this.pulse.opacity <= 0 || this.pulse.radius > this.pulse.maxRadius) {
            this.pulse = null;
          }
        }
      }
      
      drawStatusIndicators() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(this.canvas.width - 200, this.canvas.height - 70, 190, 60);
        
        // Draw zoom level
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.font = '14px monospace';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`Zoom: ${this.camera.zoom.toFixed(1)}x`, this.canvas.width - 20, this.canvas.height - 50);
        
        // Draw active node count
        this.ctx.fillText(`Active nodes: ${this.activeNodeCount}`, this.canvas.width - 20, this.canvas.height - 30);
        
        // Controls help
        this.ctx.fillText(`Use mouse wheel to zoom, drag to pan`, this.canvas.width - 20, this.canvas.height - 10);
        
        this.ctx.textAlign = 'left';
      }
    }

    // Initialize canvas and fractal
    const canvas = canvasRef.current;
    if (canvas && !fractalRef.current) {
      fractalRef.current = new ReactiveFractal(canvas);
      fractalRef.current.start();
    }
    
    // Cleanup function
    return () => {
      if (fractalRef.current) {
        fractalRef.current.stop();
        fractalRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fractal-container" style={{ width: '100%', height: '100vh', background: '#09121e' }}>
      <div className="info-overlay" style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        padding: '20px',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '600px'
      }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>ISRM-Framework.Org</h1>
        <p style={{ margin: '0', fontSize: '14px', opacity: 0.8, lineHeight: '1.5' }}>
          Schell 2025
        </p>
      </div>
      
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: 'block', 
          width: '100%', 
          height: '100%'
        }} 
      />
    </div>
  );
};

export default FractalSim;