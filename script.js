function mostrarMensagem(texto, cor = 'black') {
  const div = document.getElementById('mensagem');
  div.innerText = texto;
  div.style.color = cor;
}

async function gerarHash(senha) {
  const encoder = new TextEncoder();
  const data = encoder.encode(senha);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function fazerCadastro() {
  const usuario = document.getElementById('cadastroUsuario').value.trim();
  const email = document.getElementById('cadastroEmail').value.trim();
  const senha = document.getElementById('cadastroSenha').value;

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    mostrarMensagem('E-mail inválido. Verifique e tente novamente.', 'red');
    return;
  }

  if (usuarios[usuario]) {
    mostrarMensagem('Usuário já existe!', 'red');
    return;
  }

  const senhaHash = await gerarHash(senha);

  // Se for o primeiro usuário cadastrado, define perfil como admin, senão usuário
  const perfil = Object.keys(usuarios).length === 0 ? 'admin' : 'usuario';

  usuarios[usuario] = {
    senha: senhaHash,
    email: email,
    perfil: perfil
  };

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  mostrarMensagem(`Usuário cadastrado com sucesso! Seu perfil é: ${perfil.toUpperCase()}`, 'green');

  // Limpa campos do cadastro
  document.getElementById('cadastroUsuario').value = '';
  document.getElementById('cadastroEmail').value = '';
  document.getElementById('cadastroSenha').value = '';
}

async function fazerLogin() {
  const usuario = document.getElementById('loginUsuario').value.trim();
  const senha = document.getElementById('loginSenha').value;
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

  const senhaHash = await gerarHash(senha);

  if (usuarios[usuario] && usuarios[usuario].senha === senhaHash) {
	sessionStorage.setItem('usuarioLogado', usuario);
	sessionStorage.setItem('perfilUsuario', usuarios[usuario].perfil);  // salvar perfil
	mostrarMensagem('Login bem-sucedido!', 'green');

	// Redireciona para o dashboard
	window.location.href = 'dashboard.html';

  } else {
	mostrarMensagem('Usuário ou senha inválidos.', 'red');
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
    document.getElementById('loginUsuario').disabled = true;
    document.getElementById('loginSenha').disabled = true;
  } else {
    document.getElementById('linkPlanilhaContainer').style.display = 'none';
    document.getElementById('loginUsuario').disabled = false;
    document.getElementById('loginSenha').disabled = false;
  }
}

function fazerLogout() {
  sessionStorage.clear();
  mostrarMensagem('Logout feito com sucesso!', 'black');

  // Limpa e reativa campos do login
  document.getElementById('loginUsuario').value = '';
  document.getElementById('loginSenha').value = '';
  document.getElementById('loginUsuario').disabled = false;
  document.getElementById('loginSenha').disabled = false;

  // Oculta elementos pós-login
  document.getElementById('linkPlanilhaContainer').style.display = 'none';
}

// Mantém estado caso a página seja recarregada
window.onload = function () {
  mostrarPlanilha();
};
