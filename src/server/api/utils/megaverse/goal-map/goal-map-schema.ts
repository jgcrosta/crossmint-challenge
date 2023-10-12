import { z } from "zod";

// Megaverse object names
export const MegaverseObjectNames = z.union([
  z.literal("SPACE"),
  z.literal("POLYANET"),
  z.literal("WHITE_SOLOON"),
  z.literal("BLUE_SOLOON"),
  z.literal("RED_SOLOON"),
  z.literal("PURPLE_SOLOON"),
  z.literal("DOWN_COMETH"),
  z.literal("LEFT_COMETH"),
  z.literal("UP_COMETH"),
  z.literal("RIGHT_COMETH"),
]);
export type MegaverseObjectNames = z.infer<typeof MegaverseObjectNames>;

export const GoalMapSchema = z
  .object({
    goal: z.array(z.array(MegaverseObjectNames)),
  })
  .refine(
    (data) => {
      return data.goal.every((row) => row.length === data.goal.length);
    },
    {
      message: "Number of rows and cells in each row must be the same",
      path: ["goal"],
    },
  );
export type GoalMapSchema = z.infer<typeof GoalMapSchema>;
