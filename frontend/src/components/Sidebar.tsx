import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    // Fecha sidebar ao clicar em link no mobile
    const handleLinkClick = () => setOpen(false);

    return (
        <>
            <button className="sidebar__toggle" onClick={() => setOpen(!open)}>
                <span className="sidebar__toggle-icon">&#9776;</span>
            </button>
            <aside className={`sidebar${open ? " open" : ""}`}>
                <button className="sidebar__toggle" onClick={() => setOpen(!open)}>
                    <span className="sidebar__toggle-icon">{open ? "✕" : "☰"}</span>
                </button>
                <div className="sidebar__logo">
                    <span className="sidebar__logo-main">RRWA</span>
                    <span className="sidebar__logo-plus"> + A2A+</span>
                </div>
                <nav className="sidebar__nav">
                    <NavLink to="/" className="sidebar__link" onClick={handleLinkClick}>Home</NavLink>
                    <NavLink to="/agents" className="sidebar__link" onClick={handleLinkClick}>Agentes Disponíveis</NavLink>
                    <NavLink to="/execute-agent" className="sidebar__link" onClick={handleLinkClick}>Executar Agente</NavLink>
                    <NavLink to="/workflows" className="sidebar__link" onClick={handleLinkClick}>Executar Workflow</NavLink>
                </nav>

            </aside>
            {/* Backdrop for mobile */}
            {open && <div className="sidebar__backdrop" onClick={() => setOpen(false)} />}
        </>
    );
}
