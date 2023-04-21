let pag = 1;
const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente")
export default{
    /* llamamos a los datos del config (local storage) */
    eventoPaginas(){
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
                    console.log(data);
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
    buscarPeliculas(){
        const input = document.querySelector("#nombre")

        input.addEventListener("input", function(){
            const buscarPeliculas = async()=>{
                let nom =input.value;
                const respSearch = await fetch(`https://api.themoviedb.org/3/search/company?api_key=9365b5d7f920750762284850b585bdb0&s=${nom}`)
                const dataSearch  = await respSearch.json();
                console.log(nom, "lo que esta en el input");
                console.log(respSearch,"datos que me traigo del api");
                console.log(dataSearch.results,"datasearch");
    
            }
            buscarPeliculas();
        })
    },




    pintarPeliculas(data){
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