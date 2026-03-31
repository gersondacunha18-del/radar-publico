/* ============================================================
   RADAR PÚBLICO — Módulo de Páginas
   ============================================================ */

/* ============ HOME ============ */
function renderHome() {
    const stats = RadarData.stats_gerais;

  /* ============ HOME ============ */
function renderHome() {
    const stats = RadarData.stats_gerais;

    return `
    <div class="page-transition">
        <section class="hero">
            <div class="hero-container">
                <span class="badge">📡 MONITORAMENTO EM TEMPO REAL</span>

                <h1 class="hero-title">
                    Quem está no poder.<br>
                    <span>O que fez. Para onde foi o dinheiro.</span>
                </h1>

                <p class="hero-subtitle">
                    Transparência real sobre políticos, emendas e execução de recursos públicos.
                </p>

                <div class="hero-stats">
                    <div class="hero-stat" onclick="navigateTo('busca')">
                        <div class="stat-num">${formatNumber(stats.total_politicos_monitorados)}</div>
                        <div class="stat-label">Agentes Monitorados</div>
                    </div>
                    <div class="hero-stat" onclick="navigateTo('emendas')">
                        <div class="stat-num">${formatNumber(stats.total_emendas_2024)}</div>
                        <div class="stat-label">Emendas em 2024</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${formatCurrency(stats.valor_total_emendas)}</div>
                        <div class="stat-label">Volume Total 2024</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${stats.percentual_execucao}%</div>
                        <div class="stat-label">Taxa de Execução</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${formatNumber(stats.municipios_atendidos)}</div>
                        <div class="stat-label">Municípios Atendidos</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${formatNumber(stats.obras_ativas)}</div>
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
                        <h2 class="section-title">
                            <i class="fas fa-th-large"></i>
                            Módulos da Plataforma
                        </h2>
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
                        <p class="section-subtitle">Maiores destaques por desempenho e volume de recursos</p>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="navigateTo('busca')">Ver todos →</button>
                </div>
                <div class="grid grid-4" id="topPoliticosGrid">
                    ${RadarData.politicos.slice(0, 4).map(p => renderPoliticoCard(p)).join('')}
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
                        <div class="data-source"><i class="fas fa-database"></i> Fonte: Portal da Transparência · Atualizado em ${stats.data_atualizacao}</div>
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
                            ${RadarData.emendas.slice(0, 6).map(e => `
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
                <div class="data-source"><i class="fas fa-database"></i> Fonte: Portal da Transparência, TransferênciaGov · Atualizado em ${stats.data_atualizacao}</div>
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

/* ============ PERFIL DO POLÍTICO ============ */
function renderPerfil(politicoId) {
    const p = getPoliticoById(parseInt(politicoId));
    if (!p) return `<div class="section"><div class="section-container"><p>Político não encontrado.</p></div></div>`;
    const emendas = getEmendasByAutor(p.id);

    return `
    <div class="page-transition">
        <div class="profile-hero">
            <div class="profile-container">
                <div style="margin-bottom:12px">
                    <a href="#" onclick="history.back()" style="font-size:13px;color:var(--text-muted)"><i class="fas fa-arrow-left"></i> Voltar</a>
                </div>
                <div class="profile-header">
                    <div class="profile-avatar-large">${p.foto_inicial}</div>
                    <div class="profile-info">
                        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:4px">
                            <span class="badge badge-blue">${p.partido}</span>
                            <span class="badge badge-gray">${p.mandato}</span>
                            ${p.cargo.includes('Deputado') || p.cargo.includes('Senador') || p.cargo.includes('Vereador') ? 
                                `<span class="badge badge-purple">Legislativo</span>` : 
                                `<span class="badge badge-green">Executivo</span>`}
                        </div>
                        <h1 class="profile-name">${p.nome}</h1>
                        <p class="profile-role">${p.cargo}</p>
                        <div class="profile-meta">
                            <div class="profile-meta-item"><i class="fas fa-map-marker-alt"></i> ${p.municipio} / ${p.uf}</div>
                            ${p.comissoes ? `<div class="profile-meta-item"><i class="fas fa-users"></i> ${p.comissoes.join(', ')}</div>` : ''}
                            <div class="profile-meta-item"><i class="fas fa-star"></i> Área: ${p.area_atuacao}</div>
                        </div>
                    </div>
                    <div class="profile-score">
                        <div style="margin-bottom:8px">
                            <canvas id="profileScoreChart" width="100" height="100"></canvas>
                        </div>
                        <div style="font-size:28px;font-weight:900;color:var(--accent);font-family:'JetBrains Mono',monospace">${p.nota}</div>
                        <div style="font-size:12px;color:var(--text-muted)">Nota de Desempenho</div>
                        <div class="score-badge score-${p.nota_letra.toLowerCase()}" style="position:static;width:auto;height:auto;padding:4px 12px;border-radius:50px;margin-top:6px;display:inline-flex">
                            Nota ${p.nota_letra}
                        </div>
                    </div>
                </div>

                <!-- Stats Rápidas -->
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-top:32px">
                    ${p.presenca !== null ? `
                    <div class="hero-stat">
                        <div class="stat-num">${p.presenca}%</div>
                        <div class="stat-label">Presença</div>
                    </div>` : ''}
                    ${p.votacoes !== null ? `
                    <div class="hero-stat">
                        <div class="stat-num">${formatNumber(p.votacoes)}</div>
                        <div class="stat-label">Votações</div>
                    </div>` : ''}
                    <div class="hero-stat">
                        <div class="stat-num">${p.projetos}</div>
                        <div class="stat-label">${p.tipo_cargo === 'executivo' ? 'Programas' : 'Projetos'}</div>
                    </div>
                    ${p.emendas_total ? `
                    <div class="hero-stat">
                        <div class="stat-num">${p.emendas_total}</div>
                        <div class="stat-label">Emendas</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${formatCurrency(p.valor_total)}</div>
                        <div class="stat-label">Valor Total</div>
                    </div>` : ''}
                    <div class="hero-stat">
                        <div class="stat-num">${p.cidades_atendidas}</div>
                        <div class="stat-label">${p.tipo_cargo === 'executivo' ? 'Municípios' : 'Cidades Atendidas'}</div>
                    </div>
                    ${p.ranking ? `
                    <div class="hero-stat">
                        <div class="stat-num">#${p.ranking}</div>
                        <div class="stat-label">Ranking Nacional</div>
                    </div>` : ''}
                </div>
            </div>
        </div>

        <!-- Conteúdo Principal -->
        <section class="section">
            <div class="section-container">
                <div class="tabs" id="profileTabs">
                    <button class="tab-btn active" onclick="switchTab('perfil-visao')">📊 Visão Geral</button>
                    ${p.emendas_por_ano ? `<button class="tab-btn" onclick="switchTab('perfil-emendas')">💰 Emendas (${emendas.length})</button>` : ''}
                    ${p.presenca !== null ? `<button class="tab-btn" onclick="switchTab('perfil-presenca')">📅 Presença</button>` : ''}
                    ${p.tipo_cargo === 'executivo' ? `<button class="tab-btn" onclick="switchTab('perfil-execucao')">⚙️ Execução</button>` : ''}
                    <button class="tab-btn" onclick="switchTab('perfil-nota')">⭐ Nota e Critérios</button>
                </div>

                <!-- Visão Geral -->
                <div id="perfil-visao" class="tab-content active">
                    <div class="grid grid-2">
                        ${p.emendas_por_ano ? `
                        <div class="chart-container">
                            <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-bar"></i> Emendas por Ano</span></div>
                            <canvas id="chartEmendasAno" height="160"></canvas>
                            <div class="data-source"><i class="fas fa-database"></i> Fonte: Câmara dos Deputados / Senado</div>
                        </div>
                        <div class="chart-container">
                            <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-pie"></i> Recursos por Área</span></div>
                            <canvas id="chartArea" height="160"></canvas>
                            <div class="data-source"><i class="fas fa-database"></i> Fonte: SIOP · ${RadarData.stats_gerais.data_atualizacao}</div>
                        </div>
                        ` : `
                        <div class="chart-container">
                            <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-pie"></i> Orçamento por Área</span></div>
                            <canvas id="chartArea" height="160"></canvas>
                            <div class="data-source"><i class="fas fa-database"></i> Fonte: SIOP</div>
                        </div>
                        <div class="chart-container">
                            <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-bar"></i> Execução Orçamentária</span></div>
                            <canvas id="chartExecOrc" height="160"></canvas>
                            <div class="data-source"><i class="fas fa-database"></i> Fonte: SIOP</div>
                        </div>
                        `}
                    </div>
                    <div class="mt-24">
                        <h3 style="font-size:16px;font-weight:700;margin-bottom:16px"><i class="fas fa-info-circle text-accent"></i> Sobre</h3>
                        <p style="color:var(--text-secondary);line-height:1.8">${p.bio}</p>
                        <div class="data-source mt-16"><i class="fas fa-calendar"></i> Mandato: ${p.mandato} · Última atualização: ${RadarData.stats_gerais.data_atualizacao}</div>
                    </div>
                </div>

                <!-- Emendas -->
                <div id="perfil-emendas" class="tab-content">
                    <div class="section-header">
                        <h3 class="section-title"><i class="fas fa-file-invoice-dollar"></i> Emendas Parlamentares</h3>
                        <span class="badge badge-blue">${formatCurrency(p.valor_total)} total</span>
                    </div>
                    ${emendas.length > 0 ? `
                    <div class="table-wrapper">
                        <table>
                            <thead><tr>
                                <th>CÓDIGO</th><th>OBJETO</th><th>MUNICÍPIO/UF</th>
                                <th>VALOR</th><th>PAGO</th><th>SITUAÇÃO</th><th>EXECUÇÃO</th>
                            </tr></thead>
                            <tbody>
                            ${emendas.map(e => `
                                <tr onclick="navigateTo('emenda-detalhe', '${e.id}')" style="cursor:pointer">
                                    <td><span class="font-mono text-accent" style="font-size:11px">${e.id}</span></td>
                                    <td>
                                        <div style="font-weight:600;font-size:13px">${e.objeto}</div>
                                        <div style="font-size:11px;color:var(--text-muted)">${e.tipo} · ${e.ano}</div>
                                    </td>
                                    <td>${e.municipio} / ${e.estado}</td>
                                    <td><span class="font-mono text-accent">${formatCurrency(e.valor_indicado)}</span></td>
                                    <td><span class="font-mono text-accent2">${formatCurrency(e.valor_pago)}</span></td>
                                    <td><span class="badge ${getStatusBadge(e.situacao)}">${e.situacao}</span></td>
                                    <td>
                                        <div class="progress-bar" style="width:80px">
                                            <div class="progress-fill ${e.percentual_execucao===100?'success':''}" style="width:${e.percentual_execucao}%"></div>
                                        </div>
                                        <span style="font-size:11px;color:var(--text-muted)">${e.percentual_execucao}%</span>
                                    </td>
                                </tr>
                            `).join('')}
                            </tbody>
                        </table>
                    </div>
                    ` : '<div class="alert alert-info"><i class="fas fa-info-circle"></i> Nenhuma emenda encontrada para este político.</div>'}
                    <div class="data-source"><i class="fas fa-database"></i> Fonte: Portal da Transparência · TransferênciaGov</div>
                </div>

                <!-- Presença -->
                <div id="perfil-presenca" class="tab-content">
                    <div class="grid grid-2">
                        <div class="chart-container">
                            <div class="chart-header"><span class="chart-title"><i class="fas fa-calendar-check"></i> Presença por Mês (2024)</span></div>
                            <canvas id="chartPresenca" height="200"></canvas>
                        </div>
                        <div>
                            <div class="card">
                                <h3 style="font-weight:700;margin-bottom:16px">Resumo de Participação</h3>
                                ${p.presenca !== null ? `
                                <div class="info-grid">
                                    <div class="info-item">
                                        <div class="info-label"><i class="fas fa-check-circle"></i> Presença Geral</div>
                                        <div class="info-value text-accent">${p.presenca}%</div>
                                    </div>
                                    ${p.votacoes ? `
                                    <div class="info-item">
                                        <div class="info-label"><i class="fas fa-vote-yea"></i> Votações</div>
                                        <div class="info-value">${formatNumber(p.votacoes)}</div>
                                    </div>
                                    ` : ''}
                                    ${p.projetos ? `
                                    <div class="info-item">
                                        <div class="info-label"><i class="fas fa-file-alt"></i> Projetos</div>
                                        <div class="info-value">${p.projetos}</div>
                                    </div>
                                    ` : ''}
                                    ${p.relatorias ? `
                                    <div class="info-item">
                                        <div class="info-label"><i class="fas fa-pen"></i> Relatorias</div>
                                        <div class="info-value">${p.relatorias}</div>
                                    </div>
                                    ` : ''}
                                </div>` : ''}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Nota -->
                <div id="perfil-nota" class="tab-content">
                    <div class="grid grid-2">
                        <div class="chart-container">
                            <div class="chart-header"><span class="chart-title"><i class="fas fa-radar"></i> Gráfico de Desempenho</span></div>
                            <canvas id="chartNota" height="280"></canvas>
                        </div>
                        <div class="card">
                            <h3 style="font-weight:700;margin-bottom:20px">Critérios de Avaliação</h3>
                            ${Object.entries(p.criterios_nota).map(([key, val]) => `
                                <div style="margin-bottom:16px">
                                    <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                                        <span style="font-size:13px;font-weight:600;text-transform:capitalize">${key}</span>
                                        <span class="font-mono text-accent" style="font-size:13px">${val}/10</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress-fill ${val >= 9 ? 'success' : val >= 7 ? '' : val >= 5 ? 'warning' : 'danger'}" 
                                             style="width:${val * 10}%"></div>
                                    </div>
                                </div>
                            `).join('')}
                            <div class="data-source"><i class="fas fa-calculator"></i> Dado calculado com metodologia própria · <a href="#" onclick="navigateTo('metodologia')">Ver metodologia</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ PAINEL LEGISLATIVO ============ */
function renderLegislativo() {
    const legislativos = RadarData.politicos.filter(p => 
        ['Deputado Federal','Senador','Deputada Estadual','Vereadora'].some(c => p.cargo.includes(c) || p.cargo === c)
    );
    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-landmark"></i> PODER LEGISLATIVO</div>
                <h1 class="page-hero-title">Monitoramento Legislativo</h1>
                <p class="page-hero-subtitle">Vereadores, deputados estaduais/federais e senadores: presença, votações, projetos e emendas</p>
            </div>
        </div>
        <section class="section">
            <div class="section-container">
                <div class="grid grid-4">
                    <div class="stat-card" onclick="navigateTo('busca','vereador')">
                        <div class="stat-card-icon blue"><i class="fas fa-city"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">58.950</div>
                            <div class="stat-card-label">Vereadores</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon green"><i class="fas fa-building"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">1.059</div>
                            <div class="stat-card-label">Deputados Estaduais</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon purple"><i class="fas fa-landmark"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">513</div>
                            <div class="stat-card-label">Deputados Federais</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon orange"><i class="fas fa-crown"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">81</div>
                            <div class="stat-card-label">Senadores</div>
                        </div>
                    </div>
                </div>

                <div class="mt-32 grid grid-2">
                    <div class="chart-container">
                        <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-line"></i> Evolução de Emendas (2020-2025)</span></div>
                        <div style="height:260px"><canvas id="chartEvolucaoEmendas"></canvas></div>
                        <div class="data-source"><i class="fas fa-database"></i> Fonte: Câmara · Senado · Siop</div>
                    </div>
                    <div class="chart-container">
                        <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-bar"></i> Distribuição por Estado (Top 8)</span></div>
                        <div style="height:260px"><canvas id="chartTopEstados"></canvas></div>
                        <div class="data-source"><i class="fas fa-database"></i> Fonte: Portal da Transparência</div>
                    </div>
                </div>

                <div class="section-header mt-32">
                    <h2 class="section-title"><i class="fas fa-users"></i> Parlamentares Monitorados</h2>
                    <button class="btn btn-outline btn-sm" onclick="navigateTo('busca')">Ver todos →</button>
                </div>

                <div class="grid grid-4">
                    ${legislativos.map(p => renderPoliticoCard(p)).join('')}
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ PAINEL EXECUTIVO ============ */
function renderExecutivo() {
    const executivos = RadarData.politicos.filter(p =>
        ['Prefeita','Prefeito','Governador','Presidente','Ministro','Secretário'].some(c => p.cargo.includes(c))
    );
    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-building-columns"></i> PODER EXECUTIVO</div>
                <h1 class="page-hero-title">Monitoramento do Executivo</h1>
                <p class="page-hero-subtitle">Presidente, governadores, prefeitos: orçamento, execução, programas e convênios</p>
            </div>
        </div>
        <section class="section">
            <div class="section-container">
                <div class="grid grid-4">
                    <div class="stat-card">
                        <div class="stat-card-icon blue"><i class="fas fa-flag"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">1</div>
                            <div class="stat-card-label">Presidência</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon green"><i class="fas fa-map"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">27</div>
                            <div class="stat-card-label">Governadores</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon purple"><i class="fas fa-city"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">5.568</div>
                            <div class="stat-card-label">Prefeitos</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon orange"><i class="fas fa-dollar-sign"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">R$ 2,1T</div>
                            <div class="stat-card-label">Orçamento Federal 2024</div>
                        </div>
                    </div>
                </div>

                <div class="mt-32">
                    <div class="section-header">
                        <h2 class="section-title"><i class="fas fa-users-cog"></i> Gestores Municipais</h2>
                    </div>
                    ${executivos.length > 0 ? `
                    <div class="grid grid-4">
                        ${executivos.map(p => renderPoliticoCard(p)).join('')}
                    </div>` : `
                    <div class="alert alert-info"><i class="fas fa-info-circle"></i> Dados de gestores executivos sendo carregados.</div>`}
                </div>

                <div class="mt-32 grid grid-2">
                    <div class="chart-container">
                        <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-bar"></i> Execução Orçamentária 2024</span></div>
                        <div style="height:260px"><canvas id="chartExecOrcFed"></canvas></div>
                        <div class="data-source"><i class="fas fa-database"></i> Fonte: SIOP · SOF/ME</div>
                    </div>
                    <div class="card">
                        <h3 style="font-weight:700;margin-bottom:16px"><i class="fas fa-info-circle text-accent"></i> Como funciona o Executivo</h3>
                        <div class="alert alert-info mb-16"><i class="fas fa-lightbulb"></i> O Poder Executivo é responsável pela administração pública e execução das políticas públicas.</div>
                        <div style="display:flex;flex-direction:column;gap:12px">
                            <div class="info-item">
                                <div class="info-label"><i class="fas fa-university"></i> Orçamento Federal 2024</div>
                                <div class="info-value text-accent">R$ 2,1 trilhões</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label"><i class="fas fa-check-circle"></i> Execução Prevista</div>
                                <div class="info-value text-accent2">87% de execução</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label"><i class="fas fa-handshake"></i> Convênios Ativos</div>
                                <div class="info-value">42.800 convênios</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label"><i class="fas fa-building"></i> Órgãos Federais</div>
                                <div class="info-value">245 ministérios e autarquias</div>
                            </div>
                        </div>
                        <div class="data-source"><i class="fas fa-database"></i> Fonte: SIOP · Transparência Federal</div>
                    </div>
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
                <p class="page-hero-subtitle">Sessões, participação, decisões e indicadores de produtividade dos Ministros</p>
            </div>
        </div>
        <section class="section">
            <div class="section-container">
                <div class="grid grid-4">
                    <div class="stat-card">
                        <div class="stat-card-icon blue"><i class="fas fa-users"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">11</div>
                            <div class="stat-card-label">Ministros</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon green"><i class="fas fa-balance-scale"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">145</div>
                            <div class="stat-card-label">Sessões em 2024</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon purple"><i class="fas fa-file-alt"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">6.180</div>
                            <div class="stat-card-label">Ações Julgadas</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon orange"><i class="fas fa-shield-alt"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">4.314</div>
                            <div class="stat-card-label">HC Julgados</div>
                        </div>
                    </div>
                </div>

                <div class="section-header mt-32">
                    <h2 class="section-title"><i class="fas fa-gavel"></i> Ministros do STF</h2>
                </div>

                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>MINISTRO(A)</th>
                                <th>INDICAÇÃO</th>
                                <th>SESSÕES</th>
                                <th>PARTICIPAÇÃO</th>
                                <th>AÇÕES JULGADAS</th>
                                <th>HC</th>
                                <th>RELATORIAS</th>
                                <th>NOTA</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${RadarData.ministrosSTF.map(m => `
                                <tr>
                                    <td>
                                        <div style="font-weight:700">${m.nome}</div>
                                        <div style="font-size:11px;color:var(--text-muted)">${m.cargo}</div>
                                    </td>
                                    <td style="font-size:12px">${m.indicacao}</td>
                                    <td class="font-mono">${m.sessoes_participou}/${m.sessoes_realizadas}</td>
                                    <td>
                                        <div class="progress-bar" style="width:80px;display:inline-block">
                                            <div class="progress-fill success" style="width:${Math.round(m.sessoes_participou/m.sessoes_realizadas*100)}%"></div>
                                        </div>
                                        <span class="font-mono text-accent2" style="font-size:12px"> ${Math.round(m.sessoes_participou/m.sessoes_realizadas*100)}%</span>
                                    </td>
                                    <td class="font-mono">${formatNumber(m.acoes_julgadas)}</td>
                                    <td class="font-mono">${formatNumber(m.habeas_corpus)}</td>
                                    <td class="font-mono">${m.relatorias}</td>
                                    <td>
                                        <span class="badge ${m.nota >= 8.5 ? 'badge-green' : m.nota >= 7.5 ? 'badge-blue' : 'badge-orange'} font-mono">
                                            ${m.nota}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                <div class="data-source"><i class="fas fa-database"></i> Fonte: STF.jus.br · Relatório Anual 2024</div>

                <div class="grid grid-2 mt-32">
                    <div class="chart-container">
                        <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-bar"></i> Produtividade por Ministro</span></div>
                        <div style="height:280px"><canvas id="chartSTFProd"></canvas></div>
                    </div>
                    <div class="chart-container">
                        <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-pie"></i> Participação em Sessões (%)</span></div>
                        <canvas id="chartSTFPart" height="240"></canvas>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ RASTREAMENTO DE EMENDAS ============ */
function renderEmendas(ufFiltro = '') {
    let emendas = RadarData.emendas;
    if (ufFiltro) emendas = emendas.filter(e => e.estado === ufFiltro);

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-file-invoice-dollar"></i> RASTREAMENTO DE EMENDAS</div>
                <h1 class="page-hero-title">Para onde foi o dinheiro?</h1>
                <p class="page-hero-subtitle">Rastreamento completo de emendas parlamentares: autor, destino, valor empenhado, pago e andamento da execução.</p>
                <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:20px">
                    <div class="hero-stat">
                        <div class="stat-num">${formatNumber(RadarData.stats_gerais.total_emendas_2024)}</div>
                        <div class="stat-label">Emendas 2024</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${formatCurrency(RadarData.stats_gerais.valor_total_emendas)}</div>
                        <div class="stat-label">Valor Total</div>
                    </div>
                    <div class="hero-stat">
                        <div class="stat-num">${RadarData.stats_gerais.percentual_execucao}%</div>
                        <div class="stat-label">Taxa Execução</div>
                    </div>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <!-- Filtros -->
                <div class="filter-bar">
                    <input type="text" id="filtroEmendasTexto" placeholder="Buscar por objeto, município, autor..." style="flex:1;min-width:200px">
                    <select id="filtroEmendasUF">
                        <option value="">Todos os Estados</option>
                        ${RadarData.estados.slice(0,15).map(e => `<option value="${e.uf}" ${ufFiltro === e.uf ? 'selected' : ''}>${e.nome}</option>`).join('')}
                    </select>
                    <select id="filtroEmendasSituacao">
                        <option value="">Todas as Situações</option>
                        <option value="Concluída">Concluída</option>
                        <option value="Em Execução">Em Execução</option>
                        <option value="Paralisada">Paralisada</option>
                        <option value="Empenhada">Empenhada</option>
                    </select>
                    <select id="filtroEmendasAno">
                        <option value="">Todos os Anos</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </select>
                    <button class="btn btn-primary btn-sm" onclick="filtrarEmendas()"><i class="fas fa-filter"></i> Filtrar</button>
                </div>

                <div id="emendasResultados">
                    ${renderEmendasTabela(emendas)}
                </div>

                <div class="data-source"><i class="fas fa-database"></i> Fonte: Portal da Transparência · TransferênciaGov.br · Siop · Última atualização: ${RadarData.stats_gerais.data_atualizacao}</div>
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
                    <th>AUTOR / PARTIDO</th>
                    <th>OBJETO</th>
                    <th>MUNICÍPIO</th>
                    <th>FAVORECIDO</th>
                    <th>V. INDICADO</th>
                    <th>V. PAGO</th>
                    <th>SITUAÇÃO</th>
                    <th>EXECUÇÃO</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${emendas.map(e => `
                    <tr>
                        <td><span class="font-mono text-accent" style="font-size:11px">${e.id}</span></td>
                        <td>
                            <div style="font-weight:600;font-size:13px;cursor:pointer;color:var(--accent)" onclick="navigateTo('perfil', '${e.autor_id}')">${e.autor.split(' ').slice(0,2).join(' ')}</div>
                            <div style="font-size:11px;color:var(--text-muted)">${e.partido} · ${e.uf} · ${e.ano}</div>
                        </td>
                        <td style="max-width:180px">
                            <div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${e.objeto}</div>
                            <div style="font-size:11px;color:var(--text-muted)">${e.tipo}</div>
                        </td>
                        <td>
                            <div style="font-size:12px;font-weight:600">${e.municipio}</div>
                            <div style="font-size:11px;color:var(--text-muted)">${e.estado} · ${e.regiao}</div>
                        </td>
                        <td style="font-size:12px;max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${e.favorecido}</td>
                        <td><span class="font-mono text-accent">${formatCurrency(e.valor_indicado)}</span></td>
                        <td><span class="font-mono text-accent2">${formatCurrency(e.valor_pago)}</span></td>
                        <td>
                            <span class="badge ${getStatusBadge(e.situacao)}">
                                <span class="status-dot ${e.situacao_cor}"></span>${e.situacao}
                            </span>
                        </td>
                        <td>
                            <div style="display:flex;flex-direction:column;gap:4px">
                                <div class="progress-bar" style="width:80px">
                                    <div class="progress-fill ${e.percentual_execucao===100?'success':e.percentual_execucao===0?'danger':''}" style="width:${e.percentual_execucao}%"></div>
                                </div>
                                <span class="font-mono" style="font-size:11px;color:var(--text-muted)">${e.percentual_execucao}%</span>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-ghost btn-sm" onclick="navigateTo('emenda-detalhe', '${e.id}')">
                                <i class="fas fa-eye"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
        <span style="font-size:13px;color:var(--text-muted)">${emendas.length} registro(s) encontrado(s)</span>
    </div>`;
}

/* ============ DETALHE DA EMENDA ============ */
function renderEmendaDetalhe(emendaId) {
    const e = getEmendaById(emendaId);
    if (!e) return `<div class="section"><div class="section-container"><p>Emenda não encontrada.</p></div></div>`;
    const autor = getPoliticoById(e.autor_id);

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div style="margin-bottom:12px">
                    <a href="#" onclick="navigateTo('emendas')" style="font-size:13px;color:var(--text-muted)"><i class="fas fa-arrow-left"></i> Voltar para Emendas</a>
                </div>
                <div class="page-hero-label"><i class="fas fa-file-invoice-dollar"></i> DETALHE DA EMENDA</div>
                <h1 class="page-hero-title">${e.objeto}</h1>
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
                    <span class="badge badge-blue">${e.id}</span>
                    <span class="badge badge-purple">${e.tipo}</span>
                    <span class="badge ${getStatusBadge(e.situacao)}"><span class="status-dot ${e.situacao_cor}"></span>${e.situacao}</span>
                    <span class="badge badge-gray">${e.ano}</span>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="section-container">
                <!-- Valores em destaque -->
                <div class="grid grid-4 mb-24">
                    <div class="stat-card">
                        <div class="stat-card-icon purple"><i class="fas fa-file-alt"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">${formatCurrency(e.valor_indicado)}</div>
                            <div class="stat-card-label">Valor Indicado</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon blue"><i class="fas fa-stamp"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">${formatCurrency(e.valor_empenhado)}</div>
                            <div class="stat-card-label">Valor Empenhado</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon green"><i class="fas fa-money-check-alt"></i></div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">${formatCurrency(e.valor_pago)}</div>
                            <div class="stat-card-label">Valor Pago</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-card-icon ${e.percentual_execucao === 100 ? 'green' : e.percentual_execucao === 0 ? 'red' : 'orange'}">
                            <i class="fas fa-tasks"></i>
                        </div>
                        <div class="stat-card-info">
                            <div class="stat-card-value">${e.percentual_execucao}%</div>
                            <div class="stat-card-label">Execução</div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-2">
                    <!-- Informações -->
                    <div>
                        <div class="card mb-16">
                            <h3 class="card-title" style="margin-bottom:16px"><i class="fas fa-user-tie"></i> Autoria</h3>
                            <div onclick="navigateTo('perfil','${e.autor_id}')" style="display:flex;align-items:center;gap:12px;cursor:pointer;padding:12px;background:var(--glass);border:1px solid var(--border);border-radius:var(--radius);transition:all 0.2s" onmouseenter="this.style.borderColor='var(--accent)'" onmouseleave="this.style.borderColor='var(--border)'">
                                <div style="width:48px;height:48px;border-radius:50%;background:var(--gradient-accent);display:flex;align-items:center;justify-content:center;font-weight:800;color:var(--primary)">${autor ? autor.foto_inicial : '??'}</div>
                                <div>
                                    <div style="font-weight:700">${e.autor}</div>
                                    <div style="font-size:12px;color:var(--text-muted)">${e.partido} · ${e.uf} · ${autor ? autor.cargo : ''}</div>
                                </div>
                                <i class="fas fa-arrow-right text-accent" style="margin-left:auto"></i>
                            </div>
                        </div>

                        <div class="card">
                            <h3 class="card-title" style="margin-bottom:16px"><i class="fas fa-info-circle"></i> Detalhes da Emenda</h3>
                            <div class="info-grid">
                                <div class="info-item"><div class="info-label"><i class="fas fa-code"></i> Código</div><div class="info-value font-mono text-accent">${e.id}</div></div>
                                <div class="info-item"><div class="info-label"><i class="fas fa-tag"></i> Tipo</div><div class="info-value">${e.tipo}</div></div>
                                <div class="info-item"><div class="info-label"><i class="fas fa-calendar"></i> Ano</div><div class="info-value">${e.ano}</div></div>
                                <div class="info-item"><div class="info-label"><i class="fas fa-map-marker-alt"></i> Município</div><div class="info-value">${e.municipio} / ${e.estado}</div></div>
                                <div class="info-item"><div class="info-label"><i class="fas fa-globe-americas"></i> Região</div><div class="info-value">${e.regiao}</div></div>
                                <div class="info-item"><div class="info-label"><i class="fas fa-user"></i> Favorecido</div><div class="info-value">${e.favorecido}</div></div>
                                <div class="info-item"><div class="info-label"><i class="fas fa-university"></i> Órgão</div><div class="info-value">${e.orgao_vinculado}</div></div>
                                <div class="info-item"><div class="info-label"><i class="fas fa-file-contract"></i> Instrumento</div><div class="info-value" style="font-size:12px">${e.instrumento}</div></div>
                                <div class="info-item"><div class="info-label"><i class="fas fa-cog"></i> Órgão Executor</div><div class="info-value">${e.orgao_executor}</div></div>
                                ${e.empresa_executora !== 'Não definida' && e.empresa_executora !== 'A definir - licitação em andamento' ? `
                                <div class="info-item"><div class="info-label"><i class="fas fa-building"></i> Empresa Exec.</div><div class="info-value">${e.empresa_executora}</div></div>
                                <div class="info-item"><div class="info-label"><i class="fas fa-id-card"></i> CNPJ</div><div class="info-value font-mono">${e.cnpj_empresa}</div></div>
                                ` : ''}
                            </div>
                        </div>
                    </div>

                    <!-- Gráfico + Timeline -->
                    <div>
                        <div class="chart-container mb-16">
                            <div class="chart-header"><span class="chart-title"><i class="fas fa-chart-bar"></i> Execução Financeira</span></div>
                            <canvas id="chartEmendaExec" height="180"></canvas>
                        </div>

                        <div class="card">
                            <h3 class="card-title" style="margin-bottom:20px"><i class="fas fa-stream"></i> Linha do Tempo</h3>
                            <div class="emenda-timeline">
                                ${e.timeline.map(t => `
                                    <div class="timeline-item ${t.tipo}">
                                        <div class="timeline-date">${t.data}</div>
                                        <div class="timeline-title">${t.evento}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        ${e.status_execucao ? `
                        <div class="alert ${e.percentual_execucao===100?'alert-success':e.percentual_execucao===0&&e.situacao==='Paralisada'?'alert-danger':'alert-info'} mt-16">
                            <i class="fas ${e.percentual_execucao===100?'fa-check-circle':e.situacao==='Paralisada'?'fa-exclamation-triangle':'fa-info-circle'}"></i>
                            <div>
                                <strong>Status atual:</strong> ${e.status_execucao}
                                ${e.data_inicio ? `<br><span style="font-size:12px">Início: ${e.data_inicio} · Previsão: ${e.data_prevista}</span>` : ''}
                            </div>
                        </div>` : ''}
                    </div>
                </div>

                <div class="data-source"><i class="fas fa-database"></i> Fonte: Portal da Transparência · TransferênciaGov · Dado oficial · Atualizado em ${RadarData.stats_gerais.data_atualizacao}</div>
            </div>
        </section>
    </div>`;
}

/* ============ RANKING ============ */
function renderRanking() {
    const sorted = [...RadarData.politicos].sort((a, b) => b.valor_total - a.valor_total);
    const sortedNota = [...RadarData.politicos].sort((a, b) => b.nota - a.nota);
    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-trophy"></i> RANKINGS</div>
                <h1 class="page-hero-title">Rankings Nacionais</h1>
                <p class="page-hero-subtitle">Quem destinou mais recursos. Quem teve melhor desempenho. Quais cidades e estados mais receberam.</p>
            </div>
        </div>
        <section class="section">
            <div class="section-container">
                <div class="grid grid-2" style="gap:32px">
                    <!-- Ranking de Recursos -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-dollar-sign"></i> Políticos que mais destinaram</h3>
                            <span class="badge badge-blue">por volume</span>
                        </div>
                        <div>
                            ${sorted.map((p, i) => `
                                <div class="ranking-item" onclick="navigateTo('perfil', '${p.id}')">
                                    <div class="ranking-position ${i < 3 ? 'pos-' + (i + 1) : 'pos-other'}">${i + 1}º</div>
                                    <div style="width:40px;height:40px;border-radius:50%;background:var(--gradient-accent);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:var(--primary);flex-shrink:0">${p.foto_inicial}</div>
                                    <div class="ranking-info">
                                        <div class="ranking-name">${p.nome.split(' ').slice(0,2).join(' ')}</div>
                                        <div class="ranking-meta">${p.cargo} · ${p.partido} · ${p.uf}</div>
                                    </div>
                                    <div class="ranking-value">${formatCurrency(p.valor_total)}<small>destinado</small></div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="data-source"><i class="fas fa-database"></i> Fonte: Portal da Transparência</div>
                    </div>

                    <!-- Ranking por Nota -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-star"></i> Melhor desempenho</h3>
                            <span class="badge badge-green">por nota</span>
                        </div>
                        <div>
                            ${sortedNota.map((p, i) => `
                                <div class="ranking-item" onclick="navigateTo('perfil', '${p.id}')">
                                    <div class="ranking-position ${i < 3 ? 'pos-' + (i + 1) : 'pos-other'}">${i + 1}º</div>
                                    <div style="width:40px;height:40px;border-radius:50%;background:var(--gradient-accent);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:var(--primary);flex-shrink:0">${p.foto_inicial}</div>
                                    <div class="ranking-info">
                                        <div class="ranking-name">${p.nome.split(' ').slice(0,2).join(' ')}</div>
                                        <div class="ranking-meta">${p.cargo} · ${p.partido}</div>
                                    </div>
                                    <div class="ranking-value">
                                        <span class="score-badge score-${p.nota_letra.toLowerCase()}" style="position:static;width:auto;height:auto;padding:4px 10px;border-radius:50px;display:inline-flex">${p.nota}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="data-source"><i class="fas fa-calculator"></i> Dado calculado · <a href="#" onclick="navigateTo('metodologia')">Ver metodologia</a></div>
                    </div>

                    <!-- Ranking Cidades -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-city"></i> Cidades mais beneficiadas</h3>
                            <span class="badge badge-purple">2024</span>
                        </div>
                        <div>
                            ${RadarData.cidades_top.map((c, i) => `
                                <div class="ranking-item">
                                    <div class="ranking-position ${i < 3 ? 'pos-' + (i + 1) : 'pos-other'}">${i + 1}º</div>
                                    <div class="ranking-info">
                                        <div class="ranking-name">${c.nome} / ${c.uf}</div>
                                        <div class="ranking-meta">${c.populacao} habitantes · ${c.emendas} emendas</div>
                                    </div>
                                    <div class="ranking-value">${formatCurrency(c.valor)}<small>recebido</small></div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="data-source"><i class="fas fa-database"></i> Fonte: Portal da Transparência</div>
                    </div>

                    <!-- Ranking Estados -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"><i class="fas fa-map"></i> Estados com mais investimento</h3>
                            <span class="badge badge-orange">por volume</span>
                        </div>
                        <div>
                            ${RadarData.estados.slice(0, 8).map((e, i) => `
                                <div class="ranking-item">
                                    <div class="ranking-position ${i < 3 ? 'pos-' + (i + 1) : 'pos-other'}">${i + 1}º</div>
                                    <div class="ranking-info">
                                        <div class="ranking-name">${e.nome} <span class="badge badge-gray" style="font-size:10px">${e.uf}</span></div>
                                        <div class="ranking-meta">${e.regiao} · ${formatNumber(e.emendas_count)} emendas</div>
                                    </div>
                                    <div class="ranking-value">${formatCurrency(e.valor_recebido)}<small>recebido</small></div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="data-source"><i class="fas fa-database"></i> Fonte: Portal da Transparência</div>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ COMPARADOR ============ */
function renderComparador(p1id = 1, p2id = 2) {
    const p1 = getPoliticoById(parseInt(p1id)) || RadarData.politicos[0];
    const p2 = getPoliticoById(parseInt(p2id)) || RadarData.politicos[1];

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-balance-scale"></i> COMPARADOR</div>
                <h1 class="page-hero-title">Compare Políticos</h1>
                <p class="page-hero-subtitle">Análise lado a lado de desempenho, emendas e atuação parlamentar</p>
            </div>
        </div>
        <section class="section">
            <div class="section-container">
                <!-- Seleção -->
                <div class="filter-bar mb-24" style="justify-content:center">
                    <select id="comparadorPol1" onchange="atualizarComparador()">
                        ${RadarData.politicos.map(p => `<option value="${p.id}" ${p.id === p1.id ? 'selected' : ''}>${p.nome.split(' ').slice(0,2).join(' ')} (${p.partido})</option>`).join('')}
                    </select>
                    <div style="font-size:16px;font-weight:900;color:var(--accent);padding:0 8px">VS</div>
                    <select id="comparadorPol2" onchange="atualizarComparador()">
                        ${RadarData.politicos.map(p => `<option value="${p.id}" ${p.id === p2.id ? 'selected' : ''}>${p.nome.split(' ').slice(0,2).join(' ')} (${p.partido})</option>`).join('')}
                    </select>
                </div>

                <!-- Cards de Comparação -->
                <div class="compare-grid" id="compareGrid">
                    ${renderComparadorCard(p1, 'left')}
                    <div class="compare-vs">VS</div>
                    ${renderComparadorCard(p2, 'right')}
                </div>

                <!-- Gráfico Comparativo -->
                <div class="chart-container mt-32">
                    <div class="chart-header">
                        <span class="chart-title"><i class="fas fa-chart-radar"></i> Comparação de Desempenho</span>
                    </div>
                    <canvas id="chartComparador" height="280"></canvas>
                </div>

                <!-- Tabela Comparativa -->
                <div class="card mt-32">
                    <h3 class="card-title" style="margin-bottom:20px"><i class="fas fa-table"></i> Comparativo de Indicadores</h3>
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>INDICADOR</th>
                                    <th>${p1.nome.split(' ').slice(0,2).join(' ')}</th>
                                    <th>${p2.nome.split(' ').slice(0,2).join(' ')}</th>
                                    <th>VANTAGEM</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${renderComparadorLinhas(p1, p2)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

function renderComparadorCard(p, side) {
    return `
    <div class="card" style="text-align:center;cursor:pointer" onclick="navigateTo('perfil','${p.id}')">
        <div style="width:80px;height:80px;border-radius:50%;background:var(--gradient-accent);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:900;color:var(--primary);margin:0 auto 16px;border:3px solid var(--accent)">${p.foto_inicial}</div>
        <h3 style="font-size:18px;font-weight:800;margin-bottom:4px">${p.nome.split(' ').slice(0,2).join(' ')}</h3>
        <p style="color:var(--accent);font-size:13px;font-weight:600;margin-bottom:4px">${p.cargo}</p>
        <p style="color:var(--text-muted);font-size:12px;margin-bottom:16px">${p.partido} · ${p.uf}</p>
        <div class="score-badge score-${p.nota_letra.toLowerCase()}" style="position:static;width:auto;height:auto;padding:6px 16px;border-radius:50px;display:inline-flex;font-size:18px;margin-bottom:16px">
            ${p.nota} <small style="font-size:12px;margin-left:4px">Nota ${p.nota_letra}</small>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            <div style="background:var(--glass);border:1px solid var(--border-light);padding:10px;border-radius:8px">
                <div class="font-mono text-accent" style="font-size:16px;font-weight:800">${formatCurrency(p.valor_total)}</div>
                <div style="font-size:11px;color:var(--text-muted)">Total destinado</div>
            </div>
            <div style="background:var(--glass);border:1px solid var(--border-light);padding:10px;border-radius:8px">
                <div class="font-mono" style="font-size:16px;font-weight:800">${p.presenca !== null ? p.presenca + '%' : p.projetos}</div>
                <div style="font-size:11px;color:var(--text-muted)">${p.presenca !== null ? 'Presença' : 'Programas'}</div>
            </div>
        </div>
    </div>`;
}

function renderComparadorLinhas(p1, p2) {
    const linhas = [
        { label: 'Nota Geral', v1: p1.nota, v2: p2.nota, tipo: 'numero' },
        { label: 'Valor Total Destinado', v1: formatCurrency(p1.valor_total), v2: formatCurrency(p2.valor_total), tipo: 'texto', num1: p1.valor_total, num2: p2.valor_total },
        { label: 'Presença', v1: p1.presenca ? p1.presenca + '%' : '—', v2: p2.presenca ? p2.presenca + '%' : '—', tipo: 'texto', num1: p1.presenca, num2: p2.presenca },
        { label: 'Projetos/Programas', v1: p1.projetos, v2: p2.projetos, tipo: 'numero' },
        { label: 'Emendas', v1: p1.emendas_total || '—', v2: p2.emendas_total || '—', tipo: 'numero' },
        { label: 'Cidades Atendidas', v1: p1.cidades_atendidas, v2: p2.cidades_atendidas, tipo: 'numero' },
        { label: 'Ranking', v1: p1.ranking ? '#' + p1.ranking : '—', v2: p2.ranking ? '#' + p2.ranking : '—', tipo: 'texto', num1: p1.ranking, num2: p2.ranking, inverso: true }
    ];
    return linhas.map(l => {
        const num1 = l.tipo === 'numero' ? l.v1 : (l.num1 || 0);
        const num2 = l.tipo === 'numero' ? l.v2 : (l.num2 || 0);
        const vantagem = l.inverso ? (num1 < num2 ? 'p1' : num1 > num2 ? 'p2' : 'empate') :
                                     (num1 > num2 ? 'p1' : num1 < num2 ? 'p2' : 'empate');
        return `
        <tr>
            <td style="font-weight:600">${l.label}</td>
            <td class="font-mono" style="color:${vantagem==='p1'?'var(--accent2)':'var(--text-secondary)'}">
                ${vantagem==='p1' ? '<i class="fas fa-trophy" style="color:#ffd700;margin-right:4px"></i>' : ''} ${l.v1}
            </td>
            <td class="font-mono" style="color:${vantagem==='p2'?'var(--accent2)':'var(--text-secondary)'}">
                ${vantagem==='p2' ? '<i class="fas fa-trophy" style="color:#ffd700;margin-right:4px"></i>' : ''} ${l.v2}
            </td>
            <td>
                <span class="badge ${vantagem==='empate'?'badge-gray':vantagem==='p1'?'badge-blue':'badge-green'}">
                    ${vantagem==='empate' ? 'Empate' : vantagem==='p1' ? p1.nome.split(' ')[0] : p2.nome.split(' ')[0]}
                </span>
            </td>
        </tr>`;
    }).join('');
}

/* ============ METODOLOGIA ============ */
function renderMetodologia() {
    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-calculator"></i> METODOLOGIA</div>
                <h1 class="page-hero-title">Como Calculamos as Notas</h1>
                <p class="page-hero-subtitle">Transparência total sobre os critérios e pesos utilizados no índice de desempenho</p>
            </div>
        </div>
        <section class="section">
            <div class="section-container">
                <div class="alert alert-info mb-24">
                    <i class="fas fa-info-circle"></i>
                    <div>
                        <strong>Importante:</strong> Os dados exibidos nesta plataforma são <strong>simulados para fins demonstrativos</strong>. 
                        Em produção, todos os dados serão obtidos das fontes oficiais listadas na seção "Fontes dos Dados".
                    </div>
                </div>

                <div class="grid grid-2" style="gap:32px">
                    <div class="card">
                        <h3 class="card-title" style="margin-bottom:20px"><i class="fas fa-landmark"></i> Índice Legislativo</h3>
                        <div style="display:flex;flex-direction:column;gap:12px">
                            ${[
                                { criterio: 'Presença em Sessões', peso: '25%', desc: 'Percentual de sessões em que o parlamentar esteve presente.' },
                                { criterio: 'Participação em Votações', peso: '20%', desc: 'Porcentagem de votações nominais em que participou.' },
                                { criterio: 'Produção Legislativa', peso: '25%', desc: 'Projetos apresentados, relatados e aprovados.' },
                                { criterio: 'Emendas Parlamentares', peso: '20%', desc: 'Volume e taxa de execução das emendas.' },
                                { criterio: 'Transparência', peso: '10%', desc: 'Prestação de contas e declaração de bens.' }
                            ].map(c => `
                            <div style="background:var(--glass);border:1px solid var(--border-light);border-radius:var(--radius);padding:14px">
                                <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                                    <span style="font-weight:700;font-size:13px">${c.criterio}</span>
                                    <span class="badge badge-blue">${c.peso}</span>
                                </div>
                                <p style="font-size:12px;color:var(--text-muted)">${c.desc}</p>
                            </div>`).join('')}
                        </div>
                    </div>

                    <div class="card">
                        <h3 class="card-title" style="margin-bottom:20px"><i class="fas fa-building-columns"></i> Índice Executivo</h3>
                        <div style="display:flex;flex-direction:column;gap:12px">
                            ${[
                                { criterio: 'Execução Orçamentária', peso: '30%', desc: 'Percentual do orçamento efetivamente executado.' },
                                { criterio: 'Programas Realizados', peso: '25%', desc: 'Quantidade e qualidade dos programas implementados.' },
                                { criterio: 'Eficiência da Gestão', peso: '25%', desc: 'Relação custo-benefício das políticas públicas.' },
                                { criterio: 'Transparência e Prestação de Contas', peso: '20%', desc: 'Publicação de dados e resposta a pedidos via LAI.' }
                            ].map(c => `
                            <div style="background:var(--glass);border:1px solid var(--border-light);border-radius:var(--radius);padding:14px">
                                <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                                    <span style="font-weight:700;font-size:13px">${c.criterio}</span>
                                    <span class="badge badge-green">${c.peso}</span>
                                </div>
                                <p style="font-size:12px;color:var(--text-muted)">${c.desc}</p>
                            </div>`).join('')}
                        </div>
                    </div>

                    <div class="card">
                        <h3 class="card-title" style="margin-bottom:20px"><i class="fas fa-gavel"></i> Índice STF</h3>
                        <div style="display:flex;flex-direction:column;gap:12px">
                            ${[
                                { criterio: 'Participação em Sessões', peso: '30%', desc: 'Presença e participação ativa nas sessões plenárias.' },
                                { criterio: 'Produtividade', peso: '35%', desc: 'Volume de processos julgados e relatados.' },
                                { criterio: 'Indicadores Institucionais', peso: '35%', desc: 'Votos vencedores, decisões monocráticas e colegiadas.' }
                            ].map(c => `
                            <div style="background:var(--glass);border:1px solid var(--border-light);border-radius:var(--radius);padding:14px">
                                <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                                    <span style="font-weight:700;font-size:13px">${c.criterio}</span>
                                    <span class="badge badge-purple">${c.peso}</span>
                                </div>
                                <p style="font-size:12px;color:var(--text-muted)">${c.desc}</p>
                            </div>`).join('')}
                        </div>
                    </div>

                    <div class="card">
                        <h3 class="card-title" style="margin-bottom:20px"><i class="fas fa-graduation-cap"></i> Escala de Notas</h3>
                        <div style="display:flex;flex-direction:column;gap:10px">
                            ${[
                                { letra: 'A', faixa: '9,0 – 10,0', cor: 'success', desc: 'Desempenho excelente' },
                                { letra: 'B', faixa: '7,5 – 8,9', cor: 'accent', desc: 'Bom desempenho' },
                                { letra: 'C', faixa: '6,0 – 7,4', cor: 'warning', desc: 'Desempenho regular' },
                                { letra: 'D', faixa: '0 – 5,9', cor: 'danger', desc: 'Desempenho abaixo do esperado' }
                            ].map(n => `
                            <div style="display:flex;align-items:center;gap:16px;padding:12px;background:var(--glass);border-radius:var(--radius)">
                                <div style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;background:rgba(var(--${n.cor}-rgb,0,0,0),0.1);border:2px solid var(--${n.cor})">
                                    ${n.letra}
                                </div>
                                <div>
                                    <div style="font-weight:700">${n.faixa}</div>
                                    <div style="font-size:12px;color:var(--text-muted)">${n.desc}</div>
                                </div>
                            </div>`).join('')}
                        </div>
                        <div class="data-source mt-16"><i class="fas fa-calculator"></i> Metodologia própria com base em dados públicos oficiais</div>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

/* ============ FONTES DOS DADOS ============ */
function renderFontes() {
    const fontes = [
        { nome: "Portal da Transparência", url: "transparencia.gov.br", icon: "fa-database", desc: "Emendas, convênios, contratos e transferências do Governo Federal", tags: ["Emendas", "Contratos", "Transferências"] },
        { nome: "TransferênciaGov", url: "transferegov.sistemas.gov.br", icon: "fa-exchange-alt", desc: "Plataforma de gestão de transferências da União para estados e municípios", tags: ["Convênios", "Execução"] },
        { nome: "Câmara dos Deputados", url: "camara.leg.br", icon: "fa-landmark", desc: "Dados de votações, projetos, presenças e emendas de deputados federais", tags: ["Votações", "Projetos", "Presenças"] },
        { nome: "Senado Federal", url: "senado.leg.br", icon: "fa-crown", desc: "Dados de votações, projetos, presenças e emendas de senadores", tags: ["Votações", "Senadores"] },
        { nome: "SIOP / SOF", url: "siop.planejamento.gov.br", icon: "fa-chart-bar", desc: "Sistema Integrado de Planejamento e Orçamento da União", tags: ["Orçamento", "Execução"] },
        { nome: "TSE - Tribunal Superior Electoral", url: "tse.jus.br", icon: "fa-vote-yea", desc: "Dados eleitorais, candidaturas e prestação de contas de campanhas", tags: ["Eleições", "Partidos"] },
        { nome: "STF", url: "stf.jus.br", icon: "fa-gavel", desc: "Dados de sessões, julgamentos, relatorias e produtividade dos ministros", tags: ["STF", "Judiciário"] },
        { nome: "IBGE", url: "ibge.gov.br", icon: "fa-map", desc: "Dados demográficos e socioeconômicos dos municípios brasileiros", tags: ["Municípios", "Dados"] },
        { nome: "Diário Oficial da União", url: "in.gov.br", icon: "fa-newspaper", desc: "Publicações oficiais de atos administrativos do Governo Federal", tags: ["Atos Oficiais"] },
        { nome: "LAI - Lei de Acesso à Informação", url: "gov.br/acessoainformacao", icon: "fa-lock-open", desc: "Plataforma de pedidos de acesso à informação pública", tags: ["Transparência"] }
    ];

    return `
    <div class="page-transition">
        <div class="page-hero">
            <div class="page-hero-container">
                <div class="page-hero-label"><i class="fas fa-database"></i> FONTES DOS DADOS</div>
                <h1 class="page-hero-title">Transparência nas Fontes</h1>
                <p class="page-hero-subtitle">Todos os dados utilizados têm origem em fontes oficiais do Governo Federal</p>
            </div>
        </div>
        <section class="section">
            <div class="section-container">
                <div class="alert alert-success mb-24">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <strong>Compromisso com a transparência:</strong> O RADAR PÚBLICO sempre indica a fonte de cada dado exibido. 
                        Dados calculados (como notas e rankings) são claramente identificados como "Cálculo próprio".
                    </div>
                </div>

                <div class="grid grid-2" style="gap:20px">
                    ${fontes.map(f => `
                    <div class="card">
                        <div style="display:flex;gap:16px;align-items:flex-start">
                            <div style="width:48px;height:48px;border-radius:12px;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--accent);flex-shrink:0">
                                <i class="fas ${f.icon}"></i>
                            </div>
                            <div style="flex:1">
                                <h3 style="font-size:15px;font-weight:700;margin-bottom:4px">${f.nome}</h3>
                                <a href="https://${f.url}" target="_blank" style="font-size:11px;color:var(--accent);font-family:monospace">${f.url} <i class="fas fa-external-link-alt" style="font-size:10px"></i></a>
                                <p style="font-size:12px;color:var(--text-secondary);margin-top:8px;line-height:1.6">${f.desc}</p>
                                <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px">
                                    ${f.tags.map(t => `<span class="badge badge-gray">${t}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>`).join('')}
                </div>

                <div class="card mt-32" style="text-align:center">
                    <h3 style="font-size:18px;font-weight:800;margin-bottom:12px">
                        <i class="fas fa-shield-alt text-accent"></i> Dados Simulados
                    </h3>
                    <p style="color:var(--text-secondary);max-width:600px;margin:0 auto;line-height:1.8">
                        Esta versão da plataforma utiliza <strong>dados simulados</strong> para demonstração. 
                        Em produção, os dados serão obtidos diretamente das APIs e portais oficiais listados acima, 
                        garantindo total fidedignidade e rastreabilidade das informações.
                    </p>
                    <div class="data-source" style="justify-content:center;margin-top:16px">
                        <i class="fas fa-calendar"></i> Última atualização real seria em: ${RadarData.stats_gerais.data_atualizacao}
                    </div>
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
