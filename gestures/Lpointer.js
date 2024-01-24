import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// describe five gesture
const lpointDescription = new GestureDescription("Lpointer");

// thumb:
lpointDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
lpointDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
lpointDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpLeft,
  1.0
);
lpointDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0
);
lpointDescription.addDirection(
  Finger.Thumb,
  FingerDirection.HorizontalLeft,
  1.0
);
lpointDescription.addDirection(
  Finger.Thumb,
  FingerDirection.HorizontalRight,
  1.0
);

// index:
lpointDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
lpointDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
lpointDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpLeft,
  1.0
);
lpointDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpRight,
  1.0
);
lpointDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalLeft,
  1.0
);
lpointDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalRight,
  1.0
);

// middle:
lpointDescription.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
lpointDescription.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);

// ring:
lpointDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
lpointDescription.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
lpointDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
lpointDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default lpointDescription;
