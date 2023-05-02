
//import cargarVideos from "../components/cargarVideos.js";

let ws = {
    async trailesTraer(id){
        let data;
        try{
            const respuestaVideos = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=3df70b20cbd027249f00bb9372cbadf9`);
            const datosVideo = await respuestaVideos.json();
            data = datosVideo.results;
        } catch(error){
            console.log(error);
        }
        return data
    },

    async pintarPeliculas(data){
        let pelis = "";
        let res = await this.trailesTraer(data[0].id);
        console.log(res,"esto es res");
        //console.log(respuestaVideos);
        //console.log(((res[i].key)?res[i].key:""));
        data.forEach( (e, i) => {
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
                            <a  href="https://www.youtube.com/watch?v=${""}" class="btn btn-primary" target="_blank"> Trailer</a>
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

self.addEventListener("message",async(e) =>{
    let result = await ws[`${e.data.module}`](e.data.data)
    postMessage(result);
})