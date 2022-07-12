import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// import GestureDescription from "fingerpose";

// describe victory gesture ✌️
const spideyDescription = new GestureDescription("spidey");

// thumb:
spideyDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
spideyDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
spideyDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpLeft,
  1.0
);
spideyDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0
);

// index:
spideyDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
spideyDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
spideyDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpLeft,
  1.0
);
spideyDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpRight,
  1.0
);
spideyDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalLeft,
  1.0
);
spideyDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalRight,
  1.0
);

// middle:
spideyDescription.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
spideyDescription.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);

// ring:
spideyDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
spideyDescription.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
spideyDescription.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
spideyDescription.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
spideyDescription.addDirection(
  Finger.Pinky,
  FingerDirection.DiagonalUpLeft,
  1.0
);
spideyDescription.addDirection(
  Finger.Pinky,
  FingerDirection.DiagonalUpRight,
  1.0
);
spideyDescription.addDirection(
  Finger.Pinky,
  FingerDirection.HorizontalLeft,
  1.0
);
spideyDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalRight,
  1.0
);
// spideyDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default spideyDescription;
