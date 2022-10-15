import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// describe Okay gesture
const RockDescription = new GestureDescription("rock");

// thumb:
RockDescription.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
RockDescription.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

RockDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
RockDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
RockDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0
);

// index
RockDescription.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
RockDescription.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);

RockDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
RockDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
RockDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpRight,
  1.0
);
// middle:
RockDescription.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
RockDescription.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);

RockDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
RockDescription.addDirection(
  Finger.Middle,
  FingerDirection.DiagonalUpLeft,
  1.0
);
RockDescription.addDirection(
  Finger.Middle,
  FingerDirection.DiagonalUpRight,
  1.0
);

// ring:
RockDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
RockDescription.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0);

RockDescription.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);
RockDescription.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);
RockDescription.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0);
// pinky:
RockDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
RockDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0);

RockDescription.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
RockDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
RockDescription.addDirection(
  Finger.Pinky,
  FingerDirection.DiagonalUpRight,
  1.0
);
export default RockDescription;
