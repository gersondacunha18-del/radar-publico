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

/* ============ ROTEADOR ============ */
function navigateTo(page, params = null) {
    AppState.currentPage = page;
    AppState.currentParams = params;
    
    // Atualizar links ativos na navbar
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    // Scroll ao topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Fechar menu mobile
    document.getElementById('navLinks').classList.remove('open');

    // Renderizar página
    renderPage(page, params);
}

function renderPage(page, params) {
    const main = document.getElementById('mainContent');
    let html = '';

    switch (page) {
        case 'home': html = renderHome(); break;
        case 'busca': html = renderBusca(params || ''); break;
        case 'perfil': html = renderPerfil(params || 1); break;
        case 'legislativo': html = renderLegislativo(); break;
        case 'executivo': html = renderExecutivo(); break;
        case 'stf': html = renderSTF(); break;
        case 'emendas': html = renderEmendas(params || ''); break;
        case 'emenda-detalhe': html = renderEmendaDetalhe(params); break;
        case 'ranking': html = renderRanking(); break;
        case 'comparador': html = renderComparador(); break;
        case 'metodologia': html = renderMetodologia(); break;
        case 'fontes': html = renderFontes(); break;
        default: html = renderHome(); break;
    }

    main.innerHTML = html;

    // Inicializar recursos após renderização
    setTimeout(() => {
        initPageFeatures(page, params);
    }, 100);
}

function initPageFeatures(page, params) {
    // Mapa do Brasil (home)
    if (page === 'home') {
        BrazilMap.render('brazilMap');
        renderExecucaoGeralChart('chartExecucaoGeral');
        renderRegiaoChart('chartRegiao');
    }

    // Perfil do político
    if (page === 'perfil') {
        const p = getPoliticoById(parseInt(params));
        if (p) {
            if (p.emendas_por_ano) renderEmendasAnoChart('chartEmendasAno', p.emendas_por_ano);
            const areaData = p.recursos_por_area || p.orcamento_por_area;
            if (areaData) renderAreaChart('chartArea', areaData);
            if (p.presenca_por_mes) renderPresencaChart('chartPresenca', p.presenca_por_mes);
            if (p.criterios_nota) renderNotaRadarChart('chartNota', p.criterios_nota);
            if (p.tipo_cargo === 'executivo' && p.orcamento_total) renderOrcamentoChart('chartExecOrc', p);
            
            // Gráfico de score (canvas circular simples)
            renderScoreCircle('profileScoreChart', p.nota);
        }
    }

    // Painel Legislativo
    if (page === 'legislativo') {
        renderEvolucaoEmendasChart('chartEvolucaoEmendas');
        renderTopEstadosChart('chartTopEstados');
    }

    // Painel Executivo
    if (page === 'executivo') {
        // Simular gráfico de execução federal
        const ctx = document.getElementById('chartExecOrcFed');
        if (ctx) {
            const chart = new Chart(ctx, {
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
                    responsive: true, maintainAspectRatio: false, cutout: '70%',
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16 } },
                        tooltip: { callbacks: { label: (c) => ` ${c.raw}%` } }
                    }
                }
            });
        }
    }

    // STF
    if (page === 'stf') {
        renderSTFProdutividadeChart('chartSTFProd');
        renderSTFParticipacaoChart('chartSTFPart');
    }

    // Detalhe de emenda
    if (page === 'emenda-detalhe') {
        const emenda = getEmendaById(params);
        if (emenda) renderEmendaExecucaoChart('chartEmendaExec', emenda);
    }

    // Comparador
    if (page === 'comparador') {
        const p1 = getPoliticoById(1);
        const p2 = getPoliticoById(2);
        if (p1 && p2) renderComparadorChart('chartComparador', p1, p2);
    }

    // Inicializar funcionalidades gerais
    initScrollTop();
    updateFooterDate();
    animateNumbers();
}

/* ============ SCORE CIRCLE ============ */
function renderScoreCircle(canvasId, nota) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pct = nota / 10;
    const cx = 50, cy = 50, r = 42;
    ctx.clearRect(0, 0, 100, 100);
    
    // Fundo
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 8;
    ctx.stroke();
    
    // Progresso
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
    
    // Marcar botão ativo
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('onclick').includes(tabId)) {
            btn.classList.add('active');
        }
    });

    // Renderizar gráficos da aba, se necessário
    const p = getPoliticoById(parseInt(AppState.currentParams));
    if (tabId === 'perfil-presenca' && p && p.presenca_por_mes) {
        setTimeout(() => renderPresencaChart('chartPresenca', p.presenca_por_mes), 100);
    }
    if (tabId === 'perfil-nota' && p && p.criterios_nota) {
        setTimeout(() => renderNotaRadarChart('chartNota', p.criterios_nota), 100);
    }
    if (tabId === 'perfil-visao' && p) {
        if (p.emendas_por_ano) setTimeout(() => renderEmendasAnoChart('chartEmendasAno', p.emendas_por_ano), 100);
        const areaData = p.recursos_por_area || p.orcamento_por_area;
        if (areaData) setTimeout(() => renderAreaChart('chartArea', areaData), 100);
        if (p.tipo_cargo === 'executivo') setTimeout(() => renderOrcamentoChart('chartExecOrc', p), 100);
    }
}

/* ============ BUSCA GLOBAL ============ */
function initNavSearch() {
    const input = document.getElementById('navSearch');
    const dropdown = document.getElementById('searchDropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', function() {
        const q = this.value.trim().toLowerCase();
        if (q.length < 2) { dropdown.classList.remove('active'); return; }
        
        const results = RadarData.politicos.filter(p =>
            p.nome.toLowerCase().includes(q) ||
            p.cargo.toLowerCase().includes(q) ||
            p.partido.toLowerCase().includes(q) ||
            p.uf.toLowerCase().includes(q)
        ).slice(0, 6);

        if (results.length === 0) { dropdown.classList.remove('active'); return; }

        dropdown.innerHTML = results.map(p => `
            <div class="search-result-item" onclick="navigateTo('perfil', '${p.id}'); document.getElementById('navSearch').value=''; document.getElementById('searchDropdown').classList.remove('active')">
                <div class="result-avatar">${p.foto_inicial}</div>
                <div class="result-info">
                    <div class="result-name">${p.nome.split(' ').slice(0,3).join(' ')}</div>
                    <div class="result-meta">${p.cargo} · ${p.partido} · ${p.uf}</div>
                </div>
                <i class="fas fa-arrow-right" style="color:var(--accent);font-size:12px"></i>
            </div>
        `).join('') + `
            <div class="search-result-item" style="justify-content:center" onclick="navigateTo('busca', '${q}'); document.getElementById('searchDropdown').classList.remove('active')">
                <i class="fas fa-search" style="color:var(--accent)"></i>
                <span style="font-size:13px;color:var(--accent)">Ver todos os resultados para "${q}"</span>
            </div>
        `;
        dropdown.classList.add('active');
    });

    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            navigateTo('busca', this.value.trim());
            dropdown.classList.remove('active');
            this.value = '';
        }
    });
}

/* ============ BUSCA NA PÁGINA ============ */
function handleBuscaInput(value) {
    clearTimeout(window.buscaTimeout);
    window.buscaTimeout = setTimeout(() => {
        aplicarFiltros();
    }, 300);
}

function aplicarFiltros() {
    const texto = (document.getElementById('buscaInput')?.value || '').toLowerCase();
    const cargo = document.getElementById('filtroCargo')?.value || '';
    const partido = document.getElementById('filtroPartido')?.value || '';
    const uf = document.getElementById('filtroUF')?.value || '';
    const nota = document.getElementById('filtroNota')?.value || '';

    let resultados = RadarData.politicos.filter(p => {
        const matchTexto = !texto || p.nome.toLowerCase().includes(texto) || p.cargo.toLowerCase().includes(texto) || p.municipio.toLowerCase().includes(texto);
        const matchCargo = !cargo || p.cargo.includes(cargo);
        const matchPartido = !partido || p.partido === partido;
        const matchUF = !uf || p.uf === uf;
        const matchNota = !nota || p.nota_letra === nota;
        return matchTexto && matchCargo && matchPartido && matchUF && matchNota;
    });

    const container = document.getElementById('buscaResultados');
    if (container) {
        container.innerHTML = resultados.length > 0
            ? resultados.map(p => renderPoliticoCard(p)).join('')
            : `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted)">
                <i class="fas fa-search" style="font-size:48px;display:block;margin-bottom:16px;opacity:0.3"></i>
                Nenhum resultado encontrado
               </div>`;
    }
}

/* ============ FILTRO DE EMENDAS ============ */
function filtrarEmendas() {
    const texto = (document.getElementById('filtroEmendasTexto')?.value || '').toLowerCase();
    const uf = document.getElementById('filtroEmendasUF')?.value || '';
    const situacao = document.getElementById('filtroEmendasSituacao')?.value || '';
    const ano = document.getElementById('filtroEmendasAno')?.value || '';

    let emendas = RadarData.emendas.filter(e => {
        const matchTexto = !texto || e.objeto.toLowerCase().includes(texto) || e.municipio.toLowerCase().includes(texto) || e.autor.toLowerCase().includes(texto);
        const matchUF = !uf || e.estado === uf;
        const matchSituacao = !situacao || e.situacao === situacao;
        const matchAno = !ano || e.ano === parseInt(ano);
        return matchTexto && matchUF && matchSituacao && matchAno;
    });

    const container = document.getElementById('emendasResultados');
    if (container) {
        container.innerHTML = renderEmendasTabela(emendas);
    }
}

/* ============ COMPARADOR ============ */
function atualizarComparador() {
    const p1id = parseInt(document.getElementById('comparadorPol1')?.value);
    const p2id = parseInt(document.getElementById('comparadorPol2')?.value);
    const p1 = getPoliticoById(p1id);
    const p2 = getPoliticoById(p2id);
    if (!p1 || !p2) return;

    const grid = document.getElementById('compareGrid');
    if (grid) {
        grid.innerHTML = `${renderComparadorCard(p1, 'left')}<div class="compare-vs">VS</div>${renderComparadorCard(p2, 'right')}`;
    }
    setTimeout(() => renderComparadorChart('chartComparador', p1, p2), 100);
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
    const icons = { info: 'fa-info-circle', success: 'fa-check-circle', warning: 'fa-exclamation-circle' };
    const colors = { info: 'var(--accent)', success: 'var(--success)', warning: 'var(--warning)' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${icons[type]}" style="color:${colors[type]}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; setTimeout(() => toast.remove(), 300); }, 3000);
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
    if (el) el.textContent = RadarData.stats_gerais.data_atualizacao;
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
    if (brand) brand.addEventListener('click', () => navigateTo('home'));
}

/* ============ KEYBOARD SHORTCUTS ============ */
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        // Ctrl+K para abrir busca
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const search = document.getElementById('navSearch');
            if (search) search.focus();
        }
        // ESC para fechar modal
        if (e.key === 'Escape') closeModal();
    });
}

/* ============ INICIALIZAÇÃO ============ */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes globais
    initMobileMenu();
    initNavSearch();
    initNavbarScroll();
    initKeyboard();
    initBrandClick();
    updateFooterDate();

    // Renderizar página inicial
    navigateTo('home');

    // Toast de boas-vindas
    setTimeout(() => {
        showToast('👋 Bem-vindo ao RADAR PÚBLICO! Explore os dados de seus representantes.', 'info');
    }, 1500);
});

/* ============ HASH ROUTING (opcional) ============ */
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.slice(1);
    if (hash) {
        const [page, params] = hash.split('/');
        navigateTo(page, params);
    }
});
