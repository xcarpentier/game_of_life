function buildDiv() {
  return document.createElement("div");
}

function buildCell(size = 10, color = "red") {
  const square = buildDiv();
  square.style.background = color;
  square.style.opacity = "50%";
  square.style.width = `${size}px`;
  square.style.height = `${size}px`;
  // square.style.border = "solid";
  // square.style.borderWidth = "thin";
  // square.style.borderColor = "red";
  return square;
}

function buildContainer() {
  const container = buildDiv();
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.margin = "auto";
  return container;
}

function buildLineContainer() {
  const lineContainer = buildDiv();
  lineContainer.style.display = "flex";
  lineContainer.style.flexDirection = "row";
  return lineContainer;
}

function getDimension() {
  const body = document.body,
    html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  const width = Math.max(
    body.scrollWidth,
    body.offsetWidth,
    html.clientWidth,
    html.scrollWidth,
    html.offsetWidth
  );

  return { width, height };
}

function buildGrid({
  container,
  cellSize = 10,
  color = { alive: "green", dead: "lightgrey" },
  state
}) {
  const numberOfCellPerLine = state[0].length;
  const numberOfCellPerColumn = state.length;
  for (let indexLine = 0; indexLine < numberOfCellPerColumn; indexLine++) {
    const lineContainer = buildLineContainer();
    for (
      let indexColumn = 0;
      indexColumn < numberOfCellPerLine;
      indexColumn++
    ) {
      lineContainer.appendChild(
        buildCell(
          cellSize,
          state[indexLine][indexColumn] ? color.alive : color.dead
        )
      );
    }
    container.appendChild(lineContainer);
  }
  return container;
}

function getState({ dimension, cellSize, tick }) {
  const numberOfCellPerLine = dimension.width / cellSize;
  const numberOfCellPerColumn = dimension.height / cellSize;
  const result = [];
  for (let indexLine = 0; indexLine < numberOfCellPerColumn; indexLine++) {
    const line = [];
    for (
      let indexColumn = 0;
      indexColumn < numberOfCellPerLine;
      indexColumn++
    ) {
      // TODO: https://fr.wikipedia.org/wiki/Jeu_de_la_vie
      const isAlive = (indexLine + indexColumn + tick) % 2 === 0;
      line.push(isAlive);
    }
    result.push(line);
  }
  return result;
}

function render(body, cellSize = 10) {
  let grid = null;
  let state = null;
  const dimension = getDimension();
  return () => {
    const tick = new Date().getSeconds();
    const container = buildContainer();
    if (grid) {
      body.removeChild(grid);
    }
    if (state) {
      state = null;
    }
    state = getState({ dimension, cellSize, tick });
    grid = buildGrid({ container, cellSize, state });

    body.appendChild(grid);
  };
}

function start(timeout = 1000) {
  setInterval(render(document.body), timeout);
}

document.addEventListener("DOMContentLoaded", start);
