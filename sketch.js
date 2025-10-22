let img;
let dpr;
let colorA, colorB;

function preload() {
  img = loadImage("web_spread.png");
}

function setup() {
  // reasonable pixel density for crispness
  dpr = Math.min(2, window.devicePixelRatio || 1);
  pixelDensity(dpr);

  // create canvas and make sure it never intercepts clicks/taps
  const cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.style('position', 'fixed');
  cnv.style('inset', '0');
  cnv.style('z-index', '-1');
  cnv.style('pointer-events', 'none'); // ← allows mobile taps to reach links

  // body settings for fullscreen display
  document.body.style.margin = '0';
  document.documentElement.style.height = '100%';
  document.body.style.height = '100%';

  noStroke();
  colorA = color(20, 20, 20);
  colorB = color(120, 120, 255);
}

function draw() {
  // smooth oscillating background color
  let totalMinutes = hour() * 60 + minute() + second() / 60;
  let phase = (totalMinutes % 5) / 5;
  let eased = 0.5 * (1 - cos(TWO_PI * phase));
  let bgColor = lerpColor(colorA, colorB, eased);
  background(bgColor);

  // maintain proportional scaling for background image
  let aspect = img.width / img.height;
  let canvasAspect = width / height;
  let drawWidth, drawHeight;

  if (canvasAspect > aspect) {
    // canvas is wider → fit height
    drawHeight = height;
    drawWidth = height * aspect;
  } else {
    // canvas is taller → fit width
    drawWidth = width;
    drawHeight = width / aspect;
  }

  // draw image aligned to right edge
  image(img, width - drawWidth, (height - drawHeight) / 2, drawWidth, drawHeight);
}

function windowResized() {
  dpr = Math.min(2, window.devicePixelRatio || 1);
  pixelDensity(dpr);
  resizeCanvas(windowWidth, windowHeight);
}

function touchStarted() {
  // returning false prevents unwanted mobile zoom
  return false;
}
