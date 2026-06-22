# Visão Geral — Mobile

← [[🏠 Home]]

---

## Stack

- **React Native** + **Expo**
- Estrutura modular semelhante ao [[Frontend/Arquitetura/Estrutura de Módulos|Frontend Next.js]]
- Suporte a dados **offline** (cache local)

---

## Funcionalidades

### Notificações em Tempo Real
A app recebe notificações via **Socket.io** sempre que ocorre um evento relevante:
- Meta concluída
- Nova reserva recebida
- Pagamento processado
- Anomalia detectada na plataforma

---

### Chat de Automação

A app inclui uma **caixa de chat de automação** — uma alternativa ao Telegram, WhatsApp ou outros serviços externos como ponto de entrada para automações.

**Como funciona:**
1. O utilizador escreve uma mensagem no chat
2. A mensagem dispara um **webhook**
3. O webhook é captado pelo sistema de automação
4. Um agente analisa a mensagem
5. O agente executa a automação via [[Funcionalidades/Automação/MCP|MCP]] ou [[Funcionalidades/Automação/Webhooks|Webhooks]]

**É opcional** — o utilizador pode activar ou desactivar a caixa de chat de automação nas definições.

```
Utilizador escreve → Webhook disparado → Agente analisa → MCP/Webhook executa
```

**Casos de uso:**
- "Gera um relatório desta semana em PDF"
- "Qual foi o serviço mais reservado este mês?"
- "Cria uma meta de 50 reservas para esta semana"

---

### Dados Offline

A app mantém alguns dados em cache local para funcionar sem ligação à internet:
- Listagem de serviços do utilizador
- Últimas reservas
- Metas activas

---

## Estrutura de Módulos (Mobile)

```
src/
├── modules/
│   ├── reservas/
│   │   ├── types/
│   │   ├── api/
│   │   ├── hooks/
│   │   └── index.ts
│   ├── servicos/
│   ├── analytics/
│   ├── metas/
│   ├── chat-automacao/
│   └── auth/
└── shared/
    ├── types/
    ├── hooks/
    └── lib/
```

---

## Referências
- [[Funcionalidades/Automação/Webhooks]]
- [[Funcionalidades/Automação/MCP]]
- [[Funcionalidades/Automação/Chat de Automação]]
- [[Stack/Stack Técnica]]
