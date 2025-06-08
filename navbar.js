// Получаем нужные элементы
const navbar = document.getElementById("navbar");
const audio = document.getElementById("navbar-audio");
const soundLabel = document.getElementById("sound-label");
const bars = document.getElementById("sound-bars")?.children;
let isSoundOn = true;

// Анимация скролла навбара
window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }
});

// Переключение звука
function toggleSound() {
  isSoundOn = !isSoundOn;
  if (isSoundOn) {
    audio.play();
    soundLabel.textContent = "SOUND [ON]";
    if (bars) [...bars].forEach(dot => dot.classList.add("sound-on"));
  } else {
    audio.pause();
    soundLabel.textContent = "SOUND [OFF]";
    if (bars) [...bars].forEach(dot => dot.classList.remove("sound-on"));
  }
}

// Обновление часов
function updateClock() {
  const now = new Date();
  const hours = now.getUTCHours() + 6; // GMT+6 (Astana)
  const minutes = now.getMinutes();
  const localTime = `${hours % 24}`.padStart(2, '0') + ":" + `${minutes}`.padStart(2, '0');
  const isDay = hours >= 6 && hours < 18;

  const clockElement = document.getElementById("clock");
  if (clockElement) {
    clockElement.innerHTML = `
      <div class="city-time" style="opacity:${isDay ? 1 : 0.6}">
        <div class="${isDay ? "circle" : "moon"}" style="background:${isDay ? '#fff' : '#777'};"></div>
        <div class="text-block">
          <span>ASTANA, KZ</span>
          <span>${localTime} GMT+6</span>
        </div>
      </div>
    `;
  }
}

updateClock();
setInterval(updateClock, 60000);

// Подсветка активной страницы в футере
const currentPage = location.pathname.split("/").pop();
document.querySelectorAll(".nav-item").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// Проигрывание звука при клике на ссылки футера
function playClick(el) {
  const sound = document.getElementById("click-sound");
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch((e) => console.log("Click sound error:", e));
  }
}

// Если в navbar.html используется document.write для точек — добавить заново sound-on
window.addEventListener("DOMContentLoaded", () => {
  if (isSoundOn && bars) {
    [...bars].forEach(dot => dot.classList.add("sound-on"));
  }
});
