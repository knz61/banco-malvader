const api = "http://localhost:3000/api";

document.getElementById("form-saldo").addEventListener("submit", async (e) => {
  e.preventDefault();
  const numero = document.getElementById("numeroContaSaldo").value;

  const res = await fetch(`${api}/operacoes/saldo/${numero}`);
  const data = await res.json();
  document.getElementById("resultado").innerText = res.ok
    ? `Saldo atual: R$ ${data.saldo}`
    : data.mensagem;
});

document.getElementById("form-extrato").addEventListener("submit", async (e) => {
  e.preventDefault();
  const numero = document.getElementById("numeroContaExtrato").value;

  const res = await fetch(`${api}/relatorios/extrato/${numero}`);
  const data = await res.json();

  if (!res.ok) {
    document.getElementById("resultado").innerText = data.mensagem;
  } else {
    let texto = "Transações:\n\n";
    data.forEach(t => {
      texto += `${t.data_hora} | ${t.tipo_transacao} | R$ ${t.valor} | ${t.descricao || ''}\n`;
    });
    document.getElementById("resultado").innerText = texto;
  }
});
