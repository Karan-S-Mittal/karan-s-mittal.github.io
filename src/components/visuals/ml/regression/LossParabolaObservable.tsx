/**
 * LossParabolaObservable.tsx
 * Observable Plot-powered Convex Loss Surface J(m).
 * Generates publication-grade statistical graphics using Mike Bostock's declarative grammar of graphics.
 */

import React, { useEffect, useRef } from 'react';
import * as Plot from '@observablehq/plot';
import { sampleLossCurve, calculateSSR } from '@utils/ols';

interface LossParabolaProps {
  slope: number;
  intercept: number;
  points: { x: number; y: number }[];
  width?: number;
  height?: number;
}

export const LossParabolaObservable: React.FC<LossParabolaProps> = ({
  slope,
  intercept,
  points,
  width = 360,
  height = 280,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Generate sampled loss curve points for m in [-1.0 .. 2.5]
    const curveData = sampleLossCurve(points, intercept, -1.0, 2.5, 80);
    const currentSSR = calculateSSR(points, slope, intercept);
    const activePoint = [{ m: slope, ssr: currentSSR }];

    // Build Observable Plot
    const plot = Plot.plot({
      width,
      height,
      marginTop: 20,
      marginRight: 20,
      marginBottom: 35,
      marginLeft: 45,
      style: {
        background: 'transparent',
        fontFamily: 'var(--font-mono, monospace)',
        fontSize: '10px',
        color: 'currentColor',
      },
      x: {
        label: 'Slope (m) →',
        domain: [-1.0, 2.5],
        grid: true,
        line: true,
      },
      y: {
        label: '↑ SSR Loss J(m)',
        grid: true,
        line: true,
      },
      marks: [
        // The Parabolic Curve
        Plot.line(curveData, {
          x: 'm',
          y: 'ssr',
          stroke: 'var(--ie-blue, #2676AA)',
          strokeWidth: 2.2,
        }),
        // Active Position Marker
        Plot.dot(activePoint, {
          x: 'm',
          y: 'ssr',
          fill: 'var(--ie-blue, #2676AA)',
          stroke: 'var(--ie-surface, #ffffff)',
          strokeWidth: 2,
          r: 6,
        }),
        // Drop-line to X axis
        Plot.ruleX(activePoint, {
          x: 'm',
          y: 'ssr',
          stroke: 'var(--ie-muted, #5B6470)',
          strokeDasharray: '3,3',
          strokeWidth: 1.2,
        }),
      ],
    });

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(plot);

    return () => {
      plot.remove();
    };
  }, [slope, intercept, points, width, height]);

  return <div ref={containerRef} className="observable-loss-plot" />;
};
