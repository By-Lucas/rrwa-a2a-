import os
from fastapi import APIRouter, Body

from app.agents.agent_scraper import ProductScraperAgent


router = APIRouter()

@router.post("/execute")
def execute(payload: dict = {"url": "Digite url do produto"}):
    scraper_agent = ProductScraperAgent(
        google_api_key=None
    )
    return scraper_agent.execute(payload)

@router.get("/health")
def health():
    scraper_agent = ProductScraperAgent(
        google_api_key=None
    )
    return scraper_agent.health()
