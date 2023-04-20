import config from "../storage/config.js"

console.log(config);
let pag = 1;
const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente")


export default{
    /* llamamos a los datos del config (local storage) */
    
    eventoPaginas(){
        config.dataPeliculas();
        Object.assign(this, JSON)

        btnSiguiente.addEventListener('click' , ()=>{
            pag+=1;
            (pag<1000)? this.cargarPeliculas():"";
        })
        btnAnterior.addEventListener("click",()=>{
            pag-=1;
            (pag>1)?this.cargarPeliculas():"";
        })
    },

    cargarPeliculas()  {
        try{
            const cargarpeliuculas2 = async()=>{
                const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=9365b5d7f920750762284850b585bdb0&language=es=MX&page=${pag}`);
                
                /* en caso de que le is no se correcto */
                if (respuesta.status === 200 ) {
                    const datos  = await respuesta.json();
                    const data =datos.results;

                    this.pintarPeliculas(data);
                }else if(respuesta.status===401) {
                    console.log("Pusiste el nombre ed ela pelicula mal");
                }else if(respuesta.status === 404) {
                    console.log("Se presento un error no identificado");
                }
            }
            cargarpeliuculas2();
        }catch(error){
            console.log(error);
        }

    },

    pintarPeliculas(data){
        let pelis = "";
        data.forEach(e => {
            pelis += `
            <div class="pelicula">
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${e.poster_path}">
                <h3 class="titulo">${e.title}<h3>
            </div>
            
            `;
        });
        const contenedor = document.querySelector("#contenedor");
        contenedor.innerHTML=pelis;

    }
}