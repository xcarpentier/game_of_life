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
  dimension,
  tick,
  cellSize = 10,
  color = { alive: "green", dead: "lightgrey" },
}) {
  const numberOfLine = dimension.width / cellSize;
  const numberOfColumn = dimension.height / cellSize;
  for (let indexLine = 0; indexLine < numberOfColumn; indexLine++) {
    const lineContainer = buildLineContainer();
    for (let indexColumn = 0; indexColumn < numberOfLine; indexColumn++) {
      lineContainer.appendChild(
        buildCell(
          cellSize,
          (indexLine + indexColumn + tick) % 2 === 0 ? color.alive : color.dead
        )
      );
    }
    container.appendChild(lineContainer);
  }
  return container;
}

function render(body, cellSize = 10) {
  let child = null;
  return () => {
    const tick = new Date().getSeconds();
    const container = buildContainer();
    const dimension = getDimension();
    if (child) {
      body.removeChild(child);
    }
    child = buildGrid({ container, dimension, cellSize, tick });
    body.appendChild(child);
  };
}

function start(timeout = 1000) {
  setInterval(render(document.body), timeout);
}

document.addEventListener("DOMContentLoaded", start);
