export type WandigSize = {
  /** Label as shown to the customer, e.g. "40 - 55 inch" */
  label: string;
  /** Width of the center module in cm */
  centerWidth: number;
  /** Width of the left module in cm */
  leftWidth: number;
  /** Width of the right module in cm */
  rightWidth: number;
  /** Width of one compact/new side module in cm */
  newModuleWidth: number;
  /** Wall height in cm */
  wallHeight: number;
};

export const WANDIG_SIZES: WandigSize[] = [
  { label: "40 - 55 inch", centerWidth: 134, leftWidth: 62, rightWidth: 62, newModuleWidth: 44, wallHeight: 180 },
  { label: "58 - 65 inch", centerWidth: 156, leftWidth: 56, rightWidth: 56, newModuleWidth: 38, wallHeight: 180 },
  { label: "70 - 75 inch", centerWidth: 177, leftWidth: 49, rightWidth: 49, newModuleWidth: 34, wallHeight: 185 },
  { label: "77 - 85 inch", centerWidth: 200, leftWidth: 42, rightWidth: 42, newModuleWidth: 29, wallHeight: 190 },
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
