import React, { useState, useEffect } from "react";
import { runWorkflow } from "../api/workflows";
import { getAgentsList } from "../api/agents";
import "../styles/WorkflowsPage.css";

interface AgentMeta {
  name: string;
  description: string;
  example_payload: Record<string, any>;
}

export default function WorkflowsPage() {
  const [agents, setAgents] = useState<AgentMeta[]>([]);
  const [steps, setSteps] = useState<{ agent: string; input: Record<string, any> }[]>([
    { agent: "", input: {} }
  ]);
  const [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Carrega os agentes ao montar
  useEffect(() => {
    getAgentsList().then(setAgents);
  }, []);

  // Quando muda o agente, preenche o exemplo
  const handleAgentChange = (idx: number, agentName: string) => {
    const agent = agents.find(a => a.name === agentName);
    const newSteps = [...steps];
    newSteps[idx].agent = agentName;
    newSteps[idx].input = agent?.example_payload ? { ...agent.example_payload } : {};
    setSteps(newSteps);
  };

  // Atualiza campo do payload dinâmico
  const handleInputChange = (idx: number, key: string, value: string) => {
    const newSteps = [...steps];
    newSteps[idx].input[key] = value;
    setSteps(newSteps);
  };

  // Adiciona novo step
  const addStep = () => setSteps([...steps, { agent: "", input: {} }]);

  // Remove step
  const removeStep = (idx: number) => setSteps(steps.filter((_, i) => i !== idx));

  // Submete o workflow
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await runWorkflow({ steps });
      setOutput(res);
    } catch (err: any) {
      setOutput(err?.response?.data || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="workflow-exec">
      <h2>Executar Workflow Dinâmico</h2>
      <form onSubmit={handleSubmit}>
        {steps.map((step, idx) => {
          // Mostra exemplo de payload se existir, senão campo vazio
          const agentMeta = agents.find(a => a.name === step.agent);

          return (
            <div className="workflow-step-card" key={idx}>
              <div className="workflow-step-row">
                <label>Agente:</label>
                <select
                    value={step.agent}
                    onChange={e => handleAgentChange(idx, e.target.value)}
                    required
                    >
                    <option value="">Selecione um agente...</option>
                    {agents.map(a => (
                        <option key={a.name} value={a.name}>{a.name}</option>
                    ))}
                </select>
                {step.agent && (
                    <div className="agent-description">
                        {agents.find(a => a.name === step.agent)?.description}
                    </div>
                )}
                <button type="button" className="remove-btn" onClick={() => removeStep(idx)}>
                  Remover
                </button>
              </div>
              <div className="workflow-step-row">
                <label>Payload:</label>
                <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {step.agent && Object.keys(agentMeta?.example_payload ?? {}).length > 0
                    ? Object.keys(agentMeta!.example_payload).map(key => (
                        <input
                          key={key}
                          type="text"
                          value={step.input[key] ?? ""}
                          placeholder={key}
                          onChange={e => handleInputChange(idx, key, e.target.value)}
                          style={{ minWidth: 110 }}
                        />
                      ))
                    : <span style={{ color: "#bbb" }}>Escolha um agente para ver os campos</span>
                  }
                </div>
              </div>
            </div>
          );
        })}
        <div className="workflow-btn-group">
          <button type="button" onClick={addStep}>Adicionar Step</button>
          <button type="submit" disabled={loading}>
            {loading ? "Executando..." : "Executar Workflow"}
          </button>
        </div>
      </form>
      {output && (
        <div className="workflow-result-block">
            <b>Resultado:</b>
            <div>
            {(output?.workflow || []).map((stepResult: any, idx: number) => {
                // Cada stepResult será algo tipo: { "classifier": {...} }
                const agentName = Object.keys(stepResult)[0];
                const result = stepResult[agentName];
                return (
                <div className="workflow-result-step" key={idx}>
                    <div className="workflow-result-title">
                    {agentName.charAt(0).toUpperCase() + agentName.slice(1)}
                    </div>
                    <div className="workflow-result-json">
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        )}
    </div>
  );
}
