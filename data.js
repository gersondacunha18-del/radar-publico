/* ============================================================
   RADAR PÚBLICO — Carregador de Dados
   Lê os dados reais/sincronizados a partir de arquivos JSON
   ============================================================ */

let RadarData = {
    politicos: [],
    ministrosSTF: [],
    emendas: [],
    estados: [],
    cidades_top: [],
    regioes: [],
    stats_gerais: {},
    execucao_anual: {}
};

/* ============ HELPERS ============ */
function safeArray(value) {
    return Array.isArray(value) ? value : [];
}

function safeObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

async function fetchJson(path, fallback) {
    try {
        const response = await fetch(path, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Falha ao carregar ${path}`);
        return await response.json();
    } catch (error) {
        console.error(`Erro ao carregar ${path}:`, error);
        return fallback;
    }
}

/* ============ LOAD DOS DADOS ============ */
async function loadRadarData() {
    const [
        politicos,
        ministrosSTF,
        emendas,
        estados,
        cidades_top,
        regioes,
        stats_gerais,
        execucao_anual
    ] = await Promise.all([
        fetchJson('./politicos.json', []),
        fetchJson('./stf.json', []),
        fetchJson('./emendas.json', []),
        fetchJson('./estados.json', []),
        fetchJson('./cidades_top.json', []),
        fetchJson('./regioes.json', []),
        fetchJson('./stats_gerais.json', {}),
        fetchJson('./execucao_anual.json', {})
    ]);

    RadarData.politicos = safeArray(politicos);
    RadarData.ministrosSTF = safeArray(ministrosSTF);
    RadarData.emendas = safeArray(emendas);
    RadarData.estados = safeArray(estados);
    RadarData.cidades_top = safeArray(cidades_top);
    RadarData.regioes = safeArray(regioes);
    RadarData.stats_gerais = safeObject(stats_gerais);
    RadarData.execucao_anual = safeObject(execucao_anual);

    return RadarData;
}

/* ============ FORMATADORES ============ */
function formatCurrency(value) {
    const num = Number(value || 0);
    if (num >= 1000000000) return `R$ ${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `R$ ${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `R$ ${(num / 1000).toFixed(0)}K`;
    return `R$ ${num.toLocaleString('pt-BR')}`;
}

function formatCurrencyFull(value) {
    const num = Number(value || 0);
    return `R$ ${num.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

function formatNumber(value) {
    return Number(value || 0).toLocaleString('pt-BR');
}

function getStatusBadge(status) {
    const map = {
        'Concluída': 'badge-green',
        'Em Execução': 'badge-blue',
        'Paralisada': 'badge-red',
        'Empenhada': 'badge-orange'
    };
    return map[status] || 'badge-gray';
}

/* ============ BUSCAS ============ */
function getPoliticoById(id) {
    return RadarData.politicos.find(p => String(p.id) === String(id)) || null;
}

function getEmendaById(id) {
    return RadarData.emendas.find(e => String(e.id) === String(id)) || null;
}

function getEmendasByAutor(autor_id) {
    return RadarData.emendas.filter(e => String(e.autor_id) === String(autor_id));
}

function getEmendasByEstado(uf) {
    return RadarData.emendas.filter(e => String(e.estado) === String(uf));
}
