new p5(function (p) {
  const W = 900;
  const H = 560;
  const totalFish = 24;

  p.setup = function () {
    p.createCanvas(W, H);
    p.textFont("Arial");
  };

  p.draw = function () {
    p.background(248, 250, 252);

    const h = p.hour();
    const m = p.minute();
    const s = p.second();
    
    p.fill(255);
    p.stroke(35);
    p.strokeWeight(3);
    p.rect(50, 45, 800, 460, 18);

    p.noStroke();
    p.fill(35);
    p.textSize(26);
    p.textStyle(p.BOLD);
    p.textAlign(p.LEFT);
    p.text(formatDate(), 90, 90);

    p.textSize(34);
    p.textAlign(p.RIGHT);
    p.text(formatTime(h, m), 805, 90);
    p.textStyle(p.NORMAL);

    const fishEaten = p.floor(p.map(m, 0, 59, 0, totalFish));
    const remainingFish = totalFish - fishEaten;

    const startX = 120;
    const startY = 150;
    const cols = 6;
    const spacingX = 95;
    const spacingY = 55;

    for (let i = 0; i < totalFish; i++) {
      const col = i % cols;
      const row = p.floor(i / cols);
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;

      if (i < remainingFish) {
        drawFish(x, y, 1);
      } else {
        drawFish(x, y, 0.12);
      }
    }

    const catX = p.map(s, 0, 59, startX, startX + (cols - 1) * spacingX);
    const catY = startY + 4 * spacingY + 35;

    drawCat(catX, catY);

    p.noFill();
    p.stroke(70);
    p.strokeWeight(2);
    p.drawingContext.setLineDash([5, 6]);
    p.ellipse(catX - 55, catY - 8, 50, 28);
    p.drawingContext.setLineDash([]);

    p.noStroke();
    p.fill(70);
    p.textSize(15);
    p.textAlign(p.LEFT);
    p.text("Hour = full reset cycle   Minute = remaining fish   Second = cat movement", 90, 470);
  };

  function drawFish(x, y, alpha) {
    p.push();
    p.translate(x, y);

    p.stroke(20, 40, 70, 255 * alpha);
    p.strokeWeight(3);
    p.fill(55, 115, 200, 255 * alpha);

    p.ellipse(0, 0, 42, 25);

    p.triangle(20, 0, 40, -15, 40, 15);

    p.fill(20, 255 * alpha);
    p.noStroke();
    p.circle(-12, -5, 5);
    
    p.fill(35, 75, 150, 180 * alpha);
    p.triangle(-2, 0, 10, -8, 10, 8);

    p.pop();
  }

  function drawCat(x, y) {
    p.push();
    p.translate(x, y);

    p.noStroke();
    p.fill(35);
    p.ellipse(0, 0, 75, 45);

    p.circle(-42, -18, 48);

    p.triangle(-62, -35, -52, -62, -40, -35);
    p.triangle(-28, -35, -16, -62, -8, -35);

    p.stroke(35);
    p.strokeWeight(8);
    p.noFill();
    p.arc(35, -18, 65, 70, -p.PI / 2, p.PI / 3);

    p.noStroke();
    p.fill(255);
    p.arc(-50, -22, 12, 12, 0, p.PI);
    p.arc(-34, -22, 12, 12, 0, p.PI);

    p.fill(255, 120, 135);
    p.circle(-58, -8, 9);
    p.circle(-26, -8, 9);
  
    p.stroke(255);
    p.strokeWeight(2);
    p.noFill();
    p.arc(-42, -10, 18, 12, 0, p.PI);

    p.pop();
  }

  function formatTime(h, m) {
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }

  function formatDate() {
    const d = new Date(2026, 4, 4);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }
});
