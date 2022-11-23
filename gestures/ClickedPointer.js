import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// describe pointer gesture
const clickedPointerDescription = new GestureDescription("pointer_clicked");

// thumb:
clickedPointerDescription.addDirection(
  Finger.Thumb,
  FingerDirection.VerticalUp,
  1.0
);
clickedPointerDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpLeft,
  1.0
);
clickedPointerDescription.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  1.0
);

// index:
clickedPointerDescription.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.9);
clickedPointerDescription.addDirection(
  Finger.Index,
  FingerDirection.VerticalUp,
  1.0
);
clickedPointerDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpLeft,
  1.0
);
clickedPointerDescription.addDirection(
  Finger.Index,
  FingerDirection.DiagonalUpRight,
  1.0
);
clickedPointerDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalLeft,
  1.0
);
clickedPointerDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalRight,
  1.0
);

// middle:
clickedPointerDescription.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
clickedPointerDescription.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);

// ring:
clickedPointerDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
clickedPointerDescription.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
clickedPointerDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
clickedPointerDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default clickedPointerDescription;
