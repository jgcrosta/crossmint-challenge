import { z } from "zod";
import { addPolyanet, deletePolyanet } from "../utils/astral-objects/polyanet";
import { MegaverseMap } from "~/server/api/utils/megaverse/megaverse";
import {
  addCometh,
  deleteCometh,
  isComethDirection,
} from "../utils/astral-objects/cometh";
import {
  addSoloon,
  deleteSoloon,
  isSoloonColor,
} from "../utils/astral-objects/soloons";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { MegaverseObjectNames } from "../utils/megaverse/goal-map/goal-map-schema";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const goalMapRouter = createTRPCRouter({
  match: publicProcedure
    .input(
      z.array(
        z.object({
          row: z.number(),
          column: z.number(),
          object: MegaverseObjectNames,
        }),
      ),
    )
    .mutation(async ({ input }) => {
      for (const element of input) {
        if (!element) continue;

        const { row, column, object } = element;

        if (object === "POLYANET") {
          await addPolyanet(row, column);
        } else {
          const [objectProperty, objectType] = object.split("_");
          if (!objectProperty || !objectType) continue;

          if (objectType === "SOLOON") {
            if (!isSoloonColor(objectProperty)) continue;
            await addSoloon(row, column, objectProperty);
          } else if (objectType === "COMETH") {
            if (!isComethDirection(objectProperty)) continue;
            await addCometh(row, column, objectProperty);
          }
        }
        await delay(1000);
      }
    }),
  clear: publicProcedure
    .input(
      z.object({
        currentMap: MegaverseMap,
      }),
    )
    .mutation(async ({ input }) => {
      const { currentMap } = input;

      for (let row = 0; row < currentMap.length; row++) {
        const currentRow = currentMap[row];

        if (!currentRow) continue;

        for (let column = 0; column < currentRow.length; column++) {
          const currentCell = currentRow[column];

          if (!currentCell || currentCell.type === "SPACE") continue;

          switch (currentCell.type) {
            case "POLYANET":
              await deletePolyanet(row, column);
              break;
            case "COMETH":
              await deleteCometh(row, column);
              break;
            case "SOLOON":
              await deleteSoloon(row, column);
              break;
          }
          await delay(1000);
        }
      }
    }),
});
