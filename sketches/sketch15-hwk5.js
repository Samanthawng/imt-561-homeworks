// Instance-mode sketch for tab 15
registerSketch('sk15', function (p) {
  const CANVAS_SIZE = 800;

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    p.textFont("Arial");
  };

  p.draw = function () {
    p.background("#FAF8F4");

    drawHeader();
    drawSectionLabel();
    drawTakeaway();

    // Frame from professor template
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    p.rect(0, 0, p.width - 1, p.height - 1);
  };

  function drawHeader() {
    p.noStroke();
    p.fill("#222");
    p.textAlign(p.CENTER, p.TOP);

    p.textSize(33);
    p.textStyle(p.BOLD);
    p.text("Music Taste Changes with the Moment", p.width / 2, 38);

    p.textSize(14);
    p.textStyle(p.NORMAL);
    p.fill("#555");
    p.text(
      "Selected genres show different listening patterns across morning, afternoon, and night.",
      p.width / 2,
      86
    );

    p.textSize(12);
    p.fill("#777");
    p.text(
      "Percentages show each genre's share within that listening moment.",
      p.width / 2,
      110
    );
  }

  function drawSectionLabel() {
    p.noStroke();
    p.fill("#E8F0E3");
    p.rect(250, 138, 300, 36, 12);

    p.fill("#2F4F3A");
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(17);
    p.textStyle(p.BOLD);
    p.text("WHEN YOU LISTEN", p.width / 2, 156);
  }

  function drawTakeaway() {
    p.fill("#FFF4CF");
    p.stroke("#E9C46A");
    p.strokeWeight(2);
    p.rect(70, 680, 660, 70, 14);

    p.noStroke();
    p.fill("#222");
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(17);
    p.textStyle(p.BOLD);
    p.text("Takeaway:", 105, 716);

    p.textStyle(p.NORMAL);
    p.textSize(14);
    p.fill("#333");
    p.text(
      "Genre shares vary across listening moments,\nbut the peak moment is not the same for every genre.",
      215,
      716
    );

    p.textSize(10);
    p.fill("#777");
    p.textAlign(p.CENTER, p.CENTER);
    p.text(
      "Data: Global Music Streaming Listener Preferences Dataset",
      p.width / 2,
      775
    );
  }

  p.windowResized = function () {
    p.resizeCanvas(CANVAS_SIZE, CANVAS_SIZE);
  };
});

