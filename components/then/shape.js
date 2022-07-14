const getDistance = (ax, ay, bx, by) => {
  let xDistance = ax - bx;
  let yDistance = ay - by;
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
};

const drawStar = (cx, cy, spikes, outerRadius, innerRadius, ctx) => {
  var rot = (Math.PI / 2) * 3;
  var x = cx;
  var y = cy;
  var step = Math.PI / spikes;

  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
};

export const line = (ax, ay, bx, by, color, ctx) => {
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
};

export const circle = (ax, ay, bx, by, color, fillType, ctx) => {
  let midPointX = (ax + bx) / 2;
  let midPointY = (ay + by) / 2;
  let radius = getDistance(ax, ay, midPointX, midPointY);
  ctx.beginPath();
  ctx.arc(midPointX, midPointY, radius, 0, Math.PI * 2);

  if (fillType === "fill") {
    ctx.fillStyle = color;
    ctx.fill();
  } else if (fillType === "stroke") {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
};
export const rect = (ax, ay, bx, by, color, fillType, ctx) => {
  ctx.beginPath();
  ctx.rect(ax, by, bx - ax, (by - ay) * -1);
  if (fillType === "fill") {
    ctx.fillStyle = color;
    ctx.fill();
  } else if (fillType === "stroke") {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
};
export const star = (ax, ay, bx, by, color, fillType, ctx) => {
  let midPointX = (ax + bx) / 2;
  let midPointY = (ay + by) / 2;
  let radius = getDistance(ax, ay, midPointX, midPointY);
  ctx.beginPath();
  drawStar(midPointX, midPointY, 5, radius, radius * 0.5, ctx);
  ctx.closePath();

  if (fillType === "fill") {
    ctx.fillStyle = color;
    ctx.fill();
  } else if (fillType === "stroke") {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
};
export const text = (ax, ay, bx, by, color, text, size, ctx) => {
  let midPointX = (ax + bx) / 2;
  let midPointY = (ay + by) / 2;
  ctx.beginPath();
  ctx.font = size.toString() + "px Arial";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.fillText(text, midPointX, midPointY);
};

export const clipping = (ax, ay, bx, by, shape, color, w, h, ctx) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  //fill the whole canvas with color
  ctx.moveTo(0, 0);
  ctx.lineTo(0, h);
  ctx.lineTo(w, h);
  ctx.lineTo(w, 0);
  ctx.closePath();

  if (shape === "circle") {
    let midPointX = (ax + bx) / 2;
    let midPointY = (ay + by) / 2;
    let radius = getDistance(ax, ay, midPointX, midPointY);
    ctx.arc(midPointX, midPointY, radius, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape === "rect") {
    let largeX = Math.max(ax, bx);
    let smallX = Math.min(ax, bx);
    let largeY = Math.max(ay, by);
    let smallY = Math.min(ay, by);
    ctx.rect(smallX, smallY, largeX - smallX, largeY - smallY);
    ctx.fill();
  } else if (shape === "star") {
    let midPointX = (ax + bx) / 2;
    let midPointY = (ay + by) / 2;
    let radius = getDistance(ax, ay, midPointX, midPointY);
    drawStar(midPointX, midPointY, 5, radius, radius * 0.5, ctx);
    ctx.fill();
  }
};

export const stamp = (ax, ay, bx, by) => {};
export const bubble = (ax, ay, bx, by) => {};
