import { z } from "zod";

// Space object
export const SpaceType = z.null();
export type SpaceType = z.infer<typeof SpaceType>;

// Polyanet object
export const PolyanetType = z.object({
  type: z.literal(0),
});
export type PolyanetType = z.infer<typeof PolyanetType>;

// Soloon object
export const SoloonType = z.object({
  type: z.literal(1),
  color: z.enum(["blue", "red", "purple", "white"]),
});
export type SoloonType = z.infer<typeof SoloonType>;

// Cometh object
export const ComethType = z.object({
  type: z.literal(2),
  direction: z.enum(["up", "down", "left", "right"]),
});
export type ComethType = z.infer<typeof ComethType>;

// Map schema
export const CurrentMapSchema = z
  .object({
    map: z.object({
      _id: z.string(),
      candidateId: z.string(),
      phase: z.number(),
      __v: z.number(),
      content: z.array(
        z.array(z.union([SpaceType, PolyanetType, SoloonType, ComethType])),
      ),
    }),
  })
  .refine(
    (data) => {
      return data.map.content.every(
        (row) => row.length === data.map.content.length,
      );
    },
    {
      message: "Number of rows and cells in each row must be the same",
      path: ["map", "content"],
    },
  );

export type CurrentMapSchema = z.infer<typeof CurrentMapSchema>;
