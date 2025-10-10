let rings = [
  { text: ".~* E-MAIL *~.", radius: 200, arcRange: 120, url: "mailto:alan.perry.studio@gmail.com", speed: 0.001, angleOffset: 0 },
  { text: ".~* WEBSITE *~.", radius: 250, arcRange: 120, url: "https://www.alanjperry.com", speed: 0.0012, angleOffset: 0 },
  { text: ".~* INSTAGRAM *~.", radius: 300, arcRange: 120, url: "https://www.instagram.com/alanjperry", speed: 0.0006, angleOffset: 0 }
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(36);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES); // work in degrees to simplify math
}

function draw() {
  background(0);
  stroke(255);
  translate(width / 2, height / 2);


  // Draw each ring
  for (let i = rings.length - 1; i >= 0; i--) {
    let r = rings[i];
    push();
    fill(30);
    // noFill(); 
    circle(0, 0, r.radius * 2 + 60); // debug visualization (keep?)

    rotate(r.angleOffset);
    drawTextRing(r.text, r.radius, r.arcRange);

    // Animate rotation
    r.angleOffset += degrees(r.speed); // convert rad speed to deg
    
    pop();
  }

    
  // Draw center text
  
  // noStroke();
  fill(50);
  circle(0, 0, 260); // inner circle for aesthetics
  fill(255);
  text("ALAN\nPERRY", 0, 0);

}

// --- Draws text along an arc segment ---
function drawTextRing(textString, radius, textAngleRange) {
  for (let i = 0; i < textString.length; i++) {
    let charAngle = map(i, 0, textString.length, -textAngleRange / 2, textAngleRange / 2);
    let totalAngle = charAngle; // angle within this ring's local rotation

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

// --- Detect click near a specific ring and within its rotating arc ---
function mousePressed() {
  console.log("mousePressed");

  // Mouse position relative to center
  let dx = mouseX - width / 2;
  let dy = mouseY - height / 2;
  let mouseDist = sqrt(dx * dx + dy * dy);
  let mouseAngle = atan2(dy, dx); // in degrees automatically since angleMode(DEGREES)
  // normalize angle
  if (mouseAngle < -180) mouseAngle += 360;
  if (mouseAngle > 180) mouseAngle -= 360;

  // Check each ring
  for (let r of rings) {
    let ringAngle = (r.angleOffset % 360 + 360) % 360; // current rotation normalized
    let localAngle = mouseAngle - ringAngle;

    // Wrap localAngle into -180..180
    if (localAngle > 180) localAngle -= 360;
    if (localAngle < -180) localAngle += 360;

    let minA = -r.arcRange / 2;
    let maxA = r.arcRange / 2;

    // Check if mouse within angular + radial bounds
    if (mouseDist > r.radius - 15 && mouseDist < r.radius + 15 && localAngle > minA && localAngle < maxA) {
      console.log("Clicked ring:", r.text, "angle:", localAngle.toFixed(1));
      window.open(r.url, "_blank");
      return;
    }
  }
}

// =-=-=-=-=-=-= Direct copy of mousePressed function above =-=-=-=-=-=-=
function touchStarted() {
  console.log("touchStarted");

  // Mouse position relative to center
  let dx = mouseX - width / 2;
  let dy = mouseY - height / 2;
  let mouseDist = sqrt(dx * dx + dy * dy);
  let mouseAngle = atan2(dy, dx); // in degrees automatically since angleMode(DEGREES)
  // normalize angle
  if (mouseAngle < -180) mouseAngle += 360;
  if (mouseAngle > 180) mouseAngle -= 360;

  // Check each ring
  for (let r of rings) {
    let ringAngle = (r.angleOffset % 360 + 360) % 360; // current rotation normalized
    let localAngle = mouseAngle - ringAngle;

    // Wrap localAngle into -180..180
    if (localAngle > 180) localAngle -= 360;
    if (localAngle < -180) localAngle += 360;

    let minA = -r.arcRange / 2;
    let maxA = r.arcRange / 2;

    // Check if mouse within angular + radial bounds
    if (mouseDist > r.radius - 15 && mouseDist < r.radius + 15 && localAngle > minA && localAngle < maxA) {
      console.log("Clicked ring:", r.text, "angle:", localAngle.toFixed(1));
      window.open(r.url, "_blank");
      return;
    }
  }
}