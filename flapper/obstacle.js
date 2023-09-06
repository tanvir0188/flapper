const pipesArr = [];

const spriteWidth = 32;
const spriteHeight = 20;

function getRandomColor() {
  const int = Math.floor(Math.random() * 2); // gives 0 or 1
  if (int === 0) return "gold";
  else return "purple";
}
function getPipe(color) {
  if (color === "gold") {
    return {
      top: goldPipeTop,
      mid: goldPipeMid,
      bot: goldPipeBottom,
    };
  } else {
    return {
      top: purplePipeTop,
      mid: purplePipeMid,
      bot: purplePipeBottom,
    };
  }
}

class Pipe {
  constructor() {
    const spacing = random(120, 160);
    const centerY = random(spacing, canvas.height - 40);
    this.top = centerY - spacing / 2;
    this.bottom = canvas.height - (centerY + spacing / 2);
    this.x = canvas.width;
    this.width = random(40, 60);
    this.counted = false;
    this.color = getRandomColor();
    this.pipe = getPipe(this.color);
  }

  draw() {
    ctx.fillStyle = this.color;
    if (showBareBone) {
      ctx.fillRect(this.x, 0, this.width, this.top); // top pipe
    } else {
      const a1 = Math.floor(this.top / spriteHeight); // 5.6 -> 5
      const b = this.top - a1 * spriteHeight;
      ctx.drawImage(this.pipe.mid, this.x, -b, this.width, spriteHeight);
      ctx.drawImage(
        this.pipe.mid,
        this.x,
        spriteHeight - b,
        this.width,
        spriteHeight
      );
      for (let i = 1; i < a1; i++) {
        ctx.drawImage(
          this.pipe.mid,
          this.x,
          spriteHeight * i,
          this.width,
          spriteHeight
        );
      }
      ctx.drawImage(
        this.pipe.bot,
        this.x,
        spriteHeight * a1,
        this.width,
        spriteHeight
      );
    }

    if (showBareBone) {
      ctx.fillRect(
        this.x,
        canvas.height - this.bottom,
        this.width,
        this.bottom
      ); // bottom pipe
    } else {
      const bottomPipeTop = canvas.height - this.bottom;
      ctx.drawImage(
        this.pipe.top,
        this.x,
        bottomPipeTop,
        this.width,
        spriteHeight
      );
      const bottomPipeMidStart = bottomPipeTop + spriteHeight;
      const a2 = Math.ceil(canvas.height - bottomPipeMidStart / spriteHeight); // 5.6 -> 6
      for (let i = 0; i < a2; i++) {
        ctx.drawImage(
          this.pipe.mid,
          this.x,
          spriteHeight * i + bottomPipeMidStart,
          this.width,
          spriteHeight
        );
      }
    }
  }

  update() {
    this.x -= gameSpeed;
    if (!this.counted && this.x + this.width < flapper.x) {
      score++;
      this.counted = true;
    }
    this.draw();
  }

  isHit() {
    const collisionY =
      flapper.y < this.top || flapper.y > canvas.height - this.bottom;
    const collisionX =
      flapper.x + flapper.width > this.x && flapper.x < this.x + this.width;
    return collisionY && collisionX;
  }

  offScreen() {
    return this.x < -this.width;
  }

  refresh() {
    const spacing = random(120, 160);
    const centerY = random(spacing, canvas.height - 40);
    this.top = centerY - spacing / 2;
    this.bottom = canvas.height - (centerY + spacing / 2);
    this.x = canvas.width;
    this.width = random(40, 60);
    this.counted = false;
    this.color = getRandomColor();
    this.pipe = getPipe(this.color);
  }
}

// object pooling
let pooledPipe = null;
function handlePipes() {
  if (frame % 100 === 0 && gameSpeed > 0) {
    // add pooledPipe if exists; else creates a new pipe
    // this way no pipe is deleted and pipes are created only if needed to fit screen
    const pipeToAdd = pooledPipe ?? new Pipe();
    pipesArr.unshift(pipeToAdd); // adds in front of pipesArray
    pooledPipe = null;
  }

  for (let i = 0; i < pipesArr.length; i++) {
    pipesArr[i].update();

    // when pipe goes offscreen, dequeue and then enqueue
    if (pipesArr[i].offScreen()) {
      pooledPipe = pipesArr.pop() ?? null;
      if (pooledPipe) pooledPipe.refresh();
    }
  }
}

function getCollision() {
  for (let i = 0; i < pipesArr.length; i++) {
    const flapperInsideScreen =
      flapper.y + flapper.height > 0 &&
      flapper.y + flapper.height < canvas.height;
    const collision = pipesArr[i].isHit();

    if (flapperInsideScreen && collision) {
      return true;
    }
  }
}

function refreshPipes() {
  pipesArr.length = 0;
}
