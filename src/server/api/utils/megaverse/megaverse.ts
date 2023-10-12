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
  type: z.literal("SPACE"),
  icon: MegaverseIcons,
});
export type Space = z.infer<typeof Space>;

export const Polyanet = z.object({
  type: z.literal("POLYANET"),
  icon: MegaverseIcons,
});
export type Polyanet = z.infer<typeof Polyanet>;

export const Soloon = z.object({
  type: z.literal("SOLOON"),
  color: z.union([
    z.literal("WHITE"),
    z.literal("BLUE"),
    z.literal("RED"),
    z.literal("PURPLE"),
  ]),
  icon: MegaverseIcons,
});
export type Soloon = z.infer<typeof Soloon>;

export const Cometh = z.object({
  type: z.literal("COMETH"),
  direction: z.union([
    z.literal("UP"),
    z.literal("DOWN"),
    z.literal("LEFT"),
    z.literal("RIGHT"),
  ]),
  icon: MegaverseIcons,
});
export type Cometh = z.infer<typeof Cometh>;

export const MegaverseObject = z.union([Space, Polyanet, Soloon, Cometh]);
export type MegaverseObject = z.infer<typeof MegaverseObject>;

// Megaverse map
export const MegaverseMap = z.array(z.array(MegaverseObject));
export type MegaverseMap = z.infer<typeof MegaverseMap>;
