/**
 * UniverSpreadsheet.tsx
 * Authentic Univer / Excel-grade interactive spreadsheet engine with Soft Architecture aesthetics.
 * Features:
 * - Authentic top ribbon toolbar (Undo/Redo, Bold, Italic, Alignment, Precision, Heatmap toggle, Presets)
 * - Formula bar with function icon (fx), address box (B2), and colored syntax-highlighted formula mirror
 * - Real column headers (A, B, C...) with resize guides and row number indicators (1, 2, 3...)
 * - Selection frame with authentic corner fill-handle square (■)
 * - Dynamic conditional formatting color scale / heatmap for residuals and parameters
 * - Bottom sheet tabs (Sheet1, Loss_Surface, Matrix_W) and live status bar aggregations (SUM, AVG, COUNT)
 */

import React, { useState, useMemo } from 'react';
import { AudioChime } from '../core/AudioChime';

export interface SpreadsheetPoint {
  id: number;
  x: number;
  y: number;
  pred?: number;
  residual?: number;
  sqResidual?: number;
}

const DEFAULT_POINTS: SpreadsheetPoint[] = [
  { id: 1, x: 1.5, y: 2.2 },
  { id: 2, x: 3.0, y: 3.8 },
  { id: 3, x: 4.5, y: 5.1 },
  { id: 4, x: 6.0, y: 6.2 },
  { id: 5, x: 7.5, y: 8.0 },
  { id: 6, x: 9.0, y: 8.9 },
];

export interface UniverSpreadsheetProps {
  points?: SpreadsheetPoint[];
  slope?: number;
  intercept?: number;
  onPointsChange?: (points: SpreadsheetPoint[]) => void;
  onHoverPoint?: (id: number | null) => void;
  selectedPointId?: number | null;
}

export const UniverSpreadsheet: React.FC<UniverSpreadsheetProps> = ({
  points = DEFAULT_POINTS,
  slope = 0.85,
  intercept = 1.20,
  onPointsChange = () => {},
  onHoverPoint = () => {},
  selectedPointId = null,
}) => {
  const [activeCell, setActiveCell] = useState<{ row: number; col: 'x' | 'y' | 'name' | 'pred' | 'res' | 'sq' } | null>({ row: 0, col: 'x' });
  const [activeAddress, setActiveAddress] = useState<string>('B2');
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('Sheet1: OLS_Data');
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('right');

  // Compute stats
  const stats = useMemo(() => {
    const n = points.length;
    if (n === 0) return { sumX: 0, avgX: 0, sumY: 0, avgY: 0, sumSq: 0, count: 0 };
    const sumX = points.reduce((acc, p) => acc + p.x, 0);
    const sumY = points.reduce((acc, p) => acc + p.y, 0);
    const sumSq = points.reduce((acc, p) => {
      const pred = slope * p.x + intercept;
      const res = p.y - pred;
      return acc + res * res;
    }, 0);
    return {
      sumX: +sumX.toFixed(2),
      avgX: +(sumX / n).toFixed(2),
      sumY: +sumY.toFixed(2),
      avgY: +(sumY / n).toFixed(2),
      sumSq: +sumSq.toFixed(3),
      count: n,
    };
  }, [points, slope, intercept]);

  const handleCellClick = (index: number, col: 'x' | 'y' | 'name' | 'pred' | 'res' | 'sq') => {
    setActiveCell({ row: index, col });
    const colLetterMap = { name: 'A', x: 'B', y: 'C', pred: 'D', res: 'E', sq: 'F' };
    setActiveAddress(`${colLetterMap[col]}${index + 2}`);
  };

  const handleCellChange = (index: number, field: 'x' | 'y', valueStr: string) => {
    const val = parseFloat(valueStr);
    if (isNaN(val)) return;

    const clampedVal = Math.max(0, Math.min(10, val));
    const nextPoints = points.map((p, i) => {
      if (i === index) {
        return { ...p, [field]: clampedVal };
      }
      return p;
    });

    AudioChime.tick(1100);
    onPointsChange(nextPoints);
  };

  const handleAddRow = () => {
    if (points.length >= 12) return;
    AudioChime.step(points.length);
    const lastP = points[points.length - 1] || { x: 5, y: 5, id: 1 };
    const nextId = Math.max(...points.map((p) => p.id), 0) + 1;
    const newX = Math.min(9.5, +(lastP.x + 1.0).toFixed(1));
    const newY = Math.min(9.5, +(lastP.y + 0.8).toFixed(1));

    onPointsChange([...points, { id: nextId, x: newX, y: newY }]);
  };

  const handleDeleteRow = (index: number) => {
    if (points.length <= 2) return;
    AudioChime.snap();
    onPointsChange(points.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    AudioChime.tick(800);
    onPointsChange(DEFAULT_POINTS);
  };

  // Heatmap color generator
  const getResidualHeatmapStyle = (res: number) => {
    if (!showHeatmap) return {};
    const abs = Math.min(Math.abs(res), 2.5);
    const ratio = abs / 2.5;
    if (res > 0) {
      return { backgroundColor: `rgba(38, 118, 170, ${0.08 + ratio * 0.22})` };
    } else {
      return { backgroundColor: `rgba(255, 175, 204, ${0.12 + ratio * 0.28})` };
    }
  };

  const getSqHeatmapStyle = (sq: number) => {
    if (!showHeatmap) return {};
    const ratio = Math.min(sq / 4.0, 1.0);
    return {
      background: `linear-gradient(90deg, rgba(217, 119, 6, ${0.1 + ratio * 0.3}) ${ratio * 100}%, transparent ${ratio * 100}%)`,
    };
  };

  return (
    <div className="univer-excel-root">
      {/* 1. TOP APPLICATION MENU & RIBBON */}
      <div className="univer-ribbon-bar">
        {/* Quick Menu Tabs */}
        <div className="ribbon-menu-tabs">
          <span className="menu-item active">Home</span>
          <span className="menu-item">Formulas</span>
          <span className="menu-item">Data</span>
          <span className="menu-item">Visuals</span>
          <span className="menu-brand">UNIVER SHEET v2.4</span>
        </div>

        {/* Toolbar Tools */}
        <div className="ribbon-tools-row">
          {/* Clipboard / Action Group */}
          <div className="tool-group">
            <button
              type="button"
              className="tool-btn"
              onClick={handleReset}
              title="Reset Dataset to Default"
            >
              ↺ Reset
            </button>
            <button
              type="button"
              className="tool-btn primary-tool"
              onClick={handleAddRow}
              title="Insert Data Row"
            >
              ＋ Add Row
            </button>
          </div>

          <div className="tool-sep"></div>

          {/* Font Formatting */}
          <div className="tool-group">
            <button
              type="button"
              className={`tool-btn icon-tool ${isBold ? 'tool-active' : ''}`}
              onClick={() => setIsBold(!isBold)}
              title="Bold"
            >
              <b>B</b>
            </button>
            <button
              type="button"
              className={`tool-btn icon-tool ${isItalic ? 'tool-active' : ''}`}
              onClick={() => setIsItalic(!isItalic)}
              title="Italic"
            >
              <i>I</i>
            </button>
          </div>

          <div className="tool-sep"></div>

          {/* Alignment */}
          <div className="tool-group">
            <button
              type="button"
              className={`tool-btn icon-tool ${textAlign === 'left' ? 'tool-active' : ''}`}
              onClick={() => setTextAlign('left')}
              title="Align Left"
            >
              ⇤
            </button>
            <button
              type="button"
              className={`tool-btn icon-tool ${textAlign === 'center' ? 'tool-active' : ''}`}
              onClick={() => setTextAlign('center')}
              title="Align Center"
            >
              ⇹
            </button>
            <button
              type="button"
              className={`tool-btn icon-tool ${textAlign === 'right' ? 'tool-active' : ''}`}
              onClick={() => setTextAlign('right')}
              title="Align Right"
            >
              ⇥
            </button>
          </div>

          <div className="tool-sep"></div>

          {/* Conditional Formatting / Heatmap */}
          <div className="tool-group">
            <button
              type="button"
              className={`tool-btn heatmap-toggle ${showHeatmap ? 'tool-active' : ''}`}
              onClick={() => setShowHeatmap(!showHeatmap)}
              title="Toggle Live Conditional Formatting Heatmap"
            >
              🎨 Heatmap: {showHeatmap ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="tool-sep"></div>

          {/* Live Parameter Badges */}
          <div className="param-indicators">
            <span className="param-pill pill-slope">Slope (m): <b>{slope.toFixed(2)}</b></span>
            <span className="param-pill pill-intercept">Intercept (b): <b>{intercept.toFixed(2)}</b></span>
            <span className="param-pill pill-ssr">SSR (Σe²): <b>{stats.sumSq.toFixed(2)}</b></span>
          </div>
        </div>
      </div>

      {/* 2. AUTHENTIC FORMULA BAR */}
      <div className="univer-formula-strip">
        <div className="name-box-wrapper">
          <span className="name-box-text">{activeAddress}</span>
          <span className="name-box-arrow">▾</span>
        </div>
        <div className="fx-symbol" title="Insert Function">
          <i>fx</i>
        </div>
        <div className="formula-input-line">
          <span className="formula-eq">=</span>
          <span className="formula-ref token-ref-y">C{activeCell ? activeCell.row + 2 : 2}</span>
          <span className="formula-op">-</span>
          <span className="formula-paren">(</span>
          <span className="formula-const token-ref-m">${slope.toFixed(2)}</span>
          <span className="formula-op">×</span>
          <span className="formula-ref token-ref-x">B{activeCell ? activeCell.row + 2 : 2}</span>
          <span className="formula-op">+</span>
          <span className="formula-const token-ref-b">${intercept.toFixed(2)}</span>
          <span className="formula-paren">)</span>
          <span className="formula-doc-hint">← Active Residual Calculation Engine</span>
        </div>
      </div>

      {/* 3. SPREADSHEET GRID */}
      <div className="univer-canvas-wrapper">
        <table className={`univer-grid-table ${isBold ? 'text-bold' : ''} ${isItalic ? 'text-italic' : ''}`}>
          <thead>
            {/* Letters Row (A, B, C, D...) */}
            <tr className="col-letters-row">
              <th className="corner-hdr-cell">
                <span className="corner-select-all">◤</span>
              </th>
              <th className={`col-letter-hdr ${activeCell?.col === 'name' ? 'hdr-active' : ''}`}>
                <span>A</span>
                <span className="col-resize-handle"></span>
              </th>
              <th className={`col-letter-hdr ${activeCell?.col === 'x' ? 'hdr-active' : ''}`}>
                <span>B</span>
                <span className="col-resize-handle"></span>
              </th>
              <th className={`col-letter-hdr ${activeCell?.col === 'y' ? 'hdr-active' : ''}`}>
                <span>C</span>
                <span className="col-resize-handle"></span>
              </th>
              <th className={`col-letter-hdr ${activeCell?.col === 'pred' ? 'hdr-active' : ''}`}>
                <span>D</span>
                <span className="col-resize-handle"></span>
              </th>
              <th className={`col-letter-hdr ${activeCell?.col === 'res' ? 'hdr-active' : ''}`}>
                <span>E</span>
                <span className="col-resize-handle"></span>
              </th>
              <th className={`col-letter-hdr ${activeCell?.col === 'sq' ? 'hdr-active' : ''}`}>
                <span>F</span>
                <span className="col-resize-handle"></span>
              </th>
              <th className="col-letter-hdr del-col-hdr"></th>
            </tr>

            {/* Column Description / Parameter Schema Row */}
            <tr className="col-schema-row">
              <th className="row-num-hdr">1</th>
              <th className="schema-cell">Point ID</th>
              <th className="schema-cell param-cell-x">
                <span className="param-tag tag-x">● x</span>
                <span>Feature</span>
              </th>
              <th className="schema-cell param-cell-y">
                <span className="param-tag tag-y">● y</span>
                <span>Target</span>
              </th>
              <th className="schema-cell">
                <span>ŷ (m·x + b)</span>
              </th>
              <th className="schema-cell param-cell-res">
                <span className="param-tag tag-res">● e</span>
                <span>y - ŷ</span>
              </th>
              <th className="schema-cell">
                <span>e² (Loss)</span>
              </th>
              <th className="schema-cell del-col-hdr"></th>
            </tr>
          </thead>

          <tbody>
            {points.map((p, idx) => {
              const rowNum = idx + 2;
              const pred = slope * p.x + intercept;
              const res = p.y - pred;
              const sq = res * res;
              const isSelected = selectedPointId === p.id;
              const isRowActive = activeCell?.row === idx;

              return (
                <tr
                  key={p.id}
                  className={`univer-data-row ${isSelected ? 'row-drag-selected' : ''} ${isRowActive ? 'row-active-indicator' : ''}`}
                  onMouseEnter={() => onHoverPoint && onHoverPoint(p.id)}
                  onMouseLeave={() => onHoverPoint && onHoverPoint(null)}
                >
                  {/* Row Number Header */}
                  <th className={`row-num-hdr ${isRowActive ? 'row-num-active' : ''}`}>
                    {rowNum}
                  </th>

                  {/* Col A: Point Name */}
                  <td
                    className={`univer-cell name-cell ${activeCell?.row === idx && activeCell.col === 'name' ? 'cell-focused' : ''}`}
                    onClick={() => handleCellClick(idx, 'name')}
                  >
                    <span className="point-name-tag">P{p.id}</span>
                    {activeCell?.row === idx && activeCell.col === 'name' && (
                      <span className="cell-fill-handle" title="Drag to fill"></span>
                    )}
                  </td>

                  {/* Col B: X Input (Editable) */}
                  <td
                    className={`univer-cell cell-input-wrapper ${activeCell?.row === idx && activeCell.col === 'x' ? 'cell-focused cell-focused-x' : ''}`}
                    onClick={() => handleCellClick(idx, 'x')}
                  >
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      className="sheet-number-input input-x"
                      style={{ textAlign }}
                      value={p.x}
                      onChange={(e) => handleCellChange(idx, 'x', e.target.value)}
                      aria-label={`Point ${p.id} X value`}
                    />
                    {activeCell?.row === idx && activeCell.col === 'x' && (
                      <span className="cell-fill-handle fill-handle-blue" title="Drag to fill"></span>
                    )}
                  </td>

                  {/* Col C: Y Target (Editable) */}
                  <td
                    className={`univer-cell cell-input-wrapper ${activeCell?.row === idx && activeCell.col === 'y' ? 'cell-focused cell-focused-y' : ''}`}
                    onClick={() => handleCellClick(idx, 'y')}
                  >
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      className="sheet-number-input input-y"
                      style={{ textAlign }}
                      value={p.y}
                      onChange={(e) => handleCellChange(idx, 'y', e.target.value)}
                      aria-label={`Point ${p.id} Y value`}
                    />
                    {activeCell?.row === idx && activeCell.col === 'y' && (
                      <span className="cell-fill-handle fill-handle-purple" title="Drag to fill"></span>
                    )}
                  </td>

                  {/* Col D: Predicted ŷ */}
                  <td
                    className={`univer-cell readonly-cell ${activeCell?.row === idx && activeCell.col === 'pred' ? 'cell-focused' : ''}`}
                    style={{ textAlign }}
                    onClick={() => handleCellClick(idx, 'pred')}
                  >
                    {pred.toFixed(2)}
                    {activeCell?.row === idx && activeCell.col === 'pred' && (
                      <span className="cell-fill-handle"></span>
                    )}
                  </td>

                  {/* Col E: Residual (e) with Heatmap */}
                  <td
                    className={`univer-cell readonly-cell cell-residual ${activeCell?.row === idx && activeCell.col === 'res' ? 'cell-focused' : ''}`}
                    style={{ ...getResidualHeatmapStyle(res), textAlign }}
                    onClick={() => handleCellClick(idx, 'res')}
                  >
                    <span className={`res-val ${res >= 0 ? 'res-pos' : 'res-neg'}`}>
                      {res >= 0 ? `+${res.toFixed(2)}` : res.toFixed(2)}
                    </span>
                    {activeCell?.row === idx && activeCell.col === 'res' && (
                      <span className="cell-fill-handle"></span>
                    )}
                  </td>

                  {/* Col F: Squared Error (e²) */}
                  <td
                    className={`univer-cell readonly-cell cell-sq-err ${activeCell?.row === idx && activeCell.col === 'sq' ? 'cell-focused' : ''}`}
                    style={{ ...getSqHeatmapStyle(sq), textAlign }}
                    onClick={() => handleCellClick(idx, 'sq')}
                  >
                    <span className="sq-val">{sq.toFixed(3)}</span>
                    {activeCell?.row === idx && activeCell.col === 'sq' && (
                      <span className="cell-fill-handle"></span>
                    )}
                  </td>

                  {/* Delete Action */}
                  <td className="univer-cell del-cell">
                    <button
                      type="button"
                      className="row-del-btn"
                      onClick={() => handleDeleteRow(idx)}
                      title={`Delete row ${p.id}`}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 4. BOTTOM SHEET TABS & STATUS BAR */}
      <div className="univer-bottom-bar">
        {/* Sheet Tabs */}
        <div className="sheet-tabs-container">
          <button
            type="button"
            className="add-sheet-btn"
            onClick={handleAddRow}
            title="Add New Row"
          >
            ＋
          </button>
          <div
            className={`sheet-tab ${activeTab === 'Sheet1: OLS_Data' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('Sheet1: OLS_Data')}
          >
            <span className="tab-icon">📄</span>
            <span>Sheet1: OLS_Data</span>
          </div>
          <div
            className={`sheet-tab ${activeTab === 'Sheet2: Loss_Surface' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('Sheet2: Loss_Surface')}
          >
            <span className="tab-icon">📈</span>
            <span>Loss_Surface</span>
          </div>
          <div
            className={`sheet-tab ${activeTab === 'Sheet3: Parameters_Matrix' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('Sheet3: Parameters_Matrix')}
          >
            <span className="tab-icon">🔢</span>
            <span>Parameters_Matrix</span>
          </div>
        </div>

        {/* Live Aggregation Status Bar */}
        <div className="sheet-status-bar">
          <span className="status-item"><b>COUNT:</b> {stats.count}</span>
          <span className="status-item"><b>AVG(x):</b> {stats.avgX}</span>
          <span className="status-item"><b>AVG(y):</b> {stats.avgY}</span>
          <span className="status-item status-sum"><b>SUM(e²):</b> {stats.sumSq}</span>
          <span className="status-zoom">100% ▾</span>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .univer-excel-root {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border, #cbd5e1);
          border-radius: 8px;
          background: #ffffff;
          box-shadow: 0 4px 16px rgba(162, 210, 255, 0.15);
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          font-size: 12px;
          color: #1a1a2e;
          overflow: hidden;
          margin-top: 1rem;
        }

        /* 1. Ribbon Bar */
        .univer-ribbon-bar {
          display: flex;
          flex-direction: column;
          background: #f1f5f9;
          border-bottom: 1px solid #cbd5e1;
        }

        .ribbon-menu-tabs {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 4px 12px;
          background: #e2e8f0;
          font-size: 11px;
          font-weight: 500;
          color: #475569;
          border-bottom: 1px solid #cbd5e1;
        }

        .menu-item {
          cursor: pointer;
          padding: 2px 6px;
          border-radius: 3px;
        }

        .menu-item:hover {
          background: #cbd5e1;
        }

        .menu-item.active {
          background: #ffffff;
          color: #2676aa;
          font-weight: 700;
        }

        .menu-brand {
          margin-left: auto;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #64748b;
        }

        .ribbon-tools-row {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          flex-wrap: wrap;
        }

        .tool-group {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .tool-btn {
          height: 26px;
          padding: 0 8px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          font-size: 11.5px;
          font-weight: 500;
          color: #334155;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .tool-btn:hover {
          background: #f8fafc;
          border-color: #94a3b8;
        }

        .tool-btn.primary-tool {
          background: #2676aa;
          color: #ffffff;
          border-color: #20638f;
          font-weight: 600;
        }

        .tool-btn.primary-tool:hover {
          background: #20638f;
        }

        .tool-btn.icon-tool {
          width: 26px;
          padding: 0;
          font-family: serif;
          font-size: 13px;
        }

        .tool-btn.tool-active {
          background: #dceeff;
          border-color: #2676aa;
          color: #2676aa;
          font-weight: 700;
        }

        .tool-btn.heatmap-toggle {
          background: #fdf2f8;
          border-color: #fbcfe8;
          color: #9d174d;
          font-weight: 600;
        }

        .tool-btn.heatmap-toggle.tool-active {
          background: #ec4899;
          border-color: #db2777;
          color: #ffffff;
        }

        .tool-sep {
          width: 1px;
          height: 18px;
          background: #cbd5e1;
          margin: 0 4px;
        }

        .param-indicators {
          margin-left: auto;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .param-pill {
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-family: var(--font-mono, monospace);
          border: 1px solid;
        }

        .pill-slope {
          background: #eff6ff;
          border-color: #bfdbfe;
          color: #1d4ed8;
        }

        .pill-intercept {
          background: #f5f3ff;
          border-color: #ddd6fe;
          color: #6d28d9;
        }

        .pill-ssr {
          background: #fffbeb;
          border-color: #fde68a;
          color: #b45309;
        }

        /* 2. Formula Strip */
        .univer-formula-strip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          font-family: var(--font-mono, monospace);
          font-size: 11.5px;
        }

        .name-box-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 58px;
          height: 22px;
          padding: 0 6px;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 3px;
          font-weight: 700;
          color: #1e293b;
        }

        .name-box-arrow {
          font-size: 8px;
          color: #64748b;
        }

        .fx-symbol {
          color: #64748b;
          font-size: 13px;
          font-weight: 700;
          padding: 0 4px;
          user-select: none;
        }

        .formula-input-line {
          display: flex;
          align-items: center;
          gap: 5px;
          flex: 1;
          background: #ffffff;
          padding: 2px 8px;
          border: 1px solid #e2e8f0;
          border-radius: 3px;
          overflow-x: auto;
          white-space: nowrap;
        }

        .formula-eq {
          color: #64748b;
          font-weight: 700;
        }

        .formula-ref {
          font-weight: 700;
          padding: 1px 4px;
          border-radius: 3px;
        }

        .token-ref-y {
          color: #7c3aed;
          background: #f5f3ff;
        }

        .token-ref-x {
          color: #2563eb;
          background: #eff6ff;
        }

        .token-ref-m {
          color: #0284c7;
          font-weight: 700;
        }

        .token-ref-b {
          color: #9333ea;
          font-weight: 700;
        }

        .formula-op {
          color: #475569;
          font-weight: 700;
        }

        .formula-paren {
          color: #64748b;
        }

        .formula-doc-hint {
          margin-left: auto;
          font-size: 10px;
          color: #94a3b8;
          font-style: italic;
        }

        /* 3. Spreadsheet Grid Table */
        .univer-canvas-wrapper {
          overflow-x: auto;
          background: #ffffff;
        }

        .univer-grid-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .univer-grid-table.text-bold td input,
        .univer-grid-table.text-bold td span {
          font-weight: 700;
        }

        .univer-grid-table.text-italic td input,
        .univer-grid-table.text-italic td span {
          font-style: italic;
        }

        /* Column Letters & Headers */
        .col-letters-row th {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #475569;
          font-weight: 600;
          font-size: 11px;
          padding: 3px 0;
          text-align: center;
          position: relative;
          user-select: none;
        }

        .col-letter-hdr.hdr-active {
          background: #e2e8f0;
          color: #2676aa;
          font-weight: 800;
        }

        .col-resize-handle {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          cursor: col-resize;
        }

        .corner-hdr-cell {
          width: 32px;
          background: #f1f5f9;
          cursor: pointer;
        }

        .corner-select-all {
          font-size: 8px;
          color: #94a3b8;
        }

        .col-schema-row th {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          padding: 5px 8px;
          font-size: 11px;
          color: #334155;
          font-weight: 600;
          text-align: left;
        }

        .param-tag {
          font-size: 9.5px;
          padding: 1px 4px;
          border-radius: 3px;
          margin-right: 4px;
          font-family: var(--font-mono, monospace);
        }

        .tag-x { background: #dbeafe; color: #1e40af; }
        .tag-y { background: #f3e8ff; color: #6b21a8; }
        .tag-res { background: #ffe4e6; color: #9f1239; }

        /* Row Headers & Cells */
        .row-num-hdr {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #64748b;
          font-size: 10.5px;
          font-weight: 600;
          text-align: center;
          width: 32px;
          user-select: none;
        }

        .row-num-active {
          background: #e2e8f0;
          color: #2676aa;
          font-weight: 800;
        }

        .univer-cell {
          border: 1px solid #e2e8f0;
          padding: 0 6px;
          height: 28px;
          position: relative;
          font-family: var(--font-mono, monospace);
          font-size: 11.5px;
        }

        .point-name-tag {
          font-weight: 700;
          color: #475569;
        }

        .sheet-number-input {
          width: 100%;
          height: 24px;
          border: none;
          background: transparent;
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          font-weight: 600;
          color: #0f172a;
          outline: none;
          padding: 0;
        }

        .input-x { color: #1d4ed8; }
        .input-y { color: #7e22ce; }

        /* Focus & Selection Frame with Corner Fill-Handle */
        .cell-focused {
          outline: 2px solid #2676aa !important;
          outline-offset: -1px;
          background: #f0f9ff !important;
          z-index: 2;
        }

        .cell-focused-x {
          outline: 2px solid #2563eb !important;
        }

        .cell-focused-y {
          outline: 2px solid #9333ea !important;
        }

        .cell-fill-handle {
          position: absolute;
          right: -3px;
          bottom: -3px;
          width: 6px;
          height: 6px;
          background: #2676aa;
          border: 1px solid #ffffff;
          cursor: crosshair;
          z-index: 3;
        }

        .fill-handle-blue { background: #2563eb; }
        .fill-handle-purple { background: #9333ea; }

        .row-drag-selected {
          background: #e0f2fe !important;
        }

        .res-pos { color: #0284c7; font-weight: 600; }
        .res-neg { color: #e11d48; font-weight: 600; }
        .sq-val { color: #b45309; font-weight: 600; }

        .del-col-hdr { width: 30px; text-align: center; }
        .del-cell { text-align: center; padding: 0; }
        .row-del-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 16px;
          cursor: pointer;
          padding: 0 4px;
        }

        .row-del-btn:hover {
          color: #ef4444;
        }

        /* 4. Bottom Sheet Tabs & Status Bar */
        .univer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f1f5f9;
          border-top: 1px solid #cbd5e1;
          padding: 2px 10px;
          font-size: 11px;
          color: #475569;
          flex-wrap: wrap;
          gap: 8px;
        }

        .sheet-tabs-container {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .add-sheet-btn {
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          border-radius: 3px;
          cursor: pointer;
          font-weight: 700;
          color: #475569;
        }

        .add-sheet-btn:hover {
          background: #e2e8f0;
        }

        .sheet-tab {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 3px 10px;
          background: #e2e8f0;
          border: 1px solid #cbd5e1;
          border-bottom: none;
          border-radius: 4px 4px 0 0;
          cursor: pointer;
          font-weight: 500;
        }

        .sheet-tab.tab-active {
          background: #ffffff;
          color: #2676aa;
          font-weight: 700;
          border-top: 2px solid #2676aa;
        }

        .sheet-status-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono, monospace);
          font-size: 10.5px;
        }

        .status-sum {
          color: #b45309;
        }

        .status-zoom {
          color: #64748b;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
