from fastapi import APIRouter, Body, HTTPException

from app.agents.agent_scraper import ProductScraperAgent
from app.agents.agent_classifier import ProductClassifierAgent
from app.schemas.agent_scraper import ScraperInfoSchema, ScraperResultSchema
from app.schemas.agent_classifier import ClassifierInfoSchema, ClassifierResultSchema


router = APIRouter()


AGENTS_REGISTRY = {
    "scraper": {
        "instance": ProductScraperAgent(),
        #"input_schema": ScraperInfoSchema,
        "output_schema": ScraperResultSchema,
        "description": "Extrai informações de produtos de páginas web. Ideal para integrar catálogos, comparar preços, alimentar sistemas de estoque ou análise de mercado.",
        "example_payload": ScraperInfoSchema.Config.schema_extra["example"],
        "example_result": ScraperResultSchema.Config.schema_extra["example"]
    },
    "classifier": {
        "instance": ProductClassifierAgent(),
        "input_schema": ClassifierInfoSchema,
        "output_schema": ClassifierResultSchema,
        "description": "Classifica a categoria e sentimento do produto usando IA.",
        "example_payload": ClassifierInfoSchema.Config.schema_extra["example"],
        "example_result": ClassifierResultSchema.Config.schema_extra["example"]
    },
}

@router.get("/agents/list")
def list_agents():
    """
    Lista todos os agentes disponíveis na plataforma com descrição e exemplos.
    """
    return {
        "agents": [
            {
                "name": name,
                "description": info["description"],
                #"input_schema": info["input_schema"].schema(),
                "example_payload": info["example_payload"],
                "example_result": info["example_result"],
            }
            for name, info in AGENTS_REGISTRY.items()
        ]
    }

@router.post("/agents/{agent_name}/execute", response_model=None)
def execute_agent(agent_name: str, payload: dict = Body(...)):
    """
    Executa um agente específico pelo nome.
    """
    agent_info = AGENTS_REGISTRY.get(agent_name)
    if not agent_info:
        raise HTTPException(status_code=404, detail="Agente não encontrado")
    # Valide a entrada automaticamente pelo schema do agente
    # validated = agent_info["input_schema"](**payload)
    result = agent_info["instance"].execute(payload)
    return result

# Workflow dinâmico (recebe lista de agentes/steps)
@router.post("/workflows/run")
def run_workflow(payload: dict = Body(...)):
    """
    Executa um workflow dinâmico, passando steps e dados.
    Exemplo de payload:
    {
        "steps": [
            {"agent": "scraper", "input": {"url": "https://..."}},
            {"agent": "classifier", "input": {"data_field": "result_of_scraper"}}
        ]
    }
    """
    results = []
    data = None
    for step in payload.get("steps", []):
        agent = AGENTS_REGISTRY.get(step["agent"], {}).get("instance")
        if not agent:
            return {"error": f"Agente '{step['agent']}' não encontrado"}
        # Encadeamento: pode passar dados do step anterior
        input_data = step.get("input", {})
        if data:
            input_data["previous_result"] = data
        data = agent.execute(input_data)
        results.append({step["agent"]: data})
    return {"workflow": results}

# Mock de status (para expandir depois)
@router.get("/workflows/status/{workflow_id}")
def workflow_status(workflow_id: str):
    """Você pode implementar logs no sistema para que você possa buscar de acordo com cada workflow"""
    # Exemplo: status fictício
    return {"workflow_id": workflow_id, "status": "concluído", "result": None}
