// onboarding.js
// Proses borang onboarding & redirect ke chat

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("onboarding-form");
  const statusEl = document.getElementById("onboarding-status");
  const moodInput = document.getElementById("mood");
  const pillButtons = document.querySelectorAll(".pill-row .pill");

  if (!form || !statusEl) return;

  // Mood pill behaviour
  pillButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mood = btn.getAttribute("data-mood");
      moodInput.value = mood;

      pillButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearStatus(statusEl);

    const formData = new FormData(form);
    const payload = {
      nickname: formData.get("nickname") || "",
      language: formData.get("language") || "bm",
      purpose: formData.get("purpose") || "",
      mood: formData.get("mood") || "",
      note: formData.get("note") || "",
      timestamp: new Date().toISOString(),
    };

    if (!payload.nickname.trim()) {
      setStatus(statusEl, "Nama panggilan tak boleh kosong.", true);
      return;
    }

    setStatus(statusEl, "Menyimpan onboarding kau dalam Folder Jiwa…", false);

    try {
      await submitOnboardingData(payload);
      setStatus(
        statusEl,
        "Siap. TAS.DAR akan guna maklumat ini dengan lembut untuk faham kau.",
        false
      );

      setTimeout(() => {
        window.location.href = "chat.html";
      }, 800);
    } catch (err) {
      setStatus(
        statusEl,
        "Ada gangguan sambungan. Tapi kau masih boleh terus ke chat dan cuba lagi kemudian.",
        true
      );
    }
  });
});

function setStatus(el, text, isError = false) {
  el.textContent = text;
  el.classList.remove("is-error", "is-success");
  el.classList.add(isError ? "is-error" : "is-success");
}

function clearStatus(el) {
  el.textContent = "";
  el.classList.remove("is-error", "is-success");
}
