import { player } from '../entities/player';

let isPaused = false;
let isLevelingUp = false;
let gameOver = false;
let elapsedTime = 0;
let enemiesKilled = 0;

// UI Element References
const uiOverlay = document.getElementById('ui-overlay')!;
let hpBar: HTMLDivElement;
let scoreText: HTMLParagraphElement;
let timerText: HTMLParagraphElement;
let gameOverScreen: HTMLDivElement;
let levelUpScreen: HTMLDivElement;


export function initUI() {
    uiOverlay.innerHTML = `
        <div id="hud">
            <div id="hp-container">
                <p>HP</p>
                <div id="hp-bar-bg">
                    <div id="hp-bar-fg"></div>
                </div>
            </div>
            <p id="score">Kills: 0</p>
            <p id="timer">Time: 00:00</p>
        </div>
        <div id="game-over" style="display: none;">
            <h1>Game Over</h1>
            <p id="final-score"></p>
            <p id="final-time"></p>
            <button id="restart-button">Tekrar Oyna</button>
        </div>
        <div id="pause-menu" style="display: none;">
            <h1>PAUSED</h1>
        </div>
        <div id="level-up" style="display: none;">
            <h2>Level Up!</h2>
            <p>Choose an upgrade:</p>
            <button class="upgrade-option" data-upgrade="hp">+10 Max HP</button>
            <button class="upgrade-option" data-upgrade="speed">+0.3 Speed</button>
            <button class="upgrade-option" data-upgrade="damage">Katana Damage +3</button>
        </div>
    `;

    // Cache UI elements
    hpBar = document.getElementById('hp-bar-fg') as HTMLDivElement;
    scoreText = document.getElementById('score') as HTMLParagraphElement;
    timerText = document.getElementById('timer') as HTMLParagraphElement;
    gameOverScreen = document.getElementById('game-over') as HTMLDivElement;
    levelUpScreen = document.getElementById('level-up') as HTMLDivElement;

    // Add event listener for the restart button
    document.getElementById('restart-button')?.addEventListener('click', () => {
        window.location.reload(); // Simple way to restart the game
    });

    // Add event listeners for upgrade options
    document.querySelectorAll('.upgrade-option').forEach(button => {
        button.addEventListener('click', (e) => {
            const upgrade = (e.target as HTMLElement).dataset.upgrade;
            applyUpgrade(upgrade);
        });
    });

    // Add styles for the UI
    const style = document.createElement('style');
    style.innerHTML = `
        #hud {
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            display: flex;
            justify-content: space-between;
            font-family: 'Courier New', Courier, monospace;
            color: white;
            font-size: 20px;
        }
        #hp-container { display: flex; align-items: center; gap: 10px; }
        #hp-bar-bg { width: 200px; height: 20px; background-color: #555; border: 2px solid #fff; }
        #hp-bar-fg { width: 100%; height: 100%; background-color: green; }
        #game-over, #pause-menu {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 3em;
            text-align: center;
        }
        #game-over button, .upgrade-option {
            font-size: 0.5em;
            padding: 10px 20px;
            margin-top: 20px;
            cursor: pointer;
            color: black;
            background-color: white;
            border: none;
        }
        #level-up {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0, 0, 0, 0.85);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 2em;
            text-align: center;
        }
    `;
    document.head.appendChild(style);

    // Pause listener
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && !isLevelingUp && !gameOver) {
            togglePause();
        }
    });
}

export function updateUI(dt: number) {
    if (isGamePaused()) return;

    // Update HP Bar
    const hpPercent = (player.hp / player.maxHp) * 100;
    hpBar.style.width = `${Math.max(0, hpPercent)}%`;
    hpBar.style.backgroundColor = hpPercent > 50 ? 'green' : hpPercent > 25 ? 'orange' : 'red';

    // Update Timer
    elapsedTime += dt;
    const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
    const seconds = Math.floor(elapsedTime % 60).toString().padStart(2, '0');
    timerText.innerText = `Time: ${minutes}:${seconds}`;

    // Check for game over condition
    if (player.hp <= 0 && !gameOver) {
        setGameOver();
    }
}

export function incrementKillCount() {
    enemiesKilled++;
    scoreText.innerText = `Kills: ${enemiesKilled}`;
}


function setGameOver() {
    gameOver = true;
    const finalTime = timerText.innerText;
    const finalScore = scoreText.innerText;

    (document.getElementById('final-time') as HTMLParagraphElement).innerText = finalTime;
    (document.getElementById('final-score') as HTMLParagraphElement).innerText = finalScore;
    gameOverScreen.style.display = 'flex';
}

function togglePause() {
    isPaused = !isPaused;
    const pauseMenu = document.getElementById('pause-menu')!;
    pauseMenu.style.display = isPaused ? 'flex' : 'none';
}

export function showLevelUpScreen() {
    isLevelingUp = true;
    levelUpScreen.style.display = 'flex';
}

function applyUpgrade(upgrade: string | undefined) {
    if (!upgrade) return;

    switch (upgrade) {
        case 'hp':
            player.maxHp += 10;
            player.hp = player.maxHp; // Heal to full on level up
            break;
        case 'speed':
            player.speed += 0.3;
            break;
        case 'damage':
            player.damage += 3;
            break;
    }

    isLevelingUp = false;
    levelUpScreen.style.display = 'none';
}

export function isGamePaused(): boolean {
    return isPaused || gameOver || isLevelingUp;
}
