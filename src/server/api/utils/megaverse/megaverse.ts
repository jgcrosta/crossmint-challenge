import { z } from "zod";

// Megaverse icons
export const MegaverseIcons = z.union([
  z.literal("🪐"),
  z.literal("🌌"),
  z.literal("🔵"),
  z.literal("🔴"),
  z.literal("🟣"),
  z.literal("⚪"),
  z.literal("⬆️"),
  z.literal("⬇️"),
  z.literal("⬅️"),
  z.literal("➡️"),
]);
export type MegaverseIcons = z.infer<typeof MegaverseIcons>;

// Megaverse objects
export const Space = z.object({
  type: z.literal("space"),
  icon: MegaverseIcons,
});
export type Space = z.infer<typeof Space>;

export const Polyanet = z.object({
  type: z.literal("polyanet"),
  icon: MegaverseIcons,
});
export type Polyanet = z.infer<typeof Polyanet>;

export const Soloon = z.object({
  type: z.literal("soloon"),
  color: z.union([
    z.literal("white"),
    z.literal("blue"),
    z.literal("red"),
    z.literal("purple"),
  ]),
  icon: MegaverseIcons,
});
export type Soloon = z.infer<typeof Soloon>;

export const Cometh = z.object({
  type: z.literal("cometh"),
  direction: z.union([
    z.literal("up"),
    z.literal("down"),
    z.literal("left"),
    z.literal("right"),
  ]),
  icon: MegaverseIcons,
});
export type Cometh = z.infer<typeof Cometh>;

export const MegaverseObject = z.union([Space, Polyanet, Soloon, Cometh]);
export type MegaverseObject = z.infer<typeof MegaverseObject>;

// Megaverse map
export const MegaverseMap = z.array(z.array(MegaverseObject));
export type MegaverseMap = z.infer<typeof MegaverseMap>;
