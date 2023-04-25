let ws = {
    pintarPeliculas(data){
        let pelis = "";
        data.forEach(e => {
            pelis += `
                <div class="col-sm-6 col-md-4 col-lg-3 mb-4 pelicula">
                    <div class="contenido">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${(e.poster_path)? e.poster_path:backdrop_path}">
                        <h3 class="titulo">${e.title}<h3>

                        <div class="animacion">
                            <h1>${e.title}</h1>
                            <p>${e.overview}</p>
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