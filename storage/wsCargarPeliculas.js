let ws = {
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
    return pelis;   
    }
}

self.addEventListener("message",(e) =>{
    postMessage(ws[`${e.data.module}`](e.data.data));
})