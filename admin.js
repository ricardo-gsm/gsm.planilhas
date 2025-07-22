// Protege a página: só admins podem acessar
window.onload = function () {
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

  if (!usuarioLogado || !usuarios[usuarioLogado] || usuarios[usuarioLogado].perfil !== 'admin') {
    alert('Acesso negado. Esta área é restrita a administradores.');
    window.location.href = 'index.html';
    return;
  }

  carregarUsuarios();
};

// Exibe todos os usuários na tabela
function carregarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');
  const tbody = document.getElementById('tabelaUsuarios');
  tbody.innerHTML = '';

  Object.keys(usuarios).forEach((usuario) => {
    const { email, perfil } = usuarios[usuario];

    const tr = document.createElement('tr');

    const isSelf = usuario === usuarioLogado;

    tr.innerHTML = `
      <td style="padding: 8px;">${usuario}</td>
      <td style="padding: 8px;">${email}</td>
      <td style="padding: 8px;">${perfil}</td>
      <td style="padding: 8px;">
        <select onchange="alterarPerfil('${usuario}', this.value)" ${isSelf ? 'disabled' : ''}>
          <option value="usuario" ${perfil === 'usuario' ? 'selected' : ''}>usuario</option>
          <option value="admin" ${perfil === 'admin' ? 'selected' : ''}>admin</option>
        </select>
      </td>
      <td style="padding: 8px; text-align: center;">
        ${isSelf ? '---' : `<button onclick="excluirUsuario('${usuario}')">🗑️</button>`}
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function excluirUsuario(usuario) {
  if (confirm(`Tem certeza que deseja excluir o usuário "${usuario}"? Essa ação não pode ser desfeita.`)) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
    delete usuarios[usuario];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert(`Usuário "${usuario}" foi excluído.`);
    carregarUsuarios();
  }
}

// Altera o perfil de um usuário
function alterarPerfil(usuario, novoPerfil) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
  if (usuarios[usuario]) {
    usuarios[usuario].perfil = novoPerfil;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert(`Perfil de "${usuario}" alterado para "${novoPerfil}".`);
    carregarUsuarios();
  }
}

// Função para voltar ao dashboard
function voltarDashboard() {
  window.location.href = 'dashboard.html';
}

// Função para logout
function fazerLogout() {
  sessionStorage.removeItem('usuarioLogado');
  window.location.href = 'index.html';
}
