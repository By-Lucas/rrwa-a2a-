// src/components/Container.tsx
import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    maxWidth: 800,
    margin: "40px auto",
    background: "#fff",
    borderRadius: 18,
    padding: 36,
    boxShadow: "0 10px 24px #0001, 0 1.5px 8px #0001"
  }}>
    {children}
  </div>
);
