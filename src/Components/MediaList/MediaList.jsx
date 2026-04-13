import styles from './MediaList.module.css';
import MediaCard from '../MediaCard/MediaCard';

function MediaList({ peliculas, accionEliminar, accionEditar, accionCambiarEstado }) {

    const listaPorVer = peliculas.filter(item => item.visto === false);
    const listaVista = peliculas.filter(item => item.visto === true);

    return (
        <div className={styles.listContainer}>

            {/* LISTA POR VER */}
            <div className={styles.listColumn}>
                <h2 className={styles.listTitle}>Por Ver</h2>

                {listaPorVer.length === 0 ? (
                    <p>Vacio, ya viste todo</p>
                ) : (
                    listaPorVer.map(item => (
                        <MediaCard 
                            key={item.id} 
                            item={item} 
                            accionEliminar={accionEliminar} 
                            accionEditar={accionEditar} 
                            accionCambiarEstado={accionCambiarEstado} 
                            textoBotonEstado="Marcar como Visto"
                        />
                    ))
                )}

            </div>

            {/* LISTA VISTO */}
            <div className={styles.listColumn}>
                <h2 className={styles.listTitle}>Visto</h2>

                {listaVista.length === 0 ? (
                    <p>Aun no viste nada</p>
                ) : (
                    listaVista.map(item => (
                        <MediaCard 
                            key={item.id} 
                            item={item} 
                            accionEliminar={accionEliminar} 
                            accionEditar={accionEditar} 
                            accionCambiarEstado={accionCambiarEstado} 
                            textoBotonEstado="Marcar por Ver"
                        />
                    ))
                )}

            </div>

        </div>
    );
}

export default MediaList;