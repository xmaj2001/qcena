# Webhooks

← [[🏠 Home]] | [[Funcionalidades/Automação/MCP]]

---

## Visão Geral

Os webhooks da Qcena permitem ao utilizador integrar a plataforma com ferramentas externas (n8n, Zapier, Make, etc.) através de eventos que são disparados automaticamente quando algo acontece na plataforma.

---

## Eventos Disponíveis

### Reservas
| Evento | Descrição |
|--------|-----------|
| `booking.created` | Nova reserva feita |
| `booking.confirmed` | Reserva confirmada pelo prestador |
| `booking.cancelled` | Reserva cancelada |
| `booking.completed` | Reserva concluída |

### Serviços
| Evento | Descrição |
|--------|-----------|
| `service.created` | Novo serviço criado |
| `service.updated` | Serviço editado |

### Metas
| Evento | Descrição |
|--------|-----------|
| `goal.created` | Nova meta criada |
| `goal.completed` | Meta concluída (inclui snapshot completo) |
| `goal.removed` | Meta removida |

### Pagamentos
| Evento | Descrição |
|--------|-----------|
| `payment.received` | Pagamento recebido |
| `payment.refunded` | Reembolso processado |

### Relatórios
| Evento | Descrição |
|--------|-----------|
| `report.exported` | Exportação de relatório concluída |

### Chat de Automação
| Evento | Descrição |
|--------|-----------|
| `chat.message_received` | Mensagem enviada no chat de automação |

---

## Gatilhos Personalizados

Além dos eventos padrão, o utilizador pode configurar **gatilhos personalizados**:

**Exemplo — Notificação por valor:**
> O utilizador define um valor (ex: 5.000 AOA). Sempre que uma reserva ultrapassar esse valor, o webhook é disparado.

---

## Casos de Uso

- Notificar no Telegram quando uma meta for concluída
- Criar uma tarefa no Notion quando uma nova reserva for feita
- Enviar dados para um Google Sheet via n8n quando uma reserva for concluída
- Activar um agente de IA quando uma mensagem chegar no chat de automação

---

## Webhooks para Developers

Além dos webhooks de utilizador, existem webhooks de **monitorização** exclusivos para developers:
- Erros internos no backend
- Anomalias no frontend
- Anomalias na app mobile

---

## Referências
- [[Funcionalidades/Automação/MCP]]
- [[Funcionalidades/Automação/Chat de Automação]]
- [[Mobile/Visão Geral Mobile]]
