"use strict";

let prizeDoor = null;
let playerChoice = null;
let revealedDoor = null;

let stayWins = 0;
let switchWins = 0;
let totalRuns = 0;

const messages = {
  intro:
    "Try the game yourself and play along. First, pick a door. Then decide whether to stay or switch.",

  selected: "You have selected a door. Monty will now reveal a goat door.",

  switchPrompt: "Do you want to stay or switch? Click a button accordingly.",

  revealing: "Okay, you have choosen ...",

  win: "🎉 You won the car! 🎉",

  lose: "🐐 Oh no, you got a goat! 🐐",

  pickedDoor: "You picked Door {door}.",
};

function updateMessage(key, vars = {}) {
  const message = document.getElementById("game-message");

  let text = messages[key];

  Object.keys(vars).forEach((k) => {
    text = text.replace(`{${k}}`, vars[k]);
  });

  message.textContent = text;

  message.classList.add("highlight");

  setTimeout(() => {
    message.classList.remove("highlight");
  }, 1000);
}

function startGame() {
  prizeDoor = Math.floor(Math.random() * 3);
  playerChoice = null;
  revealedDoor = null;

  document.querySelectorAll(".door").forEach((d) => {
    d.classList.remove("open", "selected", "switch-choice", "reveal-highlight");
    d.textContent =
      d.id === "door0" ? "Door 1" : d.id === "door1" ? "Door 2" : "Door 3";
  });
  updateMessage("intro");
}

function pickDoor(i) {
  if (playerChoice !== null) return;

  playerChoice = i;

  // highlight selected door
  document.getElementById("door" + i).classList.add("selected");

  // host reveals a goat door that is not chosen or prize
  let options = [0, 1, 2].filter((d) => d !== i && d !== prizeDoor);
  revealedDoor = options[Math.floor(Math.random() * options.length)];

  const message = document.getElementById("game-message");

  // first message
  updateMessage("selected");

  // reveal after delay
  setTimeout(() => {
    const revealed = document.getElementById("door" + revealedDoor);

    revealed.classList.add("open");
    revealed.textContent = "🐐";

    revealed.classList.add("reveal-highlight");

    // fade back automatically
    setTimeout(() => {
      revealed.classList.remove("reveal-highlight");
    }, 1000);

    // second message
    setTimeout(() => {
      updateMessage("switchPrompt");
    }, 1000);
  }, 3000);
}

function resolveGame(stay) {
  if (playerChoice === null) return;

  let finalChoice = playerChoice;

  const message = document.getElementById("game-message");

  // handle switching
  if (!stay) {
    finalChoice = [0, 1, 2].find(
      (d) => d !== playerChoice && d !== revealedDoor,
    );

    // remove old highlight + add switch highlight
    document.getElementById("door" + playerChoice).classList.remove("selected");

    document
      .getElementById("door" + finalChoice)
      .classList.add("switch-choice");
  }

  // small pause before revealing final door
  updateMessage("revealing");

  setTimeout(() => {
    const finalDoorEl = document.getElementById("door" + finalChoice);

    finalDoorEl.classList.add("open", "reveal-highlight");

    setTimeout(() => {
      finalDoorEl.classList.remove("reveal-highlight");
    }, 1000);

    const win = finalChoice === prizeDoor;

    if (win) {
      finalDoorEl.textContent = "🚗";
      updateMessage("win");

      // 🚗 CAR SHOWER
      for (let i = 0; i < 20; i++) {
        setTimeout(() => spawnEffect("🚗", "win"), i * 60);
      }
    } else {
      finalDoorEl.textContent = "🐐";
      updateMessage("lose");

      // 🐐 GOAT RAIN
      for (let i = 0; i < 20; i++) {
        setTimeout(() => spawnEffect("🐐", "lose"), i * 60);
      }
    }

    if (stay) {
      stayWins += win ? 1 : 0;
    } else {
      switchWins += win ? 1 : 0;
    }

    totalRuns++;
    updatePlot();

    // reset after delay so user can see result
    setTimeout(() => {
      startGame();
    }, 2000);
  }, 2000);
}

// attach click handlers
document.getElementById("door0").onclick = () => pickDoor(0);
document.getElementById("door1").onclick = () => pickDoor(1);
document.getElementById("door2").onclick = () => pickDoor(2);

// initialize
startGame();
// updatePlot();

function spawnEffect(symbol, type) {
  const el = document.createElement("div");
  el.className = "effect-icon";
  el.textContent = symbol;

  const x = Math.random() * window.innerWidth;
  el.style.left = x + "px";

  const duration = 3000 + Math.random() * 3000;

  const layer = document.getElementById("effect-layer");
  layer.appendChild(el);

  if (type === "win") {
    // car rises bottom → top
    el.style.top = "auto";
    el.style.bottom = "-40px";

    el.animate(
      [
        { transform: "translateY(0)", opacity: 1 },
        { transform: "translateY(-120vh)", opacity: 0 },
      ],
      { duration, easing: "linear" },
    );
  } else {
    // goat falls top → bottom
    el.style.top = "-40px";
    el.style.bottom = "auto";

    el.animate(
      [
        { transform: "translateY(0)", opacity: 1 },
        { transform: "translateY(120vh)", opacity: 0 },
      ],
      { duration, easing: "linear" },
    );
  }

  setTimeout(() => el.remove(), duration);
}

function runSingleSimulation() {
  const prize = Math.floor(Math.random() * 3);
  const pick = Math.floor(Math.random() * 3);

  // Monty reveals a goat that is not picked or prize
  const revealOptions = [0, 1, 2].filter((d) => d !== pick && d !== prize);

  const reveal =
    revealOptions[Math.floor(Math.random() * revealOptions.length)];

  const switchChoice = [0, 1, 2].find((d) => d !== pick && d !== reveal);

  const stayWin = pick === prize;
  const switchWin = switchChoice === prize;

  return { stayWin, switchWin };
}

function runSimulation(n) {
  const styles = getComputedStyle(document.documentElement);
  const titleFontSize = parseFloat(styles.getPropertyValue("--fs-p").trim());

  // console.log("h6 raw:", styles.getPropertyValue("--fs-h6"));

  const stayColor = styles.getPropertyValue("--color-1").trim();
  const switchColor = styles.getPropertyValue("--color-4").trim();
  const bgColor = styles.getPropertyValue("--color-3").trim();
  let stayWinsLocal = 0;
  let switchWinsLocal = 0;

  let stayHistory = [];
  let switchHistory = [];

  // const maxX = n;

  // const magnitude = Math.pow(10, Math.floor(Math.log10(maxX)));
  // const dtick = magnitude / 10;

  // function getNiceTick(max) {
  //   const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
  //   const normalized = max / magnitude;

  //   if (normalized < 2) return magnitude / 5;
  //   if (normalized < 5) return magnitude / 2;
  //   return magnitude;
  // }

  // const dtick = getNiceTick(n);

  // console.log(dtick);

  for (let i = 1; i <= n; i++) {
    const result = runSingleSimulation();

    if (result.stayWin) stayWinsLocal++;
    if (result.switchWin) switchWinsLocal++;

    stayHistory.push(stayWinsLocal / i);
    switchHistory.push(switchWinsLocal / i);
  }

  const horizontalLines = [0.33, 0.67];

  const shapes = horizontalLines.map((y) => ({
    type: "line",
    xref: "paper",
    x0: 0,
    x1: 1,
    yref: "y",
    y0: y,
    y1: y,
    line: {
      // color: "#999",
      width: 1,
      dash: "dash",
    },
  }));

  const graphDiv = "plot";

  const data = [
    {
      x: Array.from({ length: n }, (_, i) => i + 1),
      y: stayHistory,
      type: "scatter",
      mode: "lines",
      name: "Stay",
      line: { color: stayColor },
    },
    {
      x: Array.from({ length: n }, (_, i) => i + 1),
      y: switchHistory,
      type: "scatter",
      mode: "lines",
      name: "Switch",
      line: { color: switchColor },
    },
  ];

  const layout = {
    title: {
      text: `Monty Hall Simulation (${n.toLocaleString()} rounds)`,
      font: { size: titleFontSize },
    },
    margin: { t: 30 },
    shapes,
    xaxis: {
      // color: "#ffffff",
      // dtick: 10,
      gridcolor: switchColor,
      // linecolor: "#888",
      // linewidth: 2,
      // range: [0, 100],
      showline: true,
      // tickfont: {
      // color: "#ffffff",
      // size: 12,
      // },
      tickformat: ",d",
      title: { text: "Rounds" },
      // zeroline: false,
    },
    yaxis: {
      // color: "#ffffff",
      dtick: 0.1,
      gridcolor: switchColor,
      // linecolor: "#888",
      // linewidth: 2,
      range: [0, 1],
      showline: true,
      // tickfont: {
      // color: "#ffffff",
      // size: 12,
      // },
      tickformat: ".0%",
      title: { text: "Win Rate" },
      // zeroline: false,
    },
    plot_bgcolor: bgColor,
    paper_bgcolor: bgColor,
    legend: {
      x: 0.95,
      y: 0.05,
      xanchor: "right",
      yanchor: "bottom",
      bgcolor: switchColor,
      // bordercolor: "#555",
      // borderwidth: 1,
    },
  };

  const config = {
    responsive: true,
    displaylogo: false,
  };

  Plotly.newPlot(graphDiv, data, layout, config);
}
