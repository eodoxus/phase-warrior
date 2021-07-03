import Hero from "../entities/hero/Hero";
import FpsText from "../entities/FpsText";

export default class MainScene extends Phaser.Scene {
  fpsText;
  hero;

  constructor() {
    super({ key: "MainScene" });
  }

  create() {
    this.input.mouse.disableContextMenu();
    this.fpsText = new FpsText(this);
    this.hero = new Hero(this, 400, 300);
    this.add.existing(this.hero);
  }

  update() {
    this.fpsText.update();
  }
}
