from pydantic import BaseModel, Field
from typing import Optional


class ClassifierInfoSchema(BaseModel):
    """Schema de entrada para o agente Classificador."""
    nome: Optional[str] = Field(None, description="Nome do produto (opcional)")
    descricao: Optional[str] = Field(None, description="Descrição ou texto do produto")

    class Config:
        schema_extra = {
            "example": {
                "nome": "Smartphone Xiaomi Redmi Note 13",
                "descricao": "Celular com câmera de 50MP e bateria de longa duração."
            }
        }

class ClassifierResultSchema(BaseModel):
    """Schema de saída do agente Classificador."""
    categoria: Optional[str]
    sentimento: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "categoria": "Eletrônicos",
                "sentimento": "positivo"
            }
        }
