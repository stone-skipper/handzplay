// Points for fingers
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

const dotSize = 2;

// Infinity Gauntlet Style
const style = {
  0: { color: "blue", size: dotSize },
  1: { color: "blue", size: dotSize },
  2: { color: "blue", size: dotSize },
  3: { color: "blue", size: dotSize },
  4: { color: "white", size: dotSize },
  5: { color: "blue", size: dotSize },
  6: { color: "blue", size: dotSize },
  7: { color: "blue", size: dotSize },
  8: { color: "white", size: dotSize },
  9: { color: "blue", size: dotSize },
  10: { color: "blue", size: dotSize },
  11: { color: "blue", size: dotSize },
  12: { color: "white", size: dotSize },
  13: { color: "blue", size: dotSize },
  14: { color: "blue", size: dotSize },
  15: { color: "blue", size: dotSize },
  16: { color: "white", size: dotSize },
  17: { color: "blue", size: dotSize },
  18: { color: "blue", size: dotSize },
  19: { color: "blue", size: dotSize },
  20: { color: "white", size: dotSize },
};

export const drawHand = (predictions, ctx) => {
  // Check if we have predictions
  if (predictions.length > 0) {
    // Loop through each prediction
    for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
      let finger = Object.keys(fingerJoints)[j];
      //  Loop through pairs of joints
      for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
        // Get pairs of joints
        const firstJointIndex = fingerJoints[finger][k];
        const secondJointIndex = fingerJoints[finger][k + 1];

        // Draw path
        ctx.beginPath();
        ctx.moveTo(
          predictions[firstJointIndex].x,
          predictions[firstJointIndex].y
        );
        ctx.lineTo(
          predictions[secondJointIndex].x,
          predictions[secondJointIndex].y
        );
        ctx.strokeStyle = "lightgrey";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    // creating dots
    for (let i = 0; i < predictions.length; i++) {
      // Get x point
      const x = predictions[i].x;
      // Get y point
      const y = predictions[i].y;
      // Start drawing
      ctx.beginPath();
      ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);

      // Set line color
      ctx.fillStyle = style[i]["color"];
      ctx.fill();
    }
  }
};

export const drawPoints = (predictions, ctx) => {
  // Check if we have predictions
  if (predictions.length > 0) {
    // Loop through each prediction

    for (let i = 1; i < 6; i++) {
      // Get x point
      const x = predictions[i * 4].x;
      // Get y point
      const y = predictions[i * 4].y;
      // Start drawing
      ctx.beginPath();
      ctx.arc(x, y, style[i * 4]["size"], 0, 3 * Math.PI);

      // Set line color
      ctx.fillStyle = style[i * 4]["color"];
      ctx.fill();
    }
  }
};

// export const drawInteraction = (predictions, currentPose, ctx, rules) => {
//   if (currentPose === "thumbsUp") {
//     ctx.beginPath();

//     ctx.rect(0, 0, 100, 100);
//     ctx.fillStyle = "green";
//     ctx.fill();
//   } else {
//     ctx.clearRect(0, 0, 400, 400);
//   }
// };
