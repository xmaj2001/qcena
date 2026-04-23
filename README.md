<div align="center">

# 🎭 Qcena

### Plataforma de Reservas de Serviços

*Built with intention. Engineered for production.*

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square)](.)
[![Mobile](https://img.shields.io/badge/mobile-React%20Native%20%2B%20Expo-blue?style=flat-square&logo=expo)](.)
[![Backend](https://img.shields.io/badge/backend-NestJS%20%2B%20DDD-red?style=flat-square&logo=nestjs)](.)
[![Infra](https://img.shields.io/badge/infra-Docker-2496ED?style=flat-square&logo=docker)](.)
[![42](https://img.shields.io/badge/42-Luanda-000000?style=flat-square)](.)

</div>

---

## 📌 Sobre o Projeto

A **Qcena** é uma plataforma de reservas de serviços — o meu projeto pessoal para aplicar, de forma prática e honesta, tudo o que tenho aprendido na **42 Luanda**.

O objetivo não é só fazer funcionar. É fazer *bem feito*, como se fosse para produção real. Aprender agora, sem pressão de utilizadores reais, para não descobrir os problemas mais tarde.

> *"Prefiro pagar o preço da complexidade hoje, do que pagar o preço de refactoring em produção amanhã."*

---

## 🗺️ Roadmap

| Fase | Status | Descrição |
|------|--------|-----------|
| 🎨 Design (Figma) | 🔄 Em curso | Layout e UX da app móvel |
| 📱 Mobile | ⏳ A seguir | Implementação em React Native + Expo |
| ⚙️ Backend | 🔄 Em curso | NestJS com DDD e Ports & Adapters |
| 🐳 Infraestrutura | ✅ Base pronta | Docker + Make + Healthchecks |
| 🚀 Deploy | ⏳ Em breve | — |

---

## 🏗️ Arquitetura

### Backend — NestJS com DDD & Ports and Adapters

A escolha arquitetural foi deliberada e vai além do que seria necessário para um CRUD simples. O domínio é o centro — nada mais.

```
src/
├── domain/          # Aggregates, Entities, Value Objects, Repo Interfaces
├── application/     # Use Cases, DTOs, Ports
├── infrastructure/  # Prisma (implementação dos repositórios), Redis, BullMQ
└── presentation/    # Controllers, WebSocket Gateways
```

**Princípios aplicados:**
- Cada **aggregate** tem o seu repositório: a *interface* vive no domínio, a *implementação* na infraestrutura
- O **domínio não conhece o Prisma** — ou qualquer detalhe de infraestrutura
- Inversão de dependência a sério, não só no papel

---

## ⚡ Fluxos Assíncronos

| Mecanismo | Uso |
|-----------|-----|
| **BullMQ + Redis** | Filas de pagamentos, payouts e reembolsos |
| **NestJS EventEmitter** | Eventos internos entre módulos de domínio |
| **Socket.io (WebSockets)** | Atualizações em tempo real para o cliente |

---

## 🛠️ Stack Técnica

### Mobile
- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- Design em [Figma](https://figma.com/)

### Backend
- [NestJS](https://nestjs.com/) — framework estruturado e escalável
- [Prisma](https://www.prisma.io/) — ORM (isolado na camada de infraestrutura)
- [PostgreSQL](https://www.postgresql.org/) — base de dados principal
- [Redis](https://redis.io/) — cache e broker de filas
- [BullMQ](https://bullmq.io/) — gestão de jobs assíncronos
- [Socket.io](https://socket.io/) — comunicação em tempo real

### Infraestrutura
- [Docker](https://www.docker.com/) + Docker Compose
- `Makefile` com comandos unificados

---

## 🐳 Infraestrutura Local

Todo o ambiente está containerizado. Um único comando para subir tudo:

```bash
make up
```

O compose inclui:
- **API** (NestJS)
- **Frontend / Mobile dev server**
- **PostgreSQL** com healthcheck
- **Redis** com healthcheck

```bash
# Comandos disponíveis
make up       # Sobe todos os serviços
make down     # Para todos os serviços
make logs     # Logs em tempo real
make shell    # Entra no container da API
make migrate  # Roda as migrations do Prisma
```

---

## 🎯 Por que tanta complexidade num projeto pessoal?

Porque é exatamente assim que se constroem sistemas em produção.

Projetos pessoais são o lugar certo para aprender padrões difíceis — DDD, arquitetura hexagonal, filas assíncronas — sem o risco de quebrar nada com utilizadores reais. Quando chegar a altura de trabalhar em sistemas grandes, já sei como pensar.

---

## 📹 Em Breve

> Um vídeo a mostrar o ambiente completo a correr e o fluxo de desenvolvimento. Fica atento.

---

## 🤝 Feedback & Troca de Ideias

Estás a construir algo parecido? Tens uma opinião sobre estas escolhas arquiteturais?

Abre uma [Discussion](../../discussions) ou deixa um comentário. Estou sempre aberto a trocar ideias técnicas — é assim que se cresce.

---

## 📄 Licença

Este repositório será público em breve. Licença a definir.

---

<div align="center">

Feito com foco e propósito em **Luanda, Angola** 🇦🇴  
Projeto de aprendizagem @ [42 Luanda](https://42luanda.com)

</div>
