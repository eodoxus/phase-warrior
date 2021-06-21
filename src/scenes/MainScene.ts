import Hero from "../entities/hero/Hero";
import FpsText from "../entities/FpsText";

export default class MainScene extends Phaser.Scene {
  fpsText;
  hero;

  constructor() {
    super({ key: "MainScene" });
  }

  create() {
    //new PhaserLogo(this, this.cameras.main.width / 2, 0)
    this.fpsText = new FpsText(this);
    this.hero = new Hero(this, 400, 300);
  }

  update() {
    this.fpsText.update();
  }
}
