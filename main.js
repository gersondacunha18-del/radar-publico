/* ============================================================
   RADAR PÚBLICO — JavaScript Principal
   Roteamento, Navegação, Interatividade
   ============================================================ */

/* ============ ESTADO DA APLICAÇÃO ============ */
const AppState = {
    currentPage: 'home',
    currentParams: null,
    favorites: JSON.parse(localStorage.getItem('radarFavoritos') || '[]'),
    searchHistory: []
};

/* ============ HELPERS ============ */
function safeList(value) {
    return Array.isArray(value) ? value : [];
}

function safeString(value) {
    return String(value ?? '').trim();
}

function decodeParam(value) {
    try {
        return value ? decodeURIComponent(value) : null;
    } catch {
        return value || null;
    }
}

function encodeParam(value) {
    return encodeURIComponent(String(value ?? ''));
}

/* ============ ROTEADOR ============ */
function navigateTo(page, params = null, updateHash = true) {
    const targetPage = safeString(page) || 'home';
    const targetParams = params ?? null;

    AppState.currentPage = targetPage;
    AppState.currentParams = targetParams;

    if (updateHash) {
        const newHash = targetParams !== null && targetParams !== ''
            ? `#${targetPage}/${encodeParam(targetParams)}`
            : `#${targetPage}`;

        if (window.location.hash !== newHash) {
            history.pushState(null, '', newHash);
        }
    }

    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.classList.toggle('active', link.dataset.page === targetPage);
    });

    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('open');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderPage(targetPage, targetParams);
}

function renderPage(page, params = null) {
    const main = document.getElementById('mainContent');
    if (!main) return;

    let html = '';

    switch (page) {
        case 'home':
            html = typeof renderHome === 'function' ? renderHome() : '<section class="section"><div class="section-container"><h2>Home</h2></div></section>';
            break;

        case 'busca':
            html = typeof renderBusca === 'function' ? renderBusca(params || '') : '<section class="section"><div class="section-container"><h2>Busca</h2></div></section>';
            break;

        case 'perfil':
            html = typeof renderPerfil === 'function' ? renderPerfil(params || 1) : '<section class="section"><div class="section-container"><h2>Perfil não disponível</h2></div></section>';
            break;

        case 'legislativo':
            html = typeof renderLegislativo === 'function' ? renderLegislativo() : '<section class="section"><div class="section-container"><h2>Legislativo em preparação</h2></div></section>';
            break;

        case 'executivo':
            html = typeof renderExecutivo === 'function' ? renderExecutivo() : '<section class="section"><div class="section-container"><h2>Executivo em preparação</h2></div></section>';
            break;

        case 'stf':
            html = typeof renderSTF === 'function' ? renderSTF() : '<section class="section"><div class="section-container"><h2>STF em preparação</h2></div></section>';
            break;

        case 'emendas':
            html = typeof renderEmendas === 'function' ? renderEmendas(params || '') : '<section class="section"><div class="section-container"><h2>Emendas em preparação</h2></div></section>';
            break;

        case 'emenda-detalhe':
            html = typeof renderEmendaDetalhe === 'function' ? renderEmendaDetalhe(params) : '<section class="section"><div class="section-container"><h2>Detalhe da Emenda não disponível</h2></div></section>';
            break;

        case 'ranking':
            html = typeof renderRanking === 'function' ? renderRanking() : '<section class="section"><div class="section-container"><h2>Ranking em preparação</h2></div></section>';
            break;

        case 'comparador':
            html = typeof renderComparador === 'function' ? renderComparador() : '<section class="section"><div class="section-container"><h2>Comparador em preparação</h2></div></section>';
            break;

        case 'metodologia':
            html = typeof renderMetodologia === 'function' ? renderMetodologia() : '<section class="section"><div class="section-container"><h2>Metodologia em preparação</h2></div></section>';
            break;

        case 'fontes':
            html = typeof renderFontes === 'function' ? renderFontes() : '<section class="section"><div class="section-container"><h2>Fontes em preparação</h2></div></section>';
            break;

            case 'politico-detalhe':
    console.log('rota politico-detalhe', params, typeof renderPoliticoDetalhe);

    html = typeof renderPoliticoDetalhe === 'function'
        ? renderPoliticoDetalhe(params)
        : '<div style="padding:40px;color:white">Função renderPoliticoDetalhe não encontrada</div>';
    break;

        default:
            html = typeof renderHome === 'function' ? renderHome() : '<section class="section"><div class="section-container"><h2>Home</h2></div></section>';
            break;
            
    }

    main.innerHTML = html;

    setTimeout(() => {
        initPageFeatures(page, params);
    }, 80);
}

function initPageFeatures(page, params) {
    if (page === 'home') {
        if (typeof BrazilMap !== 'undefined' && BrazilMap && typeof BrazilMap.render === 'function') {
            const mapEl = document.getElementById('brazilMap');
            if (mapEl) BrazilMap.render('brazilMap');
        }

        if (typeof renderExecucaoGeralChart === 'function' && document.getElementById('chartExecucaoGeral')) {
            renderExecucaoGeralChart('chartExecucaoGeral');
        }

        if (typeof renderRegiaoChart === 'function' && document.getElementById('chartRegiao')) {
            renderRegiaoChart('chartRegiao');
        }
    }

    if (page === 'perfil') {
        const p = typeof getPoliticoById === 'function' ? getPoliticoById(parseInt(params)) : null;

        if (p) {
            if (p.emendas_por_ano && typeof renderEmendasAnoChart === 'function' && document.getElementById('chartEmendasAno')) {
                renderEmendasAnoChart('chartEmendasAno', p.emendas_por_ano);
            }

            const areaData = p.recursos_por_area || p.orcamento_por_area;
            if (areaData && typeof renderAreaChart === 'function' && document.getElementById('chartArea')) {
                renderAreaChart('chartArea', areaData);
            }

            if (p.presenca_por_mes && typeof renderPresencaChart === 'function' && document.getElementById('chartPresenca')) {
                renderPresencaChart('chartPresenca', p.presenca_por_mes);
            }

            if (p.criterios_nota && typeof renderNotaRadarChart === 'function' && document.getElementById('chartNota')) {
                renderNotaRadarChart('chartNota', p.criterios_nota);
            }

            if (p.tipo_cargo === 'executivo' && p.orcamento_total && typeof renderOrcamentoChart === 'function' && document.getElementById('chartExecOrc')) {
                renderOrcamentoChart('chartExecOrc', p);
            }

            renderScoreCircle('profileScoreChart', p.nota || 0);
        }
    }

    if (page === 'legislativo') {
        if (typeof renderEvolucaoEmendasChart === 'function' && document.getElementById('chartEvolucaoEmendas')) {
            renderEvolucaoEmendasChart('chartEvolucaoEmendas');
        }
        if (typeof renderTopEstadosChart === 'function' && document.getElementById('chartTopEstados')) {
            renderTopEstadosChart('chartTopEstados');
        }
    }

    if (page === 'executivo') {
        const ctx = document.getElementById('chartExecOrcFed');
        if (ctx && typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Executado', 'A Executar'],
                    datasets: [{
                        data: [87, 13],
                        backgroundColor: ['rgba(0,255,157,0.7)', 'rgba(255,255,255,0.05)'],
                        borderColor: ['#00ff9d', 'rgba(255,255,255,0.1)'],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16 } },
                        tooltip: { callbacks: { label: (c) => ` ${c.raw}%` } }
                    }
                }
            });
        }
    }

    if (page === 'stf') {
        if (typeof renderSTFProdutividadeChart === 'function' && document.getElementById('chartSTFProd')) {
            renderSTFProdutividadeChart('chartSTFProd');
        }
        if (typeof renderSTFParticipacaoChart === 'function' && document.getElementById('chartSTFPart')) {
            renderSTFParticipacaoChart('chartSTFPart');
        }
    }

    if (page === 'emenda-detalhe') {
        const emenda = typeof getEmendaById === 'function' ? getEmendaById(params) : null;
        if (emenda && typeof renderEmendaExecucaoChart === 'function' && document.getElementById('chartEmendaExec')) {
            renderEmendaExecucaoChart('chartEmendaExec', emenda);
        }
    }

    if (page === 'comparador') {
        const p1 = typeof getPoliticoById === 'function' ? getPoliticoById(1) : null;
        const p2 = typeof getPoliticoById === 'function' ? getPoliticoById(2) : null;
        if (p1 && p2 && typeof renderComparadorChart === 'function' && document.getElementById('chartComparador')) {
            renderComparadorChart('chartComparador', p1, p2);
        }
    }

    initScrollTop();
    updateFooterDate();
    animateNumbers();
}

/* ============ SCORE CIRCLE ============ */
function renderScoreCircle(canvasId, nota) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const pct = Math.max(0, Math.min(1, Number(nota || 0) / 10));
    const cx = 50;
    const cy = 50;
    const r = 42;

    ctx.clearRect(0, 0, 100, 100);

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 8;
    ctx.stroke();

    const gradient = ctx.createLinearGradient(0, 0, 100, 100);
    gradient.addColorStop(0, '#00d4ff');
    gradient.addColorStop(1, '#00ff9d');

    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * pct));
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();
}

/* ============ TABS ============ */
function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    const targetContent = document.getElementById(tabId);
    if (targetContent) targetContent.classList.add('active');

    document.querySelectorAll('.tab-btn').forEach(btn => {
        const clickAttr = btn.getAttribute('onclick') || '';
        if (clickAttr.includes(tabId)) btn.classList.add('active');
    });

    const p = typeof getPoliticoById === 'function' ? getPoliticoById(parseInt(AppState.currentParams)) : null;

    if (tabId === 'perfil-presenca' && p?.presenca_por_mes && typeof renderPresencaChart === 'function') {
        setTimeout(() => renderPresencaChart('chartPresenca', p.presenca_por_mes), 100);
    }

    if (tabId === 'perfil-nota' && p?.criterios_nota && typeof renderNotaRadarChart === 'function') {
        setTimeout(() => renderNotaRadarChart('chartNota', p.criterios_nota), 100);
    }

    if (tabId === 'perfil-visao' && p) {
        if (p.emendas_por_ano && typeof renderEmendasAnoChart === 'function') {
            setTimeout(() => renderEmendasAnoChart('chartEmendasAno', p.emendas_por_ano), 100);
        }

        const areaData = p.recursos_por_area || p.orcamento_por_area;
        if (areaData && typeof renderAreaChart === 'function') {
            setTimeout(() => renderAreaChart('chartArea', areaData), 100);
        }

        if (p.tipo_cargo === 'executivo' && typeof renderOrcamentoChart === 'function') {
            setTimeout(() => renderOrcamentoChart('chartExecOrc', p), 100);
        }
    }
}

/* ============ BUSCA GLOBAL ============ */
function executeSearch(term) {
    const value = safeString(term);

    if (!value) {
        navigateTo('busca');
        return;
    }

    AppState.searchHistory.unshift(value);
    AppState.searchHistory = AppState.searchHistory.slice(0, 8);

    navigateTo('busca', value);
}

function initNavSearch() {
    const input = document.getElementById('navSearch');
    const dropdown = document.getElementById('searchDropdown');

    if (!input || !dropdown) return;

    input.addEventListener('input', function () {
        const q = safeString(this.value).toLowerCase();

        if (q.length < 2) {
            dropdown.innerHTML = '';
            dropdown.classList.remove('active');
            return;
        }

        const results = safeList(RadarData.politicos).filter(p =>
            String(p.nome || '').toLowerCase().includes(q) ||
            String(p.cargo || '').toLowerCase().includes(q) ||
            String(p.partido || '').toLowerCase().includes(q) ||
            String(p.uf || '').toLowerCase().includes(q) ||
            String(p.municipio || '').toLowerCase().includes(q)
        ).slice(0, 6);

        if (results.length === 0) {
            dropdown.innerHTML = `
                <div class="search-result-item" style="justify-content:center" onclick="executeSearch('${q.replace(/'/g, "\\'")}')">
                    <i class="fas fa-search" style="color:var(--accent)"></i>
                    <span style="font-size:13px;color:var(--accent)">Buscar "${q}"</span>
                </div>
            `;
            dropdown.classList.add('active');
            return;
        }

        dropdown.innerHTML = results.map(p => `
            <div class="search-result-item" onclick="navigateTo('perfil', '${p.id}'); document.getElementById('navSearch').value=''; document.getElementById('searchDropdown').classList.remove('active')">
                <div class="result-avatar">${p.foto_inicial || '??'}</div>
                <div class="result-info">
                    <div class="result-name">${String(p.nome || '').split(' ').slice(0, 3).join(' ')}</div>
                    <div class="result-meta">${p.cargo || '-'} · ${p.partido || '-'} · ${p.uf || '-'}</div>
                </div>
                <i class="fas fa-arrow-right" style="color:var(--accent);font-size:12px"></i>
            </div>
        `).join('') + `
            <div class="search-result-item" style="justify-content:center" onclick="executeSearch('${q.replace(/'/g, "\\'")}'); document.getElementById('searchDropdown').classList.remove('active')">
                <i class="fas fa-search" style="color:var(--accent)"></i>
                <span style="font-size:13px;color:var(--accent)">Ver todos os resultados para "${q}"</span>
            </div>
        `;

        dropdown.classList.add('active');
    });

    document.addEventListener('click', function (e) {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeSearch(this.value);
            dropdown.classList.remove('active');
            this.value = '';
        }
    });
}

/* ============ BUSCA NA PÁGINA ============ */
function handleBuscaInput() {
    clearTimeout(window.buscaTimeout);
    window.buscaTimeout = setTimeout(() => {
        aplicarFiltros();
    }, 250);
}

function aplicarFiltros() {
    const texto = safeString(document.getElementById('buscaInput')?.value).toLowerCase();
    const cargo = safeString(document.getElementById('filtroCargo')?.value);
    const partido = safeString(document.getElementById('filtroPartido')?.value);
    const uf = safeString(document.getElementById('filtroUF')?.value);
    const nota = safeString(document.getElementById('filtroNota')?.value);

    const resultados = safeList(RadarData.politicos).filter(p => {
        const matchTexto =
            !texto ||
            String(p.nome || '').toLowerCase().includes(texto) ||
            String(p.cargo || '').toLowerCase().includes(texto) ||
            String(p.partido || '').toLowerCase().includes(texto) ||
            String(p.uf || '').toLowerCase().includes(texto) ||
            String(p.municipio || '').toLowerCase().includes(texto);

        const matchCargo = !cargo || String(p.cargo || '').includes(cargo);
        const matchPartido = !partido || String(p.partido || '') === partido;
        const matchUF = !uf || String(p.uf || '') === uf;
        const matchNota = !nota || String(p.nota_letra || '') === nota;

        return matchTexto && matchCargo && matchPartido && matchUF && matchNota;
    });

    const container = document.getElementById('buscaResultados');
    if (!container) return;

    if (resultados.length > 0) {
        container.innerHTML = resultados.map(p => renderPoliticoCard(p)).join('');
    } else {
        container.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">
                <i class="fas fa-search" style="font-size:48px;display:block;margin-bottom:16px;opacity:0.3"></i>
                Nenhum resultado encontrado
            </div>
        `;
    }
}

/* ============ FILTRO DE EMENDAS ============ */
function filtrarEmendas() {
    const texto = safeString(document.getElementById('filtroEmendasTexto')?.value).toLowerCase();
    const uf = safeString(document.getElementById('filtroEmendasUF')?.value);
    const situacao = safeString(document.getElementById('filtroEmendasSituacao')?.value);
    const ano = safeString(document.getElementById('filtroEmendasAno')?.value);

    const emendas = safeList(RadarData.emendas).filter(e => {
        const matchTexto =
            !texto ||
            String(e.objeto || '').toLowerCase().includes(texto) ||
            String(e.municipio || '').toLowerCase().includes(texto) ||
            String(e.autor || '').toLowerCase().includes(texto);

        const matchUF = !uf || String(e.estado || '') === uf;
        const matchSituacao = !situacao || String(e.situacao || '') === situacao;
        const matchAno = !ano || Number(e.ano) === Number(ano);

        return matchTexto && matchUF && matchSituacao && matchAno;
    });

    const container = document.getElementById('emendasResultados');
    if (container && typeof renderEmendasTabela === 'function') {
        container.innerHTML = renderEmendasTabela(emendas);
    }
}

/* ============ COMPARADOR ============ */
function atualizarComparador() {
    const p1id = parseInt(document.getElementById('comparadorPol1')?.value);
    const p2id = parseInt(document.getElementById('comparadorPol2')?.value);

    const p1 = typeof getPoliticoById === 'function' ? getPoliticoById(p1id) : null;
    const p2 = typeof getPoliticoById === 'function' ? getPoliticoById(p2id) : null;

    if (!p1 || !p2) return;

    const grid = document.getElementById('compareGrid');
    if (grid && typeof renderComparadorCard === 'function') {
        grid.innerHTML = `
            ${renderComparadorCard(p1)}
            <div class="compare-vs">VS</div>
            ${renderComparadorCard(p2)}
        `;
    }

    if (typeof renderComparadorChart === 'function') {
        setTimeout(() => renderComparadorChart('chartComparador', p1, p2), 100);
    }
}

/* ============ MODAL ============ */
function openModal(title, content) {
    const overlay = document.getElementById('modalOverlay');
    const body = document.getElementById('modalBody');

    if (!overlay || !body) return;

    body.innerHTML = `<h2 style="font-size:20px;font-weight:800;margin-bottom:20px">${title}</h2>${content}`;
    overlay.classList.add('active');
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.classList.remove('active');
}

/* ============ TOAST ============ */
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = {
        info: 'fa-info-circle',
        success: 'fa-check-circle',
        warning: 'fa-exclamation-circle'
    };

    const colors = {
        info: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}" style="color:${colors[type] || colors.info}"></i><span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ============ SCROLL TOP ============ */
function initScrollTop() {
    let btn = document.querySelector('.scroll-top');

    if (!btn) {
        btn = document.createElement('button');
        btn.className = 'scroll-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(btn);
    }

    const handleScroll = () => {
        btn.classList.toggle('visible', window.scrollY > 300);
    };

    window.removeEventListener('scroll', window._scrollHandler);
    window._scrollHandler = handleScroll;
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/* ============ MOBILE MENU ============ */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
    });
}

/* ============ NAVBAR SCROLL ============ */
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 30px rgba(0,0,0,0.3)' : 'none';
        }
    });
}

/* ============ FOOTER DATE ============ */
function updateFooterDate() {
    const el = document.getElementById('footerDate');
    if (el && RadarData?.stats_gerais?.data_atualizacao) {
        el.textContent = RadarData.stats_gerais.data_atualizacao;
    }
}

/* ============ ANIMATE NUMBERS ============ */
function animateNumbers() {
    const elements = document.querySelectorAll('.stat-num, .stat-card-value');

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, Math.random() * 200 + 100);
    });
}

/* ============ BRAND CLICK ============ */
function initBrandClick() {
    const brand = document.querySelector('.nav-brand');
    if (brand) {
        brand.addEventListener('click', () => navigateTo('home'));
    }
}

/* ============ KEYBOARD SHORTCUTS ============ */
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const search = document.getElementById('navSearch');
            if (search) search.focus();
        }

        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

/* ============ INICIALIZAÇÃO ============ */
document.addEventListener('DOMContentLoaded', async function () {
    if (typeof loadRadarData === 'function') {
        await loadRadarData();
    }

    initMobileMenu();
    initNavSearch();
    initNavbarScroll();
    initKeyboard();
    initBrandClick();
    updateFooterDate();

    const hash = window.location.hash.slice(1);

    if (hash) {
        const [page, rawParams] = hash.split('/');
        navigateTo(page || 'home', decodeParam(rawParams), false);
    } else {
        navigateTo('home', null, false);
        history.replaceState(null, '', '#home');
    }

    setTimeout(() => {
        showToast('👋 Bem-vindo ao RADAR PÚBLICO! Explore os dados de seus representantes.', 'info');
    }, 1200);
});

/* ============ HASH ROUTING ============ */
window.addEventListener('hashchange', function () {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const [page, rawParams] = hash.split('/');
    navigateTo(page || 'home', decodeParam(rawParams), false);
});

/* ============ EXPOR FUNÇÕES GLOBAIS ============ */
window.navigateTo = navigateTo;
window.executeSearch = executeSearch;
window.handleBuscaInput = handleBuscaInput;
window.aplicarFiltros = aplicarFiltros;
window.filtrarEmendas = filtrarEmendas;
window.atualizarComparador = atualizarComparador;
window.switchTab = switchTab;
window.closeModal = closeModal;
window.openModal = openModal;
window.showToast = showToast;

document.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 Iniciando Radar...");

    const data = await loadRadarData();

    console.log("📊 Dados carregados:", data);

    if (data.politicos.length > 0) {
        document.querySelectorAll(".stat-card")[0].innerText = data.politicos.length;
    }
});