export function getRandomInt(min: number, max: number): number {
  const treatedMin = Math.ceil(min);
  const treatedMax = Math.floor(max);

  return Math.floor(Math.random() * (treatedMax - treatedMin + 1)) + treatedMin;
}
