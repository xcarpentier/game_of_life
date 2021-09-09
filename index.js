function buildCell(size = 10, color = "red") {
  const square = document.createElement("div");
  square.style.background = color;
  square.style.width = `${size}px`;
  square.style.height = `${size}px`;
  square.style.borderWidth = "3px";
  square.style.borderColor = "white";
  return square;
}

function buildContainer() {
  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.margin = "auto";
  return container;
}

function buildLineContainer() {
  const lineContainer = document.createElement("div");
  lineContainer.style.display = "flex";
  lineContainer.style.flexDirection = "row";
  return lineContainer;
}

function dimension() {
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

function buildGrid(container, dimension, cellSize = 10, tick) {
  const numberOfLine = dimension.width / cellSize;
  const numberOfColumn = dimension.height / cellSize;
  for (let indexLine = 0; indexLine < numberOfLine; indexLine++) {
    const lineContainer = buildLineContainer();
    for (let indexColumn = 0; indexColumn < numberOfColumn; indexColumn++) {
      lineContainer.appendChild(
        buildCell(
          cellSize,
          (indexLine + indexColumn + tick) % 2 === 0 ? "yellow" : "pink"
        )
      );
    }
    container.appendChild(lineContainer);
  }
  return container;
}

function start() {
  let child = null;
  setInterval(function () {
    const tick = new Date().getSeconds();
    const cellSize = 10;
    const container = buildContainer();
    if (child) {
      document.body.removeChild(child);
    }
    child = buildGrid(container, dimension(), cellSize, tick);
    document.body.appendChild(child);
  }, 1000);
}

function init() {
  start();
}

document.addEventListener("DOMContentLoaded", init);
