const isPlaying = (audElem) => {
  return !audElem.paused;
};

export const audio = (src) => {
  var audio = new Audio(src);
  if (isPlaying(audio) === false) {
    audio.play();
  }
};
