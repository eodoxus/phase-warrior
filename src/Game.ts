import "phaser";
import MainScene from "./scenes/MainScene";
import PreloadScene from "./scenes/PreloadScene";

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#ffffff",
  scale: {
    parent: "phaser-game",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 400 },
    },
  },
};

window.addEventListener("load", () => {
  const game = new Phaser.Game(config);
});
