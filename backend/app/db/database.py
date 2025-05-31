from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://tknexus:tknexus@db:5432/tknexus")

# Cria engine assíncrono
engine = create_async_engine(DATABASE_URL, echo=False)

# Cria sessionmaker para sessões assíncronas
AsyncSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)
