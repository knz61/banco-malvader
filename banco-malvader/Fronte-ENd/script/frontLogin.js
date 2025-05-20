const apiUrl = "http://localhost:3000/api";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("senha").value;
  const otp = document.getElementById("otp").value;

  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cpf, senha, otp })
  });

  const data = await res.json();
  const mensagem = document.getElementById("mensagem");

  if (res.ok) {
    mensagem.innerText = data.mensagem;
    if (data.tipo_usuario === "CLIENTE") {
      window.location.href = "cliente.html";
    } else {
      window.location.href = "adm.html";
    }
  } else {
    mensagem.innerText = data.mensagem || "Erro ao fazer login.";
  }
});

async function gerarOtp() {
  const cpf = document.getElementById("cpf").value;
  if (!cpf) return alert("Informe o CPF antes de gerar OTP.");

  const res = await fetch(`${apiUrl}/auth/gerar-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cpf })
  });

  const data = await res.json();
  alert(data.mensagem);
}
