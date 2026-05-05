new p5(function (p) {
  const W = 900;
  const H = 560;

  p.setup = function () {
    p.createCanvas(W, H);
    p.textFont("Arial");
  };

  p.draw = function () {
    p.background(242, 244, 248);

    const h = p.hour();
    const m = p.minute();
    const s = p.second();

    p.noStroke();
    p.fill(210, 214, 222);
    p.rect(100, 100, 680, 330, 14);
    p.fill(185, 190, 200);
    p.quad(780, 100, 815, 125, 815, 455, 780, 430);
    p.fill(170, 176, 188);
    p.quad(100, 430, 780, 430, 815, 455, 135, 455);

    p.fill(255);
    p.stroke(40);
    p.strokeWeight(3);
    p.rect(80, 80, 700, 350, 14);

    p.noStroke();
    p.fill(30);
    p.textSize(28);
    p.textStyle(p.BOLD);
    p.text("Meeting Wave Clock", 110, 125);
    p.textStyle(p.NORMAL);

    const chartX = 120;
    const chartY = 165;
    const chartW = 610;
    const chartH = 190;
    const baseY = chartY + chartH * 0.78;

    p.stroke(225);
    p.strokeWeight(1);
    for (let i = 0; i <= 4; i++) {
      let y = chartY + i * chartH / 4;
      p.line(chartX, y, chartX + chartW, y);
    }

    let points = [];
    for (let i = 0; i <= 18; i++) {
      let t = i / 18;
      let amp =
        18 +
        120 * p.exp(-p.pow((t - 0.42) * 8, 2)) +
        95 * p.exp(-p.pow((t - 0.55) * 10, 2)) +
        45 * p.exp(-p.pow((t - 0.78) * 9, 2));

      amp *= 0.75 + 0.5 * p.noise(i * 1.7);
      let x = chartX + t * chartW;
      let y = baseY - amp;
      points.push({ x, y, amp, t });
    }

    p.noStroke();
    p.fill(0, 0, 0, 30);
    p.beginShape();
    p.vertex(chartX + 18, baseY + 18);
    for (let pt of points) p.vertex(pt.x + 18, pt.y + 18);
    p.vertex(chartX + chartW + 18, baseY + 18);
    p.endShape(p.CLOSE);

    p.beginShape();
    p.vertex(chartX, baseY);
    for (let pt of points) {
      if (pt.amp > 85) p.fill(215, 55, 55, 210);
      else p.fill(45, 105, 190, 200);
      p.vertex(pt.x, pt.y);
    }
    p.vertex(chartX + chartW, baseY);
    p.endShape(p.CLOSE);

    p.noFill();
    p.stroke(20);
    p.strokeWeight(4);
    p.beginShape();
    for (let pt of points) p.vertex(pt.x, pt.y);
    p.endShape();

    p.noStroke();
    for (let pt of points) {
      if (pt.amp > 85) {
        p.fill(220, 50, 50, 230);
        p.triangle(pt.x - 18, baseY, pt.x, pt.y, pt.x + 18, baseY);
      }
    }

    const dayProgress = p.map(h + m / 60 + s / 3600, 9, 18, 0, 1, true);
    const currentX = chartX + dayProgress * chartW;

    p.stroke(40);
    p.strokeWeight(2);
    p.line(currentX, chartY, currentX, baseY + 20);
    p.noStroke();
    p.fill(40);
    p.circle(currentX, baseY + 20, 9);

    p.fill(70);
    p.textSize(14);
    p.textAlign(p.CENTER);
    p.text("9AM", chartX, baseY + 45);
    p.text("12PM", chartX + chartW * 0.42, baseY + 45);
    p.text("3PM", chartX + chartW * 0.72, baseY + 45);
    p.text("6PM", chartX + chartW, baseY + 45);

    p.textAlign(p.LEFT);
    p.textSize(15);
    p.fill(45, 105, 190);
    p.rect(120, 395, 14, 14);
    p.fill(70);
    p.text("normal meeting load", 142, 407);

    p.fill(215, 55, 55);
    p.rect(320, 395, 14, 14);
    p.fill(70);
    p.text("peak meeting intensity", 342, 407);

    p.textSize(18);
    p.fill(30);
    p.text(formatTime(h, m, s), 610, 407);
  };

  function formatTime(h, m, s) {
    return (
      String(h).padStart(2, "0") +
      ":" +
      String(m).padStart(2, "0") +
      ":" +
      String(s).padStart(2, "0")
    );
  }
});
