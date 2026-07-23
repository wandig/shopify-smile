type PuzzleDividerProps = {
  topColor: string;
  bottomColor: string;
  direction?: "down" | "up";
  offset?: number; // 0-100, horizontal position of puzzle knob in %
};

/**
 * Full-width divider that visually "clicks" two sections together with a
 * single puzzle knob at `offset`. `direction="down"` = knob pokes from the
 * top section into the bottom. `direction="up"` = knob pokes upward.
 */
export function PuzzleDivider({
  topColor,
  bottomColor,
  direction = "down",
  offset = 50,
}: PuzzleDividerProps) {
  const H = 40; // total svg height in px
  const KNOB_W = 90; // knob width in px
  const KNOB_H = 26; // knob protrusion in px
  const NECK = 26; // "neck" of the puzzle tab

  // Build the top-section fill path in a 1000x40 viewBox. We'll position the
  // knob horizontally with a CSS trick: we scale viewBox width to 1000 and
  // draw the knob centered around cx=500, then translate the entire svg via
  // background positioning — simpler: use two svgs, one flat line + one
  // absolute knob-shape.
  const cx = 500; // knob center in viewBox units (viewBox is 1000 wide)

  // Convert knob dims from px to viewBox units. We treat viewBox width 1000
  // as visually variable; instead just render at fixed size and let SVG
  // scale. Simpler: use two overlaid svgs.

  // Approach: one flat colored strip for the bottom half + an absolutely
  // positioned knob svg that carries the top color and pokes down (or up).
  const knobDown = direction === "down";

  // Knob path (a rounded tab). Origin at top-left of the knob svg
  // (KNOB_W wide, KNOB_H+2 tall). Drawn as filled shape of topColor when
  // direction=down; sits on top of the bottom-color strip.
  const w = KNOB_W;
  const h = KNOB_H;
  const neckStart = (w - NECK) / 2;
  const neckEnd = neckStart + NECK;

  // Path: start at bottom-left, go up along tab. For down direction, tab
  // extends downward from the divider line. We render the knob svg
  // absolutely positioned with its top aligned to the divider midline.
  const knobPath = knobDown
    ? `M 0 0
       L ${neckStart} 0
       C ${neckStart} ${h * 0.15}, ${neckStart - 8} ${h * 0.35}, ${neckStart + 4} ${h * 0.55}
       C ${w / 2 - 14} ${h * 0.95}, ${w / 2 + 14} ${h * 0.95}, ${neckEnd - 4} ${h * 0.55}
       C ${neckEnd + 8} ${h * 0.35}, ${neckEnd} ${h * 0.15}, ${neckEnd} 0
       L ${w} 0
       L ${w} -1
       L 0 -1 Z`
    : `M 0 ${h}
       L ${neckStart} ${h}
       C ${neckStart} ${h - h * 0.15}, ${neckStart - 8} ${h - h * 0.35}, ${neckStart + 4} ${h - h * 0.55}
       C ${w / 2 - 14} ${h * 0.05}, ${w / 2 + 14} ${h * 0.05}, ${neckEnd - 4} ${h - h * 0.55}
       C ${neckEnd + 8} ${h - h * 0.35}, ${neckEnd} ${h - h * 0.15}, ${neckEnd} ${h}
       L ${w} ${h}
       L ${w} ${h + 1}
       L 0 ${h + 1} Z`;

  return (
    <div
      aria-hidden
      className="relative w-full"
      style={{ height: `${H}px`, backgroundColor: bottomColor }}
    >
      {/* top half strip in the top color */}
      <div
        className="absolute left-0 right-0 top-0"
        style={{
          height: knobDown ? `${H / 2}px` : `${H / 2}px`,
          backgroundColor: topColor,
        }}
      />
      {/* knob */}
      <div
        className="absolute"
        style={{
          left: `${offset}%`,
          top: knobDown ? `${H / 2}px` : `${H / 2 - KNOB_H}px`,
          transform: "translateX(-50%)",
          width: `${KNOB_W}px`,
          height: `${KNOB_H + 1}px`,
        }}
      >
        <svg
          width={KNOB_W}
          height={KNOB_H + 1}
          viewBox={`0 0 ${KNOB_W} ${KNOB_H + 1}`}
          style={{ display: "block", overflow: "visible" }}
        >
          <path d={knobPath} fill={knobDown ? topColor : bottomColor} />
        </svg>
      </div>
    </div>
  );
}

export default PuzzleDivider;
