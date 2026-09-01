/**
 * AudioChime.ts
 * Subtle, high-class procedural audio synthesis for Explanatory Systems Studio.
 * Zero external audio assets; uses native Web Audio API oscillators and gain envelopes.
 * Adds tactile, satisfying feedback to algorithm steps, convergence, and "BAM!" moments.
 */

class AudioFeedbackEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazy audio context initialization on first user interaction
  }

  private getContext(): AudioContext | null {
    if (this.isMuted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  /** Subtle tick for slider motion or scrubbers */
  public tick(pitch: number = 800): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }

  /** Soft harmonic pluck for taking an algorithm step */
  public step(stepIndex: number = 0): void {
    const ctx = this.getContext();
    if (!ctx) return;

    // Pentatonic scale frequency calculation based on step
    const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    const freq = pentatonic[stepIndex % pentatonic.length];

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  }

  /** Resonant, pleasant chord for convergence or 1-click solve ("BAM!") */
  public bam(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    // Major triad chord: C5 (523.25), E5 (659.25), G5 (783.99), C6 (1046.50)
    const chord = [523.25, 659.25, 783.99, 1046.50];

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.02);

      gain.gain.setValueAtTime(0.06 / (i + 1), ctx.currentTime + i * 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.02);
      osc.stop(ctx.currentTime + 0.45);
    });
  }

  /** Soft snap sound for threshold crossovers */
  public snap(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }
}

export const AudioChime = new AudioFeedbackEngine();
