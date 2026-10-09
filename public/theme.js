(function () {
  var root = document.documentElement;
  var CHAVE = 'tema';

  function lerSalvo() {
    try { return localStorage.getItem(CHAVE); } catch (e) { return null; }
  }

  function aplicar(tema) {
    root.setAttribute('data-theme', tema);
    var botao = document.getElementById('themeToggle');
    if (botao) {
      botao.setAttribute('aria-checked', tema === 'dark' ? 'true' : 'false');
      botao.setAttribute('title', tema === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro');
    }
  }

  aplicar(lerSalvo() === 'light' ? 'light' : 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    var botao = document.getElementById('themeToggle');
    if (!botao) return;
    aplicar(root.getAttribute('data-theme'));
    botao.addEventListener('click', function () {
      var novo = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      aplicar(novo);
      try { localStorage.setItem(CHAVE, novo); } catch (e) {}
    });
  });
})();