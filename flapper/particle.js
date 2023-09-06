const particleArr = [];

class Particle {
  constructor() {
    const sizeThreshold = spacePressed ? 10 : 2;
    this.isBurning = spacePressed;
    this.x = flapper.x + flapper.width / 2;
    this.y = flapper.y + flapper.height - 2;
    this.size = Math.random() * sizeThreshold;
    this.speedY = Math.random();
    this.color = this.isBurning ? colors.flame : "rgba(0,100, 150, 0.5)";
    this.xThreshold = Math.random() - 0.5;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x -= gameSpeed + this.xThreshold;
    this.y += this.speedY;
    this.color = this.isBurning ? colors.flame : "rgba(0,100, 150, 0.25)";
    this.draw();
  }

  refresh() {
    const sizeThreshold = spacePressed ? 10 : 2;
    this.isBurning = spacePressed;
    this.x = flapper.x + flapper.width / 2;
    this.y = flapper.y + flapper.height - 2;
    this.size = Math.random() * sizeThreshold;
    this.speedY = Math.random();
    this.color = this.isBurning ? colors.flame : "rgba(0,100, 150, 0.5)";
    this.xThreshold = Math.random() - 0.5;
  }
}

let pooledParticle = null;
function handleParticles() {
  const particleToAdd = pooledParticle ?? new Particle();
  particleArr.unshift(particleToAdd);
  pooledParticle = null;

  for (let i = 0; i < particleArr.length; i++) {
    particleArr[i].update();
  }
  if (particleArr.length >= 500) {
    pooledParticle = particleArr.pop() ?? null;
    if (pooledParticle) pooledParticle.refresh();
  }
}

function refreshParticles() {
  particleArr.length = 0;
}
