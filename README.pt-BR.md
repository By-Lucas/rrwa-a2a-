> 🇺🇸 **Prefer English?** [Click here for the English version](./README.md)

# RRWA + A2A+ Platform

**Revolucione a automação de dados.** Plataforma modular e **altamente escalável**, projetada para automação, integração, extração e orquestração inteligente de dados — com agentes plugáveis, workflows dinâmicos e integração com IA de última geração.

---

## 🚀 Tecnologias Utilizadas

* **Frontend:** React 18 + TypeScript + Vite
* **Backend:** FastAPI (Python 3.11+)
* **Orquestração e IA:** LangChain, integração nativa com Google Gemini (NLP Generative AI)
* **Infraestrutura:** Docker, Docker Compose, Kubernetes-ready
* **APIs & Dev:** OpenAPI, Swagger, Prettier, ESLint
* **Deploy:** CI/CD, pronto para cloud (DigitalOcean, AWS, GCP)

---

## Como rodar o projeto

### 1. Configuração de Segredos

Para utilizar os agentes de IA avançados (Gemini), **você precisa do token de API do Google Gemini**. Crie um arquivo `.env` na pasta `backend/`:

```
GEMINI_API_KEY=SEU_TOKEN_DO_GEMINI
```

* Para usar LangChain e outros modelos, configure variáveis adicionais conforme documentação do provider.

### 2. Backend (FastAPI)

```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.api.main:app --host 0.0.0.0 --port 8000 --reload
```

Access: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000) or [http://localhost:5173](http://localhost:5173)

---

## Main Features

* **Pluggable Agents:** AI-based classification, easy integration.
* **Dynamic Workflows::** custom pipelines, drag-and-drop steps, robust and flexible.
* **API or Web UI Execution:** full control for technical and non-technical teams.
* **OpenAPI/Swagger:** ready-to-use docs, Zapier/Make integration.
* **AI & NLP Integration:** real use of LangChain, Google Gemini, generative NLP, custom prompts, automated text analysis at scale.
* **True Scalability:** fully cloud-native (Docker/Kubernetes), easily replicable and production-ready.

---

## Contato e Comunidade

* WhatsApp: [Clique aqui para falar](https://wa.me/74981199190)
* LinkedIn: [Seu LinkedIn](https://linkedin.com/in/lucastk)
* GitHub: [Seu GitHub](https://github.com/By-Lucas)
* Email: [tekertudo@gmail.com](mailto:tekertudo@gmail.com)

---

Project developed by **TK Global Technology** — v1.0 © 2025
