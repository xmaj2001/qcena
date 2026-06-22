# Exportação Automática

← [[Funcionalidades/Exportação/Exportação Manual]]

---

## Visão Geral

A exportação automática permite ao utilizador integrar a Qcena com o **Google Drive** ou **Google Sheets** para envio periódico de relatórios sem intervenção manual.

---

## Como Funciona

1. O utilizador conecta a sua conta Google à plataforma
2. Define a frequência de envio
3. Escolhe o destino (Google Drive ou Google Sheets)
4. Escolhe o formato (se aplicável)
5. Os dados são enviados automaticamente no período definido

---

## Destinos Disponíveis

### Google Drive
O utilizador escolhe uma pasta de destino e o formato do ficheiro:

| Formato | Disponível |
|---------|-----------|
| PDF | ✅ |
| Obsidian (.md) | ✅ |
| Excel (.xlsx) | ✅ |
| CSV | ✅ |

### Google Sheets
Os dados são inseridos directamente numa folha de cálculo existente ou nova. Não requer escolha de formato — é sempre tabular.

---

## Frequências Disponíveis

| Frequência | Descrição |
|-----------|-----------|
| Diária | Envio automático todos os dias |
| Semanal | Envio automático toda a semana |
| Mensal | Envio automático todo o mês |
| Anual | Envio automático todo o ano |

---

## Notas

- A integração com Google usa OAuth — o utilizador autoriza o acesso uma única vez
- A exportação automática pode ser pausada ou desactivada a qualquer momento
- Complementa (não substitui) a [[Funcionalidades/Exportação/Exportação Manual|exportação manual]]

---

## Referências
- [[Funcionalidades/Exportação/Exportação Manual]]
- [[Funcionalidades/Analytics/Dashboard Analytics]]
- [[Funcionalidades/Automação/Webhooks]]
