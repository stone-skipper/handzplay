const isPlaying = (audElem) => {
  return !audElem.paused;
};

export const audio = (audio) => {
  audio.play();
};
