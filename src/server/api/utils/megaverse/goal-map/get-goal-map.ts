import {
  type MegaverseObjectNames,
  type GoalMapSchema,
} from "./goal-map-schema";
import { type MegaverseMap, type MegaverseObject } from "../megaverse";
import { getSoloonFromColor } from "~/utils/astral-objects/soloons";
import { getComethFromDirection } from "~/utils/astral-objects/cometh";

const getCellProperties = (cell: MegaverseObjectNames): MegaverseObject => {
  if (cell === "SPACE") {
    return {
      type: "space",
      icon: "🌌",
    };
  } else if (cell === "POLYANET") {
    return {
      type: "polyanet",
      icon: "🪐",
    };
  } else {
    const [objectProperty, objectType] = cell.split("_");
    switch (objectType) {
      case "SOLOON":
        return getSoloonFromColor(objectProperty?.toLowerCase());
      case "COMETH":
        return getComethFromDirection(objectProperty?.toLowerCase());
      default:
        throw new Error(`Invalid cell type: ${objectType}`);
    }
  }
};

export const getGoalMap = (map: GoalMapSchema): MegaverseMap => {
  return map.goal.map((row) =>
    row.map((cell) => {
      return getCellProperties(cell);
    }),
  );
};
