// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  const CANVAS_SIZE = 800;
  const W = 900;
  const H = 560;


  p.setup = function () {
    p.createCanvas(W, H);
    p.textFont("Georgia, 'Times New Roman', serif");
  };

  p.draw = function () {
    p.background(242, 244, 248);
    const h = p.hour();
    const m = p.minute();
    const s = p.second();

    const cardX = 50;
    const cardY = 55;
    const cardW = 740;
    const cardH = 375;
    const cardRight = cardX + cardW;
    
    p.noStroke();
    p.fill(185, 192, 205);
    p.quad(70, 430, 790, 430, 835, 465, 115, 465);

    p.fill(255);
    p.stroke(35);
    p.strokeWeight(3);
    p.rect(cardX, cardY, cardW, cardH, 18);


  };

  p.windowResized = function () { p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE); };
});
