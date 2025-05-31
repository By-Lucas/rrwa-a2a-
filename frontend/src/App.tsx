import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import AgentsPage from "./pages/AgentsPage";
import ExecuteAgentPage from "./pages/ExecuteAgentPage";
import WorkflowsPage from "./pages/WorkflowsPage";

import "./App.css";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main
          className="main-content"
          style={{
            marginLeft: "220px",
            width: "100%",
            padding: "36px 48px",
            minHeight: "100vh",
            background: "#f7f8fa",
            transition: "margin 0.25s",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/execute-agent" element={<ExecuteAgentPage />} />
            <Route path="/workflows" element={<WorkflowsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
