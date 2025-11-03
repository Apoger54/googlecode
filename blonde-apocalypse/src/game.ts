import { startLoop } from './engine/loop';
import { initRenderer, clearCanvas, updateCamera } from './engine/renderer';
import { updatePlayer, drawPlayer, checkLevelUp } from './entities/player';
import { updateEnemies, drawEnemies } from './entities/enemy';
import { updateSpawnSystem } from './systems/spawnSystem';
import { updateCollisionSystem } from './systems/collisionSystem';
import { initUI, updateUI, isGamePaused } from './systems/uiSystem';

function update(dt: number) {
  if (isGamePaused()) {
    // If the game is paused or over, skip all game logic updates
    return;
  }
  // Update entities
  updatePlayer(dt);
  updateEnemies(dt);

  // Update systems
  updateSpawnSystem(dt);
  updateCollisionSystem();
  checkLevelUp();

  // Update UI timer etc.
  updateUI(dt);

  // Update camera last, after all entities have moved
  updateCamera();
}

function draw() {
  clearCanvas();
  // Draw entities
  drawEnemies(); // Draw enemies behind the player
  drawPlayer();
}

export function startGame(canvas: HTMLCanvasElement) {
  console.log('Starting game...');
  initRenderer(canvas);
  initUI();
  startLoop(update, draw);
}
