/**
 * LinearRegressionMafs.tsx
 * 3Blue1Brown (Mafs) + Univer Spreadsheet + Observable Plot Explanatory Engine.
 * Features:
 * - Dual-Pane Workspace:
 *   - Left: 3B1B Mafs vector plane with draggable coordinate points, regression line & squared boxes
 *   - Right: Observable Plot academic convex loss surface J(m)
 * - Authentic Univer spreadsheet with color-coded ML parameter linking and live formula bar
 * - Closed-form OLS solving engine ("BAM!")
 */

import React, { useState, useMemo } from 'react';
import { Mafs, Coordinates, Plot, Line, Polygon, MovablePoint } from 'mafs';
import 'mafs/core.css';
import 'mafs/font.css';
import { UniverSpreadsheet, type SpreadsheetPoint } from '../../../visual-engine/ui/UniverSpreadsheet';
import { LossParabolaObservable } from './LossParabolaObservable';
import { AudioChime } from '../../../visual-engine/core/AudioChime';

export const LinearRegressionMafs: React.FC = () => {
  // Data Points in Cartesian [0..10] x [0..10]
  const [points, setPoints] = useState<SpreadsheetPoint[]>([
    { id: 1, x: 1.5, y: 2.2 },
    { id: 2, x: 3.0, y: 3.8 },
    { id: 3, x: 4.5, y: 5.1 },
    { id: 4, x: 6.0, y: 6.2 },
    { id: 5, x: 7.5, y: 8.0 },
    { id: 6, x: 8.8, y: 8.5 },
  ]);

  // Current slope & intercept
  const [slope, setSlope] = useState<number>(0.85);
  const [intercept, setIntercept] = useState<number>(1.20);
  const [showSquares, setShowSquares] = useState<boolean>(false);
  const [hoveredPointId, setHoveredPointId] = useState<number | null>(null);

  // Compute Closed-Form OLS Parameters
  const { optM, optB, ssr, r2 } = useMemo(() => {
    const n = points.length;
    if (n < 2) return { optM: slope, optB: intercept, ssr: 0, r2: 1 };

    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    for (const p of points) {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumX2 += p.x * p.x;
    }

    const meanX = sumX / n;
    const meanY = sumY / n;

    const num = sumXY - n * meanX * meanY;
    const den = sumX2 - n * meanX * meanX;

    const calculatedM = Math.abs(den) > 0.0001 ? num / den : 0.85;
    const calculatedB = meanY - calculatedM * meanX;

    // Current SSR with user slope & intercept
    let currentSSR = 0;
    let sst = 0;
    for (const p of points) {
      const pred = slope * p.x + intercept;
      const res = p.y - pred;
      currentSSR += res * res;
      sst += (p.y - meanY) * (p.y - meanY);
    }

    const calculatedR2 = sst > 0 ? Math.max(0, 1 - currentSSR / sst) : 1;

    return { optM: calculatedM, optB: calculatedB, ssr: currentSSR, r2: calculatedR2 };
  }, [points, slope, intercept]);

  // Solve OLS (BAM!)
  const handleSolveOLS = () => {
    AudioChime.bam();
    setSlope(+optM.toFixed(2));
    setIntercept(+optB.toFixed(2));
  };

  // Preset Datasets
  const handlePreset = (type: 'standard' | 'outlier' | 'perfect') => {
    AudioChime.snap();
    if (type === 'standard') {
      setPoints([
        { id: 1, x: 1.5, y: 2.2 },
        { id: 2, x: 3.0, y: 3.8 },
        { id: 3, x: 4.5, y: 5.1 },
        { id: 4, x: 6.0, y: 6.2 },
        { id: 5, x: 7.5, y: 8.0 },
        { id: 6, x: 8.8, y: 8.5 },
      ]);
    } else if (type === 'outlier') {
      setPoints([
        { id: 1, x: 1.5, y: 2.0 },
        { id: 2, x: 2.8, y: 3.2 },
        { id: 3, x: 4.2, y: 4.5 },
        { id: 4, x: 5.8, y: 5.5 },
        { id: 5, x: 7.0, y: 6.8 },
        { id: 6, x: 8.5, y: 1.5 },
      ]);
    } else if (type === 'perfect') {
      setPoints([
        { id: 1, x: 1.0, y: 1.8 },
        { id: 2, x: 3.0, y: 3.4 },
        { id: 3, x: 5.0, y: 5.0 },
        { id: 4, x: 7.0, y: 6.6 },
        { id: 5, x: 9.0, y: 8.2 },
      ]);
    }
  };

  return (
    <div className="mafs-lab-root">
      {/* TOP CONTROL BAR */}
      <div className="mafs-topbar">
        <div className="metrics-group">
          <div className="metric-tag">
            <span className="lbl">MODEL:</span>
            <span className="val">
              y = {slope.toFixed(2)}x {intercept >= 0 ? '+' : '-'} {Math.abs(intercept).toFixed(2)}
            </span>
          </div>
          <div className="metric-tag">
            <span className="lbl">SSR (Σe²):</span>
            <span className="val">{ssr.toFixed(2)}</span>
          </div>
          <div className="metric-tag">
            <span className="lbl">R² SCORE:</span>
            <span className="val">{r2.toFixed(2)}</span>
          </div>
        </div>

        <div className="actions-group">
          <button type="button" className="btn-bam" onClick={handleSolveOLS} title="Snap to Closed-Form Minimum">
            ⚡ Solve OLS (BAM!)
          </button>
          <button
            type="button"
            className={`btn-toggle ${showSquares ? 'active' : ''}`}
            onClick={() => {
              AudioChime.snap();
              setShowSquares(!showSquares);
            }}
          >
            <span>Squares:</span> <strong>{showSquares ? 'ON' : 'OFF'}</strong>
          </button>
          <div className="preset-buttons">
            <button type="button" className="btn-preset" onClick={() => handlePreset('standard')}>
              Standard
            </button>
            <button type="button" className="btn-preset" onClick={() => handlePreset('outlier')}>
              Outlier
            </button>
            <button type="button" className="btn-preset" onClick={() => handlePreset('perfect')}>
              Perfect
            </button>
          </div>
        </div>
      </div>

      {/* DUAL WORKSPACE: 3B1B MAFS + OBSERVABLE PLOT */}
      <div className="mafs-workspace">
        {/* PANE 1: MAFS VECTOR PLANE */}
        <div className="workspace-pane pane-mafs">
          <div className="pane-title-strip">
            <span className="title">3B1B VECTOR FIT &amp; RESIDUALS</span>
            <span className="hint">Drag points to reshape fit</span>
          </div>
          <div className="mafs-view-box">
            <Mafs
              width="auto"
              height={320}
              viewBox={{ x: [0, 10], y: [0, 10] }}
              preserveAspectRatio={false}
              pan={false}
              zoom={false}
            >
              {/* Cartesian Grid */}
              <Coordinates.Cartesian
                xAxis={{ lines: 2, labels: (n) => (n >= 0 && n <= 10 ? String(n) : '') }}
                yAxis={{ lines: 2, labels: (n) => (n >= 0 && n <= 10 ? String(n) : '') }}
              />

              {/* Regression Line */}
              <Plot.OfX y={(x) => slope * x + intercept} color="#2676AA" weight={2.5} />

              {/* Residual Drop-Lines & Squared Boxes */}
              {points.map((p) => {
                const predY = slope * p.x + intercept;
                const res = p.y - predY;
                const side = Math.abs(res);
                const boxTop = Math.max(p.y, predY);
                const boxBottom = Math.min(p.y, predY);

                return (
                  <React.Fragment key={`res-${p.id}`}>
                    {/* Squared Error Area Polygon */}
                    {showSquares && (
                      <Polygon
                        points={[
                          [p.x, boxBottom],
                          [p.x + side, boxBottom],
                          [p.x + side, boxTop],
                          [p.x, boxTop],
                        ]}
                        color="#2676AA"
                        fillOpacity={0.08}
                        weight={1}
                      />
                    )}

                    {/* Vertical Residual Line */}
                    <Line.Segment
                      point1={[p.x, p.y]}
                      point2={[p.x, predY]}
                      color={res >= 0 ? '#2676AA' : '#F43F5E'}
                      style="dashed"
                      weight={1.8}
                    />
                  </React.Fragment>
                );
              })}

              {/* Interactive Movable Points */}
              {points.map((p, idx) => (
                <MovablePoint
                  key={p.id}
                  point={[p.x, p.y]}
                  color={hoveredPointId === p.id ? '#2676AA' : '#3B82F6'}
                  constrain={([x, y]) => [
                    Math.max(0.2, Math.min(9.8, +x.toFixed(1))),
                    Math.max(0.2, Math.min(9.8, +y.toFixed(1))),
                  ]}
                  onMove={([newX, newY]) => {
                    const nextPoints = points.map((pt, i) => (i === idx ? { ...pt, x: newX, y: newY } : pt));
                    AudioChime.tick(1200);
                    setPoints(nextPoints);
                  }}
                />
              ))}
            </Mafs>
          </div>
        </div>

        {/* PANE 2: OBSERVABLE PLOT LOSS SURFACE */}
        <div className="workspace-pane pane-observable">
          <div className="pane-title-strip">
            <span className="title">OBSERVABLE PLOT: CONVEX LOSS J(m)</span>
            <span className="hint">Current Slope vs SSR</span>
          </div>
          <div className="observable-view-box">
            <LossParabolaObservable
              slope={slope}
              intercept={intercept}
              points={points}
              height={320}
            />
          </div>
        </div>
      </div>

      {/* MANUAL SLIDERS */}
      <div className="mafs-sliders-bar">
        <div className="slider-item">
          <div className="slider-label-line">
            <span className="name">Slope (m):</span>
            <span className="val">{slope.toFixed(2)}</span>
          </div>
          <input
            type="range"
            className="slider-input"
            min="-2.0"
            max="3.0"
            step="0.02"
            value={slope}
            onChange={(e) => {
              AudioChime.tick(900);
              setSlope(parseFloat(e.target.value));
            }}
          />
        </div>

        <div className="slider-item">
          <div className="slider-label-line">
            <span className="name">Intercept (b):</span>
            <span className="val">{intercept.toFixed(2)}</span>
          </div>
          <input
            type="range"
            className="slider-input"
            min="-4.0"
            max="8.0"
            step="0.1"
            value={intercept}
            onChange={(e) => {
              AudioChime.tick(700);
              setIntercept(parseFloat(e.target.value));
            }}
          />
        </div>
      </div>

      {/* UNIVER SPREADSHEET ENGINE */}
      <UniverSpreadsheet
        points={points}
        slope={slope}
        intercept={intercept}
        onPointsChange={setPoints}
        onHoverPoint={setHoveredPointId}
        selectedPointId={hoveredPointId}
      />

      <style>{`
        .mafs-lab-root {
          display: flex;
          flex-direction: column;
          width: 100%;
          background: var(--surface-card, #ffffff);
          border-radius: var(--radius-card, 10px);
          overflow: hidden;
          border: 1px solid var(--border-default, #e2e8f0);
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
        }

        .mafs-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: var(--surface, #ffffff);
          border-bottom: 1px solid var(--border-default, #e2e8f0);
          flex-wrap: wrap;
          gap: 8px;
        }

        .metrics-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .metric-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 8px;
          background: color-mix(in srgb, var(--surface-card, #ffffff) 70%, var(--bg, #f8f9fc));
          border: 1px solid var(--border-default, #e2e8f0);
          border-radius: 4px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
        }

        .metric-tag .lbl {
          font-weight: 700;
          color: var(--text-muted, #68768b);
        }

        .metric-tag .val {
          font-weight: 700;
          color: var(--accent, #2676aa);
        }

        .actions-group {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .btn-bam {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          height: 28px;
          padding: 0 12px;
          background: var(--accent, #2676aa);
          color: #ffffff;
          border: 1px solid var(--accent, #2676aa);
          border-radius: 4px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-bam:hover {
          background: var(--accent-hover, #1b5e8a);
        }

        .btn-bam:active {
          transform: scale(0.97);
        }

        .btn-toggle, .btn-preset {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          height: 28px;
          padding: 0 8px;
          background: var(--surface-card, #ffffff);
          border: 1px solid var(--border-default, #e2e8f0);
          border-radius: 4px;
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--text, #1a1a2e);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-toggle:hover, .btn-preset:hover {
          border-color: var(--accent, #2676aa);
          color: var(--accent, #2676aa);
        }

        .btn-toggle.active {
          border-color: var(--accent, #2676aa);
          background: rgba(38, 118, 170, 0.1);
          color: var(--accent, #2676aa);
        }

        .preset-buttons {
          display: flex;
          gap: 3px;
        }

        /* DUAL WORKSPACE */
        .mafs-workspace {
          display: grid;
          grid-template-columns: 1fr;
          border-bottom: 1px solid var(--border-default, #e2e8f0);
        }

        @media (min-width: 768px) {
          .mafs-workspace {
            grid-template-columns: 1.2fr 0.8fr;
          }
        }

        .workspace-pane {
          display: flex;
          flex-direction: column;
          background: color-mix(in srgb, var(--surface-card, #ffffff) 60%, var(--bg, #f8f9fc));
        }

        .pane-mafs {
          border-right: 1px solid var(--border-default, #e2e8f0);
        }

        .pane-title-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 12px;
          background: var(--surface, #ffffff);
          border-bottom: 1px solid var(--border-default, #e2e8f0);
        }

        .pane-title-strip .title {
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--text-muted, #68768b);
        }

        .pane-title-strip .hint {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          color: var(--text-muted, #68768b);
        }

        .mafs-view-box {
          width: 100%;
          height: 320px;
        }

        .mafs-view-box .MafsView {
          --mafs-bg: color-mix(in srgb, var(--surface-card, #ffffff) 60%, var(--bg, #f8f9fc));
          --mafs-fg: var(--text, #1A1A2E);
          --grid-line-subtle-color: var(--border-default, #e2e8f0);
          --grid-line-color: var(--border-default, #cbd5e1);
        }

        .observable-view-box {
          width: 100%;
          height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mafs-sliders-bar {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 8px 16px;
          background: var(--surface, #ffffff);
          border-bottom: 1px solid var(--border-default, #e2e8f0);
        }

        @media (max-width: 640px) {
          .mafs-sliders-bar {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }

        .slider-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .slider-label-line {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
        }

        .slider-label-line .name {
          font-weight: 700;
          color: var(--text-muted, #68768b);
        }

        .slider-label-line .val {
          font-weight: 700;
          color: var(--accent, #2676aa);
        }

        .slider-input {
          width: 100%;
          height: 5px;
          accent-color: var(--accent, #2676aa);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
