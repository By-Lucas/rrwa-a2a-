// src/App.tsx ou src/layouts/MainLayout.tsx

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{
        marginLeft: 220,   // Igual à largura da sidebar
        width: "100%",
        padding: "36px 48px",
        minHeight: "100vh",
        background: "#f7f8fa"
      }}>
        <Outlet />  {/* Ou seu conteúdo de rotas */}
      </main>
    </div>
  );
}

export default App;
