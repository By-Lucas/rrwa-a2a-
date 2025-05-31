// src/pages/Home.tsx
import React from "react";
import { WhatsappIcon, LinkedinIcon, GithubIcon } from "../components/SocialIcons";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-bg">
      <div className="home-container">
        <h1 className="home-title">
          <span className="home-title-main">RRWA</span>
          <span className="home-title-plus"> + A2A+</span> Platform
        </h1>
        <p className="home-hero">
          <b>Revolucione a automação de dados.</b> Nossa plataforma permite criar, orquestrar e monitorar agentes inteligentes em fluxos totalmente dinâmicos, escaláveis e plugáveis — tudo integrado via API ou frontend.
        </p>

        <div className="home-section">
          <h2>O que entregamos até agora:</h2>
          <ul>
            <li>
              <b>Arquitetura Modular e Extensível:</b> backend em FastAPI (Python 3.11+), frontend em React/TypeScript, e infraestrutura preparada para cloud-native (Docker, Kubernetes-ready).
            </li>
            <li>
              <b>Agentes Plugáveis:</b> agentes para scraping, classificação via IA (incluindo Google Gemini e custom NLP), com execução via API ou interface amigável.
            </li>
            <li>
              <b>Workflow Dinâmico:</b> construa pipelines customizados arrastando steps/agentes, tudo com validação automática de payloads e monitoramento de resultados.
            </li>
            <li>
              <b>Interface Profissional:</b> design moderno, responsivo e UX focado em produtividade, tanto para desktop quanto mobile.
            </li>
            <li>
              <b>Documentação e OpenAPI:</b> endpoints REST, documentação Swagger, integração pronta para Zapier, Make e SaaS externos.
            </li>
          </ul>
        </div>

        <div className="home-section">
          <h2>Contato e Comunidade</h2>
          <p>
            Precisa de integração, consultoria ou quer contribuir? Fale diretamente comigo:
          </p>
         <div className="home-socials">
            <a href="https://wa.me/74981199190?text=Olá%2C%20vim%20pelo%20site%20RRWA%20%2B%20A2A%2B!" className="home-social-icon" target="_blank" rel="noopener noreferrer">
              <WhatsappIcon />
            </a>
            <a href="https://linkedin.com/in/lucastk" className="home-social-icon" target="_blank" rel="noopener noreferrer">
              <LinkedinIcon />
            </a>
            <a href="https://github.com/By-Lucas" className="home-social-icon" target="_blank" rel="noopener noreferrer">
              <GithubIcon />
            </a>
          </div>
          <div className="home-contact-email">
            <b>Email:</b> <a href="mailto:tekertudo@gmail.com">tekertudo@gmail.com</a>
          </div>
        </div>

        <footer className="home-footer">
          Projeto desenvolvido por <b>TK Global Technology</b> &mdash; v1.0 &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
