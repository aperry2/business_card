let img;
let dpr;

let colorA, colorB;

function preload() {
  img = loadImage("web_spread.png");
}

function setup() {
  // set reasonable pixel density for crispness without huge memory use
  dpr = Math.min(2, window.devicePixelRatio || 1);
  pixelDensity(dpr);

  // create a full-window canvas
  const cnv = createCanvas(windowWidth, windowHeight);
  // cnv.style('display', 'block');
  // cnv.style('position', 'fixed');
  // cnv.style('top', '0px');
  // cnv.style('left', '0px');

  // basic page tweaks for a fullscreen app
  document.body.style.margin = '0';
  document.documentElement.style.height = '100%';
  document.body.style.height = '100%';

  noStroke();

  colorA = color(20, 20, 20);
  colorB = color(120, 120, 255);
}

function draw() {
  // Get time in minutes since midnight
  let totalMinutes = hour() * 60 + minute() + second() / 60;

  // 5-minute loop phase from 0 to 1
  let phase = (totalMinutes % 5) / 5;

  // Optional: make it oscillate forward and back (like a wave)
  let eased = 0.5 * (1 - cos(TWO_PI * phase));  // smooth oscillation

  // Lerp the color
  let bgColor = lerpColor(colorA, colorB, eased);

  // Use it
  background(bgColor);

  let h = height;
  let w = (img.width / img.height) * h;
  let x = width - w;
  image(img, x, 0, w, h);
}

function windowResized() {
  // update pixel density and resize canvas when the window changes (orientation, split-screen, etc.)
  dpr = Math.min(2, window.devicePixelRatio || 1);
  pixelDensity(dpr);
  resizeCanvas(windowWidth, windowHeight);
}

function touchStarted() {


  // return false to stop default mobile behavior (like double-tap zoom)
  return false;
}