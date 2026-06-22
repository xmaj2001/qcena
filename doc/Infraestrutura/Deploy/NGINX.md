# NGINX

← [[Infraestrutura/Deploy/Blue-Green Deployment]]

---

## Papel do NGINX na Qcena

O NGINX não é apenas um servidor web — é o **ponto de controlo de tráfego** de toda a plataforma. Actua como:

- **Reverse Proxy** — recebe todas as requests externas
- **Load Balancer** — distribui tráfego entre instâncias
- **Gestor de Blue-Green** — controla qual slot está activo

---

## Load Balancing

```nginx
upstream api_backend {
    server api_blue:3000;
    server api_green:3000;
}

upstream frontend {
    server frontend_blue:8081;
    server frontend_green:8081;
}
```

---

## Fluxo de Tráfego

```
Internet
   │
   ▼
NGINX (porta 80/443)
   ├── /api/*  ──▶  api_backend (NestJS activo)
   └── /*      ──▶  frontend (Next.js activo)
```

---

## Referências
- [[Infraestrutura/Deploy/Blue-Green Deployment]]
- [[Infraestrutura/DevOps/Ambiente Local]]
