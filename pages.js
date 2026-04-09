/* ============================================================
   RADAR PÚBLICO — Módulo de Páginas (completo)
   ============================================================ */

/* ============ HELPERS ============ */
function renderPoliticoCard(p) {
    const ranking = safeText(p.ranking, "-");
    const nome = safeText(p.nome, "Sem nome");
    const cargo = safeText(p.cargo, "Cargo não informado");
    const partido = safeText(p.partido, "-");
    const estado = safeText(p.estado, "-");
    const foto = safeText(p.foto, "");
    const avaliacao = Number(p.avaliacao || 0).toFixed(1);
    const valorTotal = formatCurrency(p.valor_total || 0);
    const municipios = formatNumber(p.municipios_atendidos || 0);
    const execucao = Number(p.taxa_execucao || 0);

    let medalha = "🏅";
    if (ranking === 1) medalha = "🥇";
    if (ranking === 2) medalha = "🥈";
    if (ranking === 3) medalha = "🥉";

    return `
        <div class="politician-card" onclick="navigateTo('politico-detalhe', '${p.id}')">
            <div class="score-badge">
                ${medalha} #${ranking}
            </div>

            <div class="politician-avatar">
                ${foto ? `<img src="${foto}" alt="${nome}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : nome.charAt(0)}
            </div>

            <div class="politician-name">${nome}</div>
            <div class="politician-role">${cargo}</div>
            <div class="politician-party">${partido} · ${estado}</div>

            <div class="politician-stats">
                <div class="pol-stat-item">
                    <div class="pol-stat-value">${valorTotal}</div>
                    <div class="pol-stat-label">Recursos</div>
                </div>

                <div class="pol-stat-item">
                    <div class="pol-stat-value">${municipios}</div>
                    <div class="pol-stat-label">Cidades</div>
                </div>

                <div class="pol-stat-item">
                    <div class="pol-stat-value">${avaliacao} ⭐</div>
                    <div class="pol-stat-label">Avaliação</div>
                </div>
            </div>

            <div style="margin-top:12px">
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;color:var(--text-muted)">
                    <span>Execução</span>
                    <span>${execucao}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${execucao === 100 ? 'success' : execucao < 30 ? 'warning' : ''}" style="width:${execucao}%"></div>
                </div>
            </div>
        </div>
    `;
}

function renderPoliticoDetalhe(id) {
    const politico = getPoliticoById(id);

    if (!politico) {
        return `
        <div class="page-transition">
            <section class="section">
                <div class="section-container">
                    <div class="empty-state">
                        <h2>Político não encontrado</h2>
                        <p class="text-muted">Não foi possível localizar esse registro.</p>
                        <button class="btn btn-primary" onclick="navigateTo('home')">Voltar</button>
                    </div>
                </div>
            </section>
        </div>`;
    }

    const emendas = getEmendasByAutor(politico.id);
    const valorTotalEmendas = emendas.reduce((acc, e) => acc + Number(e.valor_indicado || e.valor || 0), 0);

    let medalha = "🏅";
    if (politico.ranking === 1) medalha = "🥇";
    if (politico.ranking === 2) medalha = "🥈";
    if (politico.ranking === 3) medalha = "🥉";

    return `
    <div class="page-transition">
        <section class="section">
            <div class="section-container">
                <button class="btn btn-ghost btn-sm" onclick="navigateTo('home')" style="margin-bottom:20px">
                    ← Voltar
                </button>

                <div class="detail-card">
                    <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
                        <div class="politician-avatar" style="width:96px;height:96px;font-size:32px">
                            ${politico.foto
                                ? `<img src="${politico.foto}" alt="${safeText(politico.nome)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
                                : safeText(politico.nome, "P").charAt(0)}
                        </div>

                        <div style="flex:1">
                            <div class="badge badge-blue" style="margin-bottom:10px">${medalha} Ranking #${politico.ranking || "-"}</div>
                            <h1 style="margin:0 0 8px 0">${safeText(politico.nome, "Sem nome")}</h1>
                            <p style="margin:0 0 6px 0;color:var(--text-secondary)">${safeText(politico.cargo, "Cargo não informado")}</p>
                            <p style="margin:0;color:var(--text-muted)">${safeText(politico.partido, "-")} · ${safeText(politico.estado, "-")}</p>
                        </div>
                    </div>

                    <div class="grid grid-4" style="margin-top:24px">
                        <div class="hero-stat">
                            <div class="stat-num">${Number(politico.avaliacao || 0).toFixed(1)} ⭐</div>
                            <div class="stat-label">Avaliação</div>
                        </div>
                        <div class="hero-stat">
                            <div class="stat-num">${formatCurrency(politico.valor_total || 0)}</div>
                            <div class="stat-label">Valor Total</div>
                        </div>
                        <div class="hero-stat">
                            <div class="stat-num">${formatNumber(politico.municipios_atendidos || 0)}</div>
                            <div class="stat-label">Municípios Atendidos</div>
                        </div>
                        <div class="hero-stat">
                            <div class="stat-num">${formatNumber(politico.taxa_execucao || 0)}%</div>
                            <div class="stat-label">Taxa de Execução</div>
                        </div>
                    </div>
                </div>

                <div class="section-header" style="margin-top:32px">
                    <div>
                        <h2 class="section-title"><i class="fas fa-file-invoice-dollar"></i> Emendas do Político</h2>
                        <p class="section-subtitle">Resumo das movimentações vinculadas a este agente</p>
                    </div>
                </div>

                <div class="grid grid-3">
                    <div class="hero-stat">
                        <div class="stat-num">${formatNumber(emendas.length)}</div>
                        <div class="stat-label">Total de Emendas</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${formatCurrency(valorTotalEmendas)}</div>
                        <div class="stat-label">Valor Indicado</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${politico.score ? politico.score.toFixed(1) : "-"}</div>
                        <div class="stat-label">Score</div>
                    </div>
                </div>

                <div class="table-wrapper" style="margin-top:24px">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>OBJETO</th>
                                <th>MUNICÍPIO</th>
                                <th>VALOR</th>
                                <th>SITUAÇÃO</th>
                                <th>EXECUÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${emendas.length ? emendas.map(e => `
                                <tr>
                                    <td>${safeText(e.id, "-")}</td>
                                    <td>${safeText(e.objeto, "-")}</td>
                                    <td>${safeText(e.municipio, "-")} / ${safeText(e.estado, "-")}</td>
                                    <td>${formatCurrency(e.valor_indicado || e.valor || 0)}</td>
                                    <td>
                                        <span class="badge ${getStatusBadge(e.situacao || e.status)}">
                                            ${safeText(e.situacao || e.status, "-")}
                                        </span>
                                    </td>
                                    <td>${safeText(e.percentual_execucao, 0)}%</td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="6" style="text-align:center;color:var(--text-muted)">
                                        Nenhuma emenda encontrada para este político.
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>`;
}

function renderInfoGrid(items = []) {
    return `
    <div class="info-grid">
        ${items.map(item => `
            <div class="info-item">
                <div class="info-label">${item.label}</div>
                <div class="info-value">${item.value}</div>
            </div>
        `).join('')}
    </div>`;
}

function renderEmptyState(title, subtitle = '') {
    return `
    <div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">
        <i class="fas fa-search" style="font-size:48px;display:block;margin-bottom:16px;opacity:0.3"></i>
        <div style="font-size:18px;font-weight:700;margin-bottom:8px">${title}</div>
        ${subtitle ? `<div>${subtitle}</div>` : ''}
    </div>`;
}

/* ============ HOME ============ */
function renderHome() {
    const stats = RadarData.stats_gerais || {};

    return `
    <div class="page-transition">
        <section class="hero">
            <div class="hero-container">
                <div class="hero-badge">
                    <i class="fas fa-satellite-dish"></i>
                    MONITORAMENTO NACIONAL EM TEMPO REAL
                </div>

                <h1 class="hero-title">
                    Quem está no poder.<br>
                    <span>O que fez. Para onde foi o dinheiro.</span>
                </h1>

                <p class="hero-subtitle">
                    Plataforma nacional de transparência e controle social para monitorar políticos,
                    emendas parlamentares e execução de recursos públicos.
                </p>

                <div class="hero-questions">
                    <span class="hero-tag">👤 Quem mandou o dinheiro?</span>
                    <span class="hero-tag">🏙️ Para onde foi?</span>
                    <span class="hero-tag">🏗️ Quem está executando?</span>
                    <span class="hero-tag">📊 Qual o andamento?</span>
                    <span class="hero-tag">⭐ Qual o desempenho?</span>
                </div>

                <div class="hero-stats">
                    <div class="hero-stat" onclick="navigateTo('busca')">
                        <div class="stat-num">${formatNumber(stats.total_politicos_monitorados || 0)}</div>
                        <div class="stat-label">Agentes Monitorados</div>
                    </div>
                    <div class="hero-stat" onclick="navigateTo('emendas')">
                        <div class="stat-num">${formatNumber(stats.total_emendas_2024 || 0)}</div>
                        <div class="stat-label">Emendas em 2024</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${formatCurrency(stats.valor_total_emendas || 0)}</div>
                        <div class="stat-label">Volume Total 2024</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${stats.percentual_execucao || 0}%</div>
                        <div class="stat-label">Taxa de Execução</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${formatNumber(stats.municipios_atendidos || 0)}</div>
                        <div class="stat-label">Municípios Atendidos</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${formatNumber(stats.obras_ativas || 0)}</div>
                        <div class="stat-label">Obras Ativas</div>
                    </div>
                </div>

                <div class="hero-actions">
                    <button class="btn btn-primary btn-lg" onclick="navigateTo('emendas')">
                        <i class="fas fa-search-dollar"></i> Rastrear Emendas
                    </button>
                    <button class="btn btn-outline btn-lg" onclick="navigateTo('ranking')">
                        <i class="fas fa-trophy"></i> Ver Rankings
                    </button>
                    <button class="btn btn-ghost btn-lg" onclick="navigateTo('busca')">
                        <i class="fas fa-user-tie"></i> Buscar Político
                    </button>
                </div>
            </div>
        </section>

        <section class="section" style="background:var(--primary-light)">
            <div class="section-container">
                <div class="section-header">
                    <div>
                        <h2 class="section-title"><i class="fas fa-th-large"></i> Módulos da Plataforma</h2>
                        <p class="section-subtitle">Acesse os dados de cada poder e funcionalidade</p>
                    </div>
                </div>
                <div class="grid grid-4">
                    <div class="module-card" onclick="navigateTo('legislativo')">
                        <div class="module-icon blue"><i class="fas fa-landmark"></i></div>
                        <h3 class="module-title">Legislativo</h3>
                        <p class="module-count">Vereadores · Deputados · Senadores</p>
                    </div>
                    <div class="module-card" onclick="navigateTo('executivo')">
                        <div class="module-icon green"><i class="fas fa-building-columns"></i></div>
                        <h3 class="module-title">Executivo</h3>
                        <p class="module-count">Presidente · Governadores · Prefeitos</p>
                    </div>
                    <div class="module-card" onclick="navigateTo('stf')">
                        <div class="module-icon purple"><i class="fas fa-gavel"></i></div>
                        <h3 class="module-title">Judiciário / STF</h3>
                        <p class="module-count">Ministros · Sessões · Produtividade</p>
                    </div>
                    <div class="module-card" onclick="navigateTo('emendas')">
                        <div class="module-icon orange"><i class="fas fa-file-invoice-dollar"></i></div>
                        <h3 class="module-title">Emendas</h3>
                        <p class="module-count">Rastreamento completo de recursos</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="section-container">
                <div class="section-header">
                    <div>
                        <h2 class="section-title"><i class="fas fa-users"></i> Políticos em Destaque</h2>
                        <p class="section-subtitle">Maiores destaques por desempenho e volume de recursos</p>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="navigateTo('busca')">Ver todos →</button>
                </div>
                <div class="grid grid-4" id="topPoliticosGrid">
                    ${safeArray(RadarData.politicos).slice(0, 4).map(p => renderPoliticoCard(p)).join('')}
                </div>
            </div>
        </section>

        <section class="section" style="background:var(--primary-light)">
            <div class="section-container">
                <div class="section-header">
                    <div>
                        <h2 class="section-title"><i class="fas fa-map-marked-alt"></i> Mapa de Investimentos</h2>
                        <p class="section-subtitle">Distribuição de emendas e recursos por estado</p>
                    </div>
                </div>
                <div class="map-section">
                    <div class="map-header">
                        <span style="font-weight:700">Investimentos por Estado — 2024</span>
                        <div class="flex gap-8 items-center">
                            <span class="badge badge-green">↑ Maior volume</span>
                            <span class="badge badge-blue">Médio</span>
                            <span class="badge badge-gray">Menor volume</span>
                        </div>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 320px;gap:0">
                        <div id="brazilMap"></div>
                        <div id="mapStateDetail" style="padding:20px;border-left:1px solid var(--border);display:none;overflow-y:auto;max-height:500px"></div>
                    </div>
                    <div class="map-legend">
                        <div class="legend-item">
                            <div class="legend-dot" style="background:rgba(0,255,157,0.6)"></div> Acima de R$ 800M
                        </div>
                        <div class="legend-item">
                            <div class="legend-dot" style="background:rgba(0,212,255,0.5)"></div> R$ 400M - R$ 800M
                        </div>
                        <div class="legend-item">
                            <div class="legend-dot" style="background:rgba(0,212,255,0.2)"></div> Abaixo de R$ 400M
                        </div>
                        <span class="text-muted" style="font-size:11px;margin-left:auto"><i class="fas fa-info-circle"></i> Clique no estado para ver detalhes</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="section-container">
                <div class="section-header">
                    <div>
                        <h2 class="section-title"><i class="fas fa-chart-line"></i> Execução Orçamentária</h2>
                        <p class="section-subtitle">Histórico de emendas: indicado, empenhado e pago</p>
                    </div>
                </div>
                <div class="grid grid-2">
                    <div class="chart-container">
                        <div class="chart-header">
                            <span class="chart-title"><i class="fas fa-chart-bar"></i> Emendas por Ano (R$ Milhões)</span>
                        </div>
                        <div style="height:260px">
                            <canvas id="chartExecucaoGeral"></canvas>
                        </div>
                        <div class="data-source"><i class="fas fa-database"></i> Fonte: Portal da Transparência · Atualizado em ${stats.data_atualizacao || '-'}</div>
                    </div>
                    <div class="chart-container">
                        <div class="chart-header">
                            <span class="chart-title"><i class="fas fa-globe"></i> Investimento por Região (R$ Bilhões)</span>
                        </div>
                        <div style="height:260px">
                            <canvas id="chartRegiao"></canvas>
                        </div>
                        <div class="data-source"><i class="fas fa-database"></i> Fonte: SIOP / SOF · Cálculo próprio</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" style="background:var(--primary-light)">
            <div class="section-container">
                <div class="section-header">
                    <div>
                        <h2 class="section-title"><i class="fas fa-file-invoice-dollar"></i> Emendas Recentes</h2>
                        <p class="section-subtitle">Rastreamento em tempo real das últimas movimentações</p>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="navigateTo('emendas')">Ver todas →</button>
                </div>
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>CÓDIGO</th>
                                <th>AUTOR</th>
                                <th>OBJETO</th>
                                <th>MUNICÍPIO/UF</th>
                                <th>VALOR</th>
                                <th>PAGO</th>
                                <th>SITUAÇÃO</th>
                                <th>EXEC.</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${safeArray(RadarData.emendas).slice(0, 6).map(e => `
                                <tr onclick="navigateTo('emenda-detalhe', '${e.id}')" style="cursor:pointer">
                                    <td><span class="font-mono text-accent" style="font-size:11px">${e.id}</span></td>
                                    <td>
                                        <div style="font-weight:600;font-size:13px">${safeText(e.autor, '').split(' ').slice(0,2).join(' ')}</div>
                                        <div style="font-size:11px;color:var(--text-muted)">${safeText(e.partido, '-')} · ${safeText(e.uf, '-')}</div>
                                    </td>
                                    <td style="max-width:200px">
                                        <div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${safeText(e.objeto, '-')}</div>
                                        <div style="font-size:11px;color:var(--text-muted)">${safeText(e.tipo, '-')}</div>
                                    </td>
                                    <td><span class="font-mono" style="font-size:12px">${safeText(e.municipio, '-')} / ${safeText(e.estado, '-')}</span></td>
                                    <td><span class="font-mono text-accent">${e.valor_indicado ? formatCurrency(e.valor_indicado) : '-'}</span></td>
                                    <td><span class="font-mono text-accent2">${e.valor_pago ? formatCurrency(e.valor_pago) : '-'}</span></td>
                                    <td>
                                        <span class="badge ${getStatusBadge(e.situacao)}">
                                            <span class="status-dot ${safeText(e.situacao_cor, '')}"></span>
                                            ${safeText(e.situacao, '-')}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="progress-bar" style="width:80px">
                                            <div class="progress-fill ${e.percentual_execucao === 100 ? 'success' : e.percentual_execucao < 10 ? 'warning' : ''}" style="width:${e.percentual_execucao || 0}%"></div>
                                        </div>
                                        <span style="font-size:11px;color:var(--text-muted)">${safeText(e.percentual_execucao, 0)}%</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="data-source"><i class="fas fa-database"></i> Fonte: Portal da Transparência, TransferênciaGov · Atualizado em ${stats.data_atualizacao || '-'}</div>
            </div>
        </section>
    </div>`;
}

/* ============ BUSCA ============ */
function renderBusca(query = '') {
    let resultados = safeArray(RadarData.politicos);
    if (query) {
        const q = String(query).toLowerCase();
        resultados = safeArray(RadarData.politicos).filter(p =>
            String(p.nome || '').toLowerCase().includes(q) ||
            String(p.cargo || '').toLowerCase().includes(q) ||
            String(p.partido || '').toLowerCase().includes(q) ||
            String(p.uf || '').toLowerCase().includes(q) ||
            String(p.municipio || '').toLowerCase().includes(q)
        );
    }

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-search"></i> BUSCA</div>
                <h1 class="page-hero-title">Encontre Políticos e Agentes Públicos</h1>
                <p class="page-hero-subtitle">Pesquise por nome, cargo, partido, estado ou cidade</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="filter-bar" style="flex-direction:column;align-items:stretch">
                    <div style="display:flex;gap:12px;flex-wrap:wrap">
                        <div style="flex:1;min-width:250px;position:relative">
                            <i class="fas fa-search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);font-size:13px"></i>
                            <input type="text" id="buscaInput" placeholder="Nome, cargo, partido, cidade..."
                                style="width:100%;padding:10px 16px 10px 38px"
                                value="${query}" oninput="handleBuscaInput(this.value)">
                        </div>
                        <select id="filtroCargo" onchange="aplicarFiltros()">
                            <option value="">Todos os Cargos</option>
                            <option value="Deputado Federal">Deputado Federal</option>
                            <option value="Senador">Senador</option>
                            <option value="Deputada Estadual">Deputada Estadual</option>
                            <option value="Prefeita">Prefeito/a</option>
                            <option value="Vereadora">Vereador/a</option>
                        </select>
                        <select id="filtroPartido" onchange="aplicarFiltros()">
                            <option value="">Todos os Partidos</option>
                            <option value="PSD">PSD</option>
                            <option value="PT">PT</option>
                            <option value="MDB">MDB</option>
                            <option value="União Brasil">União Brasil</option>
                            <option value="PSDB">PSDB</option>
                            <option value="PL">PL</option>
                            <option value="PDT">PDT</option>
                        </select>
                        <select id="filtroUF" onchange="aplicarFiltros()">
                            <option value="">Todos os Estados</option>
                            ${safeArray(RadarData.estados).slice(0, 27).map(e => `<option value="${e.uf}">${e.nome}</option>`).join('')}
                        </select>
                        <select id="filtroNota" onchange="aplicarFiltros()">
                            <option value="">Todas as Notas</option>
                            <option value="A">Nota A (≥ 9)</option>
                            <option value="B">Nota B (≥ 7.5)</option>
                            <option value="C">Nota C (≥ 6)</option>
                        </select>
                    </div>
                </div>

                <div style="margin-bottom:16px;font-size:13px;color:var(--text-muted)">
                    <i class="fas fa-info-circle text-accent"></i>
                    Exibindo <strong>${resultados.length}</strong> resultado${resultados.length !== 1 ? 's' : ''}
                    ${query ? ` para "<span style="color:var(--accent)">${query}</span>"` : ''}
                </div>

                <div class="grid grid-4" id="buscaResultados">
                    ${resultados.length > 0
                        ? resultados.map(p => renderPoliticoCard(p)).join('')
                        : renderEmptyState(`Nenhum resultado encontrado para "${query}"`)
                    }
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ EMENDAS ============ */
function renderEmendas() {
    const emendas = safeArray(RadarData.emendas);
    const stats = RadarData.stats_gerais || {};

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-file-invoice-dollar"></i> EMENDAS</div>
                <h1 class="page-hero-title">Rastreamento de Emendas Parlamentares</h1>
                <p class="page-hero-subtitle">Acompanhe autor, destino, situação e execução dos recursos públicos</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                ${renderInfoGrid([
                    { label: 'Emendas em 2024', value: formatNumber(stats.total_emendas_2024 || emendas.length || 0) },
                    { label: 'Valor Total', value: formatCurrency(stats.valor_total_emendas || 0) },
                    { label: 'Taxa de Execução', value: `${stats.percentual_execucao || 0}%` },
                    { label: 'Municípios Atendidos', value: formatNumber(stats.municipios_atendidos || 0) }
                ])}

                <div class="filter-bar" style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap">
                    <input id="filtroEmendasTexto" type="text" placeholder="Buscar por autor, objeto ou município..." oninput="filtrarEmendas()" style="flex:1;min-width:240px">
                    <select id="filtroEmendasUF" onchange="filtrarEmendas()">
                        <option value="">Todos os Estados</option>
                        ${safeArray(RadarData.estados).slice(0, 27).map(e => `<option value="${e.uf}">${e.uf}</option>`).join('')}
                    </select>
                    <select id="filtroEmendasSituacao" onchange="filtrarEmendas()">
                        <option value="">Todas as Situações</option>
                        ${[...new Set(emendas.map(e => e.situacao).filter(Boolean))].map(s => `<option value="${s}">${s}</option>`).join('')}
                    </select>
                    <select id="filtroEmendasAno" onchange="filtrarEmendas()">
                        <option value="">Todos os Anos</option>
                        ${[...new Set(emendas.map(e => e.ano).filter(Boolean))].sort((a,b) => b-a).map(a => `<option value="${a}">${a}</option>`).join('')}
                    </select>
                </div>

                <div id="emendasResultados" class="table-wrapper" style="margin-top:20px">
                    ${renderEmendasTabela(emendas)}
                </div>
            </div>
        </section>
    </div>`;
}

function renderEmendasTabela(emendas = []) {
    if (!emendas.length) {
        return renderEmptyState('Nenhuma emenda encontrada', 'Ajuste os filtros e tente novamente.');
    }

    return `
    <table>
        <thead>
            <tr>
                <th>CÓDIGO</th>
                <th>AUTOR</th>
                <th>OBJETO</th>
                <th>MUNICÍPIO/UF</th>
                <th>VALOR</th>
                <th>PAGO</th>
                <th>SITUAÇÃO</th>
                <th>EXEC.</th>
            </tr>
        </thead>
        <tbody>
            ${emendas.map(e => `
                <tr onclick="navigateTo('emenda-detalhe', '${e.id}')" style="cursor:pointer">
                    <td><span class="font-mono text-accent" style="font-size:11px">${e.id}</span></td>
                    <td>
                        <div style="font-weight:600;font-size:13px">${safeText(e.autor, '').split(' ').slice(0,2).join(' ')}</div>
                        <div style="font-size:11px;color:var(--text-muted)">${safeText(e.partido, '-')} · ${safeText(e.uf, '-')}</div>
                    </td>
                    <td style="max-width:260px">
                        <div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${safeText(e.objeto, '-')}</div>
                        <div style="font-size:11px;color:var(--text-muted)">${safeText(e.tipo, '-')}</div>
                    </td>
                    <td><span class="font-mono" style="font-size:12px">${safeText(e.municipio, '-')} / ${safeText(e.estado, '-')}</span></td>
                    <td><span class="font-mono text-accent">${e.valor_indicado ? formatCurrency(e.valor_indicado) : '-'}</span></td>
                    <td><span class="font-mono text-accent2">${e.valor_pago ? formatCurrency(e.valor_pago) : '-'}</span></td>
                    <td>
                        <span class="badge ${getStatusBadge(e.situacao)}">${safeText(e.situacao, '-')}</span>
                    </td>
                    <td>${safeText(e.percentual_execucao, 0)}%</td>
                </tr>
            `).join('')}
        </tbody>
    </table>`;
}

/* ============ RANKING ============ */
function renderRanking() {
    const ranking = safeArray(RadarData.politicos)
        .slice()
        .sort((a, b) => Number(b.nota || 0) - Number(a.nota || 0));

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-trophy"></i> RANKING</div>
                <h1 class="page-hero-title">Ranking de Desempenho</h1>
                <p class="page-hero-subtitle">Compare notas, presença, projetos e volume de recursos</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>NOME</th>
                                <th>CARGO</th>
                                <th>PARTIDO/UF</th>
                                <th>NOTA</th>
                                <th>PRESENÇA</th>
                                <th>PROJETOS</th>
                                <th>RECURSOS</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${ranking.map((p, i) => `
                                <tr onclick="navigateTo('perfil', '${p.id}')" style="cursor:pointer">
                                    <td>${i + 1}</td>
                                    <td><strong>${safeText(p.nome, '-')}</strong></td>
                                    <td>${safeText(p.cargo, '-')}</td>
                                    <td>${safeText(p.partido, '-')} · ${safeText(p.uf, '-')}</td>
                                    <td>${safeText(p.nota, '-')}</td>
                                    <td>${safeText(p.presenca, '-')}%</td>
                                    <td>${safeText(p.projetos, '-')}</td>
                                    <td>${p.valor_total ? formatCurrency(p.valor_total) : '-'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ COMPARADOR ============ */
function renderComparador() {
    const politicos = safeArray(RadarData.politicos);

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-balance-scale"></i> COMPARADOR</div>
                <h1 class="page-hero-title">Compare Agentes Públicos</h1>
                <p class="page-hero-subtitle">Selecione dois nomes e veja os indicadores lado a lado</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="filter-bar" style="display:flex;gap:12px;flex-wrap:wrap">
                    <select id="comparadorPol1" onchange="atualizarComparador()" style="flex:1;min-width:240px">
                        ${politicos.map((p, i) => `<option value="${p.id}" ${i === 0 ? 'selected' : ''}>${p.nome}</option>`).join('')}
                    </select>
                    <select id="comparadorPol2" onchange="atualizarComparador()" style="flex:1;min-width:240px">
                        ${politicos.map((p, i) => `<option value="${p.id}" ${i === 1 ? 'selected' : ''}>${p.nome}</option>`).join('')}
                    </select>
                </div>

                <div id="compareGrid" class="grid grid-2" style="margin-top:20px">
                    ${politicos[0] ? renderComparadorCard(politicos[0]) : ''}
                    ${politicos[1] ? renderComparadorCard(politicos[1]) : ''}
                </div>

                <div class="chart-container" style="margin-top:20px">
                    <div class="chart-header">
                        <span class="chart-title"><i class="fas fa-chart-radar"></i> Comparação Visual</span>
                    </div>
                    <div style="height:320px">
                        <canvas id="chartComparador"></canvas>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ PERFIL ============ */
function renderPerfil(id) {
    const p = getPoliticoById(id);
    if (!p) {
        return `
        <section class="section">
            <div class="section-container">
                ${renderEmptyState('Político não encontrado')}
            </div>
        </section>`;
    }

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-user"></i> PERFIL</div>
                <h1 class="page-hero-title">${safeText(p.nome, 'Sem nome')}</h1>
                <p class="page-hero-subtitle">${safeText(p.cargo, '-')} · ${safeText(p.partido, '-')} · ${safeText(p.uf, '-')}</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="grid grid-2">
                    <div class="card">
                        <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
                            <div class="politician-avatar" style="width:72px;height:72px;font-size:28px">${safeText(p.foto_inicial, '??')}</div>
                            <div>
                                <div style="font-size:24px;font-weight:800">${safeText(p.nome, 'Sem nome')}</div>
                                <div style="color:var(--text-muted)">${safeText(p.cargo, '-')} · ${safeText(p.partido, '-')} · ${safeText(p.uf, '-')}</div>
                            </div>
                        </div>

                        ${renderInfoGrid([
                            { label: 'Nota', value: safeText(p.nota, '-') },
                            { label: 'Presença', value: `${safeText(p.presenca, '-')}%` },
                            { label: 'Projetos', value: safeText(p.projetos, '-') },
                            { label: 'Cidades Atendidas', value: safeText(p.cidades_atendidas, '-') },
                            { label: 'Município Base', value: safeText(p.municipio, '-') },
                            { label: 'Recursos', value: p.valor_total ? formatCurrency(p.valor_total) : '-' }
                        ])}
                    </div>

                    <div class="card">
                        <div style="display:flex;justify-content:center;align-items:center;min-height:260px">
                            <canvas id="profileScoreChart" width="100" height="100"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ DETALHE DA EMENDA ============ */
function renderEmendaDetalhe(id) {
    const e = getEmendaById(id);
    if (!e) {
        return `
        <section class="section">
            <div class="section-container">
                ${renderEmptyState('Emenda não encontrada')}
            </div>
        </section>`;
    }

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-file-invoice-dollar"></i> DETALHE DA EMENDA</div>
                <h1 class="page-hero-title">${safeText(e.objeto, 'Sem objeto')}</h1>
                <p class="page-hero-subtitle">${safeText(e.autor, '-')} · ${safeText(e.municipio, '-')} / ${safeText(e.estado, '-')}</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                ${renderInfoGrid([
                    { label: 'Código', value: safeText(e.id, '-') },
                    { label: 'Autor', value: safeText(e.autor, '-') },
                    { label: 'Partido/UF', value: `${safeText(e.partido, '-')} · ${safeText(e.uf, '-')}` },
                    { label: 'Tipo', value: safeText(e.tipo, '-') },
                    { label: 'Situação', value: safeText(e.situacao, '-') },
                    { label: 'Ano', value: safeText(e.ano, '-') },
                    { label: 'Valor Indicado', value: e.valor_indicado ? formatCurrency(e.valor_indicado) : '-' },
                    { label: 'Valor Pago', value: e.valor_pago ? formatCurrency(e.valor_pago) : '-' },
                    { label: 'Execução', value: `${safeText(e.percentual_execucao, 0)}%` }
                ])}

                <div class="chart-container" style="margin-top:20px">
                    <div class="chart-header">
                        <span class="chart-title"><i class="fas fa-chart-pie"></i> Execução da Emenda</span>
                    </div>
                    <div style="height:320px">
                        <canvas id="chartEmendaExec"></canvas>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ LEGISLATIVO ============ */
function renderLegislativo() {
    const lista = safeArray(RadarData.politicos).filter(p =>
        String(p.cargo || '').toLowerCase().includes('deput') ||
        String(p.cargo || '').toLowerCase().includes('senador') ||
        String(p.cargo || '').toLowerCase().includes('vereador')
    );

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-landmark"></i> LEGISLATIVO</div>
                <h1 class="page-hero-title">Painel do Legislativo</h1>
                <p class="page-hero-subtitle">Vereadores, deputados e senadores monitorados</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="grid grid-4">
                    ${lista.length ? lista.map(p => renderPoliticoCard(p)).join('') : renderEmptyState('Nenhum registro do Legislativo')}
                </div>

                <div class="grid grid-2" style="margin-top:24px">
                    <div class="chart-container">
                        <div class="chart-header"><span class="chart-title">Evolução de Emendas</span></div>
                        <div style="height:260px"><canvas id="chartEvolucaoEmendas"></canvas></div>
                    </div>
                    <div class="chart-container">
                        <div class="chart-header"><span class="chart-title">Top Estados</span></div>
                        <div style="height:260px"><canvas id="chartTopEstados"></canvas></div>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ EXECUTIVO ============ */
function renderExecutivo() {
    const lista = safeArray(RadarData.politicos).filter(p =>
        String(p.cargo || '').toLowerCase().includes('prefeit') ||
        String(p.cargo || '').toLowerCase().includes('governador') ||
        String(p.cargo || '').toLowerCase().includes('presidente')
    );

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-building-columns"></i> EXECUTIVO</div>
                <h1 class="page-hero-title">Painel do Executivo</h1>
                <p class="page-hero-subtitle">Prefeitos, governadores e presidência</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="grid grid-4">
                    ${lista.length ? lista.map(p => renderPoliticoCard(p)).join('') : renderEmptyState('Nenhum registro do Executivo')}
                </div>

                <div class="chart-container" style="margin-top:24px">
                    <div class="chart-header"><span class="chart-title">Execução Orçamentária Federal</span></div>
                    <div style="height:300px"><canvas id="chartExecOrcFed"></canvas></div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ STF ============ */
function renderSTF() {
    const ministros = safeArray(RadarData.stf || RadarData.ministros || []);

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-gavel"></i> STF</div>
                <h1 class="page-hero-title">Judiciário / STF</h1>
                <p class="page-hero-subtitle">Sessões, produtividade e participação</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="grid grid-4">
                    ${ministros.length
                        ? ministros.map(m => `
                            <div class="card">
                                <div style="font-weight:800;margin-bottom:8px">${safeText(m.nome, 'Ministro')}</div>
                                <div style="font-size:13px;color:var(--text-muted)">Sessões: ${safeText(m.sessoes, '-')}</div>
                                <div style="font-size:13px;color:var(--text-muted)">Votos: ${safeText(m.votos, '-')}</div>
                            </div>
                        `).join('')
                        : renderEmptyState('Dados do STF não disponíveis')
                    }
                </div>

                <div class="grid grid-2" style="margin-top:24px">
                    <div class="chart-container">
                        <div class="chart-header"><span class="chart-title">Produtividade</span></div>
                        <div style="height:260px"><canvas id="chartSTFProd"></canvas></div>
                    </div>
                    <div class="chart-container">
                        <div class="chart-header"><span class="chart-title">Participação</span></div>
                        <div style="height:260px"><canvas id="chartSTFPart"></canvas></div>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ METODOLOGIA ============ */
function renderMetodologia() {
    return `
    <section class="section">
        <div class="section-container">
            <div class="section-header">
                <div>
                    <h2 class="section-title"><i class="fas fa-flask"></i> Metodologia</h2>
                    <p class="section-subtitle">Como os dados são organizados e apresentados</p>
                </div>
            </div>

            <div class="card">
                <p>O RADAR PÚBLICO consolida dados públicos de agentes, emendas e execução orçamentária em uma interface única.</p>
                <p>Os indicadores combinam volume de recursos, presença, projetos, execução e cobertura territorial.</p>
                <p>Esta versão usa base demonstrativa para apresentação do sistema.</p>
            </div>
        </div>
    </section>`;
}

/* ============ FONTES ============ */
function renderFontes() {
    return `
    <section class="section">
        <div class="section-container">
            <div class="section-header">
                <div>
                    <h2 class="section-title"><i class="fas fa-database"></i> Fontes dos Dados</h2>
                    <p class="section-subtitle">Principais bases públicas utilizadas</p>
                </div>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <h3 style="margin-bottom:10px">Fontes Institucionais</h3>
                    <ul style="padding-left:18px;line-height:1.8">
                        <li>Portal da Transparência</li>
                        <li>Câmara dos Deputados</li>
                        <li>Senado Federal</li>
                        <li>TSE</li>
                        <li>TransferênciaGov</li>
                    </ul>
                </div>

                <div class="card">
                    <h3 style="margin-bottom:10px">Observações</h3>
                    <p>Os dados exibidos nesta versão podem conter valores simulados para demonstração visual do sistema.</p>
                </div>
            </div>
        </div>
    </section>`;
}
