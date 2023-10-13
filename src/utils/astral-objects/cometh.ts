import axios from "axios";
import { env } from "~/env.mjs";
import { type ComethType } from "~/server/api/utils/megaverse/current-map/current-map-schema";
import { type MegaverseObject } from "~/server/api/utils/megaverse/megaverse";

// Api
export const addCometh = async (
  row: number,
  column: number,
  direction: ComethType["direction"],
) => {
  const candidateId = env.NEXT_PUBLIC_CANDIDATE_ID;
  const url = `${env.NEXT_PUBLIC_CROSSMINT_API_URL}/comeths`;

  await axios.post(url, {
    row,
    column,
    direction,
    candidateId,
  });
};

export const deleteCometh = async (row: number, column: number) => {
  const candidateId = env.NEXT_PUBLIC_CANDIDATE_ID;
  const url = `${env.NEXT_PUBLIC_CROSSMINT_API_URL}/comeths`;
  const data = {
    candidateId,
    row,
    column,
  };

  await axios.delete(url, { data });
};

// Helpers
export function isComethDirection(
  value: string,
): value is ComethType["direction"] {
  const validDirections: ComethType["direction"][] = [
    "up",
    "down",
    "left",
    "right",
  ];
  return validDirections.includes(value as ComethType["direction"]);
}

export const getComethFromDirection = (
  objectProperty: string | undefined,
): MegaverseObject => {
  switch (objectProperty) {
    case "up":
      return {
        type: "cometh",
        direction: "up",
        icon: "⬆️",
      };
    case "down":
      return {
        type: "cometh",
        direction: "down",
        icon: "⬇️",
      };
    case "left":
      return {
        type: "cometh",
        direction: "left",
        icon: "⬅️",
      };
    case "right":
      return {
        type: "cometh",
        direction: "right",
        icon: "➡️",
      };
    default:
      throw new Error(`Invalid Cometh direction: ${objectProperty}`);
  }
};
