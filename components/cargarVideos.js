


const videospeliculas = async(id)=>{
    try{
        const respuestaVideos = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=3df70b20cbd027249f00bb9372cbadf9`);
        const datosVideo = await respuestaVideos.json();
        const dataVideo = datosVideo.results;
        return dataVideo;
    } catch(error){
        console.log(error);
    }
}


export default{
    videospeliculas
}