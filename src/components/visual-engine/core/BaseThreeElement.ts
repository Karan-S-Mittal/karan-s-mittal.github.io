/**
 * BaseThreeElement.ts
 * Abstract Custom Element for WebGL / Three.js 3D Explanatory Visuals.
 * Features automatic DPR clamping, OrbitControls, IntersectionObserver auto-pause,
 * ResizeObserver, ThemeBridge synchronization, and comprehensive WebGL memory disposal.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ThemeBridge, type ThemeColors } from './ThemeBridge';

export abstract class BaseThreeElement extends HTMLElement {
  protected scene!: THREE.Scene;
  protected camera!: THREE.PerspectiveCamera;
  protected renderer!: THREE.WebGLRenderer;
  protected controls?: OrbitControls;

  protected container!: HTMLElement;
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
  private reducedMotionQuery: MediaQueryList | null = null;
  private readonly reducedMotionListener = (event: MediaQueryListEvent) => {
    this.prefersReducedMotion = event.matches;
    if (event.matches) {
      this.stopAnimation();
    } else if (this.isVisible && this.shouldAnimate()) {
      this.startAnimation();
    }
  };

  connectedCallback() {
    this.container = this.querySelector('.three-canvas-container') || this;
    this.themeColors = ThemeBridge.getColors();

    // Resolve this before initScene: child scenes may call startAnimation() while
    // they are being constructed. Reduced-motion must be respected from frame 1.
    this.reducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)') || null;
    this.prefersReducedMotion = this.reducedMotionQuery?.matches || false;
    this.reducedMotionQuery?.addEventListener('change', this.reducedMotionListener);

    this.initThree();
    this.initScene();

    this.unsubscribeTheme = ThemeBridge.subscribe((colors) => {
      this.themeColors = colors;
      this.onThemeChange(colors);
      this.renderFrame(performance.now());
    });

    this.initObservers();
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
    this.reducedMotionQuery?.removeEventListener('change', this.reducedMotionListener);
    this.reducedMotionQuery = null;

    this.controls?.dispose();
    this.disposeThree();
    this.onDestroy();
  }

  private initThree(): void {
    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera (default perspective, child can reconfigure)
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.camera.position.set(0, 0, 20);

    // 3. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    // Attach to DOM
    this.container.appendChild(this.renderer.domElement);

    // 4. OrbitControls
    if (this.enableOrbitControls()) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.rotateSpeed = 0.8;
      this.controls.zoomSpeed = 0.8;
      this.controls.enablePan = false;
      this.controls.addEventListener('change', () => {
        if (!this.isRunning) this.renderFrame(performance.now());
      });
    }
  }

  private initObservers(): void {
    // ResizeObserver
    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(this.container);

    // IntersectionObserver
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
    const rect = this.container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    this.width = rect.width;
    this.height = rect.height;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);

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
      this.controls?.update();
      this.render(time);
      this.renderer.render(this.scene, this.camera);
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

  public renderFrame(time: number): void {
    if (!this.renderer || this.width === 0 || this.height === 0) return;
    this.controls?.update();
    this.render(time);
    this.renderer.render(this.scene, this.camera);
  }

  private disposeThree(): void {
    if (!this.scene) return;

    // Traverse and dispose all geometries, materials, textures
    this.scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points)) return;

      if (object.geometry) {
        object.geometry.dispose();
      }

      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => this.disposeMaterial(mat));
        } else {
          this.disposeMaterial(object.material);
        }
      }
    });

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      if (this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
    }
  }

  private disposeMaterial(material: THREE.Material): void {
    material.dispose();
    for (const key of Object.keys(material)) {
      const value = (material as Record<string, unknown>)[key];
      if (value && typeof value === 'object' && 'isTexture' in value && value.isTexture) {
        (value as THREE.Texture).dispose();
      }
    }
  }

  // --- Abstract & Configurable Hooks ---
  protected abstract initScene(): void;
  protected abstract render(time: number): void;
  protected abstract onResize(width: number, height: number): void;
  protected abstract onThemeChange(colors: ThemeColors): void;
  protected enableOrbitControls(): boolean { return true; }
  protected shouldAnimate(): boolean { return true; }
  protected onDestroy(): void {}
}
