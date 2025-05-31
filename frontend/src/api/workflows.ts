import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Função para executar um workflow dinâmico
export async function runWorkflow(payload: any): Promise<any> {
  const { data } = await api.post("/workflows/run", payload);
  return data;
}
