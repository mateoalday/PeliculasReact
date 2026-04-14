import styles from './Catalogo.module.css';
import MediaCard from '../MediaCard/MediaCard';

const Catalogo = ({ peliculas, accionEliminar, accionEditar, accionCambiarEstado }) => {
    return (
        <div className={styles.catalogoContainer}>
            <h2 className={styles.titulo}>Catálogo Completo</h2>
            <div className={styles.grid}>
                {peliculas.length === 0 ? (
                    <p className={styles.empty}>No hay obras en el catálogo aún.</p>
                ) : (
                    peliculas.map(item => (
                        <MediaCard 
                            key={item.id} 
                            item={item} 
                            accionEliminar={accionEliminar} 
                            accionEditar={accionEditar} 
                            accionCambiarEstado={accionCambiarEstado} 
                            textoBotonEstado={item.visto ? "Marcar por Ver" : "Marcar como Visto"}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Catalogo;
