/** Exact customer choices are separate from the four existing render families. */
export const TV_INCHES = [43, 50, 55, 65, 75, 85] as const;
export type TvInches = (typeof TV_INCHES)[number];

export function tvRenderIndex(value: string | undefined): number {
  const numbers = value?.match(/\d+/g)?.map(Number) ?? [];
  const inches = numbers[numbers.length - 1] ?? 65;
  return inches <= 55 ? 0 : inches <= 65 ? 1 : 2;
}

export function tvInchesFromValue(value: string | undefined): TvInches {
  const numbers = value?.match(/\d+/g)?.map(Number) ?? [];
  const inches = numbers[numbers.length - 1] ?? 65;
  return TV_INCHES.find((size) => size === inches) ?? 65;
}

export function resolveTvVariantValue(values: string[], inches: TvInches): string | undefined {
  // Exact variants take priority. Legacy ranges remain usable while the catalogue is updated.
  const exact = values.find((value) => value.trim().toLowerCase() === `${inches} inch`);
  if (exact) return exact;
  return values.find((value) => {
    const numbers = value.match(/\d+/g)?.map(Number) ?? [];
    return numbers.length > 1 && tvRenderIndex(value) === tvRenderIndex(`${inches} inch`);
  });
}