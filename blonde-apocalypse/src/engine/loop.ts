let lastTime = 0;
let gameLoop: (timestamp: number) => void;

function loop(timestamp: number) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // Clear the canvas (or perform other pre-draw tasks)

  // Update game state

  // Draw the game

  requestAnimationFrame(loop);
}

export function startLoop(update: (dt: number) => void, draw: () => void) {
    gameLoop = (timestamp: number) => {
        const deltaTime = (timestamp - lastTime) / 1000; // in seconds
        lastTime = timestamp;

        update(deltaTime);
        draw();

        requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame((timestamp) => {
        lastTime = timestamp;
        requestAnimationFrame(gameLoop);
    });
}
