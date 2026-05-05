new p5(function (p) {
  const W = 800;
  const H = 500;

  p.setup = function () {
    p.createCanvas(W, H);
    p.textFont("Arial");
  };

  p.draw = function () {
    p.background(245);

    const h = p.hour();
    const m = p.minute();
    const s = p.second();

   
    p.stroke(200);
    p.strokeWeight(2);
    p.fill(255);
    p.rect(50, 60, 700, 360, 12);

  
    p.noStroke();
    p.fill(30);
    p.textSize(24);
    p.text("Meeting Wave Clock", 70, 95);

   
    const chartX = 80;
    const chartY = 140;
    const chartW = 640;
    const chartH = 200;
    const baseY = chartY + chartH / 2;

  
    p.stroke(230);
    p.strokeWeight(1);
    for (let i = 0; i <= 4; i++) {
      let y = chartY + (chartH / 4) * i;
      p.line(chartX, y, chartX + chartW, y);
    }

    const dayProgress = p.map(h + m / 60, 9, 18, 0, 1, true);
    const currentX = chartX + dayProgress * chartW;

 
    p.noFill();
    p.strokeWeight(4);

    p.beginShape();
    for (let x = 0; x <= chartW; x += 6) {
      let t = x / chartW;

    
      let noonPeak = p.exp(-p.pow((t - 0.4) * 8, 2));
      let afternoonPeak = p.exp(-p.pow((t - 0.7) * 9, 2));

      let intensity = noonPeak * 1.0 + afternoonPeak * 0.7;

      
      let microMotion = p.sin(x * 0.05 + s * 0.1) * 3;

      let y = baseY - intensity * 70 + microMotion;

     
      if (intensity > 0.6) {
        p.stroke(210, 70, 70);
      } else {
        p.stroke(70, 130, 200);
      }

      p.vertex(chartX + x, y);
    }
    p.endShape();

   
    p.stroke(40);
    p.strokeWeight(2);
    p.line(currentX, chartY, currentX, chartY + chartH);

    p.noStroke();
    p.fill(40);
    p.circle(currentX, baseY, 8);

   
    p.fill(100);
    p.textSize(12);
    p.textAlign(p.CENTER);

    p.text("9AM", chartX, chartY + chartH + 30);
    p.text("12PM", chartX + chartW * 0.4, chartY + chartH + 30);
    p.text("3PM", chartX + chartW * 0.7, chartY + chartH + 30);
    p.text("6PM", chartX + chartW, chartY + chartH + 30);

   
    p.textAlign(p.LEFT);
    p.textSize(16);
    p.fill(40);
    p.text(formatTime(h, m, s), 80, 400);
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
