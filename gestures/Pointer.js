import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// describe pointer gesture ✌️
const pointerDescription = new GestureDescription("pointer");

// thumb:
pointerDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
pointerDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpLeft,
  1.0
);
pointerDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0
);

// index:
pointerDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
pointerDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
pointerDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpLeft,
  1.0
);
pointerDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpRight,
  1.0
);
pointerDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalLeft,
  1.0
);
pointerDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalRight,
  1.0
);

// middle:
pointerDescription.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
pointerDescription.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);

// ring:
pointerDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
pointerDescription.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
pointerDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
pointerDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default pointerDescription;
