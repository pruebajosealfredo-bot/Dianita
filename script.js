const envelope = document.querySelector(".envelope");
const button = document.getElementById("goToFlowers");
const music = document.getElementById("bg-music"); // tu audio
const container = document.querySelector(".container"); // donde está la carta

envelope.addEventListener("click", () => {
  envelope.classList.toggle("open");

  if (envelope.classList.contains("open")) {
    // Mostrar botón después de abrir
    setTimeout(() => {
      button.classList.add("show");
    }, 1000);

    // Lanzar lluvia de corazones
    rainHearts(2000); // 2 segundos

    // Reproducir música al primer click
    if (music.paused) {
      music.play().catch(err => {
        console.log("El navegador bloqueó el autoplay hasta interacción:", err);
      });
    }
  } else {
    button.classList.remove("show");
  }
});

button.addEventListener("click", (event) => {
  event.stopPropagation();

  // 🚀 Cargar index1.html SIN recargar la página
  fetch("index1.html")
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
    })
    .catch(err => console.error("Error cargando index1.html:", err));
});

// 🌸 Función para lluvia de corazones
function rainHearts(duration) {
  const interval = setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";

    // posición aleatoria
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    document.body.appendChild(heart);

    // eliminar después de caer
    setTimeout(() => {
      heart.remove();
    }, 3000);
  }, 200);

  // detener después de "duration"
  setTimeout(() => clearInterval(interval), duration);
}
