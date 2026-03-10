const text = "Bienvenido";
const typingElement = document.getElementById("typing");
const progressBar = document.getElementById("progress-bar");
const percentage = document.getElementById("percentage");
const status = document.getElementById("status");
const loader = document.getElementById("loader");
const mainContent = document.getElementById("main-content");

let index = 0;
let progress = 0;

function typeEffect() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 150);
    } else {
        startLoading();
    }
}

function startLoading() {
    const interval = setInterval(() => {
        progress++;
        progressBar.style.width = progress + "%";
        percentage.textContent = progress + "%";

        if (progress === 100) {
            clearInterval(interval);
            status.textContent = "Listo";

            setTimeout(() => {
                loader.style.opacity = "0";
                setTimeout(() => {
                    loader.style.display = "none";
                    mainContent.style.display = "block";
                    mainContent.style.opacity = "1";
                }, 800);
            }, 800);
        }
    }, 25);
}

typeEffect();