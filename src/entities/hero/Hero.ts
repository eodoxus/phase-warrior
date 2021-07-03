import { initAnims, initStates } from "../../lib/SpriteUtils";
import HeroMovementBehavior from "./behaviors/HeroMovementBehavior";

const FRAME_RATE = 15;
const STARTING_DIRECTION = "down";
const STARTING_FRAME = "walking/down/01.png";
const STARTING_STATE = "walking";
const TEXTURE_NAME = "hero";

export default class Hero extends Phaser.GameObjects.Sprite {
  behaviors: any = {
    movement: HeroMovementBehavior,
  };
  keys: any = {};
  state;
  states = {};
  velocity = new Phaser.Math.Vector2(0, 0);

  constructor(scene, x, y) {
    super(scene, x, y, TEXTURE_NAME, STARTING_FRAME);

    this.states = initStates(this, TEXTURE_NAME);
    initAnims(this, TEXTURE_NAME, FRAME_RATE);
    this.initInput();
    this.behaviors.movement = new HeroMovementBehavior(this);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.behaviors.movement.handleKeyboard(this.keys);
    Object.keys(this.behaviors).forEach((behavior) => {
      if (this.behaviors[behavior].preUpdate) {
        this.behaviors[behavior].preUpdate(time, delta);
      }
    });

    this.ensureStaysInViewport();
  }

  updateState(state) {
    if (state === this.state) {
      return;
    }
    this.state = state;
    this.play(this.state);
  }

  private ensureStaysInViewport() {
    if (this.x < 0) {
      this.x = this.scene.game.scale.width;
    } else if (this.x > this.scene.game.scale.width) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = this.scene.game.scale.height;
    } else if (this.y > this.scene.game.scale.height) {
      this.y = 0;
    }
  }

  private initInput() {
    this.keys = this.scene.input.keyboard.createCursorKeys();
    this.scene.input.on("pointerup", (pointer) => {
      Object.keys(this.behaviors).forEach((behavior) => {
        if (this.behaviors[behavior].preUpdate) {
          this.behaviors[behavior].handleMouse(pointer);
        }
      });
    });
  }
}
