# Estrutura de Módulos — Frontend

← [[Frontend/Arquitetura/Visão Geral do Frontend]]

---

## Estrutura de Pastas

```
src/
├── modules/
│   ├── reservas/
│   │   ├── types/
│   │   │   ├── reserva.types.ts        ← entidades/tipos base
│   │   │   ├── reserva.requests.ts     ← inputs (o que envias)
│   │   │   └── reserva.responses.ts    ← outputs (o que recebes)
│   │   ├── api/
│   │   │   └── reservas.api.ts         ← fetch para a API Route do Next.js
│   │   ├── services/
│   │   │   └── reservas.service.ts     ← lógica server-side (fala com NestJS)
│   │   ├── hooks/
│   │   │   ├── use-reservas.ts         ← React Query (Client Components)
│   │   │   └── use-criar-reserva.ts    ← mutation hook
│   │   └── index.ts                    ← barrel export
│   │
│   ├── servicos/
│   ├── analytics/
│   ├── metas/
│   ├── exportacao/
│   └── auth/
│
├── app/
│   ├── api/
│   │   ├── reservas/
│   │   │   └── route.ts                ← API Route (proxy seguro para NestJS)
│   │   ├── servicos/
│   │   ├── analytics/
│   │   └── auth/
│   └── (dashboard)/
│       ├── reservas/
│       ├── servicos/
│       ├── analytics/
│       └── metas/
│
└── shared/
    ├── types/
    │   └── api.types.ts                ← ApiResponse<T> e ApiError globais
    ├── lib/
    │   └── fetch.ts                    ← fetch wrapper base
    └── hooks/
        └── use-query-params.ts
```

---

## Fluxo por Tipo de Componente

### Server Component (dados estáticos/SSR)
```ts
// Usa o service directamente — corre no servidor
async function ReservasPage() {
  'use cache'
  cacheLife('minutes')
  const { data } = await reservasService.listar('cliente-123')
  return <ListaReservas inicial={data.reservas} />
}
```

### Client Component (interactivo)
```ts
'use client'
function ListaReservas({ inicial }: { inicial: Reserva[] }) {
  const { data, isLoading } = useReservas('cliente-123')
  const { mutate: criar } = useCriarReserva()
  // ...
}
```

---

## Regras de Importação

- `service` → só pode ser importado em Server Components ou API Routes
- `api` → só pode ser importado em Client Components ou hooks
- `types` → pode ser importado em qualquer lado
- Módulos **não se importam entre si** directamente — usam `shared/` como ponte

---

## Referências
- [[Frontend/Arquitetura/Visão Geral do Frontend]]
- [[Frontend/Segurança/Autenticação e Segurança]]
