
function MediaList({peliculas}) {

        const listaPorVer = peliculas.filter(item =>item.visto === false)
        const listaVista = peliculas.filter(item =>item.visto === true)

    return (
        <div>
            <div>
                <h2>Por Ver</h2>
                {listaPorVer.length === 0 ? <p>Vacio, ya viste todo</p> : listaPorVer.map(item =>(
                    <p key={item.titulo}>{item.titulo} </p>
                )) }
            </div>
            <div>
                <h2>Visto</h2>
                {listaVista.length === 0? <p>Aun no viste nada</p>: listaVista.map(item =>(
                    <p key={item.titulo}>{item.titulo} </p>
                )) }
            </div>
        </div>
    )
}

export default MediaList;
