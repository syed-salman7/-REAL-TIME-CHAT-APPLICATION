const chatBox = document.getElementById("chat-box");
const input = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const typingIndicator = document.getElementById("typing-indicator");
const modeToggle = document.getElementById("mode-toggle");

// Send message
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
  showTyping();
});

// Toggle Light/Dark Mode
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

function sendMessage() {
  const text = input.value.trim();
  if (text === "") return;

  // Create user message
  const userMsg = createMessage(text, "user");
  chatBox.appendChild(userMsg);
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // Simulate system reply
  setTimeout(() => {
    const reply = createMessage("That's interesting! 😄", "system");
    chatBox.appendChild(reply);
    chatBox.scrollTop = chatBox.scrollHeight;
    typingIndicator.classList.remove("active");
  }, 1200);
}

// Create message element
function createMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);

  const avatar =
    sender === "system"
      ? `<img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" class="avatar" alt="">`
      : "";

  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  message.innerHTML = `
    ${avatar}
    <div class="bubble">
      <p>${text}</p>
      <span class="time">${time}</span>
    </div>
  `;
  return message;
}

// Typing effect
function showTyping() {
  typingIndicator.classList.add("active");
  clearTimeout(window.typingTimeout);
  window.typingTimeout = setTimeout(() => {
    typingIndicator.classList.remove("active");
  }, 1500);
}
