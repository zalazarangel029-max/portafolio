const projects = {
  fideliza: {
    title: "AngelZ Fideliza",
    type: "PLATAFORMA WEB",
    description: "Billetera digital para reunir tarjetas de puntos y sellos de comercios en un solo lugar.",
    images: [{ src: "assets/fideliza-preview.png", alt: "Vista previa de AngelZ Fideliza" }],
    siteUrl: "https://angelzfideliza.com.ar/"
  },
  kiosco: {
    title: "AngelZ Kiosco Manager",
    type: "APLICACIÓN DE ESCRITORIO",
    description: "Aplicación de escritorio para administrar productos y ventas de kioscos. El proyecto se entrega como archivo .exe.",
    images: [
      { src: "assets/kiosco-bienvenida.png", alt: "Pantalla de bienvenida de AngelZ Kiosco Manager" },
      { src: "assets/kiosco-venta.png", alt: "Pantalla de nueva venta de AngelZ Kiosco Manager" },
      { src: "assets/kiosco-compras.png", alt: "Pantalla de compras de AngelZ Kiosco Manager" },
      { src: "assets/kiosco-stock.png", alt: "Pantalla de productos y stock de AngelZ Kiosco Manager" },
      { src: "assets/kiosco-configuracion.png", alt: "Pantalla de configuración de AngelZ Kiosco Manager" },
      { src: "assets/kiosco-combos.png", alt: "Pantalla de combos y ofertas de AngelZ Kiosco Manager" },
      { src: "assets/kiosco-resumen.png", alt: "Pantalla de resumen de ventas de AngelZ Kiosco Manager" }
    ],
    siteUrl: null,
    note: "Esta aplicación se distribuye como archivo ejecutable. Las capturas adicionales se pueden sumar a esta galería."
  },
  rotyweb: {
    title: "RotyWeb",
    type: "PROYECTO ESCOLAR · EN DESARROLLO",
    description: "Un proyecto escolar de sitio web que quedó sin terminar. Puedes explorar la versión que alcancé a desarrollar.",
    images: [{ src: "assets/rotyweb-preview.jpg", alt: "Vista previa de RotyWeb" }],
    siteUrl: "https://rotyweb.netlify.app/",
    note: "Proyecto escolar publicado en Netlify.",
  }
};

const loader = document.getElementById("loader");
const progressBar = document.getElementById("progress-bar");
const progressTrack = document.querySelector(".progress-container");
const progressLabel = document.getElementById("loading-percentage");
const loadingLabel = document.getElementById("loading-label");
const mainContent = document.getElementById("main-content");
let progress = 0;

// Avanza de a poco para que la pantalla de carga se sienta más natural.
const loading = setInterval(() => {
  progress = Math.min(progress + 2, 100);
  progressBar.style.width = `${progress}%`;
  progressTrack.setAttribute("aria-valuenow", String(progress));
  progressLabel.textContent = `${progress}%`;

  // Muestra brevemente que la página ya terminó de cargar antes de abrirla.
  if (progress >= 100) {
    clearInterval(loading);
    loadingLabel.textContent = "¡Listo!";
    document.body.classList.add("loaded");
    window.setTimeout(() => {
      loader.remove();
      mainContent.style.opacity = "1";
    }, 500);
  }
}, 75);

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("is-open", !expanded);
  menuToggle.innerHTML = expanded ? '<i class="fa-solid fa-bars"></i>' : '<i class="fa-solid fa-xmark"></i>';
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}));

const modal = document.getElementById("gallery-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalType = document.getElementById("modal-type");
const modalDescription = document.getElementById("modal-description");
const modalSiteLink = document.getElementById("modal-site-link");
const modalNote = document.getElementById("modal-note");
const imageCount = document.getElementById("image-count");
let activeProject = null;
let activeImage = 0;
let lastFocusedElement = null;

function renderImage() {
  const image = activeProject.images[activeImage];
  modalImage.src = image.src;
  modalImage.alt = image.alt;
  imageCount.textContent = `${activeImage + 1} / ${activeProject.images.length}`;
  const hasMultiple = activeProject.images.length > 1;
  document.querySelector(".gallery-prev").hidden = !hasMultiple;
  document.querySelector(".gallery-next").hidden = !hasMultiple;
  imageCount.hidden = !hasMultiple;
}

function openProject(projectKey, trigger) {
  activeProject = projects[projectKey];
  if (!activeProject) return;
  activeImage = 0;
  lastFocusedElement = trigger;
  modalTitle.textContent = activeProject.title;
  modalType.textContent = activeProject.type;
  modalDescription.textContent = activeProject.description;
  modalNote.textContent = activeProject.note || "";
  modalSiteLink.hidden = !activeProject.siteUrl;
  if (activeProject.siteUrl) modalSiteLink.href = activeProject.siteUrl;
  renderImage();
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}

function closeProject() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.project, button));
});
document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeProject));
document.querySelector(".gallery-prev").addEventListener("click", () => {
  if (!activeProject) return;
  activeImage = (activeImage - 1 + activeProject.images.length) % activeProject.images.length;
  renderImage();
});
document.querySelector(".gallery-next").addEventListener("click", () => {
  if (!activeProject) return;
  activeImage = (activeImage + 1) % activeProject.images.length;
  renderImage();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeProject();
});






