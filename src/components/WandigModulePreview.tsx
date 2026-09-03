import { Img } from "@/components/Img";
import { FULL_HOUSE_COLORS } from "@/lib/wandig-colors";
import centerModule from "@/assets/center-module-trim.png.asset.json";
import leftModule from "@/assets/left-module-trim.png.asset.json";
import rightModuleUrlAsset from "@/assets/right-module-trim-tight-cropped.png.asset.json";
import dofroze4055Front from "@/assets/configurator/dofroze-40-55-front.webp";
import dofroze4055SingleClosed from "@/assets/configurator/dofroze-40-55-single-closed.png";
import dofroze5865Front from "@/assets/configurator/dofroze-58-65-front.webp";
import dofroze5865SingleClosed from "@/assets/configurator/dofroze-58-65-single-closed.png";
import dofroze7075Front from "@/assets/configurator/dofroze-70-75-front.webp";
import dofroze7075SingleClosed from "@/assets/configurator/dofroze-70-75-single-closed.png";
import dofroze7785Front from "@/assets/configurator/dofroze-77-85-front.png";
import dofroze7785SingleClosed from "@/assets/configurator/dofroze-77-85-single-closed.png";
import walnut4055Front from "@/assets/configurator/walnootbruin-40-55-front.png";
import walnut4055SingleClosed from "@/assets/configurator/walnootbruin-40-55-single-closed.jpg";
import walnut5865Front from "@/assets/configurator/walnootbruin-58-65-front.png";
import walnut5865SingleClosed from "@/assets/configurator/walnootbruin-58-65-single-closed.png";
import walnut7075Front from "@/assets/configurator/walnootbruin-70-75-front.png";
import walnut7075SingleClosed from "@/assets/configurator/walnootbruin-70-75-single-closed.png";
import walnut7785Front from "@/assets/configurator/walnootbruin-77-85-front.png";
import walnut7785SingleClosed from "@/assets/configurator/walnootbruin-77-85-single-closed.png";
import darkOak4055Front from "@/assets/configurator/donkereiken-40-55-front.png";
import darkOak4055SingleClosed from "@/assets/configurator/donkereiken-40-55-single-closed.png";
import darkOak5865Front from "@/assets/configurator/donkereiken-58-65-front.png";
import darkOak5865SingleClosed from "@/assets/configurator/donkereiken-58-65-single-closed.png";
import darkOak7075Front from "@/assets/configurator/donkereiken-70-75-front.png";
import darkOak7075SingleClosed from "@/assets/configurator/donkereiken-70-75-single-closed.png";
import darkOak7785Front from "@/assets/configurator/donkereiken-77-85-front.png";
import darkOak7785SingleClosed from "@/assets/configurator/donkereiken-77-85-single-closed.png";
import cashmere4055Front from "@/assets/configurator/cashmeregrijs-40-55-front.png";
import cashmere4055SingleClosed from "@/assets/configurator/cashmeregrijs-40-55-single-closed.png";
import cashmere5865Front from "@/assets/configurator/cashmeregrijs-58-65-front.png";
import cashmere5865SingleClosed from "@/assets/configurator/cashmeregrijs-58-65-single-closed.png";
import cashmere7075Front from "@/assets/configurator/cashmeregrijs-70-75-front.png";
import cashmere7075SingleClosed from "@/assets/configurator/cashmeregrijs-70-75-single-closed.png";
import cashmere7785Front from "@/assets/configurator/cashmeregrijs-77-85-front.png";
import cashmere7785SingleClosed from "@/assets/configurator/cashmeregrijs-77-85-single-closed.png";
import crystalWhite4055Front from "@/assets/configurator/kristalwit-40-55-front.png";
import crystalWhite4055SingleClosed from "@/assets/configurator/kristalwit-40-55-single-closed.png";
import crystalWhite5865Front from "@/assets/configurator/kristalwit-58-65-front.png";
import crystalWhite5865SingleClosed from "@/assets/configurator/kristalwit-58-65-single-closed.png";
import crystalWhite7075Front from "@/assets/configurator/kristalwit-70-75-front.png";
import crystalWhite7075SingleClosed from "@/assets/configurator/kristalwit-70-75-single-closed.png";
import crystalWhite7785Front from "@/assets/configurator/kristalwit-77-85-front.png";
import crystalWhite7785SingleClosed from "@/assets/configurator/kristalwit-77-85-single-closed.png";
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
  specCrops?: ModuleCropSet;
  positionAssets?: Partial<
    Record<
      ModulePosition,
      {
        source: string;
        crop: ModuleCrop;
        heightAdjustmentPx?: number;
        bottomTrimPx?: number;
        offsetYPx?: number;
        specHeightAdjustmentPx?: number;
        specBottomTrimPx?: number;
        specOffsetYPx?: number;
      }
    >
  >;
};

export const MODULE_CROPS: ModuleCropSet = {
  left: { left: 0.19, top: 0.182, width: 0.144, height: 0.569 },
  center: { left: 0.334, top: 0.182, width: 0.331, height: 0.569 },
  right: { left: 0.665, top: 0.182, width: 0.147, height: 0.569 },
};

const DOFROZE_40_55_CROPS: ModuleCropSet = {
  left: { left: 330 / 4000, top: 354 / 3000, width: 797 / 4000, height: 2292 / 3000 },
  center: { left: 1121.5 / 4000, top: 354 / 3000, width: 1756 / 4000, height: 2292 / 3000 },
  right: { left: 2872 / 4000, top: 354 / 3000, width: 797 / 4000, height: 2292 / 3000 },
};

const DOFROZE_40_55_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: dofroze4055SingleClosed,
    crop: { left: 315 / 2048, top: 176 / 1536, width: 254 / 2048, height: 1176 / 1536 },
  },
  right: {
    source: dofroze4055SingleClosed,
    crop: { left: 1482 / 2048, top: 176 / 1536, width: 256 / 2048, height: 1176 / 1536 },
  },
};

const DOFROZE_58_65_CROPS: ModuleCropSet = {
  left: { left: 312 / 4000, top: 345 / 3000, width: 675 / 4000, height: 2292 / 3000 },
  center: { left: 973.5 / 4000, top: 345 / 3000, width: 2052 / 4000, height: 2292 / 3000 },
  right: { left: 3012 / 4000, top: 345 / 3000, width: 675 / 4000, height: 2292 / 3000 },
};

const DOFROZE_58_65_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: dofroze5865SingleClosed,
    crop: { left: 282 / 2048, top: 172 / 1536, width: 216 / 2048, height: 1176 / 1536 },
    offsetYPx: -1,
  },
  right: {
    source: dofroze5865SingleClosed,
    crop: { left: 1555 / 2048, top: 172 / 1536, width: 217 / 2048, height: 1176 / 1536 },
    offsetYPx: -1,
  },
};

const DOFROZE_70_75_CROPS: ModuleCropSet = {
  left: { left: 172 / 4000, top: 316 / 3000, width: 675 / 4000, height: 2369 / 3000 },
  center: { left: 833.5 / 4000, top: 316 / 3000, width: 2332.5 / 4000, height: 2369 / 3000 },
  right: { left: 3152 / 4000, top: 316 / 3000, width: 675 / 4000, height: 2369 / 3000 },
};

const DOFROZE_70_75_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: dofroze7075SingleClosed,
    crop: { left: 210 / 2048, top: 157 / 1536, width: 216 / 2048, height: 1215 / 1536 },
  },
  right: {
    source: dofroze7075SingleClosed,
    crop: { left: 1626 / 2048, top: 157 / 1536, width: 217 / 2048, height: 1215 / 1536 },
  },
};

const DOFROZE_77_85_CROPS: ModuleCropSet = {
  left: { left: 50 / 2046, top: 140 / 1535, width: 340 / 2046, height: 1256 / 1535 },
  center: { left: 386.5 / 2046, top: 140 / 1535, width: 1274 / 2046, height: 1256 / 1535 },
  right: { left: 1658 / 2046, top: 140 / 1535, width: 338 / 2046, height: 1256 / 1535 },
};

const DOFROZE_77_85_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: dofroze7785SingleClosed,
    crop: { left: 174 / 2048, top: 137 / 1536, width: 216 / 2048, height: 1255 / 1536 },
  },
  right: {
    source: dofroze7785SingleClosed,
    crop: { left: 1662 / 2048, top: 137 / 1536, width: 217 / 2048, height: 1255 / 1536 },
  },
};

const DOFROZE_77_85_SPEC_CROPS: ModuleCropSet = {
  ...DOFROZE_77_85_CROPS,
  center: {
    ...DOFROZE_77_85_CROPS.center,
    left: 384.5 / 2046,
    width: 1278 / 2046,
  },
};

const WALNUT_40_55_CROPS: ModuleCropSet = {
  left: { left: 170 / 2046, top: 176 / 1535, width: 400 / 2046, height: 1177 / 1535 },
  center: { left: 570 / 2046, top: 176 / 1535, width: 912 / 2046, height: 1177 / 1535 },
  right: { left: 1482 / 2046, top: 176 / 1535, width: 400 / 2046, height: 1177 / 1535 },
};

/**
 * The supplied 40–55 inch photo is used only for the side modules. The inner
 * vertical posts are excluded because those already belong to the existing
 * center module.
 */
const WALNUT_40_55_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: walnut4055SingleClosed,
    crop: { left: 612 / 4000, top: 354 / 3000, width: 502 / 4000, height: 2292 / 3000 },
    heightAdjustmentPx: -1.5,
    bottomTrimPx: 1,
    offsetYPx: -0.2,
    specHeightAdjustmentPx: -1.5,
  },
  right: {
    source: walnut4055SingleClosed,
    crop: { left: 2886 / 4000, top: 354 / 3000, width: 502 / 4000, height: 2292 / 3000 },
    heightAdjustmentPx: -1.5,
    bottomTrimPx: 1,
    offsetYPx: -0.2,
    specHeightAdjustmentPx: -1.5,
  },
};

const WALNUT_58_65_CROPS: ModuleCropSet = {
  left: { left: 160 / 2046, top: 172 / 1535, width: 338 / 2046, height: 1176 / 1535 },
  center: { left: 498 / 2046, top: 172 / 1535, width: 1055 / 2046, height: 1176 / 1535 },
  right: { left: 1553 / 2046, top: 172 / 1535, width: 338 / 2046, height: 1176 / 1535 },
};

const WALNUT_58_65_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: walnut5865SingleClosed,
    crop: { left: 282 / 2048, top: 172 / 1536, width: 217 / 2048, height: 1175 / 1536 },
  },
  right: {
    source: walnut5865SingleClosed,
    crop: { left: 1555 / 2048, top: 172 / 1536, width: 217 / 2048, height: 1175 / 1536 },
  },
};

const WALNUT_70_75_CROPS: ModuleCropSet = {
  left: { left: 88 / 2046, top: 157 / 1535, width: 339 / 2046, height: 1217 / 1535 },
  center: { left: 427 / 2046, top: 157 / 1535, width: 1198 / 2046, height: 1217 / 1535 },
  right: { left: 1625 / 2046, top: 157 / 1535, width: 338 / 2046, height: 1217 / 1535 },
};

const WALNUT_70_75_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: walnut7075SingleClosed,
    crop: { left: 211 / 2048, top: 157 / 1536, width: 216 / 2048, height: 1215 / 1536 },
  },
  right: {
    source: walnut7075SingleClosed,
    crop: { left: 1626 / 2048, top: 157 / 1536, width: 217 / 2048, height: 1215 / 1536 },
  },
};

const WALNUT_77_85_CROPS: ModuleCropSet = {
  left: { left: 53 / 2046, top: 137 / 1535, width: 337 / 2046, height: 1255 / 1535 },
  center: { left: 390 / 2046, top: 137 / 1535, width: 1271 / 2046, height: 1255 / 1535 },
  right: { left: 1661 / 2046, top: 137 / 1535, width: 337 / 2046, height: 1255 / 1535 },
};

const WALNUT_77_85_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: walnut7785SingleClosed,
    crop: { left: 174 / 2048, top: 137 / 1536, width: 216 / 2048, height: 1255 / 1536 },
  },
  right: {
    source: walnut7785SingleClosed,
    crop: { left: 1662 / 2048, top: 137 / 1536, width: 217 / 2048, height: 1255 / 1536 },
  },
};

const DARK_OAK_40_55_CROPS: ModuleCropSet = {
  left: { left: 169 / 2046, top: 182 / 1535, width: 398 / 2046, height: 1171 / 1535 },
  center: { left: 567 / 2046, top: 182 / 1535, width: 912 / 2046, height: 1171 / 1535 },
  right: { left: 1479 / 2046, top: 182 / 1535, width: 398 / 2046, height: 1171 / 1535 },
};

const DARK_OAK_40_55_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: darkOak4055SingleClosed,
    crop: { left: 315 / 2048, top: 176 / 1536, width: 254 / 2048, height: 1177 / 1536 },
    heightAdjustmentPx: 1.4,
    offsetYPx: 0.4,
    specHeightAdjustmentPx: 0.4,
    specOffsetYPx: 0.2,
  },
  right: {
    source: darkOak4055SingleClosed,
    crop: { left: 1482 / 2048, top: 176 / 1536, width: 256 / 2048, height: 1177 / 1536 },
    heightAdjustmentPx: 1.6,
    offsetYPx: 0.4,
    specHeightAdjustmentPx: 0.4,
    specOffsetYPx: 0.2,
  },
};

const DARK_OAK_58_65_CROPS: ModuleCropSet = {
  left: { left: 160 / 2046, top: 177 / 1535, width: 336 / 2046, height: 1171 / 1535 },
  center: { left: 496 / 2046, top: 177 / 1535, width: 1055 / 2046, height: 1171 / 1535 },
  right: { left: 1551 / 2046, top: 177 / 1535, width: 336 / 2046, height: 1171 / 1535 },
};

const DARK_OAK_58_65_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: darkOak5865SingleClosed,
    crop: { left: 282 / 2048, top: 172 / 1536, width: 216 / 2048, height: 1175 / 1536 },
    heightAdjustmentPx: 1.4,
    specHeightAdjustmentPx: 0.5,
    specOffsetYPx: 0.5,
  },
  right: {
    source: darkOak5865SingleClosed,
    crop: { left: 1555 / 2048, top: 172 / 1536, width: 216 / 2048, height: 1175 / 1536 },
    heightAdjustmentPx: 1.6,
    specHeightAdjustmentPx: 0.5,
    specOffsetYPx: 0.5,
  },
};

const DARK_OAK_70_75_CROPS: ModuleCropSet = {
  left: { left: 88 / 2046, top: 162 / 1535, width: 336 / 2046, height: 1211 / 1535 },
  center: { left: 424 / 2046, top: 162 / 1535, width: 1198 / 2046, height: 1211 / 1535 },
  right: { left: 1622 / 2046, top: 162 / 1535, width: 336 / 2046, height: 1211 / 1535 },
};

const DARK_OAK_70_75_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: darkOak7075SingleClosed,
    crop: { left: 211 / 2048, top: 157 / 1536, width: 216 / 2048, height: 1215 / 1536 },
    heightAdjustmentPx: 1.4,
    offsetYPx: 0.3,
    specHeightAdjustmentPx: 0.5,
    specOffsetYPx: 0.5,
  },
  right: {
    source: darkOak7075SingleClosed,
    crop: { left: 1626 / 2048, top: 157 / 1536, width: 217 / 2048, height: 1215 / 1536 },
    heightAdjustmentPx: 1.6,
    offsetYPx: 0.3,
    specHeightAdjustmentPx: 0.5,
    specOffsetYPx: 0.5,
  },
};

const DARK_OAK_77_85_CROPS: ModuleCropSet = {
  left: { left: 52 / 2046, top: 143 / 1535, width: 336 / 2046, height: 1249 / 1535 },
  center: { left: 388 / 2046, top: 143 / 1535, width: 1270 / 2046, height: 1249 / 1535 },
  right: { left: 1658 / 2046, top: 143 / 1535, width: 336 / 2046, height: 1249 / 1535 },
};

const DARK_OAK_77_85_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: darkOak7785SingleClosed,
    crop: { left: 174 / 2048, top: 137 / 1536, width: 216 / 2048, height: 1255 / 1536 },
    heightAdjustmentPx: 1.4,
    offsetYPx: 0.3,
    specHeightAdjustmentPx: 0.5,
    specOffsetYPx: 1,
  },
  right: {
    source: darkOak7785SingleClosed,
    crop: { left: 1662 / 2048, top: 137 / 1536, width: 217 / 2048, height: 1255 / 1536 },
    heightAdjustmentPx: 1.6,
    offsetYPx: 0.3,
    specHeightAdjustmentPx: 0.5,
    specOffsetYPx: 1,
  },
};

const CASHMERE_40_55_CROPS: ModuleCropSet = {
  left: { left: 169 / 2046, top: 176 / 1535, width: 398 / 2046, height: 1177 / 1535 },
  center: { left: 567 / 2046, top: 176 / 1535, width: 912 / 2046, height: 1177 / 1535 },
  right: { left: 1479 / 2046, top: 176 / 1535, width: 398 / 2046, height: 1177 / 1535 },
};

const CASHMERE_40_55_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: cashmere4055SingleClosed,
    crop: { left: 314 / 2048, top: 176 / 1536, width: 255 / 2048, height: 1177 / 1536 },
  },
  right: {
    source: cashmere4055SingleClosed,
    crop: { left: 1482 / 2048, top: 176 / 1536, width: 256 / 2048, height: 1177 / 1536 },
  },
};

const CASHMERE_58_65_CROPS: ModuleCropSet = {
  left: { left: 160 / 2046, top: 171 / 1535, width: 336 / 2046, height: 1177 / 1535 },
  center: { left: 496 / 2046, top: 171 / 1535, width: 1055 / 2046, height: 1177 / 1535 },
  right: { left: 1551 / 2046, top: 171 / 1535, width: 336 / 2046, height: 1177 / 1535 },
};

const CASHMERE_58_65_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: cashmere5865SingleClosed,
    crop: { left: 281 / 2048, top: 171 / 1536, width: 217 / 2048, height: 1177 / 1536 },
  },
  right: {
    source: cashmere5865SingleClosed,
    crop: { left: 1555 / 2048, top: 171 / 1536, width: 217 / 2048, height: 1177 / 1536 },
  },
};

const CASHMERE_70_75_CROPS: ModuleCropSet = {
  left: { left: 88 / 2046, top: 157 / 1535, width: 336 / 2046, height: 1217 / 1535 },
  center: { left: 424 / 2046, top: 157 / 1535, width: 1198 / 2046, height: 1217 / 1535 },
  right: { left: 1622 / 2046, top: 157 / 1535, width: 336 / 2046, height: 1217 / 1535 },
};

const CASHMERE_70_75_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: cashmere7075SingleClosed,
    crop: { left: 209 / 2048, top: 157 / 1536, width: 217 / 2048, height: 1216 / 1536 },
  },
  right: {
    source: cashmere7075SingleClosed,
    crop: { left: 1626 / 2048, top: 157 / 1536, width: 218 / 2048, height: 1216 / 1536 },
  },
};

const CASHMERE_77_85_CROPS: ModuleCropSet = {
  left: { left: 52 / 2046, top: 137 / 1535, width: 336 / 2046, height: 1255 / 1535 },
  center: { left: 388 / 2046, top: 137 / 1535, width: 1270 / 2046, height: 1255 / 1535 },
  right: { left: 1658 / 2046, top: 137 / 1535, width: 336 / 2046, height: 1255 / 1535 },
};

const CASHMERE_77_85_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: cashmere7785SingleClosed,
    crop: { left: 173 / 2048, top: 137 / 1536, width: 217 / 2048, height: 1255 / 1536 },
  },
  right: {
    source: cashmere7785SingleClosed,
    crop: { left: 1662 / 2048, top: 137 / 1536, width: 218 / 2048, height: 1255 / 1536 },
  },
};

/** Cashmeregrijs needs 3px trimmed from the left edge of the center module. */
const trimCenterLeft = (crops: ModuleCropSet, px: number): ModuleCropSet => ({
  ...crops,
  center: {
    ...crops.center,
    left: crops.center.left + px / 2046,
    width: crops.center.width - px / 2046,
  },
});

const CASHMERE_TRIM_40_55_CROPS = trimCenterLeft(CASHMERE_40_55_CROPS, 3);
const CASHMERE_TRIM_58_65_CROPS = trimCenterLeft(CASHMERE_58_65_CROPS, 3);
const CASHMERE_TRIM_70_75_CROPS = trimCenterLeft(CASHMERE_70_75_CROPS, 3);
const CASHMERE_TRIM_77_85_CROPS = trimCenterLeft(CASHMERE_77_85_CROPS, 3);

const CRYSTAL_WHITE_40_55_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: crystalWhite4055SingleClosed,
    crop: { left: 312 / 2048, top: 176 / 1536, width: 257 / 2048, height: 1179 / 1536 },
  },
  right: {
    source: crystalWhite4055SingleClosed,
    crop: { left: 1482 / 2048, top: 176 / 1536, width: 256 / 2048, height: 1179 / 1536 },
  },
};

const CRYSTAL_WHITE_58_65_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: crystalWhite5865SingleClosed,
    crop: { left: 278 / 2048, top: 171 / 1536, width: 220 / 2048, height: 1179 / 1536 },
  },
  right: {
    source: crystalWhite5865SingleClosed,
    crop: { left: 1555 / 2048, top: 171 / 1536, width: 218 / 2048, height: 1179 / 1536 },
  },
};

const CRYSTAL_WHITE_70_75_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: crystalWhite7075SingleClosed,
    crop: { left: 207 / 2048, top: 156 / 1536, width: 219 / 2048, height: 1218 / 1536 },
  },
  right: {
    source: crystalWhite7075SingleClosed,
    crop: { left: 1626 / 2048, top: 156 / 1536, width: 219 / 2048, height: 1218 / 1536 },
  },
};

const CRYSTAL_WHITE_77_85_SIDE_ASSETS: NonNullable<ConfiguratorModuleAsset["positionAssets"]> = {
  left: {
    source: crystalWhite7785SingleClosed,
    crop: { left: 171 / 2048, top: 137 / 1536, width: 219 / 2048, height: 1257 / 1536 },
  },
  right: {
    source: crystalWhite7785SingleClosed,
    crop: { left: 1662 / 2048, top: 137 / 1536, width: 221 / 2048, height: 1257 / 1536 },
  },
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
      positionAssets: WALNUT_40_55_SIDE_ASSETS,
    },
    "58 - 65 inch": {
      source: walnut5865Front,
      crops: WALNUT_58_65_CROPS,
      positionAssets: WALNUT_58_65_SIDE_ASSETS,
    },
    "70 - 75 inch": {
      source: walnut7075Front,
      crops: WALNUT_70_75_CROPS,
      positionAssets: WALNUT_70_75_SIDE_ASSETS,
    },
    "77 - 85 inch": {
      source: walnut7785Front,
      crops: WALNUT_77_85_CROPS,
      positionAssets: WALNUT_77_85_SIDE_ASSETS,
    },
  },
  Donkereiken: {
    "40 - 55 inch": {
      source: darkOak4055Front,
      crops: DARK_OAK_40_55_CROPS,
      positionAssets: DARK_OAK_40_55_SIDE_ASSETS,
    },
    "58 - 65 inch": {
      source: darkOak5865Front,
      crops: DARK_OAK_58_65_CROPS,
      positionAssets: DARK_OAK_58_65_SIDE_ASSETS,
    },
    "70 - 75 inch": {
      source: darkOak7075Front,
      crops: DARK_OAK_70_75_CROPS,
      positionAssets: DARK_OAK_70_75_SIDE_ASSETS,
    },
    "77 - 85 inch": {
      source: darkOak7785Front,
      crops: DARK_OAK_77_85_CROPS,
      positionAssets: DARK_OAK_77_85_SIDE_ASSETS,
    },
  },
  Cashmeregrijs: {
    "40 - 55 inch": {
      source: cashmere4055Front,
      crops: CASHMERE_TRIM_40_55_CROPS,
      positionAssets: CASHMERE_40_55_SIDE_ASSETS,
    },
    "58 - 65 inch": {
      source: cashmere5865Front,
      crops: CASHMERE_TRIM_58_65_CROPS,
      positionAssets: CASHMERE_58_65_SIDE_ASSETS,
    },
    "70 - 75 inch": {
      source: cashmere7075Front,
      crops: CASHMERE_TRIM_70_75_CROPS,
      positionAssets: CASHMERE_70_75_SIDE_ASSETS,
    },
    "77 - 85 inch": {
      source: cashmere7785Front,
      crops: CASHMERE_TRIM_77_85_CROPS,
      positionAssets: CASHMERE_77_85_SIDE_ASSETS,
    },
  },
  Kristalwit: {
    "40 - 55 inch": {
      source: crystalWhite4055Front,
      crops: CASHMERE_40_55_CROPS,
      positionAssets: CRYSTAL_WHITE_40_55_SIDE_ASSETS,
    },
    "58 - 65 inch": {
      source: crystalWhite5865Front,
      crops: CASHMERE_58_65_CROPS,
      positionAssets: CRYSTAL_WHITE_58_65_SIDE_ASSETS,
    },
    "70 - 75 inch": {
      source: crystalWhite7075Front,
      crops: CASHMERE_70_75_CROPS,
      positionAssets: CRYSTAL_WHITE_70_75_SIDE_ASSETS,
    },
    "77 - 85 inch": {
      source: crystalWhite7785Front,
      crops: CASHMERE_77_85_CROPS,
      positionAssets: CRYSTAL_WHITE_77_85_SIDE_ASSETS,
    },
  },
  Dofroze: {
    "40 - 55 inch": {
      source: dofroze4055Front,
      crops: DOFROZE_40_55_CROPS,
      positionAssets: DOFROZE_40_55_SIDE_ASSETS,
    },
    "58 - 65 inch": {
      source: dofroze5865Front,
      crops: DOFROZE_58_65_CROPS,
      positionAssets: DOFROZE_58_65_SIDE_ASSETS,
    },
    "70 - 75 inch": {
      source: dofroze7075Front,
      crops: DOFROZE_70_75_CROPS,
      positionAssets: DOFROZE_70_75_SIDE_ASSETS,
    },
    "77 - 85 inch": {
      source: dofroze7785Front,
      crops: DOFROZE_77_85_CROPS,
      specCrops: DOFROZE_77_85_SPEC_CROPS,
      positionAssets: DOFROZE_77_85_SIDE_ASSETS,
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
  heightAdjustmentPx = 0,
  bottomTrimPx = 0,
}: {
  color: string;
  position: ModulePosition;
  source: string;
  animate?: boolean;
  testId?: boolean;
  className?: string;
  crops?: ModuleCropSet;
  translateY?: number;
  heightAdjustmentPx?: number;
  bottomTrimPx?: number;
}) {
  const crop = crops[position];

  return (
    <div
      data-testid={testId ? `configurator-${position}-module` : undefined}
      className={`relative h-full shrink-0 overflow-hidden ${className}`}
      style={{
        aspectRatio: `${(crop.width * 4) / (crop.height * 3)}`,
        height: heightAdjustmentPx ? `calc(100% + ${heightAdjustmentPx}px)` : undefined,
        clipPath: bottomTrimPx ? `inset(0 0 ${bottomTrimPx}px 0)` : undefined,
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
  sideOffsetY = 0,
  heightAdjustmentPx = 0,
  bottomTrimPx = 0,
}: {
  color: string;
  position: ModulePosition;
  source: string | null;
  animate?: boolean;
  testId?: boolean;
  className?: string;
  crops?: ModuleCropSet;
  walnutSideOffsetY?: number;
  sideOffsetY?: number;
  heightAdjustmentPx?: number;
  bottomTrimPx?: number;
}) {
  const usesWalnutAsset = color === FULL_HOUSE_COLORS[0] && source === null;
  const sideTranslateY =
    position === "center"
      ? 0
      : color === FULL_HOUSE_COLORS[0]
        ? walnutSideOffsetY
        : sideOffsetY;

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
        translateY={sideTranslateY}
        heightAdjustmentPx={heightAdjustmentPx}
        bottomTrimPx={bottomTrimPx}
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
        transform: sideTranslateY
          ? `translateY(${sideTranslateY}px)`
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
  positionAssets,
}: {
  color: string;
  source: string | null;
  hasLeft?: boolean;
  hasRight?: boolean;
  crops?: ModuleCropSet;
  positionAssets?: ConfiguratorModuleAsset["positionAssets"];
}) {
  const usesWalnutModules = color === FULL_HOUSE_COLORS[0] && source === null;
  const moduleSource = (position: ModulePosition) => positionAssets?.[position]?.source ?? source;
  const moduleCrops = (position: ModulePosition): ModuleCropSet =>
    positionAssets?.[position]
      ? { ...crops, [position]: positionAssets[position]!.crop }
      : crops;

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
      <div className="absolute inset-0 flex items-end justify-center pb-[12%]">
        <div className="flex h-[109%] translate-y-[30px] items-end">
          {hasLeft && (
            <ConfiguratorModuleImage
              color={color}
              position="left"
              source={moduleSource("left")}
              animate={false}
              testId={false}
              className="relative z-[1] mr-[-3px]"
              crops={moduleCrops("left")}
              heightAdjustmentPx={positionAssets?.left?.specHeightAdjustmentPx}
              bottomTrimPx={positionAssets?.left?.specBottomTrimPx}
              walnutSideOffsetY={positionAssets?.left?.specOffsetYPx ?? 0}
              sideOffsetY={positionAssets?.left?.specOffsetYPx ?? 0}
            />
          )}
          <ConfiguratorModuleImage
            color={color}
            position="center"
            source={moduleSource("center")}
            animate={false}
            testId={false}
            className="relative z-[2]"
            crops={moduleCrops("center")}
          />
          {hasRight && (
            <ConfiguratorModuleImage
              color={color}
              position="right"
              source={moduleSource("right")}
              animate={false}
              testId={false}
              className={`relative z-[1] ${usesWalnutModules ? "ml-[-11px]" : "ml-[-3px]"}`}
              crops={moduleCrops("right")}
              heightAdjustmentPx={positionAssets?.right?.specHeightAdjustmentPx}
              bottomTrimPx={positionAssets?.right?.specBottomTrimPx}
              walnutSideOffsetY={positionAssets?.right?.specOffsetYPx ?? 0}
              sideOffsetY={positionAssets?.right?.specOffsetYPx ?? 0}
            />
          )}
        </div>
      </div>
    </div>
  );
}
