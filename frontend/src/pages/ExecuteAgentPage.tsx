import React, { useState, useEffect } from "react";
import { getAgentsList, executeAgent } from "../api/agents";
import "../styles/ExecuteAgentPage.css";

export default function ExecuteAgentPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAgentsList().then(setAgents);
  }, []);

  // Sempre que muda o agente, reseta o form com os campos default
  useEffect(() => {
    if (selected) setForm(selected.example_payload);
    else setForm({});
    setOutput(null);
  }, [selected]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await executeAgent(selected.name, form);
      setOutput(res);
    } catch (err: any) {
      setOutput(err?.response?.data || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="agent-execute">
  <h2>Executar Agente</h2>
  <div className="agent-execute__form-container">
    <form onSubmit={handleSubmit}>
      <label htmlFor="agent-select">Escolha o agente:</label>
      <select
        id="agent-select"
        value={selected?.name || ""}
        onChange={e => {
          const ag = agents.find(a => a.name === e.target.value);
          setSelected(ag || null);
        }}
      >
        <option value="">Selecione um agente...</option>
        {agents.map(agent => (
          <option key={agent.name} value={agent.name}>{agent.name}</option>
        ))}
      </select>

      {/* Descrição */}
      {selected && (
        <div className="agent-description">{selected.description}</div>
      )}

      {/* Campos dinâmicos */}
      {selected && Object.keys(selected.example_payload).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type="text"
            value={form[key] ?? ""}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
          />
        </div>
      ))}

      {selected && (
        <button type="submit" disabled={loading}>
          {loading ? "Executando..." : "Executar"}
        </button>
      )}
    </form>
    {output && (
      <div className="response-block">
        <b>Resposta:</b>
        <pre>{JSON.stringify(output, null, 2)}</pre>
      </div>
    )}
  </div>
</div>

  );
}
