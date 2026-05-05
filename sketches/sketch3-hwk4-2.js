new p5(function (p) {
  const W = 900;
  const H = 560;
  const totalFish = 24;

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
    p.quad(65, 485, 820, 485, 855, 520, 100, 520);

    p.fill(255);
    p.stroke(35);
    p.strokeWeight(4);
    p.rect(40, 40, 790, 445, 22);

    p.noStroke();
    p.fill(35);
    p.textAlign(p.RIGHT);
    p.textStyle(p.BOLD);
    p.textSize(48);
    p.text(formatTime(h, m), 785, 105);

    p.textStyle(p.NORMAL);
    p.textSize(22);
    p.fill(55);
    p.text("May 4, 2026", 785, 145);
    p.text("Monday", 785, 178);

    const cols = 4;
    const rows = 6;
    const startX = 115;
    const startY = 115;
    const spacingX = 105;
    const spacingY = 52;

    const fishEaten = p.floor(p.map(m, 0, 59, 0, totalFish));
    const remainingFish = totalFish - fishEaten;

    for (let i = 0; i < totalFish; i++) {
      const col = i % cols;
      const row = p.floor(i / cols);
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;

      if (i < remainingFish) {
        drawFish(x, y, 1);
      } else {
        drawFish(x, y, 0.08);
      }
    }

    const catX = p.map(s, 0, 59, 120, 520);
    const catY = 440;
    drawNyanCat(catX, catY, 0.9);
  };

  function drawFish(x, y, alpha) {
    p.push();
    p.translate(x, y);

    p.stroke(20, 45, 80, 255 * alpha);
    p.strokeWeight(4);
    p.fill(55, 115, 205, 255 * alpha);

    p.ellipse(0, 0, 58, 32);
    p.triangle(28, 0, 58, -22, 58, 22);

    p.noStroke();
    p.fill(35, 80, 160, 190 * alpha);
    p.triangle(-4, 0, 17, -13, 17, 13);

    p.fill(20, 255 * alpha);
    p.circle(-20, -8, 7);

    p.pop();
  }

  function drawNyanCat(x, y, scaleSize) {
    p.push();
    p.translate(x, y);
    p.scale(scaleSize);

    // rainbow
    const colors = [
      [255, 0, 0],
      [255, 150, 0],
      [255, 230, 0],
      [0, 200, 80],
      [0, 130, 255],
      [150, 80, 255]
    ];

    for (let i = 0; i < colors.length; i++) {
      p.noStroke();
      p.fill(colors[i][0], colors[i][1], colors[i][2]);
      const wave = p.sin(p.frameCount * 0.12 + i) * 4;
      p.rect(-150, -30 + i * 9 + wave, 100, 8);
    }

    // body
    p.stroke(60);
    p.strokeWeight(3);
    p.fill(245, 170, 220);
    p.rect(-45, -30, 90, 60, 8);

    // inner body
    p.noStroke();
    p.fill(255, 200, 235);
    p.rect(-35, -20, 70, 40, 6);

    // sprinkles
    p.fill(255);
    for (let i = 0; i < 8; i++) {
      p.circle(-25 + i * 8, -10 + (i % 3) * 10, 3);
    }

    // head
    p.stroke(60);
    p.strokeWeight(3);
    p.fill(170);
    p.rect(35, -22, 48, 42, 8);

    // ears
    p.triangle(42, -22, 52, -42, 60, -22);
    p.triangle(65, -22, 75, -42, 82, -22);

    // face
    p.noStroke();
    p.fill(40);
    p.circle(50, -5, 5);
    p.circle(68, -5, 5);

    p.stroke(40);
    p.strokeWeight(2);
    p.noFill();
    p.arc(59, 6, 16, 10, 0, p.PI);

    // legs
    p.noStroke();
    p.fill(130);
    p.rect(-30, 30, 10, 15);
    p.rect(-5, 30, 10, 15);
    p.rect(20, 30, 10, 15);
    p.rect(45, 30, 10, 15);

    p.pop();
  }

  function formatTime(h, m) {
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }
});
