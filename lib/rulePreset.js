export const audioSet = [{}];

export const interfaceSet = [{}];

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
    pose: ["victory", "left"], //type of gesture, left right both
    thenType: "interface",
    thenDetail: [
      "rect",
      {
        color: "blue",
        opacity: 1,
        width: 100,
        height: 100,
        radius: 10,
        rotate: 0,
      }, // initial
      {
        color: "white",
        opacity: 1,
        width: 150,
        height: 100,
        radius: 10,
        rotate: 45,
        move: ["y", 20], // 'x' or 'y' as axis / movedistance
      }, //onPose
    ],
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

export const actionSet = {
  ifType: "action",
  action: ["right", "left"], //type of gesture, left right
  thenType: "interface",
  thenDetail: [
    "rect",
    {
      color: "blue",
      opacity: 1,
      width: 100,
      height: 100,
      radius: 10,
      rotate: 0,
    }, // initial
    {
      color: "white",
      opacity: 1,
      width: 150,
      height: 100,
      radius: 10,
      rotate: 45,
      move: ["y", 20], // 'x' or 'y' as axis / movedistance
    }, //onPose
  ],
};
