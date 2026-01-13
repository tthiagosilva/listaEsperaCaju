const form = document.getElementById("listaEspera");
const statusMsg = document.getElementById("status");
const btn = document.getElementById("btnSubmit");

const APPS_SCRIPT_URL = "https://script.google.com/home/projects/1iVILNMOhJVmdqJzHqdl_VgBq5dMG5EfZwFLjIEYmkIm65LShdCw6PQA8/edit";

function setStatus(msg, type) {
  statusMsg.textContent = msg;
  statusMsg.className = "status " + type;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  btn.disabled = true;
  btn.innerText = "Enviando...";

  try {
    const formData = new FormData(form);
    await fetch(APPS_SCRIPT_URL, { method: "POST", body: formData });

    setStatus("✅ Cadastro realizado com sucesso!", "success");
    form.reset();
  } catch {
    setStatus("❌ Erro ao enviar. Tente novamente.", "error");
  } finally {
    btn.disabled = false;
    btn.innerText = "Entrar na lista de espera";
  }
});
