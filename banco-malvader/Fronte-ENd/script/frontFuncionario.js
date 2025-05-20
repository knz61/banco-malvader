const api = "http://localhost:3000/api";

document.getElementById("form-abertura").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    id_cliente: parseInt(document.getElementById("idCliente").value),
    id_agencia: parseInt(document.getElementById("agencia").value),
    tipo_conta: document.getElementById("tipoConta").value
  };

  const res = await fetch(`${api}/clientes/conta/abrir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  document.getElementById("resultadoAdm").innerText = data.mensagem || "Erro.";
});
