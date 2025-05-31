# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.routers.gateway import router as gateway_router
from app.api.v1.routers.agent_gemini import router as gemini_router
from app.api.v1.routers.agent_scraper import router as scraper_router


app = FastAPI(
    title="RRWA + A2A+ Platform",
    version="0.1.0"
)

@app.get("/")
def root():
    return {"msg": "RRWA + A2A+ Platform online!"}


# Rotas
app.include_router(gemini_router, prefix="/api/v1/gemini", tags=["Gemini Agent"])
app.include_router(scraper_router, prefix="/api/v1/scraper", tags=["Scraper Agent"])
app.include_router(gateway_router, prefix="/api/v1", tags=["Gateway RRWA"])

# Adicione antes das rotas!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ou especifique ["http://localhost:3000"] para produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)