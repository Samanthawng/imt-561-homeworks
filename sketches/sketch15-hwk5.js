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


registerSketch('sk15', function (p) {
  const CANVAS_SIZE = 800;

  const moments = ["Morning", "Afternoon", "Night"];

  const selectedGenres = [
    "Pop",
    "Hip-Hop",
    "Rock",
    "EDM",
    "Jazz",
    "Country",
    "Reggae"
  ];

  const data = {
    Pop: {
      Morning: { percent: 8.82, count: 143 },
      Afternoon: { percent: 9.42, count: 154 },
      Night: { percent: 9.68, count: 169 }
    },
    "Hip-Hop": {
      Morning: { percent: 9.56, count: 155 },
      Afternoon: { percent: 10.47, count: 171 },
      Night: { percent: 9.11, count: 159 }
    },
    Rock: {
      Morning: { percent: 11.04, count: 179 },
      Afternoon: { percent: 9.73, count: 159 },
      Night: { percent: 10.20, count: 178 }
    },
    EDM: {
      Morning: { percent: 11.29, count: 183 },
      Afternoon: { percent: 9.67, count: 158 },
      Night: { percent: 10.72, count: 187 }
    },
    Jazz: {
      Morning: { percent: 10.67, count: 173 },
      Afternoon: { percent: 11.69, count: 191 },
      Night: { percent: 9.63, count: 168 }
    },
    Country: {
      Morning: { percent: 8.95, count: 145 },
      Afternoon: { percent: 11.20, count: 183 },
      Night: { percent: 8.94, count: 156 }
    },
    Reggae: {
      Morning: { percent: 10.30, count: 167 },
      Afternoon: { percent: 9.79, count: 160 },
      Night: { percent: 11.75, count: 205 }
    }
  };

  const momentColors = {
    Morning: "#D9A404",
    Afternoon: "#C44536",
    Night: "#1F4E79"
  };

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    p.textFont("Arial");
  };

  p.draw = function () {
    p.background("#FAF8F4");

    drawHeader();
    drawSectionLabel();
    drawGroupedBars();
    drawAnnotations();
    drawLegend();
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

  function drawGroupedBars() {
    const chartX = 190;
    const chartY = 215;
    const maxBarW = 375;
    const rowGap = 60;
    const barH = 12;
    const barGap = 5;
    const maxPercent = 12.5;

    drawAxis(chartX, chartY, maxBarW, selectedGenres.length, rowGap, maxPercent);

    for (let i = 0; i < selectedGenres.length; i++) {
      const genre = selectedGenres[i];
      const yBase = chartY + i * rowGap;

      p.noStroke();
      p.fill("#222");
      p.textAlign(p.RIGHT, p.CENTER);
      p.textSize(14);
      p.textStyle(p.BOLD);
      p.text(genre, chartX - 18, yBase + 17);

      for (let j = 0; j < moments.length; j++) {
        const moment = moments[j];
        const item = data[genre][moment];
        const barW = p.map(item.percent, 0, maxPercent, 0, maxBarW);
        const y = yBase + j * (barH + barGap);

        p.fill(momentColors[moment]);
        p.noStroke();
        p.rect(chartX, y, barW, barH, 3);
      }
    }
  }

  function drawAxis(chartX, chartY, maxBarW, rowCount, rowGap, maxPercent) {
    p.stroke("#D8CEC3");
    p.strokeWeight(1);

    for (let tick = 0; tick <= 12; tick += 3) {
      const x = chartX + p.map(tick, 0, maxPercent, 0, maxBarW);
      p.line(x, chartY - 20, x, chartY + rowCount * rowGap - 15);

      p.noStroke();
      p.fill("#777");
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(11);
      p.text(tick + "%", x, chartY - 32);

      p.stroke("#D8CEC3");
    }

    p.noStroke();
    p.fill("#555");
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(12);
    p.text(
      "Share within listening moment",
      chartX + maxBarW / 2,
      chartY + rowCount * rowGap + 4
    );
  }
    function drawAnnotations() {
    const chartX = 190;
    const chartY = 215;
    const maxBarW = 375;
    const rowGap = 60;
    const barH = 12;
    const barGap = 5;
    const maxPercent = 12.5;

    drawCallout(
      chartX + p.map(data.Rock.Morning.percent, 0, maxPercent, 0, maxBarW) + 12,
      chartY + 2 * rowGap + 4,
      620,
      chartY + 2 * rowGap - 8,
      "Rock is slightly\nhigher in the morning.",
      momentColors.Morning
    );

    drawCallout(
      chartX + p.map(data.Jazz.Afternoon.percent, 0, maxPercent, 0, maxBarW) + 12,
      chartY + 4 * rowGap + (barH + barGap) + 6,
      620,
      chartY + 4 * rowGap + 14,
      "Jazz and Country\nrise in the afternoon.",
      momentColors.Afternoon
    );

    drawCallout(
      chartX + p.map(data.Reggae.Night.percent, 0, maxPercent, 0, maxBarW) + 12,
      chartY + 6 * rowGap + 2 * (barH + barGap) + 6,
      620,
      chartY + 6 * rowGap + 16,
      "Reggae peaks\nat night.",
      momentColors.Night
    );
  }

  function drawCallout(startX, startY, boxX, boxY, label, color) {
    p.stroke(color);
    p.strokeWeight(1.5);
    p.line(startX, startY, boxX - 10, boxY + 24);

    p.fill("#FAF8F4");
    p.stroke(color);
    p.strokeWeight(1.5);
    p.rect(boxX, boxY, 130, 50, 10);

    p.noStroke();
    p.fill(color);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(11);
    p.textStyle(p.BOLD);
    p.text(label, boxX + 65, boxY + 25);
  }
  
  function drawLegend() {
    const x0 = 220;
    const y = 645;

    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(13);
    p.textStyle(p.NORMAL);

    let x = x0;

    for (const moment of moments) {
      p.fill(momentColors[moment]);
      p.noStroke();
      p.rect(x, y, 18, 12, 3);

      p.fill("#333");
      p.text(moment, x + 25, y + 6);

      x += 125;
    }
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

