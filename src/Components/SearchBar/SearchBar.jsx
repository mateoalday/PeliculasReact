import styles from './SearchBar.module.css';

const SearchBar = ({ busqueda, setBusqueda }) => {
  return (
    <div className={styles.searchContainer}>
      <label className={styles.label}>Buscar</label>
      <input 
        type="text" 
        className={styles.input}
        placeholder="Buscar por título o director..." 
        value={busqueda} 
        onChange={(e) => setBusqueda(e.target.value)} 
      />
    </div>
  );
};

export default SearchBar;