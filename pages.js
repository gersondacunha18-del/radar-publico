/* ============================================================
   RADAR PÚBLICO — Módulo de Páginas (versão estável)
   ============================================================ */

/* ============ HELPERS ============ */
function safeArray(arr) {
    return Array.isArray(arr) ? arr : [];
}

function getStatusBadge(status) {
    if (!status) return 'badge-gray';
    const s = status.toLowerCase();
    if (s.includes('concl')) return 'badge-green';
    if (s.includes('exec') || s.includes('andamento')) return 'badge-blue';
    if (s.includes('paralis') || s.includes('cancel')) return 'badge-red';
    if (s.includes('empenh') || s.includes('pend')) return 'badge-orange';
    return 'badge-gray';
}

function renderPoliticoCard(p) {
    return `
    <div class="politician-card" onclick="navigateTo('perfil', '${p.id}')">
        <div class="score-badge score-${(p.nota_letra || 'C').toLowerCase()}">${p.nota || '-'}</div>
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

function renderComparadorCard(p, side) {
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
                <div class="info-value">${p.nota || '-'}</div>
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
                <span class="hero-badge">
                    <i class="fas fa-satellite-dish"></i>
                    MONITORAMENTO EM TEMPO REAL
                </span>

                <h1 class="hero-title">
                    Quem está no poder.<br>
                    <span>O que fez. Para onde foi o dinheiro.</span>
                </h1>

                <p class="hero-subtitle">
                    Transparência real sobre políticos, emendas e execução de recursos públicos.
                </p>

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

        <section class="section">
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
                        <div class="module-icon green"><i class="fas fa-building"></i></div>
                        <h3 class="module-title">Executivo</h3>
                        <p class="module-count">Prefeitos · Governadores · Ministros</p>
                    </div>

                    <div class="module-card" onclick="navigateTo('stf')">
                        <div class="module-icon purple"><i class="fas fa-gavel"></i></div>
                        <h3 class="module-title">Judiciário / STF</h3>
                        <p class="module-count">Ministros · Sessões · Indicadores</p>
                    </div>

                    <div class="module-card" onclick="navigateTo('emendas')">
                        <div class="module-icon orange"><i class="fas fa-file-invoice-dollar"></i></div>
                        <h3 class="module-title">Emendas</h3>
                        <p class="module-count">Destino · Execução · Obras</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="section-container">
                <div class="section-header">
                    <div>
                        <h2 class="section-title"><i class="fas fa-users"></i> Políticos em Destaque</h2>
                        <p class="section-subtitle">Maiores destaques por desempenho e recursos</p>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="navigateTo('busca')">Ver todos →</button>
                </div>
                <div class="grid grid-4">
                    ${safeArray(RadarData.politicos).slice(0, 4).map(p => renderPoliticoCard(p)).join('')}
                </div>
            </div>
        </section>

        <section class="section" style="background:var(--primary-light)">
            <div class="section-container">
                <div class="section-header">
                    <div>
                        <h2 class="section-title"><i class="fas fa-chart-line"></i> Execução Orçamentária</h2>
                        <p class="section-subtitle">Histórico e distribuição de recursos</p>
                    </div>
                </div>
                <div class="grid grid-2">
                    <div class="chart-container">
                        <div class="chart-header">
                            <span class="chart-title"><i class="fas fa-chart-bar"></i> Emendas por Ano</span>
                        </div>
                        <div style="height:260px"><canvas id="chartExecucaoGeral"></canvas></div>
                    </div>
                    <div class="chart-container">
                        <div class="chart-header">
                            <span class="chart-title"><i class="fas fa-globe"></i> Investimento por Região</span>
                        </div>
                        <div style="height:260px"><canvas id="chartRegiao"></canvas></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="section-container">
                <div class="section-header">
                    <div>
                        <h2 class="section-title"><i class="fas fa-map-marked-alt"></i> Mapa de Investimentos</h2>
                        <p class="section-subtitle">Distribuição por estado</p>
                    </div>
                </div>
                <div class="map-section">
                    <div class="map-header">
                        <span style="font-weight:700">Investimentos por Estado — 2024</span>
                    </div>
                    <div id="brazilMap"></div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ BUSCA ============ */
function renderBusca(query = '') {
    let resultados = safeArray(RadarData.politicos);

    if (query) {
        const q = query.toLowerCase();
        resultados = resultados.filter(p =>
            (p.nome || '').toLowerCase().includes(q) ||
            (p.cargo || '').toLowerCase().includes(q) ||
            (p.partido || '').toLowerCase().includes(q) ||
            (p.uf || '').toLowerCase().includes(q) ||
            (p.municipio || '').toLowerCase().includes(q)
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
                    </div>
                </div>

                <div id="buscaResultados" class="grid grid-4">
                    ${resultados.length
                        ? resultados.map(p => renderPoliticoCard(p)).join('')
                        : `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">
                            <i class="fas fa-search" style="font-size:48px;display:block;margin-bottom:16px;opacity:0.3"></i>
                            Nenhum resultado encontrado
                           </div>`
                    }
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ PERFIL ============ */
function renderPerfil(politicoId) {
    const p = getPoliticoById(parseInt(politicoId));
    if (!p) {
        return `<div class="section"><div class="section-container"><div class="alert alert-warning"><i class="fas fa-exclamation-circle"></i> Político não encontrado.</div></div></div>`;
    }

    const emendas = typeof getEmendasByAutor === 'function' ? getEmendasByAutor(p.id) : [];

    return `
    <div class="page-transition">
        <div class="profile-hero">
            <div class="profile-container">
                <div class="profile-header">
                    <div class="profile-avatar-large">${p.foto_inicial || '??'}</div>
                    <div class="profile-info">
                        <h1 class="profile-name">${p.nome}</h1>
                        <p class="profile-role">${p.cargo}</p>
                        <div class="profile-meta">
                            <div class="profile-meta-item"><i class="fas fa-map-marker-alt"></i> ${p.municipio || '-'} / ${p.uf || '-'}</div>
                            <div class="profile-meta-item"><i class="fas fa-star"></i> Área: ${p.area_atuacao || '-'}</div>
                        </div>
                    </div>
                    <div class="profile-score">
                        <div class="score-value">${p.nota || '-'}</div>
                        <div class="score-max">Nota geral</div>
                    </div>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="grid grid-2">
                    <div class="card">
                        <h3 class="card-title"><i class="fas fa-user"></i> Perfil</h3>
                        <p style="color:var(--text-secondary)">${p.bio || 'Sem biografia cadastrada.'}</p>
                    </div>
                    <div class="card">
                        <h3 class="card-title"><i class="fas fa-chart-bar"></i> Indicadores</h3>
                        <div class="info-grid">
                            <div class="info-item"><div class="info-label">Nota</div><div class="info-value">${p.nota || '-'}</div></div>
                            <div class="info-item"><div class="info-label">Projetos</div><div class="info-value">${p.projetos ?? '-'}</div></div>
                            <div class="info-item"><div class="info-label">Presença</div><div class="info-value">${p.presenca ?? '-'}%</div></div>
                            <div class="info-item"><div class="info-label">Recursos</div><div class="info-value">${p.valor_total ? formatCurrency(p.valor_total) : '-'}</div></div>
                        </div>
                    </div>
                </div>

                <div class="section-header mt-32">
                    <h2 class="section-title"><i class="fas fa-file-invoice-dollar"></i> Emendas do Perfil</h2>
                </div>

                ${emendas.length ? renderEmendasTabela(emendas) : `<div class="alert alert-info"><i class="fas fa-info-circle"></i> Nenhuma emenda encontrada para este perfil.</div>`}
            </div>
        </section>
    </div>`;
}

/* ============ LEGISLATIVO ============ */
function renderLegislativo() {
    const legislativos = safeArray(RadarData.politicos).filter(p =>
        ['Deputado', 'Senador', 'Vereador'].some(c => (p.cargo || '').includes(c))
    );

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-landmark"></i> PODER LEGISLATIVO</div>
                <h1 class="page-hero-title">Monitoramento Legislativo</h1>
                <p class="page-hero-subtitle">Presença, votações, projetos e emendas</p>
            </div>
        </div>
        <section class="section">
            <div class="section-container">
                <div class="grid grid-4">
                    ${legislativos.map(p => renderPoliticoCard(p)).join('')}
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ EXECUTIVO ============ */
function renderExecutivo() {
    const executivos = safeArray(RadarData.politicos).filter(p =>
        ['Prefeito', 'Governador', 'Presidente', 'Ministro', 'Secretário'].some(c => (p.cargo || '').includes(c))
    );

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-building-columns"></i> PODER EXECUTIVO</div>
                <h1 class="page-hero-title">Monitoramento do Executivo</h1>
                <p class="page-hero-subtitle">Orçamento, execução, programas e convênios</p>
            </div>
        </div>
        <section class="section">
            <div class="section-container">
                <div class="grid grid-4">
                    ${executivos.map(p => renderPoliticoCard(p)).join('')}
                </div>
                <div class="mt-32 chart-container">
                    <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-pie"></i> Execução Orçamentária</span></div>
                    <div style="height:260px"><canvas id="chartExecOrcFed"></canvas></div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ STF ============ */
function renderSTF() {
    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-gavel"></i> SUPREMO TRIBUNAL FEDERAL</div>
                <h1 class="page-hero-title">Painel do Judiciário — STF</h1>
                <p class="page-hero-subtitle">Sessões, participação e produtividade</p>
            </div>
        </div>
        <section class="section">
            <div class="section-container">
                <div class="grid grid-2">
                    <div class="chart-container">
                        <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-bar"></i> Produtividade</span></div>
                        <div style="height:260px"><canvas id="chartSTFProd"></canvas></div>
                    </div>
                    <div class="chart-container">
                        <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-pie"></i> Participação</span></div>
                        <div style="height:260px"><canvas id="chartSTFPart"></canvas></div>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ EMENDAS ============ */
function renderEmendas(ufFiltro = '') {
    let emendas = safeArray(RadarData.emendas);
    if (ufFiltro) emendas = emendas.filter(e => e.estado === ufFiltro);

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-file-invoice-dollar"></i> RASTREAMENTO DE EMENDAS</div>
                <h1 class="page-hero-title">Para onde foi o dinheiro?</h1>
                <p class="page-hero-subtitle">Rastreamento completo das emendas parlamentares</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="filter-bar">
                    <input type="text" id="filtroEmendasTexto" placeholder="Buscar por objeto, município, autor..." style="flex:1;min-width:200px">
                    <select id="filtroEmendasUF">
                        <option value="">Todos os Estados</option>
                        ${safeArray(RadarData.estados).slice(0, 15).map(e => `<option value="${e.uf}" ${ufFiltro === e.uf ? 'selected' : ''}>${e.nome}</option>`).join('')}
                    </select>
                    <button class="btn btn-primary btn-sm" onclick="filtrarEmendas()"><i class="fas fa-filter"></i> Filtrar</button>
                </div>

                <div id="emendasResultados">
                    ${renderEmendasTabela(emendas)}
                </div>
            </div>
        </section>
    </div>`;
}

function renderEmendasTabela(emendas) {
    return `
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>CÓDIGO</th>
                    <th>AUTOR</th>
                    <th>OBJETO</th>
                    <th>MUNICÍPIO</th>
                    <th>VALOR</th>
                    <th>PAGO</th>
                    <th>SITUAÇÃO</th>
                    <th>EXEC.</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${safeArray(emendas).map(e => `
                    <tr>
                        <td><span class="font-mono text-accent" style="font-size:11px">${e.id}</span></td>
                        <td>${e.autor}</td>
                        <td>${e.objeto}</td>
                        <td>${e.municipio} / ${e.estado}</td>
                        <td><span class="font-mono text-accent">${formatCurrency(e.valor_indicado || 0)}</span></td>
                        <td><span class="font-mono text-accent2">${formatCurrency(e.valor_pago || 0)}</span></td>
                        <td><span class="badge ${getStatusBadge(e.situacao)}">${e.situacao || '-'}</span></td>
                        <td>${e.percentual_execucao || 0}%</td>
                        <td><button class="btn btn-ghost btn-sm" onclick="navigateTo('emenda-detalhe', '${e.id}')"><i class="fas fa-eye"></i></button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>`;
}

/* ============ DETALHE EMENDA ============ */
function renderEmendaDetalhe(emendaId) {
    const e = getEmendaById(emendaId);
    if (!e) {
        return `<div class="section"><div class="section-container"><div class="alert alert-warning"><i class="fas fa-exclamation-circle"></i> Emenda não encontrada.</div></div></div>`;
    }

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-file-invoice-dollar"></i> DETALHE DA EMENDA</div>
                <h1 class="page-hero-title">${e.objeto}</h1>
                <p class="page-hero-subtitle">${e.municipio} / ${e.estado}</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="grid grid-4">
                    <div class="stat-card"><div class="stat-card-info"><div class="stat-card-value">${formatCurrency(e.valor_indicado || 0)}</div><div class="stat-card-label">Indicado</div></div></div>
                    <div class="stat-card"><div class="stat-card-info"><div class="stat-card-value">${formatCurrency(e.valor_empenhado || 0)}</div><div class="stat-card-label">Empenhado</div></div></div>
                    <div class="stat-card"><div class="stat-card-info"><div class="stat-card-value">${formatCurrency(e.valor_pago || 0)}</div><div class="stat-card-label">Pago</div></div></div>
                    <div class="stat-card"><div class="stat-card-info"><div class="stat-card-value">${e.percentual_execucao || 0}%</div><div class="stat-card-label">Execução</div></div></div>
                </div>

                <div class="grid grid-2 mt-32">
                    <div class="card">
                        <h3 class="card-title"><i class="fas fa-info-circle"></i> Informações</h3>
                        <div class="info-grid">
                            <div class="info-item"><div class="info-label">Autor</div><div class="info-value">${e.autor}</div></div>
                            <div class="info-item"><div class="info-label">Favorecido</div><div class="info-value">${e.favorecido || '-'}</div></div>
                            <div class="info-item"><div class="info-label">Órgão Executor</div><div class="info-value">${e.orgao_executor || '-'}</div></div>
                            <div class="info-item"><div class="info-label">Situação</div><div class="info-value">${e.situacao || '-'}</div></div>
                        </div>
                    </div>
                    <div class="chart-container">
                        <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-bar"></i> Execução Financeira</span></div>
                        <div style="height:260px"><canvas id="chartEmendaExec"></canvas></div>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ RANKING ============ */
function renderRanking() {
    const sorted = [...safeArray(RadarData.politicos)].sort((a, b) => (b.valor_total || 0) - (a.valor_total || 0));
    const sortedNota = [...safeArray(RadarData.politicos)].sort((a, b) => (b.nota || 0) - (a.nota || 0));

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-trophy"></i> RANKINGS</div>
                <h1 class="page-hero-title">Rankings Nacionais</h1>
                <p class="page-hero-subtitle">Quem destinou mais recursos e quem teve melhor desempenho</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="grid grid-2" style="gap:32px">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-dollar-sign"></i> Mais recursos</h3>
                        </div>
                        ${sorted.map((p, i) => `
                            <div class="ranking-item" onclick="navigateTo('perfil', '${p.id}')">
                                <div class="ranking-position ${i < 3 ? 'pos-' + (i + 1) : 'pos-other'}">${i + 1}º</div>
                                <div class="ranking-info">
                                    <div class="ranking-name">${p.nome}</div>
                                    <div class="ranking-meta">${p.cargo} · ${p.partido}</div>
                                </div>
                                <div class="ranking-value">${formatCurrency(p.valor_total || 0)}<small>destinado</small></div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-star"></i> Melhor nota</h3>
                        </div>
                        ${sortedNota.map((p, i) => `
                            <div class="ranking-item" onclick="navigateTo('perfil', '${p.id}')">
                                <div class="ranking-position ${i < 3 ? 'pos-' + (i + 1) : 'pos-other'}">${i + 1}º</div>
                                <div class="ranking-info">
                                    <div class="ranking-name">${p.nome}</div>
                                    <div class="ranking-meta">${p.cargo} · ${p.partido}</div>
                                </div>
                                <div class="ranking-value">${p.nota || '-'}<small>nota</small></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ COMPARADOR ============ */
function renderComparador() {
    const p1 = safeArray(RadarData.politicos)[0];
    const p2 = safeArray(RadarData.politicos)[1];

    if (!p1 || !p2) {
        return `<div class="section"><div class="section-container"><div class="alert alert-warning"><i class="fas fa-exclamation-circle"></i> Não há dados suficientes para comparar.</div></div></div>`;
    }

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-balance-scale"></i> COMPARADOR</div>
                <h1 class="page-hero-title">Comparação entre agentes públicos</h1>
                <p class="page-hero-subtitle">Veja lado a lado indicadores e desempenho</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="compare-grid" id="compareGrid">
                    ${renderComparadorCard(p1, 'left')}
                    <div class="compare-vs">VS</div>
                    ${renderComparadorCard(p2, 'right')}
                </div>

                <div class="chart-container mt-32">
                    <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-radar"></i> Comparação visual</span></div>
                    <div style="height:320px"><canvas id="chartComparador"></canvas></div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ METODOLOGIA ============ */
function renderMetodologia() {
    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-calculator"></i> METODOLOGIA</div>
                <h1 class="page-hero-title">Como o Radar Público calcula os indicadores</h1>
                <p class="page-hero-subtitle">Critérios de desempenho e fontes usadas na plataforma</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="grid grid-2">
                    <div class="card">
                        <h3 class="card-title"><i class="fas fa-star"></i> Critérios de Nota</h3>
                        <div class="info-grid">
                            <div class="info-item"><div class="info-label">Presença</div><div class="info-value">peso relevante</div></div>
                            <div class="info-item"><div class="info-label">Projetos</div><div class="info-value">produção</div></div>
                            <div class="info-item"><div class="info-label">Transparência</div><div class="info-value">consistência</div></div>
                            <div class="info-item"><div class="info-label">Emendas</div><div class="info-value">volume + execução</div></div>
                        </div>
                    </div>
                    <div class="card">
                        <h3 class="card-title"><i class="fas fa-info-circle"></i> Observação</h3>
                        <p style="color:var(--text-secondary)">
                            Os dados exibidos podem combinar informações públicas oficiais e cálculos próprios da plataforma.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ FONTES ============ */
function renderFontes() {
    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-database"></i> FONTES</div>
                <h1 class="page-hero-title">Fontes dos Dados</h1>
                <p class="page-hero-subtitle">Bases públicas usadas pelo Radar Público</p>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <div class="grid grid-2">
                    <div class="card"><h3 class="card-title"><i class="fas fa-university"></i> Câmara dos Deputados</h3><p>Dados legislativos e parlamentares.</p></div>
                    <div class="card"><h3 class="card-title"><i class="fas fa-landmark"></i> Senado Federal</h3><p>Dados legislativos e senadores.</p></div>
                    <div class="card"><h3 class="card-title"><i class="fas fa-file-invoice-dollar"></i> Portal da Transparência</h3><p>Execução e emendas parlamentares.</p></div>
                    <div class="card"><h3 class="card-title"><i class="fas fa-gavel"></i> STF</h3><p>Informações institucionais e produtividade.</p></div>
                </div>
            </div>
        </section>
    </div>`;
}
/* ============ HELPER: Politician Card ============ */
function renderPoliticoCard(p) {
    return `
    <div class="politician-card" onclick="navigateTo('perfil', '${p.id}')">
        <div class="score-badge score-${p.nota_letra.toLowerCase()}">${p.nota}</div>
        <div class="politician-avatar">${p.foto_inicial}</div>
        <div class="politician-name">${p.nome.split(' ').slice(0, 2).join(' ')}</div>
        <div class="politician-role">${p.cargo}</div>
        <div class="politician-party">${p.partido} · ${p.uf}</div>
        <div class="politician-stats">
            <div class="pol-stat-item">
                <div class="pol-stat-value">${formatCurrency(p.valor_total)}</div>
                <div class="pol-stat-label">Destinado</div>
            </div>
            <div class="pol-stat-item">
                <div class="pol-stat-value">${p.presenca !== null ? p.presenca + '%' : p.projetos}</div>
                <div class="pol-stat-label">${p.presenca !== null ? 'Presença' : 'Programas'}</div>
            </div>
        </div>
    </div>`;
}
