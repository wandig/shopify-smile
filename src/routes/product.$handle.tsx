import { Img } from "@/components/Img";
import { showReviews } from "@/lib/features";
import { optimizeImageUrl } from "@/lib/asset-image";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { subscribeNewsletter } from "@/lib/api/newsletter.functions";
import { useState, useMemo, useEffect, useRef, type ReactNode } from "react";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { PaymentOptionsBadges } from "@/components/PaymentOptionsBadges";
import { FreeColorSamples } from "@/components/FreeColorSamples";
import { FULL_HOUSE_COLORS, displayWandigColor, wandigSwatchStyle } from "@/lib/wandig-colors";
import {
  FULL_HOUSE_FRONT_IMAGES,
  WandigSpecPreview,
  getConfiguratorModuleAsset,
} from "@/components/WandigModulePreview";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { WANDIG_SIZES, formatCm, wandigWidth } from "@/lib/wandig-dimensions";
import { SpecificationsSection, UniqueSection, BeforeAfterSection } from "@/components/ProductStorySections";
import beforeSoloAsset from "@/assets/before-solo.png.asset.json";
import afterSoloAsset from "@/assets/after-solo.jpg.asset.json";
import {
  CustomerGallerySection,
  BuiltToLastSection,
  FaqSection,
  ReviewsSection,
  NewsletterContactSection,
  TrustBannerSection,
  PuzzleCornerIcon,
} from "@/components/ProductPageSections";
import { SalePrice } from "@/components/SaleBadge";


import { Loader2, ChevronRight, ChevronLeft, ChevronDown, Plus, Star, Hammer, ShieldCheck, ShoppingBag, Truck, Plug, Phone, Headphones, Mail, Monitor, User, ArrowRight, Shield, Moon, CalendarClock, SlidersHorizontal, Ruler, MoveHorizontal, MoveVertical } from "lucide-react";
import detailMaatwerkImgAsset from "@/assets/detail-maatwerk.jpg.asset.json";
const detailMaatwerkImg = detailMaatwerkImgAsset.url;
import productStoryBlackOakOrangeImgAsset from "@/assets/product-story-black-oak-orange.jpg.asset.json";
const productStoryBlackOakOrangeImg = productStoryBlackOakOrangeImgAsset.url;
import wandigLogoWhite from "@/assets/wandig-logo-white.png";
import badgeLogo from "@/assets/dutch-design-winner-2026-v2.jpeg.asset.json";
import fullHouseGalleryMainAsset from "@/assets/full-house-closed-front-v10.png.asset.json";
const fullHouseGalleryMain = fullHouseGalleryMainAsset.url;
import fullHouseWalnoot7785Asset from "@/assets/full-house-walnoot-77-85.png.asset.json";
const fullHouseWalnoot7785 = fullHouseWalnoot7785Asset.url;
import fullHouseWalnoot7075Asset from "@/assets/full-house-walnoot-70-75.png.asset.json";
const fullHouseWalnoot7075 = fullHouseWalnoot7075Asset.url;
import fullHouseWalnoot4055Asset from "@/assets/full-house-walnoot-40-55.png.asset.json";
const fullHouseWalnoot4055 = fullHouseWalnoot4055Asset.url;
import fullHouseDonkerEiken7785Asset from "@/assets/full-house-donkereiken-77-85.png.asset.json";
const fullHouseDonkerEiken7785 = fullHouseDonkerEiken7785Asset.url;
import fullHouseDonkerEiken7075Asset from "@/assets/full-house-donkereiken-70-75.png.asset.json";
const fullHouseDonkerEiken7075 = fullHouseDonkerEiken7075Asset.url;
import fullHouseDonkerEiken5865Asset from "@/assets/full-house-donkereiken-58-65.png.asset.json";
const fullHouseDonkerEiken5865 = fullHouseDonkerEiken5865Asset.url;
import fullHouseDonkerEiken4055Asset from "@/assets/full-house-donkereiken-40-55.png.asset.json";
const fullHouseDonkerEiken4055 = fullHouseDonkerEiken4055Asset.url;
import fullHouseCashmere7785Asset from "@/assets/full-house-cashmeregrijs-77-85.png.asset.json";
const fullHouseCashmere7785 = fullHouseCashmere7785Asset.url;
import fullHouseCashmere7785OpenAsset from "@/assets/full-house-cashmeregrijs-77-85-open.png.asset.json";
const fullHouseCashmere7785Open = fullHouseCashmere7785OpenAsset.url;
import fullHouseCashmere7075Asset from "@/assets/full-house-cashmeregrijs-70-75.png.asset.json";
const fullHouseCashmere7075 = fullHouseCashmere7075Asset.url;
import fullHouseCashmere7075OpenAsset from "@/assets/full-house-cashmeregrijs-70-75-open.png.asset.json";
const fullHouseCashmere7075Open = fullHouseCashmere7075OpenAsset.url;
import fullHouseCashmere5865Asset from "@/assets/full-house-cashmeregrijs-58-65.png.asset.json";
const fullHouseCashmere5865 = fullHouseCashmere5865Asset.url;
import fullHouseCashmere5865OpenAsset from "@/assets/full-house-cashmeregrijs-58-65-open.png.asset.json";
const fullHouseCashmere5865Open = fullHouseCashmere5865OpenAsset.url;
import fullHouseCashmere4055Asset from "@/assets/full-house-cashmeregrijs-40-55.png.asset.json";
const fullHouseCashmere4055 = fullHouseCashmere4055Asset.url;
import fullHouseCashmere4055OpenAsset from "@/assets/full-house-cashmeregrijs-40-55-open.png.asset.json";
const fullHouseCashmere4055Open = fullHouseCashmere4055OpenAsset.url;
import fullHouseDofroze7785Asset from "@/assets/full-house-dofroze-77-85-nobg.png.asset.json";
const fullHouseDofroze7785 = fullHouseDofroze7785Asset.url;
import fullHouseDofroze7785OpenAsset from "@/assets/full-house-dofroze-77-85-open-nobg.png.asset.json";
const fullHouseDofroze7785Open = fullHouseDofroze7785OpenAsset.url;
import fullHouseKristalwit7785Asset from "@/assets/full-house-kristalwit-77-85.png.asset.json";
const fullHouseKristalwit7785 = fullHouseKristalwit7785Asset.url;
import fullHouseKristalwit7785OpenAsset from "@/assets/full-house-kristalwit-77-85-open.png.asset.json";
const fullHouseKristalwit7785Open = fullHouseKristalwit7785OpenAsset.url;
import fullHouseKristalwit7075Asset from "@/assets/full-house-kristalwit-70-75.png.asset.json";
const fullHouseKristalwit7075 = fullHouseKristalwit7075Asset.url;
import fullHouseKristalwit7075OpenAsset from "@/assets/full-house-kristalwit-70-75-open.png.asset.json";
const fullHouseKristalwit7075Open = fullHouseKristalwit7075OpenAsset.url;
import fullHouseKristalwit5865Asset from "@/assets/full-house-kristalwit-58-65.png.asset.json";
const fullHouseKristalwit5865 = fullHouseKristalwit5865Asset.url;
import fullHouseKristalwit5865OpenAsset from "@/assets/full-house-kristalwit-58-65-open.png.asset.json";
const fullHouseKristalwit5865Open = fullHouseKristalwit5865OpenAsset.url;
import fullHouseKristalwit4055Asset from "@/assets/full-house-kristalwit-40-55.png.asset.json";
const fullHouseKristalwit4055 = fullHouseKristalwit4055Asset.url;
import fullHouseKristalwit4055OpenAsset from "@/assets/full-house-kristalwit-40-55-open.png.asset.json";
const fullHouseKristalwit4055Open = fullHouseKristalwit4055OpenAsset.url;
import fullHouseDofroze7075Asset from "@/assets/full-house-dofroze-70-75-nobg.png.asset.json";
const fullHouseDofroze7075 = fullHouseDofroze7075Asset.url;
import fullHouseDofroze7075OpenAsset from "@/assets/full-house-dofroze-70-75-open-nobg.png.asset.json";
const fullHouseDofroze7075Open = fullHouseDofroze7075OpenAsset.url;
import fullHouseDofroze5865Asset from "@/assets/full-house-dofroze-58-65-new.png.asset.json";
import fullHouseDofroze5865OpenAsset from "@/assets/full-house-dofroze-58-65-open-new.png.asset.json";
const fullHouseDofroze5865 = fullHouseDofroze5865Asset.url;
const fullHouseDofroze5865Open = fullHouseDofroze5865OpenAsset.url;
import fullHouseDofroze4055Asset from "@/assets/full-house-dofroze-40-55-nobg.png.asset.json";
const fullHouseDofroze4055 = fullHouseDofroze4055Asset.url;
import fullHouseDofroze4055OpenAsset from "@/assets/full-house-dofroze-40-55-open-nobg.png.asset.json";
const fullHouseDofroze4055Open = fullHouseDofroze4055OpenAsset.url;
import fullHouseWalnoot5865Asset from "@/assets/full-house-walnoot-58-65.png.asset.json";
const fullHouseWalnoot5865 = fullHouseWalnoot5865Asset.url;
import fullHouseGalleryRoomAsset from "@/assets/full-house-gallery-room.jpg.asset.json";
const fullHouseGalleryRoom = fullHouseGalleryRoomAsset.url;
import fullHouseGalleryStylingOneAsset from "@/assets/full-house-gallery-styling-one.webp.asset.json";
const fullHouseGalleryStylingOne = fullHouseGalleryStylingOneAsset.url;
import fullHouseGalleryStylingTwoAsset from "@/assets/full-house-gallery-styling-two.webp.asset.json";
const fullHouseGalleryStylingTwo = fullHouseGalleryStylingTwoAsset.url;
import fullHouseGalleryFinishAsset from "@/assets/full-house-gallery-finish.webp.asset.json";
const fullHouseGalleryFinish = fullHouseGalleryFinishAsset.url;
import fullHouseGalleryStorageAsset from "@/assets/full-house-gallery-storage.webp.asset.json";
const fullHouseGalleryStorage = fullHouseGalleryStorageAsset.url;
import fullHouseGalleryUseAsset from "@/assets/full-house-gallery-use.webp.asset.json";
const fullHouseGalleryUse = fullHouseGalleryUseAsset.url;
import beforeFullHouseAsset from "@/assets/before-livingroom.png.asset.json";
import afterFullHouseAsset from "@/assets/after-livingroom.jpg.asset.json";
import soloWoonkamerLampAsset from "@/assets/solo-woonkamer-lamp.jpeg.asset.json";
import soloWalnoot7785Asset from "@/assets/solo-walnoot-7785.png.asset.json";
import soloWalnoot7785OpenAsset from "@/assets/solo-walnoot-7785-open.png.asset.json";
import soloWalnoot7075Asset from "@/assets/solo-walnoot-7075.png.asset.json";
import soloWalnoot7075OpenAsset from "@/assets/solo-walnoot-7075-open.png.asset.json";
import soloWalnoot5865Asset from "@/assets/solo-walnoot-5865.png.asset.json";
import soloWalnoot5865OpenAsset from "@/assets/solo-walnoot-5865-open.png.asset.json";
import soloWalnoot4055Asset from "@/assets/solo-walnoot-4055.png.asset.json";
import soloWalnoot4055OpenAsset from "@/assets/solo-walnoot-4055-open.png.asset.json";
import soloDonkereiken7785Asset from "@/assets/solo-donkereiken-7785.png.asset.json";
import soloDonkereiken7785OpenAsset from "@/assets/solo-donkereiken-7785-open.png.asset.json";
import soloDonkereiken7075Asset from "@/assets/solo-donkereiken-7075.png.asset.json";
import soloDonkereiken7075OpenAsset from "@/assets/solo-donkereiken-7075-open.png.asset.json";
import soloDonkereiken5865Asset from "@/assets/solo-donkereiken-5865.png.asset.json";
import soloDonkereiken5865OpenAsset from "@/assets/solo-donkereiken-5865-open.png.asset.json";
import soloDonkereiken4055Asset from "@/assets/solo-donkereiken-4055.png.asset.json";
import soloDonkereiken4055OpenAsset from "@/assets/solo-donkereiken-4055-open.png.asset.json";
import soloCashmere7785Asset from "@/assets/solo-cashmeregrijs-7785.png.asset.json";
import soloCashmere7785OpenAsset from "@/assets/solo-cashmeregrijs-7785-open.png.asset.json";
import soloCashmere7075Asset from "@/assets/solo-cashmeregrijs-7075.png.asset.json";
import soloCashmere7075OpenAsset from "@/assets/solo-cashmeregrijs-7075-open.png.asset.json";
import soloCashmere5865Asset from "@/assets/solo-cashmeregrijs-5865.png.asset.json";
import soloCashmere5865OpenAsset from "@/assets/solo-cashmeregrijs-5865-open.png.asset.json";
import soloCashmere4055Asset from "@/assets/solo-cashmeregrijs-4055.png.asset.json";
import soloCashmere4055OpenAsset from "@/assets/solo-cashmeregrijs-4055-open.png.asset.json";
import soloDofroze7785Asset from "@/assets/solo-dofroze-7785.png.asset.json";
import soloDofroze7785OpenAsset from "@/assets/solo-dofroze-7785-open.png.asset.json";
import soloDofroze7075Asset from "@/assets/solo-dofroze-7075.png.asset.json";
import soloDofroze7075OpenAsset from "@/assets/solo-dofroze-7075-open.png.asset.json";
import soloDofroze5865Asset from "@/assets/solo-dofroze-5865.png.asset.json";
import soloDofroze5865OpenAsset from "@/assets/solo-dofroze-5865-open.png.asset.json";
import soloDofroze4055Asset from "@/assets/solo-dofroze-4055.png.asset.json";
import soloDofroze4055OpenAsset from "@/assets/solo-dofroze-4055-open.png.asset.json";
import soloKristalwit7785Asset from "@/assets/solo-kristalwit-7785.png.asset.json";
import soloKristalwit7785OpenAsset from "@/assets/solo-kristalwit-7785-open.png.asset.json";
import soloKristalwit7075Asset from "@/assets/solo-kristalwit-7075.png.asset.json";
import soloKristalwit7075OpenAsset from "@/assets/solo-kristalwit-7075-open.png.asset.json";
import soloKristalwit5865Asset from "@/assets/solo-kristalwit-5865.png.asset.json";
import soloKristalwit5865OpenAsset from "@/assets/solo-kristalwit-5865-open.png.asset.json";
import soloKristalwit4055Asset from "@/assets/solo-kristalwit-4055.png.asset.json";
import soloKristalwit4055OpenAsset from "@/assets/solo-kristalwit-4055-open.png.asset.json";
import duoWalnootbruinLinks4055Asset from "@/assets/duo-walnootbruin-links-40-55.png.asset.json";
import duoWalnootbruinLinks5865Asset from "@/assets/duo-walnootbruin-links-58-65.png.asset.json";
import duoWalnootbruinLinks7075Asset from "@/assets/duo-walnootbruin-links-70-75.png.asset.json";
import duoWalnootbruinLinks7785Asset from "@/assets/duo-walnootbruin-links-77-85.png.asset.json";
import duoWalnootbruinRechts4055Asset from "@/assets/duo-walnootbruin-rechts-40-55.png.asset.json";
import duoWalnootbruinRechts5865Asset from "@/assets/duo-walnootbruin-rechts-58-65.png.asset.json";
import duoWalnootbruinRechts7075Asset from "@/assets/duo-walnootbruin-rechts-70-75.png.asset.json";
import duoWalnootbruinRechts7785Asset from "@/assets/duo-walnootbruin-rechts-77-85.png.asset.json";
import duoDonkereikenLinks4055Asset from "@/assets/duo-donkereiken-links-40-55.png.asset.json";
import duoDonkereikenLinks5865Asset from "@/assets/duo-donkereiken-links-58-65.png.asset.json";
import duoDonkereikenLinks7075Asset from "@/assets/duo-donkereiken-links-70-75.png.asset.json";
import duoDonkereikenLinks7785Asset from "@/assets/duo-donkereiken-links-77-85.png.asset.json";
import duoDonkereikenRechts4055Asset from "@/assets/duo-donkereiken-rechts-40-55.png.asset.json";
import duoDonkereikenRechts5865Asset from "@/assets/duo-donkereiken-rechts-58-65.png.asset.json";
import duoDonkereikenRechts7075Asset from "@/assets/duo-donkereiken-rechts-70-75.png.asset.json";
import duoDonkereikenRechts7785Asset from "@/assets/duo-donkereiken-rechts-77-85.png.asset.json";
import duoCashmereLinks4055Asset from "@/assets/duo-cashmeregrijs-links-40-55.png.asset.json";
import duoCashmereLinks5865Asset from "@/assets/duo-cashmeregrijs-links-58-65.png.asset.json";
import duoCashmereLinks7075Asset from "@/assets/duo-cashmeregrijs-links-70-75.png.asset.json";
import duoCashmereLinks7785Asset from "@/assets/duo-cashmeregrijs-links-77-85.png.asset.json";
import duoCashmereRechts4055Asset from "@/assets/duo-cashmeregrijs-rechts-40-55.png.asset.json";
import duoCashmereRechts5865Asset from "@/assets/duo-cashmeregrijs-rechts-58-65.png.asset.json";
import duoCashmereRechts7075Asset from "@/assets/duo-cashmeregrijs-rechts-70-75.png.asset.json";
import duoCashmereRechts7785Asset from "@/assets/duo-cashmeregrijs-rechts-77-85.png.asset.json";
import duoDofrozeLinks4055Asset from "@/assets/duo-dofroze-links-40-55.png.asset.json";
import duoDofrozeLinks5865Asset from "@/assets/duo-dofroze-links-58-65.png.asset.json";
import duoDofrozeLinks7075Asset from "@/assets/duo-dofroze-links-70-75.png.asset.json";
import duoDofrozeLinks7785Asset from "@/assets/duo-dofroze-links-77-85.png.asset.json";
import duoDofrozeRechts4055Asset from "@/assets/duo-dofroze-rechts-40-55.png.asset.json";
import duoDofrozeRechts5865Asset from "@/assets/duo-dofroze-rechts-58-65.png.asset.json";
import duoDofrozeRechts7075Asset from "@/assets/duo-dofroze-rechts-70-75.png.asset.json";
import duoDofrozeRechts7785Asset from "@/assets/duo-dofroze-rechts-77-85.png.asset.json";
import duoKristalwitLinks4055Asset from "@/assets/duo-kristalwit-links-40-55.png.asset.json";
import duoKristalwitLinks5865Asset from "@/assets/duo-kristalwit-links-58-65.png.asset.json";
import duoKristalwitLinks7075Asset from "@/assets/duo-kristalwit-links-70-75.png.asset.json";
import duoKristalwitLinks7785Asset from "@/assets/duo-kristalwit-links-77-85.png.asset.json";
import duoKristalwitRechts4055Asset from "@/assets/duo-kristalwit-rechts-40-55.png.asset.json";
import duoKristalwitRechts5865Asset from "@/assets/duo-kristalwit-rechts-58-65.png.asset.json";
import duoKristalwitRechts7075Asset from "@/assets/duo-kristalwit-rechts-70-75.png.asset.json";
import duoKristalwitRechts7785Asset from "@/assets/duo-kristalwit-rechts-77-85.png.asset.json";


// Duo hoofdrenders per kleur en opstelling, in volgorde van klein naar groot.
const DUO_MAIN_RENDERS: Record<string, Partial<Record<string, readonly string[]>>> = {
  Walnootbruin: {
    Links: [
      duoWalnootbruinLinks4055Asset.url,
      duoWalnootbruinLinks5865Asset.url,
      duoWalnootbruinLinks7075Asset.url,
      duoWalnootbruinLinks7785Asset.url,
    ],
    Rechts: [
      duoWalnootbruinRechts4055Asset.url,
      duoWalnootbruinRechts5865Asset.url,
      duoWalnootbruinRechts7075Asset.url,
      duoWalnootbruinRechts7785Asset.url,
    ],
  },
  Donkereiken: {
    Links: [
      duoDonkereikenLinks4055Asset.url,
      duoDonkereikenLinks5865Asset.url,
      duoDonkereikenLinks7075Asset.url,
      duoDonkereikenLinks7785Asset.url,
    ],
    Rechts: [
      duoDonkereikenRechts4055Asset.url,
      duoDonkereikenRechts5865Asset.url,
      duoDonkereikenRechts7075Asset.url,
      duoDonkereikenRechts7785Asset.url,
    ],
  },
  Cashmeregrijs: {
    Links: [
      duoCashmereLinks4055Asset.url,
      duoCashmereLinks5865Asset.url,
      duoCashmereLinks7075Asset.url,
      duoCashmereLinks7785Asset.url,
    ],
    Rechts: [
      duoCashmereRechts4055Asset.url,
      duoCashmereRechts5865Asset.url,
      duoCashmereRechts7075Asset.url,
      duoCashmereRechts7785Asset.url,
    ],
  },
  Dofroze: {
    Links: [
      duoDofrozeLinks4055Asset.url,
      duoDofrozeLinks5865Asset.url,
      duoDofrozeLinks7075Asset.url,
      duoDofrozeLinks7785Asset.url,
    ],
    Rechts: [
      duoDofrozeRechts4055Asset.url,
      duoDofrozeRechts5865Asset.url,
      duoDofrozeRechts7075Asset.url,
      duoDofrozeRechts7785Asset.url,
    ],
  },
  Kristalwit: {
    Links: [
      duoKristalwitLinks4055Asset.url,
      duoKristalwitLinks5865Asset.url,
      duoKristalwitLinks7075Asset.url,
      duoKristalwitLinks7785Asset.url,
    ],
    Rechts: [
      duoKristalwitRechts4055Asset.url,
      duoKristalwitRechts5865Asset.url,
      duoKristalwitRechts7075Asset.url,
      duoKristalwitRechts7785Asset.url,
    ],
  },
};

// Groepen per kleur/opstelling, gebruikt om maten vooraf te warmen.
const DUO_RENDER_GROUPS: readonly (readonly string[])[] = Object.values(DUO_MAIN_RENDERS).flatMap(
  (byLayout) => Object.values(byLayout).filter((urls): urls is readonly string[] => Boolean(urls)),
);

const DUO_ALL_MAIN_RENDERS = new Set<string>(
  Object.values(DUO_MAIN_RENDERS).flatMap((byLayout) =>
    Object.values(byLayout).flatMap((urls) => (urls ? [...urls] : [])),
  ),
);

const duoMainRender = (
  color: string | null | undefined,
  layout: string | null | undefined,
  sizeIndex: number,
) => {
  if (!color || !layout || sizeIndex < 0) return undefined;
  const colorKeyMatch = Object.keys(DUO_MAIN_RENDERS).find((key) =>
    new RegExp(key, "i").test(color),
  );
  if (!colorKeyMatch) return undefined;
  const layoutKey = Object.keys(DUO_MAIN_RENDERS[colorKeyMatch]!).find((key) =>
    new RegExp(key, "i").test(layout),
  );
  if (!layoutKey) return undefined;
  const url = DUO_MAIN_RENDERS[colorKeyMatch]![layoutKey]?.[sizeIndex];
  return url ? { src: url, colorLabel: colorKeyMatch.toLowerCase(), layoutLabel: layoutKey.toLowerCase() } : undefined;
};


const SOLO_WALNOOT_BY_SIZE = [
  { closed: soloWalnoot4055Asset.url, open: soloWalnoot4055OpenAsset.url, label: "40 - 55 inch" },
  { closed: soloWalnoot5865Asset.url, open: soloWalnoot5865OpenAsset.url, label: "58 - 65 inch" },
  { closed: soloWalnoot7075Asset.url, open: soloWalnoot7075OpenAsset.url, label: "70 - 75 inch" },
  { closed: soloWalnoot7785Asset.url, open: soloWalnoot7785OpenAsset.url, label: "77 - 85 inch" },
] as const;

const SOLO_DONKEREIKEN_BY_SIZE = [
  { closed: soloDonkereiken4055Asset.url, open: soloDonkereiken4055OpenAsset.url, label: "40 - 55 inch" },
  { closed: soloDonkereiken5865Asset.url, open: soloDonkereiken5865OpenAsset.url, label: "58 - 65 inch" },
  { closed: soloDonkereiken7075Asset.url, open: soloDonkereiken7075OpenAsset.url, label: "70 - 75 inch" },
  { closed: soloDonkereiken7785Asset.url, open: soloDonkereiken7785OpenAsset.url, label: "77 - 85 inch" },
] as const;

const SOLO_CASHMERE_BY_SIZE = [
  { closed: soloCashmere4055Asset.url, open: soloCashmere4055OpenAsset.url, label: "40 - 55 inch" },
  { closed: soloCashmere5865Asset.url, open: soloCashmere5865OpenAsset.url, label: "58 - 65 inch" },
  { closed: soloCashmere7075Asset.url, open: soloCashmere7075OpenAsset.url, label: "70 - 75 inch" },
  { closed: soloCashmere7785Asset.url, open: soloCashmere7785OpenAsset.url, label: "77 - 85 inch" },
] as const;

const SOLO_DOFROZE_BY_SIZE = [
  { closed: soloDofroze4055Asset.url, open: soloDofroze4055OpenAsset.url, label: "40 - 55 inch" },
  { closed: soloDofroze5865Asset.url, open: soloDofroze5865OpenAsset.url, label: "58 - 65 inch" },
  { closed: soloDofroze7075Asset.url, open: soloDofroze7075OpenAsset.url, label: "70 - 75 inch" },
  { closed: soloDofroze7785Asset.url, open: soloDofroze7785OpenAsset.url, label: "77 - 85 inch" },
] as const;

const SOLO_KRISTALWIT_BY_SIZE = [
  { closed: soloKristalwit4055Asset.url, open: soloKristalwit4055OpenAsset.url, label: "40 - 55 inch" },
  { closed: soloKristalwit5865Asset.url, open: soloKristalwit5865OpenAsset.url, label: "58 - 65 inch" },
  { closed: soloKristalwit7075Asset.url, open: soloKristalwit7075OpenAsset.url, label: "70 - 75 inch" },
  { closed: soloKristalwit7785Asset.url, open: soloKristalwit7785OpenAsset.url, label: "77 - 85 inch" },
] as const;

const soloSetForColor = (color: string | null | undefined, sizeIndex: number) => {
  if (/kristalwit|wit/i.test(color ?? ""))
    return { set: SOLO_KRISTALWIT_BY_SIZE[sizeIndex], colorLabel: "kristalwit" };
  if (/dofroze|roze/i.test(color ?? ""))
    return { set: SOLO_DOFROZE_BY_SIZE[sizeIndex], colorLabel: "dofroze" };
  if (/cashmere/i.test(color ?? ""))
    return { set: SOLO_CASHMERE_BY_SIZE[sizeIndex], colorLabel: "cashmeregrijs" };
  if (/donkereiken|eikenzwart/i.test(color ?? ""))
    return { set: SOLO_DONKEREIKEN_BY_SIZE[sizeIndex], colorLabel: "donkereiken" };
  if (/walnoot|noten/i.test(color ?? ""))
    return { set: SOLO_WALNOOT_BY_SIZE[sizeIndex], colorLabel: "walnootbruin" };
  return { set: undefined, colorLabel: "" };
};

const SOLO_ALL_RENDERS = new Set<string>([
  ...SOLO_WALNOOT_BY_SIZE.flatMap((s) => [s.closed, s.open]),
  ...SOLO_DONKEREIKEN_BY_SIZE.flatMap((s) => [s.closed, s.open]),
  ...SOLO_CASHMERE_BY_SIZE.flatMap((s) => [s.closed, s.open]),
  ...SOLO_DOFROZE_BY_SIZE.flatMap((s) => [s.closed, s.open]),
  ...SOLO_KRISTALWIT_BY_SIZE.flatMap((s) => [s.closed, s.open]),
]);

// Alle Full House renders per kleur (dicht eerst, open daarna) zodat we ze rustig
// kunnen voorladen nadat de pagina klaar is.
const FULL_HOUSE_RENDER_GROUPS: readonly (readonly string[])[] = [
  [fullHouseWalnoot4055, fullHouseWalnoot5865, fullHouseWalnoot7075, fullHouseWalnoot7785],
  [fullHouseDonkerEiken4055, fullHouseDonkerEiken5865, fullHouseDonkerEiken7075, fullHouseDonkerEiken7785],
  [fullHouseCashmere4055, fullHouseCashmere5865, fullHouseCashmere7075, fullHouseCashmere7785],
  [fullHouseDofroze4055, fullHouseDofroze5865, fullHouseDofroze7075, fullHouseDofroze7785],
  [fullHouseKristalwit4055, fullHouseKristalwit5865, fullHouseKristalwit7075, fullHouseKristalwit7785],
  [fullHouseCashmere4055Open, fullHouseCashmere5865Open, fullHouseCashmere7075Open, fullHouseCashmere7785Open],
  [fullHouseDofroze4055Open, fullHouseDofroze5865Open, fullHouseDofroze7075Open, fullHouseDofroze7785Open],
  [fullHouseKristalwit4055Open, fullHouseKristalwit5865Open, fullHouseKristalwit7075Open, fullHouseKristalwit7785Open],
];

const SOLO_RENDER_GROUPS: readonly (readonly string[])[] = [
  SOLO_WALNOOT_BY_SIZE.map((s) => s.closed),
  SOLO_DONKEREIKEN_BY_SIZE.map((s) => s.closed),
  SOLO_CASHMERE_BY_SIZE.map((s) => s.closed),
  SOLO_DOFROZE_BY_SIZE.map((s) => s.closed),
  SOLO_KRISTALWIT_BY_SIZE.map((s) => s.closed),
  SOLO_WALNOOT_BY_SIZE.map((s) => s.open),
  SOLO_DONKEREIKEN_BY_SIZE.map((s) => s.open),
  SOLO_CASHMERE_BY_SIZE.map((s) => s.open),
  SOLO_DOFROZE_BY_SIZE.map((s) => s.open),
  SOLO_KRISTALWIT_BY_SIZE.map((s) => s.open),
];

// Laadt varianten-afbeeldingen op de achtergrond voor. Belangrijk: we warmen exact
// dezelfde geoptimaliseerde URL's als de <Img> straks opvraagt (zelfde w/q en dpr),
// anders is de cache-hit nul en zie je alsnog vertraging bij het wisselen.
const warmedUrls = new Set<string>();

const warmVariantWidth = () => {
  if (typeof window === "undefined") return 1200;
  const dpr = window.devicePixelRatio || 1;
  // Mobiel rendert de swipe-galerij op w=900, desktop de hoofdfoto op w=1200.
  const base = window.innerWidth < 1024 ? 900 : 1200;
  return dpr >= 1.5 ? base * 2 : base;
};


const warmImageQueue = (urls: string[], isCancelled: () => boolean) => {
  const width = warmVariantWidth();
  const queue = urls
    .filter(Boolean)
    .map((url) => optimizeImageUrl(url, width) ?? url)
    .filter((url) => !warmedUrls.has(url));
  let index = 0;
  const next = () => {
    if (isCancelled() || index >= queue.length) return;
    const url = queue[index++]!;
    warmedUrls.add(url);
    const img = new Image();
    (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "low";
    img.decoding = "async";
    const done = () => {
      // Decodeer alvast, zodat het wisselen ook geen decode-hik geeft.
      const decoded = (img as HTMLImageElement).decode?.();
      if (decoded) decoded.then(next).catch(next);
      else next();
    };
    img.onload = done;
    img.onerror = next;
    img.src = url;
  };
  // vier parallelle streams: vult de cache snel, blijft lage prioriteit
  next();
  next();
  next();
  next();
};

import basketIcon from "@/assets/basket-icon.svg.asset.json";
import puzzleIcon from "@/assets/Untitled_design_23.svg.asset.json";
import dutchDesignIcon from "@/assets/dutch-design-icon.svg.asset.json";
import puzzlePiecesImg from "@/assets/puzzle-pieces.png.asset.json";
import plugAndPlayIcon from "@/assets/plug-and-play-icon.svg.asset.json";
import warrantyIcon from "@/assets/warranty-icon.svg.asset.json";
import kijkplezierIcon from "@/assets/100-dagen-icon.svg.asset.json";
import cinewallSchema from "@/assets/cinewall-schema-fullhouse.png.asset.json";
import ontworpenInNederlandImg from "@/assets/ontworpen-in-nederland-v2.png.asset.json";
import kabelsUitZichtImg from "@/assets/kabels-uit-zicht.png.asset.json";
import kabelsUitZichtV2Img from "@/assets/kabels-uit-zicht-v2.png.asset.json";
import kabelsUitZichtV3Img from "@/assets/kabels-uit-zicht-v3.png.asset.json";
import eenvoudigeKlikmontageImg from "@/assets/eenvoudige-klikmontage.png.asset.json";
import persoonlijkAdviesImg from "@/assets/persoonlijk-advies.png.asset.json";
import proefkijkenImg from "@/assets/100-dagen-proefkijken.png.asset.json";
import garantieCinewallImg from "@/assets/garantie-cinewall.png.asset.json";
import stijlvolleKleurenImg from "@/assets/stijlvolle-kleuren-v2.png.asset.json";
import eenvoudigeMontageDetailImg from "@/assets/eenvoudige-montage-detail.png.asset.json";
import eenvoudigeMontageV2Img from "@/assets/eenvoudige-montage-v2.png.asset.json";
import onderhoudsvriendelijkImg from "@/assets/onderhoudsvriendelijk.png.asset.json";
import onderhoudsvriendelijkV2Img from "@/assets/onderhoudsvriendelijk-v2.png.asset.json";
import pushToOpenImg from "@/assets/push-to-open.png.asset.json";
import hoogwaardigeKwaliteitImg from "@/assets/hoogwaardige-kwaliteit.png.asset.json";
import hoogwaardigeKwaliteitV2Img from "@/assets/hoogwaardige-kwaliteit-v2.png.asset.json";
import hoogwaardigeKwaliteitV3Img from "@/assets/hoogwaardige-kwaliteit-v3.png.asset.json";
import hoogwaardigeKwaliteitV4Img from "@/assets/hoogwaardige-kwaliteit-v4.png.asset.json";
import kabelsUitZichtV4Img from "@/assets/kabels-uit-zicht-v4.png.asset.json";
import kabelsUitZichtVoordelenImg from "@/assets/kabels-uit-zicht-voordelen.png.asset.json";
import kabelsUitZichtVoordelenUploadImg from "@/assets/kabels-uit-zicht-voordelen-upload.png.asset.json";
import klantWoonkamer1Img from "@/assets/klant-woonkamer-1.png.asset.json";
import klantWoonkamer2Img from "@/assets/klant-woonkamer-2.png.asset.json";
import eenvoudigeKlikmontageUploadImg from "@/assets/eenvoudige-klikmontage-upload.png.asset.json";
import persoonlijkAdviesUploadImg from "@/assets/persoonlijk-advies-upload.png.asset.json";
import proefkijkenUploadImg from "@/assets/proefkijken-upload.png.asset.json";
import garantieUploadImg from "@/assets/garantie-upload.png.asset.json";
import klantWoonkamer3Img from "@/assets/klant-woonkamer-3.png.asset.json";
import klantWoonkamer4Img from "@/assets/klant-woonkamer-4.png.asset.json";
import klantWoonkamer5_2Img from "@/assets/klant-woonkamer-5-2.png.asset.json";
import klantWoonkamer6Img from "@/assets/klant-woonkamer-6.png.asset.json";
import klantWoonkamer7Img from "@/assets/klant-woonkamer-7.png.asset.json";
import klantWoonkamer8Img from "@/assets/klant-woonkamer-8.png.asset.json";
import klantWoonkamer9Img from "@/assets/klant-woonkamer-9.png.asset.json";
import klantWoonkamer10Img from "@/assets/klant-woonkamer-10.png.asset.json";
import gebouwdOmMeeTeGaan1Img from "@/assets/gebouwd-om-mee-te-gaan-1.png.asset.json";
import plugPlayGeleverdV2Img from "@/assets/plug-play-geleverd-v2.png.asset.json";
import proefkijkenBgImg from "@/assets/100-dagen-proefkijken-bg.jpg.asset.json";
import proefkijkenBgV2Img from "@/assets/100-dagen-proefkijken-bg-v2.png.asset.json";
import dutchDesignBgImg from "@/assets/dutch-design-voor-aan-de-muur-bg.png.asset.json";







export const Route = createFileRoute("/product/$handle")({
  loader: async ({ params }) => {
    const res = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle: params.handle });
    const product = res?.data?.product as ProductNode | null;
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params }) => ({
    meta: [
      { title: `Wandig ${params.handle.charAt(0).toUpperCase() + params.handle.slice(1)} — Plug & play cinewall` },
      { name: "description", content: `Bekijk de Wandig ${params.handle} cinewall. Plug & play gemaakt in onze werkplaats.` },
    ],
  }),
  pendingComponent: ProductPagePending,
  component: ProductPage,
});

type ProductNode = ShopifyProduct["node"];

type GalleryItem = { src: string; alt: string; full?: boolean; square?: boolean };

/** Mobiele swipe-galerij met snap-scroll, puntjes-indicator en maatlint. */
function DimensionRuler({
  widthLabel,
  heightLabel,
  open,
  onToggle,
  align = "left",
  position = "bottom-3 left-0",
}: {
  widthLabel: string;
  heightLabel: string;
  open: boolean;
  onToggle: () => void;
  align?: "left" | "right";
  position?: string;
}) {
  const isRight = align === "right";
  return (
    <div className={`pointer-events-none absolute z-20 flex items-center ${position} ${isRight ? "flex-row-reverse" : ""}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label="Afmetingen bekijken"
        className="pointer-events-auto relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#ef7027]/25 bg-white/95 text-[#ef7027] shadow-[0_6px_18px_rgba(7,20,38,0.14)] backdrop-blur transition-transform active:scale-95"
      >
        <Ruler className={`h-[18px] w-[18px] transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
      </button>

      <div
        className={`pointer-events-auto overflow-hidden bg-white/95 shadow-[0_6px_18px_rgba(7,20,38,0.12)] backdrop-blur transition-all duration-400 ease-out ${
          isRight ? "mr-[-20px] rounded-l-full" : "ml-[-20px] rounded-r-full"
        } ${open ? "max-w-[310px] opacity-100" : "max-w-0 opacity-0"}`}
      >
        <div
          className={`flex items-center gap-4 whitespace-nowrap py-2.5 text-[12px] text-[#071426] ${
            isRight ? "pl-5 pr-[52px]" : "pl-7 pr-5"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <MoveHorizontal className="h-3.5 w-3.5 text-[#ef7027]" />
            <span className="text-[#071426]/55">Breedte</span>
            <strong className="font-[500]">{widthLabel} cm</strong>
          </span>
          <span className="h-3 w-px bg-[#071426]/12" />
          <span className="flex items-center gap-1.5">
            <MoveVertical className="h-3.5 w-3.5 text-[#ef7027]" />
            <span className="text-[#071426]/55">Hoogte</span>
            <strong className="font-[500]">{heightLabel} cm</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

function MobileGallerySwipe({
  items,
  handle,
  widthLabel,
  heightLabel,
}: {
  items: GalleryItem[];
  handle: string;
  widthLabel: string;
  heightLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [rulerOpen, setRulerOpen] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth || 1;
      setActive(Math.round(el.scrollLeft / width));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, [items.length]);

  // Bij een nieuwe selectie (kleur/maat/opstelling) op dezelfde fotopositie blijven.
  const firstSrc = items[0]?.src;
  const activeRef = useRef(0);
  activeRef.current = active;
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const target = Math.min(activeRef.current, items.length - 1);
    el.scrollTo({ left: target * (el.clientWidth || 0), behavior: "auto" });
    setActive(target < 0 ? 0 : target);
  }, [firstSrc]);



  if (items.length === 0) return null;

  return (
    <div className="relative overflow-hidden lg:hidden">
      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
      >
        {items.map((item, index) => (
          <div key={`${item.src}-${index}`} className="w-full shrink-0 snap-center">
            <figure
              className={`relative flex items-center justify-center overflow-hidden bg-[#faf8f5] aspect-[4/3.12]`}
            >
              <Img
                src={item.src}
                alt={item.alt}
                w={900}
                priority={index === 0}
                className={
                  handle === "full-house" && index === 0
                    ? "h-auto w-[102%] max-w-none shrink-0 object-contain"
                    : "h-full w-[102%] max-w-none shrink-0 object-cover"
                }
              />
              {index === 0 && (
                <div className="pointer-events-none absolute right-3 top-3 z-10 rounded-lg bg-white shadow-[0_6px_20px_rgba(31,25,21,0.10)]">
                  <Img
                    src={badgeLogo.url}
                    alt="Dutch Design Winner 2026 - 10 jaar garantie"
                    className="h-auto w-14 rounded-lg"
                    w={160}
                    loading="lazy"
                  />
                </div>
              )}
            </figure>
          </div>
        ))}
      </div>

      {/* Maatlint-knop met uitschuivende afmetingen, over de foto */}
      <div className="absolute inset-x-4 bottom-[22px]">
        <DimensionRuler widthLabel={widthLabel} heightLabel={heightLabel} open={rulerOpen} onToggle={() => setRulerOpen((open) => !open)} />
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-[40px] right-4 flex items-center gap-1.5">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Afbeelding ${index + 1}`}
              onClick={() => {
                const el = trackRef.current;
                if (el) el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === index ? "w-5 bg-[#ef7027]" : "w-1.5 bg-[#071426]/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}


function ProductPage() {
  const { product } = Route.useLoaderData();
  // key op handle: bij wisselen van product altijd verse standaardselectie
  // (walnootbruin, 58 - 65 inch, en bij duo Links) in plaats van de vorige keuze.
  return <ProductView key={product.handle} product={product} />;

}

function ProductPagePending() {
  return (
    <div className="bg-[#faf8f5]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-3 py-16 md:grid-cols-2 md:px-10">
        <div className="aspect-[4/5] animate-pulse bg-muted" />
        <div className="space-y-4">
          <div className="h-10 w-2/3 animate-pulse bg-muted" />
          <div className="h-6 w-1/3 animate-pulse bg-muted" />
        </div>
      </div>
    </div>
  );
}

// Volgorde waarin de kleurblokken in de Shopify-galerij zijn geüpload (per handle).
const GALLERY_COLOR_ORDER: Record<string, string[]> = {
  solo: ["Kristalwit", "Dofroze", "Cashmeregrijs", "Donkereiken", "Walnootbruin"],
};

// Duo close-ups: gedeelde sets per kleur. De bestandslimiet in Shopify is 250,
// dus hergebruiken we één set van 7 close-ups voor alle varianten van die kleur.
const DUO_DONKEREIKEN_CLOSEUP_KEYS = [
  "Close_Camera_01_0000_1614fac5",
  "Close_Camera_02_0000_c412643a",
  "Close_Camera_03_0000_4734a236",
  "Close_Camera_04_0000_b1743949",
  "Close_Camera_05_0000_3a9fe087",
  "Close_Camera_06_0000_d31ac550",
  "Close_Camera_07_0000_fab86129",
];

const DUO_KRISTALWIT_CLOSEUP_KEYS = [
  "Close_Camera_01_0000",
  "Close_Camera_02_0000",
  "Close_Camera_03_0000",
  "Close_Camera_04_0000",
  "Close_Camera_05_0000",
  "Close_Camera_06_0000",
  "Close_Camera_07_0000",
];

/**
 * Shopify levert URL's soms met een transform-suffix (`_1600x.jpg.webp`).
 * We vergelijken daarom op de genormaliseerde bestandsnaam, met voorkeur voor
 * een exacte match zodat een bare key niet per ongeluk een variant-set pakt.
 */
function closeupFileName(url: string): string {
  const file = url.split("/").pop()?.split("?")[0] ?? "";
  return file.replace(/(_\d+x)?(\.(jpg|jpeg|png|webp|avif))+$/i, "");
}


const DUO_WALNOOTBRUIN_CLOSEUP_KEYS = [
  "Close_Camera_01_0000_1e854e07-a545-4a01-a0e4-06ed0c0d7332",
  "Close_Camera_02_0000_1b757fdd-fa33-4bba-abca-5ca20c4eab74",
  "Close_Camera_03_0000_1aaf458f-c42f-4aa1-b125-832777a0752a",
  "Close_Camera_04_0000_c5ba30d6-32d9-412b-b720-34cbec86108d",
  "Close_Camera_05_0000_736abd18-b5bf-45a4-815f-2b0e144d7246",
  "Close_Camera_06_0000_266e4c2c-329e-4df5-968f-3e09472a41a9",
  "Close_Camera_07_0000_a3153997-e37c-4637-802f-d3a5e29e5a65",
];

const DUO_SHARED_CLOSEUP_KEYS: Record<string, string[]> = {
  Donkereiken: DUO_DONKEREIKEN_CLOSEUP_KEYS,
  Kristalwit: DUO_KRISTALWIT_CLOSEUP_KEYS,
  Walnootbruin: DUO_WALNOOTBRUIN_CLOSEUP_KEYS,
};

// Full House: gedeelde close-up set per kleur (één upload voor alle varianten).
const FULL_HOUSE_WALNOOTBRUIN_CLOSEUP_KEYS = [
  "Close_Camera_007",
  "Close_Camera_003",
  "Close_Camera_002",
  "Close_Camera_001",
  "Close_Camera_006",
  "Close_Camera_005",
];

const FULL_HOUSE_SHARED_CLOSEUP_KEYS: Record<string, string[]> = {
  Walnootbruin: FULL_HOUSE_WALNOOTBRUIN_CLOSEUP_KEYS,
};

const SHARED_CLOSEUP_KEYS_BY_HANDLE: Record<string, Record<string, string[]>> = {
  duo: DUO_SHARED_CLOSEUP_KEYS,
  "full-house": FULL_HOUSE_SHARED_CLOSEUP_KEYS,
};





const FULL_HOUSE_GALLERY = [
  { src: fullHouseGalleryMain, alt: "Wandig Full House volledig vrijstaand in walnootbruin", full: true, square: true },
  { src: fullHouseGalleryRoom, alt: "Wandig Full House gemonteerd in een lichte woonkamer", full: true },
  { src: fullHouseGalleryStylingOne, alt: "Detail van de vakken en houtnerf van de Wandig Full House", full: false },
  { src: fullHouseGalleryStylingTwo, alt: "Gestylede vakken van de Wandig Full House", full: false },
  { src: fullHouseGalleryFinish, alt: "Close-up van de strakke frontafwerking", full: true },
  { src: fullHouseGalleryStorage, alt: "Geopend opbergvak met beslag", full: false },
  { src: fullHouseGalleryUse, alt: "Gebruik van het verborgen opbergvak", full: false },
];

const PRODUCT_BENEFITS = [
  { title: "Ontworpen in Nederland", image: ontworpenInNederlandImg.url },
  { title: "Kabels uit het zicht", image: kabelsUitZichtVoordelenUploadImg.url },
  { title: "In een handomdraai", image: eenvoudigeKlikmontageUploadImg.url },
  { title: "Persoonlijk advies", image: persoonlijkAdviesUploadImg.url },
  { title: "100 dagen proefkijken", image: proefkijkenUploadImg.url },
  { title: "10 jaar garantie", image: garantieUploadImg.url },
];


function ProductView({ product }: { product: ProductNode }) {
  const variants = useMemo(
    () => product.variants.edges.map((e) => e.node as typeof e.node & { image?: { url: string; altText: string | null } | null }),
    [product],
  );
  
  const benefitsScrollerRef = useRef<HTMLDivElement>(null);
  const mainGalleryImageRef = useRef<HTMLImageElement>(null);
  const galleryContinuationRef = useRef<HTMLDivElement>(null);
  const lastGalleryScrollYRef = useRef(0);
  
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    // De tv-maat optie: "58 - 65 inch" is de tweede waarde (of de waarde die 58 bevat).
    const sizeOption = product.options.find((o) => /maat|size|inch/i.test(o.name));
    const preferredSizeValue = sizeOption
      ? sizeOption.values.find((v) => /58/.test(v)) || sizeOption.values[1]
      : undefined;
    // De kleur: standaard walnootbruin zodat de klant altijd de juiste foto ziet.
    const colorOption = product.options.find((o) => /kleur|color/i.test(o.name));
    const preferredColorValue = colorOption
      ? colorOption.values.find((v) => /walnoot|noten/i.test(v))
      : undefined;
    // De opstelling: Duo altijd starten op Links.
    const layoutOption = product.options.find((o) => /opstelling|layout/i.test(o.name));
    const preferredLayoutValue = layoutOption
      ? layoutOption.values.find((v) => /links|left/i.test(v))
      : undefined;
    const matches = (v: (typeof variants)[number], name?: string, value?: string) =>
      !name || !value || v.selectedOptions.some((o) => o.name === name && o.value === value);
    const isPreferred = (v: (typeof variants)[number]) =>
      matches(v, sizeOption?.name, preferredSizeValue) &&
      matches(v, colorOption?.name, preferredColorValue) &&
      matches(v, layoutOption?.name, preferredLayoutValue);
    const first =
      variants.find((v) => v.availableForSale && isPreferred(v)) ||
      variants.find(isPreferred) ||
      variants.find((v) => v.availableForSale) ||
      variants[0];
    first?.selectedOptions.forEach((o) => { init[o.name] = o.value; });
    if (sizeOption && preferredSizeValue) init[sizeOption.name] = preferredSizeValue;
    if (colorOption && preferredColorValue) init[colorOption.name] = preferredColorValue;
    if (layoutOption && preferredLayoutValue) init[layoutOption.name] = preferredLayoutValue;
    return init;
  });



  const [expandedVariantOption, setExpandedVariantOption] = useState<string | null>(null);
  const [productionDetailsOpen, setProductionDetailsOpen] = useState(false);
  const [benefitsScrollState, setBenefitsScrollState] = useState({ atStart: true, atEnd: false });
  const [showOrderWidget, setShowOrderWidget] = useState(false);
  const [desktopRulerOpen, setDesktopRulerOpen] = useState(false);
  const [colorTooltip, setColorTooltip] = useState<{ value: string; label: string } | null>(null);
  const colorTooltipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showColorTooltip = (value: string, label: string) => {
    if (colorTooltipTimeoutRef.current) clearTimeout(colorTooltipTimeoutRef.current);
    setColorTooltip({ value, label });
    colorTooltipTimeoutRef.current = setTimeout(() => setColorTooltip(null), 1500);
  };

  useEffect(() => {
    const onScroll = () => {
      const continuation = galleryContinuationRef.current;
      const threshold = continuation
        ? continuation.getBoundingClientRect().bottom
        : window.innerHeight;
      setShowOrderWidget(threshold < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  


  const activeVariant = useMemo(() => {
    return variants.find((v) =>
      v.selectedOptions.every((o) => selected[o.name] === o.value),
    ) || variants[0];
  }, [variants, selected]);

  const productImages = product.images.edges;
  const allImages = useMemo(() => {
    const all = [...productImages];
    variants.forEach((v) => {
      if (v.image?.url && !all.some((img) => img.node.url === v.image!.url)) {
        all.push({ node: { url: v.image.url, altText: v.image.altText } });
      }
    });
    return all;
  }, [productImages, variants]);

  const colorKey = product.options.find((o) => /kleur|color/i.test(o.name))?.name;
  const selectedColor = colorKey ? selected[colorKey] : undefined;
  const sizeKey = product.options.find((o) => /maat|size|inch/i.test(o.name))?.name;
  const selectedSize = sizeKey ? selected[sizeKey] : undefined;
  const layoutKey = product.options.find((o) => /opstelling|layout/i.test(o.name))?.name;
  const selectedLayout = layoutKey ? selected[layoutKey] : undefined;


  // Afmetingen volgen de gekozen tv-maat én het gekozen model.
  const sizeOption = product.options.find((o) => /maat|size|inch/i.test(o.name));
  const sizeIndex = sizeOption && selectedSize ? sizeOption.values.indexOf(selectedSize) : -1;
  const dimensionSize = WANDIG_SIZES[sizeIndex >= 0 ? sizeIndex : 0];
  const isSolo = product.handle === "solo";
  const isDuo = product.handle === "duo";
  const isFullHouse = product.handle === "full-house";
  const sideModuleCount = isFullHouse ? 2 : isDuo ? 1 : 0;
  const specWidthLabel = formatCm(wandigWidth(dimensionSize, sideModuleCount));
  const specHeightLabel = String(dimensionSize.wallHeight);

  // De specificatiepreview gebruikt exact dezelfde foto en uitsneden als de
  // configurator, gekoppeld aan kleur + tv-maat.
  const specPreviewColor = displayWandigColor(selectedColor ?? FULL_HOUSE_COLORS[0]);
  const specModuleAsset = getConfiguratorModuleAsset(
    specPreviewColor,
    dimensionSize.label,
  );
  const fallbackSpecPreviewSource = useMemo(() => {
    if (specPreviewColor === FULL_HOUSE_COLORS[0]) return null;
    const matchingVariant = variants.find((v) => {
      const selections = new Map(
        v.selectedOptions.map((o) => [o.name.toLocaleLowerCase("nl-NL"), o.value]),
      );
      return (
        selections.get("kleur") === specPreviewColor &&
        selections.get("opstelling") === "Links" &&
        selections.get("maat tv") === "58 - 65 inch"
      );
    });
    return matchingVariant?.image?.url ?? FULL_HOUSE_FRONT_IMAGES[specPreviewColor] ?? null;
  }, [variants, specPreviewColor]);
  const specPreviewSource = specModuleAsset?.source ?? fallbackSpecPreviewSource;
  const duoIsRight = /rechts|right/i.test(selectedLayout ?? "");
  const specHasLeft = isFullHouse || (isDuo && !duoIsRight);
  const specHasRight = isFullHouse || (isDuo && duoIsRight);
  const specModelLabel = isFullHouse ? "Full House" : isDuo ? "Duo" : "Solo";
  const specModulesLabel = isFullHouse
    ? "Links + midden + rechts"
    : isDuo
      ? duoIsRight
        ? "Midden + rechts"
        : "Links + midden"
      : "Midden";

  // Shopify uploads the photos per variant as one consecutive block, starting at
  // the variant's own image. So we slice from that anchor up to the next anchor.
  const images = useMemo(() => {
    // Solo: de galerij is geüpload als blokken per kleur x tv-maat, elk blok start
    // bij een "Closed_Front" foto. De variant-featured images zijn losse duplicaten
    // aan het eind, dus we mappen op blokpositie in plaats van op de variantfoto.
    const galleryColorOrder = GALLERY_COLOR_ORDER[product.handle];
    if (galleryColorOrder && selectedColor && selectedSize && sizeOption) {
      const blockStarts = allImages
        .map((img, i) => (/Closed_Front/i.test(img.node.url) ? i : -1))
        .filter((i) => i >= 0);
      const colorPos = galleryColorOrder.indexOf(selectedColor);
      const sizePos = sizeOption.values.indexOf(selectedSize);
      if (colorPos >= 0 && sizePos >= 0) {
        const blockIndex = colorPos * sizeOption.values.length + sizePos;
        const start = blockStarts[blockIndex];
        if (start !== undefined) {
          const nextStart = blockStarts[blockIndex + 1] ?? allImages.length;
          const group = allImages.slice(start, Math.min(nextStart, start + 9));
          if (group.length > 0) return group;
        }
      }
    }

    const urlIndex = new Map(allImages.map((img, i) => [img.node.url, i] as const));

    const anchorIndexes = Array.from(
      new Set(
        variants
          .map((v) => v.image?.url)
          .filter((u): u is string => Boolean(u))
          .map((u) => urlIndex.get(u))
          .filter((i): i is number => i !== undefined),
      ),
    ).sort((a, b) => a - b);

    // Eerst de exact geselecteerde variant (incl. opties als "Opstelling"),
    // daarna pas de bredere kleur/maat-match als terugval.
    const exactMatch = variants.find(
      (v) => v.image?.url && v.selectedOptions.every((o) => selected[o.name] === o.value),
    );

    const match =
      exactMatch ??
      variants.find((v) => {
        if (!v.image?.url) return false;
        const c = colorKey ? v.selectedOptions.find((o) => o.name === colorKey)?.value : undefined;
        const s = sizeKey ? v.selectedOptions.find((o) => o.name === sizeKey)?.value : undefined;
        return (!colorKey || c === selectedColor) && (!sizeKey || s === selectedSize);
      });


    const start = match?.image?.url ? urlIndex.get(match.image.url) : undefined;
    if (start === undefined) return allImages.slice(0, 9);

    const end = anchorIndexes.find((i) => i > start) ?? allImages.length;
    let group = allImages.slice(start, end);

    // Gedeelde close-up series: hang ze achter elke variant van die kleur,
    // zodat we ze maar één keer in de backend hoeven te uploaden.
    const sharedSets = SHARED_CLOSEUP_KEYS_BY_HANDLE[product.handle];
    const sharedColor = sharedSets
      ? Object.keys(sharedSets).find((color) =>
          new RegExp(color, "i").test(selectedColor ?? ""),
        )
      : undefined;
    if (sharedSets && sharedColor) {
      const keys = sharedSets[sharedColor];
      const closeups = keys.map((key) =>
        allImages.find((img) => closeupFileName(img.node.url) === key) ??
        allImages.find((img) => img.node.url.includes(key)),

      ).filter((img): img is (typeof allImages)[number] => Boolean(img));
      const base = group.filter((img) => !/Close_Camera/i.test(img.node.url));
      group = [...base, ...closeups.filter((c) => !base.some((b) => b.node.url === c.node.url))];
    }



    return group.length > 0 ? group : allImages;

  }, [allImages, variants, selected, colorKey, selectedColor, sizeKey, selectedSize, sizeOption, product.handle]);

  const galleryItems = useMemo(() => {
    const shopifyItems = images.map(({ node }) => ({
      src: node.url,
      alt: node.altText || product.title,
      full: false,
      square: false,
    }));

    if (product.handle === "full-house") {
      const isWalnoot = /walnoot|noten/i.test(selectedColor ?? "");
      const isWalnoot4055 = isWalnoot && sizeIndex === 0;
      const isWalnoot5865 = isWalnoot && sizeIndex === 1;
      const isWalnoot7075 = isWalnoot && sizeIndex === 2;
      const isWalnoot7785 = isWalnoot && sizeIndex === 3;
      const isDonkerEiken = /donker\s*eiken|eikenzwart|donkereiken/i.test(selectedColor ?? "");
      const isDonkerEiken7785 = isDonkerEiken && sizeIndex === 3;
      const isDonkerEiken7075 = isDonkerEiken && sizeIndex === 2;
      const isDonkerEiken5865 = isDonkerEiken && sizeIndex === 1;
      const isDonkerEiken4055 = isDonkerEiken && sizeIndex === 0;
      const isCashmere = /cashmere/i.test(selectedColor ?? "");
      const isCashmere7785 = isCashmere && sizeIndex === 3;
      const isCashmere7075 = isCashmere && sizeIndex === 2;
      const isCashmere5865 = isCashmere && sizeIndex === 1;
      const isCashmere4055 = isCashmere && sizeIndex === 0;
      const isDofrozeColor = /dofroze|dof\s*roze/i.test(selectedColor ?? "");
      const isDofroze7785 = isDofrozeColor && sizeIndex === 3;
      const isDofroze7075 = isDofrozeColor && sizeIndex === 2;
      const isDofroze5865 = isDofrozeColor && sizeIndex === 1;
      const isDofroze4055 = isDofrozeColor && sizeIndex === 0;
      const isKristalwit = /kristalwit|kleibeige/i.test(selectedColor ?? "");
      const isKristalwit7785 = isKristalwit && sizeIndex === 3;
      const isKristalwit7075 = isKristalwit && sizeIndex === 2;
      const isKristalwit5865 = isKristalwit && sizeIndex === 1;
      const isKristalwit4055 = isKristalwit && sizeIndex === 0;


      const main = isKristalwit7785
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseKristalwit7785,
            alt: "Wandig Full House in kristalwit voor tv 77 - 85 inch",
          }
        : isKristalwit7075
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseKristalwit7075,
            alt: "Wandig Full House in kristalwit voor tv 70 - 75 inch",
          }
        : isKristalwit5865
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseKristalwit5865,
            alt: "Wandig Full House in kristalwit voor tv 58 - 65 inch",
          }
        : isKristalwit4055
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseKristalwit4055,
            alt: "Wandig Full House in kristalwit voor tv 40 - 55 inch",
          }
        : isDofroze7785
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseDofroze7785,
            alt: "Wandig Full House in dofroze voor tv 77 - 85 inch",
          }
        : isDofroze7075
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseDofroze7075,
            alt: "Wandig Full House in dofroze voor tv 70 - 75 inch",
          }
        : isDofroze5865
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseDofroze5865,
            alt: "Wandig Full House in dofroze voor tv 58 - 65 inch",
          }
        : isDofroze4055
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseDofroze4055,
            alt: "Wandig Full House in dofroze voor tv 40 - 55 inch",
          }
        : isCashmere7785
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseCashmere7785,
            alt: "Wandig Full House in cashmeregrijs voor tv 77 - 85 inch",
          }
        : isCashmere7075
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseCashmere7075,
            alt: "Wandig Full House in cashmeregrijs voor tv 70 - 75 inch",
          }
        : isCashmere5865
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseCashmere5865,
            alt: "Wandig Full House in cashmeregrijs voor tv 58 - 65 inch",
          }
        : isCashmere4055
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseCashmere4055,
            alt: "Wandig Full House in cashmeregrijs voor tv 40 - 55 inch",
          }
        : isDonkerEiken4055
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseDonkerEiken4055,
            alt: "Wandig Full House in donkereiken voor tv 40 - 55 inch",
          }
        : isDonkerEiken5865
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseDonkerEiken5865,
            alt: "Wandig Full House in donkereiken voor tv 58 - 65 inch",
          }
        : isDonkerEiken7785
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseDonkerEiken7785,
            alt: "Wandig Full House in donkereiken voor tv 77 - 85 inch",
          }
        : isDonkerEiken7075
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseDonkerEiken7075,
            alt: "Wandig Full House in donkereiken voor tv 70 - 75 inch",
          }
        : isWalnoot7785
        ? {
            ...FULL_HOUSE_GALLERY[0],
            src: fullHouseWalnoot7785,
            alt: "Wandig Full House in walnootbruin voor tv 77 - 85 inch",
          }
        : isWalnoot7075
          ? {
              ...FULL_HOUSE_GALLERY[0],
              src: fullHouseWalnoot7075,
              alt: "Wandig Full House in walnootbruin voor tv 70 - 75 inch",
            }
          : isWalnoot4055
            ? {
                ...FULL_HOUSE_GALLERY[0],
                src: fullHouseWalnoot4055,
                alt: "Wandig Full House in walnootbruin voor tv 40 - 55 inch",
              }
            : isWalnoot5865
              ? {
                  ...FULL_HOUSE_GALLERY[0],
                  src: fullHouseWalnoot5865,
                  alt: "Wandig Full House in walnootbruin voor tv 58 - 65 inch",
                }
              : FULL_HOUSE_GALLERY[0];

      const openSrcs = [
        fullHouseCashmere7785Open,
        fullHouseCashmere7075Open,
        fullHouseCashmere5865Open,
        fullHouseCashmere4055Open,
        fullHouseDofroze7785Open,
        fullHouseDofroze7075Open,
        fullHouseDofroze5865Open,
        fullHouseKristalwit7785Open,
        fullHouseKristalwit7075Open,
      ];
      const rest = shopifyItems.filter(
        (item) => item.src !== main.src && !openSrcs.includes(item.src),
      );
      return rest.length > 0 ? [main, ...rest] : [main, ...FULL_HOUSE_GALLERY.slice(1)];
    }

    if (product.handle === "solo") {
      const { set, colorLabel } = soloSetForColor(selectedColor, sizeIndex);
      if (set) {
        const main = {
          src: set.closed,
          alt: `Wandig Solo in ${colorLabel} voor tv ${set.label}`,
          full: true,
          square: true,
        };
        const rest = shopifyItems.filter((item) => !SOLO_ALL_RENDERS.has(item.src));
        return [main, ...rest];
      }
    }

    if (product.handle === "duo") {
      const duoMain = duoMainRender(selectedColor, selectedLayout, sizeIndex);
      if (duoMain) {
        const main = {
          src: duoMain.src,
          alt: `Wandig Duo ${duoMain.layoutLabel} in ${duoMain.colorLabel} voor tv ${WANDIG_SIZES[sizeIndex]?.label ?? ""}`.trim(),
          full: true,
          square: true,
        };
        const rest = shopifyItems.filter((item) => !DUO_ALL_MAIN_RENDERS.has(item.src));
        return [main, ...rest];
      }
    }

    return shopifyItems.map((item, index) => ({
      ...item,
      full: index === 0,
      square: index === 0,
    }));
  }, [images, product.handle, product.title, selectedColor, selectedLayout, selectedSize, sizeOption, sizeIndex]);


  const openGalleryItem = useMemo(() => {
    if (product.handle === "solo") {
      const { set, colorLabel } = soloSetForColor(selectedColor, sizeIndex);
      if (!set) return null;
      return {
        ...FULL_HOUSE_GALLERY[0],
        src: set.open,
        alt: `Wandig Solo in ${colorLabel} met geopende deuren`,
      };
    }
    if (product.handle !== "full-house") return null;
    const isDofroze = /dofroze|dof\s*roze/i.test(selectedColor ?? "");
    const isCashmereColor = /cashmere/i.test(selectedColor ?? "");
    const isKristalwitColor = /kristalwit|kleibeige/i.test(selectedColor ?? "");
    if (!isCashmereColor && !isDofroze && !isKristalwitColor) return null;
    const src = isKristalwitColor
      ? sizeIndex === 3
        ? fullHouseKristalwit7785Open
        : sizeIndex === 2
          ? fullHouseKristalwit7075Open
          : sizeIndex === 1
            ? fullHouseKristalwit5865Open
            : sizeIndex === 0
              ? fullHouseKristalwit4055Open
              : null
      : isDofroze
      ? sizeIndex === 3
        ? fullHouseDofroze7785Open
        : sizeIndex === 2
          ? fullHouseDofroze7075Open
          : sizeIndex === 1
            ? fullHouseDofroze5865Open
            : sizeIndex === 0
              ? fullHouseDofroze4055Open
              : null
      : sizeIndex === 3
        ? fullHouseCashmere7785Open
        : sizeIndex === 2
          ? fullHouseCashmere7075Open
          : sizeIndex === 1
            ? fullHouseCashmere5865Open
            : sizeIndex === 0
              ? fullHouseCashmere4055Open
              : null;
    if (!src) return null;
    return {
      ...FULL_HOUSE_GALLERY[0],
      src,
      alt: `Wandig Full House in ${isKristalwitColor ? "kristalwit" : isDofroze ? "dofroze" : "cashmeregrijs"} met geopende deuren`,
    };
  }, [product.handle, selectedColor, sizeIndex]);
  const [mainDoorsOpen, setMainDoorsOpen] = useState(false);
  useEffect(() => {
    setMainDoorsOpen(false);
  }, [openGalleryItem?.src, selectedColor, selectedSize]);


  const subImageGroups = useMemo(() => {
    const subs = galleryItems.slice(1);
    const groups: Array<typeof galleryItems> = [];
    for (let i = 0; i < subs.length; i += 3) {
      groups.push(subs.slice(i, i + 3));
    }
    return groups;
  }, [galleryItems]);



  useEffect(() => {
    const image = mainGalleryImageRef.current;
    const continuation = galleryContinuationRef.current;
    if (!image || !continuation) return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const updateMainImage = () => {
      frame = 0;

      if (!desktopQuery.matches) {
        image.style.filter = "none";
        image.style.opacity = "1";
        image.style.transform = "none";
        image.style.transitionDuration = "0ms";
        lastGalleryScrollYRef.current = window.scrollY;
        return;
      }


      const scrollY = window.scrollY;
      const continuationTop = continuation.getBoundingClientRect().top;
      const imageRect = image.getBoundingClientRect();
      // Blur starts the moment the next (Dutch design) photo touches the bottom
      // of the first image, then intensifies as you keep scrolling.
      const blurStart = imageRect.bottom;
      const blurEnd = imageRect.top + imageRect.height * 0.2;
      const span = Math.max(blurStart - blurEnd, 1);
      const progress = scrollY <= 2
        ? 0
        : Math.min(Math.max((blurStart - continuationTop) / span, 0), 1);
      const scrollingUp = scrollY < lastGalleryScrollYRef.current;
      const blur = progress * 12;
      const brightness = 1 + progress * 0.28;
      const opacity = 1 - progress * 0.45;
      const scale = 1;

      image.style.transitionDuration = reducedMotionQuery.matches ? "0ms" : progress === 0 || scrollingUp ? "90ms" : "280ms";
      image.style.filter = `blur(${blur.toFixed(1)}px) brightness(${brightness.toFixed(3)}) saturate(${(1 - progress * 0.4).toFixed(3)})`;
      image.style.opacity = opacity.toFixed(3);
      image.style.transform = `scale(${scale.toFixed(4)})`;

      lastGalleryScrollYRef.current = scrollY;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMainImage);
    };

    updateMainImage();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    desktopQuery.addEventListener("change", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      desktopQuery.removeEventListener("change", scheduleUpdate);
      image.style.filter = "";
      image.style.transform = "";
      image.style.transitionDuration = "";
    };
  }, [galleryItems]);

  // Preload alleen de afbeeldingen van de huidige selectie, geoptimaliseerd en
  // pas wanneer de browser rustig is — niet de volledige variantenbibliotheek.
  useEffect(() => {
    const preload = () => {
      images.slice(0, 10).forEach(({ node }) => {
        const img = new Image();
        const url = optimizeImageUrl(node.url, 1200);
        if (url) img.src = url;
      });
    };
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (idle) {
      idle(preload);
      return;
    }
    const timer = window.setTimeout(preload, 1200);
    return () => window.clearTimeout(timer);
  }, [images]);

  // Warm de renders van andere kleuren/maten voor, met lage prioriteit en pas als de
  // pagina klaar is. Zo is wisselen direct, zonder de eerste load te vertragen.
  useEffect(() => {
    const groups =
      product.handle === "full-house"
        ? FULL_HOUSE_RENDER_GROUPS
        : product.handle === "solo"
        ? SOLO_RENDER_GROUPS
        : product.handle === "duo"
        ? DUO_RENDER_GROUPS
        : null;
    if (!groups) return;

    const connection = (navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /2g/.test(connection.effectiveType)) return;

    // Huidige kleur eerst: die maten wisselt de klant het vaakst.
    const colorMatch = (group: readonly string[]) =>
      group.some((url) => galleryItems.some((item) => item.src === url));
    const ordered = [...groups].sort((a, b) => Number(colorMatch(b)) - Number(colorMatch(a)));
    const current = ordered.filter(colorMatch).flat();
    const rest = ordered.filter((g) => !colorMatch(g)).flat();

    let cancelled = false;
    const isCancelled = () => cancelled;
    // Maten van de huidige kleur meteen warmen: wisselen moet direct voelen.
    warmImageQueue(current, isCancelled);
    const firstTimer = 0;
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const restStart = () => warmImageQueue(rest, isCancelled);
    const restTimer = window.setTimeout(() => (idle ? idle(restStart) : restStart()), 600);

    return () => {
      cancelled = true;
      window.clearTimeout(firstTimer);
      window.clearTimeout(restTimer);
    };
  }, [product.handle, galleryItems]);

  // Warm de foto's uit de backend voor (Full House, Solo, Duo — automatisch op basis
  // van de varianten, dus zonder handmatige bestandsnamen): eerst de varianten van de
  // huidige kleur, daarna de rest van de galerij. Zo is de eerste wissel direct in beeld.
  useEffect(() => {


    const connection = (navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /2g/.test(connection.effectiveType)) return;

    const colorOf = (v: (typeof variants)[number]) =>
      v.selectedOptions.find((o) => /kleur|color/i.test(o.name))?.value;
    const variantUrls = variants.map((v) => v.image?.url).filter((u): u is string => Boolean(u));
    const currentFirst = variants
      .filter((v) => selectedColor && colorOf(v) === selectedColor)
      .map((v) => v.image?.url)
      .filter((u): u is string => Boolean(u));
    const rest = [
      ...variantUrls.filter((u) => !currentFirst.includes(u)),
      ...allImages.map((img) => img.node.url).filter((u) => !variantUrls.includes(u)),
    ];

    let cancelled = false;
    const isCancelled = () => cancelled;
    const firstTimer = window.setTimeout(() => warmImageQueue(currentFirst, isCancelled), 300);
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const restStart = () => warmImageQueue(rest, isCancelled);
    const restTimer = window.setTimeout(() => (idle ? idle(restStart) : restStart()), 1400);

    return () => {
      cancelled = true;
      window.clearTimeout(firstTimer);
      window.clearTimeout(restTimer);
    };
  }, [product.handle, variants, allImages, selectedColor]);




  // Track benefits carousel scroll position to dim disabled arrows.
  useEffect(() => {
    const carousel = benefitsScrollerRef.current;
    if (!carousel) return;

    const updateScrollState = () => {
      const atStart = carousel.scrollLeft <= 1;
      const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;
      setBenefitsScrollState({ atStart, atEnd });
    };

    updateScrollState();
    carousel.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      carousel.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);



  const handleAdd = async () => {
    if (!activeVariant) return;
    await addItem({
      product: { node: product },
      variantId: activeVariant.id,
      variantTitle: activeVariant.title,
      price: activeVariant.price,
      quantity: 1,
      selectedOptions: activeVariant.selectedOptions,
    });
  };

  const visibleOptions = product.options.filter((o) => {
    if (o.name === "Title" && o.values.length === 1) return false;
    // Voor Full House is de "Opstelling"-optie niet zichtbaar in de UI.
    if (product.handle === "full-house" && /opstelling|position|richting|side/i.test(o.name)) return false;
    return true;
  });
  const hasOptions = visibleOptions.length > 0;
  const numericPrice = activeVariant ? parseFloat(activeVariant.price.amount) : 0;
  // Altijd de prijs uit Shopify gebruiken, geen vaste fallback.
  const shopifyRangePrice = parseFloat(product.priceRange?.minVariantPrice?.amount ?? "0");
  const displayedNumericPrice = numericPrice > 0 ? numericPrice : shopifyRangePrice;
  const currencyCode = activeVariant?.price.currencyCode || "EUR";
  const configuratorPrice = displayedNumericPrice > 0
    ? new Intl.NumberFormat("nl-NL", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(displayedNumericPrice) + "\u2060,-"
    : "Prijs op aanvraag";
  const displayTitle = product.title.replace(/^Wandig\s+/i, "");
  const scrollBenefits = (direction: -1 | 1) => {
    benefitsScrollerRef.current?.scrollBy({ left: direction * 166, behavior: "smooth" });
  };
  return (
    <div className="bg-[#faf8f5]">
      <div className="mx-auto max-w-[1400px] px-0 md:px-10">
      <nav className="hidden lg:flex px-3 md:px-0 text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-3 lg:mb-5 items-center gap-1.5">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-2.5 w-2.5" />
        <Link to="/producten" className="hover:text-foreground">Modellen</Link>
        <ChevronRight className="h-2.5 w-2.5" />
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_490px] lg:gap-10 xl:gap-14">

        {/* Gallery */}
        <div className="min-w-0">
          <MobileGallerySwipe items={galleryItems} handle={product.handle} widthLabel={specWidthLabel} heightLabel={specHeightLabel} />

          {galleryItems[0] && (
            <figure className={`relative hidden overflow-visible rounded-[6px] lg:block lg:sticky lg:top-0 lg:z-0 ${product.handle === "full-house" ? "lg:flex aspect-[4/3] items-center justify-center bg-[#faf8f5]" : ""}`}>
              <Img
                ref={mainGalleryImageRef}
                w={1200}
                priority
                onClick={openGalleryItem ? () => setMainDoorsOpen((open) => !open) : undefined}
                src={openGalleryItem && mainDoorsOpen ? openGalleryItem.src : galleryItems[0].src}
                alt={openGalleryItem && mainDoorsOpen ? openGalleryItem.alt : galleryItems[0].alt}
                className={`block origin-center transition-[filter,transform] ease-out [will-change:filter,transform] ${openGalleryItem ? "cursor-pointer" : ""} ${product.handle === "full-house" ? "h-auto w-[100%] max-w-none object-contain" : galleryItems[0].square ? "aspect-[4/3] w-full object-contain" : "aspect-[4/3] w-full object-cover"}`}
                loading="eager"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-lg bg-white shadow-[0_6px_20px_rgba(31,25,21,0.10)]">
                <Img
                  src={badgeLogo.url}
                  alt="Dutch Design Winner 2026 - 10 jaar garantie"
                  className="h-auto w-20 rounded-lg"
                  w={220}
                  loading="lazy"
                />
              </div>
              <DimensionRuler
                widthLabel={specWidthLabel}
                heightLabel={specHeightLabel}
                open={desktopRulerOpen}
                onToggle={() => setDesktopRulerOpen((open) => !open)}
                align="right"
                position="top-4 right-[-12px] z-30"
              />
            </figure>


          )}

          <div className="relative z-10 mt-3 hidden space-y-3 lg:block md:mt-4 md:space-y-4">

            {subImageGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <figure className="overflow-hidden rounded-[6px]">
                  <Img
                    src={group[0].src}
                    alt={group[0].alt}
                    className="block aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </figure>
                {group.length > 1 && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {group.slice(1).map((image, idx) => (
                      <figure key={idx} className="overflow-hidden rounded-[6px]">
                        <Img
                          src={image.src}
                          alt={image.alt}
                          className="block aspect-[4/3] w-full object-cover"
                          loading="lazy"
                        />
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div ref={galleryContinuationRef} className="h-0 w-full" aria-hidden="true" />
        </div>

        {/* Info */}
        <div className="relative z-10 mt-[calc(5vw-42px)] min-w-0 px-0 lg:mt-0 lg:sticky lg:top-3 lg:ml-auto lg:w-[490px] lg:self-start">
          <div className="space-y-3">
            <section className="overflow-hidden rounded-[20px] rounded-t-[14px] border border-[#eeeeee] bg-[#fef9f5] shadow-[0_18px_45px_rgba(42,31,22,0.07)] md:rounded-t-[20px]">
              <button
                type="button"
                onClick={() => setProductionDetailsOpen((open) => !open)}
                aria-expanded={productionDetailsOpen}
                className="flex min-h-[42px] w-full items-center justify-between gap-4 px-4 text-left text-[#071426]"
              >
                <span className="flex items-center gap-2 font-sans text-[14.4px] font-[385] text-[#cdc0b5]" style={{ textShadow: '0 0.55px 0.55px rgba(0,0,0,0.065)' }}>
                  <Img
                    src={dutchDesignIcon.url}
                    w={64}
                    alt=""
                    aria-hidden="true"
                    className="h-3.5 w-5 shrink-0 object-contain opacity-80"
                  />
                  Dutch Design
                </span>
                <span className="flex h-[21.42px] w-[21.42px] shrink-0 items-center justify-center rounded-full border-2 border-[#cdc0b5] bg-transparent text-[#cdc0b5] shadow-none">
                  <Plus className={`h-[10.71px] w-[10.71px] transition-transform duration-400 ease-out ${productionDetailsOpen ? "rotate-45" : "rotate-0"}`} strokeWidth={2} />
                </span>
              </button>

              <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${productionDetailsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <div className="relative min-h-[210px] px-4 pb-8 pt-3 text-[#cdc0b5]">
                    <p className="text-[17px] font-semibold text-[#071426]">Nederlands gemaakt. Met aandacht.</p>
                    <p className="mt-4 max-w-[340px] text-[13px] leading-relaxed text-[#071426]">
                      Elke Wandig cinewall wordt in onze Nederlandse werkplaats gebouwd, gecontroleerd en plug &amp; play voorbereid voor jouw woonkamer.
                    </p>
                    <p className="mt-4 max-w-[340px] text-[13px] leading-relaxed text-[#071426]">
                      Van de eerste plank tot de laatste kabeldoorvoer: lokaal vakmanschap, precies passend rond jouw tv.
                    </p>
                    <Img
                      src={puzzlePiecesImg.url}
                      w={220}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-5 right-5 w-[79.8px] translate-y-[35%] select-none md:translate-y-0"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-t-[20px] bg-white p-4">
              <div>
                <div className="mt-[15px] grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:grid-cols-[minmax(0,1fr)_230px]">
                  <div>
                    <h1 className="text-[24px] font-bold leading-none text-[#071426]">{displayTitle}</h1>
                    <p className="mt-2 text-[12px] text-[#071426]/45">Cinewall</p>
                    {showReviews && (
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("klantbeoordelingen")?.scrollIntoView({ behavior: "smooth", block: "start" })
                        }
                        className="mt-1 flex cursor-pointer items-center text-[#4f5966]/78 transition hover:text-[#ef7027]"
                        aria-label="Bekijk alle klantbeoordelingen"
                      >
                        <span className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star key={index} className="h-3 w-3 fill-current" strokeWidth={0} />
                          ))}
                        </span>
                        <span className="ml-2 text-[10px] text-[#071426]/30">(1000+)</span>
                      </button>
                    )}

                  </div>

                  <div className="min-w-0 text-right">
                    <SalePrice price={activeVariant.price} compareAtPrice={activeVariant.compareAtPrice} size="md" />
                  </div>
                </div>

                <PaymentOptionsBadges price={displayedNumericPrice} />
              </div>


              {hasOptions && (
                <div className="space-y-2">

                  {visibleOptions.map((opt) => {
                    const isColor = /kleur|color/i.test(opt.name);
                    const isPosition = /opstelling|position|richting|side/i.test(opt.name);
                    const isTvSize = /maat|size|inch/i.test(opt.name);
                    const label = isColor ? "Kleur" : isTvSize ? "Tv-maat" : "Opstelling";
                    const optionExpanded = expandedVariantOption === opt.name;
                    const optionChoices = isTvSize
                      ? [
                          { label: "40 - 55 inch", value: opt.values[0] },
                          { label: "58 - 65 inch", value: opt.values[1] },
                          { label: "70 - 75 inch", value: opt.values[2] },
                          { label: "77 - 85 inch", value: opt.values[3] },
                        ].filter((choice): choice is { label: string; value: string } => Boolean(choice.value))
                      : opt.values.map((value) => ({ label: value, value }));
                    const selectedOptionLabel = isTvSize
                      ? optionChoices.find((choice) => choice.value === selected[opt.name])?.label
                        || selected[opt.name]
                      : selected[opt.name];

                    if (isPosition || isTvSize) {
                      return (
                        <div key={opt.name} className="overflow-hidden rounded-[12px] border border-[#eeeeee]">
                          <button
                            type="button"
                            onClick={() => setExpandedVariantOption((current) => current === opt.name ? null : opt.name)}
                            aria-expanded={optionExpanded}
                            className="flex min-h-[52px] w-full items-center gap-2 px-3 text-left"
                          >
                            <span className="grid min-w-0 flex-1 grid-cols-[105px_minmax(0,1fr)] items-baseline gap-2 md:grid-cols-[80px_minmax(0,1fr)]">
                              <span className="text-[15px] font-[750] leading-none text-[#071426]">{label}</span>
                              <span className="truncate text-[13px] font-[400] leading-none tracking-[0.01em] text-[#858b93]">{selectedOptionLabel || optionChoices[0]?.label}</span>
                            </span>
                            <ChevronDown className={`h-4 w-4 text-[#071426]/45 transition-transform duration-300 ease-out ${optionExpanded ? "rotate-180" : "rotate-0"}`} />
                          </button>

                          <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${optionExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                            <div className="overflow-hidden">
                              <div className={`grid gap-2 px-3 pb-3 pt-1 ${isTvSize ? "grid-cols-2" : "grid-cols-2"}`}>
                                {optionChoices.map((choice) => {
                                  const active = selected[opt.name] === choice.value;
                                  return (
                                    <button
                                      key={choice.label}
                                      type="button"
                                      onClick={() => setSelected((current) => ({ ...current, [opt.name]: choice.value }))}
                                      aria-pressed={active}
                                      className={`h-10 rounded-[8px] border bg-[#f8f6f4] px-2 text-[12px] font-medium text-[#071426] transition-[border-color,box-shadow,background-color,transform] duration-300 ease-out hover:bg-[#f3ece6] active:scale-[0.98] ${active ? "border-[#ff5a00] bg-[#fff8f3] shadow-[0_0_0_2px_rgba(255,90,0,0.18)]" : "border-[#eeeeee] shadow-none"}`}
                                    >
                                      {choice.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    const colorSwatches = (
                      <div className="flex items-center gap-2.5 md:justify-end">
                        {opt.values.slice(0, 5).map((value) => {
                          const active = selected[opt.name] === value;
                          const colorLabel = displayWandigColor(value);
                          const showTooltip = colorTooltip?.value === value;
                          return (
                            <div key={value} className="relative flex shrink-0 flex-col items-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelected((current) => ({ ...current, [opt.name]: value }));
                                  showColorTooltip(value, colorLabel);
                                }}
                                title={colorLabel}
                                aria-label={`Kleur ${colorLabel}`}
                                aria-pressed={active}
                                className={`h-9 w-9 shrink-0 rounded-full border-2 p-[2px] transition-transform hover:scale-105 active:scale-95 ${active ? "border-[#ff5a00]" : "border-transparent"}`}
                              >
                                <span className="block h-full w-full rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.16)]" style={wandigSwatchStyle(value)} />
                              </button>
                              <span
                                className={`pointer-events-none absolute top-full mt-1.5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#071426] px-2 py-1 text-[10px] font-medium text-white shadow-md transition-all duration-200 md:hidden ${showTooltip ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
                                aria-hidden="true"
                              >
                                {colorLabel}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );

                    return (
                      <div key={opt.name} className="grid min-h-[52px] grid-cols-1 content-center gap-2 rounded-[12px] border border-[#eeeeee] px-3 py-2.5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-3 md:py-0">
                        {isColor ? (
                          <>
                            <div className="hidden min-w-0 items-center justify-between md:grid md:grid-cols-[80px_minmax(0,1fr)] md:items-baseline md:gap-2">
                              <span className="text-[15px] font-[750] leading-none text-[#071426]">{label}</span>
                              <span className="truncate text-[13px] font-[400] leading-none tracking-[0.01em] text-[#858b93]">{displayWandigColor(selected[opt.name] || opt.values[0])}</span>
                            </div>
                            <div className="hidden md:block">{colorSwatches}</div>

                            <div className="flex min-w-0 items-center justify-between md:hidden">
                              <span className="text-[15px] font-[750] leading-none text-[#071426]">{label}</span>
                              {colorSwatches}
                              <span className="sr-only" aria-live="polite" aria-atomic="true">
                                {colorTooltip ? `Gekozen kleur: ${colorTooltip.label}` : ""}
                              </span>
                            </div>
                          </>
                        ) : (
                          <label className="relative col-span-1 block min-w-0 md:col-span-2">
                            <span className="sr-only">Kies {label.toLowerCase()}</span>
                            <select
                              value={selected[opt.name] || ""}
                              onChange={(event) => setSelected((current) => ({ ...current, [opt.name]: event.target.value }))}
                              className="h-10 w-full appearance-none bg-transparent pr-7 text-[14px] text-[#071426] outline-none"
                            >
                              {opt.values.map((value) => <option key={value} value={value}>{value}</option>)}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#071426]/45" />
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <Button
                onClick={handleAdd}
                disabled={isLoading || !activeVariant?.availableForSale}
                className="group mt-3 h-12 w-full translate-y-0 overflow-hidden rounded-full bg-gradient-to-b from-[#ef7027] to-[#e36820] px-6 text-sm font-bold text-white shadow-none transition hover:translate-y-0 hover:from-[#e36820] hover:to-[#d8601b] hover:shadow-none active:translate-y-0 active:scale-100"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : activeVariant?.availableForSale ? (
                  <span className="relative block h-full w-full overflow-hidden">
                  <span className="absolute inset-0 flex items-center justify-center gap-1.5 font-[200] tracking-[0.03em] transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    <Img src={basketIcon.url} alt="" className="h-5 w-5 object-contain" w={64} />In winkelwagen
                  </span>
                  <span className="absolute inset-0 flex translate-y-full items-center justify-center gap-1.5 font-[200] tracking-[0.03em] transition-transform duration-300 ease-out group-hover:translate-y-0">
                    <Img src={basketIcon.url} alt="" className="h-5 w-5 object-contain" w={64} />In winkelwagen
                  </span>
                  </span>
                ) : "Uitverkocht"}
              </Button>

              <FreeColorSamples />


              <div className="mb-[10px] mt-[17px] hidden w-full grid-cols-[max-content_max-content_max-content_max-content_max-content] items-center justify-between font-sans tracking-[0.04em] text-[#90949b] sm:grid">
                <div className="flex items-center gap-1.5 text-[12px] font-normal leading-none"><ShieldCheck className="h-[16px] w-[16px] shrink-0" /><span className="whitespace-nowrap">10 jaar garantie</span></div>
                <span className="text-[13px] text-[#cdc0b5]" aria-hidden="true">|</span>
                <div className="flex items-center gap-1.5 text-[12px] font-normal leading-none"><Hammer className="h-[16px] w-[16px] shrink-0" /><span className="whitespace-nowrap">Handgemaakt in NL</span></div>
                <span className="text-[13px] text-[#cdc0b5]" aria-hidden="true">|</span>
                <div className="flex items-center gap-1.5 text-[12px] font-normal leading-none"><Truck className="h-[16px] w-[16px] shrink-0" /><span className="whitespace-nowrap">7-14 werkdagen levertijd</span></div>
              </div>

              <div className="mb-[10px] mt-[17px] grid grid-cols-1 divide-y divide-[#eeeeee] font-sans tracking-[0.04em] text-[#90949b] sm:hidden">
                <div className="flex items-center justify-start gap-1.5 py-2 text-[12px] font-normal leading-none"><ShieldCheck className="h-[16px] w-[16px] shrink-0" /><span>10 jaar garantie</span></div>
                <div className="flex items-center justify-start gap-1.5 py-2 text-[12px] font-normal leading-none"><Hammer className="h-[16px] w-[16px] shrink-0" /><span>Handgemaakt in NL</span></div>
                <div className="flex items-center justify-start gap-1.5 py-2 text-[12px] font-normal leading-none"><Truck className="h-[16px] w-[16px] shrink-0" /><span>7-14 werkdagen levertijd</span></div>
              </div>
              </div>
            </section>

            <section className="rounded-[20px] border border-[#eeeeee] bg-white p-4 shadow-[0_14px_34px_rgba(42,31,22,0.05)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#eeeeee] px-3 py-1.5 text-[12px] font-normal text-[#071426]/55">
                <span className="h-2 w-2 animate-breathing rounded-full bg-[#ff5a00]" />Laatste exemplaren
              </span>
              <p className="mt-2.5 text-[14px] font-bold text-[#071426]">
                Transformeer je woonkamer in 7 - 14 werkdagen.
                <DeliveryInfoTooltip />
              </p>
              <p className="mt-1 text-[12px] text-[#071426]/55">Bestel vandaag en transformeer je woonkamer.</p>
            </section>

            <section className="overflow-hidden rounded-[20px] border border-[#eeeeee] bg-white p-3 shadow-[0_14px_34px_rgba(42,31,22,0.05)]">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="text-[14px] font-bold text-[#071426]">Jouw voordelen</h2>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    aria-label="Vorige voordelen"
                    onClick={() => scrollBenefits(-1)}
                    disabled={benefitsScrollState.atStart}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#071426] transition-opacity disabled:text-[#071426]/25"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    aria-label="Volgende voordelen"
                    onClick={() => scrollBenefits(1)}
                    disabled={benefitsScrollState.atEnd}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[#071426] transition-opacity disabled:text-[#071426]/25"
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                  </button>

                </div>
              </div>
              <div ref={benefitsScrollerRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {PRODUCT_BENEFITS.map((benefit) => (
                  <article key={benefit.title} className="relative h-[195px] min-w-[150px] snap-start overflow-hidden rounded-[13px] bg-[#eee4dc] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                    <Img src={benefit.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[90px] bg-gradient-to-b from-black/55 via-black/25 to-transparent" />
                    <div className="absolute inset-x-0 top-0 px-4 pt-5">
                      <h3 className="text-center text-[13px] font-normal leading-tight tracking-[0.03em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">{benefit.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-0">
      <SpecificationsSection
        widthLabel={specWidthLabel}
        heightLabel={specHeightLabel}
        modelLabel={specModelLabel}
        configSummary={{
          colorLabel: specPreviewColor,
          tvSizeLabel: dimensionSize.label,
          modulesLabel: specModulesLabel,
        }}
        preview={
          <WandigSpecPreview
            color={specPreviewColor}
            source={specPreviewSource}
            crops={specModuleAsset?.specCrops ?? specModuleAsset?.crops}
            hasLeft={specHasLeft}
            hasRight={specHasRight}
          />
        }
      />

      <UniqueSection />

      <BeforeAfterSection
        {...(product.handle === "solo"
          ? { beforeSrc: beforeSoloAsset.url, afterSrc: afterSoloAsset.url }
          : {})}
      />
      </div>


      <CustomerGallerySection
        firstImageSrc={isSolo ? soloWoonkamerLampAsset.url : undefined}
        ctaLabel={isSolo ? "Bestel Solo" : "Bestel Full House"}
        ctaTo={isSolo ? "/product/solo" : undefined}
      />

      </div>

      <BuiltToLastSection />

      <FaqSection />

      {showReviews && <ReviewsSection />}

      <NewsletterContactSection />

      <TrustBannerSection />

      {/* Sticky besteller-widget linksonder */}
      <div
        className={`pointer-events-none fixed bottom-5 left-5 z-50 transition-all duration-300 ease-out ${
          showOrderWidget ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={`Bestel ${displayTitle} en kies je kleur`}
          className={`group flex items-center gap-4 rounded-[18px] py-2.5 pl-5 pr-2.5 shadow-[0_14px_35px_rgba(42,31,22,0.18)] transition-transform duration-200 hover:-translate-y-0.5 ${
            showOrderWidget ? "pointer-events-auto" : ""
          }`}
          style={{ background: "linear-gradient(105deg, #f9cfa8 0%, #f5a87a 55%, #ef9464 100%)" }}
        >
          <span className="text-left">
            <span className="block text-[19px] font-bold leading-tight text-[#071426]">{displayTitle}</span>
            <span className="block text-[15px] font-bold leading-tight text-[#ff5a00]">
              {configuratorPrice}
            </span>
          </span>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff6e15] text-white shadow-[0_6px_14px_rgba(0,0,0,0.15)]">
            <SlidersHorizontal className="h-5 w-5" strokeWidth={2} />
          </span>
        </button>
      </div>

    </div>
  );
}

function DeliveryInfoTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative ml-1.5 inline-block align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label="Meer informatie over de levering"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-[16px] w-[16px] items-center justify-center rounded-full border border-[#ff6e15] text-[10px] font-bold leading-none text-[#ff6e15] transition-colors hover:bg-[#ff6e15] hover:text-white"
      >
        i
      </button>
      <span
        role="tooltip"
        className={`fixed left-1/2 top-1/2 z-50 w-[min(320px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-[16px] border border-[#eeeeee] bg-white p-3.5 text-left shadow-[0_18px_40px_rgba(42,31,22,0.14)] transition-all duration-200 sm:absolute sm:bottom-[calc(100%+10px)] sm:left-1/2 sm:top-auto sm:z-30 sm:w-[266px] sm:-translate-y-0 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <span className="block text-[13px] font-bold text-[#071426]">Hoe wordt mijn tv kast geleverd?</span>
        <span className="mt-1.5 block text-[12px] font-normal leading-[1.55] text-[#071426]/60">
          Je tv kast wordt plug and play en grotendeels voorgemonteerd geleverd. Geen ingewikkeld bouwpakket dus. Met twee
          personen bevestig je de verschillende onderdelen eenvoudig aan de muur, zodat je snel van je nieuwe tv kast kunt
          genieten.
        </span>
        <span className="absolute left-1/2 top-full hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[#eeeeee] bg-white sm:block" />

      </span>
    </span>
  );
}
