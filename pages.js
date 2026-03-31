/* ============================================================
   RADAR PÚBLICO — Módulo de Páginas (versão estável)
   ============================================================ */

/* ============ HELPERS ============ */
function safeArray(arr) {
    return Array.isArray(arr) ? arr : [];
}

function getStatusBadge(status) {
    if (!status) return 'badge-gray';
    const s = String(status).toLowerCase();
    if (s.includes('concl')) return 'badge-green';
    if (s.includes('exec') || s.includes('andamento')) return 'badge-blue';
    if (s.includes('paralis') || s.includes('cancel')) return 'badge-red';
    if (s.includes('empenh') || s.includes('pend')) return 'badge-orange';
    return 'badge-gray';
}

function renderPoliticoCard(p) {
    return `
    <div class="politician-card" onclick="navigateTo('perfil', '${p.id}')">
        <div class="score-badge score-${(p.nota_letra || 'C').toLowerCase()}">${p.nota ?? '-'}</div>
        <div class="politician-avatar">${p.foto_inicial || '??'}</div>
        <div class="politician-name">${p.nome || 'Sem nome'}</div>
        <div class="politician-role">${p.cargo || 'Cargo não informado'}</div>
        <div class="politician-party">${p.partido || '-'} · ${p.uf || '-'}</div>
        <div class="politician-stats">
            <div class="pol-stat-item">
                <div class="pol-stat-value">${p.valor_total ? formatCurrency(p.valor_total) : '-'}</div>
                <div class="pol-stat-label">Recursos</div>
            </div>
            <div class="pol-stat-item">
                <div class="pol-stat-value">${p.cidades_atendidas ?? '-'}</div>
                <div class="pol-stat-label">Cidades</div>
            </div>
        </div>
    </div>`;
}

function renderComparadorCard(p) {
    return `
    <div class="card">
        <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">
            <div class="politician-avatar" style="margin:0">${p.foto_inicial || '??'}</div>
            <div>
                <div style="font-weight:800">${p.nome}</div>
                <div style="font-size:12px;color:var(--text-muted)">${p.cargo} · ${p.partido} · ${p.uf}</div>
            </div>
        </div>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Nota</div>
                <div class="info-value">${p.nota ?? '-'}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Presença</div>
                <div class="info-value">${p.presenca ?? '-'}%</div>
            </div>
            <div class="info-item">
                <div class="info-label">Projetos</div>
                <div class="info-value">${p.projetos ?? '-'}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Recursos</div>
                <div class="info-value">${p.valor_total ? formatCurrency(p.valor_total) : '-'}</div>
            </div>
        </div>
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
                                        <div style="font-weight:600;font-size:13px">${e.autor.split(' ').slice(0,2).join(' ')}</div>
                                        <div style="font-size:11px;color:var(--text-muted)">${e.partido} · ${e.uf}</div>
                                    </td>
                                    <td style="max-width:200px">
                                        <div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${e.objeto}</div>
                                        <div style="font-size:11px;color:var(--text-muted)">${e.tipo}</div>
                                    </td>
                                    <td><span class="font-mono" style="font-size:12px">${e.municipio} / ${e.estado}</span></td>
                                    <td><span class="font-mono text-accent">${formatCurrency(e.valor_indicado)}</span></td>
                                    <td><span class="font-mono text-accent2">${formatCurrency(e.valor_pago)}</span></td>
                                    <td>
                                        <span class="badge ${getStatusBadge(e.situacao)}">
                                            <span class="status-dot ${e.situacao_cor}"></span>
                                            ${e.situacao}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="progress-bar" style="width:80px">
                                            <div class="progress-fill ${e.percentual_execucao === 100 ? 'success' : e.percentual_execucao < 10 ? 'warning' : ''}" style="width:${e.percentual_execucao}%"></div>
                                        </div>
                                        <span style="font-size:11px;color:var(--text-muted)">${e.percentual_execucao}%</span>
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
    let resultados = RadarData.politicos;
    if (query) {
        const q = query.toLowerCase();
        resultados = RadarData.politicos.filter(p =>
            p.nome.toLowerCase().includes(q) ||
            p.cargo.toLowerCase().includes(q) ||
            p.partido.toLowerCase().includes(q) ||
            p.uf.toLowerCase().includes(q) ||
            p.municipio.toLowerCase().includes(q)
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
                            ${RadarData.estados.slice(0,10).map(e => `<option value="${e.uf}">${e.nome}</option>`).join('')}
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
                        : `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">
                            <i class="fas fa-search" style="font-size:48px;display:block;margin-bottom:16px;opacity:0.3"></i>
                            Nenhum resultado encontrado para "<strong>${query}</strong>"
                           </div>`
                    }
                </div>
            </div>
        </section>
    </div>`;
}
