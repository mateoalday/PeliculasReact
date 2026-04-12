
import { useState,useEffect } from "react";

function MediaList() {

    const [porVer, setPorVer] = useState([])
    const [visto, setVisto] = useState([])

    //1-LEER. este useEffect lee el contenido de localstorage al renderizarse la pagina solo una vez, lee lo que habia y lo mete en el estado
    useEffect(()=> {
        const porVerGuardado = JSON.parse(localStorage.getItem("porVer")) || []
        setPorVer(porVerGuardado)
        const vistoGuardado = JSON.parse(localStorage.getItem("visto")) || []
        setVisto(vistoGuardado)
    },[])
        //2-GUARDAR. lo que hace este useEffect es ejecutarse cada vez que por ver o visto cambien, asi si se quita o agrega una pelicula se guarde automaticamente
    useEffect(() => {
        localStorage.setItem("porVer", JSON.stringify(porVer))
        localStorage.setItem("visto", JSON.stringify(visto))
        }, [porVer, visto])


    return (
        <div>
            <div>
                <h2>Por Ver</h2>
                {porVer.length === 0 ? <p>Vacio, ya viste todo</p> : porVer.map((item) =>(
                <p key={item.titulo}>{item.titulo}</p>)) }
            </div>
            <div>
                <h2>Visto</h2>
                {visto.length === 0? <p>Aun no viste nada</p>: visto.map((item) =>(
                    <p key={item.titulo}>{item.titulo}</p>))}
            </div>
        </div>
    )
}

export default MediaList;