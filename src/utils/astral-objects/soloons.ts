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
  const url = `${env.NEXT_PUBLIC_CROSSMINT_API_URL}/soloons`;
  await axios.post(url, {
    row,
    column,
    color,
    candidateId,
  });
};

export const deleteSoloon = async (row: number, column: number) => {
  const candidateId = env.NEXT_PUBLIC_CANDIDATE_ID;
  const url = `${env.NEXT_PUBLIC_CROSSMINT_API_URL}/soloons`;
  const data = {
    candidateId,
    row,
    column,
  };

  await axios.delete(url, { data });
};

// Helpers
export function isSoloonColor(value: string): value is SoloonType["color"] {
  const validColors: SoloonType["color"][] = ["blue", "red", "purple", "white"];
  return validColors.includes(value as SoloonType["color"]);
}

export const getSoloonFromColor = (
  objectProperty: string | undefined,
): MegaverseObject => {
  switch (objectProperty) {
    case "blue":
      return {
        type: "soloon",
        color: "blue",
        icon: "🔵",
      };
    case "white":
      return {
        type: "soloon",
        color: "white",
        icon: "⚪",
      };
    case "red":
      return {
        type: "soloon",
        color: "red",
        icon: "🔴",
      };
    case "purple":
      return {
        type: "soloon",
        color: "purple",
        icon: "🟣",
      };
    default:
      throw new Error(`Invalid color: ${objectProperty}`);
  }
};
