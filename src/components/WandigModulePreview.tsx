import { Img } from "@/components/Img";
import { FULL_HOUSE_COLORS } from "@/lib/wandig-colors";
import centerModule from "@/assets/center-module-trim.png.asset.json";
import leftModule from "@/assets/left-module-trim.png.asset.json";
import rightModuleUrlAsset from "@/assets/right-module-trim-tight-cropped.png.asset.json";
import dofroze4055FrontAsset from "@/assets/configurator/dofroze-40-55-front.webp.asset.json";
const dofroze4055Front = dofroze4055FrontAsset.url;
import dofroze5865FrontAsset from "@/assets/configurator/dofroze-58-65-front.webp.asset.json";
const dofroze5865Front = dofroze5865FrontAsset.url;
import dofroze7075FrontAsset from "@/assets/configurator/dofroze-70-75-front.webp.asset.json";
const dofroze7075Front = dofroze7075FrontAsset.url;
import dofroze7785Front from "@/assets/configurator/dofroze-77-85-front.png";
import walnut4055Front from "@/assets/configurator/walnootbruin-40-55-front.png";
import walnut5865Front from "@/assets/configurator/walnootbruin-58-65-front.png";
import walnut7075Front from "@/assets/configurator/walnootbruin-70-75-front.png";
import walnut7785Front from "@/assets/configurator/walnootbruin-77-85-front.png";
import darkOak4055Front from "@/assets/configurator/donkereiken-40-55-front.png";
import darkOak5865Front from "@/assets/configurator/donkereiken-58-65-front.png";
import darkOak7075Front from "@/assets/configurator/donkereiken-70-75-front.png";
import darkOak7785Front from "@/assets/configurator/donkereiken-77-85-front.png";
import cashmere4055Front from "@/assets/configurator/cashmeregrijs-40-55-front.png";
import cashmere5865Front from "@/assets/configurator/cashmeregrijs-58-65-front.png";
import cashmere7075Front from "@/assets/configurator/cashmeregrijs-70-75-front.png";
import cashmere7785Front from "@/assets/configurator/cashmeregrijs-77-85-front.png";
import crystalWhite4055Front from "@/assets/configurator/kristalwit-40-55-front.png";
import crystalWhite5865Front from "@/assets/configurator/kristalwit-58-65-front.png";
import crystalWhite7075Front from "@/assets/configurator/kristalwit-70-75-front.png";
import crystalWhite7785Front from "@/assets/configurator/kristalwit-77-85-front.png";
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

export type ModulePosition = "left" | "center" | "right";

export type ModuleCrop = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type ModuleCropSet = Record<ModulePosition, ModuleCrop>;

export type ConfiguratorModuleAsset = {
  source: string;
  crops: ModuleCropSet;
};

export const MODULE_CROPS: ModuleCropSet = {
  left: { left: 0.19, top: 0.182, width: 0.144, height: 0.569 },
  center: { left: 0.334, top: 0.182, width: 0.331, height: 0.569 },
  right: { left: 0.665, top: 0.182, width: 0.147, height: 0.569 },
};

const DOFROZE_40_55_CROPS: ModuleCropSet = {
  left: { left: 330 / 4000, top: 354 / 3000, width: 797 / 4000, height: 2292 / 3000 },
  center: { left: 1127 / 4000, top: 354 / 3000, width: 1745 / 4000, height: 2292 / 3000 },
  right: { left: 2872 / 4000, top: 354 / 3000, width: 797 / 4000, height: 2292 / 3000 },
};

const DOFROZE_58_65_CROPS: ModuleCropSet = {
  left: { left: 312 / 4000, top: 345 / 3000, width: 675 / 4000, height: 2292 / 3000 },
  center: { left: 975 / 4000, top: 345 / 3000, width: 2049 / 4000, height: 2292 / 3000 },
  right: { left: 3012 / 4000, top: 345 / 3000, width: 675 / 4000, height: 2292 / 3000 },
};

const DOFROZE_70_75_CROPS: ModuleCropSet = {
  left: { left: 172 / 4000, top: 316 / 3000, width: 675 / 4000, height: 2369 / 3000 },
  center: { left: 835 / 4000, top: 316 / 3000, width: 2329 / 4000, height: 2369 / 3000 },
  right: { left: 3152 / 4000, top: 316 / 3000, width: 675 / 4000, height: 2369 / 3000 },
};

const DOFROZE_77_85_CROPS: ModuleCropSet = {
  left: { left: 50 / 2046, top: 140 / 1535, width: 340 / 2046, height: 1256 / 1535 },
  center: { left: 388 / 2046, top: 140 / 1535, width: 1272 / 2046, height: 1256 / 1535 },
  right: { left: 1658 / 2046, top: 140 / 1535, width: 338 / 2046, height: 1256 / 1535 },
};

const WALNUT_40_55_CROPS: ModuleCropSet = {
  left: { left: 170 / 2046, top: 176 / 1535, width: 400 / 2046, height: 1177 / 1535 },
  center: { left: 570 / 2046, top: 176 / 1535, width: 912 / 2046, height: 1177 / 1535 },
  right: { left: 1482 / 2046, top: 176 / 1535, width: 400 / 2046, height: 1177 / 1535 },
};

const WALNUT_58_65_CROPS: ModuleCropSet = {
  left: { left: 160 / 2046, top: 172 / 1535, width: 338 / 2046, height: 1176 / 1535 },
  center: { left: 498 / 2046, top: 172 / 1535, width: 1055 / 2046, height: 1176 / 1535 },
  right: { left: 1553 / 2046, top: 172 / 1535, width: 338 / 2046, height: 1176 / 1535 },
};

const WALNUT_70_75_CROPS: ModuleCropSet = {
  left: { left: 88 / 2046, top: 157 / 1535, width: 339 / 2046, height: 1217 / 1535 },
  center: { left: 427 / 2046, top: 157 / 1535, width: 1198 / 2046, height: 1217 / 1535 },
  right: { left: 1625 / 2046, top: 157 / 1535, width: 338 / 2046, height: 1217 / 1535 },
};

const WALNUT_77_85_CROPS: ModuleCropSet = {
  left: { left: 53 / 2046, top: 137 / 1535, width: 337 / 2046, height: 1255 / 1535 },
  center: { left: 390 / 2046, top: 137 / 1535, width: 1271 / 2046, height: 1255 / 1535 },
  right: { left: 1661 / 2046, top: 137 / 1535, width: 337 / 2046, height: 1255 / 1535 },
};

const DARK_OAK_40_55_CROPS: ModuleCropSet = {
  left: { left: 169 / 2046, top: 182 / 1535, width: 398 / 2046, height: 1171 / 1535 },
  center: { left: 567 / 2046, top: 182 / 1535, width: 912 / 2046, height: 1171 / 1535 },
  right: { left: 1479 / 2046, top: 182 / 1535, width: 398 / 2046, height: 1171 / 1535 },
};

const DARK_OAK_58_65_CROPS: ModuleCropSet = {
  left: { left: 160 / 2046, top: 177 / 1535, width: 336 / 2046, height: 1171 / 1535 },
  center: { left: 496 / 2046, top: 177 / 1535, width: 1055 / 2046, height: 1171 / 1535 },
  right: { left: 1551 / 2046, top: 177 / 1535, width: 336 / 2046, height: 1171 / 1535 },
};

const DARK_OAK_70_75_CROPS: ModuleCropSet = {
  left: { left: 88 / 2046, top: 162 / 1535, width: 336 / 2046, height: 1211 / 1535 },
  center: { left: 424 / 2046, top: 162 / 1535, width: 1198 / 2046, height: 1211 / 1535 },
  right: { left: 1622 / 2046, top: 162 / 1535, width: 336 / 2046, height: 1211 / 1535 },
};

const DARK_OAK_77_85_CROPS: ModuleCropSet = {
  left: { left: 52 / 2046, top: 143 / 1535, width: 336 / 2046, height: 1249 / 1535 },
  center: { left: 388 / 2046, top: 143 / 1535, width: 1270 / 2046, height: 1249 / 1535 },
  right: { left: 1658 / 2046, top: 143 / 1535, width: 336 / 2046, height: 1249 / 1535 },
};

const CASHMERE_40_55_CROPS: ModuleCropSet = {
  left: { left: 169 / 2046, top: 176 / 1535, width: 397 / 2046, height: 1177 / 1535 },
  center: { left: 567 / 2046, top: 176 / 1535, width: 912 / 2046, height: 1177 / 1535 },
  right: { left: 1479 / 2046, top: 176 / 1535, width: 398 / 2046, height: 1177 / 1535 },
};

const CASHMERE_58_65_CROPS: ModuleCropSet = {
  left: { left: 160 / 2046, top: 171 / 1535, width: 335 / 2046, height: 1177 / 1535 },
  center: { left: 496 / 2046, top: 171 / 1535, width: 1055 / 2046, height: 1177 / 1535 },
  right: { left: 1551 / 2046, top: 171 / 1535, width: 336 / 2046, height: 1177 / 1535 },
};

const CASHMERE_70_75_CROPS: ModuleCropSet = {
  left: { left: 88 / 2046, top: 157 / 1535, width: 335 / 2046, height: 1217 / 1535 },
  center: { left: 424 / 2046, top: 157 / 1535, width: 1198 / 2046, height: 1217 / 1535 },
  right: { left: 1622 / 2046, top: 157 / 1535, width: 336 / 2046, height: 1217 / 1535 },
};

const CASHMERE_77_85_CROPS: ModuleCropSet = {
  left: { left: 52 / 2046, top: 137 / 1535, width: 335 / 2046, height: 1255 / 1535 },
  center: { left: 388 / 2046, top: 137 / 1535, width: 1270 / 2046, height: 1255 / 1535 },
  right: { left: 1658 / 2046, top: 137 / 1535, width: 336 / 2046, height: 1255 / 1535 },
};

/**
 * Front views supplied for a specific finish and TV size. New photography can
 * be added here without changing the configurator rendering logic.
 */
export const CONFIGURATOR_MODULE_ASSETS: Record<
  string,
  Partial<Record<string, ConfiguratorModuleAsset>>
> = {
  Walnootbruin: {
    "40 - 55 inch": {
      source: walnut4055Front,
      crops: WALNUT_40_55_CROPS,
    },
    "58 - 65 inch": {
      source: walnut5865Front,
      crops: WALNUT_58_65_CROPS,
    },
    "70 - 75 inch": {
      source: walnut7075Front,
      crops: WALNUT_70_75_CROPS,
    },
    "77 - 85 inch": {
      source: walnut7785Front,
      crops: WALNUT_77_85_CROPS,
    },
  },
  Donkereiken: {
    "40 - 55 inch": {
      source: darkOak4055Front,
      crops: DARK_OAK_40_55_CROPS,
    },
    "58 - 65 inch": {
      source: darkOak5865Front,
      crops: DARK_OAK_58_65_CROPS,
    },
    "70 - 75 inch": {
      source: darkOak7075Front,
      crops: DARK_OAK_70_75_CROPS,
    },
    "77 - 85 inch": {
      source: darkOak7785Front,
      crops: DARK_OAK_77_85_CROPS,
    },
  },
  Cashmeregrijs: {
    "40 - 55 inch": {
      source: cashmere4055Front,
      crops: CASHMERE_40_55_CROPS,
    },
    "58 - 65 inch": {
      source: cashmere5865Front,
      crops: CASHMERE_58_65_CROPS,
    },
    "70 - 75 inch": {
      source: cashmere7075Front,
      crops: CASHMERE_70_75_CROPS,
    },
    "77 - 85 inch": {
      source: cashmere7785Front,
      crops: CASHMERE_77_85_CROPS,
    },
  },
  Kristalwit: {
    "40 - 55 inch": {
      source: crystalWhite4055Front,
      crops: CASHMERE_40_55_CROPS,
    },
    "58 - 65 inch": {
      source: crystalWhite5865Front,
      crops: CASHMERE_58_65_CROPS,
    },
    "70 - 75 inch": {
      source: crystalWhite7075Front,
      crops: CASHMERE_70_75_CROPS,
    },
    "77 - 85 inch": {
      source: crystalWhite7785Front,
      crops: CASHMERE_77_85_CROPS,
    },
  },
  Dofroze: {
    "40 - 55 inch": {
      source: dofroze4055Front,
      crops: DOFROZE_40_55_CROPS,
    },
    "58 - 65 inch": {
      source: dofroze5865Front,
      crops: DOFROZE_58_65_CROPS,
    },
    "70 - 75 inch": {
      source: dofroze7075Front,
      crops: DOFROZE_70_75_CROPS,
    },
    "77 - 85 inch": {
      source: dofroze7785Front,
      crops: DOFROZE_77_85_CROPS,
    },
  },
};

export function getConfiguratorModuleAsset(color: string, tvSize: string) {
  return CONFIGURATOR_MODULE_ASSETS[color]?.[tvSize] ?? null;
}

const moduleLabel = (position: ModulePosition) =>
  position === "center" ? "middenmodule" : `${position === "left" ? "linker" : "rechter"} module`;

export function CroppedModuleImage({
  color,
  position,
  source,
  animate = true,
  testId = true,
  className = "",
  crops = MODULE_CROPS,
  translateY = 0,
}: {
  color: string;
  position: ModulePosition;
  source: string;
  animate?: boolean;
  testId?: boolean;
  className?: string;
  crops?: ModuleCropSet;
  translateY?: number;
}) {
  const crop = crops[position];

  return (
    <div
      data-testid={testId ? `configurator-${position}-module` : undefined}
      className={`relative h-full shrink-0 overflow-hidden ${className}`}
      style={{
        aspectRatio: `${(crop.width * 4) / (crop.height * 3)}`,
        animation: animate ? MODULE_REVEAL : undefined,
        backfaceVisibility: "hidden",
        contain: "paint",
        transform: translateY ? `translateY(${translateY}px)` : undefined,
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
  crops = MODULE_CROPS,
  walnutSideOffsetY = -0.5,
}: {
  color: string;
  position: ModulePosition;
  source: string | null;
  animate?: boolean;
  testId?: boolean;
  className?: string;
  crops?: ModuleCropSet;
  walnutSideOffsetY?: number;
}) {
  const usesWalnutAsset = color === FULL_HOUSE_COLORS[0] && source === null;
  const walnutSideTranslateY =
    color === FULL_HOUSE_COLORS[0] && position !== "center" ? walnutSideOffsetY : 0;

  if (!usesWalnutAsset) {
    if (!source) return null;

    return (
      <CroppedModuleImage
        color={color}
        position={position}
        source={source}
        animate={animate}
        testId={testId}
        className={className}
        crops={crops}
        translateY={walnutSideTranslateY}
      />
    );
  }

  const walnutSource =
    position === "left"
      ? leftModule.url
      : position === "center"
        ? centerModule.url
        : rightModuleUrl;

  return (
    <Img
      src={walnutSource}
      alt={`Wandig ${moduleLabel(position)} in ${color}`}
      data-testid={testId ? `configurator-${position}-module` : undefined}
      className={`block h-full w-auto select-none ${className}`}
      style={{
        animation: animate ? MODULE_REVEAL : undefined,
        backfaceVisibility: "hidden",
        transform: walnutSideTranslateY
          ? `translateY(${walnutSideTranslateY}px)`
          : undefined,
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
  crops = MODULE_CROPS,
}: {
  color: string;
  source: string | null;
  hasLeft?: boolean;
  hasRight?: boolean;
  crops?: ModuleCropSet;
}) {
  const usesWalnutModules = color === FULL_HOUSE_COLORS[0] && source === null;

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
              crops={crops}
              walnutSideOffsetY={0.3}
            />
          )}
          <ConfiguratorModuleImage
            color={color}
            position="center"
            source={source}
            animate={false}
            testId={false}
            className="relative z-[2]"
            crops={crops}
          />
          {hasRight && (
            <ConfiguratorModuleImage
              color={color}
              position="right"
              source={source}
              animate={false}
              testId={false}
              className={`relative z-[1] ${usesWalnutModules ? "ml-[-11px]" : "ml-[-3px]"}`}
              crops={crops}
              walnutSideOffsetY={0.3}
            />
          )}
        </div>
      </div>
    </div>
  );
}
