/**
 * BasePlot2D.ts
 * High-performance abstract base class for 2D mathematical and ML plots.
 * Provides coordinate mappings, grid/axis rendering, vector drawing,
 * interactive point manipulation, and theme synchronization.
 */

import { BaseCanvasElement } from './BaseCanvasElement';

export interface Domain2D {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface Padding2D {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface PlotPoint2D {
  id: string | number;
  x: number;
  y: number;
  label?: string;
  color?: string;
  radius?: number;
}

export abstract class BasePlot2D extends BaseCanvasElement {
  protected domain: Domain2D = { minX: 0, maxX: 10, minY: 0, maxY: 10 };
  protected padding: Padding2D = { top: 30, right: 30, bottom: 35, left: 40 };

  protected get graphWidth(): number {
    return Math.max(10, this.width - this.padding.left - this.padding.right);
  }

  protected get graphHeight(): number {
    return Math.max(10, this.height - this.padding.top - this.padding.bottom);
  }

  /** Convert data coordinate (x, y) to canvas CSS pixel (px, py) */
  public toPixel(x: number, y: number): { px: number; py: number } {
    const { minX, maxX, minY, maxY } = this.domain;
    const normX = (x - minX) / Math.max(0.0001, maxX - minX);
    const normY = (y - minY) / Math.max(0.0001, maxY - minY);

    const px = this.padding.left + normX * this.graphWidth;
    const py = this.height - this.padding.bottom - normY * this.graphHeight;
    return { px, py };
  }

  /** Convert canvas pixel (px, py) to data coordinate (x, y) */
  public toData(px: number, py: number): { x: number; y: number } {
    const { minX, maxX, minY, maxY } = this.domain;
    const normX = (px - this.padding.left) / Math.max(1, this.graphWidth);
    const normY = (this.height - this.padding.bottom - py) / Math.max(1, this.graphHeight);

    const x = minX + Math.max(0, Math.min(1, normX)) * (maxX - minX);
    const y = minY + Math.max(0, Math.min(1, normY)) * (maxY - minY);
    return { x, y };
  }

  /** Draw standard Soft Architecture grid and tick numbers */
  protected drawGrid(xStep: number = 2, yStep: number = 2): void {
    const ctx = this.ctx;
    const { minX, maxX, minY, maxY } = this.domain;

    ctx.save();
    ctx.strokeStyle = this.themeColors.border;
    ctx.lineWidth = 1;

    ctx.beginPath();
    // Vertical Grid Lines
    for (let x = minX; x <= maxX; x += xStep) {
      const p = this.toPixel(x, minY);
      ctx.moveTo(p.px, this.padding.top);
      ctx.lineTo(p.px, this.height - this.padding.bottom);
    }

    // Horizontal Grid Lines
    for (let y = minY; y <= maxY; y += yStep) {
      const p = this.toPixel(minX, y);
      ctx.moveTo(this.padding.left, p.py);
      ctx.lineTo(this.width - this.padding.right, p.py);
    }
    ctx.stroke();

    // Axis Labels
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.fillStyle = this.themeColors.textMuted;

    // X Ticks
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let x = minX; x <= maxX; x += xStep) {
      const p = this.toPixel(x, minY);
      ctx.fillText(String(x), p.px, p.py + 8);
    }

    // Y Ticks
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = minY; y <= maxY; y += yStep) {
      const p = this.toPixel(minX, y);
      ctx.fillText(String(y), p.px - 8, p.py);
    }

    ctx.restore();
  }

  /** Draw a crisp vector arrow from (x0, y0) to (x1, y1) in data coords */
  protected drawVectorArrow(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: string = this.themeColors.accent,
    lineWidth: number = 2,
    headSize: number = 7
  ): void {
    const ctx = this.ctx;
    const from = this.toPixel(x0, y0);
    const to = this.toPixel(x1, y1);

    const angle = Math.atan2(to.py - from.py, to.px - from.px);

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = lineWidth;

    // Shaft
    ctx.beginPath();
    ctx.moveTo(from.px, from.py);
    ctx.lineTo(to.px, to.py);
    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.moveTo(to.px, to.py);
    ctx.lineTo(
      to.px - headSize * Math.cos(angle - Math.PI / 6),
      to.py - headSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      to.px - headSize * Math.cos(angle + Math.PI / 6),
      to.py - headSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  /** Helper to find the nearest point within a click radius */
  protected findPointAtPixel(px: number, py: number, points: PlotPoint2D[], hitRadius: number = 18): number {
    let nearestIdx = -1;
    let minDistance = hitRadius;

    points.forEach((p, idx) => {
      const pPix = this.toPixel(p.x, p.y);
      const d = Math.hypot(pPix.px - px, pPix.py - py);
      if (d < minDistance) {
        minDistance = d;
        nearestIdx = idx;
      }
    });

    return nearestIdx;
  }
}
