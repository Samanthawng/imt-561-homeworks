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

    // right-side timer block
    p.noStroke();
    p.fill(30);
    p.textAlign(p.CENTER);
    p.textStyle(p.BOLD);
    p.textSize(72);
    p.text(formatTime(h, m), 690, 150);

    p.textStyle(p.NORMAL);
    p.textSize(28);
    p.fill(55);
    p.text("May 4, 2026", 690, 205);
    p.text("Monday", 690, 245);

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

    p.stroke(20, 45, 80, 255 * alpha);
    p.strokeWeight(3);
    p.fill(70, 135, 220, 255 * alpha);

    // cute round body
    p.ellipse(0, 0, 54, 34);

    // small tail
    p.triangle(25, 0, 48, -18, 48, 18);

    // eye
    p.noStroke();
    p.fill(20, 255 * alpha);
    p.circle(-16, -7, 6);

    // highlight
    p.fill(255, 255, 255, 90 * alpha);
    p.circle(-3, -8, 10);

    // smile
    p.noFill();
    p.stroke(20, 45, 80, 180 * alpha);
    p.strokeWeight(2);
    p.arc(-12, 4, 14, 8, 0, p.PI);

    p.pop();
  }

  function drawNyanCatFacingLeft(x, y, scaleSize) {
    p.push();
    p.translate(x, y);
    p.scale(scaleSize);

    // rainbow trail to the right
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

    // round cat head
    p.stroke(60);
    p.strokeWeight(3);
    p.fill(165);
    p.circle(-62, -10, 58);

    // ears
    p.triangle(-82, -30, -72, -58, -60, -30);
    p.triangle(-58, -30, -45, -58, -38, -30);

    // eyes
    p.noStroke();
    p.fill(35);
    p.circle(-72, -12, 5);
    p.circle(-53, -12, 5);

    // blush
    p.fill(255, 120, 145);
    p.circle(-80, 2, 10);
    p.circle(-45, 2, 10);

    // smile
    p.noFill();
    p.stroke(35);
    p.strokeWeight(2);
    p.arc(-62, 2, 20, 12, 0, p.PI);

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
