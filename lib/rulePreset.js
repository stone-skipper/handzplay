export const drumSet = [
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "indexR",
    distance: 20,
    thenType: "audio",
    thenDetail: ["drum", "Crash"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "middleR",
    distance: 20,
    thenType: "audio",
    thenDetail: ["drum", "FloorTom"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "ringR",
    distance: 20,
    thenType: "audio",
    thenDetail: ["drum", "Hihat"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "pinkyR",
    distance: 20,
    thenType: "audio",
    thenDetail: ["drum", "Kick"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbL",
    fingerB: "indexL",
    distance: 20,
    thenType: "audio",
    thenDetail: ["drum", "RackTom"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbL",
    fingerB: "middleL",
    distance: 20,
    thenType: "audio",
    thenDetail: ["drum", "Ride"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbL",
    fingerB: "ringL",
    distance: 20,
    thenType: "audio",
    thenDetail: ["drum", "Sidestick"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbL",
    fingerB: "pinkyL",
    distance: 20,
    thenType: "audio",
    thenDetail: ["drum", "Snare"],
  },
];

export const pianoSet = [
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "indexR",
    distance: 20,
    thenType: "audio",
    thenDetail: ["piano", "G"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "middleR",
    distance: 20,
    thenType: "audio",
    thenDetail: ["piano", "A"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "ringR",
    distance: 20,
    thenType: "audio",
    thenDetail: ["piano", "B"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "pinkyR",
    distance: 20,
    thenType: "audio",
    thenDetail: ["piano", "C5"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbL",
    fingerB: "indexL",
    distance: 20,
    thenType: "audio",
    thenDetail: ["piano", "F"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbL",
    fingerB: "middleL",
    distance: 20,
    thenType: "audio",
    thenDetail: ["piano", "E"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbL",
    fingerB: "ringL",
    distance: 20,
    thenType: "audio",
    thenDetail: ["piano", "D"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbL",
    fingerB: "pinkyL",
    distance: 20,
    thenType: "audio",
    thenDetail: ["piano", "C4"],
  },
];
export const gestureSet = [
  {
    ifType: "pose",
    pose: "victory",
    hand: "left",
    thenType: "shape",
    thenDetail: ["text", "white", "✌️", 80],
  },
  {
    ifType: "pose",
    pose: "victory",
    hand: "right",
    thenType: "shape",
    thenDetail: ["text", "white", "✌️", 80],
  },
  {
    ifType: "pose",
    pose: "spidey",
    hand: "left",
    thenType: "shape",
    thenDetail: ["text", "white", "🤟", 80],
  },
  {
    ifType: "pose",
    pose: "spidey",
    hand: "right",
    thenType: "shape",
    thenDetail: ["text", "white", "🤟", 80],
  },
  {
    ifType: "pose",
    pose: "thumbs_up",
    hand: "left",
    thenType: "shape",
    thenDetail: ["text", "white", "👍", 80],
  },
  {
    ifType: "pose",
    pose: "thumbs_up",
    hand: "right",
    thenType: "shape",
    thenDetail: ["text", "white", "👍", 80],
  },
  {
    ifType: "pose",
    pose: "okay",
    hand: "left",
    thenType: "shape",
    thenDetail: ["text", "white", "👌", 80],
  },
  {
    ifType: "pose",
    pose: "okay",
    hand: "right",
    thenType: "shape",
    thenDetail: ["text", "white", "👌", 80],
  },
];
export const browseSet = [
  {
    ifType: "action",
    action: "right",
    hand: "left",
    thenType: "interface",
    thenDetail: ["rect", "color", "blue", "black"],
  },
  {
    ifType: "action",
    action: "right",
    hand: "left",
    thenType: "interface",
    thenDetail: ["circle", "color", "white", "grey"],
  },
];
export const moveSet = [
  // shape(rect, circle, text), initial size, initial color, initial text, transitionType(color, text, size, position, rotate), left, right, top, down
  // {
  //   ifType: "action",
  //   thenType: "interface",
  //   thenDetail: [
  //     "rect",
  //     200, "black", '',
  //     "color",
  //     "blue", "grey", "red", "green",
  //   ],
  // },
  // {
  //   ifType: "action",
  //   thenType: "interface",
  //   thenDetail: ["rect", 200, "black",'', "size", -10, +10, 0, 0],
  // },
  // {
  //   ifType: "action",
  //   thenType: "interface",
  //   thenDetail: ["rect", 200, "black",'', "rotate", -10, +10, 0, 0],
  // },
  {
    ifType: "action",
    thenType: "interface",
    thenDetail: [
      "text",
      200,
      "black",
      "",
      "text",
      "left",
      "right",
      "up",
      "down",
    ],
  },
];
export const whiteboardSet = [
  {
    ifType: "pose",
    pose: "thumbs_up",
    hand: "left",
    thenType: "shape",
    thenDetail: ["text", "white", "👍", 80],
  },
  {
    ifType: "pose",
    pose: "thumbs_up",
    hand: "right",
    thenType: "shape",
    thenDetail: ["text", "white", "👍", 80],
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "middleR",
    distance: 30,
    thenType: "transcript",
    thenDetail: ["text", "black", "yellow", 20],
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "indexR",
    distance: 30,
    thenType: "draw",
    thenDetail: ["green", 2], // color and linewidth
  },
];
export const shapeSet = [
  {
    ifType: "fingers",
    fingerA: "pinkyL",
    fingerB: "pinkyR",
    distance: 100,
    thenType: "shape",
    thenDetail: ["line", "green"],
  },
  {
    ifType: "pose",
    hand: "left",
    pose: "victory",
    thenType: "interface",
    thenDetail: ["rect", "color", "blue", "black"],
    // thenDetail: [
    //   "rect",
    //   {
    //     color: "blue",
    //     opacity: 1,
    //     width: 100,
    //     height: 100,
    //     radius: 10,
    //     rotate: 0,
    //   }, // initial
    //   {
    //     color: "white",
    //     opacity: 1,
    //     width: 150,
    //     height: 100,
    //     radius: 10,
    //     rotate: 45,
    //     move: ["y", 20], // 'x' or 'y' as axis / movedistance
    //   }, //onPose
    // ],
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "indexR",
    distance: 200,
    thenType: "shape",

    thenDetail: ["rect", "black", "fill"],
  },

  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "indexR",
    distance: 30,
    thenType: "audio",
    thenDetail: ["../../media/drum01.mp3"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "indexR",
    distance: 20,
    thenType: "trace",
    thenDetail: ["white"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "indexR",
    distance: 100,
    thenType: "shape",
    thenDetail: ["clipping", "rect", "black"],
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "indexR",
    distance: 20,
    thenType: "draw",
    thenDetail: ["green", 2], // color and linewidth
  },
  {
    ifType: "fingers",
    fingerA: "thumbR",
    fingerB: "indexR",
    distance: 20,
    thenType: "stamp",
    thenDetail: ["rect", "green", "fill", 20], // shape, color, filltype, size
  },
];
export const presentationSet = [{}];
export const textSet = {
  ifType: "fingers",
  fingerA: "thumbR",
  fingerB: "middleR",
  distance: 20,
  thenType: "shape",
  thenDetail: ["text", "white", "hello🥰", 80],
};
export const transcriptSet = {
  ifType: "fingers",
  fingerA: "thumbR",
  fingerB: "indexR",
  distance: 30,
  thenType: "transcript",
  thenDetail: ["text", "black", "yellow", 30], //
};

export const spideySet = [
  {
    ifType: "pose",
    pose: "spidey",
    hand: "left",
    thenType: "stamp",
    thenDetail: ["text", "white", "🕸️", 80],
  },
  {
    ifType: "pose",
    pose: "spidey",
    hand: "right",
    thenType: "stamp",
    thenDetail: ["text", "white", "🕸️", 80],
  },
  {
    ifType: "pose",
    pose: "pointer",
    hand: "left",
    thenType: "stamp",
    thenDetail: ["text", "white", "🕷", 80],
  },
  {
    ifType: "pose",
    pose: "pointer",
    hand: "right",
    thenType: "stamp",
    thenDetail: ["text", "white", "🕷", 80],
  },
  {
    ifType: "pose",
    pose: "victory",
    hand: "left",
    thenType: "stamp",
    thenDetail: ["text", "white", "😜", 80],
  },
  {
    ifType: "pose",
    pose: "victory",
    hand: "right",
    thenType: "stamp",
    thenDetail: ["text", "white", "🍕", 80],
  },
];

export const actionSet = [
  // {
  //   ifType: "action",
  //   action: "right",
  //   hand: "left",
  //   thenType: "interface",
  //   thenDetail: ["rect", "color", "blue", "black"],
  // },
];

export const magicWall = [
  // {
  //   ifType: "fingers",
  //   fingerA: "thumbR",
  //   fingerB: "indexR",
  //   distance: 30,
  //   thenType: "transcript",
  //   thenDetail: ["text", "black", "yellow", 20],
  // },
  // {
  //   ifType: "action",
  //   action: "left",
  //   hand: "right",
  //   thenType: "interface",
  //   thenDetail: ["text", "content", "left", "swiped!"],
  // },
  // {
  //   ifType: "action",
  //   action: "right",
  //   hand: "right",
  //   thenType: "interface",
  //   thenDetail: ["text", "content", "right", "swiped!"],
  // },
  // {
  //   ifType: "fingers",
  //   fingerA: "thumbR",
  //   fingerB: "thumbTapR",
  //   distance: 20,
  //   thenType: "shape",
  //   thenDetail: ["text", "#0066FF", "click!", 30],
  // },
  // {
  //   ifType: "fingers",
  //   fingerA: "thumbL",
  //   fingerB: "thumbTapL",
  //   distance: 20,
  //   thenType: "shape",
  //   thenDetail: ["text", "#0066FF", "click!", 30],
  // },
  // {
  //   ifType: "fingers",
  //   fingerA: "thumbL",
  //   fingerB: "thumbTapL",
  //   distance: 20,
  //   thenType: "draw",
  //   thenDetail: ["green", 2], // color and linewidth
  // },
  // {
  //   ifType: "fingers",
  //   fingerA: "thumbR",
  //   fingerB: "thumbTapR",
  //   distance: 20,
  //   thenType: "draw",
  //   thenDetail: ["green", 2], // color and linewidth
  // },
];
