/**
 * Core mathematical utilities for deterministic diagram routing.
 */

export function edgeAnchor(rect, edge) {
  switch (edge) {
    case 'top': return { x: rect.x + rect.width / 2, y: rect.y };
    case 'right': return { x: rect.x + rect.width, y: rect.y + rect.height / 2 };
    case 'bottom': return { x: rect.x + rect.width / 2, y: rect.y + rect.height };
    case 'left': return { x: rect.x, y: rect.y + rect.height / 2 };
    default: throw new Error(`Unsupported diagram edge: ${edge}`);
  }
}

export function distance(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function toward(from, to, amount) {
  const length = distance(from, to);
  if (!length) return from;
  const scale = amount / length;
  return { x: from.x + (to.x - from.x) * scale, y: from.y + (to.y - from.y) * scale };
}

export function overlapsVerticalLane(x, startY, endY, obstacles, gap) {
  const minY = Math.min(startY, endY);
  const maxY = Math.max(startY, endY);
  return obstacles.some((obstacle) => (
    x > obstacle.x - gap &&
    x < obstacle.x + obstacle.width + gap &&
    maxY > obstacle.y - gap &&
    minY < obstacle.y + obstacle.height + gap
  ));
}

export function roundedPolyline(points, radius) {
  const compact = points.filter((point, index) => index === 0 || distance(point, points[index - 1]) > 0.01);
  if (compact.length < 2) return '';

  let path = `M ${compact[0].x} ${compact[0].y}`;
  for (let index = 1; index < compact.length - 1; index += 1) {
    const previous = compact[index - 1];
    const current = compact[index];
    const next = compact[index + 1];
    const incoming = distance(previous, current);
    const outgoing = distance(current, next);
    const cross = (current.x - previous.x) * (next.y - current.y) - (current.y - previous.y) * (next.x - current.x);

    if (Math.abs(cross) < 0.01) {
      path += ` L ${current.x} ${current.y}`;
      continue;
    }

    const trim = Math.min(radius, incoming / 2, outgoing / 2);
    const entry = toward(current, previous, trim);
    const exit = toward(current, next, trim);
    path += ` L ${entry.x} ${entry.y} Q ${current.x} ${current.y} ${exit.x} ${exit.y}`;
  }

  const last = compact[compact.length - 1];
  path += ` L ${last.x} ${last.y}`;
  return path;
}

/** Routes between edge centers with deterministic lane selection and rounded turns. */
export function routeRoundedConnector(sourceRect, targetRect, options = {}) {
  const gap = options.gap ?? 16;
  const radius = options.radius ?? 14;
  const source = edgeAnchor(sourceRect, options.sourceEdge);
  const target = edgeAnchor(targetRect, options.targetEdge);
  const direction = options.sourceEdge === 'top' ? -1 : options.sourceEdge === 'bottom' ? 1 : 0;
  const sourceLaneY = options.laneY ?? source.y + direction * (gap * 2);
  let laneX = options.laneX ?? target.x - gap * 2;
  const obstacles = options.obstacles ?? [];

  for (let attempt = 0; attempt < 12 && overlapsVerticalLane(laneX, sourceLaneY, target.y, obstacles, gap); attempt += 1) {
    laneX -= gap;
  }

  const sourceOffset = { x: source.x, y: source.y + direction * gap };
  const points = [
    source,
    sourceOffset,
    { x: source.x, y: sourceLaneY },
    { x: laneX, y: sourceLaneY },
    { x: laneX, y: target.y },
    target,
  ];
  return roundedPolyline(points, radius);
}
