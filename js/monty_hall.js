"use strict";

const DOORS = [0, 1, 2];

const TIMING = {
  revealDelay: 3000,
  highlightDuration: 1000,
  resultDelay: 2000,
  effectInterval: 60,
};

const PHASES = {
  PICKING: "picking",
  REVEALING: "revealing",
  DECISION: "decision",
  FINISHED: "finished",
};

const state = {
  prizeDoor: null,
  playerChoice: null,
  revealedDoor: null,

  stayWins: 0,
  switchWins: 0,
  totalRuns: 0,

  phase: PHASES.PICKING,
};

const messageEl = document.getElementById("game-message");
const effectLayer = document.getElementById("effect-layer");
const doorEls = [...document.querySelectorAll(".door")];

function t(key) {
  return window.currentLangData[key] || key;
}

function randomDoor() {
  return Math.floor(Math.random() * DOORS.length);
}

function getRevealDoor(playerChoice, prizeDoor) {
  const options = DOORS.filter((d) => d !== playerChoice && d !== prizeDoor);

  return options[Math.floor(Math.random() * options.length)];
}

function getSwitchDoor(playerChoice, revealedDoor) {
  return DOORS.find((d) => d !== playerChoice && d !== revealedDoor);
}

function flashHighlight(el) {
  el.classList.add("highlight");

  setTimeout(() => {
    el.classList.remove("highlight");
  }, TIMING.highlightDuration);
}

function updateMessage(key, vars = {}) {
  let text = t(key);

  for (const [k, v] of Object.entries(vars)) {
    text = text.replace(`{${k}}`, v);
  }

  messageEl.textContent = text;

  flashHighlight(messageEl);
}

function spawnEffects(symbol, type, count = 20) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => spawnEffect(symbol, type), i * TIMING.effectInterval);
  }
}

function startGame() {
  state.prizeDoor = randomDoor();
  state.playerChoice = null;
  state.revealedDoor = null;
  state.phase = PHASES.PICKING;

  doorEls.forEach((door, index) => {
    door.classList.remove(
      "open",
      "selected",
      "switch-choice",
      "reveal-highlight",
    );

    door.textContent = `Door ${index + 1}`;
  });

  updateMessage("statistics_monty_hall_message_intro");
}

function pickDoor(index) {
  if (state.phase !== PHASES.PICKING) return;

  state.playerChoice = index;
  state.phase = PHASES.REVEALING;

  doorEls[index].classList.add("selected");

  state.revealedDoor = getRevealDoor(state.playerChoice, state.prizeDoor);

  updateMessage("statistics_monty_hall_message_selected", {
    door: index + 1,
  });

  setTimeout(() => {
    const revealedDoorEl = doorEls[state.revealedDoor];

    revealedDoorEl.classList.add("open", "reveal-highlight");

    revealedDoorEl.textContent = "🐐";

    setTimeout(() => {
      revealedDoorEl.classList.remove("reveal-highlight");
    }, TIMING.highlightDuration);

    setTimeout(() => {
      state.phase = PHASES.DECISION;
      updateMessage("statistics_monty_hall_message_switch");
    }, TIMING.highlightDuration);
  }, TIMING.revealDelay);
}

function resolveGame(stay) {
  if (state.phase !== PHASES.DECISION) return;

  state.phase = PHASES.FINISHED;

  let finalChoice = state.playerChoice;

  if (!stay) {
    finalChoice = getSwitchDoor(state.playerChoice, state.revealedDoor);

    doorEls[state.playerChoice].classList.remove("selected");

    doorEls[finalChoice].classList.add("switch-choice");
  }

  updateMessage("statistics_monty_hall_message_revealing", {
    door: finalChoice + 1,
  });

  setTimeout(() => {
    const finalDoorEl = doorEls[finalChoice];

    finalDoorEl.classList.add("open", "reveal-highlight");

    setTimeout(() => {
      finalDoorEl.classList.remove("reveal-highlight");
    }, TIMING.highlightDuration);

    const win = finalChoice === state.prizeDoor;

    if (win) {
      finalDoorEl.textContent = "🚗";
      updateMessage("statistics_monty_hall_message_win");

      spawnEffects("🚗", "win");
    } else {
      finalDoorEl.textContent = "🐐";
      updateMessage("statistics_monty_hall_message_loss");

      spawnEffects("🐐", "lose");
    }

    if (win) {
      stay ? state.stayWins++ : state.switchWins++;
    }

    state.totalRuns++;

    if (typeof updatePlot === "function") {
      updatePlot();
    }

    setTimeout(() => {
      startGame();
    }, TIMING.resultDelay);
  }, TIMING.resultDelay);
}

function spawnEffect(symbol, type) {
  const el = document.createElement("div");

  el.className = "effect-icon";
  el.textContent = symbol;

  el.style.left = `${Math.random() * window.innerWidth}px`;

  const duration = 3000 + Math.random() * 3000;

  effectLayer.appendChild(el);

  if (type === "win") {
    el.style.bottom = "-40px";
    el.style.top = "auto";

    el.animate(
      [
        {
          transform: "translateY(0)",
          opacity: 1,
        },
        {
          transform: "translateY(-120vh)",
          opacity: 0,
        },
      ],
      {
        duration,
        easing: "linear",
      },
    );
  } else {
    el.style.top = "-40px";
    el.style.bottom = "auto";

    el.animate(
      [
        {
          transform: "translateY(0)",
          opacity: 1,
        },
        {
          transform: "translateY(120vh)",
          opacity: 0,
        },
      ],
      {
        duration,
        easing: "linear",
      },
    );
  }

  setTimeout(() => {
    el.remove();
  }, duration);
}

function runSingleSimulation() {
  const prize = randomDoor();
  const pick = randomDoor();

  const reveal = getRevealDoor(pick, prize);

  const switchChoice = getSwitchDoor(pick, reveal);

  return {
    stayWin: pick === prize,
    switchWin: switchChoice === prize,
  };
}

function runSimulation(n) {
  const styles = getComputedStyle(document.documentElement);
  const fsP = parseFloat(styles.getPropertyValue("--fs-p"));
  const colorBg = styles.getPropertyValue("--color-plot-bg").trim();
  const colorOther = styles.getPropertyValue("--color-plot-other").trim();
  const colorStay = styles.getPropertyValue("--color-plot-2").trim();
  const colorSwitch = styles.getPropertyValue("--color-plot-1").trim();

  let stayWinsLocal = 0;
  let switchWinsLocal = 0;

  const x = [];
  const stayHistory = [];
  const switchHistory = [];

  // Keep graph responsive for large n
  const step = Math.max(1, Math.floor(n / 5000));

  for (let i = 1; i <= n; i++) {
    const result = runSingleSimulation();

    if (result.stayWin) stayWinsLocal++;
    if (result.switchWin) switchWinsLocal++;

    if (i % step === 0 || i === n) {
      x.push(i);

      stayHistory.push(stayWinsLocal / i);

      switchHistory.push(switchWinsLocal / i);
    }
  }

  const shapes = [0.33, 0.67].map((y) => ({
    type: "line",
    xref: "paper",
    x0: 0,
    x1: 1,
    yref: "y",
    y0: y,
    y1: y,
    layer: "below",
    line: {
      color: colorSwitch,
      dash: "dash",
      width: 2,
    },
  }));

  Plotly.newPlot(
    "plot",
    [
      {
        x,
        y: switchHistory,
        type: "scatter",
        mode: "lines",
        name: "Switch",
        line: {
          color: colorSwitch,
        },
      },
      {
        x,
        y: stayHistory,
        type: "scatter",
        mode: "lines",
        name: "Stay",
        line: {
          color: colorStay,
        },
      },
    ],
    {
      title: {
        text: `Monty Hall Simulation (${n.toLocaleString()} rounds)`,
        font: {
          color: colorOther,
          size: fsP,
        },
      },

      shapes,

      xaxis: {
        gridcolor: colorStay,
        linecolor: colorOther,
        showline: true,
        tickfont: { color: colorOther },
        tickformat: ",d",
        title: {
          font: { color: colorOther },
          text: "Rounds",
        },
      },

      yaxis: {
        dtick: 0.1,
        gridcolor: colorStay,
        linecolor: colorOther,
        range: [0, 1],
        showline: true,
        tickfont: { color: colorOther },
        tickformat: ".0%",
        title: {
          font: { color: colorOther },
          text: "Win Rate",
        },
      },

      plot_bgcolor: colorBg,
      paper_bgcolor: colorBg,

      legend: {
        x: 0.95,
        y: 0.05,
        xanchor: "right",
        yanchor: "bottom",
        font: {
          color: colorOther,
        },
      },
    },
    {
      responsive: true,
      displaylogo: false,
    },
  );
}

doorEls.forEach((door, index) => {
  door.addEventListener("click", () => {
    pickDoor(index);
  });
});

document.addEventListener("languageLoaded", () => {
  startGame();
});
