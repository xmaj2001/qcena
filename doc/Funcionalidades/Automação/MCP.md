# MCP — Model Context Protocol

← [[Funcionalidades/Automação/Webhooks]] | [[Funcionalidades/Automação/Chat de Automação]]

---

## Visão Geral

O servidor **MCP** da Qcena expõe os dados e acções da plataforma como ferramentas para agentes de IA. Usa **SSE (Server-Sent Events)** para comunicação em tempo real.

É mais poderoso que os webhooks — em vez de apenas receber eventos, o agente pode **consultar e accionar** a plataforma activamente.

---

## Diferença entre MCP e Webhooks

| | Webhooks | MCP |
|--|---------|-----|
| Tipo | Passivo (push) | Activo (pull + push) |
| Uso | Gatilhos simples | Agentes inteligentes |
| Protocolo | HTTP POST | SSE |
| Integrações | n8n, Zapier, Make | n8n (nó agente), Telegram, etc. |

---

## Ferramentas Disponíveis (MCP Tools)

### Consultas
| Tool | Descrição |
|------|-----------|
| `get_bookings` | Listar reservas com filtros |
| `get_services` | Listar serviços do utilizador |
| `get_goals` | Listar metas e o seu estado |
| `get_analytics` | Obter dados analíticos por período ou serviço |
| `get_top_clients` | Clientes que mais reservam |
| `get_service_performance` | Métricas detalhadas de um serviço |

### Acções
| Tool | Descrição |
|------|-----------|
| `create_goal` | Criar uma nova meta via agente |
| `export_report` | Gerar e exportar um relatório num formato específico |

### Eventos (via SSE)
O servidor MCP também emite eventos em tempo real — cobre praticamente os mesmos eventos que os [[Funcionalidades/Automação/Webhooks|Webhooks]], mas em modo streaming.

---

## Casos de Uso

**Via Telegram + n8n:**
> O utilizador envia "Gera um relatório desta semana em PDF" → o agente usa `export_report` → o PDF é enviado de volta no Telegram.

**Via Chat de Automação (app mobile):**
> O utilizador escreve no chat → webhook dispara → agente recebe a mensagem → usa o MCP para consultar dados e executar a acção pedida.

**Via n8n (agente autónomo):**
> O agente monitoriza `goal.completed` via SSE → consulta `get_analytics` para o período da meta → gera e envia relatório automaticamente para o Google Drive.

---

## MCP para Developers

Existe um servidor MCP separado para **monitorização da plataforma**, usado por developers:
- Acesso a logs e métricas do backend
- Detecção de anomalias no frontend e mobile
- Alertas e relatórios de saúde da infraestrutura

---

## Referências
- [[Funcionalidades/Automação/Webhooks]]
- [[Funcionalidades/Automação/Chat de Automação]]
- [[Mobile/Visão Geral Mobile]]
- [[Backend/Arquitetura/Visão Geral do Backend]]
