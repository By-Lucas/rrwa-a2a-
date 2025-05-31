import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });


export interface AgentDetail {
  name: string;
  description: string;
  example_payload: object;
  fields: { name: string; type: string; description: string }[];
}

export async function getAgentsList(): Promise<AgentDetail[]> {
  const { data } = await api.get<{ agents: AgentDetail[] }>("/agents/list");
  return data.agents;
}

export async function executeAgent(agent: string, payload: object) {
  const { data } = await api.post(`/agents/${agent}/execute`, payload);
  return data;
}
