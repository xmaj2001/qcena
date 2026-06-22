# Visão Geral do Backend

← [[🏠 Home]] | [[Backend/Arquitetura/Estrutura de Módulos]] | [[Backend/Domínio/Camadas DDD]]

---

## Filosofia Arquitectural

O backend da Qcena usa **NestJS** com **Domain-Driven Design (DDD)** numa estrutura modular. Cada módulo é autónomo e encapsula as suas próprias camadas de domínio, aplicação e infraestrutura.

A escolha vai além do necessário para um CRUD simples — o domínio é o centro, e nada mais.

---

## Princípios Aplicados

- Cada **aggregate** tem o seu repositório: a *interface* vive no domínio, a *implementação* na infraestrutura
- O **domínio não conhece o Prisma** — nem qualquer detalhe de infraestrutura
- Inversão de dependência a sério, não só no papel
- Estrutura **modular** — cada módulo tem as suas próprias 3 camadas DDD

---

## Fluxos Assíncronos

| Mecanismo | Uso |
|-----------|-----|
| **BullMQ + Redis** | Filas de pagamentos, payouts e reembolsos |
| **NestJS EventEmitter** | Eventos internos entre módulos de domínio |
| **Socket.io** | Actualizações em tempo real para o cliente |
| **SSE** | Server-Sent Events para o servidor MCP |
| **Webhooks** | Disparar eventos para sistemas externos |

---

## Segurança

- `accessToken` e `refreshToken` armazenados em cookies `httpOnly`
- **Whitelist** de tokens activos no backend
- **Rotação automática** do refresh token
- Todas as requests devem ser **assinadas** (chave secreta nas env do Next.js)

---

## Referências
- [[Backend/Arquitetura/Estrutura de Módulos]]
- [[Backend/Domínio/Camadas DDD]]
- [[Frontend/Segurança/Autenticação e Segurança]]
- [[Funcionalidades/Automação/Webhooks]]
- [[Funcionalidades/Automação/MCP]]
- [[Stack/Stack Técnica]]
