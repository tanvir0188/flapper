const TERMINAL_VELOCITY = 15;
const MAXIMUM_VELOCITY = 10;
const GRAVITY = 0.49;
const BOTTOM_THRESHOLD = 20;
const FLAPPER_POSITION = 100;

// colors
const colors = {
  flame: "rgba(212, 175, 55, 0.9)",
};

// game states
let MAX_GAME_SPEED = 4;
let PIPE_PER_FRAME = 120;
let spacePressed = false;
let score = 0;
let angle = 0;
let frame = 0;
let speed = 0;
let gameSpeed = 0;
let gameOver = false;
let canRestart = false;
let bgPlaying = false;
let isMute = false;
let showBareBone = false;

const bang = new Image();
bang.src = "./bang.png";

const flapperSprite = new Image();
flapperSprite.src = "./flapper.png";

const bgLayer1 = document.querySelector("img#bgLayer1");
const bgLayer2 = document.querySelector("img#bgLayer2");
const bgLayer3 = document.querySelector("img#bgLayer3");

const BG1 = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};
const BG2 = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};
const BG3 = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

// purple pipe images
const purplePipeTop = document.querySelector("img#purplePipeTop");
const purplePipeMid = document.querySelector("img#purplePipeMid");
const purplePipeBottom = document.querySelector("img#purplePipeBottom");
// gold pipe images
const goldPipeTop = document.querySelector("img#goldPipeTop");
const goldPipeMid = document.querySelector("img#goldPipeMid");
const goldPipeBottom = document.querySelector("img#goldPipeBottom");

const bgAudio = document.querySelector("audio#bgAudio");
const crashAudio = document.querySelector("audio#crash");
