export type WandigSize = {
  /** Label as shown to the customer, e.g. "40 - 55 inch" */
  label: string;
  /** Width of the center module in cm */
  centerWidth: number;
  /** Width of one side module in cm */
  moduleWidth: number;
  /** Wall height in cm */
  wallHeight: number;
};

export const WANDIG_SIZES: WandigSize[] = [
  { label: "40 - 55 inch", centerWidth: 137, moduleWidth: 61.3, wallHeight: 180 },
  { label: "58 - 65 inch", centerWidth: 158, moduleWidth: 54.7, wallHeight: 180 },
  { label: "70 - 75 inch", centerWidth: 180, moduleWidth: 47.5, wallHeight: 185 },
  { label: "77 - 85 inch", centerWidth: 202, moduleWidth: 40.3, wallHeight: 190 },
];

/** Formats a cm value the Dutch way: 137 -> "137", 259.6 -> "259,6" */
export function formatCm(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(".", ",");
}

export function wandigWidth(size: WandigSize, modules: number): number {
  return size.centerWidth + modules * size.moduleWidth;
}
