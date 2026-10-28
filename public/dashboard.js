
const coresAtivos = [
    '#18c990',
    '#078cf0',
    '#6746c8',
    '#f6b800',
    '#19a4b8',
    '#506b91',
    '#9aaec6'
];


const nomesAtivos = [
    'PETR4',
    'VALE3',
    'ITUB4',
    'BBAS3',
    'WEGE3',
    'ABEV3',
    'BBDC4',
    'B3SA3',
    'RENT3',
    'EQTL3',
    'SUZB3',
    'PRIO3',
    'RADL3',
    'VIVT3',
    'CPLE6',
    'EGIE3',
    'MGLU3',
    'CSNA3'
];


const variacoes = [
    12.6,
    8.9,
    6.3,
    4.8,
    3.7,
    2.9,
    2.5,
    7.2,
    5.4,
    4.1,
    6.8,
    3.2,
    -2.7,
    -4.1,
    -6.8,
    -8.5,
    -3.2,
    -5.4
];

// Gráfico de barras: desempenho dos ativos

const ctxBarras = document.getElementById('graficoBarras');

new Chart(ctxBarras, {
    type: 'bar',

    data: {
        labels: nomesAtivos,

        datasets: [{
            label: 'Variação nos últimos 30 dias',
            data: variacoes,

            backgroundColor: function (context) {
                return context.raw >= 0
                    ? '#20b875'
                    : '#e65360';
            },

            borderRadius: 2,
            borderSkipped: false,
            barPercentage: 0.7,
            categoryPercentage: 0.8
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },

            tooltip: {
                callbacks: {
                    label: function (context) {
                        const valor = context.raw;

                        return 'Variação: ' +
                            (valor > 0 ? '+' : '') +
                            valor.toLocaleString('pt-BR', {
                                minimumFractionDigits: 1,
                                maximumFractionDigits: 1
                            }) + '%';
                    }
                }
            }
        },

        scales: {
            x: {
                grid: {
                    display: false
                },

                ticks: {
                    color: '#a0aaa8',
                    maxRotation: 45,
                    minRotation: 45,
                    autoSkip: false,
                    font: {
                        size: 10
                    }
                },

                border: {
                    color: '#303a38'
                }
            },

            y: {
                min: -10,
                max: 15,

                ticks: {
                    stepSize: 5,
                    color: '#a0aaa8',

                    callback: function (valor) {
                        return valor + '%';
                    }
                },

                grid: {
                    color: '#222a2c'
                },

                border: {
                    color: '#303a38'
                }
            }
        }
    }
});

// Gráfico de rosca: distribuição da carteira
// As porcentagens representam a participação no valor investido.

const ctxRosca = document.getElementById('graficoRosca');

new Chart(ctxRosca, {
    type: 'doughnut',

    data: {
        labels: [
            'PETR4',
            'VALE3',
            'ITUB4',
            'BBAS3',
            'WEGE3',
            'ABEV3',
            'Outros'
        ],

        datasets: [{
            data: [
                24.78,
                18.00,
                12.00,
                10.00,
                8.00,
                7.22,
                20.00
            ],

            backgroundColor: coresAtivos,
            borderWidth: 2,
            borderColor: '#101719',
            hoverOffset: 4
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '48%',

        plugins: {
            legend: {
                position: 'right',

                labels: {
                    color: '#a0aaa8',
                    padding: 12,
                    boxWidth: 9,
                    boxHeight: 9,
                    usePointStyle: true,
                    pointStyle: 'circle',

                    font: {
                        size: 11
                    }
                }
            },

            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.label + ': ' +
                            context.raw.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }) + '%';
                    }
                }
            }
        }
    },

    plugins: [{
        id: 'rotulosRosca',

        afterDatasetsDraw: function (chart) {
            const ctx = chart.ctx;

            chart.getDatasetMeta(0).data.forEach(function (arco, i) {
                const valor = chart.data.datasets[0].data[i];
                const posicao = arco.tooltipPosition();

                ctx.save();
                ctx.fillStyle = '#f4f6f5';
                ctx.font = 'bold 10px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                ctx.fillText(
                    valor.toLocaleString('pt-BR') + '%',
                    posicao.x,
                    posicao.y
                );

                ctx.restore();
            });
        }
    }]
});

const linksMenu = document.querySelectorAll(
    '.menu-item[data-pagina]'
);

const paginaDashboard = document.querySelector(
    '.pagina-dashboard'
);

const paginaWatchlist = document.querySelector(
    '.pagina-watchlist'
);

const paginaRelatorios = document.querySelector(
    '.pagina-relatorios'
);
const paginaCarteira = document.querySelector(
    '.pagina-carteira'
);

linksMenu.forEach(link => {
    link.addEventListener('click', evento => {


        if (link.dataset.pagina === 'carteira') {
            return;
        }

       
        evento.preventDefault();

        const paginaSelecionada = link.dataset.pagina;

        paginaDashboard.hidden =
            paginaSelecionada !== 'dashboard';

        paginaWatchlist.hidden =
            paginaSelecionada !== 'watchlist';

        paginaRelatorios.hidden =
            paginaSelecionada !== 'relatorios';

        if (paginaCarteira) {
            paginaCarteira.hidden =
                paginaSelecionada !== 'carteira';
        }


        linksMenu.forEach(item => {
            item.classList.toggle(
                'ativo',
                item === link
            );
        });

        if (paginaSelecionada === 'relatorios') {
            requestAnimationFrame(() => {
                Chart.getChart('relatorioGraficoBarras')?.resize();
                Chart.getChart('relatorioGraficoRosca')?.resize();
            });
        }
    });
});


const parametrosURL = new URLSearchParams(window.location.search);
const paginaInicial = parametrosURL.get('pagina');

if (paginaInicial === 'watchlist' || paginaInicial === 'relatorios') {
    paginaDashboard.hidden = true;
    paginaWatchlist.hidden = paginaInicial !== 'watchlist';
    paginaRelatorios.hidden = paginaInicial !== 'relatorios';

    linksMenu.forEach(item => {
        item.classList.toggle(
            'ativo',
            item.dataset.pagina === paginaInicial
        );
    });
}



const ctxRelatorioBarras = document.getElementById(
    'relatorioGraficoBarras'
);

const ctxRelatorioRosca = document.getElementById(
    'relatorioGraficoRosca'
);

if (ctxRelatorioBarras && ctxRelatorioRosca) {

    new Chart(ctxRelatorioBarras, {
        type: 'bar',

        data: {
            labels: nomesAtivos,

            datasets: [{
                label: 'Variação nos últimos 30 dias',
                data: variacoes,

                backgroundColor: function (context) {
                    return context.raw >= 0
                        ? '#20b875'
                        : '#e65360';
                },

                borderRadius: 2,
                borderSkipped: false
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                x: {
                    ticks: {
                        color: '#52605a',
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                            size: 9
                        }
                    },

                    grid: {
                        display: false
                    }
                },

                y: {
                    min: -10,
                    max: 15,

                    ticks: {
                        color: '#52605a',

                        callback: function (valor) {
                            return valor + '%';
                        }
                    },

                    grid: {
                        color: '#e2e8e5'
                    }
                }
            }
        }
    });

    new Chart(ctxRelatorioRosca, {
        type: 'doughnut',

        data: {
            labels: [
                'PETR4',
                'VALE3',
                'ITUB4',
                'BBAS3',
                'WEGE3',
                'ABEV3',
                'Outros'
            ],

            datasets: [{
                data: [
                    24.78,
                    18.00,
                    12.00,
                    10.00,
                    8.00,
                    7.22,
                    20.00
                ],

                backgroundColor: coresAtivos,
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '48%',

            plugins: {
                legend: {
                    position: 'right',

                    labels: {
                        color: '#52605a',
                        padding: 10,
                        boxWidth: 9,
                        boxHeight: 9,
                        usePointStyle: true,

                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });
}

const botaoPerfil = document.getElementById('botaoPerfil');
const menuPerfil = document.getElementById('menuPerfil');

const botaoCodigoCliente = document.getElementById('botaoCodigoCliente');
const formularioCliente = document.getElementById('formularioCliente');

// Abre e fecha o menu do perfil
botaoPerfil.addEventListener('click', function () {
    menuPerfil.hidden = !menuPerfil.hidden;
});

// Abre e fecha o formulário do código
botaoCodigoCliente.addEventListener('click', function () {
    formularioCliente.hidden = !formularioCliente.hidden;
});

// Acessa a dashboard do cliente
formularioCliente.addEventListener('submit', function (event) {
    event.preventDefault();

    const codigo = document.getElementById('codigoCliente').value.trim();

    if (codigo === '001') {
        window.location.href = 'dashboard-cliente-1.html';
    } else if (codigo === '002') {
        window.location.href = 'dashboard-cliente-2.html';
    } else {
        alert('Código do cliente inválido!');
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. TROCA DE PÁGINAS DA SIDEBAR ---
    const menuLinks = document.querySelectorAll('.sidebar .menu-item');
    const paginas = {
        dashboard: document.querySelector('.pagina-dashboard'),
        watchlist: document.querySelector('.pagina-watchlist'),
        carteira: document.querySelector('.pagina-carteira'),
        relatorios: document.querySelector('.pagina-relatorios')
    };

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const paginaAlvo = link.getAttribute('data-pagina');

            // Atualiza classe ativa no menu
            menuLinks.forEach(item => item.classList.remove('ativo'));
            link.classList.add('ativo');

            // Esconde todas e mostra apenas a selecionada
            Object.keys(paginas).forEach(chave => {
                if (paginas[chave]) {
                    paginas[chave].hidden = (chave !== paginaAlvo);
                }
            });
        });
    });

    // --- 2. GERENCIAMENTO DA CARTEIRA ---
    // Dados iniciais de exemplo
    let carteira = [
        { id: 1, ativo: 'PETR4', tipo: 'Ação', quantidade: 200, precoMedio: 30.50 },
        { id: 2, ativo: 'VALE3', tipo: 'Ação', quantidade: 100, precoMedio: 62.00 },
        { id: 3, ativo: 'HGLG11', tipo: 'FII', quantidade: 50, precoMedio: 160.00 }
    ];

    const corpoTabela = document.getElementById('corpoTabelaCarteira');
    const painelFormAtivo = document.getElementById('painelFormAtivo');
    const btnAbrirModal = document.getElementById('btnAbrirModalAtivo');
    const btnCancelarForm = document.getElementById('btnCancelarForm');
    const formAdicionarAtivo = document.getElementById('formAdicionarAtivo');

    // Função para formatar Moeda (BRL)
    const formatarMoeda = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Renderizar tabela da carteira
    function renderizarCarteira() {
        if (!corpoTabela) return;
        corpoTabela.innerHTML = '';

        if (carteira.length === 0) {
            corpoTabela.innerHTML = `<tr><td colspan="6" style="text-align:center; color: #888;">Nenhum ativo cadastrado.</td></tr>`;
            return;
        }

        carteira.forEach(item => {
            const total = item.quantidade * item.precoMedio;
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td><strong>${item.ativo}</strong></td>
                <td>${item.tipo}</td>
                <td>${item.quantidade}</td>
                <td>${formatarMoeda(item.precoMedio)}</td>
                <td><strong>${formatarMoeda(total)}</strong></td>
                <td>
                    <button class="btn-excluir" onclick="removerAtivo(${item.id})">Excluir</button>
                </td>
            `;
            corpoTabela.appendChild(tr);
        });
    }

    // Abrir/Fechar Formulário
    if (btnAbrirModal) {
        btnAbrirModal.addEventListener('click', () => {
            painelFormAtivo.hidden = !painelFormAtivo.hidden;
        });
    }

    if (btnCancelarForm) {
        btnCancelarForm.addEventListener('click', () => {
            painelFormAtivo.hidden = true;
            formAdicionarAtivo.reset();
        });
    }

    // Adicionar Ativo
    if (formAdicionarAtivo) {
        formAdicionarAtivo.addEventListener('submit', (e) => {
            e.preventDefault();

            const novoAtivo = {
                id: Date.now(),
                ativo: document.getElementById('codigoAtivo').value.toUpperCase(),
                tipo: document.getElementById('tipoAtivo').value,
                quantidade: parseInt(document.getElementById('quantidadeAtivo').value),
                precoMedio: parseFloat(document.getElementById('precoMedio').value)
            };

            carteira.push(novoAtivo);
            renderizarCarteira();

            // Limpa e oculta o formulário
            formAdicionarAtivo.reset();
            painelFormAtivo.hidden = true;
        });
    }

    // Excluir Ativo da Carteira
    window.removerAtivo = function(id) {
        carteira = carteira.filter(item => item.id !== id);
        renderizarCarteira();
    };

    // Inicialização
    renderizarCarteira();
});