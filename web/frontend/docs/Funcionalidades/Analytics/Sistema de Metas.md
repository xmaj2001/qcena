# Sistema de Metas

← [[Funcionalidades/Analytics/Dashboard Analytics]]

---

## Visão Geral

O sistema de metas permite ao utilizador definir objectivos de negócio por período e acompanhar o seu progresso em tempo real.

---

## Criação de Metas

O utilizador pode criar metas para os seguintes períodos:

| Período | Descrição |
|---------|-----------|
| Diária | Meta para um dia específico |
| Semanal | Meta para uma semana |
| Mensal | Meta para um mês |
| Anual | Meta para um ano |

---

## Regras de Negócio

| Acção | Permitida? | Condição |
|-------|-----------|----------|
| Criar meta | ✅ Sim | Sempre |
| Editar meta | ✅ Sim | Apenas antes de ser concluída |
| Editar meta concluída | ❌ Não | Após conclusão, a meta é imutável |
| Remover meta | ✅ Sim | Sempre (mesmo após conclusão) |
| Recriar meta no mesmo período | ✅ Sim | Após remover a anterior |

> Uma meta concluída não pode ter o seu valor alterado. A única forma de "recomeçar" é removê-la e criar uma nova para o mesmo período.

---

## Notificação de Conclusão

Quando uma meta é concluída, o utilizador recebe uma **notificação em tempo real** via Socket.io.

---

## Relatório de Encerramento

Ao ser concluída, cada meta gera automaticamente um **snapshot imutável** com:

| Dado | Descrição |
|------|-----------|
| Total de utilizadores | Quantos clientes fizeram reservas durante o período |
| Utilizador que mais reservou | Top 1 por volume no período |
| Primeiro a reservar | O cliente que fez a primeira reserva antes da conclusão |
| Último a reservar | O cliente que fez a última reserva antes da conclusão |
| Serviço mais reservado | Top 1 durante o período da meta |
| Serviço menos reservado | Bottom durante o período da meta |

---

## Exportação

Os dados das metas podem ser exportados individualmente ou em conjunto:
- [[Funcionalidades/Exportação/Exportação Manual]]
- [[Funcionalidades/Exportação/Exportação Automática]]

---

## Referências
- [[Funcionalidades/Analytics/Dashboard Analytics]]
- [[Funcionalidades/Exportação/Exportação Manual]]
- [[Funcionalidades/Exportação/Exportação Automática]]
- [[Funcionalidades/Automação/Webhooks]]
