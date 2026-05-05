function drawNyanCat(x, y, s) {
  p.push();
  p.translate(x, y);
  p.scale(s);

  // body (pop tart)
  p.stroke(80);
  p.strokeWeight(3);
  p.fill(245, 170, 220);
  p.rect(-40, -25, 80, 50, 6);

  // sprinkles
  p.strokeWeight(2);
  p.stroke(255);
  for (let i = 0; i < 10; i++) {
    p.line(
      p.random(-35, 35),
      p.random(-20, 20),
      p.random(-35, 35),
      p.random(-20, 20)
    );
  }

  // head
  p.noStroke();
  p.fill(180);
  p.rect(-70, -20, 45, 40, 6);

  // ears
  p.triangle(-70, -20, -60, -40, -50, -20);
  p.triangle(-25, -20, -15, -40, -5, -20);

  // eyes
  p.fill(50);
  p.rect(-60, -5, 6, 6);
  p.rect(-40, -5, 6, 6);

  // mouth
  p.stroke(50);
  p.strokeWeight(2);
  p.noFill();
  p.arc(-50, 5, 10, 8, 0, p.PI);

  // legs
  p.noStroke();
  p.fill(150);
  p.rect(-60, 18, 8, 10);
  p.rect(-40, 18, 8, 10);
  p.rect(10, 18, 8, 10);
  p.rect(30, 18, 8, 10);

  // rainbow trail (seconds animation)
  let t = p.frameCount * 0.2;

  const colors = [
    [255, 0, 0],
    [255, 165, 0],
    [255, 255, 0],
    [0, 200, 0],
    [0, 100, 255],
    [150, 0, 255]
  ];

  for (let i = 0; i < colors.length; i++) {
    p.fill(...colors[i]);
    p.noStroke();

    let wave = p.sin(t + i) * 4;

    p.rect(
      -140,
      -18 + i * 6 + wave,
      80,
      5
    );
  }

  p.pop();
}
