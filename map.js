/* ============================================================
   RADAR PÚBLICO — Mapa Interativo do Brasil (SVG)
   ============================================================ */

const BrazilMap = {
    // Dados dos estados com posições aproximadas no SVG
    statesData: {
        "AC": { name: "Acre", cx: 100, cy: 290, r: 22 },
        "AL": { name: "Alagoas", cx: 610, cy: 265, r: 16 },
        "AM": { name: "Amazonas", cx: 155, cy: 195, r: 60 },
        "AP": { name: "Amapá", cx: 510, cy: 90, r: 20 },
        "BA": { name: "Bahia", cx: 540, cy: 280, r: 52 },
        "CE": { name: "Ceará", cx: 570, cy: 175, r: 28 },
        "DF": { name: "Distrito Federal", cx: 430, cy: 305, r: 10 },
        "ES": { name: "Espírito Santo", cx: 575, cy: 335, r: 16 },
        "GO": { name: "Goiás", cx: 400, cy: 305, r: 38 },
        "MA": { name: "Maranhão", cx: 480, cy: 180, r: 38 },
        "MG": { name: "Minas Gerais", cx: 500, cy: 340, r: 50 },
        "MS": { name: "Mato Grosso do Sul", cx: 340, cy: 375, r: 36 },
        "MT": { name: "Mato Grosso", cx: 280, cy: 280, r: 52 },
        "PA": { name: "Pará", cx: 380, cy: 165, r: 65 },
        "PB": { name: "Paraíba", cx: 600, cy: 210, r: 18 },
        "PE": { name: "Pernambuco", cx: 570, cy: 235, r: 28 },
        "PI": { name: "Piauí", cx: 510, cy: 205, r: 32 },
        "PR": { name: "Paraná", cx: 390, cy: 430, r: 35 },
        "RJ": { name: "Rio de Janeiro", cx: 545, cy: 380, r: 18 },
        "RN": { name: "Rio Grande do Norte", cx: 620, cy: 190, r: 18 },
        "RO": { name: "Rondônia", cx: 190, cy: 285, r: 26 },
        "RR": { name: "Roraima", cx: 200, cy: 105, r: 26 },
        "RS": { name: "Rio Grande do Sul", cx: 380, cy: 490, r: 38 },
        "SC": { name: "Santa Catarina", cx: 415, cy: 460, r: 26 },
        "SE": { name: "Sergipe", cx: 600, cy: 265, r: 14 },
        "SP": { name: "São Paulo", cx: 460, cy: 395, r: 42 },
        "TO": { name: "Tocantins", cx: 430, cy: 230, r: 34 }
    },

    selectedState: null,
    tooltipEl: null,

    getColor(uf) {
        const estado = RadarData.estados.find(e => e.uf === uf);
        if (!estado) return 'rgba(0,212,255,0.08)';
        const intensity = estado.cor_intensity;
        return `rgba(0,212,255,${0.05 + intensity * 0.5})`;
    },

    getStrokeColor(uf) {
        const estado = RadarData.estados.find(e => e.uf === uf);
        if (!estado) return 'rgba(0,212,255,0.2)';
        const intensity = estado.cor_intensity;
        if (intensity > 0.7) return '#00ff9d';
        if (intensity > 0.4) return '#00d4ff';
        return 'rgba(0,212,255,0.3)';
    },

    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        container.style.position = 'relative';

        // Tooltip
        this.tooltipEl = document.createElement('div');
        this.tooltipEl.className = 'map-tooltip';
        this.tooltipEl.style.display = 'none';
        container.appendChild(this.tooltipEl);

        // SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('id', 'brazilMapSvg');
        svg.setAttribute('viewBox', '50 60 650 490');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.cursor = 'pointer';

        // Background
        const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bg.setAttribute('width', '100%');
        bg.setAttribute('height', '100%');
        bg.setAttribute('fill', 'transparent');
        svg.appendChild(bg);

        // Renderizar estados como círculos proporcionais
        Object.entries(this.statesData).forEach(([uf, pos]) => {
            const estado = RadarData.estados.find(e => e.uf === uf);
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.setAttribute('data-uf', uf);
            group.setAttribute('class', 'map-state-group');

            // Círculo principal
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', pos.cx);
            circle.setAttribute('cy', pos.cy);
            circle.setAttribute('r', pos.r);
            circle.setAttribute('fill', this.getColor(uf));
            circle.setAttribute('stroke', this.getStrokeColor(uf));
            circle.setAttribute('stroke-width', '1');
            circle.setAttribute('class', 'map-state');
            circle.style.transition = 'all 0.3s ease';

            // Label do estado
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', pos.cx);
            text.setAttribute('y', pos.cy + 1);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('fill', '#94a3b8');
            text.setAttribute('font-size', Math.max(8, pos.r * 0.35));
            text.setAttribute('font-weight', '700');
            text.setAttribute('font-family', 'Inter, sans-serif');
            text.setAttribute('pointer-events', 'none');
            text.textContent = uf;

            group.appendChild(circle);
            group.appendChild(text);

            // Eventos
            group.addEventListener('mouseenter', (e) => {
                circle.setAttribute('fill', 'rgba(0,212,255,0.4)');
                circle.setAttribute('stroke', '#00d4ff');
                circle.setAttribute('stroke-width', '2');
                circle.setAttribute('r', pos.r * 1.15);
                text.setAttribute('fill', '#00d4ff');
                this.showTooltip(e, uf, container);
            });

            group.addEventListener('mouseleave', () => {
                if (this.selectedState !== uf) {
                    circle.setAttribute('fill', this.getColor(uf));
                    circle.setAttribute('stroke', this.getStrokeColor(uf));
                    circle.setAttribute('stroke-width', '1');
                    circle.setAttribute('r', pos.r);
                    text.setAttribute('fill', '#94a3b8');
                }
                this.hideTooltip();
            });

            group.addEventListener('mousemove', (e) => {
                this.moveTooltip(e, container);
            });

            group.addEventListener('click', () => {
                // Reset previous
                if (this.selectedState) {
                    const prevUf = this.selectedState;
                    const prevPos = this.statesData[prevUf];
                    const prevGroup = svg.querySelector(`[data-uf="${prevUf}"] circle`);
                    const prevText = svg.querySelector(`[data-uf="${prevUf}"] text`);
                    if (prevGroup) {
                        prevGroup.setAttribute('fill', this.getColor(prevUf));
                        prevGroup.setAttribute('stroke', this.getStrokeColor(prevUf));
                        prevGroup.setAttribute('stroke-width', '1');
                        prevGroup.setAttribute('r', prevPos.r);
                    }
                    if (prevText) prevText.setAttribute('fill', '#94a3b8');
                }

                this.selectedState = uf;
                circle.setAttribute('fill', 'rgba(0,255,157,0.3)');
                circle.setAttribute('stroke', '#00ff9d');
                circle.setAttribute('stroke-width', '2.5');
                text.setAttribute('fill', '#00ff9d');

                this.showStateDetail(uf);
            });

            svg.appendChild(group);
        });

        // Conexões visuais entre estados próximos (linhas decorativas)
        this.drawConnections(svg);

        container.appendChild(svg);
    },

    drawConnections(svg) {
        const connections = [
            ['SP', 'RJ'], ['SP', 'MG'], ['MG', 'RJ'], ['PR', 'SC'], ['SC', 'RS'],
            ['BA', 'MG'], ['GO', 'MT'], ['PA', 'AM'], ['CE', 'PB'], ['PE', 'BA']
        ];
        connections.forEach(([uf1, uf2]) => {
            const p1 = this.statesData[uf1];
            const p2 = this.statesData[uf2];
            if (!p1 || !p2) return;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', p1.cx); line.setAttribute('y1', p1.cy);
            line.setAttribute('x2', p2.cx); line.setAttribute('y2', p2.cy);
            line.setAttribute('stroke', 'rgba(0,212,255,0.08)');
            line.setAttribute('stroke-width', '0.5');
            line.setAttribute('stroke-dasharray', '4,4');
            line.setAttribute('pointer-events', 'none');
            svg.insertBefore(line, svg.firstChild);
        });
    },

    showTooltip(e, uf, container) {
        if (!this.tooltipEl) return;
        const estado = RadarData.estados.find(s => s.uf === uf);
        if (!estado) return;
        this.tooltipEl.innerHTML = `
            <div style="font-weight:700;color:#00d4ff;margin-bottom:4px">${estado.nome} (${uf})</div>
            <div style="font-size:12px;color:#94a3b8">💰 ${formatCurrency(estado.valor_recebido)}</div>
            <div style="font-size:12px;color:#94a3b8">📋 ${formatNumber(estado.emendas_count)} emendas</div>
            <div style="font-size:11px;color:#64748b;margin-top:4px">Clique para ver detalhes</div>
        `;
        this.tooltipEl.style.display = 'block';
        this.moveTooltip(e, container);
    },

    moveTooltip(e, container) {
        if (!this.tooltipEl) return;
        const rect = container.getBoundingClientRect();
        let x = e.clientX - rect.left + 15;
        let y = e.clientY - rect.top - 10;
        if (x + 200 > rect.width) x = e.clientX - rect.left - 210;
        this.tooltipEl.style.left = `${x}px`;
        this.tooltipEl.style.top = `${y}px`;
    },

    hideTooltip() {
        if (this.tooltipEl) this.tooltipEl.style.display = 'none';
    },

    showStateDetail(uf) {
        const estado = RadarData.estados.find(e => e.uf === uf);
        if (!estado) return;
        const emendas = getEmendasByEstado(uf);
        const panel = document.getElementById('mapStateDetail');
        if (!panel) return;

        panel.style.display = 'block';
        panel.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">
                <div>
                    <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--accent);margin-bottom:4px">
                        <i class="fas fa-map-marker-alt"></i> ${estado.regiao}
                    </div>
                    <h3 style="font-size:20px;font-weight:900">${estado.nome} <span style="color:var(--text-muted);font-size:14px">(${uf})</span></h3>
                </div>
                <span class="badge badge-blue">#${estado.rank}º em emendas</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
                <div class="info-item">
                    <div class="info-label"><i class="fas fa-dollar-sign"></i> Valor Recebido</div>
                    <div class="info-value text-accent font-mono">${formatCurrency(estado.valor_recebido)}</div>
                </div>
                <div class="info-item">
                    <div class="info-label"><i class="fas fa-file-invoice"></i> Total Emendas</div>
                    <div class="info-value font-mono">${formatNumber(estado.emendas_count)}</div>
                </div>
            </div>
            ${emendas.length > 0 ? `
            <div style="margin-bottom:12px">
                <div style="font-size:13px;font-weight:700;margin-bottom:10px;color:var(--text-secondary)">
                    <i class="fas fa-list" style="color:var(--accent)"></i> Emendas em destaque
                </div>
                ${emendas.slice(0, 3).map(e => `
                    <div onclick="navigateTo('emenda-detalhe', '${e.id}')" 
                         style="padding:10px;background:var(--glass);border:1px solid var(--border-light);border-radius:8px;margin-bottom:6px;cursor:pointer;transition:all 0.2s"
                         onmouseenter="this.style.borderColor='var(--accent)'" onmouseleave="this.style.borderColor='var(--border-light)'">
                        <div style="font-size:12px;font-weight:600">${e.objeto}</div>
                        <div style="font-size:11px;color:var(--text-muted)">${e.municipio} · ${formatCurrency(e.valor_indicado)} · 
                            <span class="status-dot ${e.situacao_cor}"></span>${e.situacao}
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            <button class="btn btn-outline btn-sm w-full" onclick="navigateTo('emendas', '${uf}')">
                <i class="fas fa-search"></i> Ver todas as emendas de ${uf}
            </button>
        `;
    }
};
