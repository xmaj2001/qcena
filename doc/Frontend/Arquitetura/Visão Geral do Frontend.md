# Visão Geral do Frontend

← [[🏠 Home]] | [[Frontend/Arquitetura/Estrutura de Módulos]] | [[Frontend/Segurança/Autenticação e Segurança]]

---

## Filosofia

O frontend da Qcena usa **Next.js 16** com o novo sistema de cache e uma arquitectura **modular** inspirada no FSD mas adaptada ao App Router.

Todas as requests ao NestJS passam pela **API interna do Next.js** — o browser nunca fala directamente com o backend. Isto garante que as chaves secretas (assinaturas, env privadas) nunca são expostas ao cliente.

---

## Padrão BFF (Backend for Frontend)

```
Browser → API Route (Next.js) → NestJS
                ↑
        chave de assinatura
        fica aqui — nunca
        exposta ao cliente
```

---

## Separação de Responsabilidades

| Camada | Onde corre | Responsabilidade |
|--------|-----------|-----------------|
| `service` | Servidor | Tem a chave secreta, fala com NestJS |
| `api` | Browser | Fala com as API Routes do Next.js |
| `hooks` | Browser | React Query, estado, cache client-side |
| `types` | Partilhado | Tipos e interfaces |

---

## Cache Strategy (Next.js 16)

- Server Components usam `'use cache'` + `cacheLife()` para dados relativamente estáticos
- Após mutações, `revalidateTag()` invalida o cache no servidor
- React Query gere o cache no cliente para componentes interactivos

---

## Referências
- [[Frontend/Arquitetura/Estrutura de Módulos]]
- [[Frontend/Segurança/Autenticação e Segurança]]
- [[Stack/Stack Técnica]]
