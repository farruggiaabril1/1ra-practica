console.log("Script cargado correctamente");

const imagenesColorido=[
    "https://picsum.photos/seed/color1/500/600",
    "https://picsum.photos/seed/color2/500/600",
    "https://picsum.photos/seed/color3/500/600",
    "https://picsum.photos/seed/color4/500/600"
];
const imagenesBlancoyNegro=[
    "https://picsum.photos/seed/sketch1/500/600",
    "https://picsum.photos/seed/sketch2/500/600",
    "https://picsum.photos/seed/sketch3/500/600",
    "https://picsum.photos/seed/sketch4/500/600",
];

function cambiarDibujo(estilo) {
    const imagen = document.getElementById("imagendibujo");
    imagen.style.opacity = "0";

    setTimeout(() => {
    if (estilo === "colorido") {
        imagen.src = imagenesColorido[Math.floor(Math.random() * imagenesColorido.length)];
        imagen.style.filter = "none";
    } else if (estilo === "blancoynegro") {
        const aleatoria = imagenesBlancoyNegro[Math.floor(Math.random() * imagenesBlancoyNegro.length)];
        imagen.src = aleatoria;
        imagen.style.filter = "grayscale(100%)";
    }

    imagen.style.opacity="1";
    },400)
}

function guardarDiseno(imagenSrc, nombre, filtro) {
    const disenos =JSON.parse(localStorage.getItem("disenos")) || [];
    disenos.push({id:Date.now(),src:imagenSrc, nombre: nombre, filtro: filtro});
    localStorage.setItem("disenos", JSON.stringify(disenos));
    mostrarDisenos();
}

function eliminarDiseno(id) {
    let disenos = JSON.parse(localStorage.getItem("disenos")) || [];
    disenos = disenos.filter(diseno => diseno.id !== id);
    localStorage.setItem("disenos", JSON.stringify(disenos));
    mostrarDisenos();
}

function mostrarDisenos() {
    const grid=document.getElementById("galeriaGrid");
    console.log("grid:",grid);
    const disenos = JSON.parse(localStorage.getItem("disenos")) || [];

    if (disenos.length === 0) {
        grid.innerHTML = "<p class='vacia'>No tienes diseños guardados.</p>";
        return;
    }

    grid.innerHTML =disenos.map(diseno => `
        <div class="card-diseno">
            <img src="${diseno.src}" alt="${diseno.nombre}" style="filter:${diseno.filtro ||'none'}">
            <p>${diseno.nombre}</p>
            <button onclick="eliminarDiseno(${diseno.id})">Eliminar</button>
        </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarDisenos();

document.getElementById("btnGuardar").addEventListener("click", () => {
    const imagen = document.getElementById("imagendibujo");
    const nombre = "Dibujo - "+ new Date().toLocaleDateString();
    const filtro=imagen.style.filter;
    guardarDiseno(imagen.src, nombre, filtro);
    });
});
