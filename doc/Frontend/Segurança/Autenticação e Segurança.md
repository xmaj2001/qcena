# Autenticação e Segurança

← [[Frontend/Arquitetura/Visão Geral do Frontend]]

---

## Estratégia de Auth

A Qcena usa uma estratégia de autenticação robusta, com múltiplas camadas de segurança.

---

## Tokens

| Token | Armazenamento | Descrição |
|-------|--------------|-----------|
| `accessToken` | Cookie `httpOnly` | Curta duração — autoriza requests |
| `refreshToken` | Cookie `httpOnly` | Longa duração — renova o access token |

**Porquê `httpOnly`?** Cookies `httpOnly` não são acessíveis via JavaScript — protegem contra ataques XSS.

---

## Whitelist de Tokens

O backend mantém uma **whitelist** dos refresh tokens activos. Quando um token é usado ou revogado, é removido da whitelist. Isto permite:
- Invalidar sessões remotamente
- Detectar reutilização de tokens (possível ataque)

---

## Rotação Automática

A cada uso do `refreshToken`, o backend:
1. Invalida o token antigo (remove da whitelist)
2. Emite um novo par `accessToken` + `refreshToken`
3. Actualiza os cookies

---

## Assinatura de Requests

Todas as requests do Next.js para o NestJS são **assinadas** com uma chave secreta armazenada nas variáveis de ambiente do servidor.

```
NESTJS_API_URL=...
NESTJS_API_KEY=...   ← nunca exposta ao browser
```

O browser faz requests para as **API Routes internas** do Next.js. Só o servidor Next.js conhece a chave de assinatura e fala directamente com o NestJS.

---

## SSO (Next.js)

A Qcena explora o sistema de SSO nativo do Next.js, permitindo autenticação unificada entre diferentes partes da plataforma.

---

## Referências
- [[Backend/Arquitetura/Visão Geral do Backend]]
- [[Frontend/Arquitetura/Estrutura de Módulos]]
