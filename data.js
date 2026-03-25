/* ============================================================
   RADAR PÚBLICO — Dados Simulados Realistas
   Fonte: Dados simulados para fins demonstrativos
   ============================================================ */

const RadarData = {

    // ============ POLÍTICOS ============
    politicos: [
        {
            id: 1,
            nome: "Carlos Eduardo Ferreira",
            cargo: "Deputado Federal",
            partido: "PSD",
            uf: "SP",
            municipio: "São Paulo",
            mandato: "2023-2027",
            foto_inicial: "CF",
            presenca: 87,
            votacoes: 412,
            projetos: 28,
            relatorias: 5,
            comissoes: ["Educação", "Ciência e Tecnologia"],
            emendas_total: 45,
            valor_total: 87500000,
            nota: 8.2,
            nota_letra: "A",
            ranking: 12,
            cidades_atendidas: 34,
            area_atuacao: "Educação e Infraestrutura",
            bio: "Deputado federal em segundo mandato, com atuação destacada na área de educação e tecnologia.",
            criterios_nota: {
                presenca: 8.7,
                votacoes: 8.5,
                producao: 7.8,
                emendas: 9.0,
                transparencia: 7.2
            },
            emendas_por_ano: { "2023": 18200000, "2024": 32500000, "2025": 36800000 },
            presenca_por_mes: [88, 92, 85, 90, 78, 82, 95, 88, 84, 91, 87, 80],
            recursos_por_area: {
                "Saúde": 28000000,
                "Educação": 35000000,
                "Infraestrutura": 14500000,
                "Cultura": 5000000,
                "Assistência Social": 5000000
            }
        },
        {
            id: 2,
            nome: "Ana Paula Rodrigues",
            cargo: "Senadora",
            partido: "PT",
            uf: "MG",
            municipio: "Belo Horizonte",
            mandato: "2023-2031",
            foto_inicial: "AR",
            presenca: 92,
            votacoes: 387,
            projetos: 42,
            relatorias: 12,
            comissoes: ["Saúde", "Direitos Humanos", "CAE"],
            emendas_total: 62,
            valor_total: 124800000,
            nota: 9.1,
            nota_letra: "A",
            ranking: 3,
            cidades_atendidas: 67,
            area_atuacao: "Saúde e Direitos Humanos",
            bio: "Senadora em seu primeiro mandato, ex-secretária estadual de saúde com ampla experiência legislativa.",
            criterios_nota: {
                presenca: 9.2,
                votacoes: 9.4,
                producao: 9.0,
                emendas: 8.8,
                transparencia: 9.1
            },
            emendas_por_ano: { "2023": 38000000, "2024": 45000000, "2025": 41800000 },
            presenca_por_mes: [94, 96, 91, 90, 88, 92, 95, 90, 93, 91, 89, 94],
            recursos_por_area: {
                "Saúde": 65000000,
                "Educação": 22000000,
                "Saneamento": 18000000,
                "Habitação": 12000000,
                "Outros": 7800000
            }
        },
        {
            id: 3,
            nome: "Roberto Silveira Lima",
            cargo: "Deputado Federal",
            partido: "União Brasil",
            uf: "BA",
            municipio: "Salvador",
            mandato: "2023-2027",
            foto_inicial: "RL",
            presenca: 74,
            votacoes: 298,
            projetos: 15,
            relatorias: 3,
            comissoes: ["Agricultura", "Meio Ambiente"],
            emendas_total: 31,
            valor_total: 56200000,
            nota: 6.8,
            nota_letra: "C",
            ranking: 58,
            cidades_atendidas: 22,
            area_atuacao: "Agropecuária e Meio Ambiente",
            bio: "Agricultor e empresário, em seu primeiro mandato federal, foco em questões do agronegócio baiano.",
            criterios_nota: {
                presenca: 7.4,
                votacoes: 6.5,
                producao: 6.2,
                emendas: 7.0,
                transparencia: 6.9
            },
            emendas_por_ano: { "2023": 14000000, "2024": 22000000, "2025": 20200000 },
            presenca_por_mes: [78, 72, 75, 68, 74, 70, 80, 76, 72, 75, 71, 73],
            recursos_por_area: {
                "Agricultura": 24000000,
                "Infraestrutura Rural": 18000000,
                "Saúde": 8200000,
                "Educação": 6000000
            }
        },
        {
            id: 4,
            nome: "Mariana Costa Santos",
            cargo: "Deputada Estadual",
            partido: "PSDB",
            uf: "SP",
            municipio: "Campinas",
            mandato: "2023-2027",
            foto_inicial: "MS",
            presenca: 95,
            votacoes: 524,
            projetos: 56,
            relatorias: 18,
            comissoes: ["Orçamento", "Educação", "Finanças"],
            emendas_total: 38,
            valor_total: 42300000,
            nota: 9.4,
            nota_letra: "A",
            ranking: 1,
            cidades_atendidas: 28,
            area_atuacao: "Orçamento e Educação",
            bio: "Professora universitária, terceiro mandato estadual, reconhecida pelo trabalho em transparência fiscal.",
            criterios_nota: {
                presenca: 9.5,
                votacoes: 9.6,
                producao: 9.8,
                emendas: 8.9,
                transparencia: 9.2
            },
            emendas_por_ano: { "2023": 12000000, "2024": 16500000, "2025": 13800000 },
            presenca_por_mes: [96, 98, 94, 95, 93, 97, 99, 95, 94, 96, 92, 95],
            recursos_por_area: {
                "Educação": 22000000,
                "Saúde": 12000000,
                "Cultura e Esporte": 5300000,
                "Infraestrutura": 3000000
            }
        },
        {
            id: 5,
            nome: "Fernando José Pereira",
            cargo: "Senador",
            partido: "MDB",
            uf: "RS",
            municipio: "Porto Alegre",
            mandato: "2019-2027",
            foto_inicial: "FP",
            presenca: 83,
            votacoes: 445,
            projetos: 32,
            relatorias: 9,
            comissoes: ["Infraestrutura", "Agricultura"],
            emendas_total: 78,
            valor_total: 198000000,
            nota: 7.9,
            nota_letra: "B",
            ranking: 22,
            cidades_atendidas: 89,
            area_atuacao: "Infraestrutura e Agricultura",
            bio: "Engenheiro civil, senador em segundo mandato, especializado em obras de infraestrutura no Sul do Brasil.",
            criterios_nota: {
                presenca: 8.3,
                votacoes: 8.1,
                producao: 7.5,
                emendas: 8.8,
                transparencia: 6.9
            },
            emendas_por_ano: { "2023": 58000000, "2024": 72000000, "2025": 68000000 },
            presenca_por_mes: [85, 80, 84, 82, 79, 88, 86, 83, 80, 85, 82, 81],
            recursos_por_area: {
                "Infraestrutura": 98000000,
                "Agricultura": 45000000,
                "Saúde": 28000000,
                "Educação": 18000000,
                "Outros": 9000000
            }
        },
        {
            id: 6,
            nome: "Luciana Mendes Barros",
            cargo: "Prefeita",
            partido: "Republicanos",
            uf: "RJ",
            municipio: "Rio de Janeiro",
            mandato: "2021-2025",
            foto_inicial: "LB",
            presenca: null,
            votacoes: null,
            projetos: 128,
            relatorias: null,
            comissoes: null,
            emendas_total: null,
            valor_total: 12800000000,
            nota: 7.1,
            nota_letra: "B",
            ranking: 45,
            cidades_atendidas: 1,
            area_atuacao: "Gestão Municipal",
            bio: "Economista, gestora pública com foco em modernização administrativa e atração de investimentos.",
            tipo_cargo: "executivo",
            orcamento_total: 42500000000,
            orcamento_executado: 38200000000,
            programas: 245,
            criterios_nota: {
                execucao: 7.8,
                programas: 7.2,
                orcamento: 8.1,
                eficiencia: 6.5,
                transparencia: 6.0
            },
            orcamento_por_area: {
                "Saúde": 12800000000,
                "Educação": 9500000000,
                "Infraestrutura": 6200000000,
                "Segurança": 3800000000,
                "Outros": 9400000000
            }
        },
        {
            id: 7,
            nome: "Paulo Henrique Alves",
            cargo: "Deputado Federal",
            partido: "PL",
            uf: "RJ",
            municipio: "Rio de Janeiro",
            mandato: "2023-2027",
            foto_inicial: "PA",
            presenca: 79,
            votacoes: 356,
            projetos: 19,
            relatorias: 4,
            comissoes: ["Segurança Pública", "Constituição e Justiça"],
            emendas_total: 22,
            valor_total: 38500000,
            nota: 7.2,
            nota_letra: "B",
            ranking: 41,
            cidades_atendidas: 18,
            area_atuacao: "Segurança Pública",
            bio: "Delegado de polícia aposentado, primeiro mandato federal, foco em segurança pública.",
            criterios_nota: {
                presenca: 7.9,
                votacoes: 7.2,
                producao: 6.8,
                emendas: 7.1,
                transparencia: 7.0
            },
            emendas_por_ano: { "2023": 10000000, "2024": 15000000, "2025": 13500000 },
            presenca_por_mes: [82, 76, 80, 79, 75, 82, 78, 80, 77, 81, 76, 79],
            recursos_por_area: {
                "Segurança": 18500000,
                "Saúde": 9000000,
                "Infraestrutura": 7000000,
                "Educação": 4000000
            }
        },
        {
            id: 8,
            nome: "Beatriz Nascimento Cruz",
            cargo: "Vereadora",
            partido: "PDT",
            uf: "CE",
            municipio: "Fortaleza",
            mandato: "2021-2025",
            foto_inicial: "BC",
            presenca: 98,
            votacoes: 634,
            projetos: 48,
            relatorias: 22,
            comissoes: ["Saúde", "Mulher e Família", "Meio Ambiente"],
            emendas_total: 12,
            valor_total: 8400000,
            nota: 9.6,
            nota_letra: "A",
            ranking: 2,
            cidades_atendidas: 1,
            area_atuacao: "Saúde e Direitos da Mulher",
            bio: "Enfermeira e ativista social, segunda legislatura na câmara municipal, referência em pautas sociais.",
            criterios_nota: {
                presenca: 9.8,
                votacoes: 9.7,
                producao: 9.8,
                emendas: 9.0,
                transparencia: 9.7
            },
            emendas_por_ano: { "2023": 2500000, "2024": 3200000, "2025": 2700000 },
            presenca_por_mes: [98, 100, 97, 99, 96, 98, 100, 99, 97, 98, 97, 99],
            recursos_por_area: {
                "Saúde": 4200000,
                "Assistência Social": 2800000,
                "Educação": 1400000
            }
        }
    ],

    // ============ STF MINISTROS ============
    ministrosSTF: [
        { id: 101, nome: "Alexandre de Moraes", cargo: "Presidente do STF", indicacao: "Governo Temer (2017)", sessoes_realizadas: 145, sessoes_participou: 142, votos: 312, acoes_julgadas: 1240, habeas_corpus: 892, mandados_seguranca: 456, nota: 8.1, decisoes_unanimes: 78, relatorias: 145 },
        { id: 102, nome: "Edson Fachin", cargo: "Ministro STF", indicacao: "Governo Dilma (2015)", sessoes_realizadas: 145, sessoes_participou: 138, votos: 301, acoes_julgadas: 1180, habeas_corpus: 720, mandados_seguranca: 390, nota: 7.9, decisoes_unanimes: 74, relatorias: 128 },
        { id: 103, nome: "Cármen Lúcia", cargo: "Ministra STF", indicacao: "Governo Lula I (2006)", sessoes_realizadas: 145, sessoes_participou: 144, votos: 318, acoes_julgadas: 1320, habeas_corpus: 980, mandados_seguranca: 512, nota: 8.8, decisoes_unanimes: 82, relatorias: 162 },
        { id: 104, nome: "Gilmar Mendes", cargo: "Ministro STF", indicacao: "Governo FHC (2002)", sessoes_realizadas: 145, sessoes_participou: 131, votos: 289, acoes_julgadas: 1150, habeas_corpus: 810, mandados_seguranca: 425, nota: 7.5, decisoes_unanimes: 71, relatorias: 112 },
        { id: 105, nome: "Luís Roberto Barroso", cargo: "Ministro STF", indicacao: "Governo Dilma (2013)", sessoes_realizadas: 145, sessoes_participou: 143, votos: 315, acoes_julgadas: 1290, habeas_corpus: 912, mandados_seguranca: 490, nota: 8.6, decisoes_unanimes: 80, relatorias: 155 }
    ],

    // ============ EMENDAS ============
    emendas: [
        {
            id: "EM-2024-00142",
            autor_id: 1,
            autor: "Carlos Eduardo Ferreira",
            partido: "PSD",
            uf: "SP",
            ano: 2024,
            tipo: "Emenda Individual",
            objeto: "Construção de Escola de Ensino Médio",
            valor_indicado: 4500000,
            valor_empenhado: 4500000,
            valor_pago: 3200000,
            situacao: "Em Execução",
            situacao_cor: "andamento",
            municipio: "Sorocaba",
            estado: "SP",
            regiao: "Sudeste",
            favorecido: "Prefeitura Municipal de Sorocaba",
            orgao_vinculado: "MEC - Ministério da Educação",
            instrumento: "Convênio nº 914256/2024",
            orgao_executor: "FNDE",
            obra_servico: "Construção de escola com 12 salas de aula",
            empresa_executora: "Construtora Horizonte S.A.",
            cnpj_empresa: "12.345.678/0001-90",
            status_execucao: "Em andamento - 71% concluído",
            percentual_execucao: 71,
            data_inicio: "2024-03-15",
            data_prevista: "2025-06-30",
            timeline: [
                { data: "2024-01-10", evento: "Indicação da emenda", tipo: "done" },
                { data: "2024-02-28", evento: "Aprovação no orçamento", tipo: "done" },
                { data: "2024-03-15", evento: "Assinatura do convênio", tipo: "done" },
                { data: "2024-04-20", evento: "Empenho realizado", tipo: "done" },
                { data: "2024-05-10", evento: "Início das obras", tipo: "done" },
                { data: "2025-06-30", evento: "Previsão de conclusão", tipo: "pendente" }
            ]
        },
        {
            id: "EM-2024-00389",
            autor_id: 2,
            autor: "Ana Paula Rodrigues",
            partido: "PT",
            uf: "MG",
            ano: 2024,
            tipo: "Emenda de Bancada",
            objeto: "Aquisição de equipamentos hospitalares",
            valor_indicado: 8200000,
            valor_empenhado: 8200000,
            valor_pago: 8200000,
            situacao: "Concluída",
            situacao_cor: "concluido",
            municipio: "Uberaba",
            estado: "MG",
            regiao: "Sudeste",
            favorecido: "Hospital Regional de Uberaba",
            orgao_vinculado: "MS - Ministério da Saúde",
            instrumento: "Transferência Fundo a Fundo",
            orgao_executor: "Fundo Nacional de Saúde",
            obra_servico: "Aquisição de 3 tomógrafos e equipamentos UTI",
            empresa_executora: "MedEquip Brasil Ltda.",
            cnpj_empresa: "98.765.432/0001-10",
            status_execucao: "Concluída",
            percentual_execucao: 100,
            data_inicio: "2024-01-20",
            data_prevista: "2024-08-31",
            timeline: [
                { data: "2024-01-05", evento: "Indicação da emenda", tipo: "done" },
                { data: "2024-01-20", evento: "Empenho realizado", tipo: "done" },
                { data: "2024-03-10", evento: "Licitação concluída", tipo: "done" },
                { data: "2024-05-15", evento: "Entrega dos equipamentos", tipo: "done" },
                { data: "2024-07-22", evento: "Ateste e pagamento final", tipo: "done" },
                { data: "2024-08-10", evento: "Prestação de contas aprovada", tipo: "done" }
            ]
        },
        {
            id: "EM-2024-00571",
            autor_id: 5,
            autor: "Fernando José Pereira",
            partido: "MDB",
            uf: "RS",
            ano: 2024,
            tipo: "Emenda Individual",
            objeto: "Pavimentação de estradas vicinais",
            valor_indicado: 12000000,
            valor_empenhado: 12000000,
            valor_pago: 5800000,
            situacao: "Em Execução",
            situacao_cor: "andamento",
            municipio: "Caxias do Sul",
            estado: "RS",
            regiao: "Sul",
            favorecido: "Prefeitura de Caxias do Sul",
            orgao_vinculado: "MINFRA - Ministério da Infraestrutura",
            instrumento: "Contrato de Repasse nº 882341/2024",
            orgao_executor: "DNIT",
            obra_servico: "Pavimentação de 42km de estradas vicinais",
            empresa_executora: "Via Sul Engenharia Ltda.",
            cnpj_empresa: "45.678.901/0001-23",
            status_execucao: "Em andamento - 48% concluído",
            percentual_execucao: 48,
            data_inicio: "2024-06-01",
            data_prevista: "2025-12-31",
            timeline: [
                { data: "2024-02-15", evento: "Indicação da emenda", tipo: "done" },
                { data: "2024-04-10", evento: "Aprovação e empenho", tipo: "done" },
                { data: "2024-05-20", evento: "Contrato assinado", tipo: "done" },
                { data: "2024-06-01", evento: "Início das obras", tipo: "done" },
                { data: "2025-12-31", evento: "Previsão de conclusão", tipo: "pendente" }
            ]
        },
        {
            id: "EM-2023-00198",
            autor_id: 3,
            autor: "Roberto Silveira Lima",
            partido: "União Brasil",
            uf: "BA",
            ano: 2023,
            tipo: "Emenda Individual",
            objeto: "Construção de unidade básica de saúde",
            valor_indicado: 1500000,
            valor_empenhado: 1500000,
            valor_pago: 0,
            situacao: "Paralisada",
            situacao_cor: "parado",
            municipio: "Vitória da Conquista",
            estado: "BA",
            regiao: "Nordeste",
            favorecido: "Prefeitura de Vitória da Conquista",
            orgao_vinculado: "MS - Ministério da Saúde",
            instrumento: "Convênio nº 901234/2023",
            orgao_executor: "FNS",
            obra_servico: "Construção de UBS com 8 consultórios",
            empresa_executora: "Não definida",
            cnpj_empresa: "—",
            status_execucao: "Paralisada - problemas na licitação",
            percentual_execucao: 0,
            data_inicio: null,
            data_prevista: "2024-06-30",
            timeline: [
                { data: "2023-03-20", evento: "Indicação da emenda", tipo: "done" },
                { data: "2023-06-15", evento: "Empenho realizado", tipo: "done" },
                { data: "2023-09-10", evento: "1ª licitação deserta", tipo: "stopped" },
                { data: "2024-01-15", evento: "2ª licitação anulada por recurso", tipo: "stopped" },
                { data: "2024-12-31", evento: "Nova tentativa de licitação", tipo: "pendente" }
            ]
        },
        {
            id: "EM-2025-00034",
            autor_id: 1,
            autor: "Carlos Eduardo Ferreira",
            partido: "PSD",
            uf: "SP",
            ano: 2025,
            tipo: "Emenda de Comissão",
            objeto: "Ampliação de laboratórios de informática em escolas públicas",
            valor_indicado: 6800000,
            valor_empenhado: 6800000,
            valor_pago: 1200000,
            situacao: "Em Execução",
            situacao_cor: "andamento",
            municipio: "Guarulhos",
            estado: "SP",
            regiao: "Sudeste",
            favorecido: "Secretaria Estadual de Educação SP",
            orgao_vinculado: "MEC",
            instrumento: "Termo de Compromisso nº 2025/0089",
            orgao_executor: "FNDE",
            obra_servico: "Instalação de 120 laboratórios de informática",
            empresa_executora: "TechEdu Soluções S.A.",
            cnpj_empresa: "56.789.012/0001-34",
            status_execucao: "Em andamento - 18% concluído",
            percentual_execucao: 18,
            data_inicio: "2025-02-10",
            data_prevista: "2026-01-31",
            timeline: [
                { data: "2025-01-05", evento: "Indicação da emenda", tipo: "done" },
                { data: "2025-01-28", evento: "Empenho realizado", tipo: "done" },
                { data: "2025-02-10", evento: "Contrato assinado", tipo: "done" },
                { data: "2025-03-01", evento: "Início dos serviços", tipo: "done" },
                { data: "2026-01-31", evento: "Previsão de conclusão", tipo: "pendente" }
            ]
        },
        {
            id: "EM-2024-00876",
            autor_id: 7,
            autor: "Paulo Henrique Alves",
            partido: "PL",
            uf: "RJ",
            ano: 2024,
            tipo: "Emenda Individual",
            objeto: "Aquisição de viaturas para polícia civil",
            valor_indicado: 3200000,
            valor_empenhado: 3200000,
            valor_pago: 3200000,
            situacao: "Concluída",
            situacao_cor: "concluido",
            municipio: "Nova Iguaçu",
            estado: "RJ",
            regiao: "Sudeste",
            favorecido: "Secretaria Estadual de Segurança RJ",
            orgao_vinculado: "MJSP - Ministério da Justiça",
            instrumento: "Transferência Especial",
            orgao_executor: "SENASP",
            obra_servico: "Aquisição de 45 viaturas policiais",
            empresa_executora: "AutoFrota Brasil Ltda.",
            cnpj_empresa: "67.890.123/0001-45",
            status_execucao: "Concluída",
            percentual_execucao: 100,
            data_inicio: "2024-02-01",
            data_prevista: "2024-07-31",
            timeline: [
                { data: "2024-01-10", evento: "Indicação", tipo: "done" },
                { data: "2024-02-01", evento: "Empenho e licitação", tipo: "done" },
                { data: "2024-04-15", evento: "Contrato assinado", tipo: "done" },
                { data: "2024-07-10", evento: "Entrega das viaturas", tipo: "done" },
                { data: "2024-07-28", evento: "Pagamento final", tipo: "done" }
            ]
        },
        {
            id: "EM-2024-01102",
            autor_id: 2,
            autor: "Ana Paula Rodrigues",
            partido: "PT",
            uf: "MG",
            ano: 2024,
            tipo: "Emenda Individual",
            objeto: "Construção de creche municipal",
            valor_indicado: 5200000,
            valor_empenhado: 5200000,
            valor_pago: 2100000,
            situacao: "Em Execução",
            situacao_cor: "andamento",
            municipio: "Juiz de Fora",
            estado: "MG",
            regiao: "Sudeste",
            favorecido: "Prefeitura de Juiz de Fora",
            orgao_vinculado: "MEC",
            instrumento: "Convênio nº 924562/2024",
            orgao_executor: "FNDE",
            obra_servico: "Construção de creche com capacidade de 200 crianças",
            empresa_executora: "Construções Brasil Ltda.",
            cnpj_empresa: "78.901.234/0001-56",
            status_execucao: "Em andamento - 40% concluído",
            percentual_execucao: 40,
            data_inicio: "2024-07-15",
            data_prevista: "2025-09-30",
            timeline: [
                { data: "2024-03-20", evento: "Indicação", tipo: "done" },
                { data: "2024-05-10", evento: "Empenho", tipo: "done" },
                { data: "2024-07-15", evento: "Início das obras", tipo: "done" },
                { data: "2025-09-30", evento: "Previsão de conclusão", tipo: "pendente" }
            ]
        },
        {
            id: "EM-2025-00201",
            autor_id: 5,
            autor: "Fernando José Pereira",
            partido: "MDB",
            uf: "RS",
            ano: 2025,
            tipo: "Emenda de Bancada",
            objeto: "Revitalização do Porto de Rio Grande",
            valor_indicado: 25000000,
            valor_empenhado: 25000000,
            valor_pago: 0,
            situacao: "Empenhada",
            situacao_cor: "pendente",
            municipio: "Rio Grande",
            estado: "RS",
            regiao: "Sul",
            favorecido: "Autoridade Portuária de Rio Grande",
            orgao_vinculado: "MTPA - Ministério dos Transportes",
            instrumento: "Contrato de Repasse nº 901234/2025",
            orgao_executor: "ANTAQ",
            obra_servico: "Dragagem e revitalização do cais",
            empresa_executora: "A definir - licitação em andamento",
            cnpj_empresa: "—",
            status_execucao: "Aguardando conclusão da licitação",
            percentual_execucao: 0,
            data_inicio: null,
            data_prevista: "2026-12-31",
            timeline: [
                { data: "2025-01-20", evento: "Indicação da emenda", tipo: "done" },
                { data: "2025-02-28", evento: "Empenho realizado", tipo: "done" },
                { data: "2025-04-10", evento: "Publicação do edital", tipo: "done" },
                { data: "2025-06-30", evento: "Previsão de conclusão da licitação", tipo: "pendente" }
            ]
        }
    ],

    // ============ CIDADES/ESTADOS ============
    estados: [
        { uf: "SP", nome: "São Paulo", regiao: "Sudeste", valor_recebido: 1245000000, emendas_count: 2840, rank: 1, cor_intensity: 0.9 },
        { uf: "MG", nome: "Minas Gerais", regiao: "Sudeste", valor_recebido: 892000000, emendas_count: 2120, rank: 2, cor_intensity: 0.8 },
        { uf: "RJ", nome: "Rio de Janeiro", regiao: "Sudeste", valor_recebido: 756000000, emendas_count: 1890, rank: 3, cor_intensity: 0.75 },
        { uf: "BA", nome: "Bahia", regiao: "Nordeste", valor_recebido: 698000000, emendas_count: 1720, rank: 4, cor_intensity: 0.7 },
        { uf: "RS", nome: "Rio Grande do Sul", regiao: "Sul", valor_recebido: 645000000, emendas_count: 1580, rank: 5, cor_intensity: 0.68 },
        { uf: "PR", nome: "Paraná", regiao: "Sul", valor_recebido: 578000000, emendas_count: 1420, rank: 6, cor_intensity: 0.62 },
        { uf: "SC", nome: "Santa Catarina", regiao: "Sul", valor_recebido: 456000000, emendas_count: 1180, rank: 7, cor_intensity: 0.55 },
        { uf: "GO", nome: "Goiás", regiao: "Centro-Oeste", valor_recebido: 398000000, emendas_count: 980, rank: 8, cor_intensity: 0.5 },
        { uf: "CE", nome: "Ceará", regiao: "Nordeste", valor_recebido: 378000000, emendas_count: 920, rank: 9, cor_intensity: 0.48 },
        { uf: "PE", nome: "Pernambuco", regiao: "Nordeste", valor_recebido: 345000000, emendas_count: 890, rank: 10, cor_intensity: 0.45 },
        { uf: "MA", nome: "Maranhão", regiao: "Nordeste", valor_recebido: 312000000, emendas_count: 820, rank: 11, cor_intensity: 0.42 },
        { uf: "PA", nome: "Pará", regiao: "Norte", valor_recebido: 289000000, emendas_count: 760, rank: 12, cor_intensity: 0.40 },
        { uf: "MT", nome: "Mato Grosso", regiao: "Centro-Oeste", valor_recebido: 256000000, emendas_count: 640, rank: 13, cor_intensity: 0.38 },
        { uf: "MS", nome: "Mato Grosso do Sul", regiao: "Centro-Oeste", valor_recebido: 234000000, emendas_count: 590, rank: 14, cor_intensity: 0.35 },
        { uf: "PB", nome: "Paraíba", regiao: "Nordeste", valor_recebido: 212000000, emendas_count: 540, rank: 15, cor_intensity: 0.32 },
        { uf: "RN", nome: "Rio Grande do Norte", regiao: "Nordeste", valor_recebido: 198000000, emendas_count: 510, rank: 16, cor_intensity: 0.30 },
        { uf: "PI", nome: "Piauí", regiao: "Nordeste", valor_recebido: 187000000, emendas_count: 480, rank: 17, cor_intensity: 0.28 },
        { uf: "AL", nome: "Alagoas", regiao: "Nordeste", valor_recebido: 176000000, emendas_count: 450, rank: 18, cor_intensity: 0.26 },
        { uf: "SE", nome: "Sergipe", regiao: "Nordeste", valor_recebido: 145000000, emendas_count: 380, rank: 19, cor_intensity: 0.24 },
        { uf: "TO", nome: "Tocantins", regiao: "Norte", valor_recebido: 134000000, emendas_count: 350, rank: 20, cor_intensity: 0.22 },
        { uf: "ES", nome: "Espírito Santo", regiao: "Sudeste", valor_recebido: 198000000, emendas_count: 520, rank: 21, cor_intensity: 0.30 },
        { uf: "AM", nome: "Amazonas", regiao: "Norte", valor_recebido: 123000000, emendas_count: 320, rank: 22, cor_intensity: 0.20 },
        { uf: "RO", nome: "Rondônia", regiao: "Norte", valor_recebido: 112000000, emendas_count: 290, rank: 23, cor_intensity: 0.18 },
        { uf: "AC", nome: "Acre", regiao: "Norte", valor_recebido: 98000000, emendas_count: 260, rank: 24, cor_intensity: 0.16 },
        { uf: "AP", nome: "Amapá", regiao: "Norte", valor_recebido: 87000000, emendas_count: 230, rank: 25, cor_intensity: 0.14 },
        { uf: "RR", nome: "Roraima", regiao: "Norte", valor_recebido: 76000000, emendas_count: 200, rank: 26, cor_intensity: 0.12 },
        { uf: "DF", nome: "Distrito Federal", regiao: "Centro-Oeste", valor_recebido: 320000000, emendas_count: 840, rank: 27, cor_intensity: 0.43 }
    ],

    cidades_top: [
        { nome: "São Paulo", uf: "SP", valor: 234000000, emendas: 540, populacao: "12.3M" },
        { nome: "Rio de Janeiro", uf: "RJ", valor: 198000000, emendas: 458, populacao: "6.8M" },
        { nome: "Belo Horizonte", uf: "MG", valor: 156000000, emendas: 380, populacao: "2.7M" },
        { nome: "Salvador", uf: "BA", valor: 145000000, emendas: 342, populacao: "2.9M" },
        { nome: "Fortaleza", uf: "CE", valor: 138000000, emendas: 320, populacao: "2.7M" },
        { nome: "Manaus", uf: "AM", valor: 112000000, emendas: 275, populacao: "2.1M" },
        { nome: "Curitiba", uf: "PR", valor: 108000000, emendas: 265, populacao: "1.9M" },
        { nome: "Recife", uf: "PE", valor: 98000000, emendas: 241, populacao: "1.6M" },
        { nome: "Porto Alegre", uf: "RS", valor: 92000000, emendas: 228, populacao: "1.5M" },
        { nome: "Belém", uf: "PA", valor: 87000000, emendas: 215, populacao: "1.4M" }
    ],

    // ============ REGIÕES ============
    regioes: [
        { nome: "Sudeste", valor: 3093000000, estados: 4, percentual: 37.8 },
        { nome: "Nordeste", valor: 2451000000, estados: 9, percentual: 30.0 },
        { nome: "Sul", valor: 1679000000, estados: 3, percentual: 20.5 },
        { nome: "Centro-Oeste", valor: 1208000000, estados: 4, percentual: 14.8 },
        { nome: "Norte", valor: 919000000, estados: 7, percentual: 11.2 }
    ],

    // ============ STATS GERAIS ============
    stats_gerais: {
        total_politicos_monitorados: 6842,
        total_emendas_2024: 28540,
        valor_total_emendas: 48200000000,
        valor_executado: 32100000000,
        percentual_execucao: 66.6,
        municipios_atendidos: 4218,
        obras_ativas: 12840,
        obras_concluidas: 28920,
        data_atualizacao: "25/03/2025"
    },

    // ============ EXECUÇÃO POR ANO ============
    execucao_anual: {
        anos: ["2020", "2021", "2022", "2023", "2024", "2025"],
        indicado: [28500, 32000, 35800, 42000, 48200, 22000],
        empenhado: [26200, 29800, 33100, 39500, 44800, 18500],
        pago: [22100, 25600, 29400, 35200, 40100, 8200]
    }
};

// ============ HELPERS ============
function formatCurrency(value) {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}K`;
    return `R$ ${value.toLocaleString('pt-BR')}`;
}

function formatCurrencyFull(value) {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatNumber(value) {
    return value.toLocaleString('pt-BR');
}

function getStatusBadge(status) {
    const map = {
        "Concluída": "badge-green",
        "Em Execução": "badge-blue",
        "Paralisada": "badge-red",
        "Empenhada": "badge-orange"
    };
    return map[status] || "badge-gray";
}

function getPoliticoById(id) {
    return RadarData.politicos.find(p => p.id === id);
}

function getEmendaById(id) {
    return RadarData.emendas.find(e => e.id === id);
}

function getEmendasByAutor(autor_id) {
    return RadarData.emendas.filter(e => e.autor_id === autor_id);
}

function getEmendasByEstado(uf) {
    return RadarData.emendas.filter(e => e.estado === uf);
}
