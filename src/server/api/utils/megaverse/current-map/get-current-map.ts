import type {
  MegaverseMap,
  MegaverseObject,
} from "~/server/api/utils/megaverse/megaverse";
import type {
  SpaceType,
  PolyanetType,
  SoloonType,
  ComethType,
  CurrentMapSchema,
} from "./current-map-schema";
import { getSoloonFromColor } from "~/utils/astral-objects/soloons";
import { getComethFromDirection } from "~/utils/astral-objects/cometh";

const getCellObject = (
  cell: SpaceType | PolyanetType | SoloonType | ComethType,
): MegaverseObject => {
  if (!cell) {
    return {
      type: "SPACE",
      icon: "🌌",
    };
  } else {
    switch (cell.type) {
      case 0:
        return {
          type: "POLYANET",
          icon: "🪐",
        };
      case 1:
        return getSoloonFromColor(cell.color);
      case 2:
        return getComethFromDirection(cell.direction);
      default:
        throw new Error(`Invalid cell type`);
    }
  }
};

export const getCurrentMap = (map: CurrentMapSchema): MegaverseMap => {
  return map.map.content.map((row) => {
    return row.map((cell) => {
      return getCellObject(cell);
    });
  });
};
