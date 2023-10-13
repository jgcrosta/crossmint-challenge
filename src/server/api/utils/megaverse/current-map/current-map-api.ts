import axios from "axios";
import { CurrentMapSchema } from "./current-map-schema";

export const fetchCurrentMap = async (candidateId: string, apiUrl: string) => {
  const currentMapResponse = await axios.get(`${apiUrl}/map/${candidateId}`);
  return CurrentMapSchema.parse(currentMapResponse.data);
};
