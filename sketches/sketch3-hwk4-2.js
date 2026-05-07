registerSketch('sk3', function (p) {
const W = 720;
const H = 720;
const totalFish = 24;

function setup() {
  createCanvas(W, H);
  textFont("Arial");
}

function draw() {
  background(242, 244, 248);

  const h = hour();
  const m = minute();
  const s = second();

  // 3D shadow
  noStroke();
  fill(185, 192, 205);
  quad(80, 650, 620, 650, 660, 685, 120, 685);

  // square card
  fill(255);
  stroke(35);
  strokeWeight(4);
  rect(55, 45, 590, 605, 24);

  // current timer
  noStroke();
  fill(30);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(76);
  text(formatTime(h, m), 350, 130);

  // live date + weekday
  const today = new Date();

  const liveDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const liveWeekday = today.toLocaleDateString("en-US", {
    weekday: "long"
  });

  textStyle(NORMAL);
  textSize(24);
  fill(55);
  text(liveDate, 350, 175);
  text(liveWeekday, 350, 210);

  // fish grid: 6 rows x 4 columns
  const cols = 4;
  const startX = 155;
  const startY = 275;
  const spacingX = 95;
  const spacingY = 50;

  // each fish = one hour
  const eatenFish = h;
  const remainingFish = totalFish - eatenFish;

  for (let i = 0; i < totalFish; i++) {
    const col = i % cols;
    const row = floor(i / cols);
    const x = startX + col * spacingX;
    const y = startY + row * spacingY;

    if (i < remainingFish) {
      drawCuteFish(x, y, 1);
    } else {
      drawCuteFish(x, y, 0.08);
    }
  }

  // cat moves every second
  const catX = map(s, 0, 59, 540, 160);
  const catY = 595 + sin(frameCount * 0.15) * 3;

  drawNyanCatFacingLeft(catX, catY, 0.72);
}

function drawCuteFish(x, y, alpha) {
  push();
  translate(x, y);

  stroke(25, 55, 95, 255 * alpha);
  strokeWeight(3);
  fill(75, 135, 220, 255 * alpha);

  // body
  ellipse(0, 0, 50, 30);

  // tail
  triangle(22, 0, 48, -16, 48, 16);

  // eye
  noStroke();
  fill(255, 255 * alpha);
  circle(-14, -6, 9);
  fill(20, 255 * alpha);
  circle(-15, -6, 4.5);

  // smile
  noFill();
  stroke(25, 55, 95, 255 * alpha);
  strokeWeight(2);
  arc(-10, 5, 14, 9, 0, PI);

  // fin
  noStroke();
  fill(45, 100, 190, 180 * alpha);
  ellipse(6, 3, 15, 9);

  pop();
}

function drawNyanCatFacingLeft(x, y, scaleSize) {
  push();
  translate(x, y);
  scale(scaleSize);

  // rainbow trail
  const colors = [
    [255, 0, 0],
    [255, 150, 0],
    [255, 230, 0],
    [0, 200, 80],
    [0, 130, 255],
    [150, 80, 255]
  ];

  for (let i = 0; i < colors.length; i++) {
    noStroke();
    fill(colors[i][0], colors[i][1], colors[i][2]);
    const wave = sin(frameCount * 0.12 + i) * 4;
    rect(45, -30 + i * 9 + wave, 100, 8);
  }

  // body
  stroke(60);
  strokeWeight(3);
  fill(245, 170, 220);
  rect(-45, -30, 90, 60, 8);

  noStroke();
  fill(255, 205, 235);
  rect(-35, -20, 70, 40, 6);

  // sprinkles
  fill(255);
  for (let i = 0; i < 9; i++) {
    circle(-25 + i * 7, -10 + (i % 3) * 10, 3);
  }

  // head
  stroke(60);
  strokeWeight(3);
  fill(165);
  rect(-88, -24, 50, 45, 8);

  // ears
  triangle(-82, -24, -72, -48, -62, -24);
  triangle(-58, -24, -48, -48, -40, -24);

  // eyes
  noStroke();
  fill(255);
  ellipse(-74, -8, 11, 8);
  ellipse(-55, -8, 11, 8);

  fill(35);
  ellipse(-74, -8, 5, 7);
  ellipse(-55, -8, 5, 7);

  // nose
  fill(80);
  triangle(-66, 1, -62, 1, -64, 5);

  // mouth
  noFill();
  stroke(35);
  strokeWeight(2);
  arc(-68, 7, 10, 8, 0, PI);
  arc(-60, 7, 10, 8, 0, PI);

  // whiskers
  line(-82, 2, -96, -2);
  line(-82, 7, -96, 7);
  line(-46, 2, -32, -2);
  line(-46, 7, -32, 7);

  // legs
  noStroke();
  fill(130);
  rect(-35, 30, 10, 16);
  rect(-10, 30, 10, 16);
  rect(15, 30, 10, 16);
  rect(38, 30, 10, 16);

  pop();
}

function formatTime(h, m) {
  return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
}
