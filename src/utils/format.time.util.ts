export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const wholeSeconds = Math.floor(time % 60);

  const decimals = (time % 1).toFixed(2).substring(1);

  const paddedSeconds = wholeSeconds.toString().padStart(2, '0');

  return `${minutes}:${paddedSeconds}${decimals}`;
};
