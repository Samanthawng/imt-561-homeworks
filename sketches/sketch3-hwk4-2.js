registerSketch('sk3', function (p) {
  const W = 720;
  const H = 720;
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
    p.quad(80, 650, 620, 650, 660, 685, 120, 685);

    // square card
    p.fill(255);
    p.stroke(35);
    p.strokeWeight(4);
    p.rect(55, 45, 590, 605, 24);

    // current time
    p.noStroke();
    p.fill(30);
    p.textAlign(p.CENTER);
    p.textStyle(p.BOLD);
    p.textSize(76);
    p.text(formatTime(h, m), 350, 130);

    // live date + weekday
    const today = new Date();

    const liveDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    const liveWeekday = today.toLocaleDateString("en-US", {
      weekday: "long"
    });

    p.textStyle(p.NORMAL);
    p.textSize(24);
    p.fill(55);
    p.text(liveDate, 350, 175);
    p.text(liveWeekday, 350, 210);

    // fish grid: 6 rows x 4 columns
    const cols = 4;
    const startX = 155;
    const startY = 275;
    const spacingX = 95;
    const spacingY = 50;

    // each fish represents one hour
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

    // cat moves every second
    const catX = p.map(s, 0, 59, 540, 160);
    const catY = 595 + p.sin(p.frameCount * 0.15) * 3;

    drawNyanCatFacingLeft(catX, catY, 0.72);
  };

  function drawCuteFish(x, y, alpha) {
    p.push();
    p.translate(x, y);

    p.stroke(25, 55, 95, 255 * alpha);
    p.strokeWeight(3);
    p.fill(75, 135, 220, 255 * alpha);

    // body
    p.ellipse(0, 0, 50, 30);

    // tail
    p.triangle(22, 0, 48, -16, 48, 16);

    // eye
    p.noStroke();
    p.fill(255, 255 * alpha);
    p.circle(-14, -6, 9);
    p.fill(20, 255 * alpha);
    p.circle(-15, -6, 4.5);

    // smile
    p.noFill();
    p.stroke(25, 55, 95, 255 * alpha);
    p.strokeWeight(2);
    p.arc(-10, 5, 14, 9, 0, p.PI);

    // fin
    p.noStroke();
    p.fill(45, 100, 190, 180 * alpha);
    p.ellipse(6, 3, 15, 9);

    p.pop();
  }

  function drawNyanCatFacingLeft(x, y, scaleSize) {
    p.push();
    p.translate(x, y);
    p.scale(scaleSize);

    // rainbow trail
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
      p.rect(45, -30 + i * 9 + wave, 100, 8);
    }

    // body
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

    // head
    p.stroke(60);
    p.strokeWeight(3);
    p.fill(165);
    p.rect(-88, -24, 50, 45, 8);

    // ears
    p.triangle(-82, -24, -72, -48, -62, -24);
    p.triangle(-58, -24, -48, -48, -40, -24);

    // eyes
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
