from pydantic import BaseModel, HttpUrl, Field
from typing import List, Optional

class ScraperInfoSchema(BaseModel):
    """Schema de entrada para o agente Scraper."""
    url: HttpUrl = Field(..., description="URL do produto a ser extraído")

    class Config:
        schema_extra = {
            "example": {
                "url": "https://www.magazineluiza.com.br/smartphone-xiaomi-redmi-note-13-128gb-4g/p/235690700/"
            }
        }

class ScraperResultSchema(BaseModel):
    """Schema de saída do agente Scraper."""
    nome: Optional[str] = None
    preco: Optional[str] = None
    imagens: List[str] = None
    video: Optional[str] = None
    desconto: Optional[str] = None
    descricao: Optional[str] = None
    link: Optional[HttpUrl] = None

    class Config:
        schema_extra = {
            "example": {
                "nome": "Fritadeira Air Fryer Mondial Oven 12 Litros Preto Inox 2000w",
                "preco": "R$ 799,00",
                "imagens": [
                    "https://images.mlstatic.com/airfryer.jpg"
                ],
                "video": None,
                "desconto": "15%",
                "descricao": "Fritadeira sem óleo, 12L, 2000W, preto/inox.",
                "link": "https://produto.mercadolivre.com.br/MLB-4025053191-fritadeira-air-fryer-mondial-oven-12-litros-preto-inox-2000w-_JM"
            }
        }
