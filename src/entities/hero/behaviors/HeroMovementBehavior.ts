export default class HeroMovementBehavior {
  speed = 4;
  sprite: any;

  constructor(sprite: Phaser.GameObjects.Sprite) {
    this.sprite = sprite;
  }

  handleKeyboard(keys) {
    let direction;
    if (keys.up.isDown) {
      direction = "up";
      this.sprite.velocity = new Phaser.Math.Vector2(0, -1);
    } else if (keys.down.isDown) {
      direction = "down";
      this.sprite.velocity = new Phaser.Math.Vector2(0, 1);
    } else if (keys.left.isDown) {
      direction = "left";
      this.sprite.velocity = new Phaser.Math.Vector2(-1, 0);
    } else if (keys.right.isDown) {
      direction = "right";
      this.sprite.velocity = new Phaser.Math.Vector2(1, 0);
    }

    if (direction) {
      this.sprite.updateState(`walking/${direction}`);
    }
  }

  handleMouse(pointer) {
    if (!pointer.leftButtonReleased()) {
      return;
    }

    const diffX = Math.abs(pointer.x - this.sprite.x);
    const diffY = Math.abs(pointer.y - this.sprite.y);
    const thresholdX = 40;
    const thresholdY = 40;

    if (diffX <= thresholdX && diffY <= thresholdY) {
      return;
    }

    let direction;
    let velX = 0;
    let velY = 0;
    if (diffX >= diffY && diffX > thresholdX) {
      if (this.sprite.x > pointer.x) {
        direction = "left";
        velX = -1;
        if (diffY > thresholdY) {
          if (this.sprite.y > pointer.y) {
            direction = "upLeft";
            velY = -1;
          } else {
            direction = "downLeft";
            velY = 1;
          }
        }
      } else {
        direction = "right";
        velX = 1;
        if (diffY > thresholdY) {
          if (this.sprite.y > pointer.y) {
            direction = "upRight";
            velY = -1;
          } else {
            direction = "downRight";
            velY = 1;
          }
        }
      }
    } else if (diffY >= diffX && diffY > thresholdY) {
      if (this.sprite.y > pointer.y) {
        direction = "up";
        velY = -1;
        if (diffX > thresholdX) {
          direction = this.sprite.x > pointer.x ? "upLeft" : "upRight";
          if (this.sprite.x > pointer.x) {
            direction = "upLeft";
            velX = -1;
          } else {
            direction = "upRight";
            velX = 1;
          }
        }
      } else {
        direction = "down";
        velY = 1;
        if (diffX > thresholdX) {
          if (this.sprite.x > pointer.x) {
            direction = "downLeft";
            velX = -1;
          } else {
            direction = "downRight";
            velX = 1;
          }
        }
      }
    }
    this.sprite.updateState(`walking/${direction}`);
    this.sprite.velocity = new Phaser.Math.Vector2(velX, velY);
  }

  preUpdate(time, delta) {
    const angleSpeedModifier =
      Math.abs((this.sprite.velocity.x * this.sprite.velocity.y) / 2) * 1.5;
    const speed = this.speed * (angleSpeedModifier ? angleSpeedModifier : 1);
    this.sprite.x += this.sprite.velocity.x * speed;
    this.sprite.y += this.sprite.velocity.y * speed * 0.8;
  }
}
