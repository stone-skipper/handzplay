import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// describe five gesture
const openPalmDescription = new GestureDescription("openPalm");

// thumb:
openPalmDescription.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
openPalmDescription.addDirection(
  Finger.Thumb,
  FingerDirection.HorizontalLeft,
  1.0
);
openPalmDescription.addDirection(
  Finger.Thumb,
  FingerDirection.HorizontalRight,
  1.0
);

// index:
openPalmDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
openPalmDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalLeft,
  1.0
);
openPalmDescription.addDirection(
  Finger.Index,
  FingerDirection.HorizontalRight,
  1.0
);

// middle:
openPalmDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
openPalmDescription.addDirection(
  Finger.Middle,
  FingerDirection.HorizontalLeft,
  1.0
);
openPalmDescription.addDirection(
  Finger.Middle,
  FingerDirection.HorizontalRight,
  1.0
);

// ring:
openPalmDescription.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
openPalmDescription.addDirection(
  Finger.Ring,
  FingerDirection.HorizontalLeft,
  1.0
);
openPalmDescription.addDirection(
  Finger.Ring,
  FingerDirection.HorizontalRight,
  1.0
);

// pinky:
openPalmDescription.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
openPalmDescription.addDirection(
  Finger.Pinky,
  FingerDirection.HorizontalLeft,
  1.0
);
openPalmDescription.addDirection(
  Finger.Pinky,
  FingerDirection.HorizontalRight,
  1.0
);

export default openPalmDescription;
