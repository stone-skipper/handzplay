let lastX = 0;
let lastY = 0;

export const trace = (ax, ay, color, ctx) => {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(ax, ay);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
  [lastX, lastY] = [ax, ay];
};
