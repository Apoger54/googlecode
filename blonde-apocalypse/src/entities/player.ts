export interface Player {
  x: number;
  y: number;
  speed: number;
  hp: number;
  maxHp: number;
  level: number;
  xp: number;
  nextLevelXp: number;
  auraCharge: number; // 0..100
  attackCooldown: number; // Time until the next attack
  isAttacking: boolean;
  attackDuration: number; // How long the attack visual lasts
  isAuraAttacking: boolean;
  direction: { x: number; y: number };
  damage: number;
}

// Initial state of the player
export const player: Player = {
  x: 400, // Start in the center of the 800x600 screen
  y: 300,
  speed: 2.5,
  hp: 100,
  maxHp: 100,
  level: 1,
  xp: 0,
  nextLevelXp: 100,
  auraCharge: 0,
  attackCooldown: 0,
  isAttacking: false,
  attackDuration: 0,
  isAuraAttacking: false,
  direction: { x: 1, y: 0 }, // Start facing right
  damage: 15, // Initial katana damage
};

import { isKeyDown } from '../engine/input';
import { getContext } from '../engine/renderer';

// Constants for the player and attack
const PLAYER_WIDTH = 32;
const PLAYER_HEIGHT = 32;
const ATTACK_COOLDOWN_TIME = 0.8; // seconds
const ATTACK_DURATION_TIME = 0.15; // seconds for the visual effect
const ATTACK_ARC_RADIUS = 48;
const ATTACK_ARC_ANGLE = (120 * Math.PI) / 180; // 120 degrees in radians

// --- PLAYER MOVEMENT ---
export function updatePlayer(dt: number) {
  // Movement logic
  let dx = 0;
  let dy = 0;
  if (isKeyDown('KeyW') || isKeyDown('ArrowUp')) dy -= 1;
  if (isKeyDown('KeyS') || isKeyDown('ArrowDown')) dy += 1;
  if (isKeyDown('KeyA') || isKeyDown('ArrowLeft')) dx -= 1;
  if (isKeyDown('KeyD') || isKeyDown('ArrowRight')) dx += 1;

  // Normalize diagonal movement
  if (dx !== 0 && dy !== 0) {
    const length = Math.sqrt(dx * dx + dy * dy);
    dx /= length;
    dy /= length;
  }

  // Update direction if there is movement
  if (dx !== 0 || dy !== 0) {
    player.direction.x = dx;
    player.direction.y = dy;
  }

  player.x += dx * player.speed;
  player.y += dy * player.speed;

  // World boundary checks
  const PLAYER_HALF_WIDTH = PLAYER_WIDTH / 2;
  const PLAYER_HALF_HEIGHT = PLAYER_HEIGHT / 2;
  player.x = Math.max(PLAYER_HALF_WIDTH, Math.min(player.x, 1024 - PLAYER_HALF_WIDTH));
  player.y = Math.max(PLAYER_HALF_HEIGHT, Math.min(player.y, 1024 - PLAYER_HALF_HEIGHT));

  // --- ATTACK LOGIC ---
  // Cooldown timer
  if (player.attackCooldown > 0) {
    player.attackCooldown -= dt;
  }
  // Attack visual timer
  if (player.isAttacking) {
    player.attackDuration -= dt;
    if (player.attackDuration <= 0) {
      player.isAttacking = false;
    }
  }

  // Trigger attack when cooldown is ready
  if (player.attackCooldown <= 0) {
    player.isAttacking = true;
    player.attackDuration = ATTACK_DURATION_TIME;
    player.attackCooldown = ATTACK_COOLDOWN_TIME;
    // TODO: Add attack logic (damage application) here
  }

  // --- AURA ATTACK LOGIC ---
  if (isKeyDown('Space') && player.auraCharge >= 100) {
    player.isAuraAttacking = true;
    player.auraCharge = 0;
    // Damage will be applied in the collision system
  }
}

import { camera } from '../engine/renderer';

// --- PLAYER DRAWING ---
export function drawPlayer() {
  const ctx = getContext();
  const screenX = player.x - camera.x;
  const screenY = player.y - camera.y;

  // Draw Player Placeholder
  // SPRITE EKLEME NOKTASI: Replace this with player sprite drawing
  ctx.fillStyle = '#6B4226'; // Dark skin tone for Kuroji
  ctx.fillRect(screenX - PLAYER_WIDTH / 2, screenY - PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT);
  // Red/black samurai clothes placeholder
  ctx.fillStyle = '#990000'; // Red
  ctx.fillRect(screenX - PLAYER_WIDTH / 2, screenY, PLAYER_WIDTH, PLAYER_HEIGHT / 2);


  // Draw Attack Arc if attacking
  if (player.isAttacking) {
    // SPRITE EKLEME NOKTASI: Replace this with attack animation/sprite
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();

    const angle = Math.atan2(player.direction.y, player.direction.x);

    ctx.moveTo(screenX, screenY);
    ctx.arc(
      screenX,
      screenY,
      ATTACK_ARC_RADIUS,
      angle - ATTACK_ARC_ANGLE / 2,
      angle + ATTACK_ARC_ANGLE / 2,
      false
    );
    ctx.closePath();
    ctx.fill();
  }

  // Draw Aura Attack
    if (player.isAuraAttacking) {
        // This is a one-frame effect. A more advanced implementation
        // might have an animation.
        const auraRadius = 300; // Large radius
        ctx.fillStyle = 'rgba(0, 255, 255, 0.5)'; // Cyan color for aura
        ctx.beginPath();
        ctx.arc(screenX, screenY, auraRadius, 0, Math.PI * 2);
        ctx.fill();
    }
}

import { showLevelUpScreen } from "../systems/uiSystem";

// --- LEVEL UP LOGIC ---
export function checkLevelUp() {
    if (player.xp >= player.nextLevelXp) {
        player.level++;
        player.xp -= player.nextLevelXp;
        player.nextLevelXp = Math.floor(player.nextLevelXp * 1.5); // Increase XP requirement for next level

        showLevelUpScreen();
    }
}
