import { useState, useEffect, useMemo } from 'react';
import styles from './Filters.module.css';

const Filters = ({ 
  genreFilter, 
  onGenreChange, 
  typeFilter, 
  onTypeChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange 
}) => {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterGroup}>
        <label className={styles.label}>Género</label>
        <select 
          className={styles.select}
          value={genreFilter}
          onChange={(e) => onGenreChange(e.target.value)}
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

      <div className={styles.filterGroup}>
        <label className={styles.label}>Tipo</label>
        <select 
          className={styles.select}
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Película">Películas</option>
          <option value="Serie">Series</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Ordenar por</label>
        <select 
          className={styles.select}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Sin orden</option>
          <option value="year">Año</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {sortBy && (
        <button 
          className={styles.sortButton}
          onClick={onSortOrderChange}
          title={sortOrder === 'asc' ? 'Orden ascendente' : 'Orden descendente'}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className={sortOrder === 'desc' ? styles.rotated : ''}
          >
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
          {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
        </button>
      )}
    </div>
  );
};

export default Filters;
