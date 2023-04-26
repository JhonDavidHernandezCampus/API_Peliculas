
//import cargarVideos from "../components/cargarVideos.js";

let ws = {
    pintarPeliculas(data){
        let pelis = "";
        console.log(data);
        //console.log(respuestaVideos);
        data.forEach(e => {
            pelis += `
                <div class="col-sm-6 col-md-4 col-lg-3 mb-4 pelicula">
                    <div class="contenido">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${(e.poster_path)? e.poster_path:e.backdrop_path}">
                        <img class="poster2" src="https://image.tmdb.org/t/p/w500/${e.poster_path}">
                        <h3 class="titulo">${e.title}<h3>
                    </div>
                    <div class="animacion">
                        <h1 class="titu">${e.title}</h1>
                        <p class="descrip">${e.overview}</p>
                        <div class="ver">
                            <a  href="https://www.youtube.com/watch?v=y_t8B2gJbkI" class="btn btn-primary"> Trailer</a>
                        </div>
                    </div>
                </div>    
                        `;
        }); 
    return `
        <div class="row">
            ${pelis}
        </div>`;   
    }
}

self.addEventListener("message",(e) =>{
    postMessage(ws[`${e.data.module}`](e.data.data));
})