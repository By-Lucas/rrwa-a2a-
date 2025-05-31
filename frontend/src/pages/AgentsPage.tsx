import React, { useEffect, useState } from "react";
import { getAgentsList } from "../api/agents";
import { Container } from "../components/Container";
import { AgentCard } from "../components/AgentCard";

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAgentsList().then(setAgents).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: "#f7f8fa", minHeight: "100vh" }}>
      <Container>
        <h1 style={{
          fontSize: 36,
          margin: "0 0 24px 0"
        }}>Agentes Disponíveis</h1>

        {loading && <div>Carregando agentes...</div>}
        {!loading && agents.length === 0 && <div>Nenhum agente encontrado.</div>}
        {!loading && agents.map(agent => (
          <AgentCard
            key={agent.name}
            name={agent.name}
            description={agent.description}
            examplePayload={agent.example_payload}
            // onExecute={() => ...} // Adicione função depois
          />
        ))}
      </Container>
    </div>
  );
}
