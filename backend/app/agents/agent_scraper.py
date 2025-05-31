import re
import json
import requests

from decouple import config
from app.agents.base import BaseAgent
from langchain_google_genai import ChatGoogleGenerativeAI

class ProductScraperAgent(BaseAgent):
    def __init__(self, google_api_key=None, model_name="models/gemini-2.0-flash"):
        # Pegue a key sempre do decouple por padrão se não vier por parâmetro
        self.api_key = google_api_key or config("GEMINI_API_KEY", default=None)
        self.llm = ChatGoogleGenerativeAI(
            model=model_name,
            api_key=self.api_key   # Use api_key para langchain-google-genai >=2.x
        )

    def execute(self, payload: dict) -> dict:
        url = payload.get("url")
        if not url:
            return {"error": "URL não informada."}
        html = self._get_html(url)
        if not html or len(html) < 300:
            return {"error": "Página não encontrada ou sem conteúdo suficiente."}
        extracted_data = self._extract_with_ai(html, url)
        return extracted_data

    def _get_html(self, url):
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/119.0.0.0 Safari/537.36"
            )
        }
        resp = requests.get(url, headers=headers, timeout=15)
        if resp.status_code != 200:
            return ""
        return resp.text

    def _extract_with_ai(self, html, url):
        prompt = (
            "Você é um extrator de dados de produtos. "
            "Analise o HTML da página enviada a seguir e extraia, SE EXISTIREM, os campos: "
            "nome do produto, preço (apenas números e símbolo de moeda), imagens (links diretos das imagens), vídeo (link se houver), desconto (% ou valor), descrição curta, link do produto original. "
            "O retorno DEVE ser estritamente um JSON com essas chaves: nome, preco, imagens, video, desconto, descricao, link. "
            "Se algum campo não existir, coloque null. Se a página não for de produto, retorne: {'error': 'Produto não encontrado'}.\n"
            f"HTML:\n{html}\nURL: {url}"
        )

        response = self.llm.invoke(prompt)
        content = response.content.strip()

        # Remove bloco markdown ```json ... ```
        if content.startswith("```json"):
            content = re.sub(r"^```json|```$", "", content).strip()
        elif content.startswith("```"):
            content = re.sub(r"^```|```$", "", content).strip()

        # Remove qualquer coisa fora do JSON (protegendo contra saída ruim)
        match = re.search(r"\{.*\}", content, re.DOTALL)
        if match:
            content = match.group(0)
        try:
            return json.loads(content)
        except Exception:
            return {"result": response.content}

    def health(self):
        return {"status": "ok", "agent": "scraper"}
