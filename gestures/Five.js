import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// describe five gesture
const fiveDescription = new GestureDescription("five");

// thumb:
fiveDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
fiveDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
fiveDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
fiveDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0
);
fiveDescription.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
fiveDescription.addDirection(
  Finger.Thumb,
  FingerDirection.HorizontalRight,
  1.0
);

// index:
fiveDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
fiveDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
fiveDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
fiveDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpRight,
  1.0
);
fiveDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
fiveDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalRight,
  1.0
);

// middle:
fiveDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
fiveDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
fiveDescription.addDirection(
  Finger.Middle,
  FingerDirection.DiagonalUpLeft,
  1.0
);
fiveDescription.addDirection(
  Finger.Middle,
  FingerDirection.DiagonalUpRight,
  1.0
);
fiveDescription.addDirection(
  Finger.Middle,
  FingerDirection.HorizontalLeft,
  1.0
);
fiveDescription.addDirection(
  Finger.Middle,
  FingerDirection.HorizontalRight,
  1.0
);

// ring:
fiveDescription.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);

fiveDescription.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);
fiveDescription.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 1.0);
fiveDescription.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 1.0);
fiveDescription.addDirection(Finger.Ring, FingerDirection.HorizontalLeft, 1.0);
fiveDescription.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 1.0);

// pinky:
fiveDescription.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
fiveDescription.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
fiveDescription.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
fiveDescription.addDirection(
  Finger.Pinky,
  FingerDirection.DiagonalUpRight,
  1.0
);
fiveDescription.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0);
fiveDescription.addDirection(
  Finger.Pinky,
  FingerDirection.HorizontalRight,
  1.0
);

export default fiveDescription;
