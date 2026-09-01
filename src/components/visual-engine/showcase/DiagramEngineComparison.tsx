import React, { useState, useEffect, useRef } from 'react';
import rough from 'roughjs';
import * as d3 from 'd3';

export const DiagramEngineComparison: React.FC = () => {
  const [viewMode, setViewMode] = useState<'split' | 'rough' | 'd3'>('split');
  const [roughness, setRoughness] = useState<number>(1.2);
  const [fillStyle, setFillStyle] = useState<'hachure' | 'solid' | 'zigzag'>('hachure');
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render RoughJS on Canvas with high-DPI scaling
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 2;
    const width = 500;
    const height = 350;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const rc = rough.canvas(canvas);

    // ====================================================
    // SCENARIO 1: NAIVE DRAM POINTER CHASE
    // ====================================================
    rc.rectangle(10, 10, 480, 155, {
      stroke: '#FDA4AF',
      strokeWidth: 1.5,
      fill: '#FFF1F2',
      fillStyle: 'solid',
      roughness: roughness,
      bowing: 1.2,
    });

    // CPU Socket Die
    rc.rectangle(25, 38, 145, 114, {
      stroke: '#334155',
      strokeWidth: 1.5,
      fill: '#FFFFFF',
      fillStyle: 'solid',
      roughness: roughness,
    });

    // CPU Header Band
    rc.rectangle(25, 38, 145, 20, {
      stroke: '#64748B',
      strokeWidth: 1,
      fill: '#E2E8F0',
      fillStyle: fillStyle,
      fillWeight: 1.2,
      roughness: roughness,
    });

    // ALU Block
    rc.rectangle(33, 64, 129, 24, {
      stroke: '#E11D48',
      strokeWidth: 1.2,
      fill: '#FEE2E2',
      fillStyle: 'solid',
      roughness: roughness,
    });

    // L1/L2 Cache Block
    rc.rectangle(33, 93, 129, 52, {
      stroke: '#94A3B8',
      strokeWidth: 1,
      fill: '#F8FAFC',
      fillStyle: 'solid',
      roughness: roughness,
    });

    // DRAM Module
    rc.rectangle(290, 38, 185, 114, {
      stroke: '#FDA4AF',
      strokeWidth: 1.5,
      fill: '#FFFFFF',
      fillStyle: 'solid',
      roughness: roughness,
    });

    // DRAM Header Band
    rc.rectangle(290, 38, 185, 20, {
      stroke: '#F43F5E',
      strokeWidth: 1,
      fill: '#FFE4E6',
      fillStyle: fillStyle,
      fillWeight: 1.2,
      roughness: roughness,
    });

    // DRAM Chips
    rc.rectangle(298, 64, 82, 44, {
      stroke: '#E11D48',
      strokeWidth: 1,
      fill: '#FFF1F2',
      fillStyle: 'solid',
      roughness: roughness,
    });
    rc.rectangle(386, 64, 82, 44, {
      stroke: '#E11D48',
      strokeWidth: 1,
      fill: '#FFF1F2',
      fillStyle: 'solid',
      roughness: roughness,
    });

    // Gold Pins
    for (let x = 298; x < 468; x += 12) {
      rc.line(x, 142, x, 148, {
        stroke: '#D97706',
        strokeWidth: 2,
        roughness: roughness * 0.5,
      });
    }

    // Curved Spline Connector Cable (CPU to DRAM)
    rc.curve([
      [170, 76],
      [230, 60],
      [290, 76]
    ], {
      stroke: '#E11D48',
      strokeWidth: 2,
      roughness: roughness,
    });

    // Spline Return Cable (DRAM back to CPU with stall)
    rc.curve([
      [290, 120],
      [230, 136],
      [170, 120]
    ], {
      stroke: '#BE123C',
      strokeWidth: 1.8,
      strokeLineDash: [4, 4],
      roughness: roughness,
    });

    // ====================================================
    // SCENARIO 2: XGBOOST CONTIGUOUS STREAM
    // ====================================================
    rc.rectangle(10, 180, 480, 160, {
      stroke: '#86EFAC',
      strokeWidth: 1.5,
      fill: '#F0FDF4',
      fillStyle: 'solid',
      roughness: roughness,
      bowing: 1.2,
    });

    // CSC Column Chunk
    rc.rectangle(25, 210, 145, 118, {
      stroke: '#2563EB',
      strokeWidth: 1.5,
      fill: '#FFFFFF',
      fillStyle: 'solid',
      roughness: roughness,
    });

    // CSC Header Band
    rc.rectangle(25, 210, 145, 20, {
      stroke: '#3B82F6',
      strokeWidth: 1,
      fill: '#DBEAFE',
      fillStyle: fillStyle,
      fillWeight: 1.2,
      roughness: roughness,
    });

    // CSC Values Box
    rc.rectangle(32, 236, 131, 22, {
      stroke: '#93C5FD',
      strokeWidth: 1,
      fill: '#EFF6FF',
      fillStyle: 'solid',
      roughness: roughness,
    });

    // CSC Buffer Box
    rc.rectangle(32, 262, 131, 36, {
      stroke: '#A7F3D0',
      strokeWidth: 1,
      fill: '#ECFDF5',
      fillStyle: 'solid',
      roughness: roughness,
    });

    // Prefetch Stream Conduit
    rc.curve([
      [170, 270],
      [218, 252],
      [265, 270]
    ], {
      stroke: '#059669',
      strokeWidth: 3.5,
      roughness: roughness * 0.7,
    });

    // CPU L1 + SIMD Package
    rc.rectangle(265, 210, 210, 118, {
      stroke: '#059669',
      strokeWidth: 1.5,
      fill: '#FFFFFF',
      fillStyle: 'solid',
      roughness: roughness,
    });

    // CPU Header Band
    rc.rectangle(265, 210, 210, 20, {
      stroke: '#10B981',
      strokeWidth: 1,
      fill: '#DCFCE7',
      fillStyle: fillStyle,
      fillWeight: 1.2,
      roughness: roughness,
    });

    // L1 D-Cache Box
    rc.rectangle(272, 236, 88, 56, {
      stroke: '#10B981',
      strokeWidth: 1,
      fill: '#F0FDF4',
      fillStyle: 'solid',
      roughness: roughness,
    });

    // SIMD Register Unit
    rc.rectangle(366, 236, 102, 56, {
      stroke: '#2563EB',
      strokeWidth: 1.2,
      fill: '#EFF6FF',
      fillStyle: 'solid',
      roughness: roughness,
    });

    // Bottom Speedup Banner
    rc.rectangle(272, 298, 196, 20, {
      stroke: '#065F46',
      strokeWidth: 1,
      fill: '#065F46',
      fillStyle: 'solid',
      roughness: roughness * 0.5,
    });

  }, [roughness, fillStyle, viewMode]);

  // D3 Link Generator for Smooth Cubic Bezier Curves
  const linkGen = d3.linkHorizontal()
    .source((d: any) => [d.sx, d.sy])
    .target((d: any) => [d.tx, d.ty]);

  const naiveStallCable = linkGen({ sx: 175, sy: 80, tx: 290, ty: 80 });
  const naiveReturnCable = linkGen({ sx: 290, sy: 120, tx: 175, ty: 120 });
  const optimalStreamCable = linkGen({ sx: 175, sy: 270, tx: 265, ty: 270 });
  const simdPipe = linkGen({ sx: 350, sy: 270, tx: 370, ty: 270 });

  return (
    <div className="diagram-comparison-container">
      {/* CONTROL RIBBON */}
      <div className="comparison-toolbar">
        <div className="toolbar-group">
          <span className="toolbar-label">VIEW MODE:</span>
          <button
            className={"btn-toggle " + (viewMode === 'split' ? 'active' : '')}
            onClick={() => setViewMode('split')}
          >
            ⚖️ Side-by-Side Split
          </button>
          <button
            className={"btn-toggle " + (viewMode === 'rough' ? 'active' : '')}
            onClick={() => setViewMode('rough')}
          >
            🎨 Engine A: RoughJS (Excalidraw)
          </button>
          <button
            className={"btn-toggle " + (viewMode === 'd3' ? 'active' : '')}
            onClick={() => setViewMode('d3')}
          >
            📐 Engine B: D3 Bezier (ByteByteGo)
          </button>
        </div>

        {viewMode !== 'd3' && (
          <div className="toolbar-group">
            <span className="toolbar-label">ROUGHNESS:</span>
            <input
              type="range"
              min="0.4"
              max="2.2"
              step="0.2"
              value={roughness}
              onChange={(e) => setRoughness(parseFloat(e.target.value))}
              className="range-input"
            />
            <span className="val-pill">{roughness.toFixed(1)}</span>

            <span className="toolbar-label ml-3">FILL:</span>
            <select
              value={fillStyle}
              onChange={(e: any) => setFillStyle(e.target.value)}
              className="select-input"
            >
              <option value="hachure">Hachure (Sketch)</option>
              <option value="solid">Solid (Soft)</option>
              <option value="zigzag">ZigZag (Architectural)</option>
            </select>
          </div>
        )}
      </div>

      {/* COMPARISON GRID */}
      <div className={"showcase-panels " + viewMode}>
        {/* ========================================================================= */}
        {/* PANEL A: ROUGHJS / EXCALIDRAW ENGINE */}
        {/* ========================================================================= */}
        {(viewMode === 'split' || viewMode === 'rough') && (
          <div className="panel-card panel-rough">
            <div className="panel-badge-bar">
              <span className="engine-pill pill-rough">ENGINE A: ROUGH.JS (EXCALIDRAW STYLE)</span>
              <span className="tech-meta">Algorithmic 2-Pass Jitter • Organic Sketch Strokes</span>
            </div>

            <div className="svg-stage">
              <canvas ref={canvasRef} className="engine-canvas" />

              {/* HTML Overlay Labels for Crisp Typography */}
              <div className="rough-label-overlay">
                <span className="rl-title-1">① Naive DRAM Pointer Chase (~200 cyc stall)</span>
                <span className="rl-cpu">CPU DIE: SOCKET 0</span>
                <span className="rl-alu">ALU ENGINE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ⛔ FROZEN</span>
                <span className="rl-cache">
                  L1 D-Cache: MISS ✕ (4c)<br />
                  L2 Cache: &nbsp;&nbsp;MISS ✕ (12c)<br />
                  L3 Cache: &nbsp;&nbsp;MISS ✕ (40c)
                </span>
                <span className="rl-bus">1. Mem Req ──►</span>
                <span className="rl-stall">◄── 2. Stall +100ns</span>
                <span className="rl-dram">DDR5 DRAM MEMORY</span>
                <span className="rl-row1">0x8F (val: 0.34)<br />g:+1.42, h:2.1</span>
                <span className="rl-row2">0x01 (val: 4.50)<br />g:-0.85, h:1.0</span>
                <span className="rl-thrash">⚠️ 64B lines thrash (90% wasted)</span>

                <span className="rl-title-2">② XGBoost Cache-Conscious Stream (~4 cyc Hit)</span>
                <span className="rl-csc-hdr">CSC COLUMN CHUNK</span>
                <span className="rl-vals">VALS: [1.2, 1.8, 2.5, 3.1]</span>
                <span className="rl-buf">THREAD BUFFER:<br />gBuf: [+1.42, -0.85]</span>
                <span className="rl-stream">⚡ 64B BURST</span>
                <span className="rl-simd-hdr">CPU CORE: L1 HIT &amp; AVX2 DIE</span>
                <span className="rl-l1">L1 D-CACHE<br />✓ 100% Hit<br />✓ Prefetch<br />~4 cyc (1ns)</span>
                <span className="rl-simd">AVX2 SIMD<br />_mm256_add_ps(G,g)<br />_mm256_add_ps(H,h)<br />8 floats/cyc</span>
                <span className="rl-speedup">✓ 0 BUBBLES • 17× SPEEDUP</span>
              </div>
            </div>

            <div className="engine-summary">
              <strong>Why it works:</strong> Organic, warm, and approachable. Replicates the beloved Excalidraw whiteboard aesthetic directly inside web code.
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PANEL B: D3 BEZIER / BYTEBYTEGO PUBLICATION ENGINE */}
        {/* ========================================================================= */}
        {(viewMode === 'split' || viewMode === 'd3') && (
          <div className="panel-card panel-d3">
            <div className="panel-badge-bar">
              <span className="engine-pill pill-d3">ENGINE B: D3 G2 BEZIER (BYTEBYTEGO STYLE)</span>
              <span className="tech-meta">Cubic Spline Cables • Soft Architecture Geometry</span>
            </div>

            <div className="svg-stage">
              <svg viewBox="0 0 500 350" className="engine-svg d3-rendered">
                <defs>
                  <marker id="d3-arr-rose" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <path d="M 0 0 L 6 2 L 0 4 Z" fill="#E11D48" />
                  </marker>
                  <marker id="d3-arr-green" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <path d="M 0 0 L 6 2 L 0 4 Z" fill="#059669" />
                  </marker>
                  <marker id="d3-arr-blue" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <path d="M 0 0 L 6 2 L 0 4 Z" fill="#2563EB" />
                  </marker>

                  <linearGradient id="d3-cable-stall" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#FB7185" />
                    <stop offset="100%" stop-color="#E11D48" />
                  </linearGradient>

                  <linearGradient id="d3-cable-stream" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#34D399" />
                    <stop offset="100%" stop-color="#059669" />
                  </linearGradient>
                </defs>

                {/* SCENARIO 1: NAIVE DRAM */}
                <g transform="translate(10, 10)">
                  <rect x="0" y="0" width="480" height="155" rx="8" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="1.2" />
                  
                  {/* Step Header */}
                  <rect x="10" y="8" width="18" height="16" rx="3" fill="#E11D48" />
                  <text x="19" y="20" text-anchor="middle" font-family="var(--font-mono, monospace)" font-size="10" font-weight="800" fill="#FFFFFF">1</text>
                  <text x="34" y="20" font-family="var(--font-sans, sans-serif)" font-size="11" font-weight="700" fill="#9F1239">
                    Naive DRAM Pointer Chase
                  </text>
                  <rect x="350" y="8" width="120" height="16" rx="3" fill="#FFE4E6" stroke="#F43F5E" stroke-width="1" />
                  <text x="410" y="19" text-anchor="middle" font-family="var(--font-mono, monospace)" font-size="8.5" font-weight="700" fill="#BE123C">
                    ⚠ ~200 CYCLES STALL
                  </text>

                  {/* CPU Package */}
                  <g transform="translate(12, 34)">
                    <rect x="0" y="0" width="145" height="108" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" />
                    <rect x="0" y="0" width="145" height="20" rx="6 6 0 0" fill="#F1F5F9" />
                    <text x="8" y="14" font-family="var(--font-mono, monospace)" font-size="9" font-weight="700" fill="#334155">CPU DIE: SOCKET 0</text>
                    
                    {/* ALU Frozen */}
                    <rect x="6" y="26" width="133" height="22" rx="3" fill="#FEE2E2" stroke="#FCA5A5" stroke-width="1" />
                    <text x="12" y="40" font-family="var(--font-mono, monospace)" font-size="8.5" font-weight="700" fill="#991B1B">ALU ENGINE</text>
                    <text x="132" y="40" text-anchor="end" font-family="var(--font-mono, monospace)" font-size="8" font-weight="800" fill="#DC2626">⛔ FROZEN</text>

                    {/* Cache Misses */}
                    <rect x="6" y="52" width="133" height="46" rx="3" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
                    <text x="10" y="66" font-family="var(--font-mono, monospace)" font-size="8" font-weight="600" fill="#64748B">L1 D-Cache: <tspan fill="#E11D48" font-weight="700">MISS ✕ (4c)</tspan></text>
                    <text x="10" y="80" font-family="var(--font-mono, monospace)" font-size="8" font-weight="600" fill="#64748B">L2 Cache:   <tspan fill="#E11D48" font-weight="700">MISS ✕ (12c)</tspan></text>
                    <text x="10" y="94" font-family="var(--font-mono, monospace)" font-size="8" font-weight="600" fill="#64748B">L3 Cache:   <tspan fill="#E11D48" font-weight="700">MISS ✕ (40c)</tspan></text>

                    {/* Connection Terminal Pin */}
                    <circle cx="145" cy="46" r="3.5" fill="#E11D48" />
                    <circle cx="145" cy="86" r="3.5" fill="#BE123C" />
                  </g>

                  {/* D3 Smooth Curved Bezier Conduits */}
                  <path d={naiveStallCable || ''} fill="none" stroke="url(#d3-cable-stall)" stroke-width="2" marker-end="url(#d3-arr-rose)" />
                  <path d={naiveReturnCable || ''} fill="none" stroke="#BE123C" stroke-width="1.8" stroke-dasharray="4 3" marker-end="url(#d3-arr-rose)" />

                  <rect x="180" y="44" width="76" height="14" rx="2" fill="#FFE4E6" stroke="#FDA4AF" stroke-width="0.8" />
                  <text x="218" y="54" text-anchor="middle" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="700" fill="#BE123C">1. Mem Req ──►</text>

                  <rect x="180" y="124" width="80" height="14" rx="2" fill="#FFE4E6" stroke="#FDA4AF" stroke-width="0.8" />
                  <text x="220" y="134" text-anchor="middle" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="700" fill="#BE123C">◄── 2. Stall +100ns</text>

                  {/* DDR5 Memory Bank */}
                  <g transform="translate(290, 34)">
                    <rect x="0" y="0" width="180" height="108" rx="6" fill="#FFFFFF" stroke="#FDA4AF" stroke-width="1.2" />
                    <rect x="0" y="0" width="180" height="20" rx="6 6 0 0" fill="#FFE4E6" />
                    <text x="8" y="14" font-family="var(--font-mono, monospace)" font-size="9" font-weight="700" fill="#9F1239">DDR5 DRAM MEMORY</text>

                    {/* Receiver Pin */}
                    <circle cx="0" cy="46" r="3.5" fill="#E11D48" />
                    <circle cx="0" cy="86" r="3.5" fill="#BE123C" />

                    {/* Out of order chips */}
                    <rect x="8" y="26" width="78" height="42" rx="3" fill="#FFF1F2" stroke="#F43F5E" stroke-width="1" />
                    <text x="12" y="38" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="700" fill="#9F1239">0x8F0020 (Row 4082)</text>
                    <text x="12" y="50" font-family="var(--font-mono, monospace)" font-size="8" font-weight="600" fill="#1E293B">val: 0.34</text>
                    <text x="12" y="62" font-family="var(--font-mono, monospace)" font-size="7.5" fill="#E11D48">g:+1.42, h:2.1</text>

                    <rect x="92" y="26" width="80" height="42" rx="3" fill="#FFF1F2" stroke="#F43F5E" stroke-width="1" />
                    <text x="96" y="38" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="700" fill="#9F1239">0x0114C0 (Row 12)</text>
                    <text x="96" y="50" font-family="var(--font-mono, monospace)" font-size="8" font-weight="600" fill="#1E293B">val: 4.50</text>
                    <text x="96" y="62" font-family="var(--font-mono, monospace)" font-size="7.5" fill="#E11D48">g:-0.85, h:1.0</text>

                    {/* Gold Pins */}
                    <line x1="8" y1="102" x2="172" y2="102" stroke="#D97706" stroke-width="2.5" stroke-dasharray="3 2" />
                    <text x="90" y="94" text-anchor="middle" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="600" fill="#BE123C">⚠️ 64B lines thrash (90% wasted)</text>
                  </g>
                </g>

                {/* SCENARIO 2: CONTIGUOUS PREFETCH */}
                <g transform="translate(10, 180)">
                  <rect x="0" y="0" width="480" height="160" rx="8" fill="#F0FDF4" stroke="#86EFAC" stroke-width="1.2" />

                  {/* Step Header */}
                  <rect x="10" y="8" width="18" height="16" rx="3" fill="#059669" />
                  <text x="19" y="20" text-anchor="middle" font-family="var(--font-mono, monospace)" font-size="10" font-weight="800" fill="#FFFFFF">2</text>
                  <text x="34" y="20" font-family="var(--font-sans, sans-serif)" font-size="11" font-weight="700" fill="#065F46">
                    XGBoost Cache-Conscious Stream
                  </text>
                  <rect x="350" y="8" width="120" height="16" rx="3" fill="#DCFCE7" stroke="#10B981" stroke-width="1" />
                  <text x="410" y="19" text-anchor="middle" font-family="var(--font-mono, monospace)" font-size="8.5" font-weight="700" fill="#047857">
                    ✓ ~4 CYCLES (100% HIT)
                  </text>

                  {/* Pre-sorted CSC block */}
                  <g transform="translate(12, 34)">
                    <rect x="0" y="0" width="145" height="114" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.2" />
                    <rect x="0" y="0" width="145" height="20" rx="6 6 0 0" fill="#F1F5F9" />
                    <text x="8" y="14" font-family="var(--font-mono, monospace)" font-size="9" font-weight="700" fill="#334155">CSC COLUMN CHUNK</text>

                    <rect x="6" y="26" width="133" height="22" rx="3" fill="#EFF6FF" stroke="#93C5FD" stroke-width="1" />
                    <text x="10" y="40" font-family="var(--font-mono, monospace)" font-size="8" font-weight="700" fill="#1D4ED8">VALS: [1.2, 1.8, 2.5, 3.1]</text>

                    <rect x="6" y="52" width="133" height="34" rx="3" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1" />
                    <text x="10" y="65" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="700" fill="#065F46">THREAD-LOCAL BUFFER:</text>
                    <text x="10" y="78" font-family="var(--font-mono, monospace)" font-size="7.5" fill="#047857">gBuf[]: [+1.42, -0.85, ...]</text>

                    <text x="72" y="102" text-anchor="middle" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="700" fill="#059669">✓ 64B Contiguous Aligned</text>
                    <circle cx="145" cy="56" r="3.5" fill="#059669" />
                  </g>

                  {/* D3 Smooth Prefetch Streaming Conduit */}
                  <path d={optimalStreamCable || ''} fill="none" stroke="url(#d3-cable-stream)" stroke-width="3" marker-end="url(#d3-arr-green)" />
                  <rect x="180" y="80" width="76" height="16" rx="3" fill="#DCFCE7" stroke="#86EFAC" stroke-width="1" />
                  <text x="218" y="91" text-anchor="middle" font-family="var(--font-mono, monospace)" font-size="8" font-weight="800" fill="#065F46">⚡ 64B BURST</text>

                  {/* CPU Core: L1 Hit & AVX2 SIMD */}
                  <g transform="translate(265, 34)">
                    <rect x="0" y="0" width="205" height="114" rx="6" fill="#FFFFFF" stroke="#86EFAC" stroke-width="1.2" />
                    <rect x="0" y="0" width="205" height="20" rx="6 6 0 0" fill="#DCFCE7" />
                    <text x="8" y="14" font-family="var(--font-mono, monospace)" font-size="8.5" font-weight="700" fill="#065F46">CPU CORE: L1 HIT & AVX2 DIE</text>
                    <circle cx="0" cy="56" r="3.5" fill="#059669" />

                    {/* L1 Cache */}
                    <rect x="6" y="26" width="85" height="56" rx="3" fill="#F0FDF4" stroke="#10B981" stroke-width="1" />
                    <text x="10" y="38" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="700" fill="#065F46">L1 D-CACHE</text>
                    <text x="10" y="50" font-family="var(--font-mono, monospace)" font-size="7.5" fill="#047857">✓ 100% Hit</text>
                    <text x="10" y="62" font-family="var(--font-mono, monospace)" font-size="7.5" fill="#047857">✓ HW Prefetch</text>
                    <text x="10" y="74" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="700" fill="#059669">~4 cyc (1ns)</text>

                    {/* SIMD Pipe */}
                    <path d={simdPipe || ''} fill="none" stroke="#2563EB" stroke-width="2" marker-end="url(#d3-arr-blue)" />

                    {/* AVX2 Registers */}
                    <rect x="100" y="26" width="98" height="56" rx="3" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1" />
                    <text x="104" y="38" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="700" fill="#1E40AF">AVX2 SIMD</text>
                    <text x="104" y="50" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="600" fill="#1D4ED8">_mm256_add_ps(G,g)</text>
                    <text x="104" y="62" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="600" fill="#1D4ED8">_mm256_add_ps(H,h)</text>
                    <text x="104" y="74" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="700" fill="#2563EB">8 floats/cyc</text>

                    <rect x="6" y="88" width="193" height="18" rx="3" fill="#065F46" />
                    <text x="102" y="100" text-anchor="middle" font-family="var(--font-mono, monospace)" font-size="7.5" font-weight="800" fill="#A7F3D0">
                      ✓ 0 BUBBLES • 17× SPEEDUP
                    </text>
                  </g>
                </g>
              </svg>
            </div>

            <div className="engine-summary">
              <strong>Why it works:</strong> Clean, authoritative, and publication-ready. Replicates the ByteByteGo / Alex Xu blueprint aesthetic with perfect geometric precision.
            </div>
          </div>
        )}
      </div>

      <style>{`
        .diagram-comparison-container {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 16px;
          margin: 20px 0;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
          font-family: var(--font-sans, sans-serif);
        }

        .comparison-toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-bottom: 14px;
          margin-bottom: 16px;
          border-bottom: 1px solid #F1F5F9;
        }

        .toolbar-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .toolbar-label {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          color: #64748B;
        }

        .btn-toggle {
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          padding: 5px 10px;
          font-size: 12px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-toggle:hover {
          background: #EFF6FF;
          border-color: #3B82F6;
          color: #1D4ED8;
        }

        .btn-toggle.active {
          background: #2563EB;
          border-color: #1D4ED8;
          color: #FFFFFF;
          font-weight: 700;
        }

        .range-input {
          width: 80px;
          accent-color: #2563EB;
        }

        .val-pill {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          background: #F1F5F9;
          padding: 2px 6px;
          border-radius: 4px;
          color: #0F172A;
        }

        .select-input {
          font-size: 11px;
          font-family: var(--font-mono, monospace);
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          padding: 4px 8px;
          border-radius: 4px;
          color: #334155;
        }

        .showcase-panels {
          display: grid;
          gap: 16px;
        }

        .showcase-panels.split {
          grid-template-columns: 1fr 1fr;
        }

        .showcase-panels.rough, .showcase-panels.d3 {
          grid-template-columns: 1fr;
        }

        .panel-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          flex-direction: column;
        }

        .panel-badge-bar {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          margin-bottom: 10px;
        }

        .engine-pill {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }

        .pill-rough {
          background: #FEF3C7;
          color: #92400E;
          border: 1px solid #FCD34D;
        }

        .pill-d3 {
          background: #DBEAFE;
          color: #1E40AF;
          border: 1px solid #93C5FD;
        }

        .tech-meta {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          color: #64748B;
        }

        .svg-stage {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          overflow: hidden;
        }

        .engine-canvas, .engine-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        /* RoughJS HTML Typography Overlay */
        .rough-label-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          font-family: var(--font-mono, monospace);
        }

        .rl-title-1 {
          position: absolute;
          top: 13px;
          left: 20px;
          font-size: 10.5px;
          font-weight: 800;
          color: #9F1239;
        }

        .rl-cpu {
          position: absolute;
          top: 42px;
          left: 32px;
          font-size: 8.5px;
          font-weight: 700;
          color: #334155;
        }

        .rl-alu {
          position: absolute;
          top: 70px;
          left: 38px;
          font-size: 8px;
          font-weight: 800;
          color: #BE123C;
          width: 120px;
          display: flex;
          justify-content: space-between;
        }

        .rl-cache {
          position: absolute;
          top: 98px;
          left: 38px;
          font-size: 7.5px;
          font-weight: 700;
          color: #E11D48;
          line-height: 1.5;
        }

        .rl-bus {
          position: absolute;
          top: 48px;
          left: 185px;
          font-size: 7.5px;
          font-weight: 700;
          color: #E11D48;
          background: #FFE4E6;
          padding: 1px 4px;
          border-radius: 2px;
        }

        .rl-stall {
          position: absolute;
          top: 122px;
          left: 180px;
          font-size: 7.5px;
          font-weight: 700;
          color: #BE123C;
          background: #FFE4E6;
          padding: 1px 4px;
          border-radius: 2px;
        }

        .rl-dram {
          position: absolute;
          top: 42px;
          left: 300px;
          font-size: 8.5px;
          font-weight: 800;
          color: #9F1239;
        }

        .rl-row1 {
          position: absolute;
          top: 70px;
          left: 304px;
          font-size: 7px;
          font-weight: 700;
          color: #9F1239;
          line-height: 1.3;
        }

        .rl-row2 {
          position: absolute;
          top: 70px;
          left: 392px;
          font-size: 7px;
          font-weight: 700;
          color: #9F1239;
          line-height: 1.3;
        }

        .rl-thrash {
          position: absolute;
          top: 132px;
          left: 300px;
          font-size: 7px;
          font-weight: 600;
          color: #BE123C;
        }

        .rl-title-2 {
          position: absolute;
          top: 184px;
          left: 20px;
          font-size: 10.5px;
          font-weight: 800;
          color: #065F46;
        }

        .rl-csc-hdr {
          position: absolute;
          top: 214px;
          left: 32px;
          font-size: 8.5px;
          font-weight: 700;
          color: #1E40AF;
        }

        .rl-vals {
          position: absolute;
          top: 240px;
          left: 36px;
          font-size: 7.5px;
          font-weight: 700;
          color: #1D4ED8;
        }

        .rl-buf {
          position: absolute;
          top: 266px;
          left: 36px;
          font-size: 7px;
          font-weight: 700;
          color: #065F46;
          line-height: 1.25;
        }

        .rl-stream {
          position: absolute;
          top: 244px;
          left: 182px;
          font-size: 7.5px;
          font-weight: 800;
          color: #065F46;
          background: #DCFCE7;
          padding: 2px 5px;
          border-radius: 3px;
        }

        .rl-simd-hdr {
          position: absolute;
          top: 214px;
          left: 275px;
          font-size: 8.5px;
          font-weight: 700;
          color: #065F46;
        }

        .rl-l1 {
          position: absolute;
          top: 240px;
          left: 278px;
          font-size: 7px;
          font-weight: 700;
          color: #047857;
          line-height: 1.25;
        }

        .rl-simd {
          position: absolute;
          top: 240px;
          left: 372px;
          font-size: 7px;
          font-weight: 700;
          color: #1D4ED8;
          line-height: 1.25;
        }

        .rl-speedup {
          position: absolute;
          top: 302px;
          left: 278px;
          font-size: 7.5px;
          font-weight: 800;
          color: #A7F3D0;
          width: 185px;
          text-align: center;
        }

        .engine-summary {
          font-size: 11.5px;
          color: #475569;
          margin-top: 10px;
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .showcase-panels.split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
