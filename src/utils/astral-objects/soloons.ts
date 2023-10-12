import axios from "axios";
import { env } from "~/env.mjs";
import { type SoloonType } from "~/server/api/utils/megaverse/current-map/current-map-schema";
import { type MegaverseObject } from "~/server/api/utils/megaverse/megaverse";

// Api
export const addSoloon = async (
  row: number,
  column: number,
  color: SoloonType["color"],
) => {
  const candidateId = env.NEXT_PUBLIC_CANDIDATE_ID;
  const url = `${env.NEXT_PUBLIC_CROSSMINT_API_URL}soloons`;
  const data = {
    candidateId,
    row,
    column,
    color,
  };

  await axios.post(url, data);
};

export const deleteSoloon = async (row: number, column: number) => {
  const candidateId = env.NEXT_PUBLIC_CANDIDATE_ID;
  const url = `${env.NEXT_PUBLIC_CROSSMINT_API_URL}soloons`;
  const data = {
    candidateId,
    row,
    column,
  };

  await axios.delete(url, { data });
};

// Helpers
export function isSoloonColor(value: string): value is SoloonType["color"] {
  const validColors: SoloonType["color"][] = ["BLUE", "RED", "PURPLE", "WHITE"];
  return validColors.includes(value as SoloonType["color"]);
}

export const getSoloonFromColor = (
  objectProperty: string | undefined,
): MegaverseObject => {
  switch (objectProperty) {
    case "BLUE":
      return {
        type: "SOLOON",
        color: "BLUE",
        icon: "🔵",
      };
    case "WHITE":
      return {
        type: "SOLOON",
        color: "WHITE",
        icon: "⚪",
      };
    case "RED":
      return {
        type: "SOLOON",
        color: "RED",
        icon: "🔴",
      };
    case "PURPLE":
      return {
        type: "SOLOON",
        color: "PURPLE",
        icon: "🟣",
      };
    default:
      throw new Error(`Invalid color: ${objectProperty}`);
  }
};
