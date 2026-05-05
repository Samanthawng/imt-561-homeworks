new p5(function (p) {
  const W = 900;
  const H = 560;

  p.setup = function () {
    p.createCanvas(W, H);
    p.textFont("-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial");
  };

  p.draw = function () {
    p.background(242, 244, 248);

    const h = p.hour();
    const m = p.minute();
    const s = p.second();

    p.noStroke();
    p.fill(185, 192, 205);
    p.quad(90, 430, 770, 430, 810, 465, 130, 465);

    p.fill(255);
    p.stroke(40);
    p.strokeWeight(3);
    p.rect(70, 70, 700, 360, 18);

    p.noStroke();
    p.fill(35);
    p.textSize(24);
    p.textStyle(p.BOLD);
    p.textAlign(p.LEFT);
    p.text(formatDate(), 105, 115);
    p.textStyle(p.NORMAL);

    const chartX = 120;
    const chartY = 150;
    const chartW = 580;
    const chartH = 190;
    const baseY = chartY + chartH * 0.78;

    p.stroke(225);
    p.strokeWeight(1);
    for (let i = 0; i <= 4; i++) {
      const y = chartY + (chartH / 4) * i;
      p.line(chartX, y, chartX + chartW, y);
    }

    let pts = [];
    for (let x = 0; x <= chartW; x += 6) {
      const t = x / chartW;

      const noonPeak = p.exp(-p.pow((t - 0.43) * 6.5, 2));
      const secondPeak = p.exp(-p.pow((t - 0.58) * 8, 2));
      const afternoon = p.exp(-p.pow((t - 0.78) * 6, 2));

      const intensity =
        0.08 + noonPeak * 0.9 + secondPeak * 0.55 + afternoon * 0.28;

      // ocean-like flowing motion
      const flow =
        p.sin(t * p.TWO_PI * 2.2 + p.millis() * 0.0012) * 10 +
        p.sin(t * p.TWO_PI * 5.3 + p.millis() * 0.0018) * 5 +
        p.noise(t * 4, p.millis() * 0.00035) * 12;

      const y = baseY - intensity * 120 + flow;
      pts.push({ x: chartX + x, y, t, intensity });
    }

    function drawSmoothShape(filterFn, fillColor) {
      p.noStroke();
      p.fill(fillColor);
      p.beginShape();
      p.vertex(chartX, baseY);

      for (let pt of pts) {
        const y = filterFn(pt) ? pt.y : baseY;
        p.curveVertex(pt.x, y);
      }

      p.vertex(chartX + chartW, baseY);
      p.endShape(p.CLOSE);
    }

    drawSmoothShape(() => true, p.color(55, 120, 200, 210));
    drawSmoothShape((pt) => pt.intensity > 0.62, p.color(220, 65, 65, 220));

    p.noFill();
    p.stroke(25);
    p.strokeWeight(4);
    p.beginShape();
    for (let i = 0; i < pts.length; i++) {
      p.curveVertex(pts[i].x, pts[i].y);
    }
    p.endShape();

    // subtle highlight wave line
    p.noFill();
    p.stroke(255, 255, 255, 70);
    p.strokeWeight(2);
    p.beginShape();
    for (let pt of pts) {
      p.curveVertex(pt.x, pt.y + 12);
    }
    p.endShape();

    p.stroke(140);
    p.strokeWeight(2);
    p.line(chartX, baseY, chartX + chartW, baseY);

    const dayProgress = p.map(h + m / 60 + s / 3600, 9, 18, 0, 1, true);
    const currentX = chartX + dayProgress * chartW;

    p.stroke(40);
    p.strokeWeight(2);
    p.line(currentX, chartY, currentX, baseY + 24);
    p.noStroke();
    p.fill(40);
    p.circle(currentX, baseY + 24, 9);

    p.textAlign(p.CENTER);
    p.textSize(12);
    p.fill(80);

    for (let hr = 9; hr <= 18; hr++) {
      const t = (hr - 9) / 9;
      const x = chartX + t * chartW;

      p.stroke(120);
      p.strokeWeight(1);
      p.line(x, baseY, x, baseY + 8);

      p.noStroke();
      p.fill(60);
      p.circle(x, baseY + 12, 4);

      p.fill(80);
      let label;
      if (hr === 12) label = "12PM";
      else if (hr > 12) label = hr - 12 + "PM";
      else label = hr + "AM";

      p.text(label, x, baseY + 32);
    }

    p.textAlign(p.LEFT);
    p.textSize(15);
    p.textStyle(p.NORMAL);

    p.noStroke();
    p.fill(55, 120, 200);
    p.rect(110, 390, 14, 14);
    p.fill(60);
    p.text("Normal Meeting Load", 132, 403);

    p.fill(220, 65, 65);
    p.rect(310, 390, 14, 14);
    p.fill(60);
    p.text("Peak Meeting Intensity", 332, 403);

    p.textSize(26);
    p.textStyle(p.BOLD);
    p.fill(30);
    p.text(formatTime(h, m, s), 610, 406);
    p.textStyle(p.NORMAL);
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

  function formatDate() {
    const d = new Date();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[d.getMonth()] + " " + d.getDate();
  }
});
