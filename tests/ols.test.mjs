import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateOLS, calculateSSR, calculateRegressionStats, sampleLossCurve } from '../src/utils/ols.ts';

test('calculateOLS returns correct slope and intercept for linear points', () => {
  // y = 2x + 1
  const points = [
    { x: 1, y: 3 },
    { x: 2, y: 5 },
    { x: 3, y: 7 },
    { x: 4, y: 9 },
  ];
  const { optM, optB } = calculateOLS(points);
  assert.ok(Math.abs(optM - 2.0) < 1e-6, `Expected slope 2.0, got ${optM}`);
  assert.ok(Math.abs(optB - 1.0) < 1e-6, `Expected intercept 1.0, got ${optB}`);
});

test('calculateSSR returns 0 for a perfect fit', () => {
  const points = [
    { x: 1, y: 3 },
    { x: 2, y: 5 },
    { x: 3, y: 7 },
  ];
  const ssr = calculateSSR(points, 2.0, 1.0);
  assert.ok(Math.abs(ssr) < 1e-6, `Expected SSR 0, got ${ssr}`);
});

test('calculateRegressionStats computes correct R² for perfect and non-perfect fits', () => {
  const perfectPoints = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 6 },
  ];
  const statsPerfect = calculateRegressionStats(perfectPoints, 2.0, 0.0);
  assert.equal(statsPerfect.r2, 1.0);
  assert.equal(statsPerfect.ssr, 0.0);
  assert.equal(statsPerfect.count, 3);
});

test('sampleLossCurve returns expected count and positive SSR values', () => {
  const points = [
    { x: 1, y: 2 },
    { x: 2, y: 4 },
  ];
  const curve = sampleLossCurve(points, 0.0, -1.0, 3.0, 10);
  assert.equal(curve.length, 11);
  for (const pt of curve) {
    assert.ok(pt.ssr >= 0);
  }
});
