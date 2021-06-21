import { initAnims, initStates } from "../../lib/SpriteUtils";

const FRAME_RATE = 15;
const STARTING_DIRECTION = "down";
const STARTING_FRAME = "walking/down/01.png";
const STARTING_STATE = "walking";
const TEXTURE_NAME = "hero";

export default class Hero extends Phaser.GameObjects.Sprite {
  keys: any = {};
  state = `${STARTING_STATE}/${STARTING_DIRECTION}`;
  states = {};

  constructor(scene, x, y) {
    super(scene, x, y, TEXTURE_NAME, STARTING_FRAME);

    this.states = initStates(this, TEXTURE_NAME);
    initAnims(this, TEXTURE_NAME, FRAME_RATE);
    this.initInput();

    scene.add.existing(this);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
      this.updateState("walking/up");
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
      this.updateState("walking/down");
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
      this.updateState("walking/left");
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
      this.updateState("walking/right");
    }
  }

  private initInput() {
    const keyCodes = Phaser.Input.Keyboard.KeyCodes;
    this.keys.up = this.scene.input.keyboard.addKey(
      keyCodes.UP
    );
    this.keys.down = this.scene.input.keyboard.addKey(
      keyCodes.DOWN
    );
    this.keys.left = this.scene.input.keyboard.addKey(
      keyCodes.LEFT
    );
    this.keys.right = this.scene.input.keyboard.addKey(
      keyCodes.RIGHT
    );
  }

  private updateState(state) {
    if (state === this.state) {
      return;
    }
    this.state = state;
    this.play(this.state);
  }
}
