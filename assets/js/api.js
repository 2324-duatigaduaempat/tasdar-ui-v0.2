// api.js
// Pusat sambungan UI ↔ backend TAS.DAR

// TODO: Tukar kepada URL backend sebenar (Randar / Railway / lain)
const API_BASE_URL = "https://YOUR-TASDAR-BACKEND-URL.com";

async function sendMessageToTasdar(message) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    // Backend dijangka balas { reply: "text..." }
    return data.reply || "(Tiada balasan diterima.)";
  } catch (err) {
    console.error("Ralat hantar mesej ke TAS.DAR:", err);
    return "Maaf, sambungan ke TAS.DAR terganggu sekejap. Cuba lagi sebentar ya.";
  }
}

async function submitOnboardingData(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/onboarding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Ralat onboarding:", err);
    throw err;
  }
}
