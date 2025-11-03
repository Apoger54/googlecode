import { createEnemy } from '../entities/enemy';
import { player } from '../entities/player';

let spawnTimer = 2; // Initial delay
let totalTime = 0;
let bossTimer = 90; // Time for the first mini-boss

const SPAWN_DISTANCE_MIN = 450;
const SPAWN_DISTANCE_MAX = 550;

export function updateSpawnSystem(dt: number) {
  totalTime += dt;
  spawnTimer -= dt;
  bossTimer -= dt;

  if (spawnTimer <= 0) {
    // Increase spawn rate over time, capping at a certain rate
    const spawnInterval = Math.max(0.5, 2 - totalTime / 60);
    spawnTimer = spawnInterval;
    spawnNewEnemy();
  }

  if (bossTimer <= 0) {
    bossTimer = 90; // Reset for the next boss
    spawnMiniBoss();
  }
}

function spawnNewEnemy() {
  const { x, y } = getSpawnPosition();

  // Determine which enemy to spawn based on game time
  if (totalTime > 60 && Math.random() > 0.7) { // 30% chance for a tank after 1 min
    createEnemy(x, y, 'blonde_tank');
  } else if (totalTime > 30 && Math.random() > 0.6) { // 40% chance for a fast enemy after 30s
    createEnemy(x, y, 'blonde_fast');
  } else {
    createEnemy(x, y, 'blonde_basic');
  }
}

function spawnMiniBoss() {
  // TODO: Add a more dramatic spawn effect for bosses
  const { x, y } = getSpawnPosition();
  createEnemy(x, y, 'mini_boss');
  console.log("A MINI-BOSS HAS APPEARED!");
}

function getSpawnPosition(): { x: number, y: number } {
  const angle = Math.random() * Math.PI * 2;
  const distance = SPAWN_DISTANCE_MIN + Math.random() * (SPAWN_DISTANCE_MAX - SPAWN_DISTANCE_MIN);
  const x = player.x + Math.cos(angle) * distance;
  const y = player.y + Math.sin(angle) * distance;
  return { x, y };
}
