import axios from "axios";
import { GoalMapSchema } from "./goal-map-schema";

export const fetchGoalMap = async (candidateId: string, apiUrl: string) => {
  const goalMapResponse = await axios.get(`${apiUrl}/map/${candidateId}/goal`);
  return GoalMapSchema.parse(goalMapResponse.data);
};
