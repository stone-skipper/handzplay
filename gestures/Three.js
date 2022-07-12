import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// import GestureDescription from "fingerpose";

// describe three gesture
const threeDescription = new GestureDescription("three");

// thumb:
threeDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
threeDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
threeDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpLeft,
  1.0
);
threeDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0
);
threeDescription.addDirection(
  Finger.Thumb,
  FingerDirection.HorizontalLeft,
  1.0
);
threeDescription.addDirection(
  Finger.Thumb,
  FingerDirection.HorizontalRight,
  1.0
);

// index:
threeDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
threeDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
threeDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpLeft,
  1.0
);
threeDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpRight,
  1.0
);
threeDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalLeft,
  1.0
);
threeDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalRight,
  1.0
);

// middle:
threeDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
threeDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
threeDescription.addDirection(
  Finger.Middle,
  FingerDirection.DiagonalUpLeft,
  1.0
);
threeDescription.addDirection(
  Finger.Middle,
  FingerDirection.DiagonalUpRight,
  1.0
);
threeDescription.addDirection(
  Finger.Middle,
  FingerDirection.HorizontalLeft,
  1.0
);
threeDescription.addDirection(
  Finger.Middle,
  FingerDirection.HorizontalRight,
  1.0
);

// ring:
threeDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
threeDescription.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
threeDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
threeDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default threeDescription;
