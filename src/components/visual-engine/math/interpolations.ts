/**
 * interpolations.ts
 * 3Blue1Brown / Manim-inspired mathematical interpolation and easing utilities.
 */

/** Linear interpolation between a and b by factor t */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Clamp a value between min and max bounds */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/** Standard Hermite smoothstep interpolation (3t^2 - 2t^3) */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

/** Ken Perlin's smootherstep (6t^5 - 15t^4 + 10t^3) with zero 1st and 2nd derivatives at endpoints */
export function smootherstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/** Standard Sigmoid activation function scaled for smooth transitions */
export function sigmoid(x: number, steepness: number = 1): number {
  return 1 / (1 + Math.exp(-steepness * x));
}

/** 3B1B-style cubic ease-in-out curve for natural mathematical motion */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Quadratic ease-in-out curve */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/** Exponential ease-out for fast burst settling */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/** Compute point along a 2D cubic bezier curve */
export function cubicBezier2D(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  t: number
): [number, number] {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const x = uuu * p0[0] + 3 * uu * t * p1[0] + 3 * u * tt * p2[0] + ttt * p3[0];
  const y = uuu * p0[1] + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + ttt * p3[1];

  return [x, y];
}

/** Compute point along a 3D cubic bezier curve */
export function cubicBezier3D(
  p0: [number, number, number],
  p1: [number, number, number],
  p2: [number, number, number],
  p3: [number, number, number],
  t: number
): [number, number, number] {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const x = uuu * p0[0] + 3 * uu * t * p1[0] + 3 * u * tt * p2[0] + ttt * p3[0];
  const y = uuu * p0[1] + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + ttt * p3[1];
  const z = uuu * p0[2] + 3 * uu * t * p1[2] + 3 * u * tt * p2[2] + ttt * p3[2];

  return [x, y, z];
}
