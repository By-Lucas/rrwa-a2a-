import os
from decouple import config

from fastapi import APIRouter
from app.agents.agent_gemini import GeminiAgent

router = APIRouter()


@router.post("/agents/gemini/execute")
def execute_gemini(payload: dict = {"prompt": "Digite o que precisa aqui."}):
    api_key = config("GEMINI_API_KEY", default=None)
    gemini_agent = GeminiAgent(
        api_key=api_key,
    )
    return gemini_agent.execute(payload)

@router.get("/agents/gemini/health")
def health_gemini():
    api_key = config("GEMINI_API_KEY", default=None)
    gemini_agent = GeminiAgent(
        api_key=api_key,
    )
    return gemini_agent.health()