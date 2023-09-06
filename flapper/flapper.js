class Flapper {
  constructor() {
    this.x = FLAPPER_POSITION;
    this.y = 200;
    this.vy = 0;
    this.width = 40;
    this.height = 30;
    this.spriteWidth = 60;
    this.spriteHeight = 45;
    this.weight = 1 * GRAVITY;
  }

  update() {
    let curve = Math.sin(angle) * this.height; // this will change as the angle change on each frame.

    if (this.y > canvas.height - this.height * 2 + curve - BOTTOM_THRESHOLD) {
      // if on ground
      this.y = canvas.height - this.height * 2 + curve - BOTTOM_THRESHOLD;
      this.vy = 0;
    } else if (this.y < 0) {
      // if on top
      this.y = 0;
      this.vy = 0;
    } else {
      if (this.vy <= TERMINAL_VELOCITY) {
        this.vy += this.weight;
      }
      this.y += this.vy;
    }

    this.draw();
  }

  draw() {
    ctx.fillStyle = "red";
    if (showBareBone) {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(
        flapperSprite,
        0,
        0,
        flapperSprite.width,
        flapperSprite.height,
        this.x - 10,
        this.y - 7.5,
        this.spriteWidth,
        this.spriteHeight
      );
    }
  }

  flap() {
    if (this.vy >= -MAXIMUM_VELOCITY) {
      this.vy -= 1.6;
    }
  }

  getIsInsideScreen() {
    return this.y + this.height > 0 && this.y + this.height < canvas.height;
  }
}
