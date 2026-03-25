/* ============================================================
   RADAR PÚBLICO — Módulo de Gráficos (Chart.js)
   ============================================================ */

Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = 'rgba(0,212,255,0.1)';
Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
Chart.defaults.font.size = 12;

const ChartColors = {
    accent: '#00d4ff',
    accent2: '#00ff9d',
    accent3: '#7c3aed',
    warning: '#f59e0b',
    danger: '#ef4444',
    success: '#22c55e',
    blue: '#3b82f6',
    pink: '#ec4899',
    gradient1: (ctx) => {
        if (!ctx || !ctx.chart) return '#00d4ff';
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
        gradient.addColorStop(0, 'rgba(0,212,255,0.8)');
        gradient.addColorStop(1, 'rgba(0,212,255,0.1)');
        return gradient;
    },
    gradient2: (ctx) => {
        if (!ctx || !ctx.chart) return '#00ff9d';
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
        gradient.addColorStop(0, 'rgba(0,255,157,0.8)');
        gradient.addColorStop(1, 'rgba(0,255,157,0.1)');
        return gradient;
    }
};

const chartRegistry = {};

function destroyChart(id) {
    if (chartRegistry[id]) {
        chartRegistry[id].destroy();
        delete chartRegistry[id];
    }
}

function registerChart(id, chart) {
    destroyChart(id);
    chartRegistry[id] = chart;
    return chart;
}

/* ---- Emendas por Ano (Bar) ---- */
function renderEmendasAnoChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const anos = Object.keys(data);
    const valores = Object.values(data).map(v => v / 1000000);
    return registerChart(canvasId, new Chart(ctx, {
        type: 'bar',
        data: {
            labels: anos,
            datasets: [{
                label: 'Valor (R$ milhões)',
                data: valores,
                backgroundColor: anos.map((_, i) => i === anos.length - 1 ? 'rgba(0,255,157,0.6)' : 'rgba(0,212,255,0.5)'),
                borderColor: anos.map((_, i) => i === anos.length - 1 ? '#00ff9d' : '#00d4ff'),
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (c) => ` R$ ${c.raw.toFixed(1)}M`
                    }
                }
            },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => `R$${v}M` } },
                x: { grid: { display: false } }
            }
        }
    }));
}

/* ---- Presença por Mês (Line) ---- */
function renderPresencaChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    return registerChart(canvasId, new Chart(ctx, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [{
                label: 'Presença (%)',
                data: data,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0,212,255,0.08)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00d4ff',
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            plugins: { legend: { display: false },
                tooltip: { callbacks: { label: (c) => ` ${c.raw}%` } }
            },
            scales: {
                y: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => `${v}%` } },
                x: { grid: { display: false } }
            }
        }
    }));
}

/* ---- Recursos por Área (Donut/Doughnut) ---- */
function renderAreaChart(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const labels = Object.keys(data);
    const values = Object.values(data).map(v => v / 1000000);
    const colors = ['#00d4ff','#00ff9d','#7c3aed','#f59e0b','#ef4444','#3b82f6','#ec4899'];
    return registerChart(canvasId, new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data: values,
                backgroundColor: colors.map(c => c + '99'),
                borderColor: colors,
                borderWidth: 2,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            cutout: '65%',
            plugins: {
                legend: { position: 'right', labels: { padding: 16, usePointStyle: true, pointStyle: 'circle' } },
                tooltip: { callbacks: { label: (c) => ` R$ ${c.raw.toFixed(1)}M` } }
            }
        }
    }));
}

/* ---- Critérios de Nota (Radar) ---- */
function renderNotaRadarChart(canvasId, criterios) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const labels = Object.keys(criterios).map(k => k.charAt(0).toUpperCase() + k.slice(1));
    const values = Object.values(criterios);
    return registerChart(canvasId, new Chart(ctx, {
        type: 'radar',
        data: {
            labels,
            datasets: [{
                label: 'Desempenho',
                data: values,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0,212,255,0.15)',
                pointBackgroundColor: '#00d4ff',
                pointBorderColor: '#0a1628',
                pointRadius: 5,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            scales: {
                r: {
                    min: 0, max: 10,
                    ticks: { stepSize: 2, backdropColor: 'transparent' },
                    grid: { color: 'rgba(255,255,255,0.08)' },
                    angleLines: { color: 'rgba(255,255,255,0.05)' },
                    pointLabels: { font: { size: 11 }, color: '#94a3b8' }
                }
            },
            plugins: { legend: { display: false } }
        }
    }));
}

/* ---- Execução Geral (Bar Grouped) ---- */
function renderExecucaoGeralChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const d = RadarData.execucao_anual;
    return registerChart(canvasId, new Chart(ctx, {
        type: 'bar',
        data: {
            labels: d.anos,
            datasets: [
                { label: 'Indicado', data: d.indicado, backgroundColor: 'rgba(124,58,237,0.5)', borderColor: '#7c3aed', borderWidth: 2, borderRadius: 4 },
                { label: 'Empenhado', data: d.empenhado, backgroundColor: 'rgba(0,212,255,0.5)', borderColor: '#00d4ff', borderWidth: 2, borderRadius: 4 },
                { label: 'Pago', data: d.pago, backgroundColor: 'rgba(0,255,157,0.5)', borderColor: '#00ff9d', borderWidth: 2, borderRadius: 4 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { usePointStyle: true, padding: 20 } },
                tooltip: { callbacks: { label: (c) => ` R$ ${c.raw.toLocaleString('pt-BR')}M` } }
            },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => `R$${v}M` } },
                x: { grid: { display: false } }
            }
        }
    }));
}

/* ---- Ranking por Região (Horizontal Bar) ---- */
function renderRegiaoChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const regioes = RadarData.regioes;
    return registerChart(canvasId, new Chart(ctx, {
        type: 'bar',
        data: {
            labels: regioes.map(r => r.nome),
            datasets: [{
                label: 'Valor Recebido (R$ Bilhões)',
                data: regioes.map(r => r.valor / 1000000000),
                backgroundColor: ['rgba(0,212,255,0.6)','rgba(0,255,157,0.6)','rgba(124,58,237,0.6)','rgba(245,158,11,0.6)','rgba(239,68,68,0.6)'],
                borderColor: ['#00d4ff','#00ff9d','#7c3aed','#f59e0b','#ef4444'],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ` R$ ${c.raw.toFixed(1)}B` } } },
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => `R$${v}B` } },
                y: { grid: { display: false } }
            }
        }
    }));
}

/* ---- Empenho vs Pago (Emenda Detalhe) ---- */
function renderEmendaExecucaoChart(canvasId, emenda) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    return registerChart(canvasId, new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Valor Indicado', 'Valor Empenhado', 'Valor Pago'],
            datasets: [{
                data: [emenda.valor_indicado / 1000000, emenda.valor_empenhado / 1000000, emenda.valor_pago / 1000000],
                backgroundColor: ['rgba(124,58,237,0.6)','rgba(0,212,255,0.6)','rgba(0,255,157,0.6)'],
                borderColor: ['#7c3aed','#00d4ff','#00ff9d'],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ` R$ ${c.raw.toFixed(2)}M` } } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => `R$${v}M` } },
                x: { grid: { display: false } }
            }
        }
    }));
}

/* ---- STF Produtividade (Bar) ---- */
function renderSTFProdutividadeChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const ministros = RadarData.ministrosSTF;
    return registerChart(canvasId, new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ministros.map(m => m.nome.split(' ')[0] + ' ' + m.nome.split(' ').slice(-1)[0]),
            datasets: [
                { label: 'Ações Julgadas', data: ministros.map(m => m.acoes_julgadas), backgroundColor: 'rgba(0,212,255,0.5)', borderColor: '#00d4ff', borderWidth: 2, borderRadius: 4 },
                { label: 'HC', data: ministros.map(m => m.habeas_corpus), backgroundColor: 'rgba(0,255,157,0.5)', borderColor: '#00ff9d', borderWidth: 2, borderRadius: 4 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.04)' } },
                x: { grid: { display: false } }
            }
        }
    }));
}

/* ---- STF Participação (Polar Area) ---- */
function renderSTFParticipacaoChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const ministros = RadarData.ministrosSTF;
    return registerChart(canvasId, new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ministros.map(m => m.nome.split(' ')[0]),
            datasets: [{
                data: ministros.map(m => Math.round((m.sessoes_participou / m.sessoes_realizadas) * 100)),
                backgroundColor: ['rgba(0,212,255,0.5)','rgba(0,255,157,0.5)','rgba(124,58,237,0.5)','rgba(245,158,11,0.5)','rgba(239,68,68,0.5)'],
                borderColor: ['#00d4ff','#00ff9d','#7c3aed','#f59e0b','#ef4444'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            plugins: {
                legend: { position: 'right', labels: { usePointStyle: true } },
                tooltip: { callbacks: { label: (c) => ` ${c.raw}% de participação` } }
            },
            scales: { r: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { backdropColor: 'transparent', callback: v => `${v}%` } } }
        }
    }));
}

/* ---- Execução Estado por Área (Stacked Bar) ---- */
function renderTopEstadosChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const top = RadarData.estados.slice(0, 8);
    return registerChart(canvasId, new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top.map(e => e.uf),
            datasets: [{
                label: 'Valor Recebido (R$ M)',
                data: top.map(e => e.valor_recebido / 1000000),
                backgroundColor: top.map((_, i) => `hsla(${190 + i * 15}, 90%, 55%, 0.6)`),
                borderColor: top.map((_, i) => `hsl(${190 + i * 15}, 90%, 55%)`),
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ` R$ ${c.raw.toFixed(0)}M` } } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => `R$${v}M` } },
                x: { grid: { display: false } }
            }
        }
    }));
}

/* ---- Comparador (Radar) ---- */
function renderComparadorChart(canvasId, pol1, pol2) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const labels = ['Presença', 'Produção', 'Emendas', 'Transparência', 'Engajamento'];
    const d1 = pol1.criterios_nota;
    const d2 = pol2.criterios_nota;
    const v1 = [d1.presenca || d1.execucao, d1.producao || d1.programas, d1.emendas || 7, d1.transparencia, d1.votacoes || d1.eficiencia || 7];
    const v2 = [d2.presenca || d2.execucao, d2.producao || d2.programas, d2.emendas || 7, d2.transparencia, d2.votacoes || d2.eficiencia || 7];
    return registerChart(canvasId, new Chart(ctx, {
        type: 'radar',
        data: {
            labels,
            datasets: [
                { label: pol1.nome.split(' ')[0], data: v1, borderColor: '#00d4ff', backgroundColor: 'rgba(0,212,255,0.15)', pointBackgroundColor: '#00d4ff', borderWidth: 2, pointRadius: 5 },
                { label: pol2.nome.split(' ')[0], data: v2, borderColor: '#00ff9d', backgroundColor: 'rgba(0,255,157,0.15)', pointBackgroundColor: '#00ff9d', borderWidth: 2, pointRadius: 5 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            scales: {
                r: {
                    min: 0, max: 10,
                    ticks: { stepSize: 2, backdropColor: 'transparent' },
                    grid: { color: 'rgba(255,255,255,0.08)' },
                    angleLines: { color: 'rgba(255,255,255,0.05)' },
                    pointLabels: { font: { size: 11 }, color: '#94a3b8' }
                }
            },
            plugins: { legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } } }
        }
    }));
}

/* ---- Execução Orçamentária Executivo (Doughnut) ---- */
function renderOrcamentoChart(canvasId, politico) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const total = politico.orcamento_total;
    const exec = politico.orcamento_executado;
    const restante = total - exec;
    return registerChart(canvasId, new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Executado', 'A executar'],
            datasets: [{
                data: [exec / 1000000000, restante / 1000000000],
                backgroundColor: ['rgba(0,255,157,0.7)', 'rgba(255,255,255,0.05)'],
                borderColor: ['#00ff9d', 'rgba(255,255,255,0.1)'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: true, cutout: '70%',
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, padding: 16 } },
                tooltip: { callbacks: { label: (c) => ` R$ ${c.raw.toFixed(1)}B` } }
            }
        }
    }));
}

/* ---- Evolução de Emendas (área) ---- */
function renderEvolucaoEmendasChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    const d = RadarData.execucao_anual;
    return registerChart(canvasId, new Chart(ctx, {
        type: 'line',
        data: {
            labels: d.anos,
            datasets: [
                { label: 'Indicado (R$ M)', data: d.indicado, borderColor: '#7c3aed', backgroundColor: 'rgba(124,58,237,0.1)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 4 },
                { label: 'Pago (R$ M)', data: d.pago, borderColor: '#00ff9d', backgroundColor: 'rgba(0,255,157,0.1)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 4 }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'top', labels: { usePointStyle: true, padding: 16 } }, tooltip: { callbacks: { label: (c) => ` R$ ${c.raw.toFixed(0)}M` } } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => `R$${v}M` } },
                x: { grid: { display: false } }
            }
        }
    }));
}
