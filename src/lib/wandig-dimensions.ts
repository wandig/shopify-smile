export type WandigSize = {
  /** Label as shown to the customer, e.g. "40 - 55 inch" */
  label: string;
  /** Width of the center module in cm */
  centerWidth: number;
  /** Width of the left module in cm */
  leftWidth: number;
  /** Width of the right module in cm */
  rightWidth: number;
  /** Wall height in cm */
  wallHeight: number;
};

export const WANDIG_SIZES: WandigSize[] = [
  { label: "40 - 55 inch", centerWidth: 137, leftWidth: 61.3, rightWidth: 41.7, wallHeight: 180 },
  { label: "58 - 65 inch", centerWidth: 158, leftWidth: 54.7, rightWidth: 37.3, wallHeight: 180 },
  { label: "70 - 75 inch", centerWidth: 180, leftWidth: 47.5, rightWidth: 32.5, wallHeight: 185 },
  { label: "77 - 85 inch", centerWidth: 202, leftWidth: 40.3, rightWidth: 27.7, wallHeight: 190 },
];

/** Formats a cm value the Dutch way: 137 -> "137", 259.6 -> "259,6" */
export function formatCm(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(".", ",");
}

export function wandigWidth(size: WandigSize, modules: number): number {
  return (
    size.centerWidth +
    (modules >= 1 ? size.leftWidth : 0) +
    (modules >= 2 ? size.rightWidth : 0)
  );
}
