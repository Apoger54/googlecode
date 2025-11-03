let ctx: CanvasRenderingContext2D;

export const WORLD_WIDTH = 1024;
export const WORLD_HEIGHT = 1024;

export const camera = {
  x: 0,
  y: 0,
  width: 800, // Screen width
  height: 600, // Screen height
};

export function initRenderer(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Could not get 2D rendering context');
  }
  ctx = context;
  camera.width = canvas.width;
  camera.height = canvas.height;
}

export function getContext(): CanvasRenderingContext2D {
  return ctx;
}

export function clearCanvas() {
  if (ctx) {
    ctx.fillStyle = '#1a1a1a'; // A dark background color
    ctx.fillRect(0, 0, camera.width, camera.height);
  }
}

import { player } from '../entities/player';

export function updateCamera() {
    // Center camera on the player
    camera.x = player.x - camera.width / 2;
    camera.y = player.y - camera.height / 2;

    // Clamp camera to world boundaries
    camera.x = Math.max(0, Math.min(camera.x, WORLD_WIDTH - camera.width));
    camera.y = Math.max(0, Math.min(camera.y, WORLD_HEIGHT - camera.height));
}
