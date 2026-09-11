/**
 * Pure mathematical utility for Ordinary Least Squares (OLS) regression.
 * Centralizes regression parameters, residual calculations, and loss curves.
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface OLSResult {
  optM: number;
  optB: number;
  meanX: number;
  meanY: number;
  sst: number;
}

export interface RegressionStats {
  sumX: number;
  avgX: number;
  sumY: number;
  avgY: number;
  ssr: number;
  sst: number;
  r2: number;
  count: number;
}

/**
 * Calculates Sum of Squared Residuals (SSR) for given slope (m) and intercept (b).
 */
export function calculateSSR(points: readonly Point2D[], slope: number, intercept: number): number {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const pred = slope * p.x + intercept;
    const res = p.y - pred;
    sum += res * res;
  }
  return sum;
}

/**
 * Computes closed-form OLS optimal slope (m) and intercept (b).
 * Uses fallback parameters if fewer than 2 points or zero variance in X.
 */
export function calculateOLS(
  points: readonly Point2D[],
  fallbackSlope = 0.85,
  fallbackIntercept = 1.2
): OLSResult {
  const n = points.length;
  if (n < 2) {
    return {
      optM: fallbackSlope,
      optB: fallbackIntercept,
      meanX: n === 1 ? points[0].x : 0,
      meanY: n === 1 ? points[0].y : 0,
      sst: 0,
    };
  }

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  for (let i = 0; i < n; i++) {
    const p = points[i];
    sumX += p.x;
    sumY += p.y;
    sumXY += p.x * p.y;
    sumX2 += p.x * p.x;
  }

  const meanX = sumX / n;
  const meanY = sumY / n;

  const num = sumXY - n * meanX * meanY;
  const den = sumX2 - n * meanX * meanX;

  const optM = Math.abs(den) > 1e-6 ? num / den : fallbackSlope;
  const optB = meanY - optM * meanX;

  let sst = 0;
  for (let i = 0; i < n; i++) {
    const diff = points[i].y - meanY;
    sst += diff * diff;
  }

  return {
    optM,
    optB,
    meanX,
    meanY,
    sst,
  };
}

/**
 * Computes comprehensive regression statistics including R² and component sums.
 */
export function calculateRegressionStats(
  points: readonly Point2D[],
  slope: number,
  intercept: number
): RegressionStats {
  const n = points.length;
  if (n === 0) {
    return {
      sumX: 0,
      avgX: 0,
      sumY: 0,
      avgY: 0,
      ssr: 0,
      sst: 0,
      r2: 1,
      count: 0,
    };
  }

  let sumX = 0;
  let sumY = 0;
  let ssr = 0;

  for (let i = 0; i < n; i++) {
    const p = points[i];
    sumX += p.x;
    sumY += p.y;
    const pred = slope * p.x + intercept;
    const res = p.y - pred;
    ssr += res * res;
  }

  const avgX = sumX / n;
  const avgY = sumY / n;

  let sst = 0;
  for (let i = 0; i < n; i++) {
    const diff = points[i].y - avgY;
    sst += diff * diff;
  }

  const r2 = sst > 0 ? Math.max(0, 1 - ssr / sst) : 1;

  return {
    sumX,
    avgX,
    sumY,
    avgY,
    ssr,
    sst,
    r2,
    count: n,
  };
}

/**
 * Samples the convex loss curve J(m) across a range of slope values.
 */
export function sampleLossCurve(
  points: readonly Point2D[],
  intercept: number,
  minM = -1.0,
  maxM = 2.5,
  samples = 80
): Array<{ m: number; ssr: number }> {
  const curve: Array<{ m: number; ssr: number }> = [];
  const range = maxM - minM;

  for (let i = 0; i <= samples; i++) {
    const m = minM + (i / samples) * range;
    curve.push({ m, ssr: calculateSSR(points, m, intercept) });
  }

  return curve;
}
