# app/db/session.py

from app.db.database import AsyncSessionLocal
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from typing import AsyncGenerator
from app.core.config import settings


# Assíncrono (mantém o existente para FastAPI)
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session


# Síncrono (para Celery)
# Precisa de um engine síncrono
SyncEngine = create_engine(settings.DATABASE_SYNC_URL, pool_pre_ping=True)
SyncSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=SyncEngine)

def get_sync_session():
    db = SyncSessionLocal()
    try:
        yield db
    finally:
        db.close()