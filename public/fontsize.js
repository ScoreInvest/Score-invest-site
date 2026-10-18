// Ajusta o tamanho da fonte do texto de leitura (parágrafos), salvando a escolha do usuário.
const PASSO = 0.1;
const MINIMO = 0.9;
const MAXIMO = 1.3;

function getEscalaSalva() {
  const salvo = parseFloat(localStorage.getItem('fontScale'));
  return isNaN(salvo) ? 1 : salvo;
}

function aplicarEscala(escala) {
  document.documentElement.style.setProperty('--font-scale', escala);
  localStorage.setItem('fontScale', escala);
}

const btnDec = document.getElementById('fontDec');
const btnInc = document.getElementById('fontInc');

if (btnDec && btnInc) {
  let escalaAtual = getEscalaSalva();
  aplicarEscala(escalaAtual);

  btnDec.addEventListener('click', () => {
    escalaAtual = Math.max(MINIMO, +(escalaAtual - PASSO).toFixed(2));
    aplicarEscala(escalaAtual);
  });

  btnInc.addEventListener('click', () => {
    escalaAtual = Math.min(MAXIMO, +(escalaAtual + PASSO).toFixed(2));
    aplicarEscala(escalaAtual);
  });
}