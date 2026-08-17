import type { CSSProperties } from "react";

import swatchDofroze from "@/assets/swatches/dofroze.jpg";
import swatchEikengrijs from "@/assets/swatches/eikengrijs.jpg";
import swatchEikenzwart from "@/assets/swatches/eikenzwart.jpg";
import swatchKatoengrijs from "@/assets/swatches/katoengrijs.jpg";
import swatchKleibeige from "@/assets/swatches/kleibeige.jpg";
import swatchTruffelbruin from "@/assets/swatches/truffelbruin.jpg";
import swatchWalnootbruin from "@/assets/swatches/walnootbruin.jpg";
import swatchZandsteen from "@/assets/swatches/zandsteen.jpg";

export const FULL_HOUSE_COLORS = [
  "Walnootbruin",
  "Truffelbruin",
  "Cashmeregrijs",
  "Blush",
  "Kristalwit",
] as const;

const COLOR_ORDER = new Map(
  FULL_HOUSE_COLORS.map((name, index) => [name.toLocaleLowerCase("nl-NL"), index]),
);

const TEXTURES: Array<{ pattern: RegExp; image: string; color: string }> = [
  { pattern: /donkereiken|eikenzwart/, image: swatchEikenzwart, color: "#1d1b19" },
  { pattern: /eikengrijs/, image: swatchEikengrijs, color: "#9b9990" },
  { pattern: /walnootbruin|walnoot|noten/, image: swatchWalnootbruin, color: "#684326" },
  { pattern: /truffelbruin|truffel/, image: swatchTruffelbruin, color: "#755844" },
  { pattern: /cashmeregrijs|cashmere|katoengrijs|katoen/, image: swatchKatoengrijs, color: "#b6aea3" },
  { pattern: /zandsteen/, image: swatchZandsteen, color: "#c3a26b" },
  { pattern: /kristalwit|kleibeige|klei/, image: swatchKleibeige, color: "#b9aa97" },
  { pattern: /blush|dofroze|roze/, image: swatchDofroze, color: "#d1aaa0" },
];

const SOLID_COLORS: Array<{ pattern: RegExp; color: string }> = [
  { pattern: /kristalwit|crystal white/, color: "#f5f4f0" },
  { pattern: /steenwit|stone white/, color: "#e9e5de" },
  { pattern: /wit|white/, color: "#f2f1ed" },
  { pattern: /zwart|black|antraciet/, color: "#22211f" },
  { pattern: /grijs|grey|gray/, color: "#a8a7a2" },
  { pattern: /bruin|brown|walnut/, color: "#755039" },
  { pattern: /beige|zand|sand/, color: "#c8b89f" },
];

export function sortWandigColors(values: string[]): string[] {
  const unique = Array.from(
    new Map(values.filter(Boolean).map((value) => [value.toLocaleLowerCase("nl-NL"), value])).values(),
  );

  return unique.sort((a, b) => {
    const aIndex = COLOR_ORDER.get(a.toLocaleLowerCase("nl-NL")) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = COLOR_ORDER.get(b.toLocaleLowerCase("nl-NL")) ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex || a.localeCompare(b, "nl-NL");
  });
}

export function wandigSwatchStyle(name: string): CSSProperties {
  const key = name.toLocaleLowerCase("nl-NL").trim();
  const texture = TEXTURES.find(({ pattern }) => pattern.test(key));

  if (texture) {
    return {
      backgroundColor: texture.color,
      backgroundImage: `url(${texture.image})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    };
  }

  const solid = SOLID_COLORS.find(({ pattern }) => pattern.test(key));
  const backgroundColor = solid?.color ?? "#d4d1cb";

  return {
    backgroundColor,
    backgroundImage:
      "radial-gradient(circle at 28% 24%, rgba(255,255,255,0.7), transparent 38%), repeating-linear-gradient(96deg, rgba(90,80,70,0.045) 0 1px, transparent 1px 7px), linear-gradient(145deg, rgba(255,255,255,0.18), rgba(0,0,0,0.05))",
    backgroundBlendMode: "soft-light, multiply, normal",
  };
}
