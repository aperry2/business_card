// sketch.js - fullscreen responsive p5.js sketch for mobile & web

let img;
let dpr;

function preload() {
  img = loadImage("web_spread.png");
}

function setup() {
  // set reasonable pixel density for crispness without huge memory use
  dpr = Math.min(2, window.devicePixelRatio || 1);
  pixelDensity(dpr);

  // create a full-window canvas
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  cnv.style('position', 'fixed');
  cnv.style('top', '0px');
  cnv.style('left', '0px');

  // basic page tweaks for a fullscreen app
  document.body.style.margin = '0';
  document.documentElement.style.height = '100%';
  document.body.style.height = '100%';

  // optional: prevent the page from scrolling when interacting with the sketch
  document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

  noStroke();
}

function draw() {
  background(18, 28, 40);

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