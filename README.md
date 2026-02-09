> 🇧🇷 **Prefer Portuguese?** [Clique aqui para ler em português](./README.pt-BR.md)

# RRWA + A2A+ Platform

**Revolutionize data automation.** A modular and **highly scalable** platform designed for automation, integration, extraction, and intelligent orchestration of data — with pluggable agents, dynamic workflows, and cutting-edge AI integration.

---

## 🚀 Technologies Used

* **Frontend:** React 18 + TypeScript + Vite
* **Backend:** FastAPI (Python 3.11+)
* **Orchestration & AI:** LangChain, native integration with Google Gemini (NLP Generative AI)
* **Infrastructure:** Docker, Docker Compose, Kubernetes-ready
* **APIs & Dev:** OpenAPI, Swagger, Prettier, ESLint
* **Deploy:** CI/CD ready, cloud-ready (DigitalOcean, AWS, GCP)

---

## How to Run the Project

### 1. Secrets Configuration

To use advanced AI agents (Gemini), **you need a Google Gemini API token**. Create a `.env` file inside the `backend/` folder:

```
GEMINI_API_KEY=SEU_TOKEN_DO_GEMINI
```

* For LangChain and other providers, add additional environment variables as per the official documentation.

### 2. Backend (FastAPI)

```bash
cd backend
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.api.main:app --host 0.0.0.0 --port 8000 --reload
```

Acesse: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000) ou [http://localhost:5173](http://localhost:5173)

---

## Funcionalidades principais

* **Agentes Plugáveis:** scraping, classificação via IA, integração fácil.
* **Workflows Dinâmicos:** pipelines customizados, steps arrastáveis, robustez e flexibilidade.
* **Execução por API ou Interface Web:** controle total para times técnicos e não técnicos.
* **OpenAPI/Swagger:** documentação pronta, integração com Zapier/Make.
* **Integração IA & NLP:** uso real de LangChain, Google Gemini, NLP generativo, prompts customizados, automação de análise textual em escala.
* **Escalabilidade real:** projeto pronto para cloud-native (Docker/Kubernetes), facilmente replicável e preparado para produção.

---

## Contato e Comunidade

* WhatsApp: [Clique aqui para falar](https://wa.me/74981199190)
* LinkedIn: [LinkedIn](https://linkedin.com/in/lucastk)
* GitHub: [GitHub](https://github.com/By-Lucas)
* Email: [tekertudo@gmail.com](mailto:tekertudo@gmail.com)

---

Projeto desenvolvido por **TK Global Technology** — v1.0 © 2025
