let a = 0;
let t = 0.0001;
let emoji = "✨";

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(0);
}

function draw() {
  background(0);
  stroke(255);

  push();
  translate(width/2, height/2);


  rotate(a);
  a -= 0.001;


  // spiral
  beginShape(LINES);
  for (let i = 0; i < TWO_PI * 16; i += 0.04) {
    let r = 5 + i * 10;
    let x = cos(i) * r;
    let y = sin(i) * r;
    vertex(x,y);
  }
  endShape();

  // cosmic emoji generator
  let r = 5 + t * 10;
  let x = cos(t) * r;
  let y = sin(t) * r;
  text(emoji, x, y);

  t += 0.005;
  textSize(t * 5);
  if (t > TWO_PI * 16) {
    t = 0;
  }
  pop();

  push();
  textSize(64);
  text("🌞", (width / 2) - 32, (height / 2) + 32);
  pop();

}