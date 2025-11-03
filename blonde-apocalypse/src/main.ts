import './style.css';
import { startGame } from './game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  if (canvas) {
    startGame(canvas);
  } else {
    console.error('Game canvas not found!');
  }
});
