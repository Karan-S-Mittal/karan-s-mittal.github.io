import { routeRoundedConnector } from './core.js';

export function createCopyOnWriteRoutes() {
  const promptA00 = { x: 32, y: 104, width: 88, height: 40 };
  const promptA01 = { x: 136, y: 104, width: 88, height: 40 };
  const outputA = { x: 240, y: 104, width: 88, height: 40 };
  const promptB00 = { x: 32, y: 248, width: 88, height: 40 };
  const promptB01 = { x: 136, y: 248, width: 88, height: 40 };
  const outputB = { x: 240, y: 248, width: 88, height: 40 };
  const frame12 = { x: 472, y: 104, width: 272, height: 52 };
  const frame04 = { x: 472, y: 164, width: 272, height: 52 };
  const frame31 = { x: 472, y: 224, width: 272, height: 52 };
  const frame58 = { x: 472, y: 284, width: 272, height: 52 };
  const logicalNodes = [promptA00, promptA01, outputA, promptB00, promptB01, outputB];

  return {
    promptA00ToFrame12: routeRoundedConnector(promptA00, frame12, { sourceEdge: 'top', targetEdge: 'left', laneX: 440, laneY: 64, obstacles: logicalNodes }),
    promptB00ToFrame12: routeRoundedConnector(promptB00, frame12, { sourceEdge: 'bottom', targetEdge: 'left', laneX: 440, laneY: 336, obstacles: logicalNodes }),
    promptA01ToFrame04: routeRoundedConnector(promptA01, frame04, { sourceEdge: 'top', targetEdge: 'left', laneX: 424, laneY: 76, obstacles: logicalNodes }),
    promptB01ToFrame04: routeRoundedConnector(promptB01, frame04, { sourceEdge: 'bottom', targetEdge: 'left', laneX: 424, laneY: 348, obstacles: logicalNodes }),
    outputAToFrame31: routeRoundedConnector(outputA, frame31, { sourceEdge: 'bottom', targetEdge: 'left', laneX: 416, laneY: 220, obstacles: logicalNodes }),
    outputBToFrame58: routeRoundedConnector(outputB, frame58, { sourceEdge: 'bottom', targetEdge: 'left', laneX: 416, laneY: 310, obstacles: logicalNodes }),
  };
}
