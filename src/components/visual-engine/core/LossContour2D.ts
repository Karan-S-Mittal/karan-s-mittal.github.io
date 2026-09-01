/**
 * LossContour2D.ts
 * 2D Loss Contour & Optimization Landscape Engine.
 * Evaluates and renders 2D isocontours, gradient vectors, and optimization trajectories.
 * Adheres to Soft Architecture visual grammar.
 */

import { BasePlot2D, type Domain2D } from './BasePlot2D';

export type LossFunction2D = (w: number, b: number) => number;

export interface OptimizationTrajectoryPoint {
  w: number;
  b: number;
  loss: number;
  gradW?: number;
  gradB?: number;
}

export class LossContour2D extends BasePlot2D {
  private lossFn: LossFunction2D = (w, b) => (w - 2) ** 2 + 2 * (b - 1) ** 2;
  private contourLevels: number[] = [];
  private gridResolution: number = 40;
  private gridLosses: Float32Array | null = null;
  private minLoss: number = 0;
  private maxLoss: number = 100;

  private trajectory: OptimizationTrajectoryPoint[] = [];

  constructor() {
    super();
    this.domain = { minX: -2, maxX: 6, minY: -2, maxY: 4 };
  }

  public setLossFunction(fn: LossFunction2D, domain?: Domain2D): void {
    this.lossFn = fn;
    if (domain) this.domain = domain;
    this.recomputeGrid();
  }

  public setTrajectory(path: OptimizationTrajectoryPoint[]): void {
    this.trajectory = path;
  }

  private recomputeGrid(): void {
    const N = this.gridResolution;
    this.gridLosses = new Float32Array(N * N);
    const { minX, maxX, minY, maxY } = this.domain;

    let min = Infinity;
    let max = -Infinity;

    for (let j = 0; j < N; j++) {
      const y = minY + (j / (N - 1)) * (maxY - minY);
      for (let i = 0; i < N; i++) {
        const x = minX + (i / (N - 1)) * (maxX - minX);
        const l = this.lossFn(x, y);
        this.gridLosses[j * N + i] = l;
        if (l < min) min = l;
        if (l > max) max = l;
      }
    }

    this.minLoss = min;
    this.maxLoss = Math.min(max, min + 50); // clamp upper bound for crisp contours

    // Generate logarithmically/exponentially spaced contour thresholds
    this.contourLevels = [];
    const numLevels = 10;
    for (let k = 1; k <= numLevels; k++) {
      const t = k / numLevels;
      this.contourLevels.push(this.minLoss + (t * t) * (this.maxLoss - this.minLoss));
    }
  }

  protected render(): void {
    if (!this.gridLosses) {
      this.recomputeGrid();
    }

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Grid
    this.drawGrid(1, 1);

    // 2. Draw Contour Elevation Rings
    this.drawContours();

    // 3. Draw Trajectory Path
    this.drawTrajectory();
  }

  private drawContours(): void {
    if (!this.gridLosses) return;
    const ctx = this.ctx;
    const N = this.gridResolution;
    const { minX, maxX, minY, maxY } = this.domain;

    ctx.save();
    ctx.lineWidth = 1.2;

    // Soft contour line rendering using marching segments
    for (let cIdx = 0; cIdx < this.contourLevels.length; cIdx++) {
      const level = this.contourLevels[cIdx];
      const isLowest = cIdx === 0;

      // Color from Anchor Blue (low) to Signal Pink (high)
      const ratio = cIdx / (this.contourLevels.length - 1);
      ctx.strokeStyle = isLowest
        ? this.themeColors.accent
        : ratio > 0.6
        ? 'rgba(255, 175, 204, 0.45)'
        : 'rgba(205, 180, 219, 0.35)';

      ctx.beginPath();
      for (let j = 0; j < N - 1; j++) {
        const y0 = minY + (j / (N - 1)) * (maxY - minY);
        const y1 = minY + ((j + 1) / (N - 1)) * (maxY - minY);

        for (let i = 0; i < N - 1; i++) {
          const x0 = minX + (i / (N - 1)) * (maxX - minX);
          const x1 = minX + ((i + 1) / (N - 1)) * (maxX - minX);

          const v00 = this.gridLosses[j * N + i];
          const v10 = this.gridLosses[j * N + (i + 1)];
          const v01 = this.gridLosses[(j + 1) * N + i];
          const v11 = this.gridLosses[(j + 1) * N + (i + 1)];

          // Simple mid-point isocontour approximation
          const avg = (v00 + v10 + v01 + v11) / 4;
          if (Math.abs(avg - level) < (this.maxLoss - this.minLoss) / (N * 1.5)) {
            const p = this.toPixel((x0 + x1) / 2, (y0 + y1) / 2);
            ctx.rect(p.px - 1, p.py - 1, 2, 2);
          }
        }
      }
      ctx.stroke();
    }

    ctx.restore();
  }

  private drawTrajectory(): void {
    if (this.trajectory.length === 0) return;
    const ctx = this.ctx;

    ctx.save();

    // 1. Path Trail Line
    ctx.beginPath();
    ctx.strokeStyle = this.themeColors.signalWarm;
    ctx.lineWidth = 2;
    this.trajectory.forEach((pt, idx) => {
      const pix = this.toPixel(pt.w, pt.b);
      if (idx === 0) ctx.moveTo(pix.px, pix.py);
      else ctx.lineTo(pix.px, pix.py);
    });
    ctx.stroke();

    // 2. Iteration Dots
    this.trajectory.forEach((pt, idx) => {
      const pix = this.toPixel(pt.w, pt.b);
      const isStart = idx === 0;
      const isCurrent = idx === this.trajectory.length - 1;

      ctx.beginPath();
      ctx.arc(pix.px, pix.py, isCurrent ? 6 : isStart ? 5 : 3, 0, Math.PI * 2);
      ctx.fillStyle = isCurrent ? this.themeColors.signalWarm : isStart ? this.themeColors.accent : this.themeColors.text;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (isCurrent && pt.gradW !== undefined && pt.gradB !== undefined) {
        // Draw negative gradient downhill arrow
        const scale = 0.3;
        this.drawVectorArrow(
          pt.w,
          pt.b,
          pt.w - pt.gradW * scale,
          pt.b - pt.gradB * scale,
          this.themeColors.signalWarm,
          2.5,
          8
        );
      }
    });

    ctx.restore();
  }
}
