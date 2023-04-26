const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente");


export default{
    /* llamamos a los datos del config (local storage) */
    eventoPaginas(){
        let pag = 1;
        btnSiguiente.addEventListener('click' , ()=>{
            pag+=1;
            (pag<1000)? this.cargarPeliculas(pag):"";

        })
        btnAnterior.addEventListener("click",()=>{
            pag-=1;
            (pag>1)?this.cargarPeliculas(pag):"";
        })
    },

/*     trailesTraer(id){
        const videospeliculas = async()=>{
            try{
                console.log(dataVideo,"esto es para el trailer");

                return dataVideo;
            } catch(error){
                console.log(error);
            }
        }
        videospeliculas();
    },
 */
    cargarPeliculas(pag)  {
        try{
            const cargarpeliuculas2 = async()=>{
                const respuestaVideos = await fetch(`https://api.themoviedb.org/3/movie/12/videos?api_key=3df70b20cbd027249f00bb9372cbadf9`);
                const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=9365b5d7f920750762284850b585bdb0&language=es=MX&page=${pag}`);
                /* en caso de que le is no se correcto */
                if (respuesta.status === 200 ) {
                    const datos  = await respuesta.json();
                    const data =datos.results;

                    const datosVideo = await respuestaVideos.json();
                    const dataVideo = datosVideo.results;
                    
                    this.pintarPeliculas(data,dataVideo);
                }else if(respuesta.status===401) {
                    console.log(" nombre de la pelicula mal");
                }else if(respuesta.status === 404) {
                    console.log("error no identificado");
                }
            }
            cargarpeliuculas2();
        }catch(error){
            console.log(error);
        }
    },

    buscarPeliculas(nombrePelicula){
        try{
            const cargarpeliuculas2 = async()=>{
                const respSearch = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9365b5d7f920750762284850b585bdb0&query=${nombrePelicula}`);
                /* en caso de que le is no se correcto  */
                if (respSearch.status === 200 ) {
                    const datos  = await respSearch.json();
                    const data =datos.results;
                    console.log(data);
                    this.pintarPeliculas(data);
                }else if(respSearch.status===401) {
                    console.log("Pusiste el nombre ed ela pelicula mal");
                }else if(respSearch.status === 404) {
                    console.log("Se presento un error no identificado");
                } 
            }
            cargarpeliuculas2();
        }catch(error){
            console.log(error);
        }
    },

    pintarPeliculas(data,dataVideo){
        console.log(dataVideo);
        const ws = new Worker("../storage/wsCargarPeliculas.js", {type:"module"});
        ws.postMessage({module:"pintarPeliculas",data:data})
        ws.addEventListener("message", (e)=>{
            //let doc = new DOMParser().parseFromString(e.data, "text/html");
            const contenedor = document.querySelector("#contenedor");
            contenedor.innerHTML=e.data;
            ws.terminate();
        });
    }
}