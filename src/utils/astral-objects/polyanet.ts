import axios from "axios";
import { env } from "~/env.mjs";

// Api
export const addPolyanet = async (row: number, column: number) => {
  const candidateId = env.NEXT_PUBLIC_CANDIDATE_ID;
  const url = `${env.NEXT_PUBLIC_CROSSMINT_API_URL}polyanets`;
  const data = {
    candidateId,
    column,
    row,
  };

  await axios.post(url, data);
};

export const deletePolyanet = async (row: number, column: number) => {
  const candidateId = env.NEXT_PUBLIC_CANDIDATE_ID;
  const url = `${env.NEXT_PUBLIC_CROSSMINT_API_URL}polyanets`;
  const data = {
    candidateId,
    column,
    row,
  };

  await axios.delete(url, { data });
};
