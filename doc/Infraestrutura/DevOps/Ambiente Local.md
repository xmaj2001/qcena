# Ambiente Local

← [[🏠 Home]] | [[Infraestrutura/Deploy/Blue-Green Deployment]]

---

## Containerização

Todo o ambiente está containerizado com **Docker + Docker Compose**. Um único comando para subir tudo:

```bash
make up
```

---

## Serviços no Compose

| Serviço | Descrição |
|---------|-----------|
| **NGINX** | Reverse proxy, load balancer, gestor blue-green |
| **API Blue** | Instância NestJS — slot blue |
| **API Green** | Instância NestJS — slot green |
| **Frontend Blue** | Instância Next.js — slot blue |
| **Frontend Green** | Instância Next.js — slot green |
| **PostgreSQL** | Base de dados + healthcheck |
| **Redis** | Cache + broker de filas + healthcheck |

---

## Comandos Make

```bash
# Ambiente
make up             # Sobe todos os serviços
make down           # Para todos os serviços
make logs           # Logs em tempo real
make shell          # Entra no container da API
make migrate        # Corre as migrations do Prisma

# Deploy Blue-Green
make deploy-blue    # Deploy no slot blue
make deploy-green   # Deploy no slot green
make switch-blue    # NGINX aponta para blue
make switch-green   # NGINX aponta para green
make rollback       # Reverte para o slot anterior
```

---

## MCP e Webhooks para Developers

A plataforma expõe **MCP e Webhooks de monitorização** exclusivos para developers. Permitem detectar e reagir a:

- Erros internos no backend (NestJS)
- Anomalias no frontend (Next.js)
- Anomalias na app mobile (Expo)

Estes são distintos dos MCP/Webhooks dos utilizadores — servem para **observabilidade e alertas da plataforma**.

---

## Referências
- [[Infraestrutura/Deploy/Blue-Green Deployment]]
- [[Infraestrutura/Deploy/NGINX]]
- [[Funcionalidades/Automação/Webhooks]]
- [[Funcionalidades/Automação/MCP]]
