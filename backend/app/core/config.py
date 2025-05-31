from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str
    DATABASE_SYNC_URL: str

    model_config = SettingsConfigDict(env_file=".env", extra="allow")

settings = Settings()
