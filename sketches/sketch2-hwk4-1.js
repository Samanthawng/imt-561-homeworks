// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  const CANVAS_SIZE = 800;
  const W = 900;
  const H = 560;


  p.setup = function () {
    p.createCanvas(W, H);
    p.textFont("Georgia, 'Times New Roman', serif");
  };

  p.draw = function () {
    p.background(242, 244, 248);
    const h = p.hour();
    const m = p.minute();
    const s = p.second();

    const cardX = 50;
    const cardY = 55;
    const cardW = 740;
    const cardH = 375;
    const cardRight = cardX + cardW;

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
    p.textAlign(p.LEFT);
    p.text(formatDate(), 90, 112);
    p.textStyle(p.NORMAL);

    p.textAlign(p.RIGHT);
    p.textSize(15);
    p.textStyle(p.BOLD);
    p.fill(55, 120, 200);
    p.text("Current Load: Normal", cardRight - 30, 112);
    p.textStyle(p.NORMAL);
  };

  p.windowResized = function () { 
    p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});
  function formatDate() {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}
  const chartX = 110;
const chartY = 160;
const chartW = 620;
const chartH = 185;
const baseY = chartY + chartH * 0.78;

p.stroke(220);
p.strokeWeight(1);

for (let i = 0; i <= 3; i++) {
  const y = chartY + i * 48;
  p.line(chartX, y, chartX + chartW, y);
}

p.textAlign(p.CENTER);
p.textSize(14);
p.fill(70);

for (let hr = 9; hr <= 18; hr++) {
  const t = (hr - 9) / 9;
  const x = chartX + t * chartW;

  // tick line
  p.stroke(70);
  p.strokeWeight(1);
  p.line(x, baseY, x, baseY + 14);

  // dot
  p.noStroke();
  p.fill(60);
  p.circle(x, baseY + 16, 3);

  // label
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

  pts.push({ x: chartX + x, y });
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