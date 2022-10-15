import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// describe Okay gesture
const OkayDescription = new GestureDescription("okay");

// thumb:
OkayDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
OkayDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
OkayDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
OkayDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0
);
OkayDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// index
OkayDescription.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
OkayDescription.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
OkayDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
OkayDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpRight,
  1.0
);
OkayDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
// middle:
OkayDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
OkayDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
OkayDescription.addDirection(
  Finger.Middle,
  FingerDirection.DiagonalUpLeft,
  1.0
);
OkayDescription.addDirection(
  Finger.Middle,
  FingerDirection.DiagonalUpRight,
  1.0
);

// ring:
OkayDescription.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
OkayDescription.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);
OkayDescription.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);
OkayDescription.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0);

// pinky:
OkayDescription.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
OkayDescription.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
OkayDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
OkayDescription.addDirection(
  Finger.Pinky,
  FingerDirection.DiagonalUpRight,
  1.0
);

export default OkayDescription;
