from abc import ABC, abstractmethod

class BaseAgent(ABC):
    """Classe base para agentes plugáveis."""

    @abstractmethod
    def execute(self, payload: dict) -> dict:
        """Executa a ação principal do agente."""
        pass

    @abstractmethod
    def health(self) -> dict:
        """Retorna status do agente."""
        pass
