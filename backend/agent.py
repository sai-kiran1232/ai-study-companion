import os
from pydantic_ai import Agent

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

study_agent = Agent(
    "openrouter:mistralai/mistral-7b-instruct",
    system_prompt=(
        "You are a helpful AI study assistant. "
        "Generate a clear daily study plan and explain it simply."
    ),
)

study_agent.api_key = OPENROUTER_API_KEY
