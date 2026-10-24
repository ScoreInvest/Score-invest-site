
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

            backgroundColor: function(context) {
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
                    label: function(context) {
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

                    callback: function(valor) {
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
                    label: function(context) {
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

        afterDatasetsDraw: function(chart) {
            const ctx = chart.ctx;

            chart.getDatasetMeta(0).data.forEach(function(arco, i) {
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

/* Watchlist config */

const linksMenu = document.querySelectorAll(
    '.menu-item[data-pagina]'
);

const paginaDashboard = document.querySelector(
    '.pagina-dashboard'
);

const paginaWatchlist = document.querySelector(
    '.pagina-watchlist'
);

linksMenu.forEach(link => {
    link.addEventListener('click', evento => {
        evento.preventDefault();

        const paginaSelecionada = link.dataset.pagina;

        paginaDashboard.hidden =
            paginaSelecionada !== 'dashboard';

        paginaWatchlist.hidden =
            paginaSelecionada !== 'watchlist';

        linksMenu.forEach(item => {
            item.classList.toggle('ativo', item === link);
        });
    });
});
