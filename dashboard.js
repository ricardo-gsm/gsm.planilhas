function mostrarMensagem(texto, cor = 'black') {
  const div = document.getElementById('mensagem');
  div.innerText = texto;
  div.style.color = cor;
}

function mostrarDashboard() {
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');
  const perfil = sessionStorage.getItem('perfilUsuario');

  if (!usuarioLogado) {
    // Se não estiver logado, volta para a página de login
    window.location.href = 'index.html';
    return;
  }

  // Mostra nome do usuário
  document.getElementById('nomeUsuario').innerText = usuarioLogado;

  // Mostra o link da planilha
  document.getElementById('linkPlanilhaContainer').style.display = 'block';

  // Mostra link da área de administração só para admin
  if (perfil === 'admin') {
    document.getElementById('linkAdminContainer').style.display = 'block';
  }
}

function fazerLogout() {
  sessionStorage.removeItem('usuarioLogado');
  sessionStorage.removeItem('perfilUsuario');
  mostrarMensagem('Logout feito com sucesso!', 'black');

  // Redireciona para login
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// Chama quando a página carregar
window.onload = mostrarDashboard;
