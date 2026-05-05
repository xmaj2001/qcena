# Chat de Automação

← [[Funcionalidades/Automação/MCP]] | [[Mobile/Visão Geral Mobile]]

---

## Visão Geral

O **Chat de Automação** é uma funcionalidade opcional da app mobile que serve como ponto de entrada alternativo para automações — sem necessidade de conectar o Telegram, WhatsApp ou qualquer serviço externo.

---

## Como Funciona

```
Utilizador escreve mensagem
        │
        ▼
Webhook disparado (chat.message_received)
        │
        ▼
Agente de IA analisa a mensagem
        │
        ▼
Agente executa via MCP ou Webhooks
        │
        ▼
Resposta devolvida ao utilizador
```

---

## Activação

O chat de automação é **desactivado por defeito**. O utilizador pode activá-lo nas definições da app.

Quando activado, substitui (ou complementa) outros pontos de entrada como:
- Telegram
- WhatsApp
- Outros serviços externos

---

## Exemplos de Uso

| Mensagem do utilizador | Acção do agente |
|----------------------|----------------|
| "Gera um relatório desta semana em PDF" | Usa `export_report` via MCP |
| "Qual foi o meu serviço mais reservado este mês?" | Usa `get_service_performance` via MCP |
| "Cria uma meta de 50 reservas para esta semana" | Usa `create_goal` via MCP |
| "Avisa-me quando receber uma reserva acima de 5000 AOA" | Configura webhook personalizado |

---

## Relação com o Sistema de Automação

O chat de automação é apenas **um dos pontos de entrada** possíveis:

```
Telegram ──────┐
WhatsApp ──────┤
Chat (app) ────┼──▶ Webhook ──▶ Agente ──▶ MCP / Webhooks
n8n ───────────┤
Zapier ────────┘
```

---

## Referências
- [[Funcionalidades/Automação/MCP]]
- [[Funcionalidades/Automação/Webhooks]]
- [[Mobile/Visão Geral Mobile]]
