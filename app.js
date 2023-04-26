import cargarPeli from "./components/cargarPeli.js";


cargarPeli.eventoPaginas();
cargarPeli.cargarPeliculas();

const input = document.querySelector("#nombre");
input.addEventListener('input', function(){
    if (input.value==""){
        cargarPeli.eventoPaginas();
    }else{
        cargarPeli.buscarPeliculas(input.value);
    }
})                     