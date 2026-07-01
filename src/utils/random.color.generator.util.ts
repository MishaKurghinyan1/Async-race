export function getRandomHexColor(): string {
  const randomInt = Math.floor(Math.random() * 16777216);

  const hexString = randomInt.toString(16);

  const paddedHex = hexString.padStart(6, '0');

  return `#${paddedHex}`;
}
