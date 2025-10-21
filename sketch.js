let rings;
let baseWidth = 1920;
let baseHeight = 1080;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  pixelDensity(1);

  // --- Scale factor based on smaller dimension for better mobile balance ---
  const s = min(width / baseWidth, height / baseHeight) * 1.4; // increase multiplier if too small

  rings = [
    { text: ".~* E-MAIL *~.", radius: 300 * s, arcRange: 120, url: "mailto:alan.perry.studio@gmail.com", speed: 0.001, angleOffset: 90 },
    { text: ".~* WEBSITE *~.", radius: 350 * s, arcRange: 120, url: "https://www.alanjperry.com", speed: -0.0012, angleOffset: 0 },
    { text: ".~* INSTAGRAM *~.", radius: 400 * s, arcRange: 120, url: "https://www.instagram.com/alanjperry", speed: 0.0006, angleOffset: 120 },
    { text: ".~* CLOUD-AS-OUROBOROS *~.", radius: 450 * s, arcRange: 180, url: "https://infinitescroll.cloud", speed: -0.002, angleOffset: 30 },
    { text: ".~* THE GROSS GLOSS - CYCLE 1 *~.", radius: 500 * s, arcRange: 180, url: "https://aperry2.github.io/gross_gloss", speed: -0.001, angleOffset: 270 }
  ];

  window._scale = s; // store globally for later use
}

function draw() {
  background(0);
  stroke(255);
  translate(width / 2, height / 2);

  const s = window._scale || 1;

  textSize(36 * s);

  // --- Draw each rotating ring ---
  for (let i = rings.length - 1; i >= 0; i--) {
    let r = rings[i];
    push();
    fill(30);
    // Optional: debug visualization of ring bounds
    // circle(0, 0, r.radius * 2 + 60 * s);

    rotate(r.angleOffset);
    drawTextRing(r.text, r.radius, r.arcRange);

    // Animate rotation
    r.angleOffset += degrees(r.speed);
    pop();
  }

  // --- Center circle + name ---
  textSize(80 * s);
  fill(50);
  circle(0, 0, 500 * s);
  fill(255);
  text("ALAN\nPERRY", 0, 0);
}

// --- Draw text along an arc segment ---
function drawTextRing(textString, radius, textAngleRange) {
  for (let i = 0; i < textString.length; i++) {
    let charAngle = map(i, 0, textString.length, -textAngleRange / 2, textAngleRange / 2);
    let totalAngle = charAngle;

    let x = cos(totalAngle) * radius;
    let y = sin(totalAngle) * radius;

    push();
    translate(x, y);
    rotate(totalAngle + 90);
    fill(255);
    noStroke();
    text(textString[i], 0, 0);
    pop();
  }
}

// --- Click/touch detection on arcs ---
function mousePressed() {
  let dx = mouseX - width / 2;
  let dy = mouseY - height / 2;
  let mouseDist = sqrt(dx * dx + dy * dy);
  let mouseAngle = atan2(dy, dx);

  if (mouseAngle < -180) mouseAngle += 360;
  if (mouseAngle > 180) mouseAngle -= 360;

  for (let r of rings) {
    let ringAngle = (r.angleOffset % 360 + 360) % 360;
    let localAngle = mouseAngle - ringAngle;

    if (localAngle > 180) localAngle -= 360;
    if (localAngle < -180) localAngle += 360;

    let minA = -r.arcRange / 2;
    let maxA = r.arcRange / 2;

    if (mouseDist > r.radius - 15 && mouseDist < r.radius + 15 && localAngle > minA && localAngle < maxA) {
      window.open(r.url, "_blank");
      return;
    }
  }
}

// --- Touch mapping for mobile devices ---
function touchStarted() {
  if (typeof mousePressed === "function") mousePressed();
  return false; // prevent default scroll
}

function touchEnded() {
  if (typeof mouseReleased === "function") mouseReleased();
  return false;
}

function touchMoved() {
  if (typeof mouseDragged === "function") mouseDragged();
  return false;
}

// --- Handle resizes / rotation changes ---
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup(); // rebuild layout with new scale
}
