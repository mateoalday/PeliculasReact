
import styles from './SearchBar.module.css'

const SearchBar = ({busqueda, setBusqueda}) => {



    return (
        <div className={styles.searchContainer}>
            <label className={styles.label}>Buscar</label>
            <input type="text" placeholder="Buscar por titulo o Director..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
    )
}

export default SearchBar