from decouple import config

from app.agents.base import BaseAgent
import google.generativeai as genai


class GeminiAgent(BaseAgent):
    def __init__(self, api_key=None, model_name="models/gemini-2.0-flash"):
        api_key = api_key or config("GEMINI_API_KEY", default=None)
        genai.configure(api_key=api_key)
        self.model_name = model_name

    def execute(self, payload: dict) -> dict:
        prompt = payload.get("prompt", "")
        if not prompt:
            return {"error": "Prompt não informado"}
        try:
            model = genai.GenerativeModel(self.model_name)
            response = model.generate_content(prompt)
            return {"result": response.text}
        except Exception as e:
            if "quota" in str(e).lower() or "429" in str(e):
                return {"error": "Limite da API Gemini atingido."}
            return {"error": str(e)}

    def health(self):
        return {"status": "ok", "agent": "gemini"}
