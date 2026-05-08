// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  const CANVAS_SIZE = 800;

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    p.textFont("Georgia, 'Times New Roman', serif");
  };

  p.draw = function () {
    p.background(242, 244, 248);

    const h = p.hour();
    const m = p.minute();
    const s = p.second();

    const cardX = 50;
    const cardY = 80;
    const cardW = 700;
    const cardH = 550;
    const cardRight = cardX + cardW;

    const chartX = 100;
    const chartY = 200;
    const chartW = 600;
    const chartH = 300;
    const baseY = chartY + chartH * 0.78;

    p.noStroke();
    p.fill(185, 192, 205);
    p.quad(70, 430, 790, 430, 835, 465, 115, 465);

    p.fill(255);
    p.stroke(35);
    p.strokeWeight(3);
    p.rect(cardX, cardY, cardW, cardH, 18);

    p.noStroke();
    p.fill(35);
    p.textSize(26);
    p.textStyle(p.BOLD);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(formatDate(), 90, 112);
    p.textStyle(p.NORMAL);

    p.stroke(220);
    p.strokeWeight(1);
    for (let i = 0; i <= 3; i++) {
    const y = chartY + i * 48;
    p.line(chartX, y, chartX + chartW, y);
  }

    p.stroke(145);
    p.strokeWeight(2);
    p.line(chartX, baseY, chartX + chartW, baseY);

    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(14);
    p.noStroke();
    p.fill(70);

    for (let hr = 9; hr <= 18; hr++) {
      const t = (hr - 9) / 9;
      const x = chartX + t * chartW;

    p.stroke(70);
    p.strokeWeight(1);
    p.line(x, baseY, x, baseY + 14);

    p.noStroke();
    p.fill(60);
    p.circle(x, baseY + 16, 3);

    let label;
    if (hr === 12) label = "12PM";
    else if (hr > 12) label = (hr - 12) + "PM";
    else label = hr + "AM";

    p.fill(70);
    p.text(label, x, baseY + 38);
  }

let pts = [];

for (let x = 0; x <= chartW; x += 6) {
  const t = x / chartW;

  const noonPeak = p.exp(-p.pow((t - 0.44) * 6.4, 2));
  const secondPeak = p.exp(-p.pow((t - 0.57) * 8.2, 2));
  const afternoon = p.exp(-p.pow((t - 0.78) * 6, 2));

  const intensity =
    0.08 + noonPeak * 0.88 + secondPeak * 0.52 + afternoon * 0.26;

  const flow =
    p.sin(t * p.TWO_PI * 2.1 + p.millis() * 0.0011) * 7 +
    p.sin(t * p.TWO_PI * 5.2 + p.millis() * 0.0016) * 4;

  const y = baseY - intensity * 118 + flow;

  pts.push({ x: chartX + x, y, intensity });
}

p.noStroke();
p.fill(55, 120, 200, 210);
p.beginShape();
p.vertex(chartX, baseY);
p.curveVertex(chartX, baseY);

for (let pt of pts) {
      p.curveVertex(pt.x, pt.y);
    }

    p.curveVertex(chartX + chartW, baseY);
    p.vertex(chartX + chartW, baseY);
    p.endShape(p.CLOSE);

    p.noStroke();
    p.fill(220, 65, 65, 225);
    p.beginShape();
    p.vertex(chartX, baseY);
    p.curveVertex(chartX, baseY);

    for (let pt of pts) {
      if (pt.intensity > 0.62) {
        p.curveVertex(pt.x, pt.y);
      } else {
        p.curveVertex(pt.x, baseY);
      }
    }

    p.curveVertex(chartX + chartW, baseY);
    p.vertex(chartX + chartW, baseY);
    p.endShape(p.CLOSE);

p.noFill();
p.stroke(25);
p.strokeWeight(4);
p.beginShape();
p.curveVertex(pts[0].x, pts[0].y);

for (let pt of pts) {
  p.curveVertex(pt.x, pt.y);
}

p.curveVertex(pts[pts.length - 1].x, pts[pts.length - 1].y);
p.endShape();

const currentT = p.map(h + m / 60 + s / 3600, 9, 18, 0, 1, true);

const currentIntensity =
  0.08 +
  p.exp(-p.pow((currentT - 0.44) * 6.4, 2)) * 0.88 +
  p.exp(-p.pow((currentT - 0.57) * 8.2, 2)) * 0.52 +
  p.exp(-p.pow((currentT - 0.78) * 6, 2)) * 0.26;

const loadStatus = currentIntensity > 0.62 ? "High" : "Normal";

// fixed: no bold, no black stroke
p.push();
p.textAlign(p.RIGHT, p.CENTER);
p.textSize(15);
p.textStyle(p.NORMAL);
p.noStroke();
p.fill(currentIntensity > 0.62 ? p.color(220, 65, 65) : p.color(55, 120, 200));
p.text("Current Load: " + loadStatus, cardRight - 30, 112);
p.pop();

const dayProgress = p.map(h + m / 60 + s / 3600, 9, 18, 0, 1, true);
const currentX = chartX + dayProgress * chartW;

p.stroke(35);
p.strokeWeight(2);
p.line(currentX, chartY, currentX, baseY + 18);

p.noStroke();
p.fill(35);
p.circle(currentX, baseY + 18, 6);

p.push();
p.textAlign(p.RIGHT, p.CENTER);
p.textSize(30);
p.textStyle(p.BOLD);
p.noStroke();
p.fill(30);
p.text(formatTime(h, m, s), cardRight - 30, 405);
p.pop();
  };

function formatDate() {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function formatTime(h, m, s) {
  return (
    String(h).padStart(2, "0") +
    ":" +
    String(m).padStart(2, "0") +
    ":" +
    String(s).padStart(2, "0")
  );
}