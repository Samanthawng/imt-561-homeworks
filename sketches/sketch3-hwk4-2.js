registerSketch('sk3', function (p) {
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
    p.textAlign(p.CENTER);
    p.textStyle(p.BOLD);
    p.textSize(82);
    p.text(formatTime(h, m), 675, 150);

    // date + weekday
    p.textStyle(p.NORMAL);
    p.textSize(26);
    p.fill(55);
    p.text("May 4, 2026", 675, 205);
    p.text("Monday", 675, 245);

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
        drawCuteFish(x, y, 1);
      } else {
        drawCuteFish(x, y, 0.08);
      }
    }

    // cat moves from right to left within the hour
    const catX = p.map(m + s / 60, 0, 60, 570, 120);
    const catY = 440;

    drawNyanCatFacingLeft(catX, catY, 0.85);
  };

  function drawCuteFish(x, y, alpha) {
    p.push();
    p.translate(x, y);

    p.stroke(25, 55, 95, 255 * alpha);
    p.strokeWeight(3);
    p.fill(75, 135, 220, 255 * alpha);

    // round body
    p.ellipse(0, 0, 56, 34);

    // cute tail
    p.triangle(25, 0, 52, -18, 52, 18);

    // eye
    p.noStroke();
    p.fill(255, 255 * alpha);
    p.circle(-16, -7, 10);
    p.fill(20, 255 * alpha);
    p.circle(-17, -7, 5);

    // smile
    p.noFill();
    p.stroke(25, 55, 95, 255 * alpha);
    p.strokeWeight(2);
    p.arc(-12, 5, 16, 10, 0, p.PI);

    // small fin
    p.noStroke();
    p.fill(45, 100, 190, 180 * alpha);
    p.ellipse(7, 3, 18, 10);

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

    // cat eyes
    p.noStroke();
    p.fill(255);
    p.ellipse(-74, -8, 11, 8);
    p.ellipse(-55, -8, 11, 8);

    p.fill(35);
    p.ellipse(-74, -8, 5, 7);
    p.ellipse(-55, -8, 5, 7);

    // nose
    p.fill(80);
    p.triangle(-66, 1, -62, 1, -64, 5);

    // mouth
    p.noFill();
    p.stroke(35);
    p.strokeWeight(2);
    p.arc(-68, 7, 10, 8, 0, p.PI);
    p.arc(-60, 7, 10, 8, 0, p.PI);

    // whiskers
    p.line(-82, 2, -96, -2);
    p.line(-82, 7, -96, 7);
    p.line(-46, 2, -32, -2);
    p.line(-46, 7, -32, 7);

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
