# Configurator left-module alignment fix

## Goal
Fix the visual alignment of the left module in the configurator so it sits flush and symmetric with the center module.

## Changes
In `src/routes/configurator.tsx`, around the left-module wrapper (lines 200–212):

1. **Move the left module up by 2 px.** Add a small upward offset so its top edge aligns with the center module’s top edge.
2. **Increase the left-module image size by 4 %.** Scale the inner image from `100 %` to `104 %` so it fills the height better without looking too small.
3. **Keep the snap flush.** Maintain the existing negative overlap (`mr-[-3px]`) and z-index layering (left module under center module) so no white seam appears between the modules.

## Verification
- Open `/configurator` in the preview.
- Toggle the left module on.
- Confirm the left module top edge is level with the center module and that no white gap is visible at the joint.
