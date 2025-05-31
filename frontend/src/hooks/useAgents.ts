import { useQuery } from "@tanstack/react-query";
import { getAgentsList } from "../api/agents";

// Diga ao TS que o resultado será array
export function useAgents() {
  return useQuery<any[]>({
    queryKey: ["agents"],
    queryFn: getAgentsList,
  });
}
