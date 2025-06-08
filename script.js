const preloader = document.getElementById("preloader");
const home = document.getElementById("home");
const audio = document.getElementById("bg-audio");
const activeTabEl = document.getElementById("active-tab");

const audioMap = {
  "Парфюмы": "/assets/work.mp3",
  "О нас": "/assets/about.mp3",
  "Контакт": "/assets/contact.mp3"
};

function switchTab(tabName) {
  activeTabEl.textContent = tabName;
  const newAudioSrc = audioMap[tabName];
  if (newAudioSrc) {
    audio.src = newAudioSrc;
    audio.play();
  }
}

// Эмуляция прелоадера (2 секунды)
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    console.log("Preloader finished");
    preloader.style.display = "none";
    home.style.display = "block";
    switchTab("Парфюмы");
  }, 2000);
});
