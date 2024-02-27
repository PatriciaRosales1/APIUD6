const requestOptions = {
    method: "GET",
    redirect: "follow"
};

cargarBotones();

function cargarBotones() {
    fetch("http://localhost:8080/api/juego", requestOptions)
        .then(response => response.json())
        .then(resultados => generarBotones(resultados))
        .catch(error => console.error(error));
}

function generarBotones(resultados) {
    const contenedorBotones = document.getElementById("botones");

    contenedorBotones.innerHTML = "";

    resultados.forEach(elemento => {
        const boton = document.createElement("button");
        boton.classList.add("btn", "botones");
        boton.innerHTML = elemento.nombre;

        boton.addEventListener("click", function() {
            ocultarBotones();
            generarPuntuaciones(elemento.id);
        });

        contenedorBotones.appendChild(boton);
    });
}

function ocultarBotones() {
    const botones = document.getElementById("botones");
    botones.innerHTML = "";
}

function generarPuntuaciones(id) {
    document.getElementById("contenido").innerHTML = "";
    fetch(`http://localhost:8080/api/puntuacion/juego/${id}`, requestOptions)
        .then(response => response.json())
        .then(result => mostrarPuntuaciones(result))
        .catch(error => console.log('error', error));
}


function mostrarPuntuaciones(resultados) {

    const contenido = document.getElementById("contenido");

    const tabla = document.createElement("table");
    tabla.classList.add("table");

    const thead = document.createElement("thead");

    const filaEncabezado = document.createElement("tr");

    const thNombreJugador = document.createElement("th");
    const thPuntuacion = document.createElement("th");

    thNombreJugador.textContent = "Jugador";
    thPuntuacion.textContent = "Puntuación";
    
    filaEncabezado.appendChild(thNombreJugador);
    filaEncabezado.appendChild(thPuntuacion);
    thead.appendChild(filaEncabezado);

    const tbody = document.createElement("tbody");

    resultados.forEach(puntuacion => {
        const fila = document.createElement("tr");
        const celdaNombre = document.createElement("td");
        const celdaPuntuacion = document.createElement("td");

        celdaNombre.textContent = puntuacion.nombreJugador;
        celdaPuntuacion.textContent = puntuacion.puntuacion;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaPuntuacion);
        tbody.appendChild(fila);
    });

    tabla.appendChild(thead);
    tabla.appendChild(tbody);

    contenido.innerHTML = "";
    contenido.appendChild(tabla);   
}

function restaurarBotones() {
    cargarBotones();
    ocultarPuntuaciones();
}

function ocultarPuntuaciones() {
    const puntuaciones = document.getElementById("contenido");
    puntuaciones.innerHTML = "";
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("inicio").addEventListener("click", restaurarBotones);
});
