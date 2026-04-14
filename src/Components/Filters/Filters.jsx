import styles from './Filters.module.css';

const Filters = ({
  filtroGenero,
  onGeneroChange,
  filtroTipo,
  onTipoChange,
  ordenarPor,
  onOrdenChange,
  orden,
  onOrdenDireccionChange
}) => {
  return (
    <div className={styles.filtersContainer}>

      {/* 🎬 GÉNERO */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Género</label>
        <select
          className={styles.select}
          value={filtroGenero}
          onChange={(e) => onGeneroChange(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Acción">Acción</option>
          <option value="Comedia">Comedia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
          <option value="Documental">Documental</option>
          <option value="Animación">Animación</option>
          <option value="Fantasía">Fantasía</option>
        </select>
      </div>

      {/* 🎞 TIPO */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Tipo</label>
        <select
          className={styles.select}
          value={filtroTipo}
          onChange={(e) => onTipoChange(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Película">Películas</option>
          <option value="Serie">Series</option>
        </select>
      </div>

      {/* 📊 ORDEN */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>Ordenar por</label>
        <select
          className={styles.select}
          value={ordenarPor}
          onChange={(e) => onOrdenChange(e.target.value)}
        >
          <option value="">Sin orden</option>
          <option value="año">Año</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* 🔄 ORDEN ASC / DESC */}
      {ordenarPor && (
        <button
          className={styles.sortButton}
          onClick={onOrdenDireccionChange}
          title={orden === 'asc' ? 'Ascendente' : 'Descendente'}
        >
          {orden === 'asc' ? 'Ascendente ↑' : 'Descendente ↓'}
        </button>
      )}
    </div>
  );
};

export default Filters;