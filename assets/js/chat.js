// chat.js
// Logik halaman chat: hantar mesej, terima balasan, UI bubble

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messagesEl = document.getElementById("chat-messages");
  const statusEl = document.getElementById("chat-status");

  if (!form || !input || !messagesEl) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessageBubble(messagesEl, text, "user");
    input.value = "";
    input.style.height = "auto";

    const typingId = addTypingIndicator(messagesEl);
    setStatus(statusEl, "Sedang mendengar…");

    const reply = await sendMessageToTasdar(text);

    removeTypingIndicator(typingId);
    addMessageBubble(messagesEl, reply, "bot");
    setStatus(statusEl, "Sedia mendengar…");
  });

  // Enter = hantar, Shift+Enter = baris baru
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  });
});

function addMessageBubble(container, text, role) {
  const wrapper = document.createElement("div");
  wrapper.className = `message message-${role}`;

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.innerText = text;

  const meta = document.createElement("span");
  meta.className = "message-meta";
  meta.textContent = role === "user" ? "Kau · sekarang" : "TAS.DAR · sekarang";

  wrapper.appendChild(bubble);
  wrapper.appendChild(meta);
  container.appendChild(wrapper);

  container.scrollTop = container.scrollHeight;
}

let typingCounter = 0;
const typingElements = new Map();

function addTypingIndicator(container) {
  const id = ++typingCounter;

  const wrapper = document.createElement("div");
  wrapper.className = "message message-bot message-typing";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";

  const dots = document.createElement("div");
  dots.className = "typing-dots";

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("span");
    dot.className = "dot";
    dots.appendChild(dot);
  }

  bubble.appendChild(dots);
  wrapper.appendChild(bubble);
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;

  typingElements.set(id, wrapper);
  return id;
}

function removeTypingIndicator(id) {
  const el = typingElements.get(id);
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
  typingElements.delete(id);
}

function setStatus(el, text) {
  if (!el) return;
  el.textContent = text;
}
