let pag = 1;

export default{
    dataPeliculas(){
        console.log("dentra");
        try{
            const cargarpeliculas = async()=>{
                localStorage.setItem("cargarPeli", JSON.stringify({
                    respuesta : await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=9365b5d7f920750762284850b585bdb0&language=es=MX&page=${pag}`)

                }))
            }
            cargarpeliculas();
        }catch(error){
            console.log(error);
        }

            
    },
}