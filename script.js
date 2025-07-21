function mostrarMensagem(texto, cor = 'black') {
  const div = document.getElementById('mensagem');
  div.innerText = texto;
  div.style.color = cor;
}

function fazerCadastro() {
  const usuario = document.getElementById('cadastroUsuario').value.trim();
  const email = document.getElementById('cadastroEmail').value.trim();
  const senha = document.getElementById('cadastroSenha').value;

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

  // Validação simples de e-mail
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    document.getElementById('mensagem').textContent = 'E-mail inválido. Verifique e tente novamente.';
    return;
  }

  if (usuarios[usuario]) {
    document.getElementById('mensagem').textContent = 'Usuário já existe!';
  } else {
    usuarios[usuario] = {
      senha: senha,
      email: email
    };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    document.getElementById('mensagem').textContent = 'Usuário cadastrado com sucesso!';
    document.getElementById('cadastroUsuario').value = '';
    document.getElementById('cadastroEmail').value = '';
    document.getElementById('cadastroSenha').value = '';
  }
}

function fazerLogin() {
  const usuario = document.getElementById('loginUsuario').value;
  const senha = document.getElementById('loginSenha').value;
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

  if (usuarios[usuario] && usuarios[usuario] === senha) {
    sessionStorage.setItem('usuarioLogado', usuario);
    document.getElementById('mensagem').textContent = 'Login bem-sucedido!';

    // Mostra o link imediatamente após o login
    document.getElementById('linkPlanilhaContainer').style.display = 'block';

    // Opcional: desabilita campos após login
    document.getElementById('loginUsuario').disabled = true;
    document.getElementById('loginSenha').disabled = true;
  } else {
    document.getElementById('mensagem').textContent = 'Usuário ou senha inválidos.';
    document.getElementById('linkPlanilhaContainer').style.display = 'none';
  }
}


function toggleSenha(idCampo, el) {
  const campo = document.getElementById(idCampo);
  const visivel = campo.type === 'text';
  campo.type = visivel ? 'password' : 'text';
  el.textContent = visivel ? '👁️' : '🙈';
}

function mostrarPlanilha() {
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');
  if (usuarioLogado) {
    document.getElementById('linkPlanilhaContainer').style.display = 'block';
  } else {
    document.getElementById('linkPlanilhaContainer').style.display = 'none';
  }
}

// Para manter o estado caso a página seja recarregada
window.onload = function () {
  mostrarPlanilha();
};