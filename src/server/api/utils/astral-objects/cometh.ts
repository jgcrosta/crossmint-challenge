import axios from "axios";
import { env } from "~/env.mjs";
import { type ComethType } from "../megaverse/current-map/current-map-schema";
import { type MegaverseObject } from "../megaverse/megaverse";

// Api
export const addCometh = async (
  row: number,
  column: number,
  direction: ComethType["direction"],
) => {
  const candidateId = env.CANDIDATE_ID;
  const url = `${env.CROSSMINT_API_URL}comeths`;
  const data = {
    candidateId,
    row,
    column,
    direction,
  };

  await axios.post(url, data);
};

export const deleteCometh = async (row: number, column: number) => {
  const candidateId = env.CANDIDATE_ID;
  const url = `${env.CROSSMINT_API_URL}comeths`;
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
    "UP",
    "DOWN",
    "LEFT",
    "RIGHT",
  ];
  return validDirections.includes(value as ComethType["direction"]);
}

export const handleComethDirection = (
  objectProperty: string | undefined,
): MegaverseObject => {
  switch (objectProperty) {
    case "UP":
      return {
        type: "COMETH",
        direction: "UP",
        icon: "⬆️",
      };
    case "DOWN":
      return {
        type: "COMETH",
        direction: "DOWN",
        icon: "⬇️",
      };
    case "LEFT":
      return {
        type: "COMETH",
        direction: "LEFT",
        icon: "⬅️",
      };
    case "RIGHT":
      return {
        type: "COMETH",
        direction: "RIGHT",
        icon: "➡️",
      };
    default:
      throw new Error(`Invalid Cometh direction: ${objectProperty}`);
  }
};
