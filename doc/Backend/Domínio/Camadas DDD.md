# Camadas DDD

← [[Backend/Arquitetura/Estrutura de Módulos]]

---

## As 4 Camadas por Módulo

```
┌──────────────────────────────────────────────────────┐
│               PRESENTATION LAYER                     │
│        Controllers (REST) · Gateways (WS)            │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────┴────────────────────────────────┐
│               APPLICATION LAYER                      │
│      Services · Use Cases · Event Publishing         │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────┴────────────────────────────────┐
│                 DOMAIN LAYER                         │
│    Entities · Enums · Events · Repository (Ports)    │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────┴────────────────────────────────┐
│              INFRASTRUCTURE LAYER                    │
│   Prisma Repos · Hash · Token · Email · EventBus     │
└──────────────────────────────────────────────────────┘
```

---

## Detalhe por Camada

### `presentation/`
Ponto de entrada da aplicação. Recebe requests externas e delega para a camada de aplicação.

```
presentation/
├── controllers/     ← endpoints REST (HTTP)
└── gateways/        ← WebSocket gateways (Socket.io)
```

---

### `application/`
Orquestra o domínio. Contém a lógica dos casos de uso e publica eventos.

```
application/
├── services/        ← serviços de aplicação
├── use-cases/       ← casos de uso específicos
└── events/          ← publicação de eventos de domínio
```

---

### `domain/`
O coração do sistema. Não depende de nada externo.

```
domain/
├── entities/        ← objectos com identidade
├── enums/           ← enumerações do domínio
├── events/          ← eventos de domínio (definição)
└── repositories/    ← interfaces/ports (contratos)
```

**Regra:** O domínio **nunca** importa Prisma, Redis, NestJS ou qualquer framework.

---

### `infrastructure/`
Implementa os contratos definidos pelo domínio. Lida com tudo o que é externo.

```
infrastructure/
├── repositories/    ← implementações Prisma (adapters)
├── hash/            ← adaptador de hash (ex: bcrypt)
├── token/           ← adaptador de tokens (ex: JWT)
├── email/           ← adaptador de email
├── event-bus/       ← implementação do EventBus
└── listeners/       ← escutadores de eventos de domínio
```

---

## Fluxo de Dependências

```
presentation → application → domain ← infrastructure
```

A infraestrutura **implementa** as interfaces do domínio — o domínio nunca conhece a infraestrutura.

---

## Referências
- [[Backend/Arquitetura/Visão Geral do Backend]]
- [[Backend/Arquitetura/Estrutura de Módulos]]
