import { type MegaverseDiff } from "./map-diff";
import {
  addCometh,
  deleteCometh,
  getComethFromDirection,
  isComethDirection,
} from "~/utils/astral-objects/cometh";
import {
  addSoloon,
  deleteSoloon,
  getSoloonFromColor,
  isSoloonColor,
} from "~/utils/astral-objects/soloons";
import {
  type MegaverseObject,
  type MegaverseMap,
} from "~/server/api/utils/megaverse/megaverse";
import { addPolyanet, deletePolyanet } from "~/utils/astral-objects/polyanet";
import { type Dispatch, type SetStateAction } from "react";

// Delay constant for re-rendering the map
const RE_RENDER_DELAY = 750;

// Utility to introduce a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Deep clone utility to avoid mutating the original map
const deepCloneMap = (map: MegaverseMap): MegaverseMap => {
  return JSON.parse(JSON.stringify(map)) as MegaverseMap;
};

// Utility to update a specific cell in the MegaverseMap
const updateMapCell = (
  map: MegaverseMap,
  row: number,
  column: number,
  newValue: MegaverseObject,
): MegaverseMap => {
  const clonedMap = deepCloneMap(map);
  const currentRow = clonedMap[row];
  if (currentRow) {
    currentRow[column] = newValue;
  }
  return clonedMap;
};

// Match the map with the given differences
export const matchMegaverseMap = async (
  mapDiff: MegaverseDiff[],
  setCurrentMap: Dispatch<SetStateAction<MegaverseMap>>,
) => {
  for (const element of mapDiff) {
    const { row, column, object } = element;

    let modifiedObject: MegaverseObject = {
      type: "POLYANET",
      icon: "🪐",
    };

    // Handle different object types and their respective utilities
    if (object === "POLYANET") {
      await addPolyanet(row, column);
    } else {
      const [objectProperty, objectType] = object.split("_");
      if (!objectProperty || !objectType) continue;
      if (objectType === "SOLOON" && isSoloonColor(objectProperty)) {
        await addSoloon(row, column, objectProperty);
        modifiedObject = getSoloonFromColor(objectProperty);
      } else if (objectType === "COMETH" && isComethDirection(objectProperty)) {
        await addCometh(row, column, objectProperty);
        modifiedObject = getComethFromDirection(objectProperty);
      }
    }

    // Update the map with the new/modified object
    setCurrentMap((prev) => updateMapCell(prev, row, column, modifiedObject));
    await delay(RE_RENDER_DELAY);
  }
};

// Clear objects from the map
export const clearMegaverseMap = async (
  currentMap: MegaverseMap,
  setCurrentMap: Dispatch<SetStateAction<MegaverseMap>>,
) => {
  for (let row = 0; row < currentMap.length; row++) {
    const currentRow = currentMap[row];
    if (!currentRow) continue;

    for (let column = 0; column < currentRow.length; column++) {
      const currentCell = currentRow[column];
      if (!currentCell || currentCell.type === "SPACE") continue;

      // Handle deletion of different object types
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

      // Update the map to reflect the removed object
      const modifiedObject: MegaverseObject = {
        type: "SPACE",
        icon: "🌌",
      };
      setCurrentMap((prev) => updateMapCell(prev, row, column, modifiedObject));
      await delay(RE_RENDER_DELAY);
    }
  }
};
