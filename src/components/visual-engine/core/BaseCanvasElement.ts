/**
 * BaseCanvasElement.ts
 * Abstract Custom Element for High-Performance 2D Canvas Explanatory Visuals.
 * Built-in DPR scaling, IntersectionObserver auto-pause, ResizeObserver, and ThemeBridge sync.
 */

import { ThemeBridge, type ThemeColors } from './ThemeBridge';

export abstract class BaseCanvasElement extends HTMLElement {
  protected canvas!: HTMLCanvasElement;
  protected ctx!: CanvasRenderingContext2D;
  protected animFrameId: number | null = null;
  protected isVisible: boolean = false;
  protected isRunning: boolean = false;
  protected width: number = 0;
  protected height: number = 0;
  protected dpr: number = 1;
  protected themeColors!: ThemeColors;

  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private unsubscribeTheme: (() => void) | null = null;
  private prefersReducedMotion: boolean = false;

  connectedCallback() {
    this.canvas = this.querySelector('canvas') as HTMLCanvasElement;
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.appendChild(this.canvas);
    }

    const context = this.canvas.getContext('2d');
    if (!context) {
      console.error('Failed to get 2D rendering context');
      return;
    }
    this.ctx = context;

    this.themeColors = ThemeBridge.getColors();
    this.unsubscribeTheme = ThemeBridge.subscribe((colors) => {
      this.themeColors = colors;
      this.onThemeChange(colors);
      this.renderFrame(performance.now());
    });

    this.prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;

    this.initObservers();
    this.initScene();
    this.handleResize();
  }

  disconnectedCallback() {
    this.stopAnimation();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    if (this.unsubscribeTheme) {
      this.unsubscribeTheme();
      this.unsubscribeTheme = null;
    }
    this.onDestroy();
  }

  private initObservers(): void {
    // 1. ResizeObserver
    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this);

    // 2. IntersectionObserver (Pause loop when scrolled off-screen)
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible) {
            if (this.shouldAnimate() && !this.isRunning) {
              this.startAnimation();
            } else {
              this.renderFrame(performance.now());
            }
          } else {
            this.stopAnimation();
          }
        }
      },
      { threshold: 0.05 }
    );
    this.intersectionObserver.observe(this);
  }

  private handleResize(): void {
    const container = this.canvas.parentElement || this;
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    this.dpr = Math.min(window.devicePixelRatio || 1, 2.5); // Cap at 2.5x to prevent extreme VRAM allocations
    this.width = rect.width;
    this.height = rect.height;

    // Physical pixel buffer size
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);

    // CSS display size
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    // Normalize scale so drawing commands use standard CSS pixel coordinates
    this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
    this.ctx.scale(this.dpr, this.dpr);

    this.onResize(this.width, this.height);
    this.renderFrame(performance.now());
  }

  public startAnimation(): void {
    if (this.isRunning || this.prefersReducedMotion) return;
    this.isRunning = true;

    const loop = (time: number) => {
      if (!this.isRunning || !this.isVisible) {
        this.isRunning = false;
        return;
      }
      this.renderFrame(time);
      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  public stopAnimation(): void {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  /** Render a single frame with error safety */
  public renderFrame(time: number): void {
    if (!this.ctx || this.width === 0 || this.height === 0) return;
    this.render(time);
  }

  // --- Abstract Hooks for Child Classes ---
  protected abstract initScene(): void;
  protected abstract render(time: number): void;
  protected abstract onResize(width: number, height: number): void;
  protected abstract onThemeChange(colors: ThemeColors): void;
  protected shouldAnimate(): boolean { return true; }
  protected onDestroy(): void {}
}
