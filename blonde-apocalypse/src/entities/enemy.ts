import { getContext } from "../engine/renderer";
import { camera } from "../engine/renderer";
import { player } from "./player";

export interface Enemy {
  x: number;
  y: number;
  speed: number;
  hp: number;
  maxHp: number;
  damage: number;
  type: string;
  width: number;
  height: number;
  xpValue: number;
}

export const enemies: Enemy[] = [];

const enemyTypes = {
  blonde_basic: {
    speed: 1.3,
    hp: 20,
    damage: 5,
    width: 32,
    height: 32,
    xpValue: 10,
  },
  blonde_fast: {
    speed: 2.0,
    hp: 15,
    damage: 4,
    width: 28,
    height: 28,
    xpValue: 15,
  },
  blonde_tank: {
    speed: 0.8,
    hp: 40,
    damage: 8,
    width: 40,
    height: 40,
    xpValue: 25,
  },
  mini_boss: {
    speed: 0.5,
    hp: 200,
    damage: 20,
    width: 64,
    height: 64,
    xpValue: 100,
  }
};

export function createEnemy(x: number, y: number, type: keyof typeof enemyTypes) {
    const enemyData = enemyTypes[type];
    const newEnemy: Enemy = {
        x,
        y,
        type,
        speed: enemyData.speed,
        hp: enemyData.hp,
        maxHp: enemyData.hp,
        damage: enemyData.damage,
        width: enemyData.width,
        height: enemyData.height,
        xpValue: enemyData.xpValue,
    };
    enemies.push(newEnemy);
}

export function updateEnemies(dt: number) {
    enemies.forEach(enemy => {
        // Simple AI: move towards the player
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            enemy.x += (dx / distance) * enemy.speed;
            enemy.y += (dy / distance) * enemy.speed;
        }
    });
}

export function drawEnemies() {
    const ctx = getContext();
    enemies.forEach(enemy => {
        const screenX = enemy.x - camera.x;
        const screenY = enemy.y - camera.y;

        // Culling: Don't draw enemies that are off-screen
        if (
            screenX + enemy.width < 0 ||
            screenX > camera.width ||
            screenY + enemy.height < 0 ||
            screenY > camera.height
        ) {
            return;
        }

        // SPRITE EKLEME NOKTASI: Replace with enemy sprite
        ctx.fillStyle = '#FFC0CB'; // Pink/white clothes
        ctx.fillRect(screenX - enemy.width / 2, screenY - enemy.height / 2, enemy.width, enemy.height);
        ctx.fillStyle = '#FFFF00'; // Yellow hair
        ctx.fillRect(screenX - enemy.width / 2, screenY - enemy.height / 2, enemy.width, enemy.height / 4);
    });
}
