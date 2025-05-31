from app.schemas.agent_classifier import ClassifierInfoSchema, ClassifierResultSchema
from langchain_google_genai import ChatGoogleGenerativeAI
from decouple import config


class ProductClassifierAgent:
    def __init__(self, model_name="models/gemini-2.0-flash"):
        self.llm = ChatGoogleGenerativeAI(
            model=model_name,
            api_key=config("GEMINI_API_KEY")
        )

    def execute(self, payload: dict) -> dict:
        nome = payload.get("nome", "")
        descricao = payload.get("descricao", "")
        prompt = (
            f"Dado o seguinte produto:\n"
            f"Nome: {nome}\n"
            f"Descrição: {descricao}\n"
            "Classifique a CATEGORIA do produto (ex: Eletrônicos, Moda, Casa, etc). "
            "Analise também o SENTIMENTO do texto (positivo, neutro, negativo). "
            "Retorne um JSON: categoria, sentimento."
        )
        response = self.llm.invoke(prompt)
        import json, re
        content = response.content.strip()
        content = re.sub(r"^```json|```$", "", content).strip()
        try:
            return json.loads(content)
        except Exception:
            return {"result": response.content}
