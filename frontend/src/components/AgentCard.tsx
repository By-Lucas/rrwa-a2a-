// src/components/AgentCard.tsx
import React from "react";

interface AgentCardProps {
  name: string;
  description: string;
  examplePayload: object;
  onExecute?: () => void;
}

export const AgentCard = ({ name, description, examplePayload, onExecute }: AgentCardProps) => (
  <div style={{
    background: "#f6fafd",
    borderRadius: 14,
    padding: 28,
    margin: "28px 0",
    boxShadow: "0 2px 8px #0001"
  }}>
    <h2 style={{ margin: "0 0 8px 0" }}>{name}</h2>
    <p style={{ color: "#6b7685" }}>{description}</p>
    <strong>Exemplo de Payload:</strong>
    <pre style={{
      background: "#e3e9f7",
      borderRadius: 8,
      padding: "14px 18px",
      marginTop: 12,
      marginBottom: 16,
      overflow: "auto"
    }}>
      {JSON.stringify(examplePayload, null, 2)}
    </pre>
    {onExecute && (
      <button
        onClick={onExecute}
        style={{
          background: "#3288fa",
          color: "#fff",
          border: "none",
          borderRadius: 7,
          padding: "8px 26px",
          cursor: "pointer",
          fontWeight: 600
        }}
      >
        Executar
      </button>
    )}
  </div>
);
