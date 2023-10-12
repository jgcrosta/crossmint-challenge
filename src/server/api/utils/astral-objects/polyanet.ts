import axios from "axios";
import { env } from "~/env.mjs";

// Api
export const addPolyanet = async (row: number, column: number) => {
  const candidateId = env.CANDIDATE_ID;
  const url = `${env.CROSSMINT_API_URL}polyanets`;
  const data = {
    candidateId,
    column,
    row,
  };

  await axios.post(url, data);
};

export const deletePolyanet = async (row: number, column: number) => {
  const candidateId = env.CANDIDATE_ID;
  const url = `${env.CROSSMINT_API_URL}polyanets`;
  const data = {
    candidateId,
    column,
    row,
  };

  await axios.delete(url, { data });
};
