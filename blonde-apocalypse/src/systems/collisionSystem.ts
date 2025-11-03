import { player } from '../entities/player';
import { enemies, Enemy } from '../entities/enemy';
import { incrementKillCount } from './uiSystem';

const ATTACK_ARC_RADIUS = 48;

// Simple AABB (Axis-Aligned Bounding Box) collision check
function isColliding(rect1: any, rect2: any): boolean {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

export function updateCollisionSystem() {
  // --- Aura Attack ---
  if (player.isAuraAttacking) {
    enemies.forEach(enemy => {
        enemy.hp -= 40; // Aura damage
    });
    player.isAuraAttacking = false; // Reset after applying damage
  }


  // --- Player attacks vs. Enemies ---
  if (player.isAttacking) {
    const ATTACK_ARC_ANGLE = (120 * Math.PI) / 180;
    const playerAngle = Math.atan2(player.direction.y, player.direction.x);

    enemies.forEach((enemy, index) => {
      const dx = enemy.x - player.x;
      const dy = enemy.y - player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check if the enemy is within the attack radius
      if (distance < ATTACK_ARC_RADIUS) {
        // Check if the enemy is within the attack angle
        const angleToEnemy = Math.atan2(dy, dx);
        let angleDiff = Math.abs(playerAngle - angleToEnemy);
        if (angleDiff > Math.PI) {
            angleDiff = 2 * Math.PI - angleDiff;
        }

        if (angleDiff <= ATTACK_ARC_ANGLE / 2) {
            enemy.hp -= player.damage; // Use player's damage stat
            if (enemy.hp <= 0) {
              player.xp += enemy.xpValue;
              player.auraCharge = Math.min(100, player.auraCharge + 5);
              enemies.splice(index, 1);
              incrementKillCount();
            }
        }
      }
    });
  }

  // --- Enemies vs. Player ---
  const playerHitbox = {
    x: player.x - 16,
    y: player.y - 16,
    width: 32,
    height: 32,
  };

  enemies.forEach(enemy => {
    const enemyHitbox = {
      x: enemy.x - enemy.width / 2,
      y: enemy.y - enemy.height / 2,
      width: enemy.width,
      height: enemy.height,
    };

    if (isColliding(playerHitbox, enemyHitbox)) {
      player.hp -= enemy.damage;
      // Simple knockback/cooldown to prevent instant multi-hits
      // TODO: Improve this damage application logic
      console.log(`Player hit! HP: ${player.hp}`);
    }
  });
}
