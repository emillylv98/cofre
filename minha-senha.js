// Gera uma senha aleatória do tamanho que a pessoa escolher.
// Usa crypto.getRandomValues, o sorteio seguro do navegador (Math.random não serve para senhas).

const CARACTERES = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?-_";
const TAMANHO_MINIMO = 8;
const TAMANHO_MAXIMO = 64;

function sortearIndice(limite) {
  const numero = new Uint32Array(1);
  crypto.getRandomValues(numero);
  return numero[0] % limite;
}

function gerarSenha(tamanho) {
  let senha = "";
  for (let i = 0; i < tamanho; i++) {
    senha += CARACTERES[sortearIndice(CARACTERES.length)];
  }
  return senha;
}

function mostrarSenha() {
  const campo = document.getElementById("senha-tamanho").value;
  const saida = document.getElementById("senha-resultado");
  const detalhe = document.getElementById("senha-detalhe");
  const tamanho = Number(campo);

  if (campo === "" || !Number.isInteger(tamanho) || tamanho < TAMANHO_MINIMO || tamanho > TAMANHO_MAXIMO) {
    saida.className = "resultado ruim";
    saida.textContent = "Digite um número inteiro de " + TAMANHO_MINIMO + " a " + TAMANHO_MAXIMO + ".";
    detalhe.textContent = "";
    return;
  }

  const bits = tamanho * Math.log2(CARACTERES.length);
  saida.className = "resultado " + (bits >= 60 ? "bom" : "ruim");
  saida.textContent = gerarSenha(tamanho);
  detalhe.textContent = "Força estimada: " + bits.toFixed(1).replace(".", ",") + " bits.";
}

document.getElementById("senha-botao").addEventListener("click", mostrarSenha);
