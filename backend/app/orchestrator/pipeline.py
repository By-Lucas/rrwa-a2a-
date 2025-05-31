from pubsub.client import publish_message
from agents.agent_gemini import GeminiAgent

def process_and_chain(prompt):
    # Exemplo: encadear agentes via função
    result1 = GeminiAgent(...).execute({"prompt": prompt})
    # Se quiser, publique resultado no Pub/Sub
    publish_message("topic-output", result1)
    return result1

# Pode ser chamado por um serviço, tarefa Celery, etc.
