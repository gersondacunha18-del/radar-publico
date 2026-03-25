# RADAR PÚBLICO 🛰️
**"Quem está no poder. O que fez. Para onde foi o dinheiro."**

Plataforma web nacional de monitoramento de agentes públicos, emendas parlamentares, execução de recursos, obras e serviços públicos.

---

## ✅ Funcionalidades Implementadas

### Módulos Principais
- **Home** — Hero, estatísticas nacionais, mapa interativo do Brasil, gráficos de execução, tabela de emendas recentes
- **Busca** — Busca com filtros por cargo, partido, UF, nota
- **Perfil do Político** — Avatar, notas, gráficos de desempenho, emendas, presença, critérios
- **Painel Legislativo** — Vereadores, deputados, senadores com estatísticas gerais
- **Painel Executivo** — Prefeitos, governadores com orçamento e execução
- **Painel STF** — Ministros, sessões, produtividade, gráficos
- **Rastreamento de Emendas** — Tabela completa com filtros avançados
- **Detalhe da Emenda** — Informações completas: autor, destino, empresa, execução, linha do tempo
- **Ranking** — Por volume destinado, nota, cidades e estados
- **Comparador** — Comparação lado a lado com gráfico radar
- **Metodologia** — Critérios e pesos de cada índice
- **Fontes dos Dados** — Lista completa das fontes oficiais

### Gráficos Implementados
- Emendas por Ano (Bar)
- Presença por Mês (Line)
- Recursos por Área (Doughnut)
- Critérios de Nota (Radar)
- Execução Geral por Ano (Bar Grouped)
- Distribuição por Região (Horizontal Bar)
- Top 8 Estados (Bar)
- STF Produtividade (Bar)
- STF Participação (Polar Area)
- Execução de Emenda (Bar)
- Comparador de Políticos (Radar)
- Orçamento Executivo (Doughnut)
- Evolução de Emendas (Line com área)

### Mapa Interativo
- Mapa SVG do Brasil com 27 estados
- Cores proporcionais ao volume recebido
- Tooltip com dados ao passar o mouse
- Painel lateral com detalhes ao clicar
- Links para emendas do estado selecionado

---

## 📄 Páginas e Rotas

| Página | Função de Navegação |
|--------|----------------------|
| Início | `navigateTo('home')` |
| Busca | `navigateTo('busca', 'termo')` |
| Perfil do Político | `navigateTo('perfil', id)` |
| Painel Legislativo | `navigateTo('legislativo')` |
| Painel Executivo | `navigateTo('executivo')` |
| Painel STF | `navigateTo('stf')` |
| Rastreamento de Emendas | `navigateTo('emendas', 'UF')` |
| Detalhe da Emenda | `navigateTo('emenda-detalhe', 'EM-xxxx')` |
| Ranking | `navigateTo('ranking')` |
| Comparador | `navigateTo('comparador')` |
| Metodologia | `navigateTo('metodologia')` |
| Fontes | `navigateTo('fontes')` |

---

## 🗂️ Estrutura de Arquivos

```
index.html          — Estrutura base + navbar + footer
css/style.css       — Todos os estilos (design dark cívico)
js/data.js          — Dados simulados: políticos, emendas, cidades, estados
js/charts.js        — Todas as funções de gráficos (Chart.js)
js/map.js           — Mapa SVG interativo do Brasil
js/pages.js         — Renderização de todas as páginas
js/main.js          — Roteamento, inicialização, interatividade
README.md           — Documentação
```

---

## 📊 Dados Simulados

### Políticos (8 perfis completos)
- Deputados federais, senadores, deputada estadual, vereadora, prefeita
- Partidos: PSD, PT, MDB, União Brasil, PSDB, PL, PDT, Republicanos
- Estados: SP, MG, RJ, BA, RS, CE

### Emendas (8 registros completos)
- Tipos: Individual, Bancada, Comissão
- Situações: Concluída, Em Execução, Paralisada, Empenhada
- Com linha do tempo completa, empresa executora, CNPJ

### Estados (27 + DF)
- Valores recebidos, contagem de emendas, ranking, intensidade visual

### Ministros STF (5 registros)
- Sessões, participação, ações julgadas, HC, relatorias, nota

---

## 🔌 Fontes dos Dados (Produção)

- Portal da Transparência: `transparencia.gov.br`
- TransferênciaGov: `transferegov.sistemas.gov.br`
- Câmara dos Deputados: `camara.leg.br`
- Senado Federal: `senado.leg.br`
- SIOP/SOF: `siop.planejamento.gov.br`
- TSE: `tse.jus.br`
- STF: `stf.jus.br`
- IBGE: `ibge.gov.br`

---

## 🎨 Design

- **Cores**: Azul escuro (#0a1628) + Ciano (#00d4ff) + Verde/Cyan (#00ff9d)
- **Tipografia**: Inter (UI) + JetBrains Mono (números)
- **Estilo**: Dark mode, glassmorphism, glow effects
- **Layout**: CSS Grid + Flexbox, 100% responsivo
- **Sem viés político**: sem cores partidárias, visual neutro e técnico

---

## 🚀 Próximos Passos Recomendados

1. **Integração com APIs reais** (Portal da Transparência API)
2. **Mais políticos** (banco de dados completo via API de tabela)
3. **Mapa SVG aprimorado** (paths reais dos estados brasileiros)
4. **Sistema de alertas** (emails/notificações de atualizações)
5. **Exportação de dados** (CSV, PDF)
6. **Perfil de Órgão Público**
7. **Timeline do mandato** interativa
8. **Sistema de favoritos** com localStorage
9. **Compartilhamento social** de perfis e emendas
10. **Autenticação** para usuários avançados

---

*Dados simulados para fins demonstrativos. Plataforma desenvolvida com foco em transparência e controle social.*
