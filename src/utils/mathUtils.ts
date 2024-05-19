export const logScale = (value: number, min: number, max: number): number => {
  const logMin = Math.log(min + 1);
  const logMax = Math.log(max + 1);
  const scale = (Math.log(value + 1) - logMin) / (logMax - logMin);
  return min + scale * (max - min);
};

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
