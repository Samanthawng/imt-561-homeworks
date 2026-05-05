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
    p.fill(185, 192, 205);
    p.quad(90, 430, 790, 430, 830, 465, 130, 465);

    p.fill(255);
    p.stroke(40);
    p.strokeWeight(3);
    p.rect(70, 70, 720, 360, 18);

    p.noStroke();
    p.fill(35);
    p.textSize(28);
    p.textStyle(p.BOLD);
    p.text("Meeting Wave Clock", 105, 118);
    p.textStyle(p.NORMAL);

    const chartX = 110;
    const chartY = 150;
    const chartW = 620;
    const chartH = 190;
    const baseY = chartY + chartH * 0.78;

    p.stroke(225);
    p.strokeWeight(1);
    for (let i = 0; i <= 4; i++) {
      const y = chartY + (chartH / 4) * i;
      p.line(chartX, y, chartX + chartW, y);
    }

    let pts = [];
    for (let x = 0; x <= chartW; x += 8) {
      const t = x / chartW;

      const noonPeak = p.exp(-p.pow((t - 0.43) * 6.5, 2));
      const secondPeak = p.exp(-p.pow((t - 0.58) * 8, 2));
      const afternoon = p.exp(-p.pow((t - 0.78) * 6, 2));

      let intensity = 0.08 + noonPeak * 0.9 + secondPeak * 0.55 + afternoon * 0.28;

      const ripple =
        p.sin(t * p.TWO_PI * 5 + 0.6) * 8 +
        p.sin(t * p.TWO_PI * 11) * 4;

      const y = baseY - intensity * 120 + ripple;
      pts.push({ x: chartX + x, y, t, intensity });
    }

    function drawSmoothShape(filterFn, fillColor) {
      p.noStroke();
      p.fill(fillColor);
      p.beginShape();
      p.vertex(chartX, baseY);

      for (let pt of pts) {
        let y = filterFn(pt) ? pt.y : baseY;
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

    p.fill(70);
    p.textSize(14);
    p.textAlign(p.CENTER);
    p.text("9AM", chartX, baseY + 45);
    p.text("12PM", chartX + chartW * 0.43, baseY + 45);
    p.text("3PM", chartX + chartW * 0.72, baseY + 45);
    p.text("6PM", chartX + chartW, baseY + 45);

    p.textAlign(p.LEFT);
    p.textSize(15);

    p.noStroke();
    p.fill(55, 120, 200);
    p.rect(110, 390, 14, 14);
    p.fill(60);
    p.text("normal meeting load", 132, 403);

    p.fill(220, 65, 65);
    p.rect(310, 390, 14, 14);
    p.fill(60);
    p.text("peak meeting intensity", 332, 403);

    p.textSize(18);
    p.fill(30);
    p.text(formatTime(h, m, s), 610, 403);
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
