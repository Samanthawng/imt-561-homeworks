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

    // 3D shadow
    p.noStroke();
    p.fill(185, 192, 205);
    p.quad(65, 485, 820, 485, 855, 520, 100, 520);

    // card
    p.fill(255);
    p.stroke(35);
    p.strokeWeight(4);
    p.rect(40, 40, 790, 445, 22);

    // large current timer
    p.noStroke();
    p.fill(30);
    p.textAlign(p.RIGHT);
    p.textStyle(p.BOLD);
    p.textSize(64);
    p.text(formatTime(h, m), 790, 115);

    // date
    p.textStyle(p.NORMAL);
    p.textSize(24);
    p.fill(55);
    p.text("May 4, 2026", 790, 155);
    p.text("Monday", 790, 188);

    // fish grid: 6 rows x 4 columns
    const cols = 4;
    const rows = 6;
    const startX = 110;
    const startY = 115;
    const spacingX = 105;
    const spacingY = 52;

    // each fish = one hour
    const eatenFish = h;
    const remainingFish = totalFish - eatenFish;

    for (let i = 0; i < totalFish; i++) {
      const col = i % cols;
      const row = p.floor(i / cols);
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;

      if (i < remainingFish) {
        drawRealFish(x, y, 1);
      } else {
        drawRealFish(x, y, 0.08);
      }
    }

    // cat moves from right to left within the hour
    const catX = p.map(m + s / 60, 0, 60, 570, 120);
    const catY = 440;

    drawNyanCatFacingLeft(catX, catY, 0.85);
  };

  function drawRealFish(x, y, alpha) {
    p.push();
    p.translate(x, y);

    p.stroke(18, 45, 80, 255 * alpha);
    p.strokeWeight(3);
    p.fill(55, 125, 210, 255 * alpha);

    // body
    p.ellipse(0, 0, 62, 34);

    // tail
    p.fill(45, 105, 190, 255 * alpha);
    p.triangle(30, 0, 62, -24, 62, 24);

    // top fin
    p.fill(40, 95, 175, 220 * alpha);
    p.triangle(-5, -15, 8, -30, 20, -12);

    // belly fin
    p.triangle(-2, 14, 12, 28, 22, 12);

    // inner scale/fin
    p.fill(35, 85, 165, 170 * alpha);
    p.triangle(-5, 0, 20, -14, 20, 14);

    // eye
    p.fill(10, 255 * alpha);
    p.noStroke();
    p.circle(-22, -8, 7);

    // small highlight
    p.fill(255, 255, 255, 80 * alpha);
    p.ellipse(-8, -8, 25, 8);

    p.pop();
  }

  function drawNyanCatFacingLeft(x, y, scaleSize) {
    p.push();
    p.translate(x, y);
    p.scale(scaleSize);

    // rainbow trail to the right, because cat moves left
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
      p.rect(45, -30 + i * 9 + wave, 110, 8);
    }

    // pop-tart body
    p.stroke(60);
    p.strokeWeight(3);
    p.fill(245, 170, 220);
    p.rect(-45, -30, 90, 60, 8);

    p.noStroke();
    p.fill(255, 205, 235);
    p.rect(-35, -20, 70, 40, 6);

    // sprinkles
    p.fill(255);
    for (let i = 0; i < 9; i++) {
      p.circle(-25 + i * 7, -10 + (i % 3) * 10, 3);
    }

    // head on LEFT side
    p.stroke(60);
    p.strokeWeight(3);
    p.fill(165);
    p.rect(-88, -24, 50, 45, 8);

    // ears
    p.triangle(-82, -24, -72, -48, -62, -24);
    p.triangle(-58, -24, -48, -48, -40, -24);

    // face
    p.noStroke();
    p.fill(35);
    p.circle(-74, -7, 5);
    p.circle(-55, -7, 5);

    p.stroke(35);
    p.strokeWeight(2);
    p.noFill();
    p.arc(-64, 6, 18, 10, 0, p.PI);

    // legs
    p.noStroke();
    p.fill(130);
    p.rect(-35, 30, 10, 16);
    p.rect(-10, 30, 10, 16);
    p.rect(15, 30, 10, 16);
    p.rect(38, 30, 10, 16);

    p.pop();
  }

  function formatTime(h, m) {
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
  }
});
