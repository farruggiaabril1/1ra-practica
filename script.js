console.log("Script cargado correctamente");

const boton= document.getElementById("btnGuardar");
console.log("Botón encontrado:", boton);

function cambiarTatuaje(estilo) {
    const imagen = document.getElementById("imagentatuaje");

    if (estilo === "lineal") {
        imagen.src= 
        "https://picsum.photos/seed/tattoo2/500/600";
        caption.textContent = "Estilo Lineal";
}
    else if (estilo === "minimalista") {
        imagen.src= 
        "https://picsum.photos/seed/tattoo3/500/600";
        caption.textContent = "Estilo Minimalista";
    }
    else if (estilo === "rellenos") {
        imagen.src=
        "https://picsum.photos/seed/tattoo4/500/600";
        caption.textContent = "Estilo Rellenos";
    }

imagen.style.opacity = "0";
setTimeout(() => imagen.style.opacity = "1", 100);
}

document.addEventListener("DOMContentLoaded", () => {
    mostarDisenos();
});

function guardarDiseno(imagenSrc, nombre) {
    const disenos=JSON.parse(localStorage.getItem("disenos") || "[]");
    disenos.push({ id: Date.now(), src:imagenSrc, nombre: nombre });
    localStorage.setItem("disenos", JSON.stringify(disenos));
    mostarDisenos();
}


document.getElementById("btnGuardar").addEventListener("click", () => {
    const imagen = document.getElementById("imagentatuaje");
    console.log(imagen.src);
    const nombre = document.querySelector("h3").textContent;
    guardarDiseno(imagen.src, nombre);
});


function eliminarDiseno(id) {
    let disenos=JSON.parse(localStorage.getItem("disenos") || "[]");
    disenos = disenos.filter(diseno => diseno.id !== id);
    localStorage.setItem("disenos", JSON.stringify(disenos));
    mostarDisenos();
}

function mostarDisenos() {
    const grid=document.getElementById("galeriaGrid");
    const disenos=JSON.parse(localStorage.getItem("disenos") || "[]");

    if (disenos.length === 0) {
        grid.innerHTML = "<p class='vacia'>No hay diseños guardados aún</p>";
        return;
    }

    grid.innerHTML=disenos.map(diseno => `
        <div class="card-diseno">
            <img src="${diseno.src}" alt="${diseno.nombre}">
            <p>${diseno.nombre}</p>
            <button onclick="eliminarDiseno(${diseno.id})">Eliminar</button>
        </div>
    `).join("");
}

