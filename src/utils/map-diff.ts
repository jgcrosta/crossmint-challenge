import { type MegaverseObjectNames } from "~/server/api/utils/megaverse/goal-map/goal-map-schema";
import type {
  MegaverseMap,
  MegaverseObject,
} from "~/server/api/utils/megaverse/megaverse";

export interface MegaverseDiff {
  row: number;
  column: number;
  object: Lowercase<MegaverseObjectNames>;
}

export const mapDiff = ({
  goalMap,
  currentMap,
}: {
  goalMap: MegaverseMap;
  currentMap: MegaverseMap;
}): MegaverseDiff[] => {
  const diff: MegaverseDiff[] = [];
  for (let row = 0; row < goalMap.length; row++) {
    const goalRow = goalMap[row];
    const currentRow = currentMap[row];

    if (!goalRow || !currentRow) {
      throw new Error(`Undefined row found in the current map or the goal map`);
    }

    for (let column = 0; column < goalRow.length; column++) {
      const goalCell = goalRow[column];
      const currentCell = currentRow[column];

      if (!goalCell || !currentCell) {
        throw new Error(
          `Undefined cell found in the current map or the goal map`,
        );
      }

      if (goalCell.type !== currentCell.type) {
        diff.push(getCellDiff(row, column, goalCell));
      }
    }
  }
  return diff;
};

const getCellDiff = (
  row: number,
  column: number,
  goalCell: MegaverseObject,
): MegaverseDiff => {
  if (goalCell.type === "space" || goalCell.type === "polyanet") {
    return {
      row,
      column,
      object: goalCell.type,
    };
  } else if (goalCell.type === "soloon") {
    return {
      row,
      column,
      object: `${goalCell.color}_soloon`,
    };
  } else {
    // We are sure that the type is COMETH
    return {
      row,
      column,
      object: `${goalCell.direction}_cometh`,
    };
  }
};
