# Blue-Green Deployment

← [[Infraestrutura/DevOps/Ambiente Local]] | [[Infraestrutura/Deploy/NGINX]]

---

## O que é?

O **Blue-Green Deployment** é uma estratégia de deploy com **zero downtime**. Existem sempre dois ambientes idênticos — Blue e Green. Um está activo, o outro em standby.

---

## Diagrama

```
              ┌─────────────┐
  Utilizador ─▶    NGINX    │
              └──────┬──────┘
                     │
          ┌──────────▼──────────┐
          │                     │
    ┌─────▼─────┐         ┌─────▼─────┐
    │  🟦 Blue  │         │  🟩 Green │
    │  (activo) │         │ (standby) │
    └───────────┘         └───────────┘
```

---

## Fluxo de Deploy

1. Nova versão sobe no slot **inactivo** (ex: Green)
2. **Healthcheck** confirma que está saudável
3. NGINX faz `reload` e aponta para Green
4. Blue fica em **standby** — rollback instantâneo se necessário

---

## Slots

| Slot | Estado | Descrição |
|------|--------|-----------|
| 🟦 Blue | Activo / Standby | Primeira instância |
| 🟩 Green | Standby / Activo | Segunda instância |

---

## Comandos

```bash
make deploy-blue    # Sobe nova versão no slot blue
make deploy-green   # Sobe nova versão no slot green
make switch-blue    # NGINX aponta para blue
make switch-green   # NGINX aponta para green
make rollback       # Reverte para o slot anterior
```

---

## Referências
- [[Infraestrutura/Deploy/NGINX]]
- [[Infraestrutura/DevOps/Ambiente Local]]
