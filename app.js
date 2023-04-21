import cargarPeli from "./components/cargarPeli.js";


cargarPeli.eventoPaginas();

cargarPeli.cargarPeliculas();

const input = document.querySelector("#nombre");
input.addEventListener('input', function(){
    cargarPeli.buscarPeliculas(input.value);
})