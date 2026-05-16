registerSketch('sk15', function (p) {
  let hoverItem = null;

  const CANVAS_SIZE = 800;

  const moments = ["Morning", "Afternoon", "Night"];

  const momentLabels = {
    Morning: "Morning (6am–12pm)",
    Afternoon: "Afternoon (12pm–6pm)",
    Night: "Night (6pm–12am)"
  };

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
    Morning: "#D4A82F",
    Afternoon: "#C2553E",
    Night: "#2F5687"
  };

  p.setup = function () {
    p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    p.textFont("Arial");
  };

  p.draw = function () {
    p.background("#F8F6F1");
    hoverItem = null;

    drawHeader();
    drawGroupedBars();
    drawLegend();
    drawTakeaway();
    drawFooter();
    drawTooltip();
  };

  function drawHeader() {
    p.noStroke();
    p.fill("#222");
    p.textAlign(p.CENTER, p.TOP);

    p.textSize(27);
    p.textStyle(p.BOLD);
    p.text("Music Preferences by Listening Moment", p.width / 2, 24);

    p.textSize(12.5);
    p.textStyle(p.NORMAL);
    p.fill("#555");
    p.text(
      "Bars compare the share of users preferring each genre during morning, afternoon, and night listening.",
      p.width / 2,
      64
    );

    p.textSize(11);
    p.fill("#777");
    p.text(
      "Each percentage shows the share within that listening moment.",
      p.width / 2,
      86
    );
  }

  function drawGroupedBars() {
    const chartX = 190;
    const chartY = 165;
    const maxBarW = 505;
    const rowGap = 57;
    const barH = 12.5;
    const barGap = 4.5;
    const maxPercent = 15;

    drawAxis(chartX, chartY, maxBarW, selectedGenres.length, rowGap, maxPercent);
    drawYAxisTitle(chartX, chartY, selectedGenres.length, rowGap);

    for (let i = 0; i < selectedGenres.length; i++) {
      const genre = selectedGenres[i];
      const yBase = chartY + i * rowGap;

      p.noStroke();
      p.fill("#222");
      p.textAlign(p.RIGHT, p.CENTER);
      p.textSize(14.5);
      p.textStyle(p.BOLD);
      p.text(genre, chartX - 16, yBase + 17);

      for (let j = 0; j < moments.length; j++) {
        const moment = moments[j];
        const item = data[genre][moment];
        const barW = p.map(item.percent, 0, maxPercent, 0, maxBarW);
        const y = yBase + j * (barH + barGap);

        p.fill(momentColors[moment]);
        p.noStroke();
        p.rect(chartX, y, barW, barH, 4);

        if (
          p.mouseX >= chartX &&
          p.mouseX <= chartX + barW &&
          p.mouseY >= y &&
          p.mouseY <= y + barH
        ) {
          hoverItem = {
            genre,
            moment,
            percent: item.percent,
            count: item.count
          };

          p.noFill();
          p.stroke("#222");
          p.strokeWeight(1.6);
          p.rect(chartX, y, barW, barH, 4);
        }
      }
    }
  }

  function drawAxis(chartX, chartY, maxBarW, rowCount, rowGap, maxPercent) {
    const tickValues = [0, 3, 6, 9, 12, 15];

    for (let i = 0; i < tickValues.length; i++) {
      const tick = tickValues[i];
      const x = chartX + p.map(tick, 0, maxPercent, 0, maxBarW);

      p.stroke("#D8D0C6");
      p.strokeWeight(1);
      p.line(x, chartY - 18, x, chartY + rowCount * rowGap - 10);

      p.noStroke();
      p.fill("#6E6E6E");
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(9.8);
      p.textStyle(p.BOLD);
      p.text(tick + "%", x, chartY - 30);
    }

    p.noStroke();
    p.fill("#555");
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(11);
    p.textStyle(p.BOLD);
    p.text(
      "Share of users within each listening moment (%)",
      chartX + maxBarW / 2,
      chartY + rowCount * rowGap + 16
    );
  }

  function drawYAxisTitle(chartX, chartY, rowCount, rowGap) {
    p.push();

    p.translate(chartX - 128, chartY + (rowCount * rowGap) / 2 - 8);
    p.rotate(-p.HALF_PI);

    p.noStroke();
    p.fill("#555");
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(11);
    p.textStyle(p.BOLD);
    p.text("Preferred music genre", 0, 0);

    p.pop();
  }

  function drawLegend() {
    const y = 642;

    const contentBoxW = 575;
    const contentBoxX = (p.width - contentBoxW) / 2;

    const positions = [
      contentBoxX,
      contentBoxX + 215,
      contentBoxX + 430
    ];

    p.noStroke();
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(11.5);
    p.textStyle(p.NORMAL);

    for (let i = 0; i < moments.length; i++) {
      const moment = moments[i];
      const x = positions[i];

      p.fill(momentColors[moment]);
      p.rect(x, y, 17, 12, 3);

      p.fill("#333");
      p.text(momentLabels[moment], x + 23, y + 6);
    }
  }

  function drawTakeaway() {
    p.fill("#FFF4CF");
    p.stroke("#E3C15B");
    p.strokeWeight(2);

    const boxW = 575;
    const boxH = 66;
    const boxX = (p.width - boxW) / 2;
    const boxY = 685;

    p.rect(boxX, boxY, boxW, boxH, 15);

    p.noStroke();
    p.fill("#222");
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(15.5);
    p.textStyle(p.BOLD);
    p.text("Takeaway:", boxX + 22, boxY + 19);

    p.textStyle(p.NORMAL);
    p.textSize(12.8);
    p.fill("#333");
    p.text(
      "Different genres peak at different listening moments,\nshowing that user preferences vary across the day.",
      boxX + 135,
      boxY + 17,
      400,
      38
    );
  }

  function drawFooter() {
    p.noStroke();
    p.fill("#777");
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(9.5);
    p.textStyle(p.NORMAL);
    p.text(
      "Data filtered to valid records with listening moment and preferred genre. Hover over a bar to see exact values.",
      p.width / 2,
      775
    );
  }

  function drawTooltip() {
    if (!hoverItem) return;

    const tooltipW = 218;
    const tooltipH = 78;

    let x = p.mouseX + 12;
    let y = p.mouseY - 18;

    if (x + tooltipW > p.width) {
      x = p.mouseX - tooltipW - 12;
    }

    if (y + tooltipH > p.height) {
      y = p.height - tooltipH - 10;
    }

    p.fill(255);
    p.stroke("#333");
    p.strokeWeight(1);
    p.rect(x, y, tooltipW, tooltipH, 10);

    p.noStroke();
    p.fill("#222");
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(12.5);
    p.textStyle(p.BOLD);
    p.text(hoverItem.moment + " · " + hoverItem.genre, x + 12, y + 12);

    p.textStyle(p.NORMAL);
    p.textSize(11.5);
    p.fill("#444");
    p.text("Share: " + hoverItem.percent.toFixed(2) + "%", x + 12, y + 36);
    p.text("Count: " + hoverItem.count + " users", x + 12, y + 54);
  }
});