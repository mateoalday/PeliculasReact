import { useState,useEffect } from "react"
import MediaList from "../components/MediaList/MediaList"

function Home () {
    const [peliculas,setPeliculas] =useState([])
    const [busqueda,setBusqueda] = useState("")
    const [filtros,setFiltros] = useState({genero:"",tipo:""})
    const [orden,setOrden] = useState({ campo: "titulo", direccion:"asc"})

    //este useeffect ve si hay peliculas guardadas en localstorage, y las guarda con el setpeliculas
    useEffect(()=> {
        const peliculasGuardadas = JSON.parse(localStorage.getItem("peliculas")) || []
        setPeliculas(peliculasGuardadas)
}, [])

    //este useeffect guarda en localstorage la lista de peliculas cada vez que ve una modificacion en peliculas
    useEffect(() =>{
        localStorage.setItem("peliculas",JSON.stringify(peliculas))   
        },[peliculas])
    return(
    <MediaList peliculas={peliculas}/>

    )   
}

export default Home