const scoreDiv = document.getElementById("score");
const gameOverScoreSpan = document.getElementById("gameOverScore");
const gameOverModal = document.getElementById("gameOverModal");
const goRight = document.getElementById("goRight");
const flapButton = document.getElementById("flap");
// about elements
const aboutModal = document.getElementById("aboutModal");
const openAboutModalButton = document.getElementById("openAboutModal");
const closeAboutModalButton = document.getElementById("closeAboutModal");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function updateCanvasDimensions() {
  const windowHeight = window.screen.height;
  const windowWidth = window.screen.width;
  canvas.width = windowWidth;
  canvas.height = 500;
  if (windowWidth < 800) {
    canvas.height = windowHeight;
  }

  calibrateBG();
}
window.addEventListener("load", updateCanvasDimensions);
window.addEventListener("resize", updateCanvasDimensions);
window.addEventListener("DOMContentLoaded", updateCanvasDimensions);

/**
 * Initiate a Flapper
 */
const flapper = new Flapper();

const gradient = ctx.createLinearGradient(0, 0, 0, 240);
gradient.addColorStop("0.2", "#ffffff");
gradient.addColorStop("0.4", "#000000");
gradient.addColorStop("0.5", "#4040ff");
gradient.addColorStop("0.6", "#000000");
gradient.addColorStop("0.8", "#ffffff");

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!showBareBone) {
    handleBackground();
    handleParticles();
  }

  handlePipes();

  flapper.update();
  if (spacePressed && flapper.y > flapper.height * 2) {
    flapper.flap();
  }

  drawScore();

  const collision = getCollision();
  if (collision) {
    handleCollision();
    return;
  }

  angle += 0.1;

  if (gameSpeed) frame++;
  requestAnimationFrame(animate);
}
animate();

function drawScore() {
  scoreDiv.innerText = score;
}

function handleCollision() {
  gameOver = true;
  canRestart = false;
  crashAudio.play();
  bgAudio.pause();
  bgAudio.currentTime = 0;

  // draw bang
  if (!showBareBone) {
    ctx.drawImage(bang, flapper.x, flapper.y - 10, 50, 50);
  }

  gameOverScoreSpan.innerText = score;
  gameOverModal.style.display = "block";

  setTimeout(function () {
    canRestart = true;
  }, 1000);
}

function refreshGame() {
  refreshPipes();
  refreshParticles();
  spacePressed = false;
  score = 0;
  angle = 0;
  hue = 0;
  frame = 0;
  gameOver = false;
  gameOverModal.style.display = "none";
  if (!isMute) bgAudio.play();
  animate();
}

// key down
window.addEventListener("keydown", function (e) {
  if (e.key === "m") {
    if (isMute) {
      if (!gameOver) bgAudio.play();
      isMute = false;
      bgPlaying = true;
    } else {
      bgAudio.pause();
      isMute = true;
      bgPlaying = false;
    }
  }

  if (!bgPlaying && !isMute) {
    bgAudio.play();
    bgPlaying = true;
  }

  if (e.code === "Space" || e.code === "ArrowUp") {
    if (gameOver && canRestart) {
      refreshGame();
    } else {
      spacePressed = true;
    }
  } else if (e.code === "ArrowRight") {
    gameSpeed = MAX_GAME_SPEED;
  }

  // bareBone toggle
  if (e.key === "b") {
    showBareBone = !showBareBone;
  }
});
// key up
window.addEventListener("keyup", function (e) {
  if (e.code === "Space" || e.code === "ArrowUp") {
    spacePressed = false;
  } else if (e.code === "ArrowRight") {
    gameSpeed = 0;
  }
});

window.addEventListener("touchstart", function () {
  if (gameOver && canRestart) {
    refreshGame();
  }
});

flapButton.addEventListener("touchstart", function () {
  if (!bgPlaying) {
    bgPlaying = !bgPlaying;
    bgAudio.play();
  }
  spacePressed = true;
});
flapButton.addEventListener("touchend", function () {
  spacePressed = false;
});
flapButton.addEventListener("touchcancel", function () {
  spacePressed = false;
});

goRight.addEventListener("touchstart", function () {
  gameSpeed = MAX_GAME_SPEED;
});
goRight.addEventListener("touchend", function () {
  gameSpeed = 0;
});
goRight.addEventListener("touchcancel", function () {
  gameSpeed = 0;
});

openAboutModalButton.addEventListener("click", function () {
  aboutModal.classList.toggle("display");
});
closeAboutModalButton.addEventListener("click", function () {
  aboutModal.classList.remove("display");
});
