const form = document.getElementById("listaEspera");
const statusMsg = document.getElementById("status");
const btn = document.getElementById("btnSubmit");

const APPS_SCRIPT_URL = "COLE_AQUI_A_URL_DO_APPS_SCRIPT";

function setStatus(message, type) {
  statusMsg.textContent = message;
  statusMsg.className = "status" + (type ? ` ${type}` : "");
}

function setLoading(isLoading) {
  btn.disabled = isLoading;
  btn.textContent = isLoading ? "Enviando..." : "Entrar na lista de espera";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("COLE_AQUI")) {
    setStatus("⚠️ Configure a URL do Apps Script no arquivo script.js.", "error");
    return;
  }

  setStatus("", "");
  setLoading(true);

  try {
    const formData = new FormData(form);

    // Opcional: normalizar telefone (bem simples)
    const tel = (formData.get("telefone") || "").toString().trim();
    formData.set("telefone", tel);

    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: formData,
    });

    setStatus("✅ Inscrição realizada com sucesso! Em breve entraremos em contato se surgir vaga.", "success");
    form.reset();
  } catch (err) {
    setStatus("❌ Erro ao enviar. Verifique sua internet e tente novamente.", "error");
  } finally {
    setLoading(false);
  }
});
