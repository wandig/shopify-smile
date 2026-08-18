import { Img } from "@/components/Img";
import { FULL_HOUSE_COLORS } from "@/lib/wandig-colors";
import centerModule from "@/assets/center-module-trim.png.asset.json";
import leftModule from "@/assets/left-module-trim.png.asset.json";
import rightModuleUrlAsset from "@/assets/right-module-trim-tight-cropped.png.asset.json";
const rightModuleUrl = rightModuleUrlAsset.url;

export const MODULE_REVEAL = "moduleColorReveal 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both";

export const FULL_HOUSE_FRONT_IMAGES: Record<string, string> = {
  Donkereiken:
    "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_55in_FullHouse_Closed_Front_febf1f75-a372-4cd7-aa4a-98f7231d208a.jpg?v=1785761296",
  Truffelbruin:
    "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_55in_FullHouse_Closed_Front_febf1f75-a372-4cd7-aa4a-98f7231d208a.jpg?v=1785761296",
  Cashmeregrijs:
    "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_55in_FullHouse_Closed_Front_bb9754f6-1ec4-4bb9-b906-0f6c91cfc4da.jpg?v=1785762097",
  Dofroze:
    "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_55in_FullHouse_Closed_Front_daab0722-3ff3-46ab-99f4-71ef038faecf.jpg?v=1785762321",
  Blush:
    "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_55in_FullHouse_Closed_Front_daab0722-3ff3-46ab-99f4-71ef038faecf.jpg?v=1785762321",
  Kristalwit:
    "https://cdn.shopify.com/s/files/1/0909/6010/1720/files/Wandig_55in_FullHouse_Closed_Front_1cb0343f-93b7-4c9c-ac58-92a733dc67be.jpg?v=1785762395",
};


export const MODULE_CROPS = {
  left: { left: 0.19, top: 0.182, width: 0.144, height: 0.569 },
  center: { left: 0.334, top: 0.182, width: 0.331, height: 0.569 },
  right: { left: 0.665, top: 0.182, width: 0.147, height: 0.569 },
} as const;

export type ModulePosition = keyof typeof MODULE_CROPS;

const moduleLabel = (position: ModulePosition) =>
  position === "center" ? "middenmodule" : `${position === "left" ? "linker" : "rechter"} module`;

export function CroppedModuleImage({
  color,
  position,
  source,
  animate = true,
  testId = true,
  className = "",
}: {
  color: string;
  position: ModulePosition;
  source: string;
  animate?: boolean;
  testId?: boolean;
  className?: string;
}) {
  const crop = MODULE_CROPS[position];

  return (
    <div
      data-testid={testId ? `configurator-${position}-module` : undefined}
      className={`relative h-full shrink-0 overflow-hidden ${className}`}
      style={{
        aspectRatio: `${(crop.width * 4) / (crop.height * 3)}`,
        animation: animate ? MODULE_REVEAL : undefined,
        backfaceVisibility: "hidden",
        contain: "paint",
        willChange: animate ? "opacity" : undefined,
      }}
    >
      <Img
        src={source}
        alt={`Wandig ${moduleLabel(position)} in ${color}`}
        className="pointer-events-none absolute max-w-none select-none"
        style={{
          width: `${100 / crop.width}%`,
          height: `${100 / crop.height}%`,
          left: `${(-crop.left / crop.width) * 100}%`,
          top: `${(-crop.top / crop.height) * 100}%`,
        }}
      />
    </div>
  );
}

export function ConfiguratorModuleImage({
  color,
  position,
  source,
  animate = true,
  testId = true,
  className = "",
}: {
  color: string;
  position: ModulePosition;
  source: string | null;
  animate?: boolean;
  testId?: boolean;
  className?: string;
}) {
  const usesWalnutAsset = color === FULL_HOUSE_COLORS[0];

  if (!usesWalnutAsset) {
    return (
      <CroppedModuleImage
        color={color}
        position={position}
        source={source!}
        animate={animate}
        testId={testId}
        className={className}
      />
    );
  }

  const walnutSource =
    position === "left" ? leftModule.url : position === "center" ? centerModule.url : rightModuleUrl;

  return (
    <Img
      src={walnutSource}
      alt={`Wandig ${moduleLabel(position)} in ${color}`}
      data-testid={testId ? `configurator-${position}-module` : undefined}
      className={`block h-full w-auto select-none ${className}`}
      style={{
        animation: animate ? MODULE_REVEAL : undefined,
        backfaceVisibility: "hidden",
        willChange: animate ? "opacity" : undefined,
      }}
    />
  );
}

/** Static wall preview used inside the specifications section. */
export function WandigSpecPreview({
  color,
  source,
  hasLeft = true,
  hasRight = true,
}: {
  color: string;
  source: string | null;
  hasLeft?: boolean;
  hasRight?: boolean;
}) {
  const usesWalnutModules = color === FULL_HOUSE_COLORS[0];

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
      <div className="absolute inset-0 flex items-end justify-center pb-[12%]">
        <div className="flex h-[109%] translate-y-[30px] items-end">
          {hasLeft && (
            <ConfiguratorModuleImage
              color={color}
              position="left"
              source={source}
              animate={false}
              testId={false}
              className="relative z-[1] mr-[-3px]"
            />
          )}
          <ConfiguratorModuleImage
            color={color}
            position="center"
            source={source}
            animate={false}
            testId={false}
            className="relative z-[2]"
          />
          {hasRight && (
            <ConfiguratorModuleImage
              color={color}
              position="right"
              source={source}
              animate={false}
              testId={false}
              className={`relative z-[1] ${usesWalnutModules ? "ml-[-11px]" : "ml-[-3px]"}`}
            />
          )}
        </div>

      </div>
    </div>
  );
}
