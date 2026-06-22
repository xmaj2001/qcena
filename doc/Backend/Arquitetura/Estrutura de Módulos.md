# Estrutura de Módulos — Backend

← [[Backend/Arquitetura/Visão Geral do Backend]]

---

## Estrutura de Pastas

```
src/
└── modules/
    ├── user/
    │   ├── presentation/
    │   │   ├── controllers/         ← endpoints REST
    │   │   └── gateways/            ← WebSocket (Socket.io)
    │   ├── application/
    │   │   ├── services/
    │   │   ├── use-cases/
    │   │   └── events/              ← publicação de eventos
    │   ├── domain/
    │   │   ├── entities/
    │   │   ├── enums/
    │   │   ├── events/              ← definição de eventos
    │   │   └── repositories/        ← interfaces (contratos)
    │   └── infrastructure/
    │       ├── repositories/        ← implementações Prisma
    │       ├── listeners/           ← escutadores de eventos
    │       └── adapters/            ← hash, token, email, event-bus
    │
    ├── service/
    │   ├── presentation/
    │   ├── application/
    │   ├── domain/
    │   └── infrastructure/
    │
    ├── booking/
    │   ├── presentation/
    │   ├── application/
    │   ├── domain/
    │   └── infrastructure/
    │
    ├── analytics/
    │   ├── presentation/
    │   ├── application/
    │   ├── domain/
    │   └── infrastructure/
    │
    ├── goals/
    │   ├── presentation/
    │   ├── application/
    │   ├── domain/
    │   └── infrastructure/
    │
    ├── webhooks/
    │   ├── presentation/
    │   ├── application/
    │   ├── domain/
    │   └── infrastructure/
    │
    └── mcp/
        ├── presentation/
        ├── application/
        ├── domain/
        └── infrastructure/
```

---

## Módulos Principais

| Módulo | Responsabilidade |
|--------|-----------------|
| `user` | Gestão de utilizadores e perfis |
| `service` | Criação e gestão de serviços |
| `booking` | Reservas e o seu ciclo de vida |
| `analytics` | Relatórios e métricas da plataforma |
| `goals` | Criação e acompanhamento de metas |
| `webhooks` | Gestão e disparo de webhooks |
| `mcp` | Servidor MCP com SSE |

---

## Referências
- [[Backend/Domínio/Camadas DDD]]
- [[Funcionalidades/Analytics/Dashboard Analytics]]
- [[Funcionalidades/Analytics/Sistema de Metas]]
- [[Funcionalidades/Automação/Webhooks]]
- [[Funcionalidades/Automação/MCP]]
