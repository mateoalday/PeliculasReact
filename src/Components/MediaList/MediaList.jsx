import styles from './MediaList.module.css';

function MediaList({ peliculas }) {

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
                        <p key={item.id}>{item.titulo}</p>
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
                        <p key={item.id}>{item.titulo}</p>
                    ))
                )}

            </div>

        </div>
    );
}

export default MediaList;