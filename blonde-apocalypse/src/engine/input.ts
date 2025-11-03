const keys: { [key: string]: boolean } = {};

// Event listeners to track key presses
window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

// Function to check if a specific key is currently pressed
export function isKeyDown(keyCode: string): boolean {
  return keys[keyCode] || false;
}
